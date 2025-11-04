// services/authService.ts
import axiosClient from "@/lib/axiosclient";

export interface SendEmailOtpResponse {
  email: string;
}

// Send OTP to email for 2FA
export const send2FEmailOtp = async (email: string): Promise<SendEmailOtpResponse> => {
  const res = await axiosClient.post("/api/v1/auth/2fa/email/sendotp", { email });
  return res.data;
};


export const verify2Fotp = async (email: string, otp: string) => {
   const res=axiosClient.post("/api/v1/auth/2fa/email/verifyotp", { email, otp });
   return res;
};