import { faker } from '@faker-js/faker';
import giftBoxes from '../../../data/giftBoxes.ts';
import { GIFT_BOX_IDS } from '../../../data/constants.ts';
import { endOfYesterday, formatISO } from 'date-fns';

const createLineItem = (productId: keyof typeof giftBoxes) => {
   const { items, ...giftBox } = giftBoxes[productId];
   return {
      ...giftBox,
      productId,
      lineItemId: `ln-${faker.string.numeric(5)}`,
   };
};

export const valentineBox = (count: number) => {
   return Array.from({ length: count }, () =>
      createLineItem(GIFT_BOX_IDS.VALENTINE)
   );
};
export const birthdayBox = (count: number) => {
   return Array.from({ length: count }, () =>
      createLineItem(GIFT_BOX_IDS.BIRTHDAY)
   );
};
export const clientGiftBox = (count: number) => {
   return Array.from({ length: count }, () =>
      createLineItem(GIFT_BOX_IDS.CLIENT)
   );
};

export const generateOrder = (
   lineItems: ReturnType<typeof createLineItem>[][]
) => {
   return {
      orderId: faker.string.uuid(),
      orderDate: formatISO(endOfYesterday()),
      orderTotal: parseFloat(faker.commerce.price()),
      shippingAddress: faker.location.streetAddress({ useFullAddress: true }),
      customerName: faker.person.fullName(),
      customerEmail: faker.internet.email(),
      lineItems: lineItems.flat(),
   };
};
