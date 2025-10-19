"use client";
import React, { useEffect, useState } from "react";
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
import { getCalculation } from "@/services/AdminDashboard";

const iconComponents: { [key: string]: React.JSX.Element } = {
  SubmitIcon: <SubmitIcon />,
  ConfirmIcon: <ConfirmedIcon />,
  StarCalenderIcon: <StarCalenderIcon />,
};

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedNomination, setSelectedNomination] = useState<any | null>(null);
  const [calculationData, setCalculationData] = useState<any>(null);

  // 🔹 fetch dashboard statistics
  const getStaticsData = async () => {
    try {
      const res = await getCalculation();
      if (res.success) {
        setCalculationData(res.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    getStaticsData();
  }, []);

  const handleOpenModal = (row: any) => {
    setSelectedNomination(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNomination(null);
  };

  // 🔹 prepare overview cards dynamically from API
  const overviewCards = calculationData
    ? [
        {
          title: "Submitted Nominations",
          value: calculationData.nominations.submitted.count,
          change: `  ${
            calculationData.nominations.submitted.percentage
          }%`,
          RightIcon: iconComponents["SubmitIcon"],
          trend: calculationData.nominations.submitted.trend,
        },
        {
          title: "Completed Nominations",
          value: calculationData.nominations.complete.count,
          change: ` ${
            calculationData.nominations.complete.percentage
          }%`,
          RightIcon: iconComponents["ConfirmIcon"],
          trend: calculationData.nominations.complete.trend,
        },
        {
          title: "Schedules",
          value: calculationData.schedules.count,
          change: `  ${
            calculationData.schedules.percentage
          }%`,
          RightIcon: iconComponents["StarCalenderIcon"],
          trend: calculationData.schedules.trend,
        },
      ]
    : [];

  return (
    <div className="">
      {/* header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#1D1F2C] text-3xl font-semibold">
            Welcome Miguel Trevino!
          </h1>
          <p className="text-graytext text-lg">Here's what's happening today.</p>
        </div>

        <Link
          href="/admin-dashboard/nomination"
          className="flex items-center bg-primary text-white py-2 px-4 rounded-lg gap-2 cursor-pointer border border-transparent hover:bg-transparent hover:border-primary hover:text-primary transition-all duration-300"
        >
          <PlusIcon />
          Create New Nomination
        </Link>
      </div>

      {/* overview cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
        {overviewCards.length > 0 ? (
          overviewCards.map((card, index) => (
            <OverviewCard
              key={index}
              title={card.title}
              value={card.value}
              change={card.change}
              RightIcon={card.RightIcon}
            />
          ))
        ) : (
          <p className="text-gray-400">Loading statistics...</p>
        )}
      </div>

      {/* schedule statistics line chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <ChartAreaDefault />
        </div>
        <div className="bg-white rounded-2xl">
          <ChartPieDonutText />
        </div>
      </div>

      {/* nomination table */}
      <div>
        <div className="px-6 py-5 flex items-center justify-between bg-white rounded-t-2xl border-x border-[#E7ECF4]">
          <h2 className="text-lg font-semibold text-graytext">Nominations</h2>
          <Link
            href="/admin-dashboard/nomination"
            className="text-sm font-semibold text-primary border border-[#E7ECF4] py-2 px-6 rounded-lg cursor-pointer btn_box_shadow"
          >
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
          <Link
            href="/admin-dashboard/meetings"
            className="text-sm font-semibold text-primary border border-[#E7ECF4] py-2 px-6 rounded-lg cursor-pointer btn_box_shadow"
          >
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
        <NominationModal
          open={openModal}
          onClose={handleCloseModal}
          data={selectedNomination}
        />
      )}
    </div>
  );
}
