// services/authService.ts
import axiosClient from "@/lib/axiosclient";

export interface SendEmailOtpResponse {
  email: string;
}


export interface PermissionsData {
  emailAccess: boolean;
  phoneAccess: boolean;
  pushAccess: boolean;
}

export interface UpdatePermissionsResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    emailAccess: boolean;
    phoneAccess: boolean;
    pushAccess: boolean;
  };
}

//  User profile data interface
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar: string | null;
  companyName: string | null;
  jobTitle: string | null;
  phone: string | null;
  timezone: string | null;
  dateFormat: string | null;
  sessionTimeout: number;
  passwordExpiry: number | null;
  two_factor_authentication: number; // 0 = disabled, 1 = enabled
  secret: string | null;
  emailAccess: boolean;
  phoneAccess: boolean;
  pushAccess: boolean;
  active: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserData;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  timezone?: string;
  dateFormat?: string;
  companyName?: string;
  jobTitle?: string;
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

// disable 2FA
export const disable2FA = async ( ) => {
   const res=axiosClient.post("/api/v1/auth/2fa/disable");
   return res;
};

//  permissions 
export const updatePermissions = async (permissions: PermissionsData): Promise<UpdatePermissionsResponse> => {
  const res = await axiosClient.patch("/api/v1/auth/parmitions", permissions);
  return res.data;
};

// getUser
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  const res = await axiosClient.get("/api/v1/auth/me");
  return res.data;
};

// update user
export const updateProfile = async (profileData: UpdateProfileData): Promise<UserProfileResponse> => {
  const res = await axiosClient.patch("/api/v1/auth/update", profileData); // 
  return res.data;
};