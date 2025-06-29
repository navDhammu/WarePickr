'use client';

import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PickList } from './lib/generatePickList';
import { subDays } from 'date-fns';
import { formatDate } from './lib/dateUtils';
import TableHeader from '@/components/Header';
import EmptyState from '@/components/EmptyState';
import Stats from '@/components/Stats';

export default function Home() {
   const [pickList, setPickList] = useState<PickList | null>(null);
   const [loading, setLoading] = useState(true);
   const [date, setDate] = useState(subDays(new Date(), 1));

   console.log(pickList);
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
         <Stats
            stats={[
               { label: 'Total Picks', value: pickList?.totalPicks },
               { label: 'Total Items', value: pickList?.itemsCount },
            ]}
         />
         <DataTable
            value={pickList?.items}
            emptyMessage={<EmptyState loading={loading} />}
            tableStyle={{ minWidth: '50rem' }}
            header={<TableHeader date={date} onDateChange={fetchPickList} />}
         >
            <Column field='id' header='Id' sortable />
            <Column
               field='image'
               header='Image'
               body={(rowData) => (
                  <img
                     src={rowData.image}
                     alt='Order'
                     className='w-16 h-16 object-cover rounded'
                  />
               )}
            />
            <Column field='name' header='Name' sortable />
            <Column field='location' header='Location' sortable />
            <Column field='quantity' header='Quantity' sortable />
         </DataTable>
      </div>
   );
}
