// services/scheduleService.ts
import axiosClient from "@/lib/axiosclient";

export interface Schedule {
  id: string;
  assignTo: string;
  commodityType: string;
  assetGroup: string;
  scheduleMonth: string;
  transportMode: string;
  fileUrl: string;
}

export interface SchedulePagination {
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
  limit: number;
}

// Fetch schedules with pagination
export const getSchedules = async (page: number, limit: number) => {
  const res = await axiosClient.get("/api/v1/schedule", { params: { page, limit } });
  return res.data;
};

// Fetch schedules of the authenticated subscriber ("my" schedules)
export const getMySchedules = async (page: number, limit: number) => {
  const res = await axiosClient.get("/api/v1/schedule/my", { params: { page, limit } });
  return res.data;
};

// Search users by name/email
export const searchUsers = async (query: string, limit = 10) => {
  const res = await axiosClient.get("/api/v1/users/search", { params: { query, page: 1, limit } });
  return res.data.data;
};

// Upload schedulee
export const uploadSchedule = async (data: FormData) => {
  const res = await axiosClient.post("/api/v1/schedule", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteSchedule = async (id: string) => {
  const res = await axiosClient.delete(`/api/v1/schedule/delete/${id}`);
  return res.data;
};