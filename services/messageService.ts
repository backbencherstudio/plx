import axiosClient from "@/lib/axiosclient";

// API Response Types based on Postman screenshots
export interface ChatRoom {
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

export interface ChatRoomResponse {
  success: boolean;
  message: string;
  data: {
    room: ChatRoom;
  };
}

export interface Message {
  id: string;
  chatRoomId: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    fullName: string;
    type: string;
    avatar: string | null;
  };
}

export interface MessagesResponse {
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
    messages?: Message[]; // Add optional messages in data
  };
  messages: Message[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface SendMessageRequest {
  chatRoomId: string;
  senderId: string;
  content: string;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: Message;
}

// API Functions
export const getMyChatRoom = async (): Promise<ChatRoomResponse> => {
  const res = await axiosClient.get('/api/v1/message/my-room');
  return res.data;
};

export const getRoomMessages = async (
  roomId: string, 
  page = 1, 
  limit = 10
): Promise<MessagesResponse> => {
  const res = await axiosClient.get(`/api/v1/message/rooms/${roomId}?page=${page}&limit=${limit}`);
  return res.data;
};

export const sendMessage = async (messageData: SendMessageRequest): Promise<SendMessageResponse> => {
  const res = await axiosClient.post('/api/v1/message/send-message', messageData);
  return res.data;
};
