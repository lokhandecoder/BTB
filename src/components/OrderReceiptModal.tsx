import React from 'react';
import { CheckCircle2, MessageCircle, X, ArrowRight, Utensils, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderReceiptModal: React.FC = () => {
  const { 
    lastPlacedOrder, 
    isReceiptOpen, 
    setIsReceiptOpen, 
    formatWhatsAppUrl, 
    settings,
  } = useCart();

  if (!isReceiptOpen || !lastPlacedOrder) return null;

  const waUrl = formatWhatsAppUrl(lastPlacedOrder);

  const handleOpenWhatsAppAgain = () => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setIsReceiptOpen(false);
  };

  const isDineIn = lastPlacedOrder.customerDetails.orderType === 'dine-in';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E5DDD2] overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2A231E] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#E7B97B] font-semibold">
                Bob The Baker's Cafe
              </span>
              <h3 className="font-serif text-xl font-medium text-white">
                Order Placed Successfully!
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto max-h-[75vh] space-y-4">
          
          {/* Status Card */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="font-semibold text-emerald-950 text-sm">
                Sent to Cafe on WhatsApp
              </p>
            </div>
            <p className="text-emerald-800 font-light text-[11px] leading-relaxed">
              Your order ticket has been forwarded directly to Bob The Baker's kitchen on WhatsApp (<strong>{settings.displayPhone}</strong>). Our team will prepare your food fresh and confirm right away!
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-4 rounded-xl bg-white border border-[#E5DDD2] space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-[#F2ECE3] pb-2.5">
              <span className="text-[#7A6E63]">Order Reference:</span>
              <span className="font-mono font-bold text-[#191614] text-sm">#{lastPlacedOrder.orderId}</span>
            </div>

            <div className="flex justify-between items-center border-b border-[#F2ECE3] pb-2.5">
              <span className="text-[#7A6E63]">Customer Name:</span>
              <span className="font-semibold text-[#191614]">{lastPlacedOrder.customerDetails.customerName}</span>
            </div>

            <div className="flex justify-between items-center border-b border-[#F2ECE3] pb-2.5">
              <span className="text-[#7A6E63]">Phone:</span>
              <span className="font-mono text-[#191614]">{lastPlacedOrder.customerDetails.customerPhone}</span>
            </div>

            <div className="flex justify-between items-center border-b border-[#F2ECE3] pb-2.5">
              <span className="text-[#7A6E63]">Service Type:</span>
              <span className="font-semibold text-[#B45309] flex items-center gap-1.5 capitalize">
                {isDineIn ? (
                  <>
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Dine-In</span>
                  </>
                ) : (
                  <>
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Takeaway ({lastPlacedOrder.customerDetails.pickupTime || 'ASAP'})</span>
                  </>
                )}
              </span>
            </div>

            {lastPlacedOrder.customerDetails.specialNotes && (
              <div className="flex justify-between items-start border-b border-[#F2ECE3] pb-2.5">
                <span className="text-[#7A6E63]">Special Notes:</span>
                <span className="font-light italic text-[#191614] text-right max-w-[60%]">
                  "{lastPlacedOrder.customerDetails.specialNotes}"
                </span>
              </div>
            )}

            {/* Items Breakdown */}
            <div className="pt-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7E72] mb-2">
                Items Ordered ({lastPlacedOrder.items.length})
              </div>
              <div className="space-y-2">
                {lastPlacedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex-1 pr-2">
                      <span className="font-medium text-[#191614]">{it.quantity}x {it.item.name}</span>
                      {it.customization && (
                        <span className="text-[10px] text-[#8C7E72] block">
                          {[
                            it.customization.size,
                            it.customization.temperature,
                            it.customization.milk,
                            it.customization.sweetness,
                            ...(it.customization.extras || [])
                          ].filter(Boolean).join(', ')}
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-[#191614] tabular-nums">
                      ₹{Math.round(it.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-[#EAE3D9] flex justify-between items-center text-sm font-bold text-[#191614]">
              <span>Total Amount</span>
              <span className="text-base text-[#B45309] tabular-nums">
                ₹{Math.round(lastPlacedOrder.total)}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#EAE3D9] flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleClose}
            className="flex-1 py-3 px-4 rounded-xl bg-[#2A231E] hover:bg-[#191614] text-white font-semibold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Done / Back to Menu</span>
            <ArrowRight className="w-4 h-4 text-[#E7B97B]" />
          </button>

          <button
            onClick={handleOpenWhatsAppAgain}
            className="py-3 px-4 rounded-xl bg-[#FAF8F5] border border-[#D7CCC0] hover:bg-[#F2ECE3] text-[#2A231E] font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            title="Re-open WhatsApp chat with prefilled order"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366] stroke-none" />
            <span>Re-open WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
