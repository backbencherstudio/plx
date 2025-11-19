import axiosClient from "@/lib/axiosclient";

export interface ScheduleStatisticsData {
  day: number;
  schedules: number; // Changed from 'schedule' to 'schedules'
}

export interface ScheduleStatisticsResponse {
  data: ScheduleStatisticsData[];
  success: boolean;
  message?: string;
  year?: number;
  month?: string;
}
 



export const getCalculation = async ( ) => {
  const res = await axiosClient.get("/api/v1/dashboard/calculation");
  return res.data;
};

export const getScheduleStatistics = async (month: number): Promise<ScheduleStatisticsResponse> => {
  const res = await axiosClient.get<ScheduleStatisticsResponse>(`/api/v1/dashboard/schedule-statistics?month=${month}`);
  return res.data;
};