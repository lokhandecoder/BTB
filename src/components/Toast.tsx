import React from 'react';
import { CheckCircle, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceOnce pointer-events-none">
      <div className="bg-[#2A231E] text-white px-4 py-3 rounded-xl shadow-xl border border-[#D7CCC0]/20 flex items-center gap-2.5 max-w-sm">
        <div className="w-6 h-6 rounded-full bg-[#B45309] text-white flex items-center justify-center shrink-0">
          <Coffee className="w-3.5 h-3.5" />
        </div>
        <p className="text-xs font-medium tracking-wide">
          {toastMessage}
        </p>
      </div>
    </div>
  );
};
