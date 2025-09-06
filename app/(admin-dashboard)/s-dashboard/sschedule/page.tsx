"use client"

import React, { useState } from "react";
import { SchedulesTable } from "./components/schedule-table";
import DetailSchedule from "./components/detail-schedule";

export default function Page() {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");

  const handleViewDetail = (scheduleId: string) => {
    setSelectedScheduleId(scheduleId);
    setShowDetail(true);
  };

  const handleBackToTable = () => {
    setShowDetail(false);
    setSelectedScheduleId("");
  };

  return (
    <div>
      {showDetail ? (
        <DetailSchedule onBack={handleBackToTable} scheduleId={selectedScheduleId} />
      ) : (
        <SchedulesTable onViewDetail={handleViewDetail} />
      )}
    </div>
  );
}
