"use client";

import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import DashboardUserButton from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
    const pathname=usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center justify-center gap-2 px-2 pt-2 ">
          <div className="h-[92px] w-[92px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 140 80"
              width="100%"
              height="100%"
            >
              <style>
                {`
          .fade-slide-up {
            animation: fadeUp 1s ease-out forwards;
          }

          .fade-slide-down {
            animation: fadeDown 1s ease-out forwards;
          }

          .fade-scale {
            animation: fadeScale 1.2s ease-out forwards;
          }

          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeDown {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeScale {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
              </style>

              <polygon
                points="10,30 20,53 30,30"
                fill="#FFFFFF"
                className="fade-slide-up"
              />
              <polygon
                points="30,53 40,30 50,53"
                fill="#FFFFFF"
                className="fade-slide-down"
              />
              <text
                x="55"
                y="55"
                fontSize="40"
                fontFamily="Lexend, 'Segoe UI', sans-serif"
                fill="#FFFFFF"
                fontWeight="600"
                letterSpacing="1"
                className="fade-scale"
              >
                Ibe
              </text>
            </svg>
          </div>

        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6B68]"/>

      </div>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {firstSection.map((item)=>(
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild 
                            className={cn(
                            "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                            pathname===item.href &&"bg-linear-to-r/oklch border-[#5D6B68]/10"
                        )} isActive={pathname===item.href}>
                                <Link href={item.href}>
                                <item.icon className="size-5" />
                                <span className="text-sm font-medium tracking-tight">
                                    {item.label}
                                </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
         <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6B68]"/>

      </div>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {secondSection.map((item)=>(
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild 
                            className={cn(
                            "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                            pathname===item.href &&"bg-linear-to-r/oklch border-[#5D6B68]/10"
                        )} isActive={pathname===item.href}>
                                <Link href={item.href}>
                                <item.icon className="size-5" />
                                <span className="text-sm font-medium tracking-tight">
                                    {item.label}
                                </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white ">
        <DashboardUserButton/>
      </SidebarFooter>
    </Sidebar>

  );
};
