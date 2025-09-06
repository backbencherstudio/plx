import React, { ReactNode } from "react";
import Image from "next/image";
import rightArrow from "@/public/nominations/Frame.svg";
import EyeIcon from "@/public/nominations/icons/EyeIcon";
import Dot3Icon from "@/public/nominations/icons/Dot3Icon";

export const nominationColumn = (handleOpenModal: () => void) => [
  {
    label: "Subscriber",
    accessor: "subscriber",
    width: "200px",
    formatter: (item: string, row: any) => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
          {row.subscriber?.charAt(0)}
        </div>
        <div>
          <h3 className="text-sm  text-graytext font-medium">{row.subscriber}</h3>
          <p className="text-xs text-[#777980]">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    label: "Requested Date",
    accessor: "requestedDate",
    width: "140px",
    formatter: (item: string) => (
      <p className="text-sm  text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "Commodity",
    accessor: "commodity",
    width: "140px",
    formatter: (item: string) => (
      <p className="text-sm  text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "Route",
    accessor: "origin",
    width: "220px",
    formatter: (_: any, row: any) => (
      <div>
        <h4 className="text-sm text-graytext font-semibold">{row.origin}</h4>
        <div className="flex items-center gap-2">
          <Image src={rightArrow} alt="right arrow" />
          <p className="text-xs text-[#777980] font-medium">{row.destination}</p>
        </div>
      </div>
    ),
  },
  {
    label: "Transport",
    accessor: "transport",
    width: "140px",
    formatter: (item: string) => (
      <div
        className={`${
          item === "Pipeline"
            ? "text-primary bg-color11"
            : item === "Trucking"
            ? "text-color2 bg-color22"
            : "text-color3 bg-color33"
        } inline-block py-1 px-3.5 rounded-full text-sm font-medium`}
      >
        {item}
      </div>
    ),
  },
  {
    label: "Beginning Date",
    accessor: "beginDate",
    width: "120px",
    formatter: (item: string) => (
      <p className="text-sm  text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "End Date",
    accessor: "endDate",
    width: "120px",
    formatter: (item: string) => (
      <p className="text-sm  text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "Status",
    accessor: "status",
    width: "140px",
    formatter: (item: string, row: any) => {
      const bg =
        row.statusCode === "SUBMITTED"
          ? "bg-blue-100 text-blue-700"
          : row.statusCode === "CONFIRMED"
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-700";

      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${bg}`}>
          {item}
        </span>
      );
    },
  },
  {
    label: "Action",
    accessor: "id",
    width: "120px",
    formatter: (item: ReactNode) => (
      <div className="flex items-center gap-10">
        <button
          className="cursor-pointer"
          onClick={() => handleOpenModal()}
        >
          <EyeIcon />
        </button>
        <button className="cursor-pointer">
          <Dot3Icon />
        </button>
      </div>
    ),
  },
];
