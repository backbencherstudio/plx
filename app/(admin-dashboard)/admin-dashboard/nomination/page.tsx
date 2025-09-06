'use client'
import CalenderIcon from '@/public/nominations/icons/CalenderIcon';
import React, { useRef } from 'react'
import NominationTop from './_components/NominationTop';
import NominationBottom from './_components/NominationBottom';

export default function Page() {

//  const inputRef = useRef<HTMLInputElement>(null);


  return (
    <div>
     <div className="flex justify-between items-center  ">
      {/* header */}
            <div>
              <h1 className="text-[#1D1F2C] text-3xl font-semibold">
               Nominations
              </h1>
              <p className="text-graytext text-lg">
                Manage your commodity transport requests
              </p>
            </div>
          </div>
    
            <NominationTop/>
            <NominationBottom/>


          
    {/* ===================================================== */}
     {/* <div className="relative w-[200px]">
      <input
        type="date"
        ref={inputRef}
        className="w-full p-2 pr-10 border rounded-lg appearance-none"
      />
      <span
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={() => inputRef.current?.showPicker?.()}
      >
        <CalenderIcon />
      </span>
    </div> */}


    </div>
  )
}
