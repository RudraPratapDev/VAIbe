import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";

interface Props{
    onLeave:()=>void;
    meetingName:string;

}

export const CallActive=({onLeave,meetingName}:Props)=>{


    return(

        <div className="h-screen flex flex-col justify-between p-4 text-white">
            <div className="bg-[#101213] rounded-full p-4 flex items-center gap-4">
                <Link href="/" className="flex items-center justify-center p-1 bg-[#101213]/10 w-fit">
                <Image src="/logoA.svg" alt="Image" width={62} height={42} className="h-[42px] w-[62px] transition-transform " />
                </Link>
                <h4 className="text-base">{meetingName}</h4>

            </div>
            <SpeakerLayout />
            <div  className="bg-[#101213]/10" >
                <CallControls onLeave={onLeave}  />
            </div>

        </div>
    )
}