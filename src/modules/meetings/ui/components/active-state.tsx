import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props{
    meetingId?:string;
}



export const ActiveState = ({ meetingId }: Props) => {




  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-10 bg-gray border  rounded-md dark:bg-gray-800 dark:border-gray-700">
        <EmptyState 
        image="/upcoming.svg"
        title="Meeting is Active" 
        description="The meeting is currently in progress. And will end once all participants leave." />
        <div className="flex flex-col-reverse lg:flex-row gap-2 lg:justify-center items-center w-full">
           
            <Button asChild variant="outline" className="w-full lg:w-auto" >
                <Link href={`/call/${meetingId}`}>
                    <VideoIcon className="mr-2 h-4 w-4" />
                        Join Meeting
                </Link>
            </Button>
            
        </div>
    </div>
  );
}