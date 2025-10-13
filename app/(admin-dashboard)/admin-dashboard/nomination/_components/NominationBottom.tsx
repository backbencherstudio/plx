import React, { useEffect, useMemo, useRef, useState } from "react";
import DynamicTable from "@/app/(admin-dashboard)/_components/reusable/DynamicTable";
import { nominationColumn } from "../../../_components/columns/NominationColumn";
import BoxIcon from "@/public/admin-dashboard/icons/BoxIcon";
import NominationModal from "@/app/(admin-dashboard)/_components/reusable/CustomModal";
import TransportPagination from "@/app/(admin-dashboard)/_components/reusable/TransportPagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import Footer from "@/app/(admin-dashboard)/_components/footer";
import { getAllNominations, NominationResponse, GetNominationsResponse } from "@/services/nominationService";

// Transform API data to match table structure
type TransformedNomination = {
  id: string;
  subscriber: string;
  company: string;
  email: string;
  requestedDate: string;
  commodity: string;
  origin: string;
  destination: string;
  transport: string;
  beginDate: string;
  endDate: string;
  status: string;
  statusCode: string;
  volume: string;
  notes: string;
};

export default function NominationBottom() {
  const [nominations, setNominations] = useState<TransformedNomination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
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
      subscriber: item.user.fullName,
      company: item.assetGroup || "N/A",
      email: item.user.email,
      requestedDate: new Date(item.requestedDate).toLocaleDateString(),
      commodity: item.commodityType,
      origin: item.origin,
      destination: item.destination,
      transport: item.transportMode,
      beginDate: new Date(item.beginningDate).toLocaleDateString(),
      endDate: new Date(item.endDate).toLocaleDateString(),
      status: item.status,
      statusCode: item.status.toUpperCase(),
      volume: item.volume,
      notes: item.notes,
    }));
  };

  // Fetch nominations from API
  const fetchNominations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: GetNominationsResponse = await getAllNominations({
        page: currentPage,
        limit: itemsPerPage,
        startDate: fromDate,
        endDate: toDate,
      });

      if (response.success) {
        const transformedData = transformNominationData(response.data);
        setNominations(transformedData);
        setTotalPages(response.pagination.totalPages);
        setTotalItems(response.pagination.totalItems);
      } else {
        setError("Failed to fetch nominations");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch nominations");
      console.error("Error fetching nominations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fetch data when component mounts or dependencies change
  useEffect(() => {
    fetchNominations();
  }, [currentPage, itemsPerPage, fromDate, toDate]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const columns = nominationColumn(handleOpenModal);
  // Refs for date inputs
  const fromDateRef = useRef<HTMLInputElement>(null);
  const toDateRef = useRef<HTMLInputElement>(null);

  // Handle calendar icon clicks
  const handleFromCalendarClick = () => {
    fromDateRef.current?.showPicker();
  };

  const handleToCalendarClick = () => {
    toDateRef.current?.showPicker();
  };

  // Handle date filter changes
  const handleDateFilterChange = () => {
    setCurrentPage(1); // Reset to first page when filtering
    fetchNominations();
  };

  // Update useEffect to handle date changes
  useEffect(() => {
    if (fromDate || toDate) {
      handleDateFilterChange();
    }
  }, [fromDate, toDate]);

  return (
    <div className=" mt-8">
      {/* nomination table */}
      <div>
        <div className="px-6 py-5 flex items-center justify-between bg-white rounded-t-2xl border-x border-[#E7ECF4]">
          <h2 className="text-lg font-semibold text-graytext">Nominations</h2>
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
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
                  ref={fromDateRef}
                />
                <Calendar
                  className="w-4 h-4 text-zinc-500 cursor-pointer"
                  onClick={handleFromCalendarClick}
                />
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
                  ref={toDateRef}
                />
                <Calendar
                  className="w-4 h-4 text-zinc-500 cursor-pointer"
                  onClick={handleToCalendarClick}
                />
              </div>
            </div>
          </div>
        </div>

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
            roundedClass="rounded-b-none"
          />
        )}
      </div>

      {/* ============================================ nomination pagination start ======================================= */}
      <div className=" flex justify-between bg-white rounded-b-2xl px-4 border-x border-[#F3F3F3] border-b">
        <div className=" ">
          <TransportPagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPageChange={handlePageChange}
            show={false}
          />
        </div>

        <div className=" flex items-center gap-4">
          <div className="text-[#44444A] text-sm font-medium">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)}{" "}
            of {totalItems} entries
          </div>

          <div className="">
            <Select
              value={`${itemsPerPage}`}
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value));
                setCurrentPage(1);
                // The useEffect will automatically fetch new data
              }}
            >
              <SelectTrigger className=" text-[#44444A] text-sm font-medium">
                <SelectValue className=" ">Show {itemsPerPage}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* ============================================ nomination pagination end ======================================= */}
      <Footer/>

      {openModal && (
        <NominationModal open={openModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}
