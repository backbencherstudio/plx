'use client'
import CalenderIcon from '@/public/nominations/icons/CalenderIcon';
import React, { useRef } from 'react'
import NominationTop from './_components/NominationTop';
import NominationTable from '../../_components/reusable/NominationTable';

export default function Page() {
  const handleOpenModal = (row: any) => {
    console.log('Opening modal for row:', row);
    // Handle modal opening logic here
  };

  const handleDeleted = () => {
    console.log('Nomination deleted, refreshing...');
    // Handle refresh logic here
  };

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
      <NominationTable
        showFilters={true}
        showPagination={true}
        limit={10}
        handleOpenModal={handleOpenModal}
        onDeleted={handleDeleted}
      />
    </div>
  )
}
