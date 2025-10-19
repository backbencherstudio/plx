"use client"

import { ChevronDown, Download, FileText, Eye, Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { getMySchedules } from "@/services/scheduleService"
import axiosClient from "@/lib/axiosclient"

interface SchedulesTableProps {
  onViewDetail: (scheduleId: string) => void;
}

export function SchedulesTable({ onViewDetail }: SchedulesTableProps) {
  const [commodityFilter, setCommodityFilter] = useState<string>("")
  const [scheduleMonthFilter, setScheduleMonthFilter] = useState<string>("")
  const [transportModeFilter, setTransportModeFilter] = useState<string>("")
  const [showCommodityDropdown, setShowCommodityDropdown] = useState(false)
  const [showScheduleMonthDropdown, setShowScheduleMonthDropdown] = useState(false)
  const [showTransportDropdown, setShowTransportDropdown] = useState(false)

  // API state
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [apiData, setApiData] = useState<any[]>([])
  const [pagination, setPagination] = useState<any>(null)
  const [debugOpen, setDebugOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [tokenPreview, setTokenPreview] = useState<string | null>(null)

  const page = 1
  const itemsPerPage = 50

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    setTokenPreview(token ? `${token.substring(0, 24)}...` : null)
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setApiError(null)
        const res = await getMySchedules(page, itemsPerPage)
        setApiData(res?.data || [])
        setPagination(res?.pagination || null)
        setDebugInfo({
          baseURL: (axiosClient.defaults as any).baseURL,
          path: "/api/v1/schedule/my",
          params: { page, limit: itemsPerPage },
          pagination: res?.pagination,
        })
      } catch (e: any) {
        setApiError(e?.response?.data?.message || e?.message || 'Failed to fetch schedules')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Function to get transportation mode colors
  const getTransportationModeColor = (mode: string) => {
    switch (mode) {
      case "Pipeline":
        return { bg: "bg-slate-200", text: "text-blue-900" }
      case "Trucking":
        return { bg: "bg-emerald-50", text: "text-teal-800" }
      case "Railcar":
        return { bg: "bg-purple-100", text: "text-violet-700" }
      case "Marine":
        return { bg: "bg-yellow-50", text: "text-yellow-800" }
      default:
        return { bg: "bg-slate-200", text: "text-blue-900" }
    }
  }

  // Get unique values for dropdowns from API data
  const uniqueCommodities = useMemo(() => {
    return Array.from(new Set((apiData || []).map((item: any) => item.commodityType).filter(Boolean)))
  }, [apiData])

  const uniqueScheduleMonths = useMemo(() => {
    return Array.from(new Set((apiData || []).map((item: any) => item.scheduleMonth).filter(Boolean)))
  }, [apiData])

  const uniqueTransportModes = useMemo(() => {
    return Array.from(new Set((apiData || []).map((item: any) => item.transportMode).filter(Boolean)))
  }, [apiData])

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return (apiData || []).filter((item: any) => {
      const commodityMatch = !commodityFilter || item.commodityType === commodityFilter
      const scheduleMonthMatch = !scheduleMonthFilter || item.scheduleMonth === scheduleMonthFilter
      const transportMatch = !transportModeFilter || item.transportMode === transportModeFilter
      return commodityMatch && scheduleMonthMatch && transportMatch
    })
  }, [apiData, commodityFilter, scheduleMonthFilter, transportModeFilter])

  const handleCommoditySelect = (commodity: string) => {
    setCommodityFilter(commodity === commodityFilter ? "" : commodity)
    setShowCommodityDropdown(false)
  }

  const handleScheduleMonthSelect = (scheduleMonth: string) => {
    setScheduleMonthFilter(scheduleMonth === scheduleMonthFilter ? "" : scheduleMonth)
    setShowScheduleMonthDropdown(false)
  }

  const handleTransportSelect = (transport: string) => {
    setTransportModeFilter(transport === transportModeFilter ? "" : transport)
    setShowTransportDropdown(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 max-w-[1274px] w-full mx-auto">
      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <h1 className="text-neutral-600 text-lg font-medium font-sans">Schedules</h1>
          
        </div>
        <div className="flex items-center gap-6">
          {/* Commodity Filter */}
          <div className="relative">
            <Button
              variant="outline"
              className={`h-9 px-4 py-1.5 bg-slate-50 rounded-[10px] border border-slate-200 text-xs font-normal ${
                commodityFilter ? 'text-blue-600 border-blue-300' : 'text-muted-foreground'
              }`}
              onClick={() => {
                setShowCommodityDropdown(!showCommodityDropdown)
                setShowScheduleMonthDropdown(false)
                setShowTransportDropdown(false)
              }}
            >
              {commodityFilter || "Commodity"}
              <ChevronDown className={`w-4 h-4 ml-6 transition-transform ${showCommodityDropdown ? 'rotate-180' : ''}`} />
            </Button>
            
            {showCommodityDropdown && (
              <div className="fixed top-auto left-auto mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50" style={{ top: '120px', left: 'calc(100% - 400px)' }}>
                <div className="py-1">
                  <button
                    className="w-full px-4 py-2 text-left text-xs hover:bg-slate-50 text-muted-foreground"
                    onClick={() => handleCommoditySelect("")}
                  >
                    All Commodities
                  </button>
                  {uniqueCommodities.map((commodity) => (
                    <button
                      key={commodity}
                      className={`w-full px-4 py-2 text-left text-xs hover:bg-slate-50 ${
                        commodityFilter === commodity ? 'bg-blue-50 text-blue-600' : 'text-neutral-600'
                      }`}
                      onClick={() => handleCommoditySelect(commodity)}
                    >
                      {commodity}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Schedule Month Filter */}
          <div className="relative">
            <Button
              variant="outline"
              className={`h-9 px-4 py-1.5 bg-slate-50 rounded-[10px] border border-slate-200 text-xs font-normal ${
                scheduleMonthFilter ? 'text-blue-600 border-blue-300' : 'text-muted-foreground'
              }`}
              onClick={() => {
                setShowScheduleMonthDropdown(!showScheduleMonthDropdown)
                setShowCommodityDropdown(false)
                setShowTransportDropdown(false)
              }}
            >
              {scheduleMonthFilter || "Schedule Month"}
              <ChevronDown className={`w-4 h-4 ml-6 transition-transform ${showScheduleMonthDropdown ? 'rotate-180' : ''}`} />
            </Button>
            
            {showScheduleMonthDropdown && (
              <div className="fixed top-auto left-auto mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50" style={{ top: '120px', left: 'calc(100% - 300px)' }}>
                <div className="py-1">
                  <button
                    className="w-full px-4 py-2 text-left text-xs hover:bg-slate-50 text-muted-foreground"
                    onClick={() => handleScheduleMonthSelect("")}
                  >
                    All Months
                  </button>
                  {uniqueScheduleMonths.map((scheduleMonth) => (
                    <button
                      key={scheduleMonth}
                      className={`w-full px-4 py-2 text-left text-xs hover:bg-slate-50 ${
                        scheduleMonthFilter === scheduleMonth ? 'bg-blue-50 text-blue-600' : 'text-neutral-600'
                      }`}
                      onClick={() => handleScheduleMonthSelect(scheduleMonth)}
                    >
                      {scheduleMonth}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Transportation Mode Filter */}
          <div className="relative">
            <Button
              variant="outline"
              className={`h-9 px-4 py-1.5 bg-slate-50 rounded-[10px] border border-slate-200 text-xs font-normal ${
                transportModeFilter ? 'text-blue-600 border-blue-300' : 'text-muted-foreground'
              }`}
              onClick={() => {
                setShowTransportDropdown(!showTransportDropdown)
                setShowCommodityDropdown(false)
                setShowScheduleMonthDropdown(false)
              }}
            >
              {transportModeFilter || "Transportation Mode"}
              <ChevronDown className={`w-4 h-4 ml-6 transition-transform ${showTransportDropdown ? 'rotate-180' : ''}`} />
            </Button>
            
            {showTransportDropdown && (
              <div className="fixed top-auto left-auto mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50" style={{ top: '120px', left: 'calc(100% - 200px)' }}>
                <div className="py-1">
                  <button
                    className="w-full px-4 py-2 text-left text-xs hover:bg-slate-50 text-muted-foreground"
                    onClick={() => handleTransportSelect("")}
                  >
                    All Modes
                  </button>
                  {uniqueTransportModes.map((transport) => (
                    <button
                      key={transport}
                      className={`w-full px-4 py-2 text-left text-xs hover:bg-slate-50 ${
                        transportModeFilter === transport ? 'bg-blue-50 text-blue-600' : 'text-neutral-600'
                      }`}
                      onClick={() => handleTransportSelect(transport)}
                    >
                      {transport}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Debugger */}
      {debugOpen && (
        <div className="mx-6 mb-4 p-3 rounded-lg border bg-[#F5F8FA] text-xs text-[#4A4C56]">
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">API Debugger</div>
            <div className="opacity-70">Token: {tokenPreview || 'none'}</div>
          </div>
          {apiError && <div className="text-red-600 mb-2">Error: {apiError}</div>}
          <pre className="overflow-auto max-h-40">{JSON.stringify({ ...debugInfo, pagination }, null, 2)}</pre>
        </div>
      )}

      {/* Table */}
      <div className="border-t border-zinc-200/30 relative">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#f5f8fa] shadow-sm">
              <th className="w-[500px] h-10 px-4 py-3 text-left">
                <div className="text-muted-foreground text-xs font-medium font-sans">File</div>
              </th>
              <th className="w-64 h-10 px-4 py-3 text-left">
                <div className="text-muted-foreground text-xs font-medium font-sans">Asset Group</div>
              </th>
              <th className="w-64 h-10 px-4 py-3 text-left">
                <div className="text-muted-foreground text-xs font-medium font-sans">Commodity</div>
              </th>
              <th className="w-64 h-10 px-4 py-3 text-left">
                <div className="text-muted-foreground text-xs font-medium font-sans">Schedule Month</div>
              </th>
              <th className="w-44 h-10 px-4 py-3 text-left">
                <div className="text-muted-foreground text-xs font-medium font-sans">Upload Date</div>
              </th>
              <th className="w-44 h-10 px-4 py-3 text-left">
                <div className="text-muted-foreground text-xs font-medium font-sans">Transportation Mode</div>
              </th>
              <th className="h-10 px-4 py-3 text-left">
                <div className="text-muted-foreground text-xs font-medium font-sans">Actions</div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="h-20 px-4 py-3 text-center">
                  <div className="text-neutral-500 text-sm">Loading schedules...</div>
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item: any) => (
                <tr key={item.id} className="border-t border-slate-200">
                  {/* File Column */}
                  <td className="w-[500px] h-20 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${getTransportationModeColor(item.transportMode).bg} rounded-lg flex items-center justify-center`}>
                        <FileText className={`w-5 h-5 ${getTransportationModeColor(item.transportMode).text}`} />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="text-neutral-600 text-sm font-medium font-sans leading-tight">{(() => {
                          const url = item.scheduleFile || ""
                          try { return decodeURIComponent(url.split('/').pop() || url) } catch { return url }
                        })()}</div>
                        {/* <div className="text-zinc-500 text-xs font-normal font-sans leading-none">{item.file.description}</div> */}
                      </div>
                    </div>
                  </td>

                  {/* Asset Group Column */}
                  <td className="w-64 h-20 px-4 py-3">
                    <div className="text-neutral-600 text-sm font-medium font-sans">{item.assetGroup}</div>
                  </td>

                  {/* Commodity Column */}
                  <td className="w-64 h-20 px-4 py-3">
                    <div className="text-neutral-600 text-sm font-medium font-sans">{item.commodityType}</div>
                  </td>

                  {/* Schedule Month Column */}
                  <td className="w-64 h-20 px-4 py-3">
                    <div className="text-neutral-600 text-sm font-medium font-sans">{item.scheduleMonth}</div>
                  </td>

                  {/* Upload Date Column */}
                  <td className="w-44 h-20 px-4 py-3 opacity-80">
                    <div className="text-neutral-600 text-sm font-medium font-sans">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</div>
                  </td>

                  {/* Transportation Mode Column */}
                  <td className="w-44 h-20 px-4 py-3">
                    <div className={`w-20 h-8 p-1 ${getTransportationModeColor(item.transportMode).bg} rounded-full flex justify-center items-center`}>
                      <div className={`text-sm font-medium font-sans ${getTransportationModeColor(item.transportMode).text}`}>{item.transportMode}</div>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="h-20 px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-slate-100"
                        onClick={() => onViewDetail(item.id)}
                      >
                        <Eye className="w-4 h-4 text-neutral-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-slate-100"
                        onClick={() => item.scheduleFile && window.open(item.scheduleFile, '_blank')}
                      >
                        <Download className="w-4 h-4 text-neutral-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="h-20 px-4 py-3 text-center">
                  <div className="text-neutral-500 text-sm">No schedules found matching the selected filters.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Click outside to close dropdowns */}
      {(showCommodityDropdown || showScheduleMonthDropdown || showTransportDropdown) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowCommodityDropdown(false)
            setShowScheduleMonthDropdown(false)
            setShowTransportDropdown(false)
          }}
        />
      )}
    </div>
  )
}
