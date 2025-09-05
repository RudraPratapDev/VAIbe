import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props{
    meetingId?:string;
    onCancel?:()=>void;
    isCancelling?:boolean;
}



export const UpcomingState = ({ meetingId, onCancel, isCancelling }: Props) => {




  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-10 bg-gray border  rounded-md dark:bg-gray-800 dark:border-gray-700">
        <EmptyState 
        image="/upcoming.svg"
        title="Meeting not started yet" 
        description="Once you start the meeting, its summary will appear here." />
        <div className="flex flex-col-reverse lg:flex-row gap-2 lg:justify-center items-center w-full">
            <Button variant="secondary" className="w-full lg:w-auto" onClick={onCancel} disabled={isCancelling}>
                <BanIcon className="mr-2 h-4 w-4" />
                Cancel Meeting
            </Button>
            <Button asChild variant="outline" className="w-full lg:w-auto" disabled={isCancelling}>
                <Link href={`/call/${meetingId}`}>
                    <VideoIcon className="mr-2 h-4 w-4" />
                        Start Meeting
                </Link>
            </Button>
            
        </div>
    </div>
  );
}