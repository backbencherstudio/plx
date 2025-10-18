import axiosClient from "@/lib/axiosclient";

// Admin API Response Types based on Postman screenshots
export interface AdminChatRoom {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    avatar: string | null;
  };
  lastMessage: any | null;
  unreadCount: number;
}

export interface AdminChatRoomsResponse {
  success: boolean;
  message: string;
  data: {
    rooms: AdminChatRoom[];
  };
}

// Admin User Types for getting all users
export interface AdminUser {
  id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  companyName?: string;
  jobTitle?: string;
  avatar?: string | null;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUsersResponse {
  success: boolean;
  message: string;
  data: AdminUser[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

export interface AdminMessage {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    fullName: string;
    type: string;
    avatar: string | null;
  };
}

export interface AdminMessagesResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    user: {
      id: string;
      type: string;
      avatar: string | null;
      fullName: string;
      email: string;
    };
    messages?: AdminMessage[]; // Add messages property to data object
  };
  messages?: AdminMessage[]; // Keep messages at root level too
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface AdminSendMessageRequest {
  chatRoomId: string;
  content: string;
  // senderId is optional for admin
}

export interface AdminSendMessageResponse {
  success: boolean;
  message: string;
  data: AdminMessage;
}

// Admin API Functions
export const getAllAdminChatRooms = async (page = 1, limit = 5): Promise<AdminChatRoomsResponse> => {
  const res = await axiosClient.get(`/api/v1/message/rooms?page=${page}&limit=${limit}`);
  return res.data;
};

// Get all active/approved users for messaging
export const getAllAdminUsers = async (page = 1, limit = 100): Promise<AdminUsersResponse> => {
  const res = await axiosClient.get(`/api/v1/users/all?page=${page}&limit=${limit}`, {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  });
  return res.data;
};

// Get messages for a specific chat room (using room ID directly)
export const getAdminRoomMessages = async (
  roomId: string, 
  page = 1, 
  limit = 10
): Promise<AdminMessagesResponse> => {
  try {
    console.log("🔍 Getting messages for room:", roomId);
    const res = await axiosClient.get(`/api/v1/message/rooms/${roomId}?page=${page}&limit=${limit}`);
    console.log("✅ Room messages retrieved:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("❌ Error getting room messages:", error);
    console.error("❌ Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    throw error;
  }
};

// Get or create chat room for a user and then get messages
export const getAdminUserMessages = async (
  userId: string, 
  page = 1, 
  limit = 10
): Promise<AdminMessagesResponse> => {
  try {
    console.log("🔍 Getting messages for user:", userId);
    
    // First, get all chat rooms to find the one for this user
    const roomsResponse = await getAllAdminChatRooms(1, 100);
    console.log("📨 All chat rooms:", roomsResponse);
    
    if (roomsResponse.success) {
      // Find the chat room for this user
      const userRoom = roomsResponse.data.rooms.find(room => room.user.id === userId);
      console.log("🔍 Found user room:", userRoom);
      
      if (userRoom) {
        // Get messages for this room using the room ID
        const messagesResponse = await getAdminRoomMessages(userRoom.id, page, limit);
        console.log("✅ Messages retrieved for room:", messagesResponse);
        return messagesResponse;
      } else {
        console.log("⚠️ No chat room found for user, returning empty messages");
        return {
          success: true,
          message: "No messages yet",
          data: {
            id: userId,
            user: {
              id: userId,
              type: "user",
              avatar: null,
              fullName: "User",
              email: ""
            }
          },
          messages: [],
          pagination: {
            currentPage: 1,
            itemsPerPage: 10
          }
        };
      }
    } else {
      throw new Error("Failed to get chat rooms");
    }
  } catch (error: any) {
    console.error("❌ Error getting user messages:", error);
    console.error("❌ Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    
    // Return empty messages structure
    return {
      success: true,
      message: "No messages yet",
      data: {
        id: userId,
        user: {
          id: userId,
          type: "user",
          avatar: null,
          fullName: "User",
          email: ""
        }
      },
      messages: [],
      pagination: {
        currentPage: 1,
        itemsPerPage: 10
      }
    };
  }
};

// Create or get chat room for a user
export const createOrGetChatRoom = async (userId: string): Promise<AdminChatRoom> => {
  try {
    console.log("🔍 Creating/getting chat room for user:", userId);
    
    // Try to create a chat room for the user
    const res = await axiosClient.post('/api/v1/message/create-room', {
      userId: userId
    });
    console.log("✅ Chat room created/retrieved:", res.data);
    return res.data.data;
  } catch (error: any) {
    console.error("❌ Failed to create/get chat room:", error);
    console.error("❌ Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    throw error;
  }
};

export const sendAdminMessage = async (messageData: AdminSendMessageRequest): Promise<AdminSendMessageResponse> => {
  try {
    console.log("📤 Sending message with data:", messageData);
    
    // If chatRoomId is a user ID, we need to find the actual room ID
    let actualRoomId = messageData.chatRoomId;
    
    // Check if this looks like a user ID (not a room ID)
    // If it's a user ID, find the corresponding room
    const roomsResponse = await getAllAdminChatRooms(1, 100);
    if (roomsResponse.success) {
      const userRoom = roomsResponse.data.rooms.find(room => room.user.id === messageData.chatRoomId);
      if (userRoom) {
        actualRoomId = userRoom.id;
        console.log("🔍 Found room ID for user:", actualRoomId);
      } else {
        // No room exists, try to create one
        console.log("⚠️ No room found for user, attempting to create one...");
        try {
          const newRoom = await createOrGetChatRoom(messageData.chatRoomId);
          actualRoomId = newRoom.id;
          console.log("✅ Created new room for user:", actualRoomId);
        } catch (createError) {
          console.error("❌ Failed to create room, using user ID as fallback");
          // Keep using user ID as fallback
        }
      }
    }
    
    const finalMessageData = {
      ...messageData,
      chatRoomId: actualRoomId
    };
    
    console.log("📤 Sending with final data:", finalMessageData);
    const res = await axiosClient.post('/api/v1/message/send-message', finalMessageData);
    console.log("✅ Message sent successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("❌ Failed to send message:", error);
    console.error("❌ Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    throw error;
  }
};
