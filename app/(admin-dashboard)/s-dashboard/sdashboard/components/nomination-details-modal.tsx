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
    connection: string;
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
        <div className="w-full px-6 md:px-10 pt-6 pb-8">
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  NOM ID
                </div>
                <div className="text-neutral-800 text-lg font-semibold font-['Roboto']">
                  {nomination.id}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  Commodity Type
                </div>
                <div className="text-neutral-800 text-lg font-semibold font-['Roboto']">
                  {nomination.commodity}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  Origin
                </div>
                <div className="text-neutral-800 text-lg font-semibold font-['Roboto']">
                  {nomination.origin}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  Transport Mode
                </div>
                <div className="text-neutral-800 text-lg font-semibold font-['Roboto']">
                  {nomination.transportMode}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  Beginning Date
                </div>
                <div className="text-neutral-800 text-lg font-semibold font-['Roboto']">
                  {nomination.beginningDate}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  Status
                </div>
                <div className="inline-flex">
                  <span className="px-3 py-1 bg-emerald-50 text-teal-800 text-sm font-medium font-['Roboto'] rounded-full">
                    {nomination.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  Volume
                </div>
                <div className="text-neutral-800 text-lg font-semibold font-['Roboto']">
                  {nomination.volume}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  Destination
                </div>
                <div className="text-neutral-800 text-lg font-semibold font-['Roboto']">
                  {nomination.destination}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  Connection
                </div>
                <div className="text-neutral-800 text-lg font-semibold font-['Roboto']">
                  {nomination.connection}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  Requested Date
                </div>
                <div className="text-neutral-800 text-lg font-semibold font-['Roboto']">
                  {nomination.requestedDate}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                  End Date
                </div>
                <div className="text-neutral-800 text-lg font-semibold font-['Roboto']">
                  {nomination.endDate}
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-2">
              <div className="text-zinc-500 text-sm font-medium font-['Roboto']">
                Notes
              </div>
              <div className="text-neutral-800 text-base font-medium font-['Roboto'] leading-relaxed">
                {nomination.notes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
