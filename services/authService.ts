import axiosClient from "../lib/axiosclient";

// *** User type define ***

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    conformPassword: string;
   
}

export interface VerifyOtp {
    email: string;
    otp: string;                
}

export interface SubscriberLoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string; // 'admin' | 'user'
    };
}

export interface OtpPayload {
    email: string;
    otp: string;
}

// export interface ResetPasswwordPayload {
//     email: string;
//     newPassword: string;
//     confirmPassword: string;
// }

// ========= Auth service =========
// *** Admin Login ***

export const adminLogin = async (payload: LoginPayload) => {
    // Backend responds with: { success, message, data: { token, user } }
    const res = await axiosClient.post(
        "/api/v1/auth/admin/login",
        payload
    );
    const { token, user } = res.data.data;
    localStorage.setItem("token", res?.data?.token);
    return { token, user };
}

// *** User Login ***



// *** Signup Subscriber ***

export const signup = async (payload: SignupPayload) => {
    const res = await axiosClient.post("/api/v1/auth/register/sendotp", payload)
    console.log(res.data);
    return res.data
    
}
// *** Signup Subscriber otp verification ***

export const verifyOtp = async (payload: VerifyOtp) => {
    const res = await axiosClient.post("/api/v1/auth/register/verifyotp", payload)
    console.log(res.data);
    return res.data
    
}

// *** Subscriber login ***


export const subscriberLogin = async (payload: SubscriberLoginPayload) => {
  const res = await axiosClient.post("/api/v1/auth/user/login", payload);
 

  const { success, message, data, token } = res.data;

  if (success && token) {
    localStorage.setItem("token", token);
    return { success, message, user: data, token };
  } else {
    throw new Error(message || "Login failed");
  }
};

// *** Logout ***
export const logout = () => {
    localStorage.removeItem("token");
};