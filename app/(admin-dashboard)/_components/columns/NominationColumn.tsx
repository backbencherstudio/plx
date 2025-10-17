import React, { ReactNode, useState } from "react";
import Image from "next/image";
import rightArrow from "@/public/nominations/Frame.svg";
import EyeIcon from "@/public/nominations/icons/EyeIcon";
import Dot3Icon from "@/public/nominations/icons/Dot3Icon";
 
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircleIcon } from "lucide-react";
import LocationIcon from "@/public/nominations/icons/LocationIcon";
import CalenderIcon from "@/public/nominations/icons/CalenderIcon";
import BoxIcon from "@/public/nominations/icons/BoxIcon";
import { updateNominationStatus } from "@/services/nominationService";

// Dropdown component for the action menu
import { deleteNomination } from "@/services/nominationService";

const ActionDropdown = ({ rowId, rowData, onDeleted }: { rowId: string; rowData: any; onDeleted?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const normalizeStatus = (value: string | undefined | null): "Submitted" | "Complete" | "Withdraw" => {
    const v = (value || "").trim().toLowerCase();
    if (v === "submitted") return "Submitted";
    if (v === "complete") return "Complete";
    if (v === "withdraw") return "Withdraw";
    return "Submitted";
  };

  const updateStatus = async (status: "Submitted" | "Complete" | "Withdraw") => {
    try {
      const confirmed = window.confirm(`Are you sure you want to set status to ${status}?`);
      if (!confirmed) return;
      const res = await updateNominationStatus(String(rowId), status);
      alert(res?.message || `Status updated to ${status}`);
      // simple refresh to reflect changes
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (e) {
      console.error("Failed to update nomination", e);
      const msg = (e as any)?.response?.data?.message || (e as any)?.message || "Failed to update nomination status";
      alert(msg);
    } finally {
      setIsOpen(false);
    }
  };

  const handleAction = (action: string) => {
    setIsOpen(false);
    if (action === 'complete') updateStatus('Complete');
    if (action === 'withdraw') updateStatus('Withdraw');
    if (action === 'submitted') updateStatus('Submitted');
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this nomination?")) return;
    try {
      setIsDeleting(true);
      await deleteNomination(rowId);
      onDeleted && onDeleted();
    } catch (e) {
      console.error("Failed to delete nomination", e);
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <>
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
                       const dropdownHeight = 120;
                       const viewportHeight = window.innerHeight;
                       
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
                       const dropdownWidth = window.innerWidth < 640 ? 144 : 160;
                       const viewportWidth = window.innerWidth;
                       
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
                  onClick={() => handleAction('complete')}
                >
                  Complete
                </button>
                <button
                  className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                  onClick={() => handleAction('withdraw')}
                >
                  Withdraw
                </button>
                <button
                  className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                  onClick={() => handleAction('submitted')}
                >
                  Submitted
                </button>
                <button
                  className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export const nominationColumn = (handleOpenModal: (row: any) => void, onDeleted?: () => void) => [
  {
    label: "Subscriber",
    accessor: "subscriber",
    width: "20%",
    formatter: (item: string, row: any) => (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
          {row.avatar ? (
            <Image src={row.avatar} alt={row.subscriber} width={36} height={36} className="w-9 h-9 object-cover" />
          ) : (
            <span className="text-sm font-semibold text-gray-700">
              {row.subscriber?.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <h3 className="text-sm text-graytext font-medium">{row.subscriber} - {row.company}</h3>
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
      <p className="text-sm text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "Commodity",
    accessor: "commodity",
    width: "8.88%",
    formatter: (item: string) => (
      <p className="text-sm text-graytext font-medium">{item}</p>
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
        <p className="text-sm text-[#4A4C56] font-medium">Remarks</p>
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
      <p className="text-sm text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "End Date",
    accessor: "endDate",
    width: "8.88%",
    formatter: (item: string) => (
      <p className="text-sm text-graytext font-medium">{item}</p>
    ),
  },
  {
    label: "Status",
    accessor: "status",
    width: "8.88%",
    formatter: (item: string) => {
      const normalized = (item || "").toLowerCase();
      const classes =
        normalized === "complete"
          ? "bg-green-100 text-green-700"
          : normalized === "submitted"
          ? "bg-yellow-100 text-yellow-800"
          : normalized === "withdraw"
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-700";
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes}`}>
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
          onClick={() => handleOpenModal(row)}
        >
          <EyeIcon />
        </button>
        <ActionDropdown rowId={row.id || item} rowData={row} onDeleted={onDeleted} />
      </div>
    ),
  },
];