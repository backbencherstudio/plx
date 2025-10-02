"use client";
import UploadIcon from "@/public/schedule/icons/UploadIcon";
import React, { useEffect, useState } from "react";
import DynamicTable from "../../_components/reusable/DynamicTable";
import { scheduleColumn } from "../../_components/columns/scheduleColumn";
import { AdminData } from "../../../lib/admindata";
 
import TransportPagination from "../../_components/reusable/TransportPagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "../../_components/footer";

type Schedule = typeof AdminData.schedules[number];

export default function Schedule() {
  const { schedules } = AdminData;

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<Schedule[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);


   const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

    useEffect(() => {
    let filteredData = schedules;
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

  return (
    <div>
      <h1 className=" text-[32px] font-medium text-[#1D1F2C] mb-10">
        Upload Schedule
      </h1>

      <div className=" bg-white p-6 rounded-2xl">
        {/* assign input */}
        <div className=" mb-5">
          <h3 className=" text-base text-graytext font-medium">Assign to</h3>

          <Select>
            <SelectTrigger className="w-full py-5 shadow-none">
              <SelectValue
                placeholder="Search by name or email..."
                className=" text-graytext text-sm"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="sarah chen">Sarah Chen</SelectItem>
                <SelectItem value="esther howard">Esther Howard</SelectItem>
                <SelectItem value="brooklyn simmons">
                  Brooklyn Simmons
                </SelectItem>
                <SelectItem value="leslie alexander">
                  Leslie Alexander
                </SelectItem>
                <SelectItem value="jenny wilson">Jenny Wilson</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
   
             {/*  3 more input */}
        <div className=" flex flex-col lg:flex-row lg:items-center gap-6 mb-5">
          {/* no. 1....... */}
          <div className=" flex flex-col w-full">
            <label htmlFor="asset" className=" text-[#4A4C56] text-sm mb-1.5">Asset Group</label>
            <input type="text" name="" id="asset" className=" border border-[#E6E6E6] py-3 pr-4 pl-5 rounded-[10px]" placeholder="Enter the name of business area" />
          </div>
            {/* no. 2....... */}
         <div className=" flex flex-col w-full">
          <label htmlFor="commodity" className=" text-[#4A4C56] text-sm mb-1.5">Commodity Type</label>
          <input type="text" name="" id="commodity" className=" border border-[#E6E6E6] py-3 pr-4 pl-5 rounded-[10px]" placeholder="Enter the commodity type" />

         </div>
         {/* no. 3......... */}
         <div className=" w-full">
          <p className="text-[#4A4C56] text-sm mb-1.5">Schedule Month</p>

        <Select >
          <SelectTrigger className="w-full py-[23px] shadow-none">
            <SelectValue
              placeholder="Select schedule month"
              className=" text-graytext text-sm"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select schedule month</SelectLabel>
              <SelectItem value="january">January</SelectItem>
              <SelectItem value="february">February</SelectItem>
              <SelectItem value="march">March</SelectItem>
              <SelectItem value="april">April</SelectItem>
              <SelectItem value="may">May</SelectItem>
              <SelectItem value="june">June</SelectItem>
              <SelectItem value="july">July</SelectItem>
              <SelectItem value="august">August</SelectItem>
              <SelectItem value="september">September</SelectItem>
              <SelectItem value="october">October</SelectItem>
              <SelectItem value="november">November</SelectItem>
              <SelectItem value="december">December</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
         </div>

        </div>
     

        {/* Upload Schedule */}
        <div>
          <h3 className=" text-base text-graytext font-medium">
            Upload Schedule
          </h3>
          <div className=" bg-[#F5F8FA] py-14 flex flex-col items-center justify-center rounded-xl mt-4  border-2 border-dashed border-[#B6C3DE]">
            <UploadIcon />
            <h2 className=" text-base text-[#1D1F2C] font-semibold mt-4">
              Drop your file here or click to upload
            </h2>
            <label
              htmlFor="upload"
              className=" cursor-pointer bg-primary text-white py-2 px-6 text-base font-medium rounded-lg mt-6 "
            >
              Browse file
            </label>
            <input type="file" name="" id="upload" className=" hidden" />
          </div>

          <div className=" flex   justify-end mt-8">
            <button className=" border border-primary text-primary font-semibold py-2.5 px-16 rounded-lg cursor-pointer">
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* update details data */}
      <div className=" mt-10">
        <div className="px-6 py-5 flex items-center justify-between bg-white rounded-t-2xl border-x border-[#E7ECF4]">
          <h2 className="text-lg font-semibold text-graytext">
            Upload Details
          </h2>
          <button className="text-sm font-semibold text-primary border border-[#E7ECF4] py-2 px-6 rounded-lg cursor-pointer btn_box_shadow">
            View All
          </button>
        </div>

        <DynamicTable
          columns={scheduleColumn}
          data={paginatedData}
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
      </div>
      {/* ============================================ pagination start ======================================= */}
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
            {currentPage * itemsPerPage < schedules.length
              ? currentPage * itemsPerPage
              : schedules.length}{" "}
            of {schedules.length} entries
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
      {/* ============================================ pagination end ======================================= */}
      <Footer />
    </div>
  );
}
