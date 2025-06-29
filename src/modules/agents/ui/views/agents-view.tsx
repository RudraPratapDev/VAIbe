"use client";


import { LoadingState } from "@/components/loading-state";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data} = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );

 

  return <div className="min-h-screen flex-1 pb-4 px-4 md:px:8 flex flex-col gap-y-4">

      <DataTable data={data} columns={columns}/>
      {data.length===0 && (
        <EmptyState 
          title="This is where your agents live"
          description="None here yet — create one to start building your world."
        />
      )}
    </div>;
};
export const AgentsViewLoading = () => {
  return (
    <div className="py-54">
      <LoadingState
        title="Loading Agents"
        description="This may take a few seconds"
      />
    </div>
  );
};


