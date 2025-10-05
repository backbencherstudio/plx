import axiosClient from "../lib/axiosclient";

// *** User type define ***

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    name: string;
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

export interface ResetPasswwordPayload {
    email: string;
    newPassword: string;
    confirmPassword: string;
}

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
    const res = await axiosClient.post("/auth/signup", payload)
    return res.data
}

// *** Logout ***
export const logout = () => {
    localStorage.removeItem("token");
};