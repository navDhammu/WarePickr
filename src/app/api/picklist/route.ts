import generatePickList from '@/app/lib/generatePickList.ts';
import { NextResponse, NextRequest } from 'next/server';
import orders from '@/data/orders.json';

export async function GET(request: NextRequest) {
   return NextResponse.json(generatePickList(orders));
}
