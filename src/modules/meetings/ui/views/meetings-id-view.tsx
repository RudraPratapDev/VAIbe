"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/modules/agents/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";



interface Props{
    meetingId:string
}
export const MeetingsIdView = ({meetingId}:Props) => {
    const trpc=useTRPC();
    const queryClient=useQueryClient();
    const router =useRouter();

    const[RemoveConfirmation,confirmRemove]=useConfirm(
        "Are you Sure?",
        "The meeting will be permanently deleted.",
    );
    const[UpdateMeetingDialogOpen, setUpdateMeetingDialogOpen]=useState(false);

    const{data}=useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({
            id:meetingId
        })
    )

    const removeMeeting=useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess:()=>{
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                router.push("/meetings")
            },
            onError:(error)=>{
                toast.error(error.message || "Failed to delete meeting")
            }
        })
    )

    const handleRemoveMeeting=async()=>{
        const confirmed=await confirmRemove();
        if(!confirmed) return;
        await removeMeeting.mutateAsync({id:meetingId});
    }

    const isActive=data.status==="active";
    const isUpcoming=data.status==="upcoming";
    const isCancelled=data.status==="cancelled";
    const isCompleted=data.status==="completed";
    const isProcessing=data.status==="processing";


    return ( 
        <>
        <RemoveConfirmation />
        <UpdateMeetingDialog
            open={UpdateMeetingDialogOpen}
            onOpenChange={setUpdateMeetingDialogOpen}
            initialValues={data}
        />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-4 overflow-y-auto">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data?.name}
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                />
                {isCancelled && (<CancelledState />)}
                {isCompleted && (<div>Meeting has been completed</div>)}
                {isProcessing && (<ProcessingState />)}
                {isActive && (<ActiveState meetingId={meetingId} />)}
                {isUpcoming && (<UpcomingState meetingId={meetingId} onCancel={() => {}} isCancelling={false} />)}
            </div>
        </>
     );
};
export const MeetingsViewLoading = () => {
  return (
    <div className="py-54">
      <LoadingState
        title="Loading Meetings"
        description="This may take a few seconds"
      />
    </div>
  );
};

export const MeetingsViewError = () => {
  return (
    <div className="py-54">
      <ErrorState
        title="Error Loading Meetings"
        description="There was an error loading the meetings."
      />
    </div>
  );
};