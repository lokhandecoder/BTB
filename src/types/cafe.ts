export type CategoryId = string;

export type DietaryTag = 
  | 'Veg'
  | 'Non-Veg'
  | 'Vegan' 
  | 'Vegetarian' 
  | 'Gluten-Free' 
  | 'Chef Special' 
  | 'Organic' 
  | 'Bestseller'
  | string;

export interface CustomizationOption {
  name: string;
  priceDelta?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  isVeg?: boolean;
  description: string;
  tastingNotes?: string;
  origin?: string;
  calories?: string;
  imageUrl: string;
  dietaryTags: DietaryTag[];
  isAvailable?: boolean;
  preparationTimeMinutes: number;
  customization?: {
    sizes?: { name: string; priceDelta: number }[];
    milks?: { name: string; priceDelta: number }[];
    temperatures?: ('Hot' | 'Iced')[];
    sweetnessLevels?: string[];
    extras?: { name: string; priceDelta: number }[];
  };
}

export interface MenuCategory {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

export interface CartCustomization {
  size?: string;
  milk?: string;
  temperature?: 'Hot' | 'Iced';
  sweetness?: string;
  extras?: string[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string; // unique hash of item id + customizations
  item: MenuItem;
  quantity: number;
  customization?: CartCustomization;
  unitPriceWithCustomizations: number;
  totalPrice: number;
}

export type OrderType = 'dine-in' | 'takeaway';

export interface CustomerOrderDetails {
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  pickupTime?: string;
  specialNotes?: string;
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  customerDetails: CustomerOrderDetails;
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending_whatsapp' | 'sent_whatsapp' | 'confirmed';
}

export interface TableReservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  seatingArea?: string;
  occasion?: string;
  specialRequests?: string;
  createdAt: string;
}

export interface CafeSettings {
  name: string;
  shortName?: string;
  tagline: string;
  ownerWhatsAppPhone: string; // international digits format e.g. "919876543210"
  displayPhone: string; // e.g. "+91 98765 43210"
  address: string;
  city: string;
  gmapUrl?: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  currencySymbol: string;
  currencyCode?: string;
  taxRatePercent: number;
  announcement?: string;
}
