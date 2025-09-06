import React from 'react'
import { ArrowLeft, Download, FileText } from "lucide-react"
import { userData } from "@/app/lib/userdata"

interface DetailScheduleProps {
  onBack: () => void;
  scheduleId: string;
}

export default function DetailSchedule({ onBack, scheduleId }: DetailScheduleProps) {
  // Get schedule detail data from userdata
  const scheduleDetail = userData.schedulePage.schedulesTable.scheduleDetails[scheduleId as keyof typeof userData.schedulePage.schedulesTable.scheduleDetails]

  if (!scheduleDetail) {
    return (
      <div className="max-w-[1274px] w-full mx-auto">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-neutral-500 text-lg">Schedule not found</div>
            <button 
              onClick={onBack}
              className="mt-4 text-blue-900 text-base font-semibold underline"
            >
              Back To Schedules
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
    

<div className="max-w-[1274px] w-full mx-auto">
<div className="min-h-screen bg-gray-50 ">
      <div className="w-[1274px] mx-auto inline-flex flex-col justify-start items-start gap-8">
        {/* Back to Schedules Header */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-1 cursor-pointer" onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-blue-900" />
            <div className="justify-center text-blue-900 text-base font-semibold font-['Roboto'] underline leading-tight">
              Back To Schedules
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="w-[1274px] px-6 py-6 bg-white rounded-2xl flex flex-col justify-start items-start gap-6">
          {/* Header Section */}
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="inline-flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-start text-neutral-600 text-base font-semibold font-['Manrope'] leading-7">
                {scheduleDetail.file.name}
              </div>
              <div className="justify-start text-zinc-500 text-sm font-normal font-['Roboto'] leading-tight">
                {scheduleDetail.file.description}
              </div>
            </div>
            <div className="px-4 py-2 bg-blue-900 rounded-lg flex justify-start items-center gap-2">
              <Download className="w-6 h-6 text-white" />
              <div className="justify-start text-white text-base font-medium font-['roboto'] leading-relaxed">
                Download PDF
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            {/* File Preview Area */}
            <div className="self-stretch h-[741px] relative bg-slate-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-slate-300 overflow-hidden">
              <div className="w-56 left-[502px] top-[280px] absolute inline-flex flex-col justify-center items-center gap-6">
                <FileText className="w-24 h-28 text-slate-400" />
                {/* Preview Text */}
                <div className="self-stretch flex flex-col justify-center items-center gap-1">
                  <div className="justify-start text-zinc-500 text-lg font-medium font-['Roboto'] leading-normal">
                    File Preview
                  </div>
                  <div className="justify-start text-zinc-400 text-sm font-normal font-['Roboto'] leading-tight">
                    PDF files can be previewed here
                  </div>
                </div>
              </div>
            </div>

            {/* File Metadata */}
            <div className="w-[605px] inline-flex justify-between items-center">
              {/* Left Column */}
              <div className="w-44 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight">
                    Category:
                  </div>
                  <div className="justify-start text-neutral-600 text-base font-semibold font-['Manrope'] leading-7">
                    {scheduleDetail.category}
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight">
                    Upload Date:
                  </div>
                  <div className="justify-start text-neutral-600 text-base font-semibold font-['Manrope'] leading-7">
                    {scheduleDetail.uploadDate}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-28 inline-flex flex-col justify-center items-start gap-2">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight">
                    File Size:
                  </div>
                  <div className="justify-start text-neutral-600 text-base font-semibold font-['Manrope'] leading-7">
                    {scheduleDetail.file.fileSize}
                  </div>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight">
                    File Type:
                  </div>
                  <div className="justify-start text-neutral-600 text-base font-semibold font-['Manrope'] leading-7">
                    {scheduleDetail.fileType}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>



    </>
  )
}
