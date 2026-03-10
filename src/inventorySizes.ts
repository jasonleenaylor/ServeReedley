/**
 * Clothing Inventory Size Constants
 *
 * Predefined sizes for each clothing category in the inventory system.
 * ClothingCategory is imported from the generated API (GraphQL schema source of truth).
 */

import { ClothingCategory } from './API';
export { ClothingCategory };

export const CLOTHING_CATEGORY_LABELS: Record<ClothingCategory, string> = {
  [ClothingCategory.CHILDRENS_SOCKS]: "Children's Socks",
  [ClothingCategory.CHILDRENS_UNDERWEAR_BOY]: "Children's Underwear (Boy)",
  [ClothingCategory.CHILDRENS_UNDERWEAR_GIRL]: "Children's Underwear (Girl)",
  [ClothingCategory.KIDS_SHOES]: 'Kids Shoes',
  [ClothingCategory.DIAPERS]: 'Diapers',
  [ClothingCategory.PULL_UPS]: 'Pull-Ups',
  [ClothingCategory.WIPES]: 'Wipes',
  [ClothingCategory.PAJAMAS_BOY]: 'Pajamas (Boy)',
  [ClothingCategory.PAJAMAS_GIRL]: 'Pajamas (Girl)',
};

/**
 * Children's Socks - 4 sizes
 * Colors are intentionally purchased by size for easy identification.
 */
export const CHILDRENS_SOCKS_SIZES = [
  'Newborn',
  '6-12m',
  '12-36 months (Gray)',
  '4-7 years (Black)',
] as const;

/** Abbreviated display labels for socks (avoids wrapping on mobile) */
export const CHILDRENS_SOCKS_DISPLAY: Record<string, string> = {
  '12-36 months (Gray)': '12-36 mo (Gray)',
  '4-7 years (Black)': '4-7 yr (Black)',
};

/**
 * Children's Underwear (Boy) - 7 sizes
 */
export const CHILDRENS_UNDERWEAR_BOY_SIZES = [
  '4',
  '6',
  '8',
  '10',
  '12',
  '14',
  '16',
] as const;

/**
 * Children's Underwear (Girl) - 7 sizes
 */
export const CHILDRENS_UNDERWEAR_GIRL_SIZES = [
  '4',
  '6',
  '8',
  '10',
  '12',
  '14',
  '16',
] as const;

/**
 * Kids Shoes - 31 sizes
 * Infant/Toddler: 0-10 (11 sizes)
 * Little Kids: 10.5-13.5 (7 sizes)
 * Youth: 1Y-7Y (13 sizes)
 */
export const KIDS_SHOES_SIZES = [
  // Infant/Toddler (0-10)
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  // Little Kids (10.5-13.5)
  '10.5',
  '11',
  '11.5',
  '12',
  '12.5',
  '13',
  '13.5',
  // Youth (1Y-7Y)
  '1Y',
  '1.5Y',
  '2Y',
  '2.5Y',
  '3Y',
  '3.5Y',
  '4Y',
  '4.5Y',
  '5Y',
  '5.5Y',
  '6Y',
  '6.5Y',
  '7Y',
] as const;

/**
 * Diapers - 9 sizes
 */
export const DIAPERS_SIZES = [
  'Preemie',
  'Newborn',
  '#1',
  '#2',
  '#3',
  '#4',
  '#5',
  '#6',
  '#7',
] as const;

/**
 * Pull-Ups - 2 sizes
 */
export const PULL_UPS_SIZES = [
  '2T-3T',
  '3T-4T',
] as const;

/**
 * Wipes - 1 size
 */
export const WIPES_SIZES = [
  'Standard',
] as const;

/**
 * Pajamas (Boy) - 13 sizes
 */
export const PAJAMAS_BOY_SIZES = [
  'Preemie',
  'Newborn',
  '3 month',
  '6 month',
  '9 month',
  '12 month',
  '18 month',
  '24 month',
  '2T',
  '3T',
  '4T',
  '5T',
  '6',
] as const;

/**
 * Pajamas (Girl) - 13 sizes
 */
export const PAJAMAS_GIRL_SIZES = [
  'Preemie',
  'Newborn',
  '3 month',
  '6 month',
  '9 month',
  '12 month',
  '18 month',
  '24 month',
  '2T',
  '3T',
  '4T',
  '5T',
  '6',
] as const;

/**
 * Map of category to available sizes
 */
export const CATEGORY_SIZES: Record<ClothingCategory, readonly string[]> = {
  [ClothingCategory.CHILDRENS_SOCKS]: CHILDRENS_SOCKS_SIZES,
  [ClothingCategory.CHILDRENS_UNDERWEAR_BOY]: CHILDRENS_UNDERWEAR_BOY_SIZES,
  [ClothingCategory.CHILDRENS_UNDERWEAR_GIRL]: CHILDRENS_UNDERWEAR_GIRL_SIZES,
  [ClothingCategory.KIDS_SHOES]: KIDS_SHOES_SIZES,
  [ClothingCategory.DIAPERS]: DIAPERS_SIZES,
  [ClothingCategory.PULL_UPS]: PULL_UPS_SIZES,
  [ClothingCategory.WIPES]: WIPES_SIZES,
  [ClothingCategory.PAJAMAS_BOY]: PAJAMAS_BOY_SIZES,
  [ClothingCategory.PAJAMAS_GIRL]: PAJAMAS_GIRL_SIZES,
};

