import axiosClient from "../lib/axiosclient";

// *** Meeting types ***
export interface MeetingResponse {
  id: string;
  event_name: string;
  start_time: string;
  end_time?: string;
  organizer_name: string;
  organizer_email?: string;
  invitee_name: string;
  invitee_email?: string;
  location?: string;
  description?: string;
  status: string;
  meeting_type?: string;
  duration?: number;
}

export interface GetMeetingsResponse {
  success: boolean;
  message: string;
  meetings: MeetingResponse[];
  pagination?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface GetMeetingsParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
}

// ========= Meeting service =========

// *** Get All Meetings ***
export const getAllMeetings = async (params: GetMeetingsParams = {}) => {
  try {
    // Check if token exists before making the request
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.status) queryParams.append('status', params.status);

    const queryString = queryParams.toString();
    const url = `/api/v1/meetings${queryString ? `?${queryString}` : ''}`;
    
    console.log("Fetching meetings from:", url);
    console.log("Using token:", token.substring(0, 20) + "...");
    
    const res = await axiosClient.get(url);
    console.log("Raw API response:", res.data);
    
    // Handle different response structures
    const responseData = res.data;
    
    // If response is directly an array
    if (Array.isArray(responseData)) {
      return {
        success: true,
        message: "Meetings fetched successfully",
        meetings: responseData
      } as GetMeetingsResponse;
    }
    
    // If response has meetings property
    if (responseData.meetings) {
      return {
        success: responseData.success !== false,
        message: responseData.message || "Meetings fetched successfully",
        meetings: responseData.meetings,
        pagination: responseData.pagination
      } as GetMeetingsResponse;
    }
    
    // If response has data property
    if (responseData.data) {
      return {
        success: responseData.success !== false,
        message: responseData.message || "Meetings fetched successfully",
        meetings: Array.isArray(responseData.data) ? responseData.data : [],
        pagination: responseData.pagination
      } as GetMeetingsResponse;
    }
    
    // Default fallback
    return {
      success: true,
      message: "Meetings fetched successfully",
      meetings: []
    } as GetMeetingsResponse;
    
  } catch (error: any) {
    console.error("Error fetching meetings:", error.response?.data || error.message);
    
    // Provide more specific error messages
    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Please log in again.');
    } else if (error.response?.status === 403) {
      throw new Error('Access denied. You do not have permission to view meetings.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch meetings');
    }
  }
};

// *** Get Upcoming Meetings ***
export const getUpcomingMeetings = async (limit: number = 5) => {
  try {
    const response = await getAllMeetings({ 
      limit,
      status: 'scheduled' // Only get scheduled meetings
    });
    return response;
  } catch (error: any) {
    console.error("Error fetching upcoming meetings:", error);
    throw error;
  }
};

// *** Get Single Meeting by ID ***
export const getMeetingById = async (id: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/meetings/${id}`);
    console.log("Meeting fetched successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching meeting:", error.response?.data || error.message);
    throw error;
  }
};

// *** Create Meeting ***
export const createMeeting = async (payload: Partial<MeetingResponse>) => {
  try {
    const res = await axiosClient.post("/api/v1/meetings", payload);
    console.log("Meeting created successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error creating meeting:", error.response?.data || error.message);
    throw error;
  }
};

// *** Update Meeting ***
export const updateMeeting = async (id: string, payload: Partial<MeetingResponse>) => {
  try {
    const res = await axiosClient.patch(`/api/v1/meetings/${id}`, payload);
    console.log("Meeting updated successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error updating meeting:", error.response?.data || error.message);
    throw error;
  }
};

// *** Delete Meeting ***
export const deleteMeeting = async (id: string) => {
  try {
    const res = await axiosClient.delete(`/api/v1/meetings/${id}`);
    console.log("Meeting deleted successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error deleting meeting:", error.response?.data || error.message);
    throw error;
  }
};
