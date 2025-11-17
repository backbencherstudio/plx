"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ChatCard from "../_components/ChatCard";
import { getAllAdminUsers, AdminUser, getAllAdminChatRooms, AdminChatRoom } from "@/services/adminMessageService";

type RawMessage = {
  user_id: string; // Changed to string
  customer_name: string;
  customer_image: string;
  last_seen: string;
  last_message: string;
  isActive?: boolean;
  isRead?: boolean;
};

type Message = RawMessage & { isRead: boolean };
type ChatTab = "all" | "unread" | "allUsers";

function parseDateFlexible(input: string) {
  if (!input) return new Date(0);
  const normalized = input.includes("T") ? input : input.replace(" ", "T");
  const d = new Date(normalized);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

export default function MessagesSidebar2() {
  const router = useRouter();
  const pathname = usePathname();

  const [tab, setTab] = useState<ChatTab>("all");
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [chatRooms, setChatRooms] = useState<AdminChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching all admin users...");
        const response = await getAllAdminUsers(1, 100); // Get up to 100 users
        console.log("📨 Admin users response:", response);
        
        if (response.success) {
          // Filter only active users
          const activeUsers = response.data.filter(user => user.active);
          setUsers(activeUsers);
          console.log("✅ Active users loaded:", activeUsers.length);
          console.log("👥 User IDs:", activeUsers.map(u => u.id));
          console.log("👥 User names:", activeUsers.map(u => u.fullName));
        } else {
          setError(response.message);
          console.error("❌ API Error:", response.message);
        }

        console.log("🔍 Fetching chat rooms...");
        const roomsRes = await getAllAdminChatRooms(1, 100);
        if (roomsRes.success) {
          setChatRooms(roomsRes.data.rooms || []);
        }
      } catch (err) {
        setError("Failed to fetch users");
        console.error("❌ Error fetching users/chat rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Convert chat rooms to chat list
  const chatData = useMemo<Message[]>(() => {
    return chatRooms.map((room) => ({
      user_id: room.user.id,
      customer_name: room.user.fullName || "User",
      customer_image: room.user.avatar || "/sidebar/images/logo.png",
      last_seen: room.updatedAt,
      last_message: room.lastMessage?.content || "No messages yet",
      isRead: room.unreadCount === 0,
      isActive: true,
    }));
  }, [chatRooms]);

  const unreadData = useMemo(
    () => chatData.filter((chat) => !chat.isRead),
    [chatData]
  );
  const repliedChatsData = useMemo(
    () => chatData.filter((chat) => chat.isRead),
    [chatData]
  );

  // All active users list
  const allUsersData = useMemo<Message[]>(() => {
    return users.map((user) => ({
      user_id: user.id,
      customer_name: user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      customer_image: user.avatar || "/sidebar/images/logo.png",
      last_seen: user.updatedAt || user.createdAt || new Date().toISOString(),
      last_message: "Click to start conversation",
      isRead: true,
      isActive: user.active,
    }));
  }, [users]);

  const tabData = useMemo(() => {
    switch (tab) {
      case "unread":
        return unreadData;
      case "allUsers":
        return allUsersData;
      case "all":
      default:
        return repliedChatsData;
    }
  }, [tab, unreadData, allUsersData, repliedChatsData]);

  // Get selected room ID from URL
  const selectedRoomIdFromUrl = useMemo(() => {
    const matches = pathname.match(/\/message\/(.+)/);
    return matches ? matches[1] : undefined;
  }, [pathname]);

  // initial select
  useEffect(() => {
    if (!selectedRoomIdFromUrl && tabData.length > 0) {
      setSelectedUserId(tabData[0].user_id);
      router.push(`/admin-dashboard/message/${tabData[0].user_id}`);
    }
  }, [tabData, selectedRoomIdFromUrl, router]);

  // if current selection not in filtered list, pick first visible
  useEffect(() => {
    if (
      selectedRoomIdFromUrl &&
      tabData.length > 0 &&
      !tabData.some((c) => c.user_id === selectedRoomIdFromUrl)
    ) {
      setSelectedUserId(tabData[0].user_id);
      router.push(`/admin-dashboard/message/${tabData[0].user_id}`);
    }
  }, [tabData, selectedRoomIdFromUrl, router]);

  const handleChatClick = (roomId: string) => {
    console.log("🖱️ Chat clicked for user ID:", roomId);
    setSelectedUserId(roomId);
    console.log("🔄 Navigating to:", `/admin-dashboard/message/${roomId}`);
    router.push(`/admin-dashboard/message/${roomId}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl">
        <div className="py-8 px-6 border-b border-[#E7ECF4]">
          <h2 className="text-lg text-[#4A4C56] font-semibold">Message</h2>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl">
        <div className="py-8 px-6 border-b border-[#E7ECF4]">
          <h2 className="text-lg text-[#4A4C56] font-semibold">Message</h2>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl  ">
      <div className="py-8 px-6 border-b border-[#E7ECF4]">
        <h2 className="text-lg text-[#4A4C56] font-semibold">Message</h2>
      </div>

      <div className="space-y-5 w-full md:max-w-[400px] hidden md:block">
        {/* tabs */}
        <div className="flex gap-3 px-6">
          {(["all", "unread", "allUsers"] as ChatTab[]).map((t) => {
            const isOn = tab === t;
            const label =
              t === "all" ? "All Chats" : t === "unread" ? "Unread" : "All Users";
            return (
              <button
                key={t}
                type="button"
                aria-current={isOn ? "page" : undefined}
                className={`px-4 py-2 cursor-pointer flex items-center justify-center font-semibold ${
                  isOn
                    ? "text-primary border-b-[3px] border-primary "
                    : "text-[#4A4C56]"
                }`}
                onClick={() => setTab(t)}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* list */}
        <div
          className="overflow-y-auto scrollbar-hide"
          style={{ height: "calc(100vh - 280px)" }}
        >
          {tabData.length > 0 ? (
            tabData.map((chat) => (
              <ChatCard
                key={chat.user_id}
                data={chat}
                handleChatClick={handleChatClick}
                isSelected={selectedUserId === chat.user_id}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>No messages found</p>
              <p className="text-sm">Try a different filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}