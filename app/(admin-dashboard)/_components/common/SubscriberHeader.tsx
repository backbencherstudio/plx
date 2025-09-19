import profileImg from "@/public/header/images/profileImg.png";
import Image from "next/image";
import { Menu } from 'lucide-react';
import NotificationIcon from "@/public/header/Icons/NotificationIcon";
import ProfileIcon from "@/public/header/Icons/ProfileIcon";
import { NotificationPopup } from "../NotificationPopup";
import { useState } from "react";
import { userData } from "@/app/lib/userdata";
import { usePathname } from "next/navigation"; // ✅ Correct import for App Router

interface SubscriberHeaderProps {
  onMenuClick: () => void;
}

export default function SubscriberHeader({ onMenuClick }: SubscriberHeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // ✅ Get current route in App Router
  const currentRoute = usePathname();

  // Extract the base route without dynamic segments (e.g., /s-dashboard/smessage/10005 -> /s-dashboard/smessage)
  const baseRoute = currentRoute.split('/').slice(0, 3).join('/'); // This strips out any dynamic segments

  // Mapping of routes to dynamic titles
  const routeToTitle: { [key: string]: string } = {
    "/s-dashboard": "Dashboard",
    "/s-dashboard/sdashboard": "Dashboard",
    "/s-dashboard/sschedule": "Schedule",
    "/s-dashboard/snomination": "Nomination",
    "/s-dashboard/smessage": "Message",
    "/s-dashboard/ssettings": "Settings",
  };

  // Dynamically change the title based on the base route
  const pageTitle: string = routeToTitle[baseRoute] || "Dashboard"; // Default to "Dashboard"
  
  // Debug logging (remove in production)
  console.log("Current route:", currentRoute);
  console.log("Base route:", baseRoute);
  console.log("Page title:", pageTitle);

  // Use user data for notifications
  const notificationData = userData.notifications.data;
  const userInfo = userData.user;

  // Helper function to check if notifications have unread status
  const hasUnreadNotifications = () => {
    return userData.notifications.hasUnread;
  };

  // Helper function to get unread count
  const getUnreadCount = () => {
    return userData.notifications.count;
  };

  return (
    <>
      <header className="bg-[#EDF2F7] py-3 pr-8 border-l border-l-[#E9E9EA]">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 md:hidden cursor-pointer"
              onClick={onMenuClick}
            >
              <Menu />
            </button>
            <h2 className="text-[#1D1F2C] text-lg font-semibold cursor-pointer">
              {pageTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 cursor-pointer relative" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
              <NotificationIcon/>
              {/* Notification badge */}
              {hasUnreadNotifications() && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-semibold">{getUnreadCount()}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 cursor-pointer">
              <div className="bg-primary p-2 rounded-full">
                <ProfileIcon/>
              </div>
              <div>
                <h3 className="text-sm text-graytext font-semibold">{userInfo.name}</h3>
                <p className="text-[#777980] text-sm">{userInfo.company}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Popup */}
      {isNotificationOpen && (
        <div 
          className="fixed inset-0 z-50" 
          onClick={() => setIsNotificationOpen(false)}
        >
          <div className="fixed top-20 right-4 sm:right-8 flex justify-end" onClick={(e) => e.stopPropagation()}>
            <NotificationPopup onClose={() => setIsNotificationOpen(false)} notifications={notificationData} />
          </div>
        </div>
      )}
    </>
  );
}