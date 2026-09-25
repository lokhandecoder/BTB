import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CraftStory } from './components/CraftStory';
import { HoursAndLocation } from './components/HoursAndLocation';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CustomizationModal } from './components/CustomizationModal';
import { OrderReceiptModal } from './components/OrderReceiptModal';
import { TableBookingModal } from './components/TableBookingModal';
import { Toast } from './components/Toast';
import { ArrowRight } from 'lucide-react';

const MobileFloatingCartBar: React.FC = () => {
  const { cartCount, total, settings, setIsCartOpen } = useCart();

  if (cartCount === 0) return null;

  return (
    <div className="sm:hidden fixed bottom-4 inset-x-4 z-30">
      <button
        onClick={() => setIsCartOpen(true)}
        className="w-full h-12 px-4 rounded-xl bg-[#2A231E] text-white shadow-xl flex items-center justify-between active:scale-98 transition-transform cursor-pointer border border-[#E7B97B]/30"
      >
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#B45309] text-white text-[11px] font-bold flex items-center justify-center">
            {cartCount}
          </span>
          <span className="text-xs font-semibold tracking-wide">View Order</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tabular-nums text-[#FCD34D]">
            {settings.currencySymbol}{Math.round(total)}
          </span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};

const CafeAppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] selection:bg-[#B45309]/20 selection:text-[#B45309]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MenuSection />
        <CraftStory />
        <HoursAndLocation />
      </main>
      <Footer />

      {/* Interactive Modals & Drawers */}
      <CartDrawer />
      <CustomizationModal />
      <OrderReceiptModal />
      <TableBookingModal />
      <Toast />
      <MobileFloatingCartBar />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <CafeAppContent />
    </CartProvider>
  );
}
