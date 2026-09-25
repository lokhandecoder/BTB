import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, X, Coffee, Utensils } from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { CategoryId, DietaryTag } from '../types/cafe';
import { MenuItemCard } from './MenuItemCard';
import { useCart } from '../context/CartContext';

export const MenuSection: React.FC = () => {
  const { orderType, setOrderType, settings } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('All');

  const DIETARY_OPTIONS = [
    'All',
    'Bestseller',
    'Chef Special',
  ];

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Veg / Non-Veg filter
      if (vegFilter === 'veg' && item.isVeg !== true) {
        return false;
      }
      if (vegFilter === 'non-veg' && item.isVeg !== false) {
        return false;
      }

      // Dietary filter match
      if (selectedDietary !== 'All') {
        if (!item.dietaryTags.includes(selectedDietary)) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = item.name.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inCategory = item.category.toLowerCase().includes(q);
        if (!inName && !inDesc && !inCategory) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, vegFilter, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#FBF9F5] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EAE3D9]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B45309] font-bold">
              <span>{settings.shortName || 'BTB'} Original Menu</span>
              <span aria-hidden="true">·</span>
              <span>All Prices in INR ({settings.currencySymbol})</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#191614]">
              Explore Our Freshly Prepared Menu
            </h2>
            <p className="text-sm text-[#6B5E52] max-w-xl font-light">
              From our famous Monster Sandwiches, cheesy Pizzas & Burgers to thick Shakes and Belgian Waffles.
            </p>
          </div>

          {/* Dine-In vs Takeaway segmented toggle control */}
          <div className="inline-flex p-1 bg-[#EFE9E0] rounded-xl border border-[#DFD5C8] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setOrderType('dine-in')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                orderType === 'dine-in'
                  ? 'bg-white text-[#191614] shadow-xs'
                  : 'text-[#6E6155] hover:text-[#191614]'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Dine-In Table Order</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('takeaway')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                orderType === 'takeaway'
                  ? 'bg-white text-[#191614] shadow-xs'
                  : 'text-[#6E6155] hover:text-[#191614]'
              }`}
            >
              <Coffee className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Takeaway / Pickup</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Segmented Navigation) */}
        <div className="pt-6 pb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max pb-2">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? MENU_ITEMS.length 
                : MENU_ITEMS.filter(i => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#2A231E] text-white shadow-xs'
                      : 'bg-white text-[#5C5349] border border-[#E5DDD2] hover:bg-[#F2ECE3] hover:text-[#191614]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] tabular-nums ${isActive ? 'text-[#FCD34D]' : 'text-[#8C7E72]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Veg/Non-Veg Quick Toggle Row */}
        <div className="pt-2 pb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C7E72] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burgers, pizzas, momos, maggi, shakes, pasta..."
              className="w-full text-xs pl-9 pr-8 py-2.5 rounded-lg bg-white border border-[#E0D7CB] focus:outline-hidden focus:border-[#191614] text-[#191614] placeholder-[#9C8F83]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7E72] hover:text-[#191614] p-1 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Authentic Indian Veg / Non-Veg Quick Switcher */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 bg-[#ECE5DA] rounded-lg border border-[#D9CFC4]">
              <button
                type="button"
                onClick={() => setVegFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  vegFilter === 'all'
                    ? 'bg-white text-[#191614] shadow-xs'
                    : 'text-[#63574C] hover:text-[#191614]'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setVegFilter('veg')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  vegFilter === 'veg'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-emerald-800 hover:text-emerald-950'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block border border-white" />
                <span>Veg Only</span>
              </button>
              <button
                type="button"
                onClick={() => setVegFilter('non-veg')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  vegFilter === 'non-veg'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-red-800 hover:text-red-950'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block border border-white" />
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Quick Tag filter */}
            <div className="hidden lg:flex items-center gap-1.5">
              {DIETARY_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedDietary(tag)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    selectedDietary === tag
                      ? 'bg-[#B45309] text-white'
                      : 'bg-[#F2ECE3] text-[#63574C] hover:bg-[#EAE2D5]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Active Filters Display */}
        {(selectedDietary !== 'All' || searchQuery || selectedCategory !== 'all') && (
          <div className="mb-6 flex items-center justify-between p-3 rounded-lg bg-[#F5EFEB] border border-[#E2D8CC] text-xs text-[#594E43]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-[#191614]">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-white px-2 py-0.5 rounded border border-[#D9CFC4]">
                  Category: {MENU_CATEGORIES.find(c => c.id === selectedCategory)?.label}
                </span>
              )}
              {selectedDietary !== 'All' && (
                <span className="bg-white px-2 py-0.5 rounded border border-[#D9CFC4]">
                  Tag: {selectedDietary}
                </span>
              )}
              {searchQuery && (
                <span className="bg-white px-2 py-0.5 rounded border border-[#D9CFC4]">
                  Query: "{searchQuery}"
                </span>
              )}
              <span className="text-[#8C7E72]">
                ({filteredItems.length} item{filteredItems.length === 1 ? '' : 's'} found)
              </span>
            </div>
            
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#B45309] hover:underline cursor-pointer"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#EAE3D9] max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] text-[#B45309] flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#191614]">
              No Creations Match Your Search
            </h3>
            <p className="text-xs text-[#7A6E63] mt-1 max-w-xs mx-auto">
              We couldn't find any items matching "{searchQuery}". Try searching for coffee beans, pastries, or clear dietary filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietary('All');
              }}
              className="mt-5 px-4 py-2 text-xs font-semibold bg-[#2A231E] text-white rounded-lg hover:bg-[#191614] transition-colors"
            >
              View Full Menu
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
