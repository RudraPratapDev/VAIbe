import { ResponsiveDialogue } from "@/components/responsive-dialogue";
import { AgentForm } from "./agents-form";




interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
}

export const NewAgentDialog=({open,onOpenChange}:Props)=>{


    return(
       <ResponsiveDialogue title="New Agent" description="Create a new agent" open={open} onOpenChange={onOpenChange}>
            <AgentForm  onSuccess={()=>onOpenChange(false)} onCancel={()=>onOpenChange(false)}/>
       </ResponsiveDialogue>
    )
}