"use client";
import { useState, useRef, useEffect } from "react";
import { userData } from "../../../../lib/userdata";
import { usePathname } from "next/navigation";
import Dot3Icon from "@/public/nominations/icons/Dot3Icon";
import Image from "next/image";
import youImg from "@/public/sender_img.png";
import { formatDistanceToNow } from "date-fns"; // Import date-fns function

// Type definitions for conversation structure
interface Message {
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
  // Get the list of conversations from userData
  const conversations = userData.messagePage.chatInterface.conversations;
  const pathname = usePathname();

  // Extract the dynamic user_id from the pathname
  const userId = pathname.split("/").pop(); // Assuming the user_id is at the end of the pathname
  console.log("Extracted userId from pathname:", userId);

  // Ensure the userId is a valid string
  const userIdString = userId || "";
  console.log("Parsed userIdString:", userIdString);

  // Filter the conversation based on the user_id
  const filteredConversation = conversations.filter(
    (conversation: Conversation) => conversation.contact.id === userIdString
  );

  // Log the filtered conversation to inspect it
  console.log("Filtered Conversation: ", filteredConversation);

  // Get messages from the current chat in userData
  const currentChat = userData.messagePage.chatInterface.currentChat;
  const initialMessages = currentChat.messages || [];
  console.log("Initial messages:", initialMessages);

  // Convert userData messages to the format expected by the component
  const convertMessages = (userDataMessages: any[]): Message[] => {
    return userDataMessages.map((msg, index) => ({
      id: msg.id || index.toString(),
      content: msg.content,
      timestamp: msg.timestamp,
      senderId: msg.senderId,
      senderName: msg.senderName,
      type: msg.type,
      status: msg.status,
      isFromUser: msg.isFromUser,
      timeAgo: msg.timeAgo,
    }));
  };

  // Set the initial messages state
  const [messages, setMessages] = useState<Message[]>(
    convertMessages(initialMessages)
  );

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: (messages.length + 1).toString(),
      content: newMessage,
      timestamp: new Date().toISOString(),
      senderId: "user",
      senderName: "You",
      type: "text",
      status: "sent",
      isFromUser: true,
      timeAgo: "now",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

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
              src="/sidebar/images/logo.png"
              width={40}
              height={40}
              className="rounded-full"
              alt="PLX Support Team"
            />
          </div>
          <div>
            <h2 className="text-lg text-[#4A4C56] font-medium">
              {filteredConversation[0]?.contact.name || currentChat.contact.name || "PLX Support Team"}
            </h2>
            <p className=" text-xs text-[#A5A5AB]">
              {filteredConversation[0]?.contact.status === "online" ? "Active now" : "Last seen recently"}
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
                        {userData.user.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src="/sidebar/images/logo.png"
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="PLX Support Team"
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
                        {filteredConversation[0]?.contact.name || currentChat.contact.name || "PLX Support Team"}
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
          <div>No messages found.</div>
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
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
