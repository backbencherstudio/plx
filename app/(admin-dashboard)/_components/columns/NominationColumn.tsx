import React, { ReactNode, useEffect, useState } from "react";
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

// Edit Modal Component
const EditModal = ({ isOpen, onClose, rowData }: { isOpen: boolean; onClose: () => void; rowData: any }) => {
  if (!isOpen) return null;

  const [selectedStatus, setSelectedStatus] = useState<string>("Submitted");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!rowData) return;
    setSelectedStatus(rowData?.status || "Submitted");
  }, [rowData]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateNominationStatus(rowData.id, selectedStatus);

      onClose();
    } catch (e) {
      console.error("Failed to update nomination", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9999]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] w-11/12 max-w-4xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <button className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <PlusCircleIcon className="w-6 h-6 text-white" />
            </button>
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-medium text-neutral-800 font-['roboto']">
                Edit Nomination
              </h1>
              <p className="text-sm text-neutral-600 font-['roboto']">
                Update nomination details for {rowData?.subscriber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Status-only Form */}
        <div className="mt-7">
          <div className="mb-6">
            <h3 className="text-lg text-[#1D1F2C] font-medium mb-2.5">
              Update Status
            </h3>
            <p className="text-sm text-neutral-600 mb-4">Allowed statuses: Submitted, Complete, Withdraw</p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedStatus("Submitted")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedStatus === "Submitted" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : "bg-white text-yellow-700 border-yellow-300 hover:bg-yellow-50"}`}
              >
                Submitted
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus("Complete")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedStatus === "Complete" ? "bg-green-100 text-green-800 border-green-300" : "bg-white text-green-700 border-green-300 hover:bg-green-50"}`}
              >
                Complete
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus("Withdraw")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedStatus === "Withdraw" ? "bg-red-100 text-red-800 border-red-300" : "bg-white text-red-700 border-red-300 hover:bg-red-50"}`}
              >
                Withdraw
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="text-[#1D1F2C] bg-[#E6E6E6] text-sm font-medium py-3 px-12 rounded-xl cursor-pointer hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-white bg-primary text-sm font-medium py-3 px-12 rounded-xl cursor-pointer hover:bg-primary/90 transition-colors"
            >
              {saving ? "Saving..." : "Update Status"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Dropdown component for the action menu
import { deleteNomination } from "@/services/nominationService";

const ActionDropdown = ({ rowId, rowData, onDeleted }: { rowId: any; rowData: any; onDeleted?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAction = (action: string) => {
    console.log(`Action: ${action} on row: ${rowId}`);
    setIsOpen(false);
    
    if (action === 'edit') {
      setIsEditModalOpen(true);
    }
    // Handle other actions here
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
                  className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
                  onClick={() => handleAction('edit')}
                >
                  Edit
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        rowData={rowData}
      />
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
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
          {row.subscriber?.charAt(0)}
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