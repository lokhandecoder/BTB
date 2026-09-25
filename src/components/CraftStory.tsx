import React from 'react';
import { Flame, Wheat, Droplets, Award, Star, Quote } from 'lucide-react';
import { CafeImage } from './CafeImage';

export const CraftStory: React.FC = () => {
  const PILLARS = [
    {
      icon: Flame,
      title: 'Sizzling Burgers & Grilled Sandwiches',
      description: 'Handcrafted toasted buns, double-layered cheese, crispy seasoned patties, and secret BTB house sauces that leave you craving more.',
      kicker: '01. The Grill Station',
      detail: 'Crisp patties · Fresh farm vegetables · House mayo',
    },
    {
      icon: Wheat,
      title: 'Crispy Thin Crust & Stone-Baked Pizzas',
      description: 'Our pizza dough is kneaded fresh daily and baked with 100% real mozzarella cheese, aromatic Italian herbs, and rich golden corn toppings.',
      kicker: '02. Fresh Bakes & Breads',
      detail: 'Melted cheese burst · Garlic butter toasties',
    },
    {
      icon: Droplets,
      title: 'Thick Shakes, Cold Coffees & Kadak Chai',
      description: 'From rich KitKat, Oreo, and Nutella milkshakes to comforting masala chai and thick frothy beaten cold coffee.',
      kicker: '03. Beverage Corner',
      detail: 'Pure whole dairy · Gourmet syrups & toppings',
    },
  ];

  const REVIEWS = [
    {
      author: 'Rohan Sharma',
      role: 'Regular Cafe Patron',
      quote: 'The Chicken Club Sandwich and Cold Coffee With Ice Cream at Bob The Baker are absolute perfection. Ordering to our table via WhatsApp was seamless!',
      rating: 5,
    },
    {
      author: 'Priya Deshmukh',
      role: 'Food Blogger & College Student',
      quote: 'Their Spicy Paneer Burger and Nutella Waffles are the best in town. Clean ambience, super fast order confirmation on WhatsApp, and very pocket-friendly prices!',
      rating: 5,
    },
  ];

  return (
    <section id="craft" className="py-16 lg:py-24 bg-[#F5EFEB] border-t border-b border-[#EAE3D9] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B45309] font-bold">
            <span>Our Kitchen Promise</span>
            <span aria-hidden="true">·</span>
            <span>Bob The Baker's Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#191614] mt-2">
            Made Fresh, Served Sizzling Hot
          </h2>
          <p className="text-sm text-[#6B5E52] mt-3 font-light leading-relaxed">
            Every dish at Bob The Baker's Cafe is made to order with authentic spices, fresh bakery breads, and generous cheese. No shortcuts, just pure comfort food.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E3D9CC] shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#935225] font-semibold">
                      {pillar.kicker}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#FAF5EE] text-[#B45309] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#191614] leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-[#63574C] font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE3] text-[11px] text-[#7A6E63] font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
                  <span>{pillar.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials (Claim-to-Proof Adjacency) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div 
              key={rev.author}
              className="p-6 bg-white/70 rounded-2xl border border-[#E0D5C7] space-y-4 relative"
            >
              <div className="flex items-center gap-1 text-[#D97706]">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <p className="font-serif text-base sm:text-lg italic text-[#26211D] leading-relaxed">
                "{rev.quote}"
              </p>

              <div className="pt-2 border-t border-[#EAE3D9] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-[#191614] block">{rev.author}</span>
                  <span className="text-[#7A6E63] font-light">{rev.role}</span>
                </div>
                <Quote className="w-6 h-6 text-[#D5C9BD] opacity-60" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
