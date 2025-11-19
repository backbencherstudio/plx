'use client'

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import MessageIcon from "@/public/setting-notification/icons/MessageIcon";
import MobileIcon from "@/public/setting-notification/icons/MobileIcon";
import { getUserProfile, PermissionsData, updatePermissions } from "@/services/AdminSettings";
import React, { useEffect, useState } from "react";

export default function Notification() {


   const [permissions, setPermissions] = useState<PermissionsData>({
    emailAccess: false,
    phoneAccess: false,
    pushAccess: false
  });


 


useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const userData = await getUserProfile();
      console.log(userData);
      
      // Set permissions from API response
      setPermissions({
        emailAccess: userData.data.emailAccess,
        phoneAccess: userData.data.phoneAccess,
        pushAccess: userData.data.pushAccess
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  fetchUserProfile();
}, []);


// const handlePermissionChange = async (permissionType: keyof PermissionsData, newValue: boolean) => {
//   try {
//     // Update local state immediately for better UX
//     setPermissions(prev => ({
//       ...prev,
//       [permissionType]: newValue
//     }));

//     // Call API to update permissions
//     const updatedPermissions = {
//       ...permissions,
//       [permissionType]: newValue
//     };

//     const response = await updatePermissions(updatedPermissions);
//     console.log("Permissions updated:", response);
    
//     // Show success message
//     alert("Notification settings updated successfully!");
    
//   } catch (error: any) {
//     console.error("Error updating permissions:", error);
    
    
//     setPermissions(prev => ({
//       ...prev,
//       [permissionType]: !newValue
//     }));

//     alert(
//       error.response?.data?.message ||
//         "Failed to update notification settings. Please try again."
//     );
//   }
// };


const handlePermissionChange = async (permissionType: keyof PermissionsData, newValue: boolean) => {
  try {
    
    setPermissions(prev => ({
      ...prev,
      [permissionType]: newValue
    }));

    // Call API to update permissions
    const updatedPermissions = {
      ...permissions,
      [permissionType]: newValue
    };

    console.log('Sending permissions update:', updatedPermissions);
    const response = await updatePermissions(updatedPermissions);
    console.log(" messageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:", response.message);
    
  } catch (error: any) {
    console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr:", error);
    
    //   local state on error
    setPermissions(prev => ({
      ...prev,
      [permissionType]: !newValue
    }));

 
  }
};

  return (
    <div>
      <div className=" bg-white p-6 rounded-[12px]">
        <h3 className="text-lg text-[#4A4C56] font-semibold mb-10">
          Notification Settings
        </h3>
        <div>
          <p className=" text-xs text-[#4A4C56] space-y-2">
            Notification Channels
          </p>
          <div className="bg-[#F5F8FA] px-4 py-1 rounded-2xl mt-1.5">
            {/* item one ===============================   Email =====================================*/}

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
                      h-6 w-[43px] 
                      [&>[data-slot=switch-thumb]]:h-5 
                      [&>[data-slot=switch-thumb]]:w-5 
                      [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-[20px]"
              />
            </div>

            {/* ==== item two ================ Phone access ======================== */}

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
                      h-6 w-[43px] 
                      [&>[data-slot=switch-thumb]]:h-5 
                      [&>[data-slot=switch-thumb]]:w-5 
                      [&>[data-slot=switch-thumb]]:data-[state=checked]:translate-x-[20px]"
              />
            </div>

            {/* ===================  item three ============== push access ========================== */}

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
