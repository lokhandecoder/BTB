import React from 'react';
import { ArrowDown, Calendar, Sparkles, Clock, MapPin, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CafeImage } from './CafeImage';

export const Hero: React.FC = () => {
  const { setIsReservationOpen, settings } = useCart();

  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] border-b border-[#EAE3D9] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient lighting subtle radial */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3E7D7] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E8DDD0] rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed metadata kicker (NO PILLS) */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B45309] font-bold">
              <span>{settings.name}</span>
              <span aria-hidden="true">·</span>
              <span>Bakes, Burgers & Brews</span>
              <span aria-hidden="true">·</span>
              <span>Fresh Daily</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#191614] leading-[1.08] [text-wrap:balance]">
              Taste The Crave, <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#B45309]">Savor Every Bite</span> at Bob The Baker's.
            </h1>

            {/* Subtitle / Proposition */}
            <p className="text-base sm:text-lg text-[#5C5349] max-w-xl leading-relaxed font-light">
              Dive into our sizzling gourmet burgers, loaded cheesy pizzas, thick KitKat & Nutella shakes, steamed momos, and hot waffles. Order straight to your table or takeaway via instant WhatsApp confirmation!
            </p>

            {/* CTAs & Trust Markers */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#2A231E] text-[#F9F7F3] text-sm font-semibold hover:bg-[#191614] hover:shadow-md transition-all active:scale-95"
              >
                <span>View Full Menu</span>
                <ArrowDown className="w-4 h-4 text-[#E7B97B]" />
              </a>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#D5C9BE] text-[#2A231E] text-sm font-medium hover:border-[#191614] hover:bg-[#F3ECE3] transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#B45309]" />
                <span>Reserve Table</span>
              </button>
            </div>

            {/* Adjacency Claim Proof: Micro metrics */}
            <div className="pt-6 border-t border-[#EAE3D9] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="block font-serif text-2xl font-semibold text-[#191614] tabular-nums">
                  50+
                </span>
                <span className="text-xs text-[#7A6E63] font-light">Handcrafted Menu Items</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-semibold text-[#191614] tabular-nums">
                  100%
                </span>
                <span className="text-xs text-[#7A6E63] font-light">Fresh Mozzarella & Sauces</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-semibold text-[#191614] tabular-nums">
                  4.8★
                </span>
                <span className="text-xs text-[#7A6E63] font-light">From Happy Foodies</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame with single-elevation depth */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E2D8CC] bg-white p-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <CafeImage
                    src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
                    alt="Bob The Baker Sizzling Burger & Pizzas"
                    className="w-full h-full object-cover"
                    categoryHint="BTB Cafe Special"
                  />
                  
                  {/* Subtle Gradient Scrim at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Floating card info badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] uppercase tracking-wider text-[#FCD34D] font-bold block">
                      Chef's Signature Recommendation
                    </span>
                    <p className="font-serif text-lg font-medium text-white line-clamp-1">
                      Magic Burger & Cheesy Loaded Pizza
                    </p>
                    <p className="text-xs text-white/80 font-light">
                      Crispy Patty · Molten Cheddar Burst · Freshly Baked
                    </p>
                  </div>
                </div>

                {/* Sub-bar below image */}
                <div className="p-3 bg-[#FAF7F2] rounded-lg mt-2 flex items-center justify-between text-xs text-[#5C5349]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Open Today: 10:00 AM – 11:30 PM</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-[#191614]">
                    <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>{settings.address.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Little decorative quote pill */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white/95 backdrop-blur-sm border border-[#E5DCD0] shadow-lg rounded-xl p-3.5 items-center gap-3 max-w-xs">
                <div className="w-9 h-9 rounded-full bg-[#F5EFEB] flex items-center justify-center shrink-0">
                  <Coffee className="w-4 h-4 text-[#B45309]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#191614] leading-tight">
                    "Best thick cold coffee and cheesy fries in the area!"
                  </p>
                  <p className="text-[10px] text-[#7A6E63] mt-0.5">
                    — Google Reviews & Foodie Patrons
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
