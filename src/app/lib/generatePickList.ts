import giftBoxes from '@/data/giftBoxes.ts';
import items from '@/data/items.ts';
import { isSameDay } from 'date-fns';

type Order = {
   orderId: string;
   orderDate: string;
   orderTotal: number;
   shippingAddress: string;
   customerName: string;
   customerEmail: string;
   lineItems: {
      lineItemId: string;
      productId: number;
      name: string;
      price: number;
   }[];
};

export type PickList = {
   id: number;
   name: string;
   quantity: number;
}[];

export default function generatePickList(
   orders: Order[],
   options?: {
      date: Date;
   }
): PickList {
   const itemsMap = new Map();
   if (options?.date) {
      const date = new Date(options.date);
   }
   for (let order of orders) {
      if (options?.date && !isSameDay(new Date(order.orderDate), options.date))
         continue;

      for (let lineItem of order.lineItems) {
         const giftBoxItems = giftBoxes[lineItem.productId].items;
         for (let { itemId, quantity } of giftBoxItems) {
            const item = { ...items[itemId], id: itemId, quantity };
            const prevItem = itemsMap.get(itemId);
            if (prevItem) {
               itemsMap.set(itemId, {
                  ...prevItem,
                  quantity: prevItem.quantity + quantity,
               });
            } else {
               itemsMap.set(itemId, item);
            }
         }
      }
   }
   return Array.from(itemsMap.values());
}
