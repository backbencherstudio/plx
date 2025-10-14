"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "./DynamicTable";
import { UpcomingMeetingColumn } from "../columns/UpcomingMettingColumn";
import { getAllMeetings, MeetingResponse, GetMeetingsResponse } from "@/services/meetingService";
import TransportPagination from "./TransportPagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

// Transform API data to match table structure
type TransformedMeeting = {
  id: string;
  user: string;
  companyName: string;
  email: string;
  requestDate: string;
  meetingDate: string;
  time: string;
  timeZone: string;
  duration: string;
  subject: string;
  status: string;
  typeCode: string;
};

interface MeetingTableProps {
  showFilters?: boolean;
  showPagination?: boolean;
  limit?: number;
  status?: string;
}

export default function MeetingTable({
  showFilters = true,
  showPagination = true,
  limit = 5,
  status = 'scheduled',
}: MeetingTableProps) {
  const [meetings, setMeetings] = useState<TransformedMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(limit);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // Transform API data to match table structure
  const transformMeetingData = (apiData: MeetingResponse[]): TransformedMeeting[] => {
    return apiData.map((item) => ({
      id: item.id,
      user: item.invitee_name || "Unknown",
      companyName: item.organizer_name || "N/A",
      email: item.invitee_email || "",
      requestDate: new Date(item.start_time).toLocaleDateString(),
      meetingDate: new Date(item.start_time).toLocaleDateString(),
      time: new Date(item.start_time).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      timeZone: "UTC", // Default timezone, can be enhanced later
      duration: item.duration ? `${item.duration} min` : "N/A",
      subject: item.event_name || "Meeting",
      status: item.status || "scheduled",
      typeCode: item.meeting_type?.toUpperCase() || "MEETING",
    }));
  };

  // Fetch meetings from API
  const fetchMeetings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params: any = {
        page: currentPage,
        limit: itemsPerPage,
        status: status,
      };
      
      if (fromDate) params.startDate = fromDate;
      if (toDate) params.endDate = toDate;

      const response: GetMeetingsResponse = await getAllMeetings(params);
      
      if (response.success && response.meetings) {
        const transformedData = transformMeetingData(response.meetings);
        setMeetings(transformedData);
        
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages);
          setTotalItems(response.pagination.totalItems);
        } else {
          // Fallback if no pagination info
          setTotalPages(1);
          setTotalItems(response.meetings.length);
        }
      } else {
        setError("Failed to fetch meetings");
      }
    } catch (err: any) {
      console.error("Error fetching meetings:", err);
      setError(err.message || "Failed to fetch meetings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [currentPage, itemsPerPage, fromDate, toDate, status]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDateFilterChange = () => {
    setCurrentPage(1); // Reset to first page when applying filters
    fetchMeetings();
  };

  return (
    <div>
      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-xs font-medium font-['Roboto'] leading-none">
                From
              </div>
              <div className="h-8 px-4 py-1.5 bg-slate-50 rounded-[10px] outline-1 outline-slate-200 flex justify-start items-center gap-6">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="justify-start text-Text-Secondary text-xs font-normal font-['Roboto'] leading-none bg-transparent border-none outline-none [&::-webkit-calendar-picker-indicator]:hidden"
                  placeholder="mm/dd/yyyy"
                />
                <Calendar className="w-4 h-4 text-zinc-500 cursor-pointer" />
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="justify-start text-Text-Secondary text-xs font-medium font-['Roboto'] leading-none">
                To
              </div>
              <div className="h-8 px-4 py-1.5 bg-slate-50 rounded-[10px] outline-1 outline-slate-200 flex justify-start items-center gap-6">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="justify-start text-Text-Secondary text-xs font-normal font-['Roboto'] leading-none bg-transparent border-none outline-none [&::-webkit-calendar-picker-indicator]:hidden"
                  placeholder="mm/dd/yyyy"
                />
                <Calendar className="w-4 h-4 text-zinc-500 cursor-pointer" />
              </div>
            </div>
            <button
              onClick={handleDateFilterChange}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading meetings...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-red-500">Error: {error}</div>
          </div>
        ) : (
          <DynamicTable
            columns={UpcomingMeetingColumn}
            data={meetings}
            hasWrapperBorder={true}
            wrapperBorderColor="#E7ECF4"
            headerStyles={{
              backgroundColor: "#F5F8FA",
              textColor: "#625F6E",
              fontSize: "14px",
              padding: "12px 16px",
              fontWeight: "500",
            }}
            cellBorderColor="#E7ECF4"
            roundedClass={showPagination ? "rounded-b-none" : "rounded-b-2xl"}
          />
        )}
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex justify-between bg-white rounded-b-2xl px-4 border border-[#F3F3F3] py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <TransportPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
}
