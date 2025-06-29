import { GIFT_BOX_IDS, ITEM_IDS } from './constants.ts';

export default {
   [GIFT_BOX_IDS.VALENTINE]: [
      { itemId: ITEM_IDS.RED_ROSES, quantity: 1 },
      { itemId: ITEM_IDS.CHOCOLATES, quantity: 1 },
      { itemId: ITEM_IDS.LOVE_CARD, quantity: 1 },
      { itemId: ITEM_IDS.WOMENS_PERFUME, quantity: 1 },
   ],
   [GIFT_BOX_IDS.BIRTHDAY]: [
      { itemId: ITEM_IDS.BIRTHDAY_CUPCAKE, quantity: 1 },
      { itemId: ITEM_IDS.VISA_GIFT_CARD, quantity: 1 },
      { itemId: ITEM_IDS.BIRTHDAY_CARD, quantity: 1 },
   ],

   [GIFT_BOX_IDS.CLIENT]: [
      { itemId: ITEM_IDS.WINE_BOTTLE, quantity: 1 },
      { itemId: ITEM_IDS.FRUIT_BASKET, quantity: 1 },
      { itemId: ITEM_IDS.PEN, quantity: 1 },
   ],
};
