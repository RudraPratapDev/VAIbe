import { Button } from "@/components/ui/button";

interface Props{
    page:number;
    onPageChange:(page:number)=>void;
    totalPages:number;
}

export const DataPagination=({page,onPageChange,totalPages}:Props)=>{

    return(
        <div className="flex items-center justify-between">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page} of {totalPages || 1}
            </div>
            <div className="flex items-center justify-end space-x-2  py-4">
                <Button
                    disabled={page<=1}
                    onClick={()=>onPageChange(page-1)}
                    variant="outline"
                    size="sm"
                >
                    Previous
                </Button>
                <Button
                    disabled={page>=totalPages}
                    onClick={()=>onPageChange(page+1)}
                    variant="outline"
                    size="sm"
                >
                    Next
                </Button>

            </div>

        </div>
    )
}