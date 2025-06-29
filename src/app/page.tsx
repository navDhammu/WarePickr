'use client';

import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PickList } from './lib/generatePickList';
import { subDays } from 'date-fns';
import { formatDate } from './lib/dateUtils';
import TableHeader from '@/components/Header';
import EmptyState from '@/components/EmptyState';

export default function Home() {
   const [pickList, setPickList] = useState<PickList>([]);
   const [loading, setLoading] = useState(true);
   const [date, setDate] = useState(subDays(new Date(), 1));

   const fetchPickList = async (date: Date) => {
      setLoading(true);
      try {
         const response = await fetch(`/api/picklist?date=${formatDate(date)}`);
         if (response.ok) {
            setPickList(await response.json());
         }
      } finally {
         setLoading(false);
         setDate(date);
      }
   };

   useEffect(() => {
      fetchPickList(date);
   }, []);

   return (
      <div className='p-2 sm:p-4 md:p-6 lg:p-8'>
         <img src='/WarePickr.png' width={150} className='mb-3' />
         <DataTable
            value={pickList}
            emptyMessage={<EmptyState loading={loading} />}
            tableStyle={{ minWidth: '50rem' }}
            header={
               <TableHeader
                  date={date}
                  onDateChange={({ value }) => {
                     if (value) {
                        fetchPickList(value);
                     }
                  }}
               />
            }
         >
            <Column field='id' header='Id'></Column>
            <Column field='name' header='Name'></Column>
            <Column field='quantity' header='Quantity'></Column>
         </DataTable>
      </div>
   );
}
