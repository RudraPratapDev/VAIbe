
import { ResponsiveDialogue } from "@/components/responsive-dialogue";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";


export const useConfirm=(
    title:string,
    description:string
) :[()=>JSX.Element,()=>Promise<unknown>]=>{
    const[promise,setPromise]=useState<{
        resolve:(value:boolean)=>void;
    }|null>(null);
    const confirm=()=>{
        return new Promise((resolve) => {
            setPromise({resolve});
        })
    };
    const handleClose=()=>{
        setPromise(null);
    };
    const handleConfirm=()=>{
        promise?.resolve(true);
        handleClose();

    }
    const handleCancel=()=>{
        promise?.resolve(false);
        handleClose();
    }

    const confirmationDialogue=()=>(
        <ResponsiveDialogue open={promise !== null} onOpenChange={handleClose} title={title} description={description}>
            <div className="pt-4 w-full flex  gap-y-2 flex-col-reverse lg:flex-row gap-x-2 items-center justify-end">
                
                <Button onClick={handleCancel} variant="outline" className="w-full lg:w-auto">Cancel</Button>
                <Button onClick={handleConfirm}  className="w-full lg:w-auto">Confirm</Button>
            </div>
        </ResponsiveDialogue>
    );
    return [confirmationDialogue, confirm];
}