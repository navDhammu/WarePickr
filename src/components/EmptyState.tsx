import { ProgressSpinner } from 'primereact/progressspinner';

export default function EmptyState({
   loading,
   error,
}: {
   loading: boolean;
   error: string | null;
}) {
   if (loading) return <ProgressSpinner />;
   return (
      <div className='flex flex-col justify-center items-center min-h-72'>
         {error ? (
            <span className='text-red-500'>{error}</span>
         ) : (
            <>
               <img src='/empty.png' width={100} alt='Empty state' />
               <p className='text-sm mt-2'>No orders found for this date.</p>
            </>
         )}
      </div>
   );
}
