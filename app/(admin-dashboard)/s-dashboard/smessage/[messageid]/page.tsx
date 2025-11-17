"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Dot3Icon from "@/public/nominations/icons/Dot3Icon";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { getRoomMessages, sendMessage, Message, SendMessageRequest, getMyChatRoom } from "@/services/subscriberService";
import { getInitials, getGradientBackground } from "@/utils/avatarUtils";
import SendIcon from "@/public/commonIcons/SendIcon";
import { useCurrentUser } from "@/utils/useCurrentUser";

// Type definitions for conversation structure
interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  type: string;
  status: string;
  isFromUser: boolean;
  timeAgo: string;
}

interface Conversation {
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
}

const generateRandomMessage = (): string => {
  const randomMessages = [
    "Can you confirm the delivery date?",
    "I have some questions about the payment.",
    "Is there an update on my order?",
    "Do you have any feedback for us?",
    "Let me know if you need any help!",
  ];
  return randomMessages[Math.floor(Math.random() * randomMessages.length)];
};

export default function ChatPage() {
  const pathname = usePathname();
  const { user: currentUser, loading: userLoading } = useCurrentUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [actualRoomId, setActualRoomId] = useState<string | null>(null);
  const [adminProfile, setAdminProfile] = useState<{ id: string; fullName: string; avatar: string | null } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Extract the room ID from the pathname
  const roomIdFromUrl = pathname.split("/").pop();
  console.log("Room ID from URL:", roomIdFromUrl);

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First get the chat room info to get the actual room ID
        const roomResponse = await getMyChatRoom();
        console.log("Room response:", roomResponse);
        
        if (roomResponse.success) {
          const room = roomResponse.data.room;
          console.log("Room data:", room);
          setRoomData(room);
          setActualRoomId(room.id);
          
          // For customer view: room.user is the admin they're chatting with
          // Extract admin profile from room data - this is who the customer chats with
          if (room.user) {
            // room.user is the admin in customer's chat room
            setAdminProfile({
              id: room.user.id,
              fullName: room.user.fullName || "Support Team",
              avatar: room.user.avatar
            });
          }
          
          // Now get messages for this room using the actual room ID
          const messagesResponse = await getRoomMessages(room.id);
          console.log("Messages response:", messagesResponse);
          console.log("Messages response structure:", {
            success: messagesResponse.success,
            message: messagesResponse.message,
            data: messagesResponse.data,
            messages: messagesResponse.messages,
            messagesType: typeof messagesResponse.messages,
            messagesIsArray: Array.isArray(messagesResponse.messages)
          });
          
          if (messagesResponse.success) {
            try {
              // Convert API messages to ChatMessage formatt
              // Handle different possible response structures
              let messagesArray: Message[] = [];
              
              if (messagesResponse.messages && Array.isArray(messagesResponse.messages)) {
                messagesArray = messagesResponse.messages;
              } else if (messagesResponse.data && messagesResponse.data.messages && Array.isArray(messagesResponse.data.messages)) {
                messagesArray = messagesResponse.data.messages;
              } else {
                console.warn("No messages array found in response:", messagesResponse);
                messagesArray = [];
              }
              
              console.log("Messages array:", messagesArray);
              
              // Extract admin profile from messages if room data didn't have it
              // Admin messages have sender.type === "admin"
              const adminMsg = messagesArray.find((m: Message) => m.sender.type === "admin");
              if (adminMsg && (!room.user || !room.user.id)) {
                // Only set from messages if room data doesn't have admin info
                setAdminProfile({
                  id: adminMsg.sender.id,
                  fullName: adminMsg.sender.fullName,
                  avatar: adminMsg.sender.avatar
                });
              }
              
              // For customer view: admin messages on left (under admin profile), customer messages on right (under customer profile)
              const convertedMessages: ChatMessage[] = messagesArray.map((msg: Message) => ({
                id: msg.id,
                content: msg.content,
                timestamp: msg.createdAt,
                senderId: msg.sender.id,
                senderName: msg.sender.fullName,
                type: "text",
                status: "sent",
                isFromUser: msg.sender.type === "user", // Customer messages on right, admin messages on left
                timeAgo: formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })
              }));
              
              console.log("Converted messages:", convertedMessages);
              setMessages(convertedMessages);
            } catch (msgError) {
              console.error("Error processing messages:", msgError);
              setError(`Error processing messages: ${msgError}`);
              setMessages([]); // Set empty array as fallback
            }
          } else {
            setError(`Messages API Error: ${messagesResponse.message}`);
          }
          
          // Ensure admin profile is set even if no messages yet
          if (!adminProfile && room.user) {
            setAdminProfile({
              id: room.user.id,
              fullName: room.user.fullName || "Support Team",
              avatar: room.user.avatar
            });
          }
        } else {
          setError(`Room API Error: ${roomResponse.message}`);
          
          // Try to set admin profile from room data even on error
          if (roomResponse.data?.room?.user) {
            setAdminProfile({
              id: roomResponse.data.room.user.id,
              fullName: roomResponse.data.room.user.fullName || "Support Team",
              avatar: roomResponse.data.room.user.avatar
            });
          }
        }
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [roomIdFromUrl]);

  const handleSend = async () => {
    if (newMessage.trim() === "" || !actualRoomId) return;

    setSending(true);
    try {
      const messageData: SendMessageRequest = {
        chatRoomId: actualRoomId,
        senderId: actualRoomId, // Using actual room ID as senderId
        content: newMessage.trim()
      };

      const response = await sendMessage(messageData);
      if (response.success) {
        // Add the new message to the messages list
        const newMsg: ChatMessage = {
          id: response.data.id,
          content: response.data.content,
          timestamp: response.data.createdAt,
          senderId: response.data.sender.id,
          senderName: response.data.sender.fullName,
          type: "text",
          status: "sent",
          isFromUser: response.data.sender.type === "user",
          timeAgo: "now"
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage("");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to send message");
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ADMIN_BRAND_NAME = "PLX Energy Transport";
  const ADMIN_BRAND_LOGO = "/sidebar/images/logo.png";
  const adminName = ADMIN_BRAND_NAME;
  const adminAvatarSrc = ADMIN_BRAND_LOGO;
  const adminAvatarId = ADMIN_BRAND_NAME;

  if (loading) {
    return (
      <div className="flex flex-col bg-white rounded-[12px] h-full items-center justify-center" style={{ height: "calc(100vh - 150px)" }}>
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col bg-white rounded-[12px] h-full items-center justify-center" style={{ height: "calc(100vh - 150px)" }}>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-white rounded-[12px] h-full"
      style={{ height: "calc(100vh - 150px)" }}
    >
      {/* Header - Always visible, never scrolls - Shows Admin Profile (who customer is chatting with) */}
      <div className="flex justify-between px-6 pt-5 pb-7 border-b border-[#E9E9EA] flex-shrink-0">
        <div className=" flex items-center gap-3">
          <div>
            {adminAvatarSrc ? (
              <Image
                src={adminAvatarSrc}
                width={40}
                height={40}
                className="rounded-full object-contain"
                alt={adminName}
              />
            ) : (
              <div className={`w-10 h-10 ${getGradientBackground(adminAvatarId || 'admin-default')} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-gray-700 text-sm font-semibold">
                  {getInitials(adminName)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg text-[#4A4C56] font-medium">
              {adminName}
            </h2>
            <p className=" text-xs text-[#A5A5AB]">
              Active now
            </p>
          </div>
        </div>
        <button className=" rounded-xl border border-[#E9E9EA]  flex items-center justify-center px-3 cursor-pointer">
          <Dot3Icon />
        </button>
      </div>

      {/* Chat Messages - Only this part scrolls **/}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide min-h-0">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.isFromUser ? "justify-end" : "justify-start"
              }`}
            >
              <div className={`flex gap-3`}>
                <div className={`${msg.isFromUser && "order-2"}`}>
                  {/* Customer view: Admin messages show admin profile, customer messages show customer profile */}
                  {msg.isFromUser ? (
                    // Customer's own messages - show customer profile
                    currentUser?.avatar ? (
                      <Image
                        src={currentUser.avatar}
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                        alt={currentUser.fullName || "You"}
                      />
                    ) : (
                      <div className={`w-10 h-10 ${getGradientBackground(currentUser?.id || 'default')} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-gray-700 text-sm font-semibold">
                          {getInitials(currentUser?.fullName || 'You')}
                        </span>
                      </div>
                    )
                  ) : (
                    // Admin messages - show admin profile
                    adminAvatarSrc ? (
                      <Image
                        src={adminAvatarSrc}
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                        alt={adminName}
                      />
                    ) : (
                      <div className={`w-10 h-10 ${getGradientBackground(adminAvatarId || 'admin-default')} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-gray-700 text-sm font-semibold">
                          {getInitials(adminName)}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div>
                  <div
                    className={` flex items-center gap-4 mb-2${
                      msg.isFromUser
                        ? " justify-end"
                        : " justify-start"
                    }`}
                  >
                    <div className={`${msg.isFromUser?'order-2':''}`}>
                      {/* Customer view: Show customer name for customer messages, admin name for admin messages */}
                      {msg.isFromUser ? (
                        <p className="  text-sm font-semibold text-[#4A4C56]  ">
                          {currentUser?.fullName || "You"}
                        </p>
                      ) : (
                        <p className="   text-sm font-semibold text-[#4A4C56]">
                          {adminName}
                        </p>
                      )}
                    </div>
                    <p className="text-xs  text-[#A5A5AB]">
                      {msg.timeAgo || formatDistanceToNow(new Date(msg.timestamp), {
                        addSuffix: true,
                      })
                        .replace(/^about /, "")
                        .replace(/^less than /, "")}
                    </p>
                  </div>
                  <p
                    className={`max-w-[680px] flex flex-wrap p-3   ${
                      msg.isFromUser
                        ? "bg-primary text-white rounded-b-[12px] rounded-tl-[12px]"
                        : "bg-[#E7ECF4] text-black  rounded-b-[12px] rounded-tr-[12px]"
                    }`}
                  >
                    {msg.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-sm">Start a conversation!</p>
            </div>
          </div>
        )}
        {/* This div acts as a scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box - Always visible, never scrolls */}
      <div className="p-4 bg-white border-t border-gray-300 flex flex-shrink-0 gap-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={sending}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        {/* <button
          onClick={handleSend}
          disabled={sending || !newMessage.trim()}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Sending..." : "Send"}
        </button> */}
          <button onClick={handleSend}    disabled={sending || !newMessage.trim()} className=" bg-[#0E2F6E] p-2.5 rounded-xl cursor-pointer">
                  <SendIcon/>
                </button>
      </div>
    </div>
  );
}
