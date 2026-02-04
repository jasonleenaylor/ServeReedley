import { describe, it, expect } from 'vitest';
import {
  ClothingCategory,
  CLOTHING_CATEGORY_LABELS,
  CHILDRENS_SOCKS_SIZES,
  CHILDRENS_UNDERWEAR_SIZES,
  KIDS_SHOES_SIZES,
  DIAPERS_SIZES,
  CATEGORY_SIZES,
  getSizesForCategory,
  getCategoryLabel,
  getAllCategories,
} from './inventorySizes';

describe('inventorySizes', () => {
  describe('ClothingCategory enum', () => {
    it('should have 4 categories', () => {
      const categories = Object.values(ClothingCategory);
      expect(categories).toHaveLength(4);
    });

    it('should contain expected categories', () => {
      expect(ClothingCategory.CHILDRENS_SOCKS).toBe('CHILDRENS_SOCKS');
      expect(ClothingCategory.CHILDRENS_UNDERWEAR).toBe('CHILDRENS_UNDERWEAR');
      expect(ClothingCategory.KIDS_SHOES).toBe('KIDS_SHOES');
      expect(ClothingCategory.DIAPERS).toBe('DIAPERS');
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
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.CHILDRENS_UNDERWEAR]).toBe("Children's Underwear");
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.KIDS_SHOES]).toBe('Kids Shoes');
      expect(CLOTHING_CATEGORY_LABELS[ClothingCategory.DIAPERS]).toBe('Diapers');
    });
  });

  describe("Children's Socks sizes", () => {
    it('should have 5 sizes', () => {
      expect(CHILDRENS_SOCKS_SIZES).toHaveLength(5);
    });

    it('should contain expected sizes', () => {
      expect(CHILDRENS_SOCKS_SIZES).toContain('Newborn');
      expect(CHILDRENS_SOCKS_SIZES).toContain('6-12m');
      expect(CHILDRENS_SOCKS_SIZES).toContain('12-24m');
      expect(CHILDRENS_SOCKS_SIZES).toContain('2T-3T');
      expect(CHILDRENS_SOCKS_SIZES).toContain('4T-5T');
    });
  });

  describe("Children's Underwear sizes", () => {
    it('should have 7 sizes', () => {
      expect(CHILDRENS_UNDERWEAR_SIZES).toHaveLength(7);
    });

    it('should contain expected sizes', () => {
      expect(CHILDRENS_UNDERWEAR_SIZES).toContain('4');
      expect(CHILDRENS_UNDERWEAR_SIZES).toContain('6');
      expect(CHILDRENS_UNDERWEAR_SIZES).toContain('8');
      expect(CHILDRENS_UNDERWEAR_SIZES).toContain('10');
      expect(CHILDRENS_UNDERWEAR_SIZES).toContain('12');
      expect(CHILDRENS_UNDERWEAR_SIZES).toContain('14');
      expect(CHILDRENS_UNDERWEAR_SIZES).toContain('16');
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

  describe('getSizesForCategory', () => {
    it('should return correct sizes for each category', () => {
      expect(getSizesForCategory(ClothingCategory.CHILDRENS_SOCKS)).toEqual(CHILDRENS_SOCKS_SIZES);
      expect(getSizesForCategory(ClothingCategory.CHILDRENS_UNDERWEAR)).toEqual(CHILDRENS_UNDERWEAR_SIZES);
      expect(getSizesForCategory(ClothingCategory.KIDS_SHOES)).toEqual(KIDS_SHOES_SIZES);
      expect(getSizesForCategory(ClothingCategory.DIAPERS)).toEqual(DIAPERS_SIZES);
    });
  });

  describe('getCategoryLabel', () => {
    it('should return correct label for each category', () => {
      expect(getCategoryLabel(ClothingCategory.CHILDRENS_SOCKS)).toBe("Children's Socks");
      expect(getCategoryLabel(ClothingCategory.CHILDRENS_UNDERWEAR)).toBe("Children's Underwear");
      expect(getCategoryLabel(ClothingCategory.KIDS_SHOES)).toBe('Kids Shoes');
      expect(getCategoryLabel(ClothingCategory.DIAPERS)).toBe('Diapers');
    });
  });

  describe('getAllCategories', () => {
    it('should return all 4 categories', () => {
      const categories = getAllCategories();
      expect(categories).toHaveLength(4);
      expect(categories).toContain(ClothingCategory.CHILDRENS_SOCKS);
      expect(categories).toContain(ClothingCategory.CHILDRENS_UNDERWEAR);
      expect(categories).toContain(ClothingCategory.KIDS_SHOES);
      expect(categories).toContain(ClothingCategory.DIAPERS);
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

    it('should have correct total of 52 sizes across all categories', () => {
      const totalSizes = Object.values(CATEGORY_SIZES).reduce(
        (sum, sizes) => sum + sizes.length,
        0
      );
      expect(totalSizes).toBe(52);
    });
  });
});
