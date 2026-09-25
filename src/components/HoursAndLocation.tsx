import React from 'react';
import { Clock, MapPin, Phone, Wifi, Sparkles, Navigation, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const HoursAndLocation: React.FC = () => {
  const { settings, setIsReservationOpen } = useCart();

  const SCHEDULE = [
    { day: 'Monday – Friday', hours: '11:00 AM – 11:00 PM', status: 'Full Kitchen, Burgers, Pizzas & Shakes' },
    { day: 'Saturday – Sunday', hours: '11:00 AM – 11:00 PM', status: 'Weekend Bakes, Desserts & Dining' },
  ];

  const AMENITIES = [
    { title: 'High-Speed Free Wi-Fi', desc: 'Fast connection for hangouts, work, and chill sessions' },
    { title: 'Air-Conditioned Cozy Booths', desc: 'Comfortable sofa booths with charging points' },
    { title: 'Birthday & Party Friendly', desc: 'Special arrangements for celebrations and friends get-together' },
    { title: 'Fast WhatsApp Takeaway', desc: 'Pre-order via WhatsApp and pick up hot without waiting' },
  ];

  return (
    <section id="hours" className="py-16 lg:py-24 bg-[#FBF9F5] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Operating Hours & Live Status (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B45309] font-bold">
                <span>Sanctuary & Hours</span>
                <span aria-hidden="true">·</span>
                <span>{settings.name}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#191614] mt-2">
                Visit Bob The Baker's Cafe
              </h2>
              <p className="text-sm text-[#6B5E52] mt-2 font-light">
                Drop in for a quick cold coffee & fries, or reserve a table for an evening birthday celebration or dinner.
              </p>
            </div>

            {/* Live Open Status Pill */}
            <div className="p-4 rounded-xl bg-white border border-[#E5DDD2] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <span className="text-xs font-bold text-[#191614] block">
                    Kitchen Open for Dine-In & Takeaway
                  </span>
                  <span className="text-[11px] text-[#7A6E63] font-light">
                    Fresh burgers sizzling · Shakes made on order
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#B45309] tabular-nums">
                Open: 11:00 AM – 11:00 PM
              </span>
            </div>

            {/* Hours Table */}
            <div className="bg-white rounded-xl border border-[#E5DDD2] overflow-hidden shadow-xs divide-y divide-[#F2ECE3]">
              {SCHEDULE.map((item) => (
                <div key={item.day} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#191614] block">{item.day}</span>
                    <span className="text-[11px] text-[#8C7E72] font-light">{item.status}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#2A231E] tabular-nums">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            {/* Reservation CTA trigger */}
            <div className="p-5 rounded-xl bg-[#2A231E] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg font-semibold">Reserve Your Table in Advance</h4>
                <p className="text-xs text-[#D7CCC0] font-light mt-0.5">
                  Book birthday seating, group booths, or quiet corner tables with instant WhatsApp sync.
                </p>
              </div>
              <button
                onClick={() => setIsReservationOpen(true)}
                className="px-4 py-2.5 bg-white text-[#191614] hover:bg-[#F2ECE3] rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
              >
                Book a Table
              </button>
            </div>
          </div>

          {/* Right: Location, Contact & Amenities (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Location Card */}
            <div className="bg-white rounded-xl p-6 border border-[#E5DDD2] shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-semibold text-[#191614]">
                Location & Cafe Contacts
              </h3>

              <div className="space-y-3 text-xs text-[#5C5349]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#191614] block">{settings.address}</strong>
                    <span>{settings.city} · Near Metro & Highway</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#191614] block">{settings.displayPhone}</strong>
                    <span>Cafe Front Desk & Order Verification</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <a
                  href={settings.gmapUrl || "https://maps.app.goo.gl/UUTh3TaDhFL6Mm658"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-lg border border-[#D7CCC0] text-center text-xs font-semibold text-[#2A231E] hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* In-Cafe Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AMENITIES.map((am) => (
                <div key={am.title} className="p-4 rounded-xl bg-white border border-[#E5DDD2] shadow-xs space-y-1">
                  <h4 className="text-xs font-bold text-[#191614]">{am.title}</h4>
                  <p className="text-[11px] text-[#7A6E63] font-light leading-relaxed">{am.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
