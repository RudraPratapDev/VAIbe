import { ResponsiveDialogue } from "@/components/responsive-dialogue";
import { AgentForm } from "./agents-form";
import { AgentGetOne } from "../../types";

interface Props{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne;
}

export const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: Props) => {
    return (
        <ResponsiveDialogue title="Update Agent" description="Update the agent details" open={open} onOpenChange={onOpenChange}>
            <AgentForm onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} initialValues={initialValues}/>
        </ResponsiveDialogue>
    )
}