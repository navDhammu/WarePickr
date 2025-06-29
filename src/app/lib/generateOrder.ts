import { faker } from '@faker-js/faker';
import boxes from '../../../data/boxes.ts';
import { GIFT_BOX_IDS, type GiftBoxId } from '../../../data/constants.ts';
import { formatDate, yesterday } from './dateUtils.ts';

const createLineItem = (productId: GiftBoxId) => {
   return {
      ...boxes[productId],
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

export const generateOrder = (options: {
   date?: Date;
   lineItems: ReturnType<typeof createLineItem>[][];
}) => {
   return {
      orderId: faker.string.uuid(),
      orderDate: formatDate(options?.date ?? yesterday()),
      orderTotal: parseFloat(faker.commerce.price()),
      shippingAddress: faker.location.streetAddress({ useFullAddress: true }),
      customerName: faker.person.fullName(),
      customerEmail: faker.internet.email(),
      lineItems: options.lineItems.flat(),
   };
};
