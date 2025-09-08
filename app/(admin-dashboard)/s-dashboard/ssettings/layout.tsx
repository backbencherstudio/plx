"use client";

import SettingsSidebar from "./_components/SettingsSidebar";
import { SettingsProvider, useSettingsContext } from "./_components/SettingsContext";
import { useState } from "react";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

function SaveButton() {
  const { isDirty, triggerSave } = useSettingsContext();
  const [isSaving, setIsSaving] = useState(false);
  const [isSavedFlash, setIsSavedFlash] = useState(false);

  const handleClick = async () => {
    if (!isDirty || isSaving) return;
    setIsSaving(true);
    await triggerSave();
    setIsSaving(false);
    setIsSavedFlash(true);
    setTimeout(() => setIsSavedFlash(false), 1200);
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isDirty || isSaving}
      className={` text-base font-medium py-2 px-4 rounded-xl border transition-colors cursor-pointer ${
        !isDirty || isSaving
          ? "text-[#9AA0AA] border-[#D5DAE0] bg-white"
          : "text-primary border-primary hover:bg-[#E7ECF4]"
      } ${isSaving ? "opacity-70" : ""} ${isSavedFlash ? "bg-[#DCFCE7] border-[#A7F3D0] text-[#065F46]" : ""}`}
      aria-busy={isSaving}
      aria-disabled={!isDirty || isSaving}
      title={!isDirty ? "No changes to save" : isSaving ? "Saving..." : "Save Changes"}
    >
      {isSaving ? "Saving..." : isSavedFlash ? "Saved" : "Save Changes"}
    </button>
  );
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <SettingsProvider>
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
          <SaveButton />
        </div>
        <div className="flex  flex-col xl:flex-row  gap-6 ">
          <div className="">
            <SettingsSidebar />
          </div>
          <div className=" flex-1">{children}</div>
        </div>
      </div>
    </SettingsProvider>
  );
}
