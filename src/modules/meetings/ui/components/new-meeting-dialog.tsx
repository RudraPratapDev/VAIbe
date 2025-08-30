import { ResponsiveDialogue } from "@/components/responsive-dialogue";
import { MeetingsForm } from "./meetings-form";
import { useRouter } from "next/navigation";





interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
}

export const NewMeetingDialog=({open,onOpenChange}:Props)=>{

    const router=useRouter();

    

    return(
       <ResponsiveDialogue title="New Meeting" description="Create a new meeting" open={open} onOpenChange={onOpenChange}>
            <MeetingsForm onSuccess={(id)=>{
                onOpenChange(false);
                router.push(`/meetings/${id}`);
            }}
            onCancel={() => onOpenChange(false)} />
       </ResponsiveDialogue>
    )
}