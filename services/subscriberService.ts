import axiosClient from "@/lib/axiosclient";

// ============ Types ============

// Nomination Types
export interface CreateNominationPayload {
  assetGroup: string;
  commodityType: string;
  volume: string;
  unit: string;
  origin: string;
  destination: string;
  transportMode: string;
  connection: string;
  beginningDate: string | null;
  endDate: string | null;
  notes: string;
}

export interface NominationResponse {
  id: string;
  nominationId: string;
  assetGroup: string;
  commodityType: string;
  origin: string;
  volume: string;
  destination: string;
  unit: string;
  transportMode: string;
  beginningDate: string;
  endDate: string;
  notes: string;
  connection: string;
  userId: string;
  status: string;
  scheduleFile: string | null;
  requestedDate: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    avatar: string | null;
  };
}

export interface GetNominationsResponse {
  success: boolean;
  message: string;
  data: NominationResponse[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  count: number;
}

export interface GetNominationsParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

// Schedule Types
export interface Schedule {
  id: string;
  assignTo: string;
  commodityType: string;
  assetGroup: string;
  scheduleMonth: string;
  transportMode: string;
  scheduleFile: string;
  createdAt: string;
  updatedAt: string;
}

export interface SchedulePagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetSchedulesResponse {
  success: boolean;
  message: string;
  data: Schedule[];
  pagination: SchedulePagination;
}

// Message Types (re-exported from messageService)
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
    messages?: Message[];
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

// Settings Types
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar: string | null;
  companyName: string | null;
  jobTitle: string | null;
  phone: string | null;
  timezone: string | null;
  dateFormat: string | null;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  timezone?: string;
  dateFormat?: string;
  companyName?: string;
  jobTitle?: string;
}

export interface NotificationSettings {
  emailAccess: boolean;
  phoneAccess: boolean;
  pushAccess: boolean;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface UpdatePermissionsResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    emailAccess: boolean;
    phoneAccess: boolean;
    pushAccess: boolean;
  };
}

// ============ Nomination API Calls ============

/**
 * Get all nominations for the authenticated subscriber
 */
export const getMyNominations = async (params: GetNominationsParams = {}): Promise<GetNominationsResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);

    const queryString = queryParams.toString();
    const url = `/api/v1/nomination/my${queryString ? `?${queryString}` : ''}`;
    
    const res = await axiosClient.get(url);
    return res.data as GetNominationsResponse;
  } catch (error: any) {
    console.error("Error fetching nominations:", error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      throw new Error('Access denied. You do not have permission to view nominations.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch nominations');
    }
  }
};

/**
 * Create a new nomination
 */
export const createNomination = async (payload: CreateNominationPayload): Promise<any> => {
  try {
    const res = await axiosClient.post("/api/v1/nomination/create", payload);
    console.log("Nomination created successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error creating nomination:", error.response?.data || error.message);
    throw error;
  }
};

// ============ Schedule API Calls ============

/**
 * Get all schedules for the authenticated subscriber
 */
export const getMySchedules = async (page: number = 1, limit: number = 50): Promise<GetSchedulesResponse> => {
  try {
    const res = await axiosClient.get("/api/v1/schedule/my", { 
      params: { page, limit } 
    });
    return res.data as GetSchedulesResponse;
  } catch (error: any) {
    console.error("Error fetching schedules:", error.response?.data || error.message);
    throw error;
  }
};

// ============ Message API Calls ============

/**
 * Get the chat room for the authenticated subscriber
 */
export const getMyChatRoom = async (): Promise<ChatRoomResponse> => {
  try {
    const res = await axiosClient.get('/api/v1/message/my-room');
    return res.data;
  } catch (error: any) {
    console.error("Error fetching chat room:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get messages for a specific chat room
 */
export const getRoomMessages = async (
  roomId: string, 
  page: number = 1, 
  limit: number = 10
): Promise<MessagesResponse> => {
  try {
    const res = await axiosClient.get(`/api/v1/message/rooms/${roomId}?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching messages:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Send a message in a chat room
 */
export const sendMessage = async (messageData: SendMessageRequest): Promise<SendMessageResponse> => {
  try {
    const res = await axiosClient.post('/api/v1/message/send-message', messageData);
    return res.data;
  } catch (error: any) {
    console.error("Error sending message:", error.response?.data || error.message);
    throw error;
  }
};

// ============ Settings API Calls ============

/**
 * Get user profile information
 */
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  try {
    const res = await axiosClient.get("/api/v1/auth/me");
    return res.data;
  } catch (error: any) {
    console.error("Error fetching user profile:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update user profile information
 */
export const updateUserProfile = async (profileData: UpdateProfileData): Promise<UserProfileResponse> => {
  try {
    const res = await axiosClient.patch("/api/v1/auth/update", profileData);
    return res.data;
  } catch (error: any) {
    console.error("Error updating user profile:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Update notification permissions
 */
export const updateNotificationPermissions = async (permissions: NotificationSettings): Promise<UpdatePermissionsResponse> => {
  try {
    const res = await axiosClient.patch("/api/v1/auth/parmitions", permissions);
    return res.data;
  } catch (error: any) {
    console.error("Error updating notification permissions:", error.response?.data || error.message);
    throw error;
  }
};

