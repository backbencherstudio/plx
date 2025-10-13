"use client";
import React from "react";
import BoxIcon from "@/public/admin-dashboard/icons/BoxIcon";

interface NominationModalData {
  id: string;
  nominationId?: string;
  subscriber: string;
  company?: string;
  email: string;
  requestedDate: string;
  commodity: string;
  origin: string;
  destination: string;
  transport: string;
  beginDate: string;
  endDate: string;
  status: string;
  volume: string;
  unit?: string;
  notes: string;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  data?: NominationModalData | null;
}

export default function NominationModal({ open, onClose, data }: ModalProps) {
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
                <p className="text-base text-graytext">{data?.subscriber || "-"}</p>
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
                <p className="text-lg text-[#1D1F2C] font-medium">{data?.nominationId || data?.id || "-"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Commodity Type</p>
                <p className="text-lg text-[#1D1F2C] font-medium">{data?.commodity || "-"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Origin</p>
                <p className="text-lg text-[#1D1F2C] font-medium">{data?.origin || "-"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Transport Mode</p>
                <p className="text-lg text-[#1D1F2C] font-medium">{data?.transport || "-"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Beginning Date</p>
                <p className="text-lg text-[#1D1F2C] font-medium">{data?.beginDate || "-"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Notes</p>
                <p className="text-lg text-[#1D1F2C] font-medium">{data?.notes || "-"}</p>
              </div>
            </div>

            {/* right side */}
            <div className="space-y-10">
              <div className="space-y-2">
                <p className="text-base text-color6">Status</p>
                <p className="text-lg text-color2 bg-color22 font-medium text-center py-1 px-4 rounded-full">{data?.status || "-"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Volume</p>
                <p className="text-lg text-[#1D1F2C] font-medium">{data ? `${data.volume}${data.unit ? ` ${data.unit}` : ""}` : "-"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Destination</p>
                <p className="text-lg text-[#1D1F2C] font-medium">{data?.destination || "-"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">Requested Date</p>
                <p className="text-lg text-[#1D1F2C] font-medium">{data?.requestedDate || "-"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-base text-color6">End Date</p>
                <p className="text-lg text-[#1D1F2C] font-medium">{data?.endDate || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
