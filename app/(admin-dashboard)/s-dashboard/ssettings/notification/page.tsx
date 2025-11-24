"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import MessageIcon from "@/public/setting-notification/icons/MessageIcon";
import MobileIcon from "@/public/setting-notification/icons/MobileIcon";
import React, { useEffect, useState } from "react";
import { useSettingsContext } from "../_components/SettingsContext";
import { getUserProfile, updateNotificationPermissions, NotificationSettings } from "@/services/subscriberService";

export default function Notification() {
  const { setDirty, registerSubmit } = useSettingsContext();
  const [permissions, setPermissions] = useState<NotificationSettings>({
    emailAccess: false,
    phoneAccess: false,
    pushAccess: false
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial notification settings from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserProfile();
        console.log("User profile data:", userData);
        
        // Set permissions from API response
        if (userData.data) {
          setPermissions({
            emailAccess: userData.data.emailAccess ?? false,
            phoneAccess: userData.data.phoneAccess ?? false,
            pushAccess: userData.data.pushAccess ?? false
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Register submit handler for Save Changes button
  useEffect(() => {
    registerSubmit(async () => {
      try {
        console.log("Saving notification permissions:", permissions);
        const response = await updateNotificationPermissions(permissions);
        console.log("Notification permissions updated successfully:", response);
        setDirty(false);
      } catch (error: any) {
        console.error("Error updating notification permissions:", error);
        throw error; // Re-throw to let the SaveButton handle the error state
      }
    });
  }, [registerSubmit, permissions, setDirty]);

  const markDirty = () => setDirty(true);

  const handlePermissionChange = (permissionType: keyof NotificationSettings, newValue: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [permissionType]: newValue
    }));
    markDirty();
  };

  if (isLoading) {
    return (
      <div>
        <div className="bg-white p-6 rounded-[12px]">
          <h3 className="text-lg text-[#4A4C56] font-semibold mb-10">
            Notification Settings
          </h3>
          <div className="flex items-center justify-center py-8">
            <p className="text-[#4A4C56]">Loading notification settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=" bg-white p-6 rounded-[12px]">
        <h3 className="text-lg text-[#4A4C56] font-semibold mb-10">
          Notification Settings
        </h3>
        <div>
          <p className=" text-xs text-[#4A4C56] space-y-2">Notification Channels</p>
          <div className="bg-[#F5F8FA] px-4 py-1 rounded-2xl mt-1.5">
            {/* item one - Email Notifications */}
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
                      checked={permissions.emailAccess}
                      onCheckedChange={(checked) => handlePermissionChange('emailAccess', checked)}
                      className="
                      h-6 w-[43px] cursor-pointer
                      [&>[data-slot=switch-thumb]]:h-5 
                      [&>[data-slot=switch-thumb]]:w-5 
                      [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-[20px]"
                      />
              </div>

            {/* item two - SMS Notifications */}
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
                      checked={permissions.phoneAccess}
                      onCheckedChange={(checked) => handlePermissionChange('phoneAccess', checked)}
                      className="
                      h-6 w-[43px] cursor-pointer
                      [&>[data-slot=switch-thumb]]:h-5 
                      [&>[data-slot=switch-thumb]]:w-5 
                      [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-[20px]"
                      />
              </div>

            {/* item three - Push Notifications */}
              <div className="flex items-center space-x-2 justify-between py-4">
                <div className=" flex items-center gap-4">
                  <MessageIcon />
                  <Label
                    htmlFor="push-notifications"
                    className=" text-base text-[#4A4C56] font-medium"
                  >
                    Push Notifications
                  </Label>
                </div>
                 <Switch
                      id="push-notifications"
                      checked={permissions.pushAccess}
                      onCheckedChange={(checked) => handlePermissionChange('pushAccess', checked)}
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
