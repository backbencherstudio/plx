import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import MessageIcon from "@/public/setting-notification/icons/MessageIcon";
import MobileIcon from "@/public/setting-notification/icons/MobileIcon";
import React from "react";

export default function Notification() {
  return (
    <div>
      <div className=" bg-white p-6 rounded-[12px]">
        <h3 className="text-lg text-[#4A4C56] font-semibold mb-10">
          Notification Settings
        </h3>
        <div>
          <p className=" text-xs text-[#4A4C56] space-y-2">Notification Channels</p>
          <div className="bg-[#F5F8FA] px-4 py-1 rounded-2xl mt-1.5">
            {/* item one */}
          
              <div className="flex items-center space-x-2 justify-between py-4">
                <div className=" flex items-center gap-4">
                  <MessageIcon />
                  <Label
                    htmlFor="email-notification"
                    className=" text-base text-[#4A4C56] font-medium"
                  >
                    Email Notifications
                  </Label>
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
         

            {/* item two */}

           
              <div className="flex items-center space-x-2 justify-between py-4">
                <div className=" flex items-center gap-4">
                  <MobileIcon />
                  <Label
                    htmlFor="sms-notifications"
                    className=" text-base text-[#4A4C56] font-medium"
                  >
                   SMS Notifications
                  </Label>
                </div>
                   <Switch
                      id="email-notification"
                      
                      className="
                      h-6 w-[43px] 
                      [&>[data-slot=switch-thumb]]:h-5 
                      [&>[data-slot=switch-thumb]]:w-5 
                      [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-[20px]"
                      />
              </div>
          

            {/* item three */}
        
              <div className="flex items-center space-x-2 justify-between py-4">
                <div className=" flex items-center gap-4">
                  <MessageIcon />
                  <Label
                    htmlFor="push Notifications"
                    className=" text-base text-[#4A4C56] font-medium"
                  >
                    Push Notifications
                  </Label>
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
    </div>
  );
}
