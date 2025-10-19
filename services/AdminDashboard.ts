import axiosClient from "@/lib/axiosclient";




export const getCalculation = async ( ) => {
  const res = await axiosClient.get("/api/v1/dashboard/calculation");
  return res.data;
};
