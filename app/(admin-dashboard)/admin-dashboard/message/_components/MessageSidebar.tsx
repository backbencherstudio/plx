"use client";
import React, { useEffect, useState } from "react";
import { getMessageRooms } from "@/services/messageService"; // তোমার তৈরি function

interface ChatUser {
  id: string;
  name: string;
  avatar: string | null;
  lastMessage?: string;
  unreadCount?: number;
}

const ChatList = () => {
  const [chatList, setChatList] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await getMessageRooms({ page: 1, limit: 10 });
        const rooms = data.data.rooms.map((room) => ({
          id: room.id,
          name: room.user.fullName,
          avatar: room.user.avatar,
          lastMessage: room.lastMessage?.content || "",
          unreadCount: room.unreadCount,
        }));
        setChatList(rooms);
      } catch (err) {
        console.error("Failed to load chat rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div className="text-center py-6">Loading chats...</div>;

  return (
    <div className="chat-list">
      {chatList.length > 0 ? (
        chatList.map((chat) => (
          <div key={chat.id} className="chat-item flex items-center gap-3 p-3 border-b">
            <img
              src={chat.avatar || "/default-avatar.png"}
              alt={chat.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-sm"> </h4>
              <p className="text-gray-500 text-xs truncate">
                {chat.lastMessage || "No message yet"}
              </p>
            </div>
            {chat.unreadCount && chat.unreadCount > 0 && (
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                {chat.unreadCount}
              </span>
            )}
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-center py-6">No chats available</div>
      )}
    </div>
  );
};

export default ChatList;
