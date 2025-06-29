import fs from 'node:fs';
import {
   generateOrder,
   valentineBox,
   birthdayBox,
   clientGiftBox,
} from '@/app/lib/generateOrder';

const orders = [
   // One of each
   generateOrder([valentineBox(1), birthdayBox(1), clientGiftBox(1)]),
   generateOrder([valentineBox(2), birthdayBox(3), clientGiftBox(1)]),
];

fs.writeFileSync('./data/orders.json', JSON.stringify(orders));
