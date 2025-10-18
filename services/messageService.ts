import axiosClient from "@/lib/axiosclient";

 

// ✅ Type definitions
export interface GetMessageRoomsParams {
  page?: number;
  limit?: number;
}

export interface MessageUser {
  id: string;
  fullName: string;
  email: string;
  avatar: string | null;
}

export interface LastMessage {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    id: string;
    fullName: string;
    type: string;
  };
}

export interface MessageRoom {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: MessageUser;
  lastMessage: LastMessage | null;
  unreadCount: number;
}

export interface GetMessageRoomsResponse {
  success: boolean;
  message: string;
  data: {
    rooms: MessageRoom[];
  };
  pagination: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
}

// ✅ Function
export const getMessageRooms = async (params: GetMessageRoomsParams = {}) => {
  try {
    // 🔐 Token check
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in again.");
    }

    // 🧩 Build query string
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const url = `/api/v1/message/rooms${queryString ? `?${queryString}` : ""}`;

    console.log("📤 Fetching message rooms from:", url);
    console.log("🔑 Using token:", token.substring(0, 20) + "...");

    // ⚡ API call
    const res = await  axiosClient.get<GetMessageRoomsResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Message rooms fetched successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("❌ Error fetching message rooms:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    } else if (error.response?.status === 403) {
      throw new Error("Access denied. You do not have permission to view messages.");
    } else if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      throw new Error(error.response?.data?.message || error.message || "Failed to fetch message rooms.");
    }
  }
};