/**
 * Get sizes available for a given category
 */
export function getSizesForCategory(category: ClothingCategory): readonly string[] {
  return CATEGORY_SIZES[category] || [];
}

/**
 * Get display label for a category
 */
export function getCategoryLabel(category: ClothingCategory): string {
  return CLOTHING_CATEGORY_LABELS[category] || category;
}

/**
 * Get all categories as an array
 */
export function getAllCategories(): ClothingCategory[] {
  return Object.values(ClothingCategory);
}

/**
 * Composite row: maps a display size to its backend (category, size).
 * displayLabel overrides size for display when needed (e.g. "Wipes" instead of "Standard").
 */
export type CompositeInventoryRow = {
  category: ClothingCategory;
  size: string;
  displayLabel?: string;
};

/**
 * Display category: groups related categories into a single tab.
 * - Single: one category, no toggle
 * - Variants: multiple categories with a sub-toggle (e.g. Boy/Girl)
 * - Composite: one unified size list spanning multiple categories (e.g. Diapers & Baby Care)
 */
export type DisplayCategory =
  | { label: string; categories: readonly [ClothingCategory] }
  | {
      label: string;
      categories: readonly ClothingCategory[];
      variantLabels: readonly string[];
    }
  | { label: string; composite: readonly CompositeInventoryRow[] };

/**
 * Combined display categories (5 tabs instead of 9).
 * Diapers & Baby Care: diapers (smallest to largest), pull-ups as larger sizes, then wipes—no toggle.
 */
export const DIAPERS_BABY_CARE_ROWS: readonly CompositeInventoryRow[] = [
  ...DIAPERS_SIZES.map((size) => ({ category: ClothingCategory.DIAPERS, size })),
  ...PULL_UPS_SIZES.map((size) => ({
    category: ClothingCategory.PULL_UPS,
    size,
    displayLabel: `Pull-ups ${size}`,
  })),
  ...WIPES_SIZES.map((size) => ({ category: ClothingCategory.WIPES, size, displayLabel: 'Wipes' })),
];

export const DISPLAY_CATEGORIES: DisplayCategory[] = [
  { label: "Children's Socks", categories: [ClothingCategory.CHILDRENS_SOCKS] },
  {
    label: "Children's Underwear",
    categories: [
      ClothingCategory.CHILDRENS_UNDERWEAR_BOY,
      ClothingCategory.CHILDRENS_UNDERWEAR_GIRL,
    ],
    variantLabels: ['Boy', 'Girl'],
  },
  { label: 'Kids Shoes', categories: [ClothingCategory.KIDS_SHOES] },
  { label: 'Diapers & Baby Care', composite: DIAPERS_BABY_CARE_ROWS },
  {
    label: 'Pajamas',
    categories: [ClothingCategory.PAJAMAS_BOY, ClothingCategory.PAJAMAS_GIRL],
    variantLabels: ['Boy', 'Girl'],
  },
];

/**
 * Whether a display category has variants (shows a sub-toggle).
 */
export function hasVariants(
  dc: DisplayCategory
): dc is DisplayCategory & { variantLabels: readonly string[] } {
  return 'variantLabels' in dc && Array.isArray((dc as { variantLabels?: unknown }).variantLabels);
}

/**
 * Whether a display category is composite (unified list spanning multiple backend categories).
 */
export function isComposite(
  dc: DisplayCategory
): dc is DisplayCategory & { composite: readonly CompositeInventoryRow[] } {
  return 'composite' in dc && Array.isArray((dc as { composite?: unknown }).composite);
}

/**
 * Get the effective ClothingCategory for a display category and variant index.
 * Not used for composite categories (each row has its own category).
 */
export function getEffectiveCategory(
  displayCategory: DisplayCategory,
  variantIndex: number
): ClothingCategory {
  if (isComposite(displayCategory)) {
    return displayCategory.composite[0]?.category ?? ClothingCategory.DIAPERS;
  }
  const idx = Math.min(Math.max(0, variantIndex), displayCategory.categories.length - 1);
  return displayCategory.categories[idx];
}

/**
 * Get category rows for a display category. For composite, returns rows with category per row.
 * Composite rows may include optional displayLabel; use 'displayLabel' in row to detect.
 */
export function getCategoryRows(
  displayCategory: DisplayCategory,
  variantIndex: number
): readonly (CompositeInventoryRow | { category: ClothingCategory; size: string })[] {
  if (isComposite(displayCategory)) {
    return displayCategory.composite;
  }
  const category = getEffectiveCategory(displayCategory, variantIndex);
  return getSizesForCategory(category).map((size) => ({ category, size }));
}

/**
 * Get all display categories (for tabs).
 */
export function getAllDisplayCategories(): DisplayCategory[] {
  return DISPLAY_CATEGORIES;
}
