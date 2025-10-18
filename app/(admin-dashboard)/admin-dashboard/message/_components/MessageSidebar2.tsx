"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ChatCard from "../_components/ChatCard";
import { getAllAdminUsers, AdminUser } from "@/services/adminMessageService";

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
type ChatTab = "all" | "unread";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users from API
  useEffect(() => {
    const fetchUsers = async () => {
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
      } catch (err) {
        setError("Failed to fetch users");
        console.error("❌ Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Convert API users to the format expected by ChatCard
  const data: Message[] = useMemo(() => {
    return users.map((user) => ({
      user_id: user.id, // Use user ID as string
      customer_name: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      customer_image: user.avatar || "/sidebar/images/logo.png",
      last_seen: user.updatedAt || user.createdAt || new Date().toISOString(),
      last_message: "Click to start conversation", // Default message since we don't have chat history yet
      isRead: true, // All users start as read
      isActive: user.active,
    }));
  }, [users]);

  const filteredChats = useMemo(() => {
    return tab === "unread" ? data.filter((c) => !c.isRead) : data;
  }, [data, tab]);

  // Get selected room ID from URL
  const selectedRoomIdFromUrl = useMemo(() => {
    const matches = pathname.match(/\/message\/(.+)/);
    return matches ? matches[1] : undefined;
  }, [pathname]);

  // initial select
  useEffect(() => {
    if (!selectedRoomIdFromUrl && filteredChats.length > 0) {
      setSelectedUserId(filteredChats[0].user_id);
       router.push(`/admin-dashboard/message/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedRoomIdFromUrl, router]);

  // if current selection not in filtered list, pick first visible
  useEffect(() => {
    if (
      selectedRoomIdFromUrl &&
      filteredChats.length > 0 &&
      !filteredChats.some((c) => c.user_id === selectedRoomIdFromUrl)
    ) {
      setSelectedUserId(filteredChats[0].user_id);
      router.push(`/admin-dashboard/message/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedRoomIdFromUrl, router]);

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
        {/* tabs: All / Unread */}
        <div className="flex gap-3 px-6">
          {(["all", "unread"] as ChatTab[]).map((t) => {
            const isOn = tab === t;
            const label = t === "all" ? `All Chats  ` : `Unread  `;
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
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <ChatCard
                key={chat.user_id}
                data={chat}
                handleChatClick={handleChatClick}
                isSelected={selectedRoomIdFromUrl === chat.user_id}
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