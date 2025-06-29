import { formatDate } from '@/app/lib/dateUtils';
import { Calendar, type CalendarProps } from 'primereact/calendar';

type TableHeaderProps = {
   date: Date;
   onDateChange: CalendarProps['onChange'];
};

export default function TableHeader({ date, onDateChange }: TableHeaderProps) {
   return (
      <div className='flex justify-between'>
         <h2 className='text-lg font-semibold'>
            Pick List for{' '}
            <span className='text-cyan-700'>{formatDate(date)}</span>
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
