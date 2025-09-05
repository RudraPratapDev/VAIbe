import { EmptyState } from "@/components/empty-state";





export const CancelledState = () => {




  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-10 bg-gray border  rounded-md dark:bg-gray-800 dark:border-gray-700">
        <EmptyState 
        image="/cancelled.svg"
        title="Meeting is Cancelled" 
        description="The meeting has been cancelled and will not take place." />
    </div>
  );
}