'use client';

import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PickList } from './lib/generatePickList';

export default function Home() {
   const [pickList, setPickList] = useState<PickList>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      (async () => {
         const response = await fetch('/api/picklist');
         const list = await response.json();
         setPickList(list);
         setLoading(false);
      })();
   }, []);

   return (
      <div className='card'>
         <DataTable
            value={pickList}
            loading={loading}
            tableStyle={{ minWidth: '50rem' }}
         >
            <Column field='id' header='Id'></Column>
            <Column field='name' header='Name'></Column>
            <Column field='quantity' header='Quantity'></Column>
         </DataTable>
         {/* )} */}
      </div>
   );
}
