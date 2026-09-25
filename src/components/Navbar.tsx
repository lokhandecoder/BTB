import React, { useState } from 'react';
import { ShoppingBag, Calendar, Phone, Menu, X, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    setIsReservationOpen, 
    total, 
    settings 
  } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EAE3D9] transition-all">
        {/* Top Announcement Bar */}
        <div className="bg-[#2A231E] text-[#EFEBE4] text-[12px] py-1.5 px-4 text-center tracking-wide font-light flex items-center justify-center gap-2">
          <span>{settings.announcement || "🔥 Hot Pizzas, Burgers & Thick Shakes · Order via WhatsApp"}</span>
          <span className="hidden sm:inline text-[#D97706]">·</span>
          <span className="hidden sm:inline text-[#D7CCC0]">WhatsApp Orders: {settings.displayPhone}</span>
        </div>

        {/* 3-Zone Top Bar Contract */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#B45309] text-white font-serif font-black flex items-center justify-center text-lg shadow-sm border border-[#E7B97B]/40 group-hover:scale-105 transition-transform">
              BTB
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#191614] group-hover:text-[#B45309] transition-colors leading-tight">
                {settings.name}
              </span>
              <span className="text-[11px] text-[#7A6E63] font-light hidden sm:block">
                {settings.tagline}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#594F45]">
            <a href="#menu" className="hover:text-[#191614] transition-colors hover:underline underline-offset-4 decoration-[#B45309]">
              Menu
            </a>
            <a href="#craft" className="hover:text-[#191614] transition-colors hover:underline underline-offset-4 decoration-[#B45309]">
              Why BTB?
            </a>
            <button 
              onClick={() => setIsReservationOpen(true)}
              className="hover:text-[#191614] transition-colors hover:underline underline-offset-4 decoration-[#B45309] cursor-pointer"
            >
              Reserve Table
            </button>
            <a href="#hours" className="hover:text-[#191614] transition-colors hover:underline underline-offset-4 decoration-[#B45309]">
              Location & Hours
            </a>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3">
            {/* Table Reservation Button (Desktop) */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#2A231E] border border-[#D7CCC0] rounded-lg hover:border-[#191614] hover:bg-[#F5EFEB] transition-all whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Book Table</span>
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#2A231E] text-white hover:bg-[#191614] transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 text-[#E7B97B]" />
              <span className="text-xs font-semibold tracking-wide">
                {cartCount > 0 ? (
                  <span className="tabular-nums">{settings.currencySymbol}{Math.round(total)}</span>
                ) : (
                  'Cart'
                )}
              </span>
              
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B45309] text-white text-[11px] font-bold flex items-center justify-center shadow animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2A231E] hover:bg-[#F2ECE3] rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EAE3D9] bg-[#FBF9F5] px-6 py-5 space-y-4">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#2A231E] hover:text-[#B45309]"
            >
              Explore Full Menu
            </a>
            <a 
              href="#craft" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#2A231E] hover:text-[#B45309]"
            >
              About Bob The Baker
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              className="block w-full text-left text-base font-medium text-[#2A231E] hover:text-[#B45309]"
            >
              Reserve a Table
            </button>
            <a 
              href="#hours" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#2A231E] hover:text-[#B45309]"
            >
              Hours & Location
            </a>
            <div className="pt-2 border-t border-[#EAE3D9] flex items-center justify-between text-xs text-[#7A6E63]">
              <span>WhatsApp Orders: {settings.displayPhone}</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
