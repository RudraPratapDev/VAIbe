
import { AgentsView, AgentsViewLoading } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./error";

const Page = async () => {
    const queryClient=getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<AgentsViewLoading/>}>
            <AgentsView/>
            </Suspense>
            </ErrorBoundary>
        </HydrationBoundary>
    )
}
 
export default Page;

