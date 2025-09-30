import React, { ReactNode, useState } from "react";
import Image from "next/image";
import rightArrow from "@/public/nominations/Frame.svg";
import EyeIcon from "@/public/nominations/icons/EyeIcon";
import Dot3Icon from "@/public/nominations/icons/Dot3Icon";

// Dropdown component for the action menu
const ActionDropdown = ({ rowId }: { rowId: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: string) => {
    console.log(`Action: ${action} on row: ${rowId}`);
    setIsOpen(false);
    // Handle your actions here
  };

  return (
    <div className="relative">
      <button
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Dot3Icon />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu with responsive positioning */}
          <div className="fixed z-[9999] w-36 sm:w-40 bg-white border border-gray-200 rounded-md shadow-lg"
               style={{
                 top: (() => {
                   const button = document.activeElement as HTMLElement;
                   if (button) {
                     const rect = button.getBoundingClientRect();
                     const dropdownHeight = 120; // Approximate height
                     const viewportHeight = window.innerHeight;
                     
                     // If dropdown would go below viewport, show it above the button
                     if (rect.bottom + dropdownHeight > viewportHeight) {
                       return `${rect.top - dropdownHeight - 4}px`;
                     }
                     return `${rect.bottom + 4}px`;
                   }
                   return '0px';
                 })(),
                 left: (() => {
                   const button = document.activeElement as HTMLElement;
                   if (button) {
                     const rect = button.getBoundingClientRect();
                     const dropdownWidth = window.innerWidth < 640 ? 144 : 160; // 36*4 or 40*4 in px
                     const viewportWidth = window.innerWidth;
                     
                     // If dropdown would go beyond right edge, align it to the right
                     if (rect.right - dropdownWidth < 0) {
                       return `${rect.left}px`;
                     }
                     return `${rect.right - dropdownWidth}px`;
                   }
                   return '0px';
                 })()
               }}>
            <div className="py-1">
              <button
                className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                onClick={() => handleAction('edit')}
              >
                Complete
              </button>
              <button
                className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                onClick={() => handleAction('duplicate')}
              >
                Withdraw
              </button>
              <button
                className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
                onClick={() => handleAction('delete')}
              >
                Edit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const nominationColumn = (handleOpenModal: () => void) => [
  {
    label: "Subscriber",
    accessor: "subscriber",
    width: "20%",
    formatter: (item: string, row: any) => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
          {row.subscriber?.charAt(0)}
        </div>
        <div>
          <div className=" flex items-center gap-1">
          <h3 className="text-sm  text-graytext font-medium">{row.subscriber}</h3>
          <p>- {row.company}</p>

          </div>
          <p className="text-xs text-[#777980]">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    label: "Requested Date",
    accessor: "requestedDate",
    width: "8.88%",
    formatter: (item: string) => (
      <p className="text-sm  text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "Commodity",
    accessor: "commodity",
    width: "8.88%",
    formatter: (item: string) => (
      <p className="text-sm  text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "Route",
    accessor: "origin",
    width: "8.88%",
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
    label: "Connection",
    accessor: "origin",
    width: "8.88%",
    formatter: (_: any, row: any) => (
      <div>
       <p className=" text-sm text-[#4A4C56] font-medium">Remarks</p>
      </div>
    ),
  },
  {
    label: "Transport",
    accessor: "transport",
    width: "8.88%",
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
    width: "8.88%",
    formatter: (item: string) => (
      <p className="text-sm  text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "End Date",
    accessor: "endDate",
    width: "8.88%",
    formatter: (item: string) => (
      <p className="text-sm  text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "Status",
    accessor: "status",
    width: "8.88%",
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
    width: "8.88%",
    formatter: (item: ReactNode, row: any) => (
      <div className="flex items-center gap-10">
        <button
          className="cursor-pointer"
          onClick={() => handleOpenModal()}
        >
          <EyeIcon />
        </button>
        <ActionDropdown rowId={row.id || item} />
      </div>
    ),
  },
];