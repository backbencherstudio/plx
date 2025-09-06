"use client";

import { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation"; // ❌ not needed now
import { useRouter, usePathname } from "next/navigation";
import ChatCard from "../_components/ChatCard";
import { AdminData } from "@/app/lib/admindata";

type RawMessage = {
  user_id: number;
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

  const { messages: rawMessages = [] } = (AdminData ?? { messages: [] }) as {
    messages: RawMessage[];
  };

  const [tab, setTab] = useState<ChatTab>("all");
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();

  const data: Message[] = useMemo(() => {
    const normalized = rawMessages.map((m) => ({
      ...m,
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

  // initial select
  useEffect(() => {
    if (!selectedUserId && filteredChats.length > 0) {
      setSelectedUserId(filteredChats[0].user_id);
       router.push(`/admin-dashboard/message/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedUserId,router]);

  // if current selection not in filtered list, pick first visible
  useEffect(() => {
    if (
      selectedUserId &&
      filteredChats.length > 0 &&
      !filteredChats.some((c) => c.user_id === selectedUserId)
    ) {
      setSelectedUserId(filteredChats[0].user_id);
      router.push(`/admin-dashboard/message/${filteredChats[0].user_id}`);
    }
  }, [filteredChats, selectedUserId]);


  

 
  const handleChatClick = (userid: number) => {
    setSelectedUserId(userid);
     router.push(`/admin-dashboard/message/${userid}`);
   
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