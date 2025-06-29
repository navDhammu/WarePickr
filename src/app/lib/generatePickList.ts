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

type Item = (typeof items)[number] & {
   id: number;
   quantity: number;
};

const addItem = (map: Map<Item['id'], Item>, item: Item) => {
   const prevItem = map.get(item.id);
   if (prevItem) {
      map.set(item.id, {
         ...prevItem,
         quantity: prevItem.quantity + item.quantity,
      });
   } else {
      map.set(item.id, item);
   }
};

export default function generatePickList(
   orders: Order[],
   options?: {
      date: Date;
   }
) {
   const itemsMap = new Map();

   for (let order of orders) {
      if (
         options?.date &&
         !isSameDay(new Date(order.orderDate), options.date)
      ) {
         continue;
      }

      for (let lineItem of order.lineItems) {
         const giftBoxItems = giftBoxes[lineItem.productId].items;
         for (let { itemId, quantity } of giftBoxItems) {
            const item = { ...items[itemId], id: itemId, quantity };
            addItem(itemsMap, item);
         }
      }
   }

   return Array.from(itemsMap.values());
}
