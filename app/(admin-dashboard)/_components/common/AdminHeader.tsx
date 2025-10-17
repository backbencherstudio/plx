"use client";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import NotificationIcon from "@/public/header/Icons/NotificationIcon";
import ProfileIcon from "@/public/header/Icons/ProfileIcon";
import { NotificationPopup } from "../NotificationPopup";
import { usePathname } from "next/navigation"; // ✅ Correct import for App Router
import { AdminData } from "@/app/lib/admindata";
import { getCurrentUserProfile } from "@/services/authService";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

  // ✅ Get current route in App Router
  const currentRoute = usePathname();

  // Extract the base route without dynamic segments (e.g., /admin-dashboard/message/10005 -> /admin-dashboard/message)
  const baseRoute = currentRoute.split('/').slice(0, 3).join('/'); // This strips out any dynamic segments

  // Mapping of routes to dynamic titles
  const routeToTitle: { [key: string]: string } = {
    "/admin-dashboard": "Dashboard",
    "/admin-dashboard/schedule": "Schedule",
    "/admin-dashboard/nomination": "Nomination",
    '/admin-dashboard/meetings':"Meetings",
    "/admin-dashboard/message": "Message",
    "/admin-dashboard/settings": "Settings",
  };

  // Dynamically change the title based on the base route
  const pageTitle: string = routeToTitle[baseRoute] || "Dashboard"; // Default to "Dashboard"

  // Use admin data for notifications
  const notificationData = AdminData.notifications;
  const userInfo =
    AdminData.users.find((user) => user.role === "admin") ||
    AdminData.users[5]; // fallback

  // Helper function to check if notifications have unread status
  const hasUnreadNotifications = () => {
    return notificationData.some((notif: any) => notif.status === "unread");
  };

  // Helper function to get unread count
  const getUnreadCount = () => {
    return notificationData.filter(
      (notif: any) => notif.status === "unread"
    ).length;
  };

  // Fetch current user profile for header (authorized via axios interceptor)
  useEffect(() => {
    let isMounted = true;
    const fetchMe = async () => {
      try {
        setIsLoadingUser(true);
        const res = await getCurrentUserProfile();
        const data = res?.data || {};
        if (!isMounted) return;
        setUserName(data.fullName || `${data.firstName || ""} ${data.lastName || ""}`.trim());
        setUserType(data.type || "");
      } catch (e) {
        // swallow error for header UI; keep placeholders
      } finally {
        if (isMounted) setIsLoadingUser(false);
      }
    };
    fetchMe();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <header className="bg-[#EDF2F7] py-2 pr-8 border-l border-l-[#E9E9EA]">
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
            <div
              className="p-2 cursor-pointer relative"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <NotificationIcon />
              {/* Notification badge */}
              {hasUnreadNotifications() && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-semibold">
                    {getUnreadCount()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 cursor-pointer">
              <div className="bg-primary p-2 rounded-full">
                <ProfileIcon />
              </div>
              <div>
                <h3 className="text-sm text-graytext font-semibold">
                 {isLoadingUser ? "Loading..." : (userName || "—")}
                </h3>
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
          <div
            className="fixed top-20 right-4 sm:right-8 flex justify-end"
            onClick={(e) => e.stopPropagation()}
          >
            <NotificationPopup
              onClose={() => setIsNotificationOpen(false)}
              notifications={notificationData}
            />
          </div>
        </div>
      )}
    </>
  );
}
