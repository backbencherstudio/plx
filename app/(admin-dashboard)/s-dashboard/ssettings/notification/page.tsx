"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import MessageIcon from "@/public/setting-notification/icons/MessageIcon";
import MobileIcon from "@/public/setting-notification/icons/MobileIcon";
import React, { useEffect, useState } from "react";
import { useSettingsContext } from "../_components/SettingsContext";

export default function Notification() {
  const { setDirty, registerSubmit } = useSettingsContext();
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);

  useEffect(() => {
    registerSubmit(async () => {
      // TODO: replace with API call
      // await saveNotificationSettings({ emailNotif, smsNotif, pushNotif })
      setDirty(false);
    });
  }, [registerSubmit, emailNotif, smsNotif, pushNotif, setDirty]);

  const markDirty = () => setDirty(true);

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
                      checked={emailNotif}
                      onCheckedChange={(v) => { setEmailNotif(!!v); markDirty(); }}
                      className="
                      h-6 w-[43px] cursor-pointer
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
                      id="sms-notifications"
                      checked={smsNotif}
                      onCheckedChange={(v) => { setSmsNotif(!!v); markDirty(); }}
                      className="
                      h-6 w-[43px] cursor-pointer
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
                      id="push-notifications"
                      checked={pushNotif}
                      onCheckedChange={(v) => { setPushNotif(!!v); markDirty(); }}
                      className="
                      h-6 w-[43px] cursor-pointer
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
