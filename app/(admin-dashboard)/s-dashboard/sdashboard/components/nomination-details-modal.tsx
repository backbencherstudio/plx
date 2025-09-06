"use client";

import { X, Package } from "lucide-react";

interface NominationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  nomination: {
    id: string;
    name: string;
    status: string;
    commodity: string;
    volume: string;
    origin: string;
    destination: string;
    transportMode: string;
    requestedDate: string;
    beginningDate: string;
    endDate: string;
    notes: string;
  };
}

export function NominationDetailsModal({
  isOpen,
  onClose,
  nomination,
}: NominationDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[550px] relative bg-white rounded-2xl flex flex-col justify-start items-start max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="w-6 h-6 absolute right-4 top-4 hover:bg-gray-100 rounded-full flex items-center justify-center z-10"
        >
          <X className="w-4 h-4 text-neutral-800" />
        </button>

        {/* Header */}
        <div className="p-6 md:p-10 flex justify-start items-center gap-4 md:gap-8 w-full">
          <div className="w-12 h-12 md:w-14 md:h-14 relative bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6 md:w-8 md:h-8 text-blue-900" />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 flex-1 min-w-0">
            <div className="text-neutral-800 text-lg md:text-xl font-medium font-['Roboto'] leading-7">
              Nomination Details
            </div>
            <div className="text-neutral-600 text-sm md:text-base font-normal font-['Roboto'] leading-tight truncate w-full">
              {nomination.name}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200"></div>

        {/* Content */}
        <div className="w-full px-6 md:px-14 pt-4 md:pt-6 pb-6 md:pb-14 flex flex-col justify-center items-start gap-4 md:gap-6">
          {/* First row */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8">
            <div className="w-full md:w-32 flex flex-col justify-start items-start md:items-end gap-4 md:gap-6">
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                  NOM ID
                </div>
                <div className="justify-start text-neutral-800 text-lg font-medium font-['Roboto'] leading-normal">
                  {nomination.id}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                  Commodity Type
                </div>
                <div className="justify-start text-neutral-800 text-lg font-medium font-['Roboto'] leading-normal">
                  {nomination.commodity}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                  Origin
                </div>
                <div className="justify-start text-neutral-800 text-lg font-medium font-['Roboto'] leading-normal">
                  {nomination.origin}
                </div>
              </div>
            </div>
            <div className="w-full md:w-28 flex flex-col justify-start items-start gap-4 md:gap-6">
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                  Status
                </div>
                <div className="w-24 h-8 p-1 bg-emerald-50 rounded-[999px] inline-flex justify-center items-center">
                  <div className="justify-start text-teal-800 text-sm font-medium font-['Roboto'] leading-tight">
                    {nomination.status}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                  Volume
                </div>
                <div className="justify-start text-neutral-800 text-lg font-medium font-['Roboto'] leading-normal">
                  {nomination.volume}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                  Destination
                </div>
                <div className="justify-start text-neutral-800 text-lg font-medium font-['Roboto'] leading-normal">
                  {nomination.destination}
                </div>
              </div>
            </div>
          </div>

          {/* Second section */}
          <div className="w-full flex flex-col justify-between items-start gap-4 md:gap-6">
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8">
              <div className="w-full md:w-28 flex flex-col justify-start items-start gap-4 md:gap-6">
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                    Transport Mode
                  </div>
                  <div className="justify-start text-neutral-800 text-lg font-medium font-['Roboto'] leading-normal">
                    {nomination.transportMode}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                    Beginning Date
                  </div>
                  <div className="justify-start text-neutral-800 text-lg font-medium font-['Roboto'] leading-normal">
                    {nomination.beginningDate}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-28 flex flex-col justify-start items-start gap-4 md:gap-6">
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                    Requested Date
                  </div>
                  <div className="justify-start text-neutral-800 text-lg font-medium font-['Roboto'] leading-normal">
                    {nomination.requestedDate}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2">
                  <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                    End Date
                  </div>
                  <div className="justify-start text-neutral-800 text-lg font-medium font-['Roboto'] leading-normal">
                    {nomination.endDate}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <div className="justify-start text-zinc-500 text-base font-normal font-['Roboto'] leading-tight">
                Notes
              </div>
              <div className="justify-start text-neutral-800 text-lg font-medium font-['Roboto'] leading-normal">
                {nomination.notes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
