import { CommandResponsiveDialog, CommandInput } from "@/components/ui/command";
import { CommandItem, CommandList } from "cmdk";
import { Dispatch, SetStateAction } from "react";

interface Props{
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
}
const DashboardCommand = ({open,setOpen}:Props) => {
    return ( 
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput
            placeholder="Find a Meeting or a Agent"/>
            <CommandList>
                <CommandItem>
                    test
                </CommandItem>
            </CommandList>
        </CommandResponsiveDialog>
     );
}
 
export default DashboardCommand;