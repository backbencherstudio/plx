"use client";
import UploadIcon from "@/public/schedule/icons/UploadIcon";
import React, { useEffect, useState } from "react";
import DynamicTable from "../../_components/reusable/DynamicTable";
import { scheduleColumn } from "../../_components/columns/scheduleColumn";
import TransportPagination from "../../_components/reusable/TransportPagination";
import Footer from "../../_components/footer";
import axios from "axios";
import { Schedule, SchedulePagination } from "@/services/userService";

interface User {
  id: string;
  fullName: string;
  email: string;
}

export default function ScheduleList() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [assignTo, setAssignTo] = useState(""); // This will hold user ID for API
  const [assignToName, setAssignToName] = useState(""); // This is what user sees in input
  const [commodityType, setCommodityType] = useState("");
  const [assetGroup, setAssetGroup] = useState("");
  const [scheduleMonth, setScheduleMonth] = useState("");
  const [scheduleFile, setScheduleFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // User search suggestions
  const [userSuggestions, setUserSuggestions] = useState<User[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Fetch schedules from API (unchanged)
  const fetchSchedules = async (page = 1, limit = itemsPerPage) => {
    setLoading(true);
    try {
      const token =
        typeof window !== "undefined"
          ? authToken ?? localStorage.getItem("token")
          : authToken;
      if (!token) throw new Error("No auth token found");

      const res = await axios.get(
        `http://192.168.4.3:4001/api/v1/schedule`,
        {
          params: { page, limit },
          headers: { Authorization: token },
        }
      );

      const data = res.data.data as Schedule[];
      const pagination = res.data.pagination as SchedulePagination;

      setSchedules(data);
      setTotalPages(pagination.totalPages);
      setCurrentPage(pagination.currentPage);
      setHasNextPage(pagination.hasNextPage);
      setHasPrevPage(pagination.hasPrevPage);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    fetchSchedules(pageNumber, itemsPerPage);
  };

  const handleItemsPerPageChange = (value: string) => {
    const limit = parseInt(value);
    setItemsPerPage(limit);
    fetchSchedules(1, limit); // reset to first page
  };

  // File input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScheduleFile(e.target.files[0]);
    }
  };

  // Search users
  const handleUserSearch = (query: string) => {
    setAssignToName(query);
    if (searchTimeout) clearTimeout(searchTimeout);

    const timeout = setTimeout(async () => {
      if (!query) {
        setUserSuggestions([]);
        return;
      }
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
        const res = await axios.get(
          `http://192.168.4.3:4001/api/v1/users/search`,
          {
            params: { query, page: 1, limit: 10 },
            headers: { Authorization: token || "" },
          }
        );
        setUserSuggestions(res.data.data || []);
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
    formData.append("assignTo", assignTo); // send user ID
    formData.append("commodityType", commodityType);
    formData.append("seduleMonth", scheduleMonth); 
    formData.append("assetGroup", assetGroup);

    setUploading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
      const res = await axios.post(
        "http://192.168.4.3:4001/api/v1/schedule",
        formData,
        { headers: { Authorization: token || "", "Content-Type": "multipart/form-data" } }
      );

      alert(res.data.message || "Schedule uploaded successfully!");
      // Clear form
      setAssignTo("");
      setAssignToName("");
      setCommodityType("");
      setAssetGroup("");
      setScheduleMonth("");
      setScheduleFile(null);
      setUserSuggestions([]);

      // Refresh table
      fetchSchedules(currentPage, itemsPerPage);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSchedules(currentPage, itemsPerPage);
  }, []);

  return (
    <div>
      <h1 className="text-[32px] font-medium text-[#1D1F2C] mb-10">
        Upload Schedule
      </h1>

      <div className="bg-white p-6 rounded-2xl mb-10">
        {/* Assign to input */}
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
                    setAssignTo(user.id); // store ID for backend
                    setAssignToName(user.fullName); // display name
                    setUserSuggestions([]);
                  }}
                >
                  {user.fullName} ({user.email})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Asset Group */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-5">
          <div className="flex flex-col w-full">
            <label className="text-[#4A4C56] text-sm mb-1.5">Asset Group</label>
            <input
              type="text"
              value={assetGroup}
              onChange={(e) => setAssetGroup(e.target.value)}
              placeholder="Enter the name of business area"
              className="border border-[#E6E6E6] py-3 pr-4 pl-5 rounded-[10px]"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-[#4A4C56] text-sm mb-1.5">Commodity Type</label>
            <input
              type="text"
              value={commodityType}
              onChange={(e) => setCommodityType(e.target.value)}
              placeholder="Enter the commodity type"
              className="border border-[#E6E6E6] py-3 pr-4 pl-5 rounded-[10px]"
            />
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

        {/* Upload schedule */}
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

      {/* Table and pagination remain unchanged */}
      <div className="mt-10">
        <div className="px-6 py-5 flex items-center justify-between bg-white rounded-t-2xl border-x border-[#E7ECF4]">
          <h2 className="text-lg font-semibold text-graytext">Upload Details</h2>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <DynamicTable
            columns={scheduleColumn}
            data={schedules}
            hasWrapperBorder={true}
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
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onPageChange={handlePageChange}
          show={false}
        />

        <div className="flex items-center gap-4">
          <div className="text-[#44444A] text-sm font-medium">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {currentPage * itemsPerPage < schedules.length
              ? currentPage * itemsPerPage
              : schedules.length}{" "}
            of {schedules.length} entries
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
