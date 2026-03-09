/**
 * Clothing Inventory Size Constants
 *
 * Predefined sizes for each clothing category in the inventory system.
 * ClothingCategory enum matches the GraphQL schema enum.
 */

export enum ClothingCategory {
  CHILDRENS_SOCKS = 'CHILDRENS_SOCKS',
  CHILDRENS_UNDERWEAR_BOY = 'CHILDRENS_UNDERWEAR_BOY',
  CHILDRENS_UNDERWEAR_GIRL = 'CHILDRENS_UNDERWEAR_GIRL',
  KIDS_SHOES = 'KIDS_SHOES',
  DIAPERS = 'DIAPERS',
  PULL_UPS = 'PULL_UPS',
  WIPES = 'WIPES',
  PAJAMAS_BOY = 'PAJAMAS_BOY',
  PAJAMAS_GIRL = 'PAJAMAS_GIRL',
}

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
