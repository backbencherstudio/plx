import axiosClient from "../lib/axiosclient";

// *** Settings types ***
export interface AdminInfo {
  name: string;
  email: string;
  phone: string;
  accountType: string;
}

export interface AdminPreferences {
  timezone: string;
  dateFormat: string;
}

export interface SecuritySettings {
  sessionTimeout: number;
  passwordExpiry: number;
  twoFactorEnabled: boolean;
}

export interface SettingsResponse {
  success: boolean;
  message: string;
  data?: any;
}

// ========= Settings service =========

// *** Get Admin Information ***
export const getAdminInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const res = await axiosClient.get("/api/v1/settings/admin-info");
    console.log("Admin info fetched successfully:", res.data);
    return res.data as SettingsResponse;
  } catch (error: any) {
    console.error("Error fetching admin info:", error.response?.data || error.message);
    throw error;
  }
};

// *** Update Admin Information ***
export const updateAdminInfo = async (data: Partial<AdminInfo>) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const res = await axiosClient.patch("/api/v1/settings/admin-info", data);
    console.log("Admin info updated successfully:", res.data);
    return res.data as SettingsResponse;
  } catch (error: any) {
    console.error("Error updating admin info:", error.response?.data || error.message);
    throw error;
  }
};

// *** Update Admin Preferences ***
export const updateAdminPreferences = async (data: Partial<AdminPreferences>) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const res = await axiosClient.patch("/api/v1/settings/preferences", data);
    console.log("Admin preferences updated successfully:", res.data);
    return res.data as SettingsResponse;
  } catch (error: any) {
    console.error("Error updating admin preferences:", error.response?.data || error.message);
    throw error;
  }
};

// *** Get Security Settings ***
export const getSecuritySettings = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const res = await axiosClient.get("/api/v1/settings/security");
    console.log("Security settings fetched successfully:", res.data);
    return res.data as SettingsResponse;
  } catch (error: any) {
    console.error("Error fetching security settings:", error.response?.data || error.message);
    throw error;
  }
};

// *** Update Security Settings ***
export const updateSecuritySettings = async (data: Partial<SecuritySettings>) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const res = await axiosClient.patch("/api/v1/settings/security", data);
    console.log("Security settings updated successfully:", res.data);
    return res.data as SettingsResponse;
  } catch (error: any) {
    console.error("Error updating security settings:", error.response?.data || error.message);
    throw error;
  }
};

// *** Enable Two Factor Authentication ***
export const enableTwoFactor = async (otp: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const res = await axiosClient.post("/api/v1/settings/2fa/enable", { otp });
    console.log("Two factor authentication enabled successfully:", res.data);
    return res.data as SettingsResponse;
  } catch (error: any) {
    console.error("Error enabling two factor authentication:", error.response?.data || error.message);
    throw error;
  }
};

// *** Disable Two Factor Authentication ***
export const disableTwoFactor = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const res = await axiosClient.post("/api/v1/settings/2fa/disable");
    console.log("Two factor authentication disabled successfully:", res.data);
    return res.data as SettingsResponse;
  } catch (error: any) {
    console.error("Error disabling two factor authentication:", error.response?.data || error.message);
    throw error;
  }
};

// *** Send OTP for Two Factor Authentication ***
export const sendTwoFactorOTP = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const res = await axiosClient.post("/api/v1/settings/2fa/send-otp");
    console.log("OTP sent successfully:", res.data);
    return res.data as SettingsResponse;
  } catch (error: any) {
    console.error("Error sending OTP:", error.response?.data || error.message);
    throw error;
  }
};
