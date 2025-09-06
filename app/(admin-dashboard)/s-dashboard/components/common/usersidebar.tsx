
import React, { useState } from "react";
import Link from "next/link";
import logo from "@/public/sidebar/images/logo.png";
import DashboardIcon from "@/public/sidebar/icons/DashboardIcon";
import SchedualIcon from "@/public/sidebar/icons/SchedualIcon";
import NominationIcon from "@/public/sidebar/icons/NominationIcon";
import MessageIcon from "@/public/sidebar/icons/MessageIcon";
import SettingsIcon from "@/public/sidebar/icons/SettingsIcon";
import LogOutIcon from "@/public/sidebar/icons/LogOutIcon";
import { X, ChevronLeft } from "lucide-react";
import Image from "next/image";
import CollapseIcon from "@/public/sidebar/icons/CollapseIcon";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", icon: DashboardIcon, href: "/s-dashboard" },
  { title: "Nomination", icon: NominationIcon, href: "/s-dashboard/snomination" },
  { title: "Schedule", icon: SchedualIcon, href: "/s-dashboard/sschedule" },
  { title: "Message", icon: MessageIcon, href: "/s-dashboard/smessage" },
];

const bottomMenuItems = [
  { title: "Settings", icon: SettingsIcon, href: "#" },
  { title: "Log Out", icon: LogOutIcon, href: "#" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname= usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false); // collapse works only on md+

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0
      ${isCollapsed ? "md:w-20" : "w-64"}
      flex flex-col bg-[#EDF2F7] border-r border-gray-200 `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 ">
        {/* Logo wrapper (hide on md+ when collapsed; mobile always visible))) */}
        <div
          className={`flex items-center transition-all duration-300 overflow-hidden
          ${isCollapsed ? "md:opacity-0 md:w-0 md:invisible" : "opacity-100 md:visible"}
        `}
        >
          <Image src={logo} alt="logo" width={150}  priority />
        </div>

        {/* Right controls */}
        <div className=" ">
          {/* Collapse toggle (desktop only) – stays visible even when collapsed */}
          <button
            onClick={() => setIsCollapsed((v) => !v)}
            className={`hidden md:flex items-center justify-center  rounded-md  cursor-pointer  ${
                isCollapsed ? "rotate-180 mr-4" : ""
              } transition-transform duration-300`}
            aria-label="Toggle sidebar"
            aria-pressed={isCollapsed}
          >
           
              <CollapseIcon/>
            
          </button>

          {/* Close (mobile only) */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X />
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-grow overflow-y-auto">
        <div className="px-4 space-y-2">
          {menuItems.map((item, index) =>  {
            const isActive = pathname === item.href;
            return (

             <Link
              key={index}
              href={item.href}
              onClick={onClose}
              className={`flex items-center ${isCollapsed ? "md:justify-center" : ""} gap-3.5 p-3 rounded-lg transition-all duration-200 text-base hover:bg-[#E7ECF4] ${isActive?" bg-[#E7ECF4] ":""}`}
              title={isCollapsed ? item.title : ""}
            >
              <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                <item.icon color={isActive ? "#123F93" : "#777980"} />
              </div>
              <h3
                className={`text-[#777980] font-medium transition-all duration-300
                ${isCollapsed ? "md:opacity-0 md:max-w-0 md:ml-0" : "opacity-100 ml-1"}
                overflow-hidden whitespace-nowrap inline-block ${isActive?"text-primary font-semibold":""} text-base `}
              >
                {item.title}
              </h3>
            </Link>
            )
          })}
        </div>
      </nav>

             {/* Bottom items */}
       <div className="mt-auto p-4 space-y-2">
         {bottomMenuItems.map((item, index) => (
           <Link
             key={index}
             href={item.href}
             onClick={onClose}
             className={`flex items-center ${isCollapsed ? "md:justify-center" : ""} gap-3.5 p-3 rounded-lg transition-all duration-200 text-base`}
             title={isCollapsed ? item.title : ""}
           >
             <div className="w-5 h-5">
               <item.icon color={item.title === "Log Out" ? "#EF6471" : "#777980"} />
             </div>
             <span
               className={`font-medium transition-all duration-300
               ${isCollapsed ? "md:opacity-0 md:max-w-0 md:ml-0" : "opacity-100 ml-1"}
               overflow-hidden whitespace-nowrap inline-block ${item.title === "Log Out" ? "text-[#EF6471]" : ""}`}
             >
               {item.title}
             </span>
           </Link>
         ))}
       </div>
    </aside>
  );
}
