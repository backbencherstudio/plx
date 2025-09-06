"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MessageIcon from "@/public/security/MessageIcon";
import Link from "next/link";

export default function TwoFactorSwitch() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showOffConfirmModal, setShowOffConfirmModal] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSwitchClick = () => {
    if (!isSwitchOn) {
      // switch currently OFF → show OTP flow
      setShowInfoModal(true);
    } else {
      // switch currently ON → show OFF confirmation
      setShowOffConfirmModal(true);
    }
  };

  const handleContinue = () => {
    setShowInfoModal(false);
    setShowOtpModal(true);
  };

  const handleOtpConfirm = () => {
    if (otp.length === 6) {
      setIsSwitchOn(true);
      setShowOtpModal(false);
      setOtp("");
    } else {
      alert("Enter valid OTP");
    }
  };

  const handleOffConfirm = () => {
    setIsSwitchOn(false);
    setShowOffConfirmModal(false);
  };

  return (
    <div>
      <div className=" bg-white p-6 rounded-[12px]">
        <h3 className="text-lg text-[#4A4C56] font-semibold mb-10">
          Security Settings
        </h3>
        <div className=" flex items-center gap-6">
          <div className="flex flex-col flex-1">
            <label htmlFor="session" className="text-xs text-[#4A4C56]">
              Session Timeout (minutes)
            </label>
            <input
              type="text"
              id="session"
              placeholder="30"
              className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="expiry" className="text-xs text-[#4A4C56]">
              Password Expiry (days)
            </label>
            <input
              type="text"
              id="expiry"
              placeholder="500"
              className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {/* Switch */}
          <div className=" flex justify-between items-center bg-[#F9F9FB] mt-10 px-4 py-6 rounded-[12px]">
            <div>
              <h4 className=" text-base text-[#1D1F2C] font-medium">
                Two-Factor Authentication
              </h4>
              <p className=" text-sm text-[#777980] mt-2">
                Add an extra layer of security to your account
              </p>
            </div>

            <Switch
              checked={isSwitchOn}
              onClick={handleSwitchClick}
              className="h-6 w-[44px] [&>[data-slot=switch-thumb]]:h-5 [&>[data-slot=switch-thumb]]:w-5 [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-[20px] cursor-pointer"
            />
          </div>
          {/*  otp intro modal */}
          <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
            <DialogContent
              className=" [&>button]:hidden"
              style={{ width: "600px", maxWidth: "90vw", padding: "40px" }}
            >
              <DialogHeader>
                <DialogTitle>
                  Protect your account by enabling Two-Factor Authentication
                </DialogTitle>
              </DialogHeader>

              <p className=" text-sm text-[#777980] ">
                Choose how you want to receive your authentication codes.
              </p>

              <div className=" bg-[#F5F8FA] p-4 rounded-[12px] flex items-center gap-6">
                <MessageIcon />
                <div>
                  <h3 className=" text-lg text-[#4A4C56] font-medium">
                    Set up using Email
                  </h3>
                  <p className=" text-sm text-[#777980] font-medium">
                    We will send you the 2FA code on your email at new login.
                  </p>
                </div>
              </div>

              <DialogFooter className="mt-6 flex justify-end gap-3">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className=" border-none bg-[#F5F8FA] cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button className=" cursor-pointer" onClick={handleContinue}>
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* OTP Modal */}
          <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
            <DialogContent className="w-full  lg:max-w-[510px] p-10 sm:p-6 xs:p-4">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold lg:text-lg md:text-base sm:text-sm xs:text-sm">
                  Enter Security Code
                </DialogTitle>
              </DialogHeader>

              <p className="text-sm text-[#777980] mt-2 lg:text-sm md:text-xs sm:text-xs xs:text-xs">
                Enter the 6-digit code sent in your email.
              </p>

              <div className="flex justify-center mt-4 gap-3 flex-nowrap">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      if (!val) return;
                      const newOtp = otp.split("");
                      newOtp[index] = val;
                      setOtp(newOtp.join(""));

                      if (index < 5) {
                        const next = document.getElementById(
                          `otp-${index + 1}`
                        );
                        next?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        const newOtp = otp.split("");
                        newOtp[index] = "";
                        setOtp(newOtp.join(""));

                        if (index > 0 && !otp[index]) {
                          const prev = document.getElementById(
                            `otp-${index - 1}`
                          );
                          prev?.focus();
                        }
                      }
                    }}
                    id={`otp-${index}`}
                    className="w-4 h-[40px]  bg-[#EDF2F7] text-center rounded-xl text-lg  lg:text-lg md:w-12 md:h-14 md:text-base sm:w-10 sm:h-12 sm:text-base xs:w-8 xs:h-10 xs:text-sm"
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-base text-[#4A4C56] mt-4 lg:text-base md:text-sm sm:text-sm xs:text-xs">
                <input type="checkbox" name="" id="remember" />
                <label htmlFor="remember">Remember this device</label>
              </div>

              <button
                className="text-center mt-10 text-sm text-[#4A4C56] py-3 bg-[#EDF2F7] rounded-[8px]   cursor-pointer  "
                onClick={handleOtpConfirm}
              >
                Continue
              </button>

              <p className="text-center mt-6 text-[#777980] text-sm lg:text-sm md:text-xs sm:mt-4 sm:text-xs xs:text-xs">
                Didn’t get the code?{" "}
                <Link href="#" className="text-primary font-medium underline">
                  Resend the code
                </Link>
              </p>
            </DialogContent>
          </Dialog>

          {/* Switch OFF Confirmation Modal */}
          <Dialog
            open={showOffConfirmModal}
            onOpenChange={setShowOffConfirmModal}
          >
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Disable Two Factor Authentication</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-neutral-600 mt-2">
                Are you sure you want to turn off Two Factor Authentication?
              </p>
              <DialogFooter className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowOffConfirmModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleOffConfirm}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
