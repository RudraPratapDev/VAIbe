import { ResponsiveDialogue } from "@/components/responsive-dialogue";
import { MeetingsForm } from "./meetings-form";

import {  MeetingGetOne } from "../../types";





interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    initialValues?:MeetingGetOne
}

export const UpdateMeetingDialog=({open,onOpenChange,initialValues}:Props)=>{

    

    return(
       <ResponsiveDialogue title="Edit Meeting" description="Edit the meeting details" open={open} onOpenChange={onOpenChange}>
            <MeetingsForm initialValues={initialValues} onSuccess={()=>{
                onOpenChange(false);
            }}
            onCancel={() => onOpenChange(false)} />
       </ResponsiveDialogue>
    )
}