import axiosClient from "@/lib/axiosclient";

export interface ApiNotification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message?: string;
  eventId?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyNotificationsResponse {
  success: boolean;
  message: string;
  data: ApiNotification[];
  pagination?: any;
}

export const getMyNotifications = async (page = 1, limit = 10) => {
  const res = await axiosClient.get(`/api/v1/notification/my?page=${page}&limit=${limit}`);
  return res.data as GetMyNotificationsResponse;
};

export const markAllNotificationsRead = async () => {
  const res = await axiosClient.post(`/api/v1/notification/read-all`);
  return res.data as { success: boolean; message: string };
};

export const deleteSelectedNotifications = async (notificationIds: string[]) => {
  const res = await axiosClient.delete(`/api/v1/notification/delete-many`, {
    data: { notificationIds },
  });
  return res.data as { success: boolean; message: string };
};


