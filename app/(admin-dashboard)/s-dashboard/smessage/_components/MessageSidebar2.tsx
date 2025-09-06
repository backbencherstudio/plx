"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ChatCard from "../_components/ChatCard";
import { userData } from "@/app/lib/userdata";

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

  const conversations = userData.messagePage.chatInterface.conversations;

  const [tab, setTab] = useState<ChatTab>("all");
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();

  // Convert conversations to the format expected by ChatCard
  const data = useMemo(() => {
    return conversations.map((conv) => ({
      user_id: parseInt(conv.contact.id),
      customer_name: conv.contact.name,
      customer_image: conv.contact.avatar,
      last_seen: conv.lastActivity,
      last_message: conv.lastMessage.content,
      isRead: conv.unreadCount === 0,
      isActive: conv.isActive,
    }));
  }, [conversations]);

  const filteredChats = useMemo(() => {
    return tab === "unread" ? data.filter((c) => !c.isRead) : data;
  }, [data, tab]);

  // Get selected user ID from URL
  const selectedUserIdFromUrl = useMemo(() => {
    const matches = pathname.match(/\/smessage\/(\d+)/);
    return matches ? matches[1] : undefined;
  }, [pathname]);

  // initial select
  useEffect(() => {
    if (!selectedUserIdFromUrl && filteredChats.length > 0) {
      setSelectedUserId(filteredChats[0].user_id.toString());
       router.push(`/s-dashboard/smessage/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedUserIdFromUrl, router]);

  // if current selection not in filtered list, pick first visible
  useEffect(() => {
    if (
      selectedUserIdFromUrl &&
      filteredChats.length > 0 &&
      !filteredChats.some((c) => c.user_id.toString() === selectedUserIdFromUrl)
    ) {
      setSelectedUserId(filteredChats[0].user_id.toString());
      router.push(`/s-dashboard/smessage/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedUserIdFromUrl, router]);

  const handleChatClick = (userid: number) => {
    setSelectedUserId(userid.toString());
     router.push(`/s-dashboard/smessage/${userid}`);
   
  };

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
                isSelected={selectedUserIdFromUrl === chat.user_id.toString()}
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