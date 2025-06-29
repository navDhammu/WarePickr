import { test, expect, describe } from 'vitest';
import generatePickList from './generatePickList.ts';
import {
   birthdayBox,
   clientGiftBox,
   generateOrder,
   valentineBox,
} from './generateOrder.ts';
import boxItemsMapping from '@/data/boxItemsMapping.ts';
import { GIFT_BOX_IDS } from '@/data/constants.ts';
import { yesterday } from './dateUtils.ts';
import { subDays } from 'date-fns';

describe('generatePickList', () => {
   test('returns an object with items array, itemsCount and totalPicks', () => {
      const orders = [generateOrder({ lineItems: [valentineBox(1)] })];
      const pickList = generatePickList(orders);
      expect(typeof pickList).toBe('object');
      expect(pickList).toHaveProperty('items');
      expect(pickList).toHaveProperty('itemsCount');
      expect(pickList).toHaveProperty('totalPicks');

      for (let item of pickList.items) {
         expect(item).toHaveProperty('id');
         expect(item).toHaveProperty('name');
         expect(item).toHaveProperty('quantity');
         expect(item).toHaveProperty('location');
         expect(item).toHaveProperty('image');
      }
   });

   test('should not contain duplicate entries when multiple of the same box are ordered', () => {
      const orders = [generateOrder({ lineItems: [valentineBox(2)] })];
      const pickList = generatePickList(orders);
      const expectedItems = boxItemsMapping[GIFT_BOX_IDS.VALENTINE];
      expect(pickList.items).toHaveLength(expectedItems.length);
   });

   test('should aggregate the quantities when multiple of the same box are ordered', () => {
      const orders = [generateOrder({ lineItems: [valentineBox(2)] })];
      const pickList = generatePickList(orders);
      const expectedItems = boxItemsMapping[GIFT_BOX_IDS.VALENTINE];
      expectedItems.forEach((expectedItem) => {
         const pick = pickList.items.find(
            (pick) => pick.id === expectedItem.itemId
         );
         expect(pick).toBeDefined();
         expect(pick?.quantity).toBe(expectedItem.quantity * 2);
      });
   });

   test('when date is passed as an option, it should only include pick list items for that date', () => {
      const yesterdaysOrder = generateOrder({ lineItems: [clientGiftBox(1)] });
      const twoDaysAgoOrder = generateOrder({
         date: subDays(new Date(), 2),
         lineItems: [birthdayBox(1)],
      });
      const pickList = generatePickList([yesterdaysOrder, twoDaysAgoOrder], {
         date: yesterday(),
      });
      const expectedItemIds = boxItemsMapping[GIFT_BOX_IDS.CLIENT].map(
         (item) => item.itemId
      );
      pickList.items.forEach((pickListItem) => {
         expect(expectedItemIds).toContain(pickListItem.id);
      });
   });

   test('when no order matches with date, it should return an empty array', () => {
      const yesterdaysOrder = generateOrder({ lineItems: [clientGiftBox(1)] });
      const pickList = generatePickList([yesterdaysOrder], {
         date: subDays(new Date(), 3),
      });
      expect(pickList.items).toHaveLength(0);
   });
});
