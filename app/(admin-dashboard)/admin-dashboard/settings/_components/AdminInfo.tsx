'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditIcon from "@/public/commonIcons/EditIcon";
import { getUserProfile, updateProfile, UserData, UpdateProfileData } from "@/services/AdminSettings";
import React, { useEffect, useState } from "react";

export default function AdminInfo() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    timezone: "",
    dateFormat: ""
  });

  // Timezone options
  const timezoneOptions = [
    "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00", 
    "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC-01:00",
    "UTC+00:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00",
    "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"
  ];

  // Date format options
  const dateFormatOptions = [
    "MM/DD/YYYY",
    "DD/MM/YYYY", 
    "YYYY-MM-DD",
    "MM-DD-YYYY",
    "DD-MM-YYYY",
    "YYYY/MM/DD"
  ];

  // Fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        console.log(response);
        
        setUserData(response.data);
        setFormData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          timezone: response.data.timezone || "UTC+00:00",
          dateFormat: response.data.dateFormat || "MM/DD/YYYY"
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Prepare the data for the API call
      const updateData: UpdateProfileData = {
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        phone: formData.phone || undefined,
        timezone: formData.timezone || undefined,
        dateFormat: formData.dateFormat || undefined
      };

      // Call the update profile API
      const response = await updateProfile(updateData);

      console.log("Profile updated successfully:", response);
      
      // Update local user data with the response
      setUserData(response.data);
      
      // Update form data with the new values
      setFormData({
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        timezone: response.data.timezone || "UTC+00:00",
        dateFormat: response.data.dateFormat || "MM/DD/YYYY"
      });
      
      // Show success message
      alert("Profile updated successfully!");
      
      setIsEditing(false);
      
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  };

  const handleCancel = () => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        timezone: userData.timezone || "UTC+00:00",
        dateFormat: userData.dateFormat || "MM/DD/YYYY"
      });
    }
    setIsEditing(false);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Admin Information */}
      <div className="bg-white px-6 pt-6 pb-10 rounded-[12px]">
        {/* header */}
        <div className="flex items-center justify-between mb-7">
          <h3 className="text-lg text-[#4A4C56] font-semibold">
            Admin Information
          </h3>
          <button 
            className="flex items-center gap-2 cursor-pointer"
            onClick={isEditing ? handleSave : handleEditToggle}
          >
            <EditIcon />
            <p className="text-primary text-xs font-medium underline">
              {isEditing ? "Save" : "Edit"}
            </p>
          </button>
        </div>

        {/* form */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* left (flex-2) */}
          <div className="flex-2 space-y-7">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-xs text-[#4A4C56]">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter first name"
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-xs text-[#4A4C56]">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter last name"
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-xs text-[#4A4C56]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={true} // Email should not be editable
                placeholder="Enter email address"
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* right (flex-1) */}
          <div className="flex-1 space-y-7">
            <div className="flex flex-col">
              <label htmlFor="accountType" className="text-xs text-[#4A4C56]">
                Account Type
              </label>
              <input
                type="text"
                disabled
                id="accountType"
                value={userData.type || "Admin"}
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] text-xs text-[#A5A5AB] font-medium mt-1.5 cursor-not-allowed bg-gray-50"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="text-xs text-[#4A4C56]">
                Phone No
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter phone number"
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-white rounded-[10px] text-sm font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-[10px] text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preference */}
      <div className="bg-white px-6 pt-6 pb-10 rounded-[12px] mt-6">
        <h3 className="text-lg text-[#4A4C56] font-semibold mb-7">Preference</h3>
        <div className="flex flex-col md:flex-row gap-6">
          {/* left - Timezone */}
          <div className="flex-1">
            <p className="text-xs text-graytext mb-2">Preferred Timezone</p>
            <Select 
              value={formData.timezone} 
              onValueChange={(value) => handleInputChange("timezone", value)}
              disabled={!isEditing}
            >
              <SelectTrigger className={`w-full py-6 shadow-none ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {timezoneOptions.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* right - Date Format */}
          <div className="flex-1">
            <p className="text-xs text-graytext mb-2">Date Format</p>
            <Select 
              value={formData.dateFormat} 
              onValueChange={(value) => handleInputChange("dateFormat", value)}
              disabled={!isEditing}
            >
              <SelectTrigger className={`w-full py-6 shadow-none ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}>
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dateFormatOptions.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}