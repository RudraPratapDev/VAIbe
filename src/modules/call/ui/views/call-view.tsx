"use client"

import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallsProvider } from "../components/calls-provider";

interface Props{
    meetingId:string
}


 const CallView=({meetingId}:Props)=>{

    const trpc=useTRPC();
    const {data}=useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({id:meetingId})
    )

    if(data.status==="completed"){
        return(
            <div className="flex h-screen items-center justify-center">
                <ErrorState
                title="Meeting has ended"
                description="This meeting has already ended. You can close this window."
                 />
            </div>
        )
    }

    return(
        <div>
            <CallsProvider meetingId={meetingId} meetingName={data.name}/>
        </div>
    )

}
export default CallView;
