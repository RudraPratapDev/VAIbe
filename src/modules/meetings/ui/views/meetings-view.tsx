"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery} from "@tanstack/react-query";

const MeetingsView = () => {

    const trpc=useTRPC();
    const {data}=useSuspenseQuery(
        trpc.meetings.getMany.queryOptions({})
    );


    return ( 
        <div>
            {JSON.stringify(data)}
        </div>
     );
}
 
export default MeetingsView;

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