"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ChatCard from "../_components/ChatCard";
import { getMyChatRoom, ChatRoom } from "@/services/messageService";

type Conversation = {
  id: string;
  contact: {
    id: string;
    name: string;
    avatar: string;
    status: string;
    lastSeen: string | null;
    isVerified: boolean;
  };
  lastMessage: {
    id: string;
    content: string;
    timestamp: string;
    senderId: string;
    type: string;
    status: string;
  };
  unreadCount: number;
  isActive: boolean;
  lastActivity: string;
};

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
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch chat room data from API
  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        setLoading(true);
        const response = await getMyChatRoom();
        if (response.success) {
          setChatRoom(response.data.room);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Failed to fetch chat room");
        console.error("Error fetching chat room:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRoom();
  }, []);

  // Convert API chat room to the format expected by ChatCard
  const data = useMemo(() => {
    if (!chatRoom) return [];
    
    return [{
      user_id: chatRoom.id, // Use the room ID, not user ID
      customer_name: chatRoom.user.fullName,
      customer_image: chatRoom.user.avatar || "/sidebar/images/logo.png",
      last_seen: chatRoom.updatedAt,
      last_message: chatRoom.lastMessage?.content || "No messages yet",
      isRead: chatRoom.unreadCount === 0,
      isActive: true, // Assuming active if we have a chat room
    }];
  }, [chatRoom]);

  const filteredChats = useMemo(() => {
    return tab === "unread" ? data.filter((c) => !c.isRead) : data;
  }, [data, tab]);

  // Get selected room ID from URL
  const selectedRoomIdFromUrl = useMemo(() => {
    const matches = pathname.match(/\/smessage\/(.+)/);
    return matches ? matches[1] : undefined;
  }, [pathname]);

  // initial select
  useEffect(() => {
    if (!selectedRoomIdFromUrl && filteredChats.length > 0) {
      setSelectedUserId(filteredChats[0].user_id);
       router.push(`/s-dashboard/smessage/${filteredChats[0].user_id}`);
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
      router.push(`/s-dashboard/smessage/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedRoomIdFromUrl, router]);

  const handleChatClick = (roomId: string) => {
    setSelectedUserId(roomId);
    router.push(`/s-dashboard/smessage/${roomId}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl">
        <div className="py-8 px-6 border-b border-[#E7ECF4]">
          <h2 className="text-lg text-[#4A4C56] font-semibold">Message</h2>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading...</div>
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