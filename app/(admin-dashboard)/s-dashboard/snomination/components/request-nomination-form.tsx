"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { ChevronDown, Package, MapPin, Calendar, Plus } from "lucide-react"
import { userData } from "../../../../lib/userdata"
import axios from "axios"

interface FormData {
  assetGroup: string
  commodityType: string
  volume: string
  unit: string
  origin: string
  destination: string
  transportMode: string
  connection: string
  startDate: string
  endDate: string
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
  const [commoditySubMenuOpen, setCommoditySubMenuOpen] = useState(false)
  const [selectedCommodity, setSelectedCommodity] = useState<any>(null)
  const [unitOpen, setUnitOpen] = useState(false)
  const [transportModeOpen, setTransportModeOpen] = useState(false)

  // API states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [debugData, setDebugData] = useState<any>(null)
  const [debugSteps, setDebugSteps] = useState<string[]>([])
  const [showDebugBox, setShowDebugBox] = useState(false)
  
  // React Hook Form
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      assetGroup: "",
      commodityType: "Select commodity type",
      volume: "",
      unit: "bbls",
      origin: "",
      destination: "",
      transportMode: "Select transport mode",
      connection: "",
      startDate: "",
      endDate: "",
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
  const commodityTypes = userData.nominationsPage.newNominationForm.formData.commodityType.options
  const units = userData.nominationsPage.newNominationForm.formData.unit.options.map(option => option.symbol)
  const transportModes = userData.nominationsPage.newNominationForm.formData.transportMode.options.map(option => option.name)

