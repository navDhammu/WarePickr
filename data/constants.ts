export const GIFT_BOX_IDS = {
   VALENTINE: 1000,
   BIRTHDAY: 1001,
   CLIENT: 1002,
};

export const ITEM_IDS = {
   RED_ROSES: 2000,
   CHOCOLATES: 2001,
   LOVE_CARD: 2002,
   WOMENS_PERFUME: 2003,
   BIRTHDAY_CUPCAKE: 2004,
   VISA_GIFT_CARD: 2005,
   BIRTHDAY_CARD: 2006,
   WINE_BOTTLE: 2007,
   FRUIT_BASKET: 2008,
   PEN: 2009,
};

export type GiftBoxId = (typeof GIFT_BOX_IDS)[keyof typeof GIFT_BOX_IDS];
