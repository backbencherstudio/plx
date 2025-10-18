"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Dot3Icon from "@/public/nominations/icons/Dot3Icon";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { getRoomMessages, sendMessage, Message, SendMessageRequest, getMyChatRoom } from "@/services/messageService";

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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<any>(null);
  const [actualRoomId, setActualRoomId] = useState<string | null>(null);
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
              // Convert API messages to ChatMessage format
              // Handle different possible response structures
              let messagesArray = [];
              
              if (messagesResponse.messages && Array.isArray(messagesResponse.messages)) {
                messagesArray = messagesResponse.messages;
              } else if (messagesResponse.data && messagesResponse.data.messages && Array.isArray(messagesResponse.data.messages)) {
                messagesArray = messagesResponse.data.messages;
              } else {
                console.warn("No messages array found in response:", messagesResponse);
                messagesArray = [];
              }
              
              console.log("Messages array:", messagesArray);
              
              const convertedMessages: ChatMessage[] = messagesArray.map((msg: Message) => ({
                id: msg.id,
                content: msg.content,
                timestamp: msg.createdAt,
                senderId: msg.sender.id,
                senderName: msg.sender.fullName,
                type: "text",
                status: "sent",
                isFromUser: msg.sender.type === "user",
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
        } else {
          setError(`Room API Error: ${roomResponse.message}`);
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
      {/* Header - Always visible, never scrolls */}
      <div className="flex justify-between px-6 pt-5 pb-7 border-b border-[#E9E9EA] flex-shrink-0">
        <div className=" flex items-center gap-3">
          <div>
            <Image
              src={roomData?.user?.avatar || "/sidebar/images/logo.png"}
              width={40}
              height={40}
              className="rounded-full"
              alt={roomData?.user?.fullName || "PLX Support Team"}
            />
          </div>
          <div>
            <h2 className="text-lg text-[#4A4C56] font-medium">
              {roomData?.user?.fullName || "PLX Support Team"}
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

      {/* Chat Messages - Only this part scrolls */}
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
                  {msg.isFromUser ? (
                    <div className="rounded-full bg-[#E7ECF4] w-10 h-10 flex justify-center items-center">
                      <span className="text-sm font-semibold text-[#4A4C56]">
                        {msg.senderName.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={roomData?.user?.avatar || "/sidebar/images/logo.png"}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt={roomData?.user?.fullName || "PLX Support Team"}
                    />
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

                    {msg.isFromUser ? (
                      <p className="  text-sm font-semibold text-[#4A4C56]  ">
                        {msg.senderName}
                      </p>
                    ) : (
                      <p className="   text-sm font-semibold text-[#4A4C56]">
                        {roomData?.user?.fullName || "PLX Support Team"}
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
        <div />
      </div>

      {/* Input Box - Always visible, never scrolls */}
      <div className="p-4 bg-white border-t border-gray-300 flex flex-shrink-0">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={sending}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={sending || !newMessage.trim()}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
