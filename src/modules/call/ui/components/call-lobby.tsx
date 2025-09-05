import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { DefaultVideoPlaceholder, StreamVideoParticipant, ToggleAudioPreviewButton, ToggleVideoPreviewButton, useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk";
import {  LogInIcon, XIcon } from "lucide-react";
import Link from "next/link";

interface Props{
    onJoin:()=>void;
}

const DisabledVideoPreview=()=>{
    const{data}=authClient.useSession();

    return (
        <DefaultVideoPlaceholder  
        participant={
            {
                name:data?.user.name||"User",
                image:data?.user.image||
                generateAvatarUri({seed:data?.user.name||"User",variant:"initials"}),
            } as StreamVideoParticipant
        }/>
    )
}

const AllowBrowserPermissions=()=>{
    return(
        <div className="flex flex-col gap-y-4 items-center justify-center">
            <p className="text-sm text-center">To have the best experience, please allow access to your microphone and camera.</p>
        </div>
    )
}

export const CallLobby=({onJoin}:Props)=>{

    const{useCameraState,useMicrophoneState}=useCallStateHooks();
    const{hasBrowserPermission:hasMicPermissions}=useMicrophoneState();
    const{hasBrowserPermission:hasCameraPermissions}=useCameraState();

    const hasBrowserMediaPermissions=hasMicPermissions && hasCameraPermissions;
    


    return(
        <div className="h-screen flex flex-col justify-center items-center bg-radial from-sidebar-accent to-sidebar">
            <div className="py-4 px-8 flex flex-1 items-center justify-center">
                <div className="flex flex-col gap-y-6 items-center justify-center bg-background rounded-lg p-10 shadow-sm">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="text-lg font-medium">Ready to Join</h6>
                        <p className="text-sm">Set up your call before joining</p>

                    </div>
                    <VideoPreview
                        DisabledVideoPreview={
                            hasBrowserMediaPermissions?DisabledVideoPreview:AllowBrowserPermissions
                        }
                    />
                    <div className="flex gap-x-2">
                        <ToggleAudioPreviewButton/>
                        <ToggleVideoPreviewButton/>

                    </div>
                    <div className="flex gap-x-2 w-full justify-between">
                        <Button asChild variant="ghost" >
                           <Link href="/meetings" >
                           <XIcon className="size-4 mr-2"/>
                           Cancel
                           </Link>
                        </Button>
                        <Button onClick={onJoin}>
                            <LogInIcon className="size-4 mr-2"/>
                            Join
                            </Button>

                    </div>

                </div>
            </div>
        </div>
    )
}   