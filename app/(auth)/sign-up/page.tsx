"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/sidebar/images/logo.png";
import sImg from "@/public/subscriber-login.png";
import googleImg from "@/public/google-login.png";
import EmailIcon from "@/public/commonIcons/EmailIcon";
import PhoneIcon from "@/public/commonIcons/PhoneIcon";
import LockIcon from "@/public/commonIcons/LockIcon";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { signup } from "@/services/authService";
import { useRouter } from "next/navigation";
import OtpModal from "./comopnents/OtpModal";
import { set } from "date-fns";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
   const [showOtpModal, setShowOtpModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = async () => {
    console.log("Signup payload:", formData);
   
    try {
      const res = await signup(formData);

      if (formData.email) {
      localStorage.setItem("user_email", formData.email);
    }

      console.log("Signup success:", res);
      setShowOtpModal(true);
  
      // router.push("/subscriber-login");
    } catch (err: any) {
    
      console.log("Signup failed:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Signup failed. Please check your input and try again."
      );
    } 
  };

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center bg-[#F5F8FA]">
      <div className="max-w-[800px] mx-4 xl:mx-auto flex-1 py-4">
        <Image src={logo} width={200} height={89} alt="logo" />
        <h1 className="text-black text-[40px] font-medium mt-14">
          Welcome to PLX!
        </h1>
        <p className="text-base text-[#777980] mb-10">
          Sign up to access your dashboard
        </p>

        {/* Name fields */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full">
            <label htmlFor="firstName" className="text-sm text-[#4A4C56]">
              First name
            </label>
            <input
              className="py-4 px-5 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="text-sm text-[#4A4C56]">
              Last name
            </label>
            <input
              className="py-4 px-5 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email & Contact */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full">
            <label htmlFor="email" className="text-sm text-[#4A4C56]">
              Email
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <EmailIcon />
              </div>
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="contact" className="text-sm text-[#4A4C56]">
              Contact No.
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="text"
                id="contact"
                placeholder="Enter your contact number"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <PhoneIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Password fields */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full">
            <label htmlFor="password" className="text-sm text-[#4A4C56]">
              Password
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
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

          <div className="w-full">
            <label
              htmlFor="conformPassword"
              className="text-sm text-[#4A4C56]"
            >
              Re-enter Password
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type={showRePassword ? "text" : "password"}
                id="conformPassword"
                placeholder="Re-enter your password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowRePassword(!showRePassword)}
              >
                {showRePassword ? (
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
        </div>

        {/* Submit button */}
        <button
          onClick={handleRegister}
          className="hover:scale-105 active:scale-95 transition-all ease-in-out duration-300 w-full py-4 px-6 text-center bg-primary text-white mt-12 rounded-[8px] text-lg font-bold cursor-pointer"
        >
          Sign Up
        </button>

        <div className="flex items-center pt-6 pb-[18px]">
          <div className="flex-1 h-px bg-[#D2D2D5]"></div>
          <span className="px-4 text-[#777980] text-xs font-medium">OR</span>
          <div className="flex-1 h-px bg-[#D2D2D5]"></div>
        </div>

        <div className="border border-[#E6E8EA] py-4 px-6 rounded-[8px] bg-white cursor-pointer">
          <div className="flex justify-center items-center gap-6">
            <Image src={googleImg} alt="google img" />
            <p>Continue with Google</p>
          </div>
        </div>

        <p className="text-sm text-[#4A4C56] text-center mt-8">
          Already have an Account?
          <Link
            href="/subscriber-login"
            className="text-primary font-semibold ml-1"
          >
            Sign In
          </Link>
        </p>

         <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
      />
      </div>

      <div className="px-6 py-7">
        <Image src={sImg} alt="admin img" width={750} height={893} />
      </div>
    </div>
  );
}
