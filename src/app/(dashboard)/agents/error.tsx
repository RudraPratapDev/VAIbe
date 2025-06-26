"use client"

import { ErrorState } from "@/components/error-state";
import { useErrorBoundary } from "react-error-boundary";


export const ErrorPage = () => {
    const { resetBoundary } = useErrorBoundary();
  return (
    <div className="py-48">
      <ErrorState
        title="Failed to Load Agents"
        description="Something went wrong while fetching the data."
        retryAction={resetBoundary}
        
      />
    </div>
  );
};
export default ErrorPage;
