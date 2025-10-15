import axiosClient from "../lib/axiosclient";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

// *** Schedule types ***

export interface ScheduleUser {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
    companyName: string | null;
}

export interface Schedule {
    id: string;
    assignTo: string;
    commodityType: string;
    transportMode: string;
    scheduleFile: string;
    assetGroup: string;
    seduleMonth: string;
    createdAt: string;
    updatedAt: string;
    user: ScheduleUser;
}

export interface SchedulePagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface ScheduleResponse {
    success: boolean;
    message: string;
    data: Schedule[];  // <-- directly array
    pagination: SchedulePagination;
}

// *** User types ***

export interface User {
    id: number;
    name: string;
    email: string;
}

// *** User API calls ***

export const getUsers = async (): Promise<User[]> => {
    const res = await axiosClient.get<User[]>("/users");
    return res.data;
};

export const createUser = async (payload: Omit<User, "id">): Promise<User> => {
    const res = await axiosClient.post<User>("/users", payload);
    return res.data;
};

export const updateUser = async (
    id: number,
    payload: Partial<User>
): Promise<User> => {
    const res = await axiosClient.put<User>(`/users/${id}`, payload);
    return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axiosClient.delete(`/users/${id}`);
};

// *** Schedule API calls ***
 