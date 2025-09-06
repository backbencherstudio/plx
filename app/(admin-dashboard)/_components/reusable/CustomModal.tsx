"use client";
import React from "react";
import BoxIcon from "@/public/admin-dashboard/icons/BoxIcon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NominationModal({ open, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* modal box */}
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-[550px] z-10 animate-fadeIn h-[95%] mx-6">
        <div className="border-b border-[#E9E9EA] p-10">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-8">
              <div className="bg-color11 p-2.5 rounded-lg">
                <BoxIcon />
              </div>
              <div>
                <h3 className="text-xl text-[#1D1F2C] font-medium">
                  Nomination Details
                </h3>
                <p className="text-base text-graytext">Jenny Wilson</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-14 pt-10 pb-14">
          <div className="flex justify-between">
            {/* left side */}
            <div className="space-y-10">
              <div className="space-y-2">
                <p className="text-base text-color6">NOM ID</p>
                <p className="text-lg text-[#1D1F2C] font-medium">#3583475</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Commodity Type</p>
                <p className="text-lg text-[#1D1F2C] font-medium">
                  Crude Oil - WTI
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Origin</p>
                <p className="text-lg text-[#1D1F2C] font-medium">
                  Houston, TX
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Transport Mode</p>
                <p className="text-lg text-[#1D1F2C] font-medium">Pipeline</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Beginning Date</p>
                <p className="text-lg text-[#1D1F2C] font-medium">1/20/2025</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Notes</p>
                <p className="text-lg text-[#1D1F2C] font-medium">
                  Urgent delivery required
                </p>
              </div>
            </div>

            {/* right side */}
            <div className="space-y-10">
              <div className="space-y-2">
                <p className="text-base text-color6">Status</p>
                <p className="text-lg text-color2 bg-color22 font-medium text-center py-1 px-4 rounded-full">
                  confirmed
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Volume</p>
                <p className="text-lg text-[#1D1F2C] font-medium">
                  10,000 bbls
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Destination</p>
                <p className="text-lg text-[#1D1F2C] font-medium">
                  Cushing, OK
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Requested Date</p>
                <p className="text-lg text-[#1D1F2C] font-medium">1/20/2025</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">End Date</p>
                <p className="text-lg text-[#1D1F2C] font-medium">1/20/2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
