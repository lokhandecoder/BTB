import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Coffee, Sparkles } from 'lucide-react';
import { MenuItem, CartCustomization } from '../types/cafe';
import { useCart } from '../context/CartContext';
import { CafeImage } from './CafeImage';

export const CustomizationModal: React.FC = () => {
  const { 
    activeItemForCustomization, 
    closeCustomizationModal, 
    addToCart, 
    settings 
  } = useCart();

  const item = activeItemForCustomization;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('Regular');
  const [selectedMilk, setSelectedMilk] = useState<string>('Whole Milk');
  const [selectedTemp, setSelectedTemp] = useState<'Hot' | 'Iced'>('Hot');
  const [selectedSweetness, setSelectedSweetness] = useState<string>('Standard');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset states when a new item is selected
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setSelectedSize(item.customization?.sizes?.[0]?.name || 'Regular');
      setSelectedMilk(item.customization?.milks?.[0]?.name || 'Whole Milk');
      setSelectedTemp(item.customization?.temperatures?.[0] || 'Hot');
      setSelectedSweetness(item.customization?.sweetnessLevels?.[0] || 'Standard');
      setSelectedExtras([]);
      setSpecialInstructions('');
    }
  }, [item]);

  if (!item) return null;

  // Calculate live item price
  let currentUnitPrice = item.price;
  if (selectedSize && item.customization?.sizes) {
    const sz = item.customization.sizes.find(s => s.name === selectedSize);
    if (sz) currentUnitPrice += sz.priceDelta;
  }
  if (item.customization?.milks) {
    const milk = item.customization.milks.find(m => m.name === selectedMilk);
    if (milk) currentUnitPrice += milk.priceDelta;
  }
  if (item.customization?.extras) {
    selectedExtras.forEach(extName => {
      const ext = item.customization?.extras?.find(e => e.name === extName);
      if (ext) currentUnitPrice += ext.priceDelta;
    });
  }

  const currentTotal = currentUnitPrice * quantity;

  const toggleExtra = (extraName: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraName) 
        ? prev.filter(e => e !== extraName) 
        : [...prev, extraName]
    );
  };

  const handleConfirmAddToCart = () => {
    const customization: CartCustomization = {
      size: item.customization?.sizes ? selectedSize : undefined,
      milk: item.customization?.milks ? selectedMilk : undefined,
      temperature: item.customization?.temperatures ? selectedTemp : undefined,
      sweetness: item.customization?.sweetnessLevels ? selectedSweetness : undefined,
      extras: selectedExtras.length > 0 ? selectedExtras : undefined,
      specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined,
    };

    addToCart(item, customization, quantity);
    closeCustomizationModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E5DDD2] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#ECE4D8]">
          <CafeImage
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            categoryHint={item.category}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            onClick={closeCustomizationModal}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-[11px] text-[#FBD38D] uppercase tracking-wider font-semibold">
              {item.isVeg !== undefined && (
                <div 
                  className={`w-3.5 h-3.5 border flex items-center justify-center rounded-xs ${
                    item.isVeg ? 'border-emerald-500 bg-white' : 'border-red-500 bg-white'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                </div>
              )}
              <span>{item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
              <span>·</span>
              <span>{item.category.replace('-', ' ')}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight mt-0.5">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Customization Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 divide-y divide-[#EFEAE2]">
          
          {/* Description & Tasting notes */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-[#5C5349] leading-relaxed font-light">
              {item.description}
            </p>
            {item.tastingNotes && (
              <div className="p-2.5 rounded-lg bg-[#F3EDE4] border border-[#E8DFC0] text-xs text-[#824419] italic flex items-center gap-2">
                <Coffee className="w-4 h-4 shrink-0 text-[#B45309]" />
                <span>Tasting Notes: {item.tastingNotes}</span>
              </div>
            )}
          </div>

          {/* Size Choice (if available) */}
          {item.customization?.sizes && item.customization.sizes.length > 0 && (
            <div className="pt-4 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#73665A]">
                Select Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.customization.sizes.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedSize(s.name)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                      selectedSize === s.name
                        ? 'border-[#2A231E] bg-[#2A231E] text-white shadow-xs'
                        : 'border-[#D9CFC4] bg-white text-[#2A231E] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    <span>{s.name}</span>
                    <span className="tabular-nums text-[11px] opacity-90">
                      {s.priceDelta > 0 ? `+₹${Math.round(s.priceDelta)}` : 'Standard'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Temperature Choice (if available) */}
          {item.customization?.temperatures && item.customization.temperatures.length > 1 && (
            <div className="pt-4 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#73665A]">
                Temperature
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.customization.temperatures.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTemp(t)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                      selectedTemp === t
                        ? 'border-[#2A231E] bg-[#2A231E] text-white'
                        : 'border-[#D9CFC4] bg-white text-[#2A231E] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    {t === 'Hot' ? '☕ Hot Brew' : '🧊 Over Ice'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Alternative Choice (if available) */}
          {item.customization?.milks && item.customization.milks.length > 0 && (
            <div className="pt-4 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#73665A]">
                Milk & Plant-Based Option
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.customization.milks.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setSelectedMilk(m.name)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                      selectedMilk === m.name
                        ? 'border-[#2A231E] bg-[#2A231E] text-white shadow-xs'
                        : 'border-[#D9CFC4] bg-white text-[#2A231E] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    <span className="truncate">{m.name}</span>
                    <span className="tabular-nums text-[10px] shrink-0 ml-1">
                      {m.priceDelta > 0 ? `+₹${Math.round(m.priceDelta)}` : 'Included'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sweetness Choice (if available) */}
          {item.customization?.sweetnessLevels && item.customization.sweetnessLevels.length > 0 && (
            <div className="pt-4 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#73665A]">
                Sweetness Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {item.customization.sweetnessLevels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedSweetness(lvl)}
                    className={`py-1.5 px-2 text-[11px] font-medium rounded-md border text-center transition-all cursor-pointer ${
                      selectedSweetness === lvl
                        ? 'border-[#2A231E] bg-[#2A231E] text-white'
                        : 'border-[#D9CFC4] bg-white text-[#3D352E] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons / Extras (if available) */}
          {item.customization?.extras && item.customization.extras.length > 0 && (
            <div className="pt-4 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#73665A]">
                Chef Add-ons
              </label>
              <div className="space-y-1.5">
                {item.customization.extras.map((ext) => {
                  const isChecked = selectedExtras.includes(ext.name);
                  return (
                    <button
                      key={ext.name}
                      type="button"
                      onClick={() => toggleExtra(ext.name)}
                      className={`w-full py-2 px-3 text-xs font-medium rounded-lg border transition-all flex items-center justify-between text-left cursor-pointer ${
                        isChecked
                          ? 'border-[#B45309] bg-[#FFFBEB] text-[#92400E]'
                          : 'border-[#D9CFC4] bg-white text-[#2A231E] hover:bg-[#F2ECE3]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                          isChecked ? 'bg-[#B45309] border-[#B45309] text-white' : 'border-[#A89C8F]'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{ext.name}</span>
                      </div>
                      <span className="tabular-nums text-xs font-semibold">
                        {ext.priceDelta > 0 ? `+₹${Math.round(ext.priceDelta)}` : 'Free'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="pt-4 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#73665A]">
              Special Preparation Notes
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra hot, separate honey, cinnamon dusting..."
              className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-[#D9CFC4] focus:outline-hidden focus:border-[#191614] text-[#191614] placeholder-[#A69A8E]"
            />
          </div>

        </div>

        {/* Footer with Quantity Stepper and Add to Cart CTA */}
        <div className="p-4 bg-white border-t border-[#EAE3D9] flex items-center gap-3">
          
          {/* Quantity stepper */}
          <div className="flex items-center border border-[#D7CCC0] rounded-lg bg-[#FAF8F5] p-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded flex items-center justify-center text-[#2A231E] hover:bg-[#EDE5DA] transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-9 text-center text-xs font-bold tabular-nums text-[#191614]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded flex items-center justify-center text-[#2A231E] hover:bg-[#EDE5DA] transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to order CTA */}
          <button
            type="button"
            onClick={handleConfirmAddToCart}
            className="flex-1 py-3 px-4 rounded-lg bg-[#2A231E] hover:bg-[#191614] text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-98 flex items-center justify-between cursor-pointer"
          >
            <span>Add to Order</span>
            <span className="tabular-nums font-bold text-sm text-[#FCD34D]">
              {settings.currencySymbol}{Math.round(currentTotal)}
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
