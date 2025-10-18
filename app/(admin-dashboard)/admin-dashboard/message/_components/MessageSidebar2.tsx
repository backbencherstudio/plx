"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ChatCard from "../_components/ChatCard";
import { getMessageRooms } from "@/services/messageService"; // ✅ তোমার API call file

type ChatRoomUser = {
  id: string;
  fullName: string;
  email: string;
  avatar: string | null;
};

type ChatRoom = {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: ChatRoomUser;
  lastMessage: {
    id: string;
    content: string;
    createdAt: string;
    sender: {
      id: string;
      fullName: string;
      type: string;
    };
  } | null;
  unreadCount: number;
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
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch chat rooms from API
  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const res = await getMessageRooms(); // API call
        if (res?.data?.rooms) {
          setChatRooms(res.data.rooms);
        }
      } catch (err) {
        console.error("Failed to fetch chat rooms", err);
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  // ✅ Transform data for UI (without changing design)
  const formattedChats = useMemo(() => {
    return chatRooms
      .map((room) => ({
        user_id: room.user.id,
        customer_name: room.user.fullName,
        customer_image: room.user.avatar,
        last_seen: room.updatedAt,
        last_message: room.lastMessage?.content || "",
        isRead: room.unreadCount === 0,
      }))
      .sort(
        (a, b) =>
          parseDateFlexible(b.last_seen).getTime() -
          parseDateFlexible(a.last_seen).getTime()
      );
  }, [chatRooms]);

  const filteredChats = useMemo(() => {
    return tab === "unread"
      ? formattedChats.filter((c) => !c.isRead)
      : formattedChats;
  }, [formattedChats, tab]);

  // ✅ Auto select first chat
  useEffect(() => {
    if (!selectedUserId && filteredChats.length > 0) {
      setSelectedUserId(filteredChats[0].user_id);
      router.push(`/admin-dashboard/message/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedUserId, router]);

  // ✅ Handle if selected user not visible in filtered list
  useEffect(() => {
    if (
      selectedUserId &&
      filteredChats.length > 0 &&
      !filteredChats.some((c) => c.user_id === selectedUserId)
    ) {
      setSelectedUserId(filteredChats[0].user_id);
      router.push(`/admin-dashboard/message/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedUserId, router]);

  const handleChatClick = (userid: string) => {
    setSelectedUserId(userid);
    router.push(`/admin-dashboard/message/${userid}`);
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="py-8 px-6 border-b border-[#E7ECF4]">
        <h2 className="text-lg text-[#4A4C56] font-semibold">Message</h2>
      </div>

      <div className="space-y-5 w-full md:max-w-[400px] hidden md:block">
        {/* Tabs */}
        <div className="flex gap-3 px-6">
          {(["all", "unread"] as ChatTab[]).map((t) => {
            const isOn = tab === t;
            const label = t === "all" ? `All Chats` : `Unread`;
            return (
              <button
                key={t}
                type="button"
                aria-current={isOn ? "page" : undefined}
                className={`px-4 py-2 cursor-pointer flex items-center justify-center font-semibold ${
                  isOn
                    ? "text-primary border-b-[3px] border-primary"
                    : "text-[#4A4C56]"
                }`}
                onClick={() => setTab(t)}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Chat list */}
        <div
          className="overflow-y-auto scrollbar-hide"
          style={{ height: "calc(100vh - 280px)" }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              Loading...
            </div>
          ) : filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
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
