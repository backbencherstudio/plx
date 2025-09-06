import React from "react";
import GrowthIcon from "@/public/admin-dashboard/icons/GrowthIcon";

interface OverviewCardProps {
  title: string;
  value: number | string;
  change: string;
   
  RightIcon: React.ReactNode;
}

export default function OverviewCard({
  title,
  value,
  change,
 
  RightIcon,
}: OverviewCardProps) {
  return (
    <div className="flex justify-between   items-start bg-white  py-4 px-6 rounded-2xl">
      {/* Left Content */}
      <div>
        <p className="text-graytext text-base">{title}</p>
        <h4 className="text-primary text-2xl font-bold mb-4 mt-2">{value}</h4>
        <div className="flex items-center gap-1">
          <GrowthIcon />
          <p className="text-[#777980] text-sm">
            <span className="text-[#22CAAD] font-semibold">{change} </span> 
            This Month   
          </p>
        </div>
      </div>

      {/* Right Icon */}
      <div className="bg-color11 p-3.5 rounded-full">{RightIcon}</div>
    </div>
  );
}
