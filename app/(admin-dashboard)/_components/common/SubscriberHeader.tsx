"use client";
import profileImg from "@/public/header/images/profileImg.png";
import Image from "next/image";
import { Menu } from 'lucide-react';
import NotificationIcon from "@/public/header/Icons/NotificationIcon";
import ProfileIcon from "@/public/header/Icons/ProfileIcon";
import { NotificationPopup } from "../NotificationPopup";
import { useEffect, useState } from "react";
import { userData } from "@/app/lib/userdata";
import { usePathname } from "next/navigation"; // ✅ Correct import for App Router
import { getCurrentUserProfile } from "@/services/authService";
import { getMyNotifications, ApiNotification, markAllNotificationsRead } from "@/services/notificationService";

interface SubscriberHeaderProps {
  onMenuClick: () => void;
}

export default function SubscriberHeader({ onMenuClick }: SubscriberHeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<ApiNotification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState<boolean>(false);
  const [isMarkingRead, setIsMarkingRead] = useState<boolean>(false);
  const [suppressBadge, setSuppressBadge] = useState<boolean>(false);

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

  // Helper functions derived from API data
  const hasUnreadNotifications = () => notifications.some((n) => n.read === false);
  const getUnreadCount = () => notifications.filter((n) => n.read === false).length;

  const handleNotificationsClick = async () => {
    const nextOpen = !isNotificationOpen;
    setIsNotificationOpen(nextOpen);
    // When user opens the notifications panel, mark all as read
    if (nextOpen && hasUnreadNotifications() && !isMarkingRead) {
      try {
        setIsMarkingRead(true);
        await markAllNotificationsRead();
        // Do NOT flip local items to read immediately so the popup can
        // still highlight newly received notifications in this open session.
        // Instead, suppress the badge until next fetch/open.
        setSuppressBadge(true);
      } catch (e) {
        // swallow error in header UI
      } finally {
        setIsMarkingRead(false);
      }
    }
  };

  // Fetch current user profile for header
  useEffect(() => {
    let isMounted = true;
    const fetchMe = async () => {
      try {
        setIsLoadingUser(true);
        const res = await getCurrentUserProfile();
        const data = res?.data || {};
        if (!isMounted) return;
        setUserName(data.fullName || "");
        setUserType(data.type || "");
      } catch (e) {
        // ignore error in header UI
      } finally {
        if (isMounted) setIsLoadingUser(false);
      }
    };
    fetchMe();
    // Fetch notifications using exact API path
    const fetchNotifications = async () => {
      try {
        setIsLoadingNotifications(true);
        const res = await getMyNotifications(1, 10);
        if (!isMounted) return;
        setNotifications(Array.isArray(res?.data) ? res.data : []);
      } catch (e) {
        if (!isMounted) return;
        setNotifications([]);
      } finally {
        if (isMounted) setIsLoadingNotifications(false);
      }
    };
    fetchNotifications();
    return () => {
      isMounted = false;
    };
  }, []);

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
            <div className="p-2 cursor-pointer relative" onClick={handleNotificationsClick}>
              <NotificationIcon/>
              {/* Notification badge */}
              {hasUnreadNotifications() && !suppressBadge && (
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
                <h3 className="text-sm text-graytext font-semibold">{isLoadingUser ? "Loading..." : (userName || "—")}</h3>
                <p className="text-[#777980] text-sm">{userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : "—"}</p>
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
            <NotificationPopup
              onClose={() => setIsNotificationOpen(false)}
              notifications={notifications.map((n) => ({
                id: n.id,
                type: n.type,
                title: n.title,
                message: n.message,
                timestamp: new Date(n.createdAt).toLocaleString(),
                isRecent: !n.read,
              }))}
            />
          </div>
        </div>
      )}
    </>
  );
}