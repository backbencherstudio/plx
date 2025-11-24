"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Dot3Icon from "@/public/nominations/icons/Dot3Icon";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { getAdminUserMessages, sendAdminMessage, AdminMessage, AdminSendMessageRequest, getAllAdminUsers } from "@/services/adminMessageService";
import SendIcon from "@/public/commonIcons/SendIcon";
import { useCurrentUser } from "@/utils/useCurrentUser";
import { getInitials, getGradientBackground } from "@/utils/avatarUtils";

// Type definitions for conversation structure
interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  senderType?: string; // "admin" or "user"
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Debug states for API responses
  const [debugInfo, setDebugInfo] = useState<{
    usersApi: any;
    messagesApi: any;
    sendMessageApi: any;
    lastAction: string;
    timestamp: string;
  }>({
    usersApi: null,
    messagesApi: null,
    sendMessageApi: null,
    lastAction: "",
    timestamp: ""
  });
  const [showDebugger, setShowDebugger] = useState(false);

  // Extract the room ID from the pathname
  const roomIdFromUrl = pathname.split("/").pop();
  console.log("🔍 Admin Room ID from URL:", roomIdFromUrl);

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("🔍 Fetching admin messages for user:", roomIdFromUrl);
        
        // Get user information first
        let userInfo = null;
        try {
          console.log("🔍 API Debug: Fetching users...");
          const usersResponse = await getAllAdminUsers(1, 100);
          
          // Update debug info
          setDebugInfo(prev => ({
            ...prev,
            usersApi: {
              success: usersResponse.success,
              message: usersResponse.message,
              dataLength: usersResponse.data?.length || 0,
              pagination: usersResponse.pagination,
              timestamp: new Date().toLocaleTimeString(),
              fullResponse: usersResponse
            },
            lastAction: "Users API Call",
            timestamp: new Date().toLocaleTimeString()
          }));
          
          if (usersResponse.success) {
            userInfo = usersResponse.data.find(user => user.id === roomIdFromUrl);
            console.log("👤 Found user info:", userInfo);
          }
        } catch (userError) {
          console.log("⚠️ Could not fetch user info:", userError);
          setDebugInfo(prev => ({
            ...prev,
            usersApi: {
              error: userError,
              timestamp: new Date().toLocaleTimeString()
            },
            lastAction: "Users API Error",
            timestamp: new Date().toLocaleTimeString()
          }));
        }
        
        // Get messages for this user using the user ID from URL
        console.log("🔍 API Debug: Fetching messages...");
        // Use a high limit to fetch all messages
        const messagesResponse = await getAdminUserMessages(roomIdFromUrl!, 1, 1000);
        
        // Update debug info for messages API
        setDebugInfo(prev => ({
          ...prev,
          messagesApi: {
            success: messagesResponse.success,
            message: messagesResponse.message,
            messagesCount: messagesResponse.messages?.length || 0,
            data: messagesResponse.data,
            pagination: messagesResponse.pagination,
            timestamp: new Date().toLocaleTimeString(),
            fullResponse: messagesResponse
          },
          lastAction: "Messages API Call",
          timestamp: new Date().toLocaleTimeString()
        }));
        
        console.log("📨 Admin messages response:", messagesResponse);
        console.log("📨 Admin messages response structure:", {
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
            let messagesArray: AdminMessage[] = [];
            
            // Handle different possible response structures from API
            if (messagesResponse.messages && Array.isArray(messagesResponse.messages)) {
              messagesArray = messagesResponse.messages;
            } else if (messagesResponse.data && (messagesResponse.data as any).messages && Array.isArray((messagesResponse.data as any).messages)) {
              messagesArray = (messagesResponse.data as any).messages;
            } else {
              console.warn("No messages array found in response:", messagesResponse);
              messagesArray = [];
            }
            
            console.log("📨 Admin messages array:", messagesArray);
            
            // For admin view: customer messages appear on left (with customer profile), admin messages appear on right (with admin profile)
            const convertedMessages: ChatMessage[] = messagesArray
              .map((msg: AdminMessage) => ({
                id: msg.id,
                content: msg.content,
                timestamp: msg.createdAt,
                senderId: msg.sender.id,
                senderName: msg.sender.fullName,
                senderType: msg.sender.type, // Store sender type to determine which profile to show
                type: "text",
                status: "sent",
                isFromUser: msg.sender.type === "admin", // Admin messages on right, customer messages on left
                timeAgo: formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })
              }))
              .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()); // Sort by timestamp
            
            console.log("✅ Converted admin messages:", convertedMessages);
            console.log("✅ Converted admin messages length:", convertedMessages.length);
            setMessages(convertedMessages);
            
            // Use user info if available, otherwise use API response data
            const roomDataToSet = userInfo ? {
              user: {
                id: userInfo.id,
                fullName: userInfo.fullName || `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim(),
                email: userInfo.email,
                avatar: userInfo.avatar,
                type: "user"
              }
            } : messagesResponse.data;
            
            setRoomData(roomDataToSet);
            setActualRoomId(roomIdFromUrl!);
          } catch (msgError) {
            console.error("❌ Error processing admin messages:", msgError);
            setError(`Error processing messages: ${msgError}`);
            setMessages([]);
          }
        } else {
          console.log("⚠️ API returned success=false, but continuing with empty messages");
          // Even if API fails, we should still show the chat interface
          setMessages([]);
          
          // Use user info if available
          const roomDataToSet = userInfo ? {
            user: {
              id: userInfo.id,
              fullName: userInfo.fullName || `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim(),
              email: userInfo.email,
              avatar: userInfo.avatar,
              type: "user"
            }
          } : { user: { fullName: "User", avatar: null } };
          
          setRoomData(roomDataToSet);
          setActualRoomId(roomIdFromUrl!);
        }
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
        console.error("❌ Error fetching admin data:", err);
        
        // Update debug info for general error
        setDebugInfo(prev => ({
          ...prev,
          messagesApi: {
            success: false,
            error: err,
            timestamp: new Date().toLocaleTimeString(),
            fullResponse: null
          },
          lastAction: "General Fetch Error",
          timestamp: new Date().toLocaleTimeString()
        }));
      } finally {
        setLoading(false);
      }
    };

    if (roomIdFromUrl) {
      fetchMessages();
    }
  }, [roomIdFromUrl]);

  const handleSend = async () => {
    if (newMessage.trim() === "" || !actualRoomId) return;

    setSending(true);
    try {
      const messageData: AdminSendMessageRequest = {
        chatRoomId: actualRoomId, // This is now the user ID
        content: newMessage.trim()
      };

      console.log("📤 Sending admin message:", messageData);
      const response = await sendAdminMessage(messageData);
      
      // Update debug info for send message API
      setDebugInfo(prev => ({
        ...prev,
        sendMessageApi: {
          success: response.success,
          message: response.message,
          data: response.data,
          timestamp: new Date().toLocaleTimeString(),
          fullResponse: response
        },
        lastAction: "Send Message API Call",
        timestamp: new Date().toLocaleTimeString()
      }));
      
      console.log("📨 Admin send response:", response);
      
      if (response.success) {
        // Clear input immediately for better UX
        setNewMessage("");
        
        // Fetch fresh messages from API to ensure all messages are displayed
        try {
          // Use a high limit to fetch all messages
          const messagesResponse = await getAdminUserMessages(actualRoomId, 1, 1000);
          console.log("📨 Fresh admin messages after send:", messagesResponse);
          
          if (messagesResponse.success) {
            let messagesArray: AdminMessage[] = [];
            
            if (messagesResponse.messages && Array.isArray(messagesResponse.messages)) {
              messagesArray = messagesResponse.messages;
            } else if (messagesResponse.data && (messagesResponse.data as any).messages && Array.isArray((messagesResponse.data as any).messages)) {
              messagesArray = (messagesResponse.data as any).messages;
            }
            
            // Convert API messages to ChatMessage format
            const convertedMessages: ChatMessage[] = messagesArray
              .map((msg: AdminMessage) => ({
                id: msg.id,
                content: msg.content,
                timestamp: msg.createdAt,
                senderId: msg.sender.id,
                senderName: msg.sender.fullName,
                senderType: msg.sender.type,
                type: "text",
                status: "sent",
                isFromUser: msg.sender.type === "admin",
                timeAgo: formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })
              }))
              .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()); // Sort by timestamp
            
            console.log("✅ Fresh converted admin messages after send:", convertedMessages);
            console.log("✅ Fresh converted admin messages length:", convertedMessages.length);
            setMessages(convertedMessages);
            console.log("✅ Admin messages refreshed successfully");
          }
        } catch (fetchError) {
          console.error("❌ Error fetching fresh admin messages:", fetchError);
          // Fallback: Add the new message to the list if fetch fails
          const newMsg: ChatMessage = {
            id: response.data.id,
            content: response.data.content,
            timestamp: response.data.createdAt,
            senderId: response.data.sender.id,
            senderName: response.data.sender.fullName,
            senderType: response.data.sender.type,
            type: "text",
            status: "sent",
            isFromUser: response.data.sender.type === "admin",
            timeAgo: "now"
          };
          setMessages(prev => [...prev, newMsg]);
        }
      } else {
        setError(response.message);
        console.error("❌ Admin send error:", response.message);
      }
    } catch (err) {
      setError("Failed to send message");
      console.error("❌ Error sending admin message:", err);
      
      // Update debug info for send message API error
      setDebugInfo(prev => ({
        ...prev,
        sendMessageApi: {
          success: false,
          error: err,
          timestamp: new Date().toLocaleTimeString(),
          fullResponse: null
        },
        lastAction: "Send Message API Error",
        timestamp: new Date().toLocaleTimeString()
      }));
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
      {/* Header - Shows selected customer info while reminding admin account */}
      <div className="flex justify-between px-6 pt-5 pb-7 border-b border-[#E9E9EA] flex-shrink-0">
        <div className=" flex items-center gap-3">
          <div>
            {roomData?.user?.avatar ? (
              <Image
                src={roomData.user.avatar}
                width={40}
                height={40}
                className="rounded-full object-contain"
                alt={roomData.user.fullName || "Customer"}
              />
            ) : (
              <div className={`w-10 h-10 ${getGradientBackground(roomData?.user?.id || 'customer-default')} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-gray-700 text-sm font-semibold">
                  {getInitials(roomData?.user?.fullName || 'Customer')}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg text-[#4A4C56] font-medium">
              {roomData?.user?.fullName || "Customer"}
            </h2>
            <p className=" text-xs text-[#A5A5AB]">
              You are replying as {currentUser?.fullName || "Admin"}
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
                  {/* Admin view: Customer messages show customer profile, admin messages show admin profile */}
                  {msg.isFromUser ? (
                    // Admin's own messages - show admin profile
                    currentUser?.avatar ? (
                      <Image
                        src={currentUser.avatar}
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                        alt={currentUser.fullName || "Admin"}
                      />
                    ) : (
                      <div className={`w-10 h-10 ${getGradientBackground(currentUser?.id || 'default')} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-gray-700 text-sm font-semibold">
                          {getInitials(currentUser?.fullName || 'Admin')}
                        </span>
                      </div>
                    )
                  ) : (
                    // Customer messages - show customer profile
                    roomData?.user?.avatar ? (
                      <Image
                        src={roomData.user.avatar}
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                        alt={roomData.user.fullName || "Customer"}
                      />
                    ) : (
                      <div className={`w-10 h-10 ${getGradientBackground(roomData?.user?.id || 'customer-default')} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="text-gray-700 text-sm font-semibold">
                          {getInitials(roomData?.user?.fullName || 'Customer')}
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
                      {/* Admin view: Show customer name for customer messages, admin name for admin messages */}
                      {msg.isFromUser ? (
                        <p className="  text-sm font-semibold text-[#4A4C56]  ">
                          {currentUser?.fullName || "Admin"}
                        </p>
                      ) : (
                        <p className="   text-sm font-semibold text-[#4A4C56]">
                          {roomData?.user?.fullName || "Customer"}
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
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E2F6E] disabled:opacity-50"
        />
        {/* <button
          
       
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Sending..." : "Send"}
        </button> */}
        <button onClick={handleSend}    disabled={sending || !newMessage.trim()} className=" bg-[#0E2F6E] p-2.5 rounded-xl cursor-pointer">
          <SendIcon/>
        </button>
      </div>
      
      {/* API Response Debugger */}
      
    </div>
  );
}
