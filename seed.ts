import fs from 'node:fs';
import {
   generateOrder,
   valentineBox,
   birthdayBox,
   clientGiftBox,
} from '@/app/lib/generateOrder';
import { subDays } from 'date-fns';
import { yesterday } from '@/app/lib/dateUtils.ts';

const orders = [
   // One of each
   generateOrder({
      lineItems: [valentineBox(1), birthdayBox(1), clientGiftBox(1)],
   }),
   generateOrder({
      lineItems: [valentineBox(2), birthdayBox(3), clientGiftBox(2)],
   }),
   generateOrder({
      date: subDays(yesterday(), 1),
      lineItems: [valentineBox(2)],
   }),
   generateOrder({
      date: subDays(yesterday(), 2),
      lineItems: [valentineBox(1), clientGiftBox(2)],
   }),
];

fs.writeFileSync('./data/orders.json', JSON.stringify(orders));
