import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, MessageCircle, Utensils, Coffee, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CafeImage } from './CafeImage';

export const CartDrawer: React.FC = () => {
  const {
    items,
    cartCount,
    subtotal,
    tax,
    total,
    orderType,
    setOrderType,
    customerDetails,
    setCustomerDetails,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    setIsReceiptOpen,
    placeOrder,
    formatWhatsAppUrl,
    settings,
    showToast,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    if (!customerDetails.customerName.trim()) {
      showToast('Please enter your full name');
      return;
    }
    if (!customerDetails.customerPhone.trim()) {
      showToast('Please enter your WhatsApp phone number');
      return;
    }

    const placed = placeOrder();
    if (placed) {
      // 1. Create and trigger WhatsApp
      const waUrl = formatWhatsAppUrl(placed);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      
      // 2. Clear cart
      clearCart();

      // 3. Close cart drawer
      setIsCartOpen(false);

      // 4. Open Order Placed pop up
      setIsReceiptOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Drawer Container */}
      <div 
        className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col border-l border-[#E5DDD2] animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE3D9] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#191614]">
              Your Selection
            </h2>
            <span className="text-xs bg-[#F5EFEB] text-[#8C7E72] font-semibold px-2 py-0.5 rounded-full tabular-nums">
              {cartCount} item{cartCount === 1 ? '' : 's'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-[#9E8E81] hover:text-red-700 transition-colors mr-2 cursor-pointer"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-[#F2ECE3] flex items-center justify-center text-[#5C5349] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Mode Toggle: Dine-In vs Takeaway */}
        <div className="p-4 bg-[#F5EFEB] border-b border-[#EAE3D9]">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#786B60] mb-2">
            Service Fulfillment Type:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setOrderType('dine-in')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                orderType === 'dine-in'
                  ? 'bg-[#2A231E] border-[#2A231E] text-white shadow-xs'
                  : 'bg-white border-[#D9CFC4] text-[#4A4036] hover:bg-white/80'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Dine-In Table</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('takeaway')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                orderType === 'takeaway'
                  ? 'bg-[#2A231E] border-[#2A231E] text-white shadow-xs'
                  : 'bg-white border-[#D9CFC4] text-[#4A4036] hover:bg-white/80'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Takeaway / Pickup</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#EFE9E0] text-[#8C7E72] flex items-center justify-center mb-4">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#191614]">
              Your Cart is Empty
            </h3>
            <p className="text-xs text-[#7A6E63] max-w-xs mt-1">
              Select your favorite single-origin roast, fresh bakery pastries, or artisanal brunch creations to begin.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-6 px-5 py-2.5 bg-[#2A231E] text-white text-xs font-semibold rounded-lg hover:bg-[#191614] transition-colors cursor-pointer"
            >
              Explore Today's Menu
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Items List */}
            <div className="space-y-3">
              {items.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="bg-white rounded-xl p-3 border border-[#E8E1D5] flex gap-3 shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#F5EFEB]">
                    <CafeImage
                      src={cartItem.item.imageUrl}
                      alt={cartItem.item.name}
                      className="w-full h-full object-cover"
                      categoryHint={cartItem.item.category}
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {cartItem.item.isVeg !== undefined && (
                            <div 
                              className={`w-3 h-3 border shrink-0 flex items-center justify-center rounded-xs ${
                                cartItem.item.isVeg 
                                  ? 'border-emerald-600 bg-white' 
                                  : 'border-red-600 bg-white'
                              }`}
                              title={cartItem.item.isVeg ? 'Veg' : 'Non-Veg'}
                            >
                              <div className={`w-1 h-1 rounded-full ${cartItem.item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                            </div>
                          )}
                          <h4 className="font-serif text-sm font-semibold text-[#191614] leading-tight truncate">
                            {cartItem.item.name}
                          </h4>
                        </div>
                        <span className="text-xs font-bold tabular-nums text-[#191614] shrink-0">
                          {settings.currencySymbol}{Math.round(cartItem.totalPrice)}
                        </span>
                      </div>

                      {/* Customization Details */}
                      {cartItem.customization && (
                        <div className="text-[11px] text-[#7A6E63] mt-0.5 space-y-0.5">
                          {cartItem.customization.size && (
                            <span>{cartItem.customization.size} · </span>
                          )}
                          {cartItem.customization.temperature && (
                            <span>{cartItem.customization.temperature} · </span>
                          )}
                          {cartItem.customization.extras && cartItem.customization.extras.length > 0 && (
                            <div className="text-[#935225]">
                              + {cartItem.customization.extras.join(', ')}
                            </div>
                          )}
                          {cartItem.customization.specialInstructions && (
                            <div className="italic text-[#8C7E72] line-clamp-1">
                              "{cartItem.customization.specialInstructions}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Stepper + Remove */}
                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#F5EFEB]">
                      <div className="flex items-center border border-[#D9CFC4] rounded-md bg-[#FAF8F5]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#4A4036] hover:bg-[#EAE2D7] rounded-l cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold tabular-nums text-[#191614]">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#4A4036] hover:bg-[#EAE2D7] rounded-r cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(cartItem.cartItemId)}
                        className="text-[#9E8E81] hover:text-red-700 p-1 cursor-pointer transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Details Form */}
            <div className="bg-white rounded-xl p-4 border border-[#E8E1D5] space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#695C51]">
                Customer Details
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-[#7A6E63] font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerDetails.customerName}
                    onChange={(e) => setCustomerDetails({ customerName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#D9CFC4] bg-[#FAF8F5] focus:outline-hidden focus:border-[#191614]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#7A6E63] font-medium mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={customerDetails.customerPhone}
                    onChange={(e) => setCustomerDetails({ customerPhone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#D9CFC4] bg-[#FAF8F5] focus:outline-hidden focus:border-[#191614]"
                  />
                </div>
              </div>

              {orderType === 'takeaway' && (
                <div>
                  <label className="block text-[11px] text-[#7A6E63] font-medium mb-1">
                    Estimated Pickup Time
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['ASAP (10m)', 'In 20 min', 'In 35 min'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setCustomerDetails({ pickupTime: time })}
                        className={`py-1.5 px-2 text-[11px] font-medium rounded-md border text-center transition-colors cursor-pointer ${
                          customerDetails.pickupTime === time
                            ? 'bg-[#2A231E] border-[#2A231E] text-white'
                            : 'bg-white border-[#D9CFC4] text-[#4A4036] hover:bg-[#F2ECE3]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] text-[#7A6E63] font-medium mb-1">
                  Allergies or Server Notes
                </label>
                <input
                  type="text"
                  value={customerDetails.specialNotes || ''}
                  onChange={(e) => setCustomerDetails({ specialNotes: e.target.value })}
                  placeholder="e.g. Extra spicy, no onions, bring water first..."
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#D9CFC4] bg-[#FAF8F5] focus:outline-hidden focus:border-[#191614]"
                />
              </div>
            </div>

          </div>
        )}

        {/* Footer with Calculations & WhatsApp Order Button */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#EAE3D9] space-y-3">
            
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5C5349]">
              <div className="flex justify-between text-base font-bold text-[#191614] pt-1">
                <span>Total Amount</span>
                <span className="tabular-nums text-lg text-[#B45309]">
                  ₹{Math.round(total)}
                </span>
              </div>
            </div>

            {/* WhatsApp Target Notification Pill */}
            <div className="flex items-center gap-1.5 text-[11px] text-[#7A6E63] bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8DFC0]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Orders sent directly to Cafe WhatsApp:</span>
              <strong className="text-[#191614]">{settings.displayPhone}</strong>
            </div>

            {/* Send WhatsApp Order CTA Button */}
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-none" />
              <span>Send Order Out via WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <p className="text-[10px] text-center text-[#8C7E72] font-light">
              This opens your WhatsApp with pre-filled order details directly to the cafe owner for instant verification.
            </p>

          </div>
        )}
      </div>
    </div>
  );
};
