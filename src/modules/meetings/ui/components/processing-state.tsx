import { EmptyState } from "@/components/empty-state";





export const ProcessingState = () => {




  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-10 bg-gray border  rounded-md dark:bg-gray-800 dark:border-gray-700">
        <EmptyState 
        image="/processing.svg"
        title="Meeting Completed" 
        description="The meeting has been completed. Its summary will be available shortly." />
    </div>
  );
}