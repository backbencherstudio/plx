"use client";

import Image from "next/image";
import { getInitials, getGradientBackground } from "@/utils/avatarUtils";

interface ChatData {
  user_id: string; // Changed from number to string
  customer_name: string;
  customer_image: string;
  last_seen: string;
  last_message: string;
  isRead: boolean; // <-- new: read state drives styling
  unreadCount?: number; // optional: if you track counts later
  isActive?: boolean;  // legacy (ignored)
}

interface ChatCardProps {
  data: ChatData;
  handleChatClick: (id: string) => void; // Changed from number to string
  isSelected: boolean;
}

export default function ChatCard({
  data,
  handleChatClick,
  isSelected,
}: ChatCardProps) {
  function getLocalDateObject(date = new Date()) {
    return date;
  }

  function formatTimeDifference(startTime: string): string {
    const startDate = new Date(startTime);
    const endDate = getLocalDateObject();

    const diffMs = endDate.getTime() - startDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays >= 1) return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    if (diffHours >= 1) return `${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
    return `${diffMinutes} min`;
  }


  const isUnread = data.isRead === false;
  const trimmedMsg =
    data.last_message.length > 30
      ? data.last_message.slice(0, 30) + "..."
      : data.last_message;

  return (
    <div
      className={`flex gap-3 w-full items-center px-3 py-4 cursor-pointer ${
        isSelected ? "bg-[#E7ECF4] border-l-2 border-primary" : "bg-white border-l-2 border-transparent"
      }`}
      onClick={() => handleChatClick(data.user_id)}
    >
      <div className="rounded-full relative">
        {data.customer_name === "PLX Support Team" ? (
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-gray-200 shadow-lg">
            <Image
              src="/sidebar/images/logo.png"
              alt="PLX Support Team"
              width={60}
              height={60}
              className="w-full h-full object-contain"
            />
          </div>
         ) : (
           <div className="w-[60px] h-[60px] bg-[#E7ECF4] rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200">
             <span className="text-gray-700 text-lg font-semibold">
               {getInitials(data.customer_name)}
             </span>
           </div>
         )}
        {/* Active dot removed */}
      </div>

      <div className="flex gap-[2px] justify-between w-full flex-1 min-w-0">
        <div className="space-y-[2px] min-w-0">
          <h3
            className={`truncate  ${isSelected?"text-primary":"text-[#070707]"} ${
              isUnread ? "font-semibold" : "font-medium"
            }`}
            title={data.customer_name}
          >
            {data.customer_name}
          </h3>

          <h2
            className={`text-sm truncate ${
              isUnread
                ? "text-[#070707] font-semibold"
                : "text-[#5D5D5D] font-light"
            }`}
            title={data.last_message}
          >
            {trimmedMsg}
          </h2>
        </div>

        <div className="flex flex-col items-end justify-between">
          {/* always show time */}
          <h3 className="text-[#5D5D5D] text-[12px] font-light text-nowrap">
            {formatTimeDifference(data.last_seen)}
          </h3>

          {/* Unread badge only when not selected and unread */}
          {/* {!isSelected && isUnread && (
            <div className="aspect-square rounded-full bg-[#FF6A00] text-[12px] font-semibold w-[20px] flex items-center justify-center text-white">
              {data.unreadCount && data.unreadCount > 9
                ? "9+"
                : data.unreadCount ?? 1}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}