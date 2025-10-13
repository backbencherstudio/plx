import axiosClient from "../lib/axiosclient";

// *** Nomination types ***
export interface CreateNominationPayload {
  assetGroup: string;
  commodityType: string;
  volume: string;
  unit: string;
  origin: string;
  destination: string;
  transportMode: string;
  connection: string;
  beginningDate: string;
  endDate: string;
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

// ========= Nomination service =========

// *** Create Nomination ***
export const createNomination = async (payload: CreateNominationPayload) => {
  try {
    const res = await axiosClient.post("/api/v1/nomination/create", payload);
    console.log("Nomination created successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error creating nomination:", error.response?.data || error.message);
    throw error;
  }
};

// *** Get All My Nominations ***
export const getMyNominations = async (params: GetNominationsParams = {}) => {
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

    const queryString = queryParams.toString();
    const url = `/api/v1/nomination/my${queryString ? `?${queryString}` : ''}`;
    
    console.log("Fetching nominations from:", url);
    console.log("Using token:", token.substring(0, 20) + "...");
    
    const res = await axiosClient.get(url);
    console.log("Nominations fetched successfully:", res.data);
    return res.data as GetNominationsResponse;
  } catch (error: any) {
    console.error("Error fetching nominations:", error.response?.data || error.message);
    
    // Provide more specific error messages
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

// *** Get Single Nomination by ID ***
export const getNominationById = async (id: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/nomination/${id}`,
        {
            headers: {
                'Authorization': `{token}`
            }
        }
    );
    console.log("Nomination fetched successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching nomination:", error.response?.data || error.message);
    throw error;
  }
};

// *** Update Nomination ***
export const updateNomination = async (id: string, payload: Partial<CreateNominationPayload>) => {
  try {
    const res = await axiosClient.put(`/api/v1/nomination/${id}`, payload);
    console.log("Nomination updated successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error updating nomination:", error.response?.data || error.message);
    throw error;
  }
};

// *** Get All Nominations (Admin) ***
export const getAllNominations = async (params: GetNominationsParams = {}) => {
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

    const queryString = queryParams.toString();
    const url = `/api/v1/nomination/all${queryString ? `?${queryString}` : ''}`;
    
    console.log("Fetching all nominations from:", url);
    console.log("Using token:", token.substring(0, 20) + "...");
    
    const res = await axiosClient.get(url);
    console.log("All nominations fetched successfully:", res.data);
    return res.data as GetNominationsResponse;
  } catch (error: any) {
    console.error("Error fetching all nominations:", error.response?.data || error.message);
    
    // Provide more specific error messages
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

// *** Delete Nomination ***
export const deleteNomination = async (id: string) => {
  try {
    const res = await axiosClient.delete(`/api/v1/nomination/${id}`);
    console.log("Nomination deleted successfully:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error deleting nomination:", error.response?.data || error.message);
    throw error;
  }
};