  // API call function
  const submitNomination = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)
      setDebugSteps([])
      
      const token = localStorage.getItem('token')
      
      setDebugSteps(prev => [...prev, '1. Starting nomination submission...'])
      setDebugSteps(prev => [...prev, `2. Token retrieved: ${token ? 'Present' : 'Not found'}`])
      setDebugSteps(prev => [...prev, '3. Preparing request payload...'])
      
      // Prepare API payload matching the Postman structure
      const apiPayload = {
        commodityType: data.commodityType,
        assetGroup: data.assetGroup,
        origin: data.origin,
        volume: data.volume,
        destination: data.destination,
        unit: data.unit,
        transportMode: data.transportMode,
        beginningDate: data.startDate ? new Date(data.startDate).toISOString() : null,
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
        notes: data.notes,
        connection: data.connection
      }
      
      setDebugSteps(prev => [...prev, '4. Making POST request to nomination API...'])
      setDebugSteps(prev => [...prev, `5. Payload: ${JSON.stringify(apiPayload, null, 2)}`])
      
      const response = await axios.post(`https://once-seq-staffing-tony.trycloudflare.com/api/v1/nomination/create`, apiPayload, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
      
      setDebugSteps(prev => [...prev, '6. API call successful!'])
      setDebugSteps(prev => [...prev, `7. Response status: ${response.status}`])
      setDebugSteps(prev => [...prev, '8. Processing response data...'])
      
      console.log('API Response:', response.data)
      setDebugData(response.data)
      setDebugSteps(prev => [...prev, '9. Nomination submitted successfully!'])
      
      setSubmitSuccess(true)
      
      // Reset form after successful submission
      reset({
        assetGroup: "",
        commodityType: "Select commodity type",
        volume: "",
        unit: "bbls",
        origin: "",
        destination: "",
        transportMode: "Select transport mode",
        connection: "",
        startDate: "",
        endDate: "",
        notes: ""
      })
      
      // Close all dropdowns
      setCommodityTypeOpen(false)
      setCommoditySubMenuOpen(false)
      setSelectedCommodity(null)
      setUnitOpen(false)
      setTransportModeOpen(false)
      
    } catch (error: any) {
      console.error('API Error:', error)
      setDebugSteps(prev => [...prev, `Error: ${error.response?.data?.message || error.message}`])
      setSubmitError(error.response?.data?.message || 'Failed to submit nomination. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Form submit handler
  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data)
    submitNomination(data)
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
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-['roboto']">Asset Group</label>
                    <input
                      type="text"
                      placeholder="Enter Asset Group"
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 text-sm font-medium text-neutral-600 font-['roboto'] placeholder:text-neutral-600"
                      {...register("assetGroup")}
                    />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-xs text-neutral-600 font-['roboto']">Commodity Type</label>
                    <div 
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 flex items-center justify-between cursor-pointer"
                      onClick={() => setCommodityTypeOpen(!commodityTypeOpen)}
                    >
                      <span className="text-sm font-medium text-neutral-600 font-['roboto']">{watch("commodityType")}</span>
                      <ChevronDown className="w-4 h-4 text-neutral-600" />
                    </div>
                    {/* Commodity Type Dropdown with Submenu */}
                    {commodityTypeOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-[0px_10px_30px_0px_rgba(0,0,0,0.10)] z-10 border border-gray-200 overflow-hidden">
                        <div className="px-4 py-2 bg-primary">
                          <div className="text-sm font-semibold text-white font-['Manrope']">Select commodity type</div>
                        </div>
                        {commodityTypes.map((type, index) => (
                          <div 
                            key={index}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer relative"
                            onClick={() => {
                              if (type.subOptions) {
                                setSelectedCommodity(type)
                                setCommoditySubMenuOpen(true)
                                setCommodityTypeOpen(false)
                              } else {
                                setValue("commodityType", type.name)
                                setCommodityTypeOpen(false)
                              }
                            }}
                          >
                            <div className="text-sm font-normal text-neutral-600 font-['Manrope']">{type.name}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Commodity Submenu */}
                    {commoditySubMenuOpen && selectedCommodity && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-[0px_10px_30px_0px_rgba(0,0,0,0.10)] z-20 border border-gray-200 overflow-hidden">
                        <div className="px-4 py-2 bg-primary">
                          <div className="text-sm font-semibold text-white font-['Manrope']">Commodity List for Nominations {selectedCommodity.name}</div>
                        </div>
                        {selectedCommodity.subOptions?.map((subOption: any, index: number) => (
                          <div 
                            key={index}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setValue("commodityType", subOption.name)
                              setCommoditySubMenuOpen(false)
                              setSelectedCommodity(null)
                            }}
                          >
                            <div className="text-sm font-normal text-neutral-600 font-['Manrope']">{subOption.name}</div>
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
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-['roboto']">Connection</label>
                    <input
                      type="text"
                      placeholder="Remarks"
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 text-sm font-medium text-neutral-600 font-['roboto'] placeholder:text-neutral-600"
                      {...register("connection")}
                    />
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
                    <label className="text-xs text-neutral-600 font-['roboto']">Start Date</label>
                    <input
                      type="date"
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 text-sm font-medium text-neutral-600 font-['roboto']"
                      {...register("startDate")}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-['roboto']">End Date</label>
                    <input
                      type="date"
                      className="h-12 px-5 py-4 rounded-[10px] border border-gray-200 text-sm font-medium text-neutral-600 font-['roboto']"
                      {...register("endDate")}
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

          {/* Success/Error Messages */}
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-800 text-sm font-medium">
                ✅ Nomination submitted successfully!
              </div>
            </div>
          )}
          
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-800 text-sm font-medium">
                ❌ {submitError}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end">
            <div className="flex gap-4 w-96">
              <button 
                type="button"
                className="w-40 px-4 py-2 bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setSubmitSuccess(false)
                  setSubmitError(null)
                  setShowDebugBox(false)
                }}
              >
                <span className="text-sm font-medium text-neutral-800 font-['Manrope']">Cancel</span>
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center transition-colors ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary/90 cursor-pointer'
                }`}
              >
                <span className="text-sm font-medium text-white font-['Manrope']">
                  {isSubmitting ? 'Submitting...' : 'Submit Nomination'}
                </span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Debug Box */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-[1274px] w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Debug Console</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDebugBox(!showDebugBox)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              {showDebugBox ? 'Hide' : 'Show'} Debug
            </button>
            <button
              onClick={() => {
                setDebugSteps([])
                setDebugData(null)
                setSubmitSuccess(false)
                setSubmitError(null)
              }}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Clear
            </button>
          </div>
        </div>

        {showDebugBox && (
          <div className="space-y-4">
            {/* Debug Steps */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Debug Steps:</h4>
              <div className="bg-black text-green-400 p-3 rounded font-mono text-sm max-h-40 overflow-y-auto">
                {debugSteps.length === 0 ? (
                  <div className="text-gray-500">No debug steps yet...</div>
                ) : (
                  debugSteps.map((step, index) => (
                    <div key={index} className="mb-1">
                      {step}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* API Response Data */}
            {debugData && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">API Response Data:</h4>
                <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs min-h-60 overflow-y-auto">
                  <pre>{JSON.stringify(debugData, null, 2)}</pre>
                </div>
              </div>
            )}

            {/* Token Info */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Token Information:</h4>
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
                <div className="font-mono break-all">
                  <strong>Token:</strong> {localStorage.getItem('token') || 'No token found'}
                </div>
                <div className="mt-2">
                  <strong>Token Length:</strong> {localStorage.getItem('token')?.length || 0} characters
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}