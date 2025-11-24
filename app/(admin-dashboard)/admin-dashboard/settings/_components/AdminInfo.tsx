'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import EditIcon from "@/public/commonIcons/EditIcon";
import { getUserProfile, updateProfile, UserData, UpdateProfileData } from "@/services/AdminSettings";
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';

export default function AdminInfo() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
      setLoading(true);
      try {
        const response = await getUserProfile();
        
        setUserData(response.data);
        setFormData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          timezone: response.data.timezone || "UTC+00:00",
          dateFormat: response.data.dateFormat || "MM/DD/YYYY"
        });

     
      } catch (error: any) {
        console.error("Error fetching user profile:", error);
        toast.error(
          error.response?.data?.message || 
          'Failed to load profile. Please try again.'
        );
      } finally {
        setLoading(false);
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

  const handleSaveClick = () => {
    // Validate form before showing confirmation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSave = async () => {
    setLoading(true);
    setShowConfirmation(false);
    
    try {
      const updateData: UpdateProfileData = {
        firstName: formData.firstName.trim() || undefined,
        lastName: formData.lastName.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        timezone: formData.timezone || undefined,
        dateFormat: formData.dateFormat || undefined
      };

      const response = await updateProfile(updateData);
 
      setUserData(response.data);
      
      setFormData({
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        timezone: response.data.timezone || "UTC+00:00",
        dateFormat: response.data.dateFormat || "MM/DD/YYYY"
      });
      
      setIsEditing(false);
      
      // Success toast
         toast.success( response.message, {
       duration: 3000,  
       iconTheme: {
         primary: "#123F93",  
         secondary: "#FFFFFF", 
       },
     });
      
    } catch (error: any) {
      console.error("Error updating profile:", error);
      
      // Error toast with detailed message
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update profile. Please try again.';
      
      toast.error(errorMessage);
      
      // Revert form data on error
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
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSave = () => {
    setShowConfirmation(false);
    toast('Changes were not saved', {
      icon: 'ℹ️',
      duration: 3000,
    });
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
    toast('Editing cancelled', {
      icon: '↩️',
      duration: 3000,
    });
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex items-center gap-2">
          <Spinner className="animate-spin-slow text-[#123F93]" size={30} />
          <span className="text-gray-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-white rounded-[12px] p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-[#4A4C56] mb-2">
              Confirm Changes
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to save these changes to your profile?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelSave}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-[10px] text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-[10px] text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Yes, Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Information */}
      <div className="bg-white px-6 pt-6 pb-10 rounded-[12px]">
        {/* header */}
        <div className="flex items-center justify-between mb-7">
          <h3 className="text-lg text-[#4A4C56] font-semibold">
            Admin Information
          </h3>
          <button 
            className="flex items-center gap-2 cursor-pointer"
            onClick={isEditing ? handleSaveClick : handleEditToggle}
            disabled={loading}
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
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing || loading}
                placeholder="Enter first name"
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-xs text-[#4A4C56]">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing || loading}
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
                disabled={!isEditing || loading}
                placeholder="Enter phone number"
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveClick}
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded-[10px] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-[10px] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
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
              disabled={!isEditing || loading}
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
              disabled={!isEditing || loading}
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

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <Spinner className="animate-spin-slow text-[#123F93]" size={50} />
        </div>
      )}
    </div>
  );
}