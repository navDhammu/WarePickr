import { formatRelative } from 'date-fns';
import { Calendar, type CalendarProps } from 'primereact/calendar';

type TableHeaderProps = {
   date: Date;
   onDateChange: CalendarProps['onChange'];
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
         <Calendar
            className='mb-3'
            dateFormat='yy-mm-dd'
            value={date}
            onChange={onDateChange}
            showIcon
         />
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
