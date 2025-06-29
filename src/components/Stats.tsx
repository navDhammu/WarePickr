import React from 'react';

type StatsProps = {
   stats: {
      label: string;
      value?: number;
   }[];
};

export default function Stats({ stats }: StatsProps) {
   return (
      <div className='w-md mr-auto border-2 border-slate-100 rounded-md mb-6 p-4 grid grid-cols-2 row-gap-8 bg-slate-50'>
         {stats.map((stat) => (
            <div
               key={stat.label}
               className='text-center border-r-2 border-slate-200 last:border-r-0'
            >
               <h6 className='text-4xl'>{stat.value || 0}</h6>
               <p className='text-xs font-medium tracking-widest text-gray-800 uppercase'>
                  {stat.label}
               </p>
            </div>
         ))}
      </div>
   );
}
