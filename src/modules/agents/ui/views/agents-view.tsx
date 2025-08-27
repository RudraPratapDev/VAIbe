"use client";


import { LoadingState } from "@/components/loading-state";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilter } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";



export const AgentsView = () => {

  const[filters,setFilters]=useAgentsFilter();



  const trpc = useTRPC();
  const { data} = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );



 

  return <div className="min-h-screen flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">

      <DataTable data={data.items} columns={columns}/>
      <DataPagination
        page={filters.page}
        onPageChange={(page)=>setFilters({page})}
        totalPages={data.totalPages}
      />
      {data.items.length===0 && (
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


