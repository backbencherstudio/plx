"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/sidebar/images/logo.png";
import sImg from "@/public/subscriber-login.png";
import googleImg from "@/public/google-login.png";
import EmailIcon from "@/public/commonIcons/EmailIcon";
import LockIcon from "@/public/commonIcons/LockIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  forgotPasswordSendOtp,
  googleLogin,
  resetPassword,
  subscriberLogin,
  verifyForgotPasswordOtp,
} from "@/services/authService";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { ForgotPasswordUI } from "../_components/AdminForgotPassModals";
import { EyeOff, Eye } from "lucide-react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "@/firebase.config";

export default function SubscriberLogin() {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    const email = result.user.email ?? "";
    const displayName = result.user.displayName ?? "";
    const photoURL = result.user.photoURL ?? "";

    // console.log(displayName);
    // console.log(photoURL);
    // console.log(email);

    try {
      if (result) {
        const res = await googleLogin(email, displayName, photoURL);
        const token= res?.data?.token
        console.log(res);
        localStorage.setItem('token',token);
        router.push('/s-dashboard')
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }
    try {
      setLoading(true);
      const res = await subscriberLogin({ email, password });
      if (res.success) {
        toast.success("Successfully logged in", {
          duration: 3000,
          iconTheme: {
            primary: "#123F93",
            secondary: "#FFFFFF",
          },
        });
        router.push("/s-dashboard");
      } else {
        toast.error(res.message || "Invalid credentials!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const closeAllModals = () => setShowForgotModal(false);

  return (
    <>
      <div className="flex flex-col xl:flex-row items-center justify-center bg-[#F5F8FA]">
        <div className="max-w-[570px] mx-4 xl:mx-auto flex-1 my-4">
          <Image src={logo} width={200} height={89} alt="logo" />
          <h1 className="text-black text-[40px] font-medium mt-14">
            Welcome to PLX!
          </h1>
          <p className="text-base text-[#777980] mb-10">
            Enter your email and password to access your dashboard.
          </p>

          {/* Email */}
          <div className="flex flex-col relative">
            <label htmlFor="email" className="text-sm text-[#4A4C56] mb-[2px]">
              Email
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <EmailIcon />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col relative mt-6">
            <label
              htmlFor="password"
              className="text-sm text-[#4A4C56] mb-[2px]"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <LockIcon />
              </div>
              <button
                className=" absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff color="#afafb5" strokeWidth={1.75} />
                ) : (
                  <Eye color="#afafb5" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>

          <p
            className="text-end text-sm text-primary font-medium mt-2 cursor-pointer hover:underline"
            onClick={() => setShowForgotModal(true)}
          >
            Forgot Password?
          </p>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`  active:opacity-60 cursor-pointer transition-all ease-in-out duration-300 w-full py-4 px-6 text-center ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
            } text-white mt-12 rounded-[8px] text-lg font-bold`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center pt-6 pb-[18px]">
            <div className="flex-1 h-px bg-[#D2D2D5]" />
            <span className="px-4 text-[#777980] text-xs font-medium">OR</span>
            <div className="flex-1 h-px bg-[#D2D2D5]" />
          </div>

          <button  onClick={handleGoogleLogin} className="w-full border border-[#E6E8EA] py-4 px-6 rounded-[8px] bg-white cursor-pointer flex justify-center items-center  active:opacity-60">
            <div
             
              className="flex justify-center items-center gap-6 cursor-pointer"
            >
              <Image src={googleImg} alt="google img" />
              <p>Continue with Google</p>
            </div>
          </button>

          <p className="text-sm text-[#4A4C56] text-center mt-8">
            Don't have an Account?{" "}
            <Link href="/sign-up" className="text-primary font-semibold ml-1">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="px-6 py-7">
          <Image src={sImg} alt="admin img" width={750} height={893} />
        </div>
      </div>

      {/* Overlay */}
      {showForgotModal && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeAllModals}
        ></div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-8 w-full max-w-[450px] mx-4">
            <ForgotPasswordUI
              email={email}
              setEmail={setEmail}
              setShowForgotModal={setShowForgotModal}
            />
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <Spinner className=" animate-spin-slow text-[#123F93]" size={50} />
        </div>
      )}
    </>
  );
}
