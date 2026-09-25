import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MenuItem, 
  CartItem, 
  CartCustomization, 
  CustomerOrderDetails, 
  PlacedOrder, 
  CafeSettings, 
  OrderType,
  TableReservation
} from '../types/cafe';
import { DEFAULT_CAFE_SETTINGS } from '../data/menuData';

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  tax: number;
  total: number;
  orderType: OrderType;
  customerDetails: CustomerOrderDetails;
  settings: CafeSettings;
  isCartOpen: boolean;
  isReservationOpen: boolean;
  isSettingsOpen: boolean;
  isReceiptOpen: boolean;
  lastPlacedOrder: PlacedOrder | null;
  activeItemForCustomization: MenuItem | null;
  toastMessage: string | null;
  
  // Actions
  addToCart: (item: MenuItem, customization?: CartCustomization, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
  setCustomerDetails: (details: Partial<CustomerOrderDetails>) => void;
  updateSettings: (newSettings: Partial<CafeSettings>) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsReservationOpen: (open: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
  setIsReceiptOpen: (open: boolean) => void;
  openCustomizationModal: (item: MenuItem) => void;
  closeCustomizationModal: () => void;
  placeOrder: () => PlacedOrder | null;
  formatWhatsAppUrl: (order: PlacedOrder) => string;
  formatReservationWhatsAppUrl: (reservation: TableReservation) => string;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial cart from localStorage if exists
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('btb_cafe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Settings loaded directly from cafeData.json so developer edits in JSON take effect immediately
  const [settings, setSettings] = useState<CafeSettings>(DEFAULT_CAFE_SETTINGS);

  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [customerDetails, setCustomerDetailsState] = useState<CustomerOrderDetails>({
    customerName: '',
    customerPhone: '',
    orderType: 'dine-in',
    pickupTime: 'In 15 minutes',
    specialNotes: '',
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<PlacedOrder | null>(null);
  const [activeItemForCustomization, setActiveItemForCustomization] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('btb_cafe_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const setCustomerDetails = (details: Partial<CustomerOrderDetails>) => {
    setCustomerDetailsState((prev) => ({ ...prev, ...details }));
  };

  const updateSettings = (newSettings: Partial<CafeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Cafe WhatsApp & contact settings updated');
  };

  const openCustomizationModal = (item: MenuItem) => {
    setActiveItemForCustomization(item);
  };

  const closeCustomizationModal = () => {
    setActiveItemForCustomization(null);
  };

  const generateCartItemId = (itemId: string, cust?: CartCustomization): string => {
    if (!cust) return itemId;
    const parts = [
      itemId,
      cust.size || '',
      cust.milk || '',
      cust.temperature || '',
      cust.sweetness || '',
      (cust.extras || []).sort().join(','),
      cust.specialInstructions || '',
    ];
    return parts.filter(Boolean).join('|');
  };

  const addToCart = (item: MenuItem, customization?: CartCustomization, quantity = 1) => {
    let unitPrice = item.price;

    // Calculate customization price delta
    if (customization) {
      if (customization.size && item.customization?.sizes) {
        const sz = item.customization.sizes.find((s) => s.name === customization.size);
        if (sz) unitPrice += sz.priceDelta;
      }
      if (customization.milk && item.customization?.milks) {
        const mlk = item.customization.milks.find((m) => m.name === customization.milk);
        if (mlk) unitPrice += mlk.priceDelta;
      }
      if (customization.extras && item.customization?.extras) {
        customization.extras.forEach((extName) => {
          const ext = item.customization?.extras?.find((e) => e.name === extName);
          if (ext) unitPrice += ext.priceDelta;
        });
      }
    }

    const cartItemId = generateCartItemId(item.id, customization);

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * updated[existingIndex].unitPriceWithCustomizations,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          item,
          quantity,
          customization,
          unitPriceWithCustomizations: unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added ${quantity}x ${item.name} to your order`);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPriceWithCustomizations,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculations: Total is direct sum of items (no tax or service charges added)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = 0;
  const total = subtotal;

  const placeOrder = (): PlacedOrder | null => {
    if (items.length === 0) return null;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BTB-${randomSuffix}`;

    const newOrder: PlacedOrder = {
      orderId,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...items],
      customerDetails: {
        ...customerDetails,
        orderType,
      },
      subtotal,
      tax: 0,
      total: subtotal,
      status: 'pending_whatsapp',
    };

    setLastPlacedOrder(newOrder);
    return newOrder;
  };

  const formatWhatsAppUrl = (order: PlacedOrder): string => {
    const isDineIn = order.customerDetails.orderType === 'dine-in';
    const locInfo = isDineIn
      ? `Dine-In`
      : `Takeaway / Pickup (${order.customerDetails.pickupTime || 'ASAP'})`;

    const itemLines = order.items
      .map((ci) => {
        let line = `• ${ci.quantity}x *${ci.item.name}* (₹${Math.round(ci.totalPrice)})`;
        const tags: string[] = [];
        if (ci.customization?.size) tags.push(ci.customization.size);
        if (ci.customization?.temperature) tags.push(ci.customization.temperature);
        if (ci.customization?.milk) tags.push(ci.customization.milk);
        if (ci.customization?.sweetness) tags.push(ci.customization.sweetness);
        if (ci.customization?.extras && ci.customization.extras.length > 0) {
          tags.push(`+ ${ci.customization.extras.join(', ')}`);
        }
        if (tags.length > 0) {
          line += `\n   └ _${tags.join(' · ')}_`;
        }
        if (ci.customization?.specialInstructions) {
          line += `\n   └ Note: "${ci.customization.specialInstructions}"`;
        }
        return line;
      })
      .join('\n');

    const customerLine = order.customerDetails.customerName 
      ? `*Customer:* ${order.customerDetails.customerName} (${order.customerDetails.customerPhone || 'Direct App'})`
      : `*Customer:* In-Cafe Guest (${order.customerDetails.customerPhone || 'Direct App'})`;

    const notesLine = order.customerDetails.specialNotes
      ? `\n*Special Instructions:* ${order.customerDetails.specialNotes}`
      : '';

    const text = `🍔 *NEW ORDER — ${settings.name.toUpperCase()}*
━━━━━━━━━━━━━━━━━━━━
*Order ID:* #${order.orderId}
*Type:* ${locInfo}
${customerLine}
*Time:* ${order.createdAt}

*ITEMS ORDERED:*
${itemLines}

━━━━━━━━━━━━━━━━━━━━
*TOTAL AMOUNT:* *₹${Math.round(order.total)}*${notesLine}
━━━━━━━━━━━━━━━━━━━━
_Please reply to this WhatsApp message to confirm order & estimated prep time._`;

    // Clean phone number: remove non-digits
    const cleanPhone = settings.ownerWhatsAppPhone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const formatReservationWhatsAppUrl = (reservation: TableReservation): string => {
    const text = `🍽️ *TABLE RESERVATION REQUEST — ${settings.name.toUpperCase()}*
━━━━━━━━━━━━━━━━━━━━
*Reservation ID:* #${reservation.id}
*Guest Name:* ${reservation.customerName}
*Phone:* ${reservation.customerPhone}

*DETAILS:*
• *Date:* ${reservation.date}
• *Time:* ${reservation.timeSlot}
• *Party Size:* ${reservation.guestCount} Guest${reservation.guestCount > 1 ? 's' : ''} (Max 4)
${reservation.specialRequests ? `• *Special Requests:* "${reservation.specialRequests}"\n` : ''}━━━━━━━━━━━━━━━━━━━━
_Please reply to confirm table reservation._`;

    const cleanPhone = settings.ownerWhatsAppPhone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        tax,
        total,
        orderType,
        customerDetails,
        settings,
        isCartOpen,
        isReservationOpen,
        isSettingsOpen,
        isReceiptOpen,
        lastPlacedOrder,
        activeItemForCustomization,
        toastMessage,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        setOrderType,
        setCustomerDetails,
        updateSettings,
        setIsCartOpen,
        setIsReservationOpen,
        setIsSettingsOpen,
        setIsReceiptOpen,
        openCustomizationModal,
        closeCustomizationModal,
        placeOrder,
        formatWhatsAppUrl,
        formatReservationWhatsAppUrl,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
