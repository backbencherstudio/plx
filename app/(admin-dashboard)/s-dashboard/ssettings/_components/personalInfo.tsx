import { PencilIcon, ChevronDownIcon } from "lucide-react"

export default function PersonalInfo() {
  return (
    <div className=" bg-gray-50">
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-6">
          {/* Personal Information Section */}
          <div className="px-6 pt-6 pb-10 bg-white rounded-xl flex flex-col gap-7">
            <div className="flex justify-between items-center">
              <h2 className="text-neutral-800 text-lg font-semibold font-sans leading-loose">Personal Information</h2>
              <div className="flex items-center gap-2">
                <PencilIcon className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 text-sm font-medium font-sans underline leading-relaxed">Edit</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-7">
              {/* First Row: First Name & Last Name */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">First Name</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <span className="text-neutral-600 text-sm font-medium font-sans leading-tight">Jenny</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Last Name</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <span className="text-neutral-600 text-sm font-medium font-sans leading-tight">Wilson</span>
                  </div>
                </div>
              </div>

              {/* Second Row: Email & Phone */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Email Address</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <span className="text-neutral-600 text-sm font-medium font-sans leading-tight">
                      jwnnywilson@gmail.com
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Phone No</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <span className="text-neutral-600 text-sm font-medium font-sans leading-tight">(704) 555-0127</span>
                  </div>
                </div>
              </div>

              {/* Third Row: Company & Job Title */}
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Company Name</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <span className="text-neutral-600 text-sm font-medium font-sans leading-tight">Binford Ltd.</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Job Title</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center">
                    <span className="text-neutral-600 text-sm font-medium font-sans leading-tight">
                      Logistics Manager
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="px-6 pt-6 pb-10 bg-white rounded-xl flex flex-col gap-7">
            <h2 className="text-neutral-800 text-lg font-semibold font-sans leading-loose">Preferences</h2>

            <div className="flex flex-col gap-7">
              <div className="flex gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Prefered Timezone</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center justify-between">
                    <span className="text-neutral-600 text-sm font-medium font-sans leading-tight">UTC + 7</span>
                    <ChevronDownIcon className="w-4 h-4 text-neutral-600" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-neutral-600 text-xs font-normal font-sans mb-1">Date Format</label>
                  <div className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center justify-between">
                    <span className="text-neutral-600 text-sm font-medium font-sans leading-tight">MM/DD/YYYY</span>
                    <ChevronDownIcon className="w-4 h-4 text-neutral-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
