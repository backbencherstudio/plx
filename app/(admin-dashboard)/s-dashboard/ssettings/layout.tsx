"use client";

import SettingsSidebar from "./_components/SettingsSidebar";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div>
      <div className=" mb-8 flex justify-between items-center">
        <div>
          <h1 className=" text-[32px] text-[#1D1F2C] font-semibold">
            Settings
          </h1>
          <p className=" text-base text-[#4A4C56] mt-2">
            Manage platform configuration and preferences
          </p>
        </div>
        <button className=" text-primary text-base font-medium border border-primary py-2 px-4 rounded-xl cursor-pointer">
          Save Changes
        </button>
      </div>
      <div className="flex  flex-col xl:flex-row  gap-6 ">
        <div className="">
          <SettingsSidebar />
        </div>
        <div className=" flex-1">{children}</div>
      </div>
    </div>
  );
}
