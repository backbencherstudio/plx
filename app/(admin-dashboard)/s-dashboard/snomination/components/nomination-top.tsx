"use client"

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { RequestNominationForm } from './request-nomination-form'

export default function NominationTop() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleRequestNominationClick = () => {
    setIsFormOpen(true)
  }

  const handleFormToggle = (isExpanded: boolean) => {
    setIsFormOpen(isExpanded)
  }

  return (
    <div className="w-full max-w-[1274px] mx-auto py-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-neutral-800 text-3xl font-semibold font-['Manrope'] leading-10">
            Nominations
          </h1>
          <p className="text-neutral-600 text-base font-normal font-['Manrope'] leading-7">
            Create your commodity transport requests
          </p>
        </div>
        
        <button 
          onClick={handleRequestNominationClick}
          className="px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="text-base font-medium font-['Manrope']">
            Request Nomination
          </span>
        </button>
      </div>

      <RequestNominationForm isOpen={isFormOpen} onToggle={handleFormToggle} />
    </div>
  )
}
