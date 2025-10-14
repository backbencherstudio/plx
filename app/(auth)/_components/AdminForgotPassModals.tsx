import { Spinner } from "@/components/ui/spinner";
import EmailIcon from "@/public/commonIcons/EmailIcon";
import LockIcon from "@/public/commonIcons/LockIcon";
import {
  forgotPasswordSendOtp,
  resetPassword,
  verifyForgotPasswordOtp,
} from "@/services/authService";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { EyeOff, Eye } from "lucide-react";

// Forgot Password 3-step
export function ForgotPasswordUI({
  email,
  setEmail,
  setShowForgotModal,
  setShowSuccessModal,
}: any) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [forgotEmail, setForgotEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleForgot = async () => {
    try {
      setLoading(true);
      const res = await forgotPasswordSendOtp(forgotEmail);
      localStorage.setItem("forgot-email", forgotEmail);
      toast.success(res.message, {
        duration: 5000,
        iconTheme: {
          primary: "#123F93",
          secondary: "#FFFFFF",
        },
      });
      setLoading(false);
      setStep(2);
    } catch (error: any) {
      setStep(1);
      setLoading(false);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
    }
  };

  const verifyForgot = async () => {
    const getForgotEmail = localStorage.getItem("forgot-email");
    const otpValue = otp.join("");

    if (!getForgotEmail || !otpValue) {
      toast.error("Please enter the OTP correctly!");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyForgotPasswordOtp(getForgotEmail, otpValue);
      console.log(res);

      setLoading(false);
      setStep(3);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      setLoading(false);
      toast.error(message);
    }
  };

  const handleResetPassword = async () => {
    const getForgotEmail = localStorage.getItem("forgot-email");

    if (!getForgotEmail || !password) {
      toast.error("Please enter the OTP correctly!");
      return;
    }
    try {
      setLoading(true);
      const res = await resetPassword(getForgotEmail, password);
      console.log(res.data.message);
      setShowForgotModal(false);
      setLoading(false);
      toast.success(res?.data?.message || "something went wrong", {
        duration: 5000,
        iconTheme: {
          primary: "#123F93",
          secondary: "#FFFFFF",
        },
      });
    } catch (error: any) {
      setLoading(false);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(message);
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
              onClick={verifyForgot}
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
                type={showPassword?"text":'password'}
                placeholder="Enter new password"
                className="py-4 px-5 pl-12 w-full rounded-[10px] border border-[#E6E8EA]"
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
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <Spinner className=" animate-spin-slow text-[#123F93]" size={50} />
        </div>
      )}
    </>
  );
}
