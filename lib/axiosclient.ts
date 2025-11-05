import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";


// *** axios instance ***

const axiosClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.7.12:4001",
    headers: {
        "Content-Type": "application/json",
    },
});


// *** Request Interceptorrrrr ***
// before =============================================
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
  );


 

  // *** Response Interceptor ***

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error?.response || error.message);
        return Promise.reject(error);
    }  
);
 
export default axiosClient;