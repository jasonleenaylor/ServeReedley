import { describe, it, expect } from 'vitest';
import {
  ClothingCategory,
  CLOTHING_CATEGORY_LABELS,
  CHILDRENS_SOCKS_SIZES,
  CHILDRENS_UNDERWEAR_BOY_SIZES,
  CHILDRENS_UNDERWEAR_GIRL_SIZES,
  KIDS_SHOES_SIZES,
  DIAPERS_SIZES,
  PULL_UPS_SIZES,
  WIPES_SIZES,
  PAJAMAS_BOY_SIZES,
  PAJAMAS_GIRL_SIZES,
  CATEGORY_SIZES,
  DISPLAY_CATEGORIES,
  DIAPERS_BABY_CARE_ROWS,
  getSizesForCategory,
  getCategoryLabel,
  getAllCategories,
  getAllDisplayCategories,
  getCategoryRows,
  getEffectiveCategory,
  hasVariants,
  isComposite,
} from './inventorySizes';

describe('inventorySizes', () => {
  describe('ClothingCategory enum', () => {
    it('should have 9 categories', () => {
      const categories = Object.values(ClothingCategory);
      expect(categories).toHaveLength(9);
    });

    it('should contain expected categories', () => {
      expect(ClothingCategory.CHILDRENS_SOCKS).toBe('CHILDRENS_SOCKS');
      expect(ClothingCategory.CHILDRENS_UNDERWEAR_BOY).toBe('CHILDRENS_UNDERWEAR_BOY');
      expect(ClothingCategory.CHILDRENS_UNDERWEAR_GIRL).toBe('CHILDRENS_UNDERWEAR_GIRL');
      expect(ClothingCategory.KIDS_SHOES).toBe('KIDS_SHOES');
      expect(ClothingCategory.DIAPERS).toBe('DIAPERS');
      expect(ClothingCategory.PULL_UPS).toBe('PULL_UPS');
      expect(ClothingCategory.WIPES).toBe('WIPES');
      expect(ClothingCategory.PAJAMAS_BOY).toBe('PAJAMAS_BOY');
      expect(ClothingCategory.PAJAMAS_GIRL).toBe('PAJAMAS_GIRL');
    });
  });

  describe('Category labels', () => {
    it('should have labels for all categories', () => {
      const categories = Object.values(ClothingCategory) as ClothingCategory[];
      categories.forEach(cat => {
        expect(CLOTHING_CATEGORY_LABELS[cat]).toBeDefined();
        expect(typeof CLOTHING_CATEGORY_LABELS[cat]).toBe('string');
      });
    });

    it('should have human-readable labels', () => {
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.CHILDRENS_SOCKS]).toBe("Children's Socks");
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.CHILDRENS_UNDERWEAR_BOY]).toBe("Children's Underwear (Boy)");
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.CHILDRENS_UNDERWEAR_GIRL]).toBe("Children's Underwear (Girl)");
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.KIDS_SHOES]).toBe('Kids Shoes');
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.DIAPERS]).toBe('Diapers');
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.PULL_UPS]).toBe('Pull-Ups');
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.WIPES]).toBe('Wipes');
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.PAJAMAS_BOY]).toBe('Pajamas (Boy)');
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.PAJAMAS_GIRL]).toBe('Pajamas (Girl)');
    });
  });

  describe("Children's Socks sizes", () => {
    it('should have 4 sizes', () => {
      expect(CHILDRENS_SOCKS_SIZES).toHaveLength(4);
    });

    it('should contain expected sizes', () => {
      expect(CHILDRENS_SOCKS_SIZES).toContain('Newborn');
      expect(CHILDRENS_SOCKS_SIZES).toContain('6-12m');
      expect(CHILDRENS_SOCKS_SIZES).toContain('12-36 months (Gray)');
      expect(CHILDRENS_SOCKS_SIZES).toContain('4-7 years (Black)');
    });
  });

  describe("Children's Underwear (Boy) sizes", () => {
    it('should have 7 sizes', () => {
      expect(CHILDRENS_UNDERWEAR_BOY_SIZES).toHaveLength(7);
    });

    it('should contain expected sizes', () => {
      expect(CHILDRENS_UNDERWEAR_BOY_SIZES).toContain('4');
      expect(CHILDRENS_UNDERWEAR_BOY_SIZES).toContain('6');
      expect(CHILDRENS_UNDERWEAR_BOY_SIZES).toContain('8');
      expect(CHILDRENS_UNDERWEAR_BOY_SIZES).toContain('10');
      expect(CHILDRENS_UNDERWEAR_BOY_SIZES).toContain('12');
      expect(CHILDRENS_UNDERWEAR_BOY_SIZES).toContain('14');
      expect(CHILDRENS_UNDERWEAR_BOY_SIZES).toContain('16');
    });
  });

  describe("Children's Underwear (Girl) sizes", () => {
    it('should have 7 sizes', () => {
      expect(CHILDRENS_UNDERWEAR_GIRL_SIZES).toHaveLength(7);
    });

    it('should contain expected sizes', () => {
      expect(CHILDRENS_UNDERWEAR_GIRL_SIZES).toContain('4');
      expect(CHILDRENS_UNDERWEAR_GIRL_SIZES).toContain('6');
      expect(CHILDRENS_UNDERWEAR_GIRL_SIZES).toContain('8');
      expect(CHILDRENS_UNDERWEAR_GIRL_SIZES).toContain('10');
      expect(CHILDRENS_UNDERWEAR_GIRL_SIZES).toContain('12');
      expect(CHILDRENS_UNDERWEAR_GIRL_SIZES).toContain('14');
      expect(CHILDRENS_UNDERWEAR_GIRL_SIZES).toContain('16');
    });
  });

  describe('Kids Shoes sizes', () => {
    it('should have 31 sizes', () => {
      expect(KIDS_SHOES_SIZES).toHaveLength(31);
    });

    it('should contain infant/toddler sizes (0-10)', () => {
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].forEach(size => {
        expect(KIDS_SHOES_SIZES).toContain(size);
      });
    });

    it('should contain little kids sizes (10.5-13.5)', () => {
      ['10.5', '11', '11.5', '12', '12.5', '13', '13.5'].forEach(size => {
        expect(KIDS_SHOES_SIZES).toContain(size);
      });
    });

    it('should contain youth sizes (1Y-7Y)', () => {
      ['1Y', '1.5Y', '2Y', '2.5Y', '3Y', '3.5Y', '4Y', '4.5Y', '5Y', '5.5Y', '6Y', '6.5Y', '7Y'].forEach(size => {
        expect(KIDS_SHOES_SIZES).toContain(size);
      });
    });
  });

  describe('Diapers sizes', () => {
    it('should have 9 sizes', () => {
      expect(DIAPERS_SIZES).toHaveLength(9);
    });

    it('should contain expected sizes', () => {
      expect(DIAPERS_SIZES).toContain('Preemie');
      expect(DIAPERS_SIZES).toContain('Newborn');
      expect(DIAPERS_SIZES).toContain('#1');
      expect(DIAPERS_SIZES).toContain('#2');
      expect(DIAPERS_SIZES).toContain('#3');
      expect(DIAPERS_SIZES).toContain('#4');
      expect(DIAPERS_SIZES).toContain('#5');
      expect(DIAPERS_SIZES).toContain('#6');
      expect(DIAPERS_SIZES).toContain('#7');
    });
  });

  describe('Pull-Ups sizes', () => {
    it('should have 2 sizes', () => {
      expect(PULL_UPS_SIZES).toHaveLength(2);
    });

    it('should contain expected sizes', () => {
      expect(PULL_UPS_SIZES).toContain('2T-3T');
      expect(PULL_UPS_SIZES).toContain('3T-4T');
    });
  });

  describe('Wipes sizes', () => {
    it('should have 1 size', () => {
      expect(WIPES_SIZES).toHaveLength(1);
    });

    it('should contain expected sizes', () => {
      expect(WIPES_SIZES).toContain('Standard');
    });
  });

  describe('Pajamas (Boy) sizes', () => {
    it('should have 13 sizes', () => {
      expect(PAJAMAS_BOY_SIZES).toHaveLength(13);
    });

    it('should contain expected sizes', () => {
      ['Preemie', 'Newborn', '3 month', '6 month', '9 month', '12 month',
       '18 month', '24 month', '2T', '3T', '4T', '5T', '6'].forEach(size => {
        expect(PAJAMAS_BOY_SIZES).toContain(size);
      });
    });
  });

  describe('Pajamas (Girl) sizes', () => {
    it('should have 13 sizes', () => {
      expect(PAJAMAS_GIRL_SIZES).toHaveLength(13);
    });

    it('should contain expected sizes', () => {
      ['Preemie', 'Newborn', '3 month', '6 month', '9 month', '12 month',
       '18 month', '24 month', '2T', '3T', '4T', '5T', '6'].forEach(size => {
        expect(PAJAMAS_GIRL_SIZES).toContain(size);
      });
    });
  });

  describe('getSizesForCategory', () => {
    it('should return correct sizes for each category', () => {
      expect(getSizesForCategory(ClothingCategory.CHILDRENS_SOCKS)).toEqual(CHILDRENS_SOCKS_SIZES);
      expect(getSizesForCategory(ClothingCategory.CHILDRENS_UNDERWEAR_BOY)).toEqual(CHILDRENS_UNDERWEAR_BOY_SIZES);
      expect(getSizesForCategory(ClothingCategory.CHILDRENS_UNDERWEAR_GIRL)).toEqual(CHILDRENS_UNDERWEAR_GIRL_SIZES);
      expect(getSizesForCategory(ClothingCategory.KIDS_SHOES)).toEqual(KIDS_SHOES_SIZES);
      expect(getSizesForCategory(ClothingCategory.DIAPERS)).toEqual(DIAPERS_SIZES);
      expect(getSizesForCategory(ClothingCategory.PULL_UPS)).toEqual(PULL_UPS_SIZES);
      expect(getSizesForCategory(ClothingCategory.WIPES)).toEqual(WIPES_SIZES);
      expect(getSizesForCategory(ClothingCategory.PAJAMAS_BOY)).toEqual(PAJAMAS_BOY_SIZES);
      expect(getSizesForCategory(ClothingCategory.PAJAMAS_GIRL)).toEqual(PAJAMAS_GIRL_SIZES);
    });
  });

  describe('getCategoryLabel', () => {
    it('should return correct label for each category', () => {
      expect(getCategoryLabel(ClothingCategory.CHILDRENS_SOCKS)).toBe("Children's Socks");
      expect(getCategoryLabel(ClothingCategory.CHILDRENS_UNDERWEAR_BOY)).toBe("Children's Underwear (Boy)");
      expect(getCategoryLabel(ClothingCategory.CHILDRENS_UNDERWEAR_GIRL)).toBe("Children's Underwear (Girl)");
      expect(getCategoryLabel(ClothingCategory.KIDS_SHOES)).toBe('Kids Shoes');
      expect(getCategoryLabel(ClothingCategory.DIAPERS)).toBe('Diapers');
      expect(getCategoryLabel(ClothingCategory.PULL_UPS)).toBe('Pull-Ups');
      expect(getCategoryLabel(ClothingCategory.WIPES)).toBe('Wipes');
      expect(getCategoryLabel(ClothingCategory.PAJAMAS_BOY)).toBe('Pajamas (Boy)');
      expect(getCategoryLabel(ClothingCategory.PAJAMAS_GIRL)).toBe('Pajamas (Girl)');
    });
  });

  describe('getAllCategories', () => {
    it('should return all 9 categories', () => {
      const categories = getAllCategories();
      expect(categories).toHaveLength(9);
      expect(categories).toContain(ClothingCategory.CHILDRENS_SOCKS);
      expect(categories).toContain(ClothingCategory.CHILDRENS_UNDERWEAR_BOY);
      expect(categories).toContain(ClothingCategory.CHILDRENS_UNDERWEAR_GIRL);
      expect(categories).toContain(ClothingCategory.KIDS_SHOES);
      expect(categories).toContain(ClothingCategory.DIAPERS);
      expect(categories).toContain(ClothingCategory.PULL_UPS);
      expect(categories).toContain(ClothingCategory.WIPES);
      expect(categories).toContain(ClothingCategory.PAJAMAS_BOY);
      expect(categories).toContain(ClothingCategory.PAJAMAS_GIRL);
    });
  });

  describe('CATEGORY_SIZES mapping', () => {
    it('should have all categories mapped', () => {
      const categories = Object.values(ClothingCategory) as ClothingCategory[];
      categories.forEach(cat => {
        expect(CATEGORY_SIZES[cat]).toBeDefined();
        expect(Array.isArray(CATEGORY_SIZES[cat])).toBe(true);
      });
    });

    it('should have correct total of 87 sizes across all categories', () => {
      const totalSizes = Object.values(CATEGORY_SIZES).reduce(
        (sum, sizes) => sum + sizes.length,
        0
      );
      expect(totalSizes).toBe(87);
    });
  });

  describe('Display categories (combined)', () => {
    it('should have 5 display categories', () => {
      expect(DISPLAY_CATEGORIES).toHaveLength(5);
      expect(getAllDisplayCategories()).toEqual(DISPLAY_CATEGORIES);
    });

    it('should have single-category items for Socks and Shoes', () => {
      expect(hasVariants(DISPLAY_CATEGORIES[0])).toBe(false);
      expect(hasVariants(DISPLAY_CATEGORIES[2])).toBe(false);
    });

    it('should have variants for Underwear and Pajamas (Boy/Girl)', () => {
      expect(hasVariants(DISPLAY_CATEGORIES[1])).toBe(true);
      expect(hasVariants(DISPLAY_CATEGORIES[4])).toBe(true);
      if (hasVariants(DISPLAY_CATEGORIES[1])) {
        expect(DISPLAY_CATEGORIES[1].variantLabels).toEqual(['Boy', 'Girl']);
      }
      if (hasVariants(DISPLAY_CATEGORIES[4])) {
        expect(DISPLAY_CATEGORIES[4].variantLabels).toEqual(['Boy', 'Girl']);
      }
    });

    it('Diapers & Baby Care should be composite (no toggle): diapers, pull-ups, wipes in one list', () => {
      const babyCare = DISPLAY_CATEGORIES[3];
      expect(hasVariants(babyCare)).toBe(false);
      expect(isComposite(babyCare)).toBe(true);
      if (isComposite(babyCare)) {
        expect(babyCare.composite).toEqual(DIAPERS_BABY_CARE_ROWS);
        expect(babyCare.composite.length).toBe(12); // 9 diapers + 2 pull-ups + 1 wipes
        expect(babyCare.composite.slice(0, 9).every((r) => r.category === ClothingCategory.DIAPERS)).toBe(true);
        expect(babyCare.composite.slice(9, 11).every((r) => r.category === ClothingCategory.PULL_UPS)).toBe(true);
        expect(babyCare.composite[11].category).toBe(ClothingCategory.WIPES);
        expect(babyCare.composite[11].size).toBe('Standard');
        expect(babyCare.composite[11].displayLabel).toBe('Wipes');
      }
    });

    it('getCategoryRows for Diapers & Baby Care returns diapers then pull-ups then wipes', () => {
      const rows = getCategoryRows(DISPLAY_CATEGORIES[3], 0);
      expect(rows.length).toBe(12);
      expect(rows[0]).toEqual({ category: ClothingCategory.DIAPERS, size: 'Preemie' });
      expect(rows[8]).toEqual({ category: ClothingCategory.DIAPERS, size: '#7' });
      expect(rows[9]).toEqual({
        category: ClothingCategory.PULL_UPS,
        size: '2T-3T',
        displayLabel: 'Pull-ups 2T-3T',
      });
      expect(rows[10]).toEqual({
        category: ClothingCategory.PULL_UPS,
        size: '3T-4T',
        displayLabel: 'Pull-ups 3T-4T',
      });
      expect(rows[11]).toEqual({
        category: ClothingCategory.WIPES,
        size: 'Standard',
        displayLabel: 'Wipes',
      });
    });

    it('getEffectiveCategory should return correct category for Underwear and Pajamas variants', () => {
      const underwear = DISPLAY_CATEGORIES[1];
      expect(getEffectiveCategory(underwear, 0)).toBe(ClothingCategory.CHILDRENS_UNDERWEAR_BOY);
      expect(getEffectiveCategory(underwear, 1)).toBe(ClothingCategory.CHILDRENS_UNDERWEAR_GIRL);
      const pajamas = DISPLAY_CATEGORIES[4];
      expect(getEffectiveCategory(pajamas, 0)).toBe(ClothingCategory.PAJAMAS_BOY);
      expect(getEffectiveCategory(pajamas, 1)).toBe(ClothingCategory.PAJAMAS_GIRL);
    });

    it('getEffectiveCategory should return single category for non-variant items', () => {
      expect(getEffectiveCategory(DISPLAY_CATEGORIES[0], 0)).toBe(ClothingCategory.CHILDRENS_SOCKS);
      expect(getEffectiveCategory(DISPLAY_CATEGORIES[0], 99)).toBe(ClothingCategory.CHILDRENS_SOCKS);
    });
  });
});
