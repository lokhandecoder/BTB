import React from 'react';
import { Coffee, ArrowUp, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { settings, setIsSettingsOpen, setIsReservationOpen } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1815] text-[#D8CEC4] border-t border-[#332B25] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2E2721]">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#B45309] text-white font-serif font-black flex items-center justify-center text-base">
                BTB
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                {settings.name}
              </span>
            </div>
            <p className="text-xs text-[#A89C8F] font-light leading-relaxed max-w-sm">
              Your favorite neighborhood cafe for mouthwatering Monster Sandwiches, cheesy thin-crust Pizzas, juicy Burgers, thick Shakes, and warm Belgian Waffles.
            </p>
            <div className="text-xs text-[#E7B97B] font-mono">
              WhatsApp Order Desk: {settings.displayPhone}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#A89C8F]">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Food & Shakes Menu
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">
                  Why Bob The Baker
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setIsReservationOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <a href="#hours" className="hover:text-white transition-colors">
                  Location & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Roastery Sanctuary (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Cafe Sanctuary
            </h4>
            <p className="text-xs text-[#A89C8F] font-light leading-relaxed">
              {settings.address}<br />
              {settings.city}<br />
              Open Daily from 11:00 AM to 11:00 PM
            </p>
            <div className="pt-2 flex flex-col gap-1.5">
              <a
                href={settings.gmapUrl || "https://maps.app.goo.gl/UUTh3TaDhFL6Mm658"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#E7B97B] hover:text-white transition-colors"
              >
                <span>📍 Get Directions on Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A6E63]">
          <div>
            &copy; {new Date().getFullYear()} {settings.name}. All rights reserved. Handcrafted coffee and bakery.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
