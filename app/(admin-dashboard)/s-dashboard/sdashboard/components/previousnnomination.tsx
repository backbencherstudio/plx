"use client"
import React, { useState, useMemo, useRef } from 'react'
import { Download, Eye, ArrowRight, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { userData } from '@/app/lib/userdata'
import { NominationDetailsModal } from './nomination-details-modal'

// Get data from userdata.ts
const nominationData = userData.previousNominations

export default function Previousnnomination() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNomination, setSelectedNomination] = useState<any>(null)
  
  // Filter states
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Fixed at 10 items per page

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

  // Filter data based on date range
  const filteredData = useMemo(() => {
    let filtered = nominationData

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
  }, [fromDate, toDate])

  // Pagination calculations
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

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
      <div className="w-full">
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
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] w-[12%]">
                    File
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
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] w-[12%]">
                    Transport
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-zinc-700 text-xs font-medium font-['Manrope'] whitespace-nowrap w-[11%]">
                    Beginning Date
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
                {currentData.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`border-b border-slate-200 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                      {item.id}
                    </td>
                    <td className="px-3 sm:px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-600 text-sm font-normal font-['Roboto'] whitespace-nowrap">
                          {item.file.name}
                        </span>
                        <Download className="w-4 h-4 text-blue-900" />
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                      {item.requestedDate}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                      {item.commodity}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                      {item.volume}
                    </td>
                    <td className="px-3 sm:px-6 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-neutral-600 text-sm font-medium font-['Roboto'] whitespace-nowrap">
                          {item.route.from}
                        </span>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-zinc-500" />
                          <span className="text-zinc-500 whitespace-nowrap text-xs font-medium font-['Roboto']">
                            {item.route.to}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium font-['Roboto'] whitespace-nowrap ${
                        item.transport.color === 'blue' ? 'bg-blue-100 text-blue-900' : 
                        item.transport.color === 'green' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.transport.type}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                      {item.beginningDate}
                    </td>
                    <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-neutral-600 text-sm font-medium font-['Manrope']">
                      {item.endDate}
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
                ))}
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
                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedNomination && (
        <NominationDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          nomination={{
            id: selectedNomination.id,
            name: selectedNomination.file.name,
            status: "Confirmed",
            commodity: selectedNomination.commodity,
            volume: selectedNomination.volume,
            origin: selectedNomination.route.from,
            destination: selectedNomination.route.to,
            transportMode: selectedNomination.transport.type,
            requestedDate: selectedNomination.requestedDate,
            beginningDate: selectedNomination.beginningDate,
            endDate: selectedNomination.endDate,
            notes: "Additional notes for this nomination request."
          }}
        />
      )}
    </>
  )
}
