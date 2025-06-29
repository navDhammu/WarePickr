import { yesterday } from '@/app/lib/dateUtils';
import { addDays, formatRelative, isSameDay, isToday, subDays } from 'date-fns';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

type TableHeaderProps = {
   date: Date;
   onDateChange: (date: Date) => void;
};

export default function TableHeader({ date, onDateChange }: TableHeaderProps) {
   return (
      <div className='flex justify-between'>
         <h2>
            <span className='font-semibold text-slate-400 text-sm uppercase'>
               Pick list for:{' '}
            </span>
            <div className='text-cyan-600 font-bold capitalize text-xl'>
               {formatRelativeCustom(date, new Date())}
            </div>
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
            <Button
               className='h-12 w-12'
               icon='pi pi-chevron-left'
               size='small'
               text
               onClick={() => onDateChange(subDays(date, 1))}
            />
            <Button
               className='h-12 w-12'
               icon='pi pi-chevron-right'
               size='small'
               text
               disabled={isToday(date)}
               onClick={() => onDateChange(addDays(date, 1))}
            />
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
