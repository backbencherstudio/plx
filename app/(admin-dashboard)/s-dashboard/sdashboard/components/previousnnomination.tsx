"use client"
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Eye, ArrowRight, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { userData } from '@/app/lib/userdata'
import { NominationDetailsModal } from './nomination-details-modal'
import axiosClient from '@/lib/axiosclient'

// API data will be used instead of static data

export default function Previousnnomination() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNomination, setSelectedNomination] = useState<any>(null)
  
  // Filter states
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Fixed at 10 items per page

  // Debug states
  const [debugData, setDebugData] = useState<any>(null)
  const [debugSteps, setDebugSteps] = useState<string[]>([])
  const [showDebugBox, setShowDebugBox] = useState(false)

  // API data states
  const [apiData, setApiData] = useState<any[]>([])
  const [apiPagination, setApiPagination] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null)

  // Refs for date inputs
  const fromDateRef = useRef<HTMLInputElement>(null)
  const toDateRef = useRef<HTMLInputElement>(null)

  const handleViewNomination = (nomination: any) => {
    setSelectedNomination(nomination)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedNomination(null)
  }

  // Handle calendar icon clicks
  const handleFromCalendarClick = () => {
    fromDateRef.current?.showPicker()
  }

  const handleToCalendarClick = () => {
    toDateRef.current?.showPicker()
  }


  // Safely hydrate token on client only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthToken(localStorage.getItem('token'))
    }
  }, [])

  const test = async (tokenParam?: string | null) => {
    try {
      setIsLoading(true)
      setDebugSteps(prev => [...prev, '1. Starting API call...'])
      const headerToken = typeof window !== 'undefined' ? (tokenParam ?? authToken ?? localStorage.getItem('token')) : tokenParam ?? authToken
      setDebugSteps(prev => [...prev, `2. Token retrieved: ${headerToken ? 'Present' : 'Not found'}`])
      setDebugSteps(prev => [...prev, '3. Making GET request to nomination API...'])
      
      const res = await axiosClient.get(`/api/v1/nomination/my`)
      
      setDebugSteps(prev => [...prev, '4. API call successful!'])
      setDebugSteps(prev => [...prev, `5. Response status: ${res.status}`])
      setDebugSteps(prev => [...prev, '6. Processing response data...'])
      
      console.log(res.data)
      setDebugData(res.data)
      
      // Store API data for table
      if (res.data && res.data.data) {
        setApiData(res.data.data)
        setApiPagination(res.data.pagination)
        setDebugSteps(prev => [...prev, '7. API data stored for table display'])
      }
      
      setDebugSteps(prev => [...prev, '8. Data stored in debug state'])
    } catch (error) {
      setDebugSteps(prev => [...prev, `Error: ${error}`])
      console.error('API Error:', error)
    } finally {
      setIsLoading(false)
    }
  }
 
  useEffect(() => {
    // Trigger API only after token is available (or at least once on client)
    if (typeof window !== 'undefined') {
      test(authToken)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken])









  // Filter data based on date range using API data
  const filteredData = useMemo(() => {
    let filtered = apiData

    if (fromDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.requestedDate)
        const fromDateObj = new Date(fromDate)
        return itemDate >= fromDateObj
      })
    }

    if (toDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.requestedDate)
        const toDateObj = new Date(toDate)
        return itemDate <= toDateObj
      })
    }

    return filtered
  }, [apiData, fromDate, toDate])

  // Pagination calculations - use API pagination if available, otherwise client-side
  const totalItems = apiPagination ? apiPagination.totalItems : filteredData.length
  const totalPages = apiPagination ? apiPagination.totalPages : Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = apiPagination ? filteredData : filteredData.slice(startIndex, endIndex)

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  
  return (
    <>
      <div className="w-full max-w-[1274px] mx-auto">
        <div className="w-full bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          {/* Header with filters */}
          <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200">
            <h2 className="text-neutral-900 text-base font-semibold font-['Manrope']">
              Your Previous Nominations
            </h2>
            <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="flex justify-start items-center gap-2">
                <div className="justify-start text-Text-Secondary text-xs font-medium font-['Roboto'] leading-none">
                  From
                </div>
                <div className="h-8 px-4 py-1.5 bg-slate-50 rounded-[10px] outline-1 outline-slate-200 flex justify-start items-center gap-6">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="justify-start text-Text-Secondary text-xs font-normal font-['Roboto'] leading-none bg-transparent border-none outline-none [&::-webkit-calendar-picker-indicator]:hidden"
                    placeholder="mm/dd/yyyy"
                    ref={fromDateRef}
                  />
                  <Calendar className="w-4 h-4 text-zinc-500 cursor-pointer" onClick={handleFromCalendarClick} />
                </div>
              </div>
              <div className="flex justify-start items-center gap-2">
                <div className="justify-start text-Text-Secondary text-xs font-medium font-['Roboto'] leading-none">
                  To
                </div>
                <div className="h-8 px-4 py-1.5 bg-slate-50 rounded-[10px] outline-1 outline-slate-200 flex justify-start items-center gap-6">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="justify-start text-Text-Secondary text-xs font-normal font-['Roboto'] leading-none bg-transparent border-none outline-none [&::-webkit-calendar-picker-indicator]:hidden"
                    placeholder="mm/dd/yyyy"
                    ref={toDateRef}
                  />
                  <Calendar className="w-4 h-4 text-zinc-500 cursor-pointer" onClick={handleToCalendarClick} />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-50 border-b border-zinc-200">
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] w-[10%]">
                    ID
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] whitespace-nowrap w-[11%]">
                    Requested Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] w-[10%]">
                    Commodity
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] w-[10%]">
                    Volume
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] w-[12%]">
                    Route
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] w-[10%]">
                    Connection
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] w-[12%]">
                    Transport
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] whitespace-nowrap w-[11%]">
                    Start Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left whitespace-nowrap text-zinc-700 text-xs font-medium font-['Manrope'] w-[11%]">
                    End Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] w-[3%]">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={10} className="px-3 sm:px-6 py-8 text-center text-neutral-600 text-sm font-medium font-['Manrope']">
                      Loading nominations...
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-3 sm:px-6 py-8 text-center text-neutral-600 text-sm font-medium font-['Manrope']">
                      No nominations found
                    </td>
                  </tr>
                ) : (
                  currentData.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className={`border-b border-slate-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                        {item.nominationId}
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                        {new Date(item.requestedDate).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                        {item.commodityType}
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                        {item.volume} {item.unit}
                      </td>
                      <td className="px-3 sm:px-6 py-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-neutral-600 text-sm font-medium font-['Roboto'] whitespace-nowrap">
                            {item.origin}
                          </span>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-zinc-500" />
                            <span className="text-zinc-500 whitespace-nowrap text-xs font-medium font-['Roboto']">
                              {item.destination}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                        {item.connection}
                      </td>
                      <td className="px-3 sm:px-6 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium font-['Roboto'] whitespace-nowrap ${
                          item.transportMode === 'Pipeline' ? 'bg-blue-100 text-blue-900' : 
                          item.transportMode === 'Trucking' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.transportMode}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                        {new Date(item.beginningDate).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                        {new Date(item.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-3">
                        <button 
                          onClick={() => handleViewNomination(item)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors whitespace-nowrap"
                        >
                          <Eye className="w-5 h-5 text-neutral-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Footer */}
          <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-zinc-200">
            <div className="flex justify-start items-start gap-4 sm:gap-6">
              {/* Previous Button */}
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`w-8 h-8 p-2.5 rounded-lg outline-1 outline-gray-100 flex justify-center items-center gap-2.5 overflow-hidden ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4 text-zinc-600" />
              </button>

              {/* Page Numbers */}
              <div className="flex justify-start items-start">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                    disabled={typeof page !== 'number'}
                    className={`w-8 h-8 px-3.5 py-[5px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden ${
                      page === currentPage
                        ? 'bg-stone-50 rounded-[10px] outline-1'
                        : typeof page === 'number'
                        ? 'hover:bg-gray-50 rounded-[10px]'
                        : ''
                    }`}
                  >
                    <div className="justify-start text-neutral-600 text-xs font-medium font-['Roboto'] leading-none">
                      {page}
                    </div>
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 p-2.5 rounded-lg outline-1 outline-gray-100 flex justify-center items-center gap-2.5 overflow-hidden ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                <ChevronRight className="w-4 h-4 text-neutral-600" />
              </button>
            </div>

            {/* Showing info */}
            <div className="flex justify-start items-center gap-4">
              <div className="justify-start text-zinc-700 text-xs font-medium font-['Roboto'] leading-none">
                {apiPagination ? (
                  `Showing ${apiPagination.currentPage * apiPagination.itemsPerPage - apiPagination.itemsPerPage + 1} to ${Math.min(apiPagination.currentPage * apiPagination.itemsPerPage, apiPagination.totalItems)} of ${apiPagination.totalItems} entries`
                ) : (
                  `Showing ${startIndex + 1} to ${Math.min(endIndex, totalItems)} of ${totalItems} entries`
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Debug Box */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
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
                  test()
                }}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Refresh
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
                    <strong>Token:</strong> {authToken || 'No token found'}
                  </div>
                  <div className="mt-2">
                    <strong>Token Length:</strong> {authToken ? authToken.length : 0} characters
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedNomination && (
        <NominationDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          nomination={{
            id: selectedNomination.id,
            name: selectedNomination.nominationId,
            status: selectedNomination.status,
            commodity: selectedNomination.commodityType,
            volume: `${selectedNomination.volume} ${selectedNomination.unit}`,
            origin: selectedNomination.origin,
            destination: selectedNomination.destination,
            connection: selectedNomination.connection,
            transportMode: selectedNomination.transportMode,
            requestedDate: selectedNomination.requestedDate,
            beginningDate: selectedNomination.beginningDate,
            endDate: selectedNomination.endDate,
            notes: selectedNomination.notes || "No additional notes for this nomination request."
          }}
        />
      )}
    </>
  )
}
