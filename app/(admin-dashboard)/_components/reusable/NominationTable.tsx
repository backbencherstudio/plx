"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "./DynamicTable";
import { nominationColumn } from "../columns/NominationColumn";
import { getAllNominations, NominationResponse, GetNominationsResponse } from "@/services/nominationService";
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
type TransformedNomination = {
  id: string;
  nominationId?: string;
  subscriber: string;
  company: string;
  email: string;
  avatar?: string | null;
  requestedDate: string;
  rawRequestedDate?: string;
  commodity: string;
  origin: string;
  destination: string;
  transport: string;
  beginDate: string;
  rawBeginDate?: string;
  endDate: string;
  rawEndDate?: string;
  status: string;
  statusCode: string;
  volume: string;
  unit?: string;
  connection?: string;
  notes: string;
};

interface NominationTableProps {
  showFilters?: boolean;
  showPagination?: boolean;
  limit?: number;
  onDeleted?: () => void;
  handleOpenModal?: (row: any) => void;
}

export default function NominationTable({
  showFilters = true,
  showPagination = true,
  limit = 5,
  onDeleted,
  handleOpenModal = () => {},
}: NominationTableProps) {
  const [nominations, setNominations] = useState<TransformedNomination[]>([]);
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
  const transformNominationData = (apiData: NominationResponse[]): TransformedNomination[] => {
    return apiData.map((item) => ({
      id: item.id,
      nominationId: item.nominationId,
      subscriber: item.user.fullName,
      company: item.assetGroup || "N/A",
      email: item.user.email,
      avatar: item.user.avatar || null,
      requestedDate: new Date(item.requestedDate).toLocaleDateString(),
      rawRequestedDate: item.requestedDate,
      commodity: item.commodityType,
      origin: item.origin,
      destination: item.destination,
      transport: item.transportMode,
      beginDate: new Date(item.beginningDate).toLocaleDateString(),
      rawBeginDate: item.beginningDate,
      endDate: new Date(item.endDate).toLocaleDateString(),
      rawEndDate: item.endDate,
      status: item.status,
      statusCode: item.status.toUpperCase(),
      volume: item.volume,
      unit: item.unit,
      connection: item.connection,
      notes: item.notes,
    }));
  };

  // Fetch nominations from API
  const fetchNominations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params: any = {
        page: currentPage,
        limit: itemsPerPage,
      };
      
      if (fromDate) params.startDate = fromDate;
      if (toDate) params.endDate = toDate;

      const response: GetNominationsResponse = await getAllNominations(params);
      
      if (response.success && response.data) {
        const transformedData = transformNominationData(response.data);
        setNominations(transformedData);
        setTotalPages(response.pagination.totalPages);
        setTotalItems(response.pagination.totalItems);
      } else {
        setError("Failed to fetch nominations");
      }
    } catch (err: any) {
      console.error("Error fetching nominations:", err);
      setError(err.message || "Failed to fetch nominations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNominations();
  }, [currentPage, itemsPerPage, fromDate, toDate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDateFilterChange = () => {
    setCurrentPage(1); // Reset to first page when applying filters
    fetchNominations();
  };

  const columns = nominationColumn(handleOpenModal, onDeleted);

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
            <div className="text-gray-500">Loading nominations...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-red-500">Error: {error}</div>
          </div>
        ) : (
          <DynamicTable
            columns={columns}
            data={nominations}
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
