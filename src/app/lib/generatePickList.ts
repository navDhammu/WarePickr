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

type ItemsMap = Map<Item['id'], Item>;

const addItem = (map: ItemsMap, item: Item) => {
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

export type PickList = ReturnType<typeof generatePickList>;

export default function generatePickList(
   orders: Order[],
   options?: {
      date: Date;
   }
) {
   const itemsMap: ItemsMap = new Map();
   let totalPicks = 0;

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
            totalPicks++;
         }
      }
   }

   return {
      items: Array.from(itemsMap.values()),
      itemsCount: itemsMap.size,
      totalPicks,
   };
}
