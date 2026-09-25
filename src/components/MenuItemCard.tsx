import React, { useState } from 'react';
import { Plus, Sliders, Check } from 'lucide-react';
import { MenuItem } from '../types/cafe';
import { useCart } from '../context/CartContext';
import { CafeImage } from './CafeImage';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addToCart, openCustomizationModal, settings } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const hasCustomizationOptions = 
    Boolean(item.customization && (
      (item.customization.milks && item.customization.milks.length > 0) ||
      (item.customization.sizes && item.customization.sizes.length > 1) ||
      (item.customization.temperatures && item.customization.temperatures.length > 1) ||
      (item.customization.extras && item.customization.extras.length > 0)
    ));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasCustomizationOptions) {
      openCustomizationModal(item);
    } else {
      addToCart(item, undefined, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  return (
    <article 
      onClick={() => openCustomizationModal(item)}
      className="group flex flex-col bg-white rounded-xl border border-[#E8E1D5] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Visual Asset Slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F6F1EA]">
        <CafeImage
          src={item.imageUrl}
          alt={item.name}
          className="group-hover:scale-103 transition-transform duration-500 ease-out"
          categoryHint={item.category}
        />
        
        {/* Subtle top tag if special */}
        {item.dietaryTags.length > 0 && (
          <div className="absolute top-3 left-3 bg-[#191614]/80 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-medium tracking-wider px-2 py-0.5 rounded-sm">
            {item.dietaryTags[0]}
          </div>
        )}

        {/* Quick action button overlay */}
        <button
          onClick={handleQuickAdd}
          aria-label={hasCustomizationOptions ? `Customize ${item.name}` : `Add ${item.name} to cart`}
          className="absolute bottom-3 right-3 h-9 px-3 rounded-lg bg-white/95 hover:bg-[#191614] text-[#191614] hover:text-white shadow-md flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors active:scale-95 cursor-pointer"
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Added</span>
            </>
          ) : hasCustomizationOptions ? (
            <>
              <Sliders className="w-3.5 h-3.5" />
              <span>Customize</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Indian Veg / Non-Veg Badge & Metadata */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-[#85776C] font-normal tracking-wide">
            <div className="flex items-center gap-1.5">
              {item.isVeg !== undefined && (
                <div 
                  className={`w-3.5 h-3.5 border flex items-center justify-center rounded-xs ${
                    item.isVeg 
                      ? 'border-emerald-600 bg-white' 
                      : 'border-red-600 bg-white'
                  }`}
                  title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                </div>
              )}
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${item.isVeg ? 'text-emerald-700' : 'text-red-700'}`}>
                {item.isVeg ? 'Veg' : 'Non-Veg'}
              </span>
            </div>

            <span className="tabular-nums text-[#8C7E72]">{item.preparationTimeMinutes} min prep</span>
          </div>

          {/* Item Name */}
          <h3 className="font-serif text-lg font-semibold text-[#191614] group-hover:text-[#B45309] transition-colors leading-snug mt-1">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#61574E] line-clamp-2 mt-1 leading-relaxed font-light">
            {item.description}
          </p>
        </div>

        {/* Sensory Tasting Notes Kicker */}
        {item.tastingNotes && (
          <div className="text-[11px] text-[#935225] italic line-clamp-1 border-t border-[#F2ECE3] pt-2">
            Notes: {item.tastingNotes}
          </div>
        )}

        {/* Price & Action Baseline */}
        <div className="flex items-center justify-between pt-1 border-t border-[#EAE3D9]">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-[#191614] tabular-nums">
              {settings.currencySymbol}{Math.round(item.price)}
            </span>
            {hasCustomizationOptions && (
              <span className="text-[10px] text-[#8C7E72] font-light">base</span>
            )}
          </div>

          <span className="text-xs text-[#8C7E72] group-hover:text-[#B45309] flex items-center gap-1 transition-colors">
            {hasCustomizationOptions ? 'Options & Add' : 'Order Now'} &rarr;
          </span>
        </div>
      </div>
    </article>
  );
};
