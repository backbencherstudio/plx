"use client";
import React, { useState } from "react";
import { AdminData } from "../../../lib/admindata";
import PlusIcon from "@/public/admin-dashboard/icons/PlusIcon";
import SubmitIcon from "@/public/admin-dashboard/icons/SubmitIcon";
import ConfirmedIcon from "@/public/admin-dashboard/icons/ConfirmedIcon";
import StarCalenderIcon from "@/public/admin-dashboard/icons/StarCalenderIcon";
import OverviewCard from "./_components/OverviewCard";
import Footer from "../../_components/footer";
import NominationModal from "../../_components/reusable/CustomModal";
import { ChartAreaDefault } from "./_components/ChartAreaDefault";
import { ChartPieDonutText } from "./_components/ChartPieDonutText";
import Link from "next/link";
import NominationTable from "../../_components/reusable/NominationTable";
import MeetingTable from "../../_components/reusable/MeetingTable";

const iconComponents: { [key: string]: React.JSX.Element } = {
  SubmitIcon: <SubmitIcon />,
  ConfirmIcon: <ConfirmedIcon />,
  StarCalenderIcon: <StarCalenderIcon />,
};

export default function Dashboard() {
  const { dashboardStats } = AdminData;

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className=" ">
      {/* header */}
      <div className="flex justify-between items-center  ">
        <div>
          <h1 className="text-[#1D1F2C] text-3xl font-semibold">
           Welcome Miguel Trevino!
          </h1>
          <p className="text-graytext text-lg">
            Here's what's happening today.
          </p>
        </div>

        <Link href='/admin-dashboard/nomination' className="flex items-center bg-primary text-white py-2 px-4 rounded-lg gap-2 cursor-pointer border border-transparent hover:bg-transparent hover:border-primary hover:text-primary transition-all duration-300">
          <PlusIcon />
          Create New Nomination
        </Link>
      </div>

      {/* overview card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
        {dashboardStats.map((state, index) => (
          <OverviewCard
            key={index}
            title={state.title}
            value={state.value}
            change={state.change}
            RightIcon={iconComponents[state.RightIcon]}
          />
        ))}
      </div>

      {/* schedule statistics line chart */}
      <div className="  grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className=" lg:col-span-2">
          <ChartAreaDefault/>
        </div>
        <div className=" bg-white rounded-2xl"> 
          <ChartPieDonutText/>
        </div>
      </div>

      {/* nomination table */}
      <div>
        <div className="px-6 py-5 flex items-center justify-between bg-white rounded-t-2xl border-x border-[#E7ECF4]">
          <h2 className="text-lg font-semibold text-graytext">Nominations</h2>
          <Link href='/admin-dashboard/nomination' className="text-sm font-semibold text-primary border border-[#E7ECF4] py-2 px-6 rounded-lg cursor-pointer btn_box_shadow">
            View All
          </Link>
        </div>

        <NominationTable
          showFilters={false}
          showPagination={false}
          limit={5}
          handleOpenModal={handleOpenModal}
        />
      </div>

      {/* upcoming meeting table */}
      <div className="mt-6">
        <div className="px-6 py-5 flex items-center justify-between bg-white rounded-t-2xl border-x border-[#E7ECF4]">
          <h2 className="text-lg font-semibold text-graytext">
            Upcoming Meetings
          </h2>
          <Link href='/admin-dashboard/meetings' className="text-sm font-semibold text-primary border border-[#E7ECF4] py-2 px-6 rounded-lg cursor-pointer btn_box_shadow">
            View All
          </Link>
        </div>
        
        <MeetingTable
          showFilters={false}
          showPagination={false}
          limit={5}
          status="scheduled"
        />
      </div>

      <Footer />

      {/* Modal */}
      {openModal && (
        <NominationModal open={openModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}
