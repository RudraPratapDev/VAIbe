import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { ChevronRightIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";


interface Props {
    meetingId: string;
    meetingName: string | undefined;
    onEdit: () => void;
    onRemove: () => void;
}

export const MeetingIdViewHeader = ({ meetingId, meetingName, onEdit, onRemove }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl">
                            <Link href="/meetings">My Meetings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className=" text-foreground text-xl font-medium [&>svg]:w-4 [&>svg]:h-4">
                        <ChevronRightIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl text-foreground/70">
                            <Link href={`/meetings/${meetingId}`}>{meetingName}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" >
                        <MoreVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 ">
                    <div className="flex items-center gap-2 hover:text-blue-500 hover:cursor-pointer" onClick={onEdit}>
                        <PencilIcon className="size-4  hover:text-blue-500 hover:cursor-pointer" />
                        <span>Edit</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-red-500 hover:cursor-pointer" onClick={onRemove}>
                        <TrashIcon className="size-4  hover:text-red-500 hover:cursor-pointer" />
                        <span>Delete</span>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
