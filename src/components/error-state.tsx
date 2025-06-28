import { AlertTriangleIcon, RotateCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  retryAction?: () => void;
}

export const ErrorState = ({ title, description, retryAction }: Props) => {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <div className="flex flex-col items-center gap-6 bg-background border rounded-xl p-10 shadow-sm w-full max-w-md text-center">
        
        <div className="p-3 rounded-full bg-muted">
          <AlertTriangleIcon className="size-6 text-destructive" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {retryAction && (
          <Button onClick={retryAction} variant="outline" className="gap-2">
            <RotateCwIcon className="size-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};
