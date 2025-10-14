"use client";
import Image from "next/image";
import React, { useState } from "react";
import { adminLogin } from "../../services/authService";
import { useRouter } from "next/navigation";
import logo from "@/public/sidebar/images/logo.png";
import adminImg from "@/public/Admin-Login.png";
import EmailIcon from "@/public/commonIcons/EmailIcon";
import LockIcon from "@/public/commonIcons/LockIcon";
import Link from "next/link";

import { EyeOff, Eye } from "lucide-react";
import { ForgotPasswordUI } from "./_components/AdminForgotPassModals";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // handleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // }

  const handleAdminLogin = async () => {
    try {
      const res = await adminLogin({ email, password });
      console.log("Logged in admin", res);
      alert("succcessfully logged in ");
      // redirect after login
      router.push("/admin-dashboard");
    } catch (err: any) {
      console.error("Login failed", err.response?.data || err.message);
      alert("something wrong!");
    }
  };

  const handleBackToLogin = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className=" flex flex-col xl:flex-row items-center justify-center">
        <div className=" max-w-[570px] mx-4 xl:mx-auto flex-1 my-4">
          <Image src={logo} width={200} height={89} alt="logo" />
          <h1 className=" text-black text-[40px] font-medium mt-14">
            Welcome Admin!
          </h1>
          <p className=" text-base text-[#777980] mb-10">
            Enter your email and password to access your dashboard.
          </p>
          {/* email */}
          <div className="flex flex-col relative">
            <label htmlFor="email" className=" text-sm text-[#4A4C56] mb-[2px]">
              Email
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 placeholder:ml-3 w-full rounded-[10px] border border-[#E6E8EA]"
                type="email"
                id="email"
                placeholder="Enter Your Email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <EmailIcon />
              </div>
            </div>
          </div>
          {/* password */}
          <div className="flex flex-col relative mt-6">
            <label
              htmlFor="password"
              className=" text-sm text-[#4A4C56] mb-[2px]"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 placeholder:ml-3 w-full rounded-[10px] border border-[#E6E8EA]"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <LockIcon />
              </div>
            </div>
          </div>
          <p
            className=" text-end text-sm text-primary font-medium mt-2 cursor-pointer hover:underline"
            onClick={() => setShowForgotModal(true)}
          >
            Forgot Password?
          </p>

          <button
            onClick={handleAdminLogin}
            className=" hover:scale-105 active:scale-95 transition-all ease-in-out duration-300 w-full py-4 px-6 text-center bg-primary text-white mt-12 rounded-[8px] text-lg font-bold cursor-pointer"
          >
            Login
          </button>
        </div>
        <div className=" px-6 py-7  ">
          <Image src={adminImg} alt="admin img" width={750} height={893} />
        </div>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 z-40"></div>
      )}

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
    </>
  );
}
