import cafeDataRaw from './cafeData.json';
import { MenuItem, CafeSettings, MenuCategory } from '../types/cafe';

/**
 * All cafe configuration, items, and categories are loaded directly
 * from `/src/data/cafeData.json`.
 * If you ever need to add or modify items, prices (in INR), categories,
 * or WhatsApp contact info, simply edit `/src/data/cafeData.json`!
 */
export const CAFE_DATA = cafeDataRaw;

export const DEFAULT_CAFE_SETTINGS: CafeSettings = cafeDataRaw.settings;

export const MENU_ITEMS: MenuItem[] = cafeDataRaw.items as unknown as MenuItem[];

export const MENU_CATEGORIES: MenuCategory[] = cafeDataRaw.categories.map((cat) => ({
  ...cat,
  count: cat.id === 'all'
    ? MENU_ITEMS.length
    : MENU_ITEMS.filter((item) => item.category === cat.id).length,
}));
