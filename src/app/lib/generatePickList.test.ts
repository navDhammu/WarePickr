import { test, expect, describe } from 'vitest';
import generatePickList from './generatePickList.ts';
import { generateOrder, valentineBox } from './generateOrder.ts';
import giftBoxes from '@/data/giftBoxes.ts';
import { GIFT_BOX_IDS } from '@/data/constants.ts';

describe('generatePickList', () => {
   test('returns an array of items with id, name, and quantity keys', () => {
      const orders = [generateOrder([valentineBox(2)])];
      const pickList = generatePickList(orders);
      pickList.forEach((item) => {
         expect(item).toHaveProperty('id');
         expect(item).toHaveProperty('name');
         expect(item).toHaveProperty('quantity');
      });
   });
});
