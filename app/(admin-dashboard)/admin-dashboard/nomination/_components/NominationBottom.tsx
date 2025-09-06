import React, { useEffect, useState } from "react";
import DynamicTable from "@/app/(admin-dashboard)/_components/reusable/DynamicTable";
import { AdminData } from "../../../../lib/admindata";
import { nominationColumn } from "../../../_components/columns/NominationColumn";
import BoxIcon from "@/public/admin-dashboard/icons/BoxIcon";
import NominationModal from "@/app/(admin-dashboard)/_components/reusable/CustomModal";
import TransportPagination from "@/app/(admin-dashboard)/_components/reusable/TransportPagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Nomination = typeof AdminData.nominations[number];

export default function NominationBottom() {
  const { nominations } = AdminData;

    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState<Nomination[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
  
  
     const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
      useEffect(() => {
      let filteredData = nominations;
     // Calculate total pages
      const totalItems = filteredData.length;
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(calculatedTotalPages);
  
      // Ensure current page doesn't exceed total pages
      if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
        setCurrentPage(calculatedTotalPages);
      }
  
      // Get paginated data
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginated = filteredData.slice(startIndex, endIndex);
  
      setPaginatedData(paginated);
    }, [itemsPerPage, currentPage ]);
  

  
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const columns = nominationColumn(handleOpenModal);

  return (
    <div className=" mt-8">
      {/* nomination table */}
      <div>
        <div className="px-6 py-5 flex items-center justify-between bg-white rounded-t-2xl border-x border-[#E7ECF4]">
          <h2 className="text-lg font-semibold text-graytext">Nominations</h2>
          <button className="text-sm font-semibold text-primary border border-[#E7ECF4] py-2 px-6 rounded-lg cursor-pointer btn_box_shadow">
            View All
          </button>
        </div>

        <DynamicTable
          columns={columns}
          data={paginatedData}
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
      </div>
 
       {/* ============================================ nomination pagination start ======================================= */}
      <div className=" flex justify-between bg-white rounded-b-2xl px-4 border-x border-[#F3F3F3] border-b">
        <div className=" ">
          <TransportPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            show={false}
          />
        </div>

        <div className=" flex items-center gap-4">
          <div className="text-[#44444A] text-sm font-medium">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {currentPage * itemsPerPage < nominations.length
              ? currentPage * itemsPerPage
              : nominations.length}{" "}
            of {nominations.length} entries
          </div>

          <div className="">
            <Select
              value={`${itemsPerPage}`}
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value));
                setCurrentPage(1);
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

      {openModal && (
        <NominationModal open={openModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}
