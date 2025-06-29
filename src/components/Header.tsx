import { yesterday } from '@/app/lib/dateUtils';
import { formatRelative, isSameDay } from 'date-fns';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

type TableHeaderProps = {
   date: Date;
   onDateChange: (date: Date) => void;
};

export default function TableHeader({ date, onDateChange }: TableHeaderProps) {
   return (
      <div className='flex justify-between'>
         <h2 className='text-lg'>
            <span className='font-semibold'>Pick list for: </span>
            <span className='text-cyan-600 font-bold text-md'>
               {formatRelativeCustom(date, new Date()).toUpperCase()}
            </span>
         </h2>
         <div className='flex gap-4'>
            {!isSameDay(date, yesterday()) && (
               <Button
                  className='h-12'
                  label='Jump to yesterday'
                  severity='info'
                  outlined
                  onClick={() => onDateChange(yesterday())}
               />
            )}

            <Calendar
               className='mb-3'
               dateFormat='yy-mm-dd'
               value={date}
               onChange={({ value }) => onDateChange(value!)}
               showIcon
            />
         </div>
      </div>
   );
}

function formatRelativeCustom(date: Date, baseDate: Date) {
   const formatted = formatRelative(date, baseDate);
   const arr = formatted.split(' ');
   const index = arr.findIndex((val) => val === 'at');
   if (index > -1) return arr.slice(0, index).join(' ');
   return formatted;
}
