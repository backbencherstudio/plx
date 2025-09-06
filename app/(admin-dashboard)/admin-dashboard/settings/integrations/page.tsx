import { Switch } from "@/components/ui/switch";
import React from "react";

export default function Integrations() {
  return (
    <div>
      <div className=" bg-white p-6 rounded-[12px]">
        <h3 className="text-lg text-[#4A4C56] font-semibold mb-10">
          Integrations Settings
        </h3>
        <div className=" p-4 bg-[#F9F9FB] flex justify-between items-center rounded-[12px]">
          <div>
            <h4 className=" text-base text-[#1D1F2C] font-semibold mb-2">Calendly</h4>
            <p className=" text-sm text-[#4A4C56]">Track with real-time appointment bookings and reminders.</p>
            <p className=" text-xs text-[#116557] bg-[#D3F4EF] mt-4 text-center inline-block py-2 px-4 rounded-full">connected</p>
          </div>

           
          <div className=" flex items-center gap-6">
            <div >
              <p className=" text-[#A5A5AB] py-2 px-4 border border-[#E6E8EA] rounded-full">Configure</p>
            </div>
            <Switch
              id="email-notification"
              defaultChecked
              className="
                      h-6 w-[43px] 
                      [&>[data-slot=switch-thumb]]:h-5 
                      [&>[data-slot=switch-thumb]]:w-5 
                      [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-[20px]"
            />
          </div>
        </div>
        <div className=" p-4 bg-[#F9F9FB] flex justify-between items-center rounded-[12px] mt-8">
          <div>
            <h4 className=" text-base text-[#1D1F2C] font-semibold mb-2">DataPark</h4>
            <p className=" text-sm text-[#4A4C56]">Track with real-time appointment bookings and reminders.</p>
            
          </div>

           
          <div className=" flex items-center gap-6">
            <div >
              <p className=" text-[#4A4C56] py-2 px-4 border border-[#D2D2D5] rounded-full">Configure</p>
            </div>
            <Switch
              id="email-notification"
              defaultChecked
              className="
                      h-6 w-[43px] 
                      [&>[data-slot=switch-thumb]]:h-5 
                      [&>[data-slot=switch-thumb]]:w-5 
                      [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-[20px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
