"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ChatCard from "../_components/ChatCard";
import { AdminData } from "@/app/lib/admindata";

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

export default function MessagesSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { messages: rawMessages = [] } = (AdminData ?? { messages: [] }) as {
    messages: any[];
  };

  const [tab, setTab] = useState<ChatTab>("all");

  // Get selected user ID from URL
  const selectedUserId = useMemo(() => {
    const matches = pathname.match(/\/messages\/(.+)/);
    return matches ? matches[1] : undefined;
  }, [pathname]);

  const data: Message[] = useMemo(() => {
    const normalized = rawMessages.map((m) => ({
      ...m,
      user_id: m.user_id.toString(), // Convert to string
      isRead:
        typeof m.isRead === "boolean"
          ? m.isRead
          : typeof m.isActive === "boolean"
          ? Boolean(m.isActive)
          : true,
    }));
    return normalized.sort(
      (a, b) =>
        parseDateFlexible(b.last_seen).getTime() -
        parseDateFlexible(a.last_seen).getTime()
    );
  }, [rawMessages]);

  const filteredChats = useMemo(() => {
    return tab === "unread" ? data.filter((c) => !c.isRead) : data;
  }, [data, tab]);

  // Auto-navigate to first chat if no chat is selected
  useEffect(() => {
    if (!selectedUserId && filteredChats.length > 0) {
      router.push(`/admin-dashboard/message/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedUserId, router]);

  // If current selection not in filtered list, navigate to first visible
  useEffect(() => {
    if (
      selectedUserId &&
      filteredChats.length > 0 &&
      !filteredChats.some((c) => c.user_id === selectedUserId)
    ) {
      router.push(`/admin-dashboard/message/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedUserId, router]);

  const handleChatClick = (userid: string) => {
    router.push(`/admin-dashboard/message/${userid}`);
    
  };

  return (
    <div className="bg-white rounded-2xl w-[340px] h-full">
      <div className="py-8 px-6 border-b border-[#E7ECF4]">
        <h2 className="text-lg text-[#4A4C56] font-semibold">Message</h2>
      </div>

      <div className="space-y-5 w-full md:max-w-[400px] flex flex-col h-full">
        {/* tabs: All / Unread */}
        <div className="flex gap-3 px-6 pt-4">
          {(["all", "unread"] as ChatTab[]).map((t) => {
            const isOn = tab === t;
            const label = t === "all" ? `All Chats` : `Unread`;
            const count =
              t === "all" ? data.length : data.filter((m) => !m.isRead).length;

            return (
              <button
                key={t}
                type="button"
                aria-current={isOn ? "page" : undefined}
                className={`px-4 py-2 cursor-pointer flex items-center justify-center font-semibold transition-colors ${
                  isOn
                    ? "text-primary border-b-[3px] border-primary"
                    : "text-[#4A4C56] hover:text-primary"
                }`}
                onClick={() => setTab(t)}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* list */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.user_id}
                className={`transition-all duration-200 rounded-lg mx-2 mb-2 ${
                  selectedUserId === chat.user_id
                    ? "bg-blue-50 border-l-4 border-blue-500 shadow-sm"
                    : "hover:bg-gray-50"
                }`}
              >
                <ChatCard
                  data={chat}
                  handleChatClick={handleChatClick}
                  isSelected={selectedUserId === chat.user_id}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 px-4">
              <div className="text-gray-300 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.487L3 21l2.487-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                  />
                </svg>
              </div>
              <p className="font-medium">No messages found</p>
              <p className="text-sm">Try a different filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}