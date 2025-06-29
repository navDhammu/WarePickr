import generatePickList from '@/app/lib/generatePickList.ts';
import { NextResponse, NextRequest } from 'next/server';
import orders from '@/data/orders.json';
import { isValid, parse } from 'date-fns';
import { formatDate } from '@/app/lib/dateUtils.ts';

export async function GET(request: NextRequest) {
   const { searchParams } = new URL(request.url);
   if (!searchParams.has('date')) {
      return NextResponse.json(
         { error: 'Missing "date" query parameter' },
         { status: 400 }
      );
   }

   const dateString = searchParams.get('date')!;

   if (!isValidDateParam(dateString)) {
      return NextResponse.json(
         { error: 'Invalid date or date format' },
         { status: 400 }
      );
   }
   return NextResponse.json(
      generatePickList(orders, { date: new Date(dateString) })
   );
}

function isValidDateParam(dateStr: string): boolean {
   const parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
   return isValid(parsed) && dateStr === formatDate(parsed);
}
