"use client";

import Image from "next/image";
import React from "react";

export interface ChatCardData {
  user_id: string;
  customer_name: string;
  customer_image?: string | null;
  last_message: string;
  last_seen: string;
  isRead: boolean;
}

interface ChatCardProps {
  data: ChatCardData;
  handleChatClick: (id: string) => void;
  isSelected: boolean;
}

const ChatCard: React.FC<ChatCardProps> = ({ data, handleChatClick, isSelected }) => {
  const { user_id, customer_name, customer_image, last_message, last_seen, isRead } = data;

  //if image url not found default avatar
  const defaultAvatar = customer_name ? customer_name.charAt(0).toUpperCase() : "?";

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

  const isUnread = !isRead;
  const trimmedMsg =
    last_message.length > 30 ? last_message.slice(0, 30) + "..." : last_message;

  return (
    <div
      className={`flex gap-3 w-full items-center px-3 py-4 cursor-pointer ${
        isSelected
          ? "bg-[#E7ECF4] border-l-2 border-primary"
          : "bg-white border-l-2 border-transparent hover:bg-gray-50"
      }`}
      onClick={() => handleChatClick(user_id)}
    >
      <div className="rounded-full relative w-[60px] h-[60px] flex-shrink-0">
        {customer_image ? (
          <Image
            unoptimized
            src={customer_image}
            alt={`${customer_name} avatar`}
            width={60}
            height={60}
            className="w-[60px] h-[60px] object-cover rounded-full"
          />
        ) : (
          <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#123F93] text-white font-semibold text-xl">
            {defaultAvatar}
          </div>
        )}
      </div>

      <div className="flex gap-[2px] justify-between w-full flex-1 min-w-0">
        <div className="space-y-[2px] min-w-0">
          <h3
            className={`truncate ${isSelected ? "text-primary" : "text-[#070707]"} ${
              isUnread ? "font-semibold" : "font-medium"
            }`}
            title={customer_name}
          >
            {customer_name}
          </h3>
          <h2
            className={`text-sm truncate ${
              isUnread ? "text-[#070707] font-semibold" : "text-[#5D5D5D] font-light"
            }`}
            title={last_message}
          >
            {trimmedMsg || "No messages yet"}
          </h2>
        </div>

        <div className="flex flex-col items-end justify-between">
          <h3 className="text-[#5D5D5D] text-[12px] font-light">
            {formatTimeDifference(last_seen)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
