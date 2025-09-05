"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MeetingGetMany } from "../../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { CheckCircleIcon, CircleXIcon, ClockArrowUpIcon, ClockFadingIcon, CornerDownRightIcon, LoaderIcon} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import humanizeDuration from "humanize-duration" 
import {format} from "date-fns"
import { cn } from "@/lib/utils"

function formatDuration(seconds:number){
    return humanizeDuration(seconds * 1000,{
        largest:1,
        round: true,
        units:["h","m","s"],
    });
}

const statusIconMap={
    upcoming:ClockArrowUpIcon,
    active:LoaderIcon,
    completed:CheckCircleIcon,
    processing:LoaderIcon,
    cancelled:CircleXIcon,
}

const statusColorMap={
    upcoming:"bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
    active:"bg-blue-500/20 text-blue-800 border-blue-800/5",
    completed:"bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
    processing:"bg-gray-300/20 text-gray-800 border-gray-300/5",
    cancelled:"bg-rose-500/20 text-rose-800 border-rose-800/5",
}

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell:({row})=>(
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-3">
                <span className="font-semibold text-sm text-foreground leading-tight">{row.original.name}</span>
                {row.original.startedAt && (
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
                        {format(row.original.startedAt, "MMM d")}
                    </span>
                )}
            </div>
            
            <div className="flex items-center gap-x-2">
                <CornerDownRightIcon className="size-3 text-muted-foreground flex-shrink-0" />
                <GeneratedAvatar 
                    variant="botttsNeutral"
                    seed={row.original.agent.name}
                    classname="size-4 flex-shrink-0"
                />
                <span className="text-xs text-muted-foreground truncate max-w-[150px] capitalize">
                    {row.original.agent.name}
                </span>
            </div>
        </div>
    )
  },
  {
    accessorKey:"status",
    header:"Status",
    cell:({row})=>{
        const Icon=statusIconMap[row.original.status as keyof typeof statusIconMap];
        const color=statusColorMap[row.original.status as keyof typeof statusColorMap];
        return(
            <Badge variant="outline" className={cn("flex items-center gap-x-1.5 text-xs", color)}>
                {Icon && <Icon className={cn("size-3", row.original.status==="processing" && "animate-spin")} />}
                <span className="capitalize">{row.original.status}</span>
            </Badge>
        )
    }
  },
  {
    accessorKey:"duration",
    header:"Duration",
    cell:({row})=>{
        return(
           <Badge variant="outline" className="flex items-center gap-x-1.5 text-xs">
               <ClockFadingIcon className="size-3 text-blue-700" />
               <span>{row.original.duration ? formatDuration(row.original.duration) : "N/A"}</span>
           </Badge>
        )
    }
  }
]
