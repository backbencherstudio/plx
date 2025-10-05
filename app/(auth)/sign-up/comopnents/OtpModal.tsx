"use client";
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { verifyOtp } from '../../../../services/authService';
import {useRouter} from "next/navigation";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OtpModal({ isOpen, onClose }: OtpModalProps) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router=useRouter()

  useEffect(() => {
    if (isOpen) {
      setOtp(["", "", "", ""]);
      setShowConfirmClose(false);
      setShowSuccessModal(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const fullOtp = otp.join("");
    const email = localStorage.getItem("user_email");

    if (!email) {
      alert("No email found. Please register again.");
      return;
    }

    if (fullOtp.length !== 4) {
      alert("Please enter 4 digits.");
      return;
    }

    try {
      const res = await verifyOtp({ email, otp: fullOtp });

      if (res.success) {
        setShowSuccessModal(true);
        // success এর পর 5 সেকেন্ড পরে modal বন্ধ করে parent onClose call করছি
        setTimeout(() => {
          setShowSuccessModal(false);
          onClose();
          router.push("/subscriber-login");
        }, 5000);
      } else {
        alert("OTP doesn't match!");
      }
    } catch (err) {
      alert("OTP doesn't match!");
    }
  };

  return (
    <>
      {/* OTP Modal: এটা শুধু তখনই দেখাবে যখন Confirm/Success modal off থাকবে */}
      {!showConfirmClose && !showSuccessModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md relative">
            <button
              onClick={() => setShowConfirmClose(true)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close OTP"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>
            <p className="text-center text-gray-500 mb-6">
              Please enter the 4-digit code sent to your email.
            </p>

            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}

      {/* Confirm Close Modal: এটা আসলে আলাদা overlay, OTP modal লুকানো থাকবে উপরের condition দ্বারা */}
      {showConfirmClose && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to close?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmClose(false)}
                className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={() => {
                  setShowConfirmClose(false);
                  onClose();
                }}
                className="px-5 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal: OTP সফল হলে শুধুই এইটা দেখা যাবে */}
      {showSuccessModal && (
         <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] p-8 w-full max-w-[450px] mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-black mb-2">Success!</h2>
            <p className="text-[#777980] mb-6">You have successfully changed your password</p>
            
            {/* <button 
              className="w-full py-3 px-6 bg-primary text-white rounded-[8px] font-medium"
             
            >
              Back to Login
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}
