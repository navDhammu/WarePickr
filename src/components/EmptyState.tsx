import { ProgressSpinner } from 'primereact/progressspinner';

export default function EmptyState({ loading }: { loading: boolean }) {
   if (loading) return <ProgressSpinner />;
   return (
      <div className='flex flex-col justify-center items-center'>
         <img src='/empty.png' width={100} alt='Empty state' />
         <p className='text-sm mt-2'>No orders found for this date.</p>
      </div>
   );
}
