"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/sidebar/images/logo.png";
import sImg from "@/public/subscriber-login.png";
import googleImg from '@/public/google-login.png'
import EmailIcon from "@/public/commonIcons/EmailIcon";
import LockIcon from "@/public/commonIcons/LockIcon";
import Link from "next/link";

export default function SubscriberLogin() {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleForgotPassword = () => {
    setShowForgotModal(true);
  };

  const handleSendOtp = () => {
    setShowForgotModal(false);
    setShowOtpModal(true);
  };

  const handleOtpSubmit = () => {
    setShowOtpModal(false);
    setShowResetModal(true);
  };

  const handleResetPassword = () => {
    setShowResetModal(false);
    setShowSuccessModal(true);
  };

  const handleBackToLogin = () => {
    setShowSuccessModal(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp(["", "", "", "", "", ""]);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const closeAllModals = () => {
    setShowForgotModal(false);
    setShowOtpModal(false);
    setShowResetModal(false);
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className=" flex flex-col xl:flex-row items-center justify-center bg-[#F5F8FA]">
        <div className=" max-w-[570px] mx-4 xl:mx-auto flex-1 my-4">
          <Image src={logo} width={200} height={89} alt="logo" />
          <h1 className=" text-black text-[40px] font-medium mt-14">
            Welcome to PLX!
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
                className="py-4 px-5 pl-12 placeholder:ml-3 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="email"
                id="email"
                placeholder="Enter Your Email "
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
              className=" text-sm text-[#4A4C56] mb-[2px] "
            >
              Password
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 placeholder:ml-3 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="password"
                id="password"
                placeholder="Enter Your Password"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <LockIcon />
              </div>
            </div>
          </div>
          <p
            className=" text-end text-sm text-primary font-medium mt-2 cursor-pointer hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </p>
          <Link href="/s-dashboard">
            <button className=" hover:scale-105 active:scale-95 transition-all ease-in-out duration-300 w-full py-4 px-6 text-center bg-primary text-white mt-12 rounded-[8px] text-lg font-bold cursor-pointer">
              Login
            </button>
          </Link>
          <div className={`flex items-center pt-6 pb-[18px]`}>
            <div className="flex-1 h-px bg-[#D2D2D5]"></div>
            <span className="px-4 text-[#777980] text-xs font-medium"> OR</span>
            <div className="flex-1 h-px bg-[#D2D2D5]"></div>
          </div>
          <div className=" border border-[#E6E8EA] py-4 px-6 rounded-[8px] bg-white cursor-pointer">
            <div className=" flex justify-center items-center gap-6">
            <Image src={googleImg} alt="google img"/>
             <p>Continue with Google</p>
            </div>
          </div>
          <p className=" text-sm text-[#4A4C56] text-center mt-8">Don't have an Account? <Link href='#' className=" text-primary font-semibold ml-1">Sign Up</Link></p>
        </div>
        <div className=" px-6 py-7  ">
          <Image src={sImg} alt="admin img" width={750} height={893} />
        </div>
      </div>

      {/* Backdrop */}
      {(showForgotModal ||
        showOtpModal ||
        showResetModal ||
        showSuccessModal) && (
        <div
          className="fixed inset-0 bg-black/50   z-40"
          onClick={closeAllModals}
        ></div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-8 w-full max-w-[450px] mx-4">
            <h2 className="text-2xl font-semibold text-black mb-2">
              Forgot Password
            </h2>
            <p className="text-[#777980] mb-6">
              Enter your email address to receive an OTP
            </p>

            <div className="flex flex-col relative mb-6">
              <label
                htmlFor="forgot-email"
                className="text-sm text-[#4A4C56] mb-[2px]"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA]"
                  type="email"
                  id="forgot-email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <EmailIcon />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-[8px] font-medium"
                onClick={closeAllModals}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 px-6 bg-primary text-white rounded-[8px] font-medium"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-8 w-full max-w-[450px] mx-4">
            <h2 className="text-2xl font-semibold text-black mb-2">
              Check Your Email
            </h2>
            <p className="text-[#777980] mb-6">
              We've sent a 6-digit OTP to your email
            </p>

            <div className="flex gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl font-semibold border border-[#E6E8EA] rounded-[8px] focus:outline-none focus:border-primary"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-[8px] font-medium"
                onClick={closeAllModals}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 px-6 bg-primary text-white rounded-[8px] font-medium"
                onClick={handleOtpSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-8 w-full max-w-[450px] mx-4">
            <h2 className="text-2xl font-semibold text-black mb-2">
              Set New Password
            </h2>
            <p className="text-[#777980] mb-6">
              Create a new password for your account
            </p>

            <div className="flex flex-col relative mb-4">
              <label
                htmlFor="new-password"
                className="text-sm text-[#4A4C56] mb-[2px]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA]"
                  type="password"
                  id="new-password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <LockIcon />
                </div>
              </div>
            </div>

            <div className="flex flex-col relative mb-6">
              <label
                htmlFor="confirm-password"
                className="text-sm text-[#4A4C56] mb-[2px]"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA]"
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <LockIcon />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-[8px] font-medium"
                onClick={closeAllModals}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 px-6 bg-primary text-white rounded-[8px] font-medium"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-8 w-full max-w-[450px] mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-black mb-2">Success!</h2>
            <p className="text-[#777980] mb-6">
              You have successfully changed your password
            </p>

            <button
              className="w-full py-3 px-6 bg-primary text-white rounded-[8px] font-medium"
              onClick={handleBackToLogin}
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}
