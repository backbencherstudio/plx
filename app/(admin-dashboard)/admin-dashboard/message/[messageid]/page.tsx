"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Dot3Icon from "@/public/nominations/icons/Dot3Icon";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { getAdminUserMessages, sendAdminMessage, AdminMessage, AdminSendMessageRequest, getAllAdminUsers } from "@/services/adminMessageService";
import { getInitials, getGradientBackground } from "@/utils/avatarUtils";

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
        const messagesResponse = await getAdminUserMessages(roomIdFromUrl!);
        
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
            
            const convertedMessages: ChatMessage[] = messagesArray.map((msg: AdminMessage) => ({
              id: msg.id,
              content: msg.content,
              timestamp: msg.createdAt,
              senderId: msg.sender.id,
              senderName: msg.sender.fullName,
              type: "text",
              status: "sent",
              isFromUser: msg.sender.type === "admin", // Admin is the sender
              timeAgo: formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })
            }));
            
            console.log("✅ Converted admin messages:", convertedMessages);
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
        // Add the new message to the messages list
        const newMsg: ChatMessage = {
          id: response.data.id,
          content: response.data.content,
          timestamp: response.data.createdAt,
          senderId: response.data.sender.id,
          senderName: response.data.sender.fullName,
          type: "text",
          status: "sent",
          isFromUser: response.data.sender.type === "admin",
          timeAgo: "now"
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage("");
        console.log("✅ Admin message sent successfully");
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
      {/* Header - Always visible, never scrolls */}
      <div className="flex justify-between px-6 pt-5 pb-7 border-b border-[#E9E9EA] flex-shrink-0">
        <div className=" flex items-center gap-3">
          <div>
            <div className={`w-10 h-10 ${getGradientBackground(roomData?.user?.id || 'default')} rounded-full flex items-center justify-center shadow-lg`}>
              <span className="text-gray-700 text-sm font-semibold">
                {getInitials(roomData?.user?.fullName || 'Customer')}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-lg text-[#4A4C56] font-medium">
              {roomData?.user?.fullName || "Customer"}
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
                    <div className={`w-10 h-10 ${getGradientBackground(roomData?.user?.id || 'default')} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-gray-700 text-sm font-semibold">
                        {getInitials(roomData?.user?.fullName || 'Customer')}
                      </span>
                    </div>
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
      
      {/* API Response Debugger */}
      <div className="mt-4 p-4 bg-gray-100 border-t border-gray-300">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">🔍 API Response Debugger</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDebugger(!showDebugger)}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              {showDebugger ? 'Hide' : 'Show'} Debugger
            </button>
            <span className="text-xs text-gray-500">Last Action: {debugInfo.lastAction} at {debugInfo.timestamp}</span>
          </div>
        </div>
        
        {showDebugger && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Users API */}
              <div className="bg-white p-3 rounded border">
                <h4 className="text-xs font-semibold text-blue-600 mb-2">👥 Users API</h4>
                {debugInfo.usersApi ? (
                  <div className="text-xs space-y-1">
                    <div className={`p-1 rounded ${debugInfo.usersApi.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      Status: {debugInfo.usersApi.success ? '✅ Success' : '❌ Failed'}
                    </div>
                    <div className="text-gray-600">Count: {debugInfo.usersApi.dataLength || 0}</div>
                    <div className="text-gray-600">Time: {debugInfo.usersApi.timestamp}</div>
                    {debugInfo.usersApi.error && (
                      <div className="text-red-600 text-xs">Error: {debugInfo.usersApi.error.message}</div>
                    )}
                    <details className="mt-2">
                      <summary className="cursor-pointer text-blue-600">View Full Response</summary>
                      <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-auto max-h-32">
                        {JSON.stringify(debugInfo.usersApi.fullResponse, null, 2)}
                      </pre>
                    </details>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">No data yet</div>
                )}
              </div>
              
              {/* Messages API */}
              <div className="bg-white p-3 rounded border">
                <h4 className="text-xs font-semibold text-green-600 mb-2">💬 Messages API</h4>
                {debugInfo.messagesApi ? (
                  <div className="text-xs space-y-1">
                    <div className={`p-1 rounded ${debugInfo.messagesApi.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      Status: {debugInfo.messagesApi.success ? '✅ Success' : '❌ Failed'}
                    </div>
                    <div className="text-gray-600">Messages: {debugInfo.messagesApi.messagesCount || 0}</div>
                    <div className="text-gray-600">Time: {debugInfo.messagesApi.timestamp}</div>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-blue-600">View Full Response</summary>
                      <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-auto max-h-32">
                        {JSON.stringify(debugInfo.messagesApi.fullResponse, null, 2)}
                      </pre>
                    </details>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">No data yet</div>
                )}
              </div>
              
              {/* Send Message API */}
              <div className="bg-white p-3 rounded border">
                <h4 className="text-xs font-semibold text-purple-600 mb-2">📤 Send Message API</h4>
                {debugInfo.sendMessageApi ? (
                  <div className="text-xs space-y-1">
                    <div className={`p-1 rounded ${debugInfo.sendMessageApi.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      Status: {debugInfo.sendMessageApi.success ? '✅ Success' : '❌ Failed'}
                    </div>
                    <div className="text-gray-600">Time: {debugInfo.sendMessageApi.timestamp}</div>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-blue-600">View Full Response</summary>
                      <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-auto max-h-32">
                        {JSON.stringify(debugInfo.sendMessageApi.fullResponse, null, 2)}
                      </pre>
                    </details>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">No data yet</div>
                )}
              </div>
            </div>
            
            {/* Current State Info */}
            <div className="mt-3 p-2 bg-blue-50 rounded">
              <h4 className="text-xs font-semibold text-blue-800 mb-1">📊 Current State</h4>
              <div className="text-xs text-blue-700 grid grid-cols-2 gap-2">
                <div>Room ID: {actualRoomId || 'None'}</div>
                <div>Messages Count: {messages.length}</div>
                <div>Loading: {loading ? 'Yes' : 'No'}</div>
                <div>Sending: {sending ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
