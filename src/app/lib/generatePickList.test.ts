import { test, expect, describe } from 'vitest';
import generatePickList from './generatePickList.ts';
import { generateOrder, valentineBox } from './generateOrder.ts';
import giftBoxes from '@/data/giftBoxes.ts';
import { GIFT_BOX_IDS } from '@/data/constants.ts';

describe('generatePickList', () => {
   test('returns an array of items with id, name, and quantity keys', () => {
      const orders = [generateOrder([valentineBox(1)])];
      const pickList = generatePickList(orders);
      pickList.forEach((item) => {
         expect(item).toHaveProperty('id');
         expect(item).toHaveProperty('name');
         expect(item).toHaveProperty('quantity');
      });
   });
   test('should not contain duplicate entries when multiple of the same box are ordered', () => {
      const orders = [generateOrder([valentineBox(2)])];
      const pickList = generatePickList(orders);
      const expectedItems = giftBoxes[GIFT_BOX_IDS.VALENTINE].items;
      expect(pickList).toHaveLength(expectedItems.length);
   });
   test('should aggregate the quantities when multiple of the same box are ordered', () => {
      const orders = [generateOrder([valentineBox(2)])];
      const pickList = generatePickList(orders);
      const expectedItems = giftBoxes[GIFT_BOX_IDS.VALENTINE].items;
      expectedItems.forEach((expectedItem) => {
         const pick = pickList.find((pick) => pick.id === expectedItem.itemId);
         expect(pick).toBeDefined();
         expect(pick?.quantity).toBe(expectedItem.quantity * 2);
      });
   });
});
