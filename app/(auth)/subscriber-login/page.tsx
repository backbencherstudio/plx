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
import {  forgotPasswordSendOtp, resetPassword, subscriberLogin, verifyForgotPasswordOtp } from "@/services/authService";

export default function SubscriberLogin() {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }
    try {
      setLoading(true);
      const res = await subscriberLogin({ email, password });
      if (res.success) {
        alert(res.message || "Login successful!");
        router.push("/s-dashboard");
      } else {
        alert(res.message || "Invalid credentials!");
      }
    } catch (error: any) {
      alert(error?.message || "Something went wrong!");
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
          <h1 className="text-black text-[40px] font-medium mt-14">Welcome to PLX!</h1>
          <p className="text-base text-[#777980] mb-10">
            Enter your email and password to access your dashboard.
          </p>

          {/* Email */}
          <div className="flex flex-col relative">
            <label htmlFor="email" className="text-sm text-[#4A4C56] mb-[2px]">Email</label>
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
            <label htmlFor="password" className="text-sm text-[#4A4C56] mb-[2px]">Password</label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="password"
                id="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <LockIcon />
              </div>
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
            className={`hover:scale-105 active:scale-95 transition-all ease-in-out duration-300 w-full py-4 px-6 text-center ${
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

          <div className="border border-[#E6E8EA] py-4 px-6 rounded-[8px] bg-white cursor-pointer">
            <div className="flex justify-center items-center gap-6">
              <Image src={googleImg} alt="google img" />
              <p>Continue with Google</p>
            </div>
          </div>

          <p className="text-sm text-[#4A4C56] text-center mt-8">
            Don't have an Account?{" "}
            <Link href="/sign-up" className="text-primary font-semibold ml-1">Sign Up</Link>
          </p>
        </div>

        <div className="px-6 py-7">
          <Image src={sImg} alt="admin img" width={750} height={893} />
        </div>
      </div>

      {/* Overlay */}
      {(showForgotModal || showSuccessModal) && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeAllModals}></div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-8 w-full max-w-[450px] mx-4">
            <ForgotPasswordUI
              email={email}
              setEmail={setEmail}
              setShowForgotModal={setShowForgotModal}
              setShowSuccessModal={setShowSuccessModal}
            />
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white rounded-[12px] p-6 w-full max-w-[350px] text-center font-medium">
            Password Reset Successful!
          </div>
        </div>
      )}
    </>
  );
}

// Forgot Password 3-step
function ForgotPasswordUI({ email, setEmail, setShowForgotModal, setShowSuccessModal }: any) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [forgotEmail,setForgotEmail]=useState("");
  const [password, setPassword] = useState("");


 const  handleForgot= async ()=>{
      
    try{
      const res = await  forgotPasswordSendOtp(forgotEmail);
      localStorage.setItem('forgot-email',forgotEmail);
      console.log(res);
      setStep(2);
      
    }catch{
      setStep(1)
      console.log('something wrong');
      
    }
     
  }

  const verifyForgot = async () => {
    const getForgotEmail = localStorage.getItem("forgot-email");
    const otpValue = otp.join("");

    if (!getForgotEmail || !otpValue) {
      alert("Please enter the OTP correctly!");
      return;
    }

    try {
      const res = verifyForgotPasswordOtp(getForgotEmail, otpValue);
      console.log(res);
      setStep(3);

    } catch {
      console.log('something wrong');
      
    }
  };
  
  const handleResetPassword = async () => {
    const getForgotEmail = localStorage.getItem("forgot-email");

    if (!getForgotEmail || !password) {
      alert("Please enter the OTP correctly!");
      return;
    }
    try {
      const res = resetPassword(getForgotEmail, password);
      console.log(res);
      setShowForgotModal(false);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    } catch {
      console.log('something wrong');
      
    }
  };

  
  // const handleReset = () => {
  //   setShowForgotModal(false);
  //   setShowSuccessModal(true);
  //   setTimeout(() => setShowSuccessModal(false), 4000);
  // };


  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
      return;
    }
    if (value.length > 1) return;
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < 3 && value) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <>
      {step === 1 && (
        <>
          <h2 className="text-2xl font-semibold text-black mb-2">
            Forgot Password
          </h2>
          <p className="text-[#777980] mb-6">
            Enter your email to receive an OTP
          </p>
          <div className="flex flex-col relative mb-6">
            <label className="text-sm text-[#4A4C56] mb-[2px]">Email</label>
            <div className="relative">
              <input
                type="email"
                className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA]"
                placeholder="Enter Your Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <EmailIcon />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 px-6 border border-gray-300 rounded"
              onClick={() => setShowForgotModal(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-3 px-6 bg-primary text-white rounded"
              onClick={handleForgot}
            >
              Send OTP
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-semibold text-black mb-2">Enter OTP</h2>
          <p className="text-[#777980] mb-6">
            Enter 4-digit OTP sent to your email
          </p>
          <div className="flex gap-2 mb-6 justify-center">
            {otp.map((val, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d$/.test(value)) {
                    // only 1 digit allow
                    const newOtp = [...otp];
                    newOtp[i] = value;
                    setOtp(newOtp);
                    if (i < 3) {
                      const nextInput = document.getElementById(`otp-${i + 1}`);
                      if (nextInput) nextInput.focus();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    e.preventDefault(); // prevent default behavior
                    const newOtp = [...otp];
                    newOtp[i] = "";
                    setOtp(newOtp);
                    if (i > 0) {
                      const prevInput = document.getElementById(`otp-${i - 1}`);
                      if (prevInput) prevInput.focus();
                    }
                  }
                }}
                className="w-12 h-12 text-center border border-[#E6E8EA] rounded"
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 px-6 border border-gray-300 rounded"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              className="flex-1 py-3 px-6 bg-primary text-white rounded"
              onClick={ verifyForgot}
            >
              Submit OTP
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <h2 className="text-2xl font-semibold text-black mb-2">
            Reset Password
          </h2>
          <p className="text-[#777980] mb-6">Enter new password</p>
          <div className="flex flex-col relative mb-6">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter new password"
                className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <LockIcon />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 px-6 border border-gray-300 rounded"
              onClick={() => setStep(2)}
            >
              Back
            </button>
            <button
              className="flex-1 py-3 px-6 bg-primary text-white rounded"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        </>
      )}
    </>
  );
}
