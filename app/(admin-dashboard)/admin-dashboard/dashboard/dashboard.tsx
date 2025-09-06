"use client";
import React, { useState } from "react";
import DynamicTable from "../../_components/reusable/DynamicTable";

import { AdminData } from "../../../lib/admindata";
import PlusIcon from "@/public/admin-dashboard/icons/PlusIcon";
import { UpcomingMeetingColumn } from "../../_components/columns/UpcomingMettingColumn";
import SubmitIcon from "@/public/admin-dashboard/icons/SubmitIcon";
import ConfirmedIcon from "@/public/admin-dashboard/icons/ConfirmedIcon";
import StarCalenderIcon from "@/public/admin-dashboard/icons/StarCalenderIcon";
import OverviewCard from "./_components/OverviewCard";
import { nominationColumn } from "../../_components/columns/NominationColumn";
import BoxIcon from "@/public/admin-dashboard/icons/BoxIcon";
import Footer from "../../_components/footer";
import NominationModal from "../../_components/reusable/CustomModal";
import { ChartAreaDefault } from "./_components/ChartAreaDefault";
import { ChartPieDonutText } from "./_components/ChartPieDonutText";

const iconComponents: { [key: string]: React.JSX.Element } = {
  SubmitIcon: <SubmitIcon />,
  ConfirmIcon: <ConfirmedIcon />,
  StarCalenderIcon: <StarCalenderIcon />,
};

export default function Dashboard() {
  const { nominations, dashboardStats, meetings } = AdminData;

  const sliceNominationData = nominations.slice(0, 5);
  const sliceMeetingData = meetings.slice(0, 5);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const columns = nominationColumn(handleOpenModal);

  return (
    <div className=" ">
      {/* header */}
      <div className="flex justify-between items-center  ">
        <div>
          <h1 className="text-[#1D1F2C] text-3xl font-semibold">
            Welcome Admin !
          </h1>
          <p className="text-graytext text-lg">
            Here's what's happening today.
          </p>
        </div>

        <button className="flex items-center bg-primary text-white py-2 px-4 rounded-lg gap-2 cursor-pointer border border-transparent hover:bg-transparent hover:border-primary hover:text-primary transition-all duration-300">
          <PlusIcon />
          Create New Nomination
        </button>
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
          <button className="text-sm font-semibold text-primary border border-[#E7ECF4] py-2 px-6 rounded-lg cursor-pointer btn_box_shadow">
            View All
          </button>
        </div>

        <DynamicTable
          columns={columns}
          data={sliceNominationData}
          hasWrapperBorder={true}
          wrapperBorderColor="#E7ECF4"
          headerStyles={{
            backgroundColor: "#F5F8FA",
            textColor: "#625F6E",
            fontSize: "14px",
            padding: "12px 16px",
            fontWeight: "500",
          }}
          cellBorderColor="#E7ECF4"
        />
      </div>

      {/* upcoming meeting table */}
      <div className="mt-6">
        <div className="px-6 py-5 flex items-center justify-between bg-white rounded-t-2xl border-x border-[#E7ECF4]">
          <h2 className="text-lg font-semibold text-graytext">
            Upcoming Meetings
          </h2>
          <button className="text-sm font-semibold text-primary border border-[#E7ECF4] py-2 px-6 rounded-lg cursor-pointer btn_box_shadow">
            View All
          </button>
        </div>
        <DynamicTable
          columns={UpcomingMeetingColumn}
          data={sliceMeetingData}
          hasWrapperBorder={true}
          wrapperBorderColor="#E7ECF4"
          headerStyles={{
            backgroundColor: "#F5F8FA",
            textColor: "#625F6E",
            fontSize: "14px",
            padding: "12px 16px",
            fontWeight: "500",
          }}
          cellBorderColor="#E7ECF4"
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
