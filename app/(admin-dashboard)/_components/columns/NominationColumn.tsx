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
import { updateNomination, updateNominationStatus } from "@/services/nominationService";

// Edit Modal Component
const EditModal = ({ isOpen, onClose, rowData }: { isOpen: boolean; onClose: () => void; rowData: any }) => {
  if (!isOpen) return null;

  const [form, setForm] = useState({
    subscriber: "",
    commodity: "",
    volume: "",
    unit: "bbls",
    origin: "",
    destination: "",
    transport: "",
    beginDate: "",
    endDate: "",
    notes: "",
    status: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!rowData) return;
    const toDateInput = (s?: string) => (s ? String(s).slice(0, 10) : "");
    setForm({
      subscriber: rowData?.subscriber || "",
      commodity: rowData?.commodity || "",
      volume: rowData?.volume || "",
      unit: rowData?.unit || "bbls",
      origin: rowData?.origin || "",
      destination: rowData?.destination || "",
      transport: (rowData?.transport || "").toLowerCase(),
      beginDate: toDateInput(rowData?.rawBeginDate || rowData?.beginDate),
      endDate: toDateInput(rowData?.rawEndDate || rowData?.endDate),
      notes: rowData?.notes || "",
      status: rowData?.status || "",
    });
  }, [rowData]);

  const handleChange = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateNomination(rowData.id, {
        assetGroup: rowData.company,
        commodityType: form.commodity,
        volume: form.volume,
        unit: form.unit,
        origin: form.origin,
        destination: form.destination,
        transportMode: form.transport,
        connection: rowData.connection || "",
        beginningDate: form.beginDate,
        endDate: form.endDate,
        notes: form.notes,
      });

      if (form.status && form.status !== rowData.status) {
        await updateNominationStatus(rowData.id, form.status);
      }

      onClose();
      // Optionally refresh: window.location.reload();
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

        {/* Form */}
        <div className="mt-7">
          <div>
            <h3 className="text-lg text-[#1D1F2C] font-medium mb-2.5">
              Choose Subscriber
            </h3>
            <Select defaultValue={form.subscriber}>
              <SelectTrigger className="w-full py-5 shadow-none">
                <SelectValue placeholder="Search by name or email..." />
              </SelectTrigger>
              <SelectContent className="z-[10001]">
                <SelectGroup>
                  <SelectLabel>Subscribers</SelectLabel>
                  <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                  <SelectItem value="Esther Howard">Esther Howard</SelectItem>
                  <SelectItem value="Brooklyn Simmons">Brooklyn Simmons</SelectItem>
                  <SelectItem value="Leslie Alexander">Leslie Alexander</SelectItem>
                  <SelectItem value="Jenny Wilson">Jenny Wilson</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Flex Form First */}
          <div className="flex flex-col md:flex-row items-start my-10 gap-14">
            {/* Left Side - Commodity Details */}
            <div className="block md:flex-1 w-full">
              <div className="flex items-center gap-3 mb-8">
                <BoxIcon />
                <h3 className="text-lg text-[#1D1F2C] font-medium">
                  Commodity Details
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-graytext mb-2">Commodity Type</p>
                  <Select defaultValue={form.commodity?.toLowerCase()} onValueChange={(v) => handleChange("commodity", v)}>
                    <SelectTrigger className="w-full py-5 shadow-none">
                      <SelectValue placeholder="Select commodity type" />
                    </SelectTrigger>
                    <SelectContent className="z-[10001]">
                      <SelectGroup>
                        <SelectLabel>Select commodity type</SelectLabel>
                        <SelectItem value="ngls">NGLs</SelectItem>
                        <SelectItem value="refined products">Refined Products</SelectItem>
                        <SelectItem value="natural gas">Natural Gas</SelectItem>
                        <SelectItem value="petrochemicals">Petrochemicals</SelectItem>
                        <SelectItem value="crude oil">Crude Oil</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-xs text-graytext mb-2">Volume</p>
                  <input
                    type="text"
                    value={form.volume}
                    onChange={(e) => handleChange("volume", e.target.value)}
                    placeholder="Enter Volume"
                    className="py-3 px-4 w-full text-sm font-medium text-graytext border border-[#E6E6E6] rounded-[10px]"
                  />
                </div>
                <div>
                  <p className="text-xs text-graytext mb-2">Unit</p>
                  <Select defaultValue={form.unit} onValueChange={(v) => handleChange("unit", v)}>
                    <SelectTrigger className="w-full py-5 shadow-none text-[#4A4C56] text-sm font-medium">
                      <SelectValue placeholder="bbls" />
                    </SelectTrigger>
                    <SelectContent className="z-[10001]">
                      <SelectGroup>
                        <SelectLabel>Unit</SelectLabel>
                        <SelectItem value="bbls">bbls</SelectItem>
                        <SelectItem value="gallons">gallons</SelectItem>
                        <SelectItem value="mcf">MCF</SelectItem>
                        <SelectItem value="tons">tons</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Right Side - Location & Transport */}
            <div className="block md:flex-1 w-full">
              <div className="flex items-center gap-3 mb-8">
                <LocationIcon />
                <h3 className="text-lg text-[#1D1F2C] font-medium">
                  Location & Transport
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-graytext mb-2">Origin</p>
                  <input
                    type="text"
                    value={form.origin}
                    onChange={(e) => handleChange("origin", e.target.value)}
                    placeholder="Enter origin location"
                    className="py-3 px-4 w-full text-sm font-medium text-graytext border border-[#E6E6E6] rounded-[10px]"
                  />
                </div>
                <div>
                  <p className="text-xs text-graytext mb-2">Destination</p>
                  <input
                    type="text"
                    value={form.destination}
                    onChange={(e) => handleChange("destination", e.target.value)}
                    placeholder="Enter destination location"
                    className="py-3 px-4 w-full text-sm font-medium text-graytext border border-[#E6E6E6] rounded-[10px]"
                  />
                </div>
                <div>
                  <p className="text-xs text-graytext mb-2">Transport Mode</p>
                  <Select defaultValue={form.transport} onValueChange={(v) => handleChange("transport", v)}>
                    <SelectTrigger className="w-full py-5 shadow-none text-[#4A4C56] text-sm font-medium">
                      <SelectValue placeholder="Select transport mode" />
                    </SelectTrigger>
                    <SelectContent className="z-[10001]">
                      <SelectGroup>
                        <SelectLabel>Select transport mode</SelectLabel>
                        <SelectItem value="pipeline">Pipeline</SelectItem>
                        <SelectItem value="trucking">Trucking</SelectItem>
                        <SelectItem value="railcar">Railcar</SelectItem>
                        <SelectItem value="marine">Marine</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Flex Form Second - Scheduling */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-8">
              <CalenderIcon />
              <h3 className="text-lg text-[#1D1F2C] font-medium">
                Scheduling & Additional Information
              </h3>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-14">
              <div className="block md:flex-1 w-full">
                <p className="text-xs text-[#4A4C56] mb-2">Beginning Date</p>
                <input
                  type="date"
                  value={form.beginDate}
                  onChange={(e) => handleChange("beginDate", e.target.value)}
                  className="w-full py-3 px-4 rounded-[10px] border border-[#E6E6E6] cursor-pointer"
                />
              </div>
              <div className="block md:flex-1 w-full">
                <p className="text-xs text-[#4A4C56] mb-2">End Date</p>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className="w-full py-3 px-4 rounded-[10px] border border-[#E6E6E6] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="mb-10">
            <p className="text-xs text-[#4A4C56] mb-2">Notes (Optional)</p>
            <textarea
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="w-full py-3 px-4 rounded-[10px] border border-[#E6E6E6] h-36"
              placeholder="Additional information, special requirements, or comments..."
            />
          </div>

          {/* Status */}
          <div className="mb-10">
            <p className="text-xs text-[#4A4C56] mb-2">Status</p>
            <Select defaultValue={form.status} onValueChange={(v) => handleChange("status", v)}>
              <SelectTrigger className="w-full py-5 shadow-none text-[#4A4C56] text-sm font-medium">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="z-[10001]">
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
              {saving ? "Saving..." : "Update Nomination"}
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
          onClick={() => handleOpenModal(row)}
        >
          <EyeIcon />
        </button>
        <ActionDropdown rowId={row.id || item} rowData={row} onDeleted={onDeleted} />
      </div>
    ),
  },
];