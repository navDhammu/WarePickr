type FooterProps = {
   totalPicks?: number;
   itemsCount?: number;
};

export default function Footer(props: FooterProps) {
   return (
      <div className='flex gap-10 w-full justify-end'>
         <div>
            <span className='text-slate-400 text-sm uppercase'>
               Total picks:{' '}
            </span>
            <span className='text-slate-800 text-lg font-semibold'>
               {props.totalPicks || 0}
            </span>
         </div>
         <div>
            <span className='text-slate-400 text-sm uppercase'>
               Total items:{' '}
            </span>
            <span className='text-slate-800 text-lg font-semibold'>
               {props.itemsCount || 0}
            </span>
         </div>
      </div>
   );
}
