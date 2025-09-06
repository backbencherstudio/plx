"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { ChevronDown, Package, MapPin, Calendar, Plus } from "lucide-react"
import { userData } from "../../../../lib/userdata"

interface FormData {
  commodityType: string
  volume: string
  unit: string
  origin: string
  destination: string
  transportMode: string
  requestedDate: string
  notes: string
}

interface RequestNominationFormProps {
  isOpen?: boolean
  onToggle?: (isExpanded: boolean) => void
}

export function RequestNominationForm({ isOpen, onToggle }: RequestNominationFormProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen || false)
  
  // Dropdown states
  const [commodityTypeOpen, setCommodityTypeOpen] = useState(false)
  const [unitOpen, setUnitOpen] = useState(false)
  const [transportModeOpen, setTransportModeOpen] = useState(false)
  
  // React Hook Form
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      commodityType: "Select commodity type",
      volume: "",
      unit: "bbls",
      origin: "",
      destination: "",
      transportMode: "Select transport mode",
      requestedDate: "",
      notes: ""
    }
  })

  const toggleExpanded = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    onToggle?.(newState)
  }

  // Update internall state when external state changes
  useEffect(() => {
    if (isOpen !== undefined) {
      setIsExpanded(isOpen)
    }
  }, [isOpen])

  // Get dropdown options from userdata.ts
  const commodityTypes = userData.nominationsPage.newNominationForm.formData.commodityType.options.map(option => option.name)
  const units = userData.nominationsPage.newNominationForm.formData.unit.options.map(option => option.symbol)
  const transportModes = userData.nominationsPage.newNominationForm.formData.transportMode.options.map(option => option.name)

  // Form submit handler
  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data)
    console.log("All form values:", {
      commodityType: data.commodityType,
      volume: data.volume,
      unit: data.unit,
      origin: data.origin,
      destination: data.destination,
      transportMode: data.transportMode,
      requestedDate: data.requestedDate,
      notes: data.notes
    })

    // Create new nomination object following userdata.ts structure
    const newNomination = {
      id: `#${Math.floor(Math.random() * 900000) + 100000}`, // Generate random ID
      file: {
        name: `Schedule_${new Date().toLocaleDateString('en-US', { month: 'short' })}`,
        downloadUrl: `/downloads/schedule-${new Date().toISOString().split('T')[0]}.pdf`,
        fileType: "pdf",
        fileSize: "2.4 MB"
      },
      requestedDate: data.requestedDate,
      commodity: { 
        name: data.commodityType, 
        code: data.commodityType.toUpperCase().replace(/\s+/g, '_'), 
        category: "gas" 
      },
      volume: { 
        value: data.volume, 
        unit: data.unit.toUpperCase() 
      },
      route: { 
        from: data.origin, 
        to: data.destination, 
        distance: "240 miles" 
      },
      transport: { 
        type: data.transportMode, 
        code: data.transportMode.toUpperCase(), 
        color: "blue", 
        capacity: "high" 
      },
      beginningDate: data.requestedDate,
      endDate: data.requestedDate,
      status: { 
        name: "Submitted", 
        code: "SUBMITTED", 
        color: "blue", 
        description: "Nomination has been submitted and is under review" 
      },
      priority: { 
        level: "Medium", 
        code: "MEDIUM", 
        color: "yellow" 
      },
      actions: [
        { 
          id: "view", 
          label: "View", 
          icon: "eye", 
          action: "view_nomination", 
          endpoint: `/api/nominations/${Math.floor(Math.random() * 900000) + 100000}`, 
          method: "GET", 
          isDisabled: false 
        },
        { 
          id: "download", 
          label: "Download", 
          icon: "download", 
          action: "download_file", 
          endpoint: `/api/nominations/${Math.floor(Math.random() * 900000) + 100000}/download`, 
          method: "GET", 
          isDisabled: false 
        }
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: userData.user.name,
        lastModifiedBy: userData.user.name
      }
    }

    // Add to userdata structure (this would be replaced with actual API call)
    console.log("New Nomination to be added to backend:", newNomination)
    
    // Simulate adding to the data structure
    // In real implementation, this would be an API call
    // userData.nominationsPage.previousNominationsTable.data.unshift(newNomination)
    
    // Reset form to default values after successful submission
    reset({
      commodityType: "Select commodity type",
      volume: "",
      unit: "bbls",
      origin: "",
      destination: "",
      transportMode: "Select transport mode",
      requestedDate: "",
      notes: ""
    })
    
    // Close all dropdowns
    setCommodityTypeOpen(false)
    setUnitOpen(false)
    setTransportModeOpen(false)
  }

  return (
    <>
      {/* Header - Always Visible */}
      <div 
        className="p-6 flex justify-between bg-white rounded-md items-center mt-6 max-w-[1274px] w-full mx-auto cursor-pointer hover:bg-white transition-colors"
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-medium text-neutral-800 font-['roboto']">Request Nomination</h1>
            <p className="text-base text-neutral-600 font-['roboto']">
              Create a new nomination with commodity details and transport preferences
            </p>
          </div>
        </div>
        <div
          className={`w-14 h-8 p-2.5 rounded-lg border border-gray-100 flex items-center justify-center transition-transform`}
        >
          <ChevronDown className={`w-4 h-4 text-neutral-600 duration-200 ${ isExpanded ? "rotate-180" : "" }`} />
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 flex flex-col gap-14 bg-white">
          {/* Main Form Sections */}
          <div className="flex flex-col gap-14">
            {/* Commodity Details & Location Transport Row */}
            <div className="flex gap-14">
              {/* Commodity Details */}
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-neutral-800" />
                  <h2 className="text-lg font-medium text-neutral-800 font-['Roboto']">Commodity Details</h2>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-xs text-neutral-600 font-['roboto']">Commodity Type</label>
                    <div 
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center justify-between cursor-pointer"
                      onClick={() => setCommodityTypeOpen(!commodityTypeOpen)}
                    >
                      <span className="text-sm font-medium text-neutral-600 font-['roboto']">{watch("commodityType")}</span>
                      <ChevronDown className="w-4 h-4 text-neutral-600" />
                    </div>
                    {/* Commodity Type Dropdown */}
                    {commodityTypeOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-[0px_10px_30px_0px_rgba(0,0,0,0.10)] z-10 border border-gray-200 overflow-hidden">
                        <div className="px-4 py-2 bg-primary">
                          <div className="text-sm font-semibold text-white font-['Manrope']">Select commodity type</div>
                        </div>
                        {commodityTypes.map((type, index) => (
                          <div 
                            key={index}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setValue("commodityType", type)
                              setCommodityTypeOpen(false)
                            }}
                          >
                            <div className="text-sm font-normal text-neutral-600 font-['Manrope']">{type}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-['roboto']">Volume</label>
                    <input
                      type="text"
                      placeholder="Enter Volume"
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 text-sm font-medium text-zinc-500 font-['roboto'] placeholder:text-zinc-500"
                      {...register("volume")}
                    />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-xs text-neutral-600 font-['roboto']">Unit</label>
                    <div 
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center justify-between cursor-pointer"
                      onClick={() => setUnitOpen(!unitOpen)}
                    >
                      <span className="text-sm font-medium text-neutral-600 font-['roboto']">{watch("unit")}</span>
                      <ChevronDown className="w-4 h-4 text-neutral-600" />
                    </div>
                    {/* Unit Dropdown */}
                    {unitOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-[0px_10px_30px_0px_rgba(0,0,0,0.10)] z-10 border border-gray-200 overflow-hidden">
                        <div className="px-4 py-2 bg-primary">
                          <div className="text-sm font-semibold text-white font-['Manrope']">{watch("unit")}</div>
                        </div>
                        {units.map((unit, index) => (
                          <div 
                            key={index}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setValue("unit", unit)
                              setUnitOpen(false)
                            }}
                          >
                            <div className="text-sm font-normal text-neutral-600 font-['Manrope']">{unit}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Location & Transport */}
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-neutral-800" />
                  <h2 className="text-lg font-medium text-neutral-800 font-['Roboto']">Location & Transport</h2>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-['roboto']">Origin</label>
                    <input
                      type="text"
                      placeholder="Enter origin location"
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 text-sm font-medium text-neutral-600 font-['roboto'] placeholder:text-neutral-600"
                      {...register("origin")}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-['roboto']">Destination</label>
                    <input
                      type="text"
                      placeholder="Enter destination location"
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 text-sm font-medium text-neutral-600 font-['roboto'] placeholder:text-neutral-600"
                      {...register("destination")}
                    />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-xs text-neutral-600 font-['roboto']">Transport Mode</label>
                    <div 
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center justify-between cursor-pointer"
                      onClick={() => setTransportModeOpen(!transportModeOpen)}
                    >
                      <span className="text-sm font-medium text-neutral-600 font-['roboto']">{watch("transportMode")}</span>
                      <ChevronDown className="w-4 h-4 text-neutral-600" />
                    </div>
                    {/* Transport Mode Dropdown */}
                    {transportModeOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-[0px_10px_30px_0px_rgba(0,0,0,0.10)] z-10 border border-gray-200 overflow-hidden">
                        <div className="px-4 py-2 bg-primary">
                          <div className="text-sm font-semibold text-white font-['Manrope']">Select transport mode</div>
                        </div>
                        {transportModes.map((mode, index) => (
                          <div 
                            key={index}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setValue("transportMode", mode)
                              setTransportModeOpen(false)
                            }}
                          >
                            <div className="text-sm font-normal text-neutral-600 font-['Manrope']">{mode}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Scheduling & Additional Information */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-neutral-800" />
                <h2 className="text-lg font-medium text-neutral-800 font-['Roboto']">
                  Scheduling & Additional Information
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-['roboto']">Requested Date</label>
                    <input
                      type="date"
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 text-sm font-medium text-neutral-600 font-['roboto']"
                      {...register("requestedDate")}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-neutral-600 font-['roboto']">Notes (Optional)</label>
                  <textarea
                    placeholder="Additional information, special requirements, or comments..."
                    className="h-28 px-5 py-4 rounded-[10px] border border-gray-200 text-sm font-medium text-zinc-400 font-['roboto'] placeholder:text-zinc-400 resize-none"
                    {...register("notes")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <div className="flex gap-4 w-96">
              <button 
                type="button"
                className="w-40 px-4 py-2 bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-medium text-neutral-800 font-['Manrope']">Cancel</span>
              </button>
              <button 
                type="submit"
                className="flex-1 px-4 py-2 bg-primary rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <span className="text-sm font-medium text-white font-['Manrope']">Submit Nomination</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}
