"use client";
import React, { useEffect, useState } from "react";
import UploadIcon from "@/public/schedule/icons/UploadIcon";
import DynamicTable from "../../_components/reusable/DynamicTable";
import { scheduleColumn } from "../../_components/columns/scheduleColumn";
import TransportPagination from "../../_components/reusable/TransportPagination";
import Footer from "../../_components/footer";

import {
  getSchedules,
  searchUsers,
  uploadSchedule,
  Schedule,
  SchedulePagination,
  deleteSchedule,
} from "@/services/scheduleService";

interface User {
  id: string;
  fullName: string;
  email: string;
}

export default function ScheduleList() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [pagination, setPagination] = useState<SchedulePagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  // Form states
  const [assignTo, setAssignTo] = useState("");
  const [assignToName, setAssignToName] = useState("");
  const [commodityType, setCommodityType] = useState("");
  const [assetGroup, setAssetGroup] = useState("");
  const [scheduleMonth, setScheduleMonth] = useState("");
  const [scheduleFile, setScheduleFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [transportMode, setTransportMode] = useState("");

  // User search suggestions
  const [userSuggestions, setUserSuggestions] = useState<User[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Fetch schedules
  const fetchSchedules = async (page = 1, limit = itemsPerPage) => {
    setLoading(true);
    try {
      const data = await getSchedules(page, limit);
      setSchedules(data.data as Schedule[]);
      setPagination(data.pagination as SchedulePagination);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleItemsPerPageChange = (value: string) => {
    const limit = parseInt(value);
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  // File input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setScheduleFile(e.target.files[0]);
  };

  // User search
  const handleUserSearch = (query: string) => {
    setAssignToName(query);
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(async () => {
      if (!query) {
        setUserSuggestions([]);
        return;
      }
      try {
        const users = await searchUsers(query);
        setUserSuggestions(users || []);
      } catch (err) {
        console.error("User search failed:", err);
        setUserSuggestions([]);
      }
    }, 300);

    setSearchTimeout(timeout);
  };

  // Upload schedule
  const handleUpload = async () => {
    if (!assignTo || !commodityType || !assetGroup || !scheduleMonth || !scheduleFile) {
      alert("Please fill all fields and select a file");
      return;
    }

    const formData = new FormData();
    formData.append("scheduleFile", scheduleFile);
    formData.append("assignTo", assignTo);
    formData.append("commodityType", commodityType);
    formData.append("assetGroup", assetGroup);
    formData.append("scheduleMonth", scheduleMonth);
    formData.append("transportMode", transportMode);

    setUploading(true);
    try {
      const res = await uploadSchedule(formData);
      alert(res.message || "Schedule uploaded successfully!");
      setAssignTo("");
      setAssignToName("");
      setCommodityType("");
      setAssetGroup("");
      setScheduleMonth("");
      setScheduleFile(null);
      setUserSuggestions([]);
      fetchSchedules(currentPage, itemsPerPage);
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(error.response?.data?.message || "Upload failed!");
    } finally {
      setUploading(false);
    }
  };


  const handleDeleteSchedule = async (id: string) => {
  if (!confirm("Are you sure you want to delete this schedule?")) return;

  try {
    const res = await deleteSchedule(id);
    alert(res.message || "Schedule deleted successfully!");
    fetchSchedules(currentPage, itemsPerPage); // refresh table
  } catch (error: any) {
    console.error("Delete failed:", error);
    alert(error.response?.data?.message || "Delete failed!");
  }
};

  useEffect(() => {
    fetchSchedules(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      <h1 className="text-[32px] font-medium text-[#1D1F2C] mb-10">Upload Schedule</h1>

      <div className="bg-white p-6 rounded-2xl mb-10">
        {/* Assign to */}
        <div className="mb-5 relative">
          <label className="text-base text-graytext font-medium">Assign to</label>
          <input
            type="text"
            value={assignToName}
            onChange={(e) => handleUserSearch(e.target.value)}
            placeholder="Search user by name or email..."
            className="border border-[#E6E6E6] py-3 px-5 rounded-[10px] w-full mt-2"
          />
          {userSuggestions.length > 0 && (
            <ul className="absolute bg-white border border-[#E6E6E6] w-full mt-1 rounded shadow z-10 max-h-52 overflow-auto">
              {userSuggestions.map((user) => (
                <li
                  key={user.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setAssignTo(user.id);
                    setAssignToName(user.fullName);
                    setUserSuggestions([]);
                  }}
                >
                  {user.fullName} ({user.email})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Asset Group & Commodity */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-5">
          <div className="flex flex-col w-full">
            <label className="text-[#4A4C56] text-sm mb-1.5">Asset Group</label>
            <input
              type="text"
              value={assetGroup}
              onChange={(e) => setAssetGroup(e.target.value)}
              placeholder="Enter business area"
              className="border border-[#E6E6E6] py-3 px-5 rounded-[10px]"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-[#4A4C56] text-sm mb-1.5">Commodity Type</label>
            <input
              type="text"
              value={commodityType}
              onChange={(e) => setCommodityType(e.target.value)}
              placeholder="Enter commodity type"
              className="border border-[#E6E6E6] py-3 px-5 rounded-[10px]"
            />
          </div>

          <div className="w-full">
            <label className="text-[#4A4C56] text-sm mb-1.5">Transport Mode</label>
            <select
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
              className="border border-[#E6E6E6] py-3 px-5 rounded-[10px] w-full"
            >
              <option value="">Transport Mode</option>
              {["Pipeline", "Trucking", "Railcar", "Marine"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="text-[#4A4C56] text-sm mb-1.5">Schedule Month</label>
            <select
              value={scheduleMonth}
              onChange={(e) => setScheduleMonth(e.target.value)}
              className="border border-[#E6E6E6] py-3 px-5 rounded-[10px] w-full"
            >
              <option value="">Select month</option>
              {[
                "January","February","March","April","May","June","July",
                "August","September","October","November","December"
              ].map((month) => (
                <option key={month} value={month.toLowerCase()}>{month}</option>
              ))}
            </select>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <h3 className="text-base text-graytext font-medium">Upload Schedule</h3>
          <div className="bg-[#F5F8FA] py-14 flex flex-col items-center justify-center rounded-xl mt-4 border-2 border-dashed border-[#B6C3DE]">
            <UploadIcon />
            <h2 className="text-base text-[#1D1F2C] font-semibold mt-4">
              Drop your file here or click to upload
            </h2>
            <label
              htmlFor="upload"
              className="cursor-pointer bg-primary text-white py-2 px-6 text-base font-medium rounded-lg mt-6"
            >
              Browse file
            </label>
            <input
              type="file"
              id="upload"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            {scheduleFile && <p className="mt-2 text-sm">{scheduleFile.name}</p>}
          </div>

          <div className="flex justify-end mt-8">
            <button
              className="border border-primary text-primary font-semibold py-2.5 px-16 rounded-lg cursor-pointer"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-10">
        <div className="px-6 py-5 flex items-center justify-between bg-white rounded-t-2xl border-x border-[#E7ECF4]">
          <h2 className="text-lg font-semibold text-graytext">Upload Details</h2>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <DynamicTable
            columns={scheduleColumn({onDelete:handleDeleteSchedule})}
            data={schedules}
            hasWrapperBorder
            wrapperBorderColor="#F3F3F3"
            headerStyles={{
              backgroundColor: "#F5F8FA",
              textColor: "#625F6E",
              fontSize: "12px",
              padding: "12px 16px",
              fontWeight: "600",
            }}
            cellBorderColor="#E7ECF4"
            roundedClass="rounded-b-none"
          />
        )}
      </div>

      <div className="flex justify-between bg-white rounded-b-2xl px-4 border-x border-[#F3F3F3] border-b">
        <TransportPagination
          currentPage={currentPage}
          totalPages={pagination?.totalPages || 1}
          hasNextPage={pagination?.hasNextPage || false}
          hasPrevPage={pagination?.hasPrevPage || false}
          onPageChange={handlePageChange}
          show={false}
        />

        <div className="flex items-center gap-4">
          <div className="text-[#44444A] text-sm font-medium">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, pagination?.totalItems || 0)} of{" "}
            {pagination?.totalItems || 0} entries
          </div>

          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            className="text-[#44444A] text-sm font-medium border rounded p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <Footer />
    </div>
  );
}
