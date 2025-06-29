import giftBoxes from '@/data/giftBoxes.ts';
import items from '@/data/items.ts';

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

export default function generatePickList(orders: Order[]) {
   const result = [];
   for (let order of orders) {
      for (let lineItem of order.lineItems) {
         const giftBoxItems = giftBoxes[lineItem.productId].items;
         for (let { itemId, quantity } of giftBoxItems) {
            result.push({
               ...items[itemId],
               quantity,
               id: itemId,
            });
         }
      }
   }

   return result;
}
