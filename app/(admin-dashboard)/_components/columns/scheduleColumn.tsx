"use client";
import React, { useState } from "react";
import EyeIcon from "@/public/nominations/icons/EyeIcon";
import DeleteIcon from "@/public/schedule/icons/DeleteIcon";
import DownloadIcon from "@/public/schedule/icons/DownloadIcon";
import BoxIcon from "@/public/admin-dashboard/icons/BoxIcon";

// Reusable modal component
const ScheduleModal = ({ schedule, onClose }: { schedule: any; onClose: () => void }) => {
  if (!schedule) return null;

  return (
    <div className="fixed inset-0 bg-black/80   z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] md:w-[600px] rounded-2xl    ">
        <div className=" flex justify-between items-center py-6 px-10">
          <h2 className=" text-[#1D1F2C] text-xl font-medium">
            Schedule Details
          </h2>
          <button
            onClick={onClose}
            className="  text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* name and email */}
        <div className=" flex items-center gap-8 py-6 px-10   border-y">
          <div className=" bg-[#E7ECF4] p-2.5 rounded-xl  ">
            <BoxIcon />
          </div>
          <div>
            <h2 className=" text-[#1D1F2C] font-medium text-lg">
              {" "}
              {schedule?.user?.fullName}
            </h2>
            <p className=" text-[#777980] text-base">{schedule?.user?.email}</p>
          </div>
        </div>

        {/* others details */}
        <div className=" px-14  pt-6 pb-10 space-y-3.5 md:space-y-10">
          {/*  one */}
          <div className=" flex flex-col md:flex-row space-y-3.5 md:space-y-0  text-center md:text-left items-center justify-between">
            <div>
              <p className="  text-base text-[#777980]"> Asset Group</p>
              <p className=" text-[#1D1F2C] text-lg font-medium">
                {schedule?.assetGroup}
              </p>
            </div>
            <div>
              <p className="  text-base text-[#777980]">Uploaded Date</p>
              <p className=" text-[#1D1F2C] text-lg font-medium">
                {new Date(schedule?.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          {/* two */}
          <div className=" flex flex-col md:flex-row space-y-3.5 md:space-y-0 text-center md:text-left  items-center justify-between">
            <div>
              <p className="  text-base text-[#777980]">Commodity Type</p>
              <p className=" text-[#1D1F2C] text-lg font-medium">
                {schedule?.commodityType}
              </p>
            </div>
            <div>
              <p className="  text-base text-[#777980]">Schedule Month</p>

              <p className=" text-[#1D1F2C] text-lg font-medium">
                {schedule?.scheduleMonth || schedule?.seduleMonth}
              </p>
            </div>
          </div>
          {/* three */}

          <div className=" flex flex-col md:flex-row space-y-3.5 md:space-y-0 text-center md:text-left  items-center justify-between">
            <div>
              <p className="  text-base text-[#777980]">File</p>
             
                <a
                  href={schedule?.scheduleFile}
                  download
                 className=" text-[#1D1F2C] text-lg font-medium flex itmes-center gap-2"
                >
                  Download 
                  <div className=" mt-2">

                  <DownloadIcon/>
                  </div>
                </a>
               
            </div>
            <div>
              <p className="  text-base text-[#777980]">Transport Mode</p>
               <p className=" text-[#1D1F2C] text-lg font-medium">
          
          {schedule?.transportMode || "N/A"}
        </p>
            </div>
          </div>
        </div>

       

        {/* <div className="mt-4">
          <a
            href={schedule?.scheduleFile}
            download
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
          >
            <DownloadIcon /> Download File
          </a>
          <button
            onClick={() => window.open(schedule?.scheduleFile, "_blank")}
            className="ml-3 underline text-sm text-blue-600"
          >
            View in new tab
          </button>
        </div> */}
      </div>
    </div>
  );
};


export const scheduleColumn = ({onDelete}:{onDelete :(id:string)=>void})=> [
  {
    label: "Assigned User",
    
    accessor: "user",
    width: "20%",
    formatter: (item: any) => (
      <div className="flex items-center gap-2">
        <img
          src={item?.avatar}
          alt={item?.fullName}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div>
          <h3 className="text-sm text-graytext font-medium">
            {item?.fullName} {item?.companyName ? `- ${item.companyName}` : ""}
          </h3>
          <p className="text-xs text-[#777980]">{item?.email}</p>
        </div>
      </div>
    ),
  },
  {
    label: "Asset Group",
    accessor: "assetGroup",
    width: "10%",
    formatter: (item: string) => (
      <p className="text-[#4A4C56] text-sm font-medium">{item}</p>
    ),
  },
  {
    label: "Commodity Type",
    accessor: "commodityType",
    width: "10%",
    formatter: (item: string) => (
      <p className="text-[#4A4C56] text-sm font-medium">{item}</p>
    ),
  },
  {
    label: "Schedule Month",
    accessor: "scheduleMonth", // ✅ fixed typo (was seduleMonth)
    width: "10%",
    formatter: (item: string) => (
      <p className="text-[#4A4C56] text-sm font-medium">{item}</p>
    ),
  },
  {
    label: "Transportation Mode",
    accessor: "transportMode",
    width: "11%",
    formatter: (item: string) => (
      <p
        className={`text-sm font-medium py-1.5 inline-block px-3.5 rounded-full text-center ${
          item === "Pipeline"
            ? "text-[#123F93] bg-[#E7ECF4]"
            : item === "Trucking"
            ? "text-[#116557] bg-[#E9FAF7]"
            : item === "Railcar"
            ? "text-[#6E00FF] bg-[#F1E6FF]"
            : ""
        }`}
      >
        {item}
      </p>
    ),
  },
  {
    label: "File",
    accessor: "scheduleFile",
    width: "13%",
    formatter: (item: string) => (
      <div className="flex items-center gap-2">
        <a
          href={item}
          download
          className="text-sm text-graytext font-medium underline"
        >
          Download
        </a>
        <button
          className="cursor-pointer"
          onClick={() => window.open(item, "_blank")}
        >
          <DownloadIcon />
        </button>
      </div>
    ),
  },
  {
    label: "Date Uploaded",
    accessor: "createdAt",
    width: "14%",
    formatter: (item: string) => (
      <p className="text-sm text-graytext font-medium">
        {new Date(item).toLocaleDateString()} {new Date(item).toLocaleTimeString()}
      </p>
    ),
  },
  {
    label: "Actions",
    accessor: "id",
    width: "11%",
    formatter: (id:string, row: any) => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <div className="flex items-center gap-4">
            <button className="cursor-pointer" onClick={() => setOpen(true)}>
              <EyeIcon />
            </button>
            <button className="cursor-pointer" onClick={()=>onDelete(id)}>
              <DeleteIcon />
            </button>
            
          </div>
          {open && <ScheduleModal schedule={row} onClose={() => setOpen(false)} />}
        </>
      );
    },
  },
];
