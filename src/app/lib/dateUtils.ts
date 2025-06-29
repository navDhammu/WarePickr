import { format, subDays } from 'date-fns';

export function formatDate(date: Date) {
   return format(date, 'yyyy-MM-dd');
}

export function yesterday() {
   return subDays(new Date(), 1);
}
