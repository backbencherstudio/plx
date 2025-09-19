"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BoxIcon from "@/public/nominations/icons/BoxIcon";
import CalenderIcon from "@/public/nominations/icons/CalenderIcon";
import LocationIcon from "@/public/nominations/icons/LocationIcon";
 
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import React, { useState } from "react";

export default function NominationTop() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" bg-white p-6 rounded-md mt-6  w-full mx-auto  ">
      {/* header */}
      <div className=" flex justify-between   items-center ">
        <div className="flex items-center gap-4">
          <button
            className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={toggleExpanded}
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-medium text-neutral-800 font-['roboto']">
              Request Nomination
            </h1>
            <p className="text-base text-neutral-600 font-['roboto']">
              Create a new nomination with commodity details and transport
              preferences
            </p>
          </div>
        </div>
        <button
          onClick={toggleExpanded}
          className={
            "w-14 h-8 p-2.5 rounded-lg border border-gray-100 flex items-center justify-center  cursor-pointer"
          }
        >
          <ChevronDown
            className={`w-4 h-4 text-neutral-600 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* new nomination form */}
      <div className="">
        {isExpanded && (
          <div className="mt-7">
            <div>
              <div>
                <h3 className=" text-lg text-[#1D1F2C] font-medium mb-2.5">
                  Choose Subscriber
                </h3>

                {/* select email / name */}

                <Select>
                  <SelectTrigger className="w-full py-5 shadow-none">
                    <SelectValue
                      placeholder="Search by name or email..."
                      className=" text-graytext text-sm"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Sarah Chen</SelectItem>
                      <SelectItem value="banana">Esther Howard</SelectItem>
                      <SelectItem value="blueberry">Brooklyn Simmons</SelectItem>
                      <SelectItem value="grapes">Leslie Alexander</SelectItem>
                      <SelectItem value="pineapple">Jenny Wilson</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* flex form  first*/}
            <div className=" flex flex-col md:flex-row items-center my-10   gap-14">
              {/* left side */}

              <div className=" block md:flex-1 ">
                <div className=" flex items-center gap-3 mb-8">
                  <BoxIcon />
                  <h3 className=" text-lg text-[#1D1F2C] font-medium">
                    Commodity Details
                  </h3>
                </div>
                <div className=" space-y-6">
                  <div>
                    <p className=" text-xs text-graytext mb-2">
                      Commodity Type
                    </p>

                    <Select>
                      <SelectTrigger className="w-full py-5 shadow-none">
                        <SelectValue
                          placeholder="Select commodity type."
                          className=" text-graytext text-sm"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select commodity type</SelectLabel>
                          <SelectItem value="apple">NGLs</SelectItem>
                          <SelectItem value="banana">Refined Products</SelectItem>
                          <SelectItem value="blueberry">Natural Gas</SelectItem>
                          <SelectItem value="grapes">Petrochemicals</SelectItem>
                          <SelectItem value="pineapple">Crude Oil</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <p className="  text-xs text-graytext mb-2">Volume</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter Volume"
                      className=" py-3 px-4 w-full text-sm font-medium text-graytext border border-[#E6E6E6]  rounded-[10px]"
                    />
                  </div>
                  <div>
                    <p className="  text-xs text-graytext mb-2">Unit</p>
                    <Select>
                      <SelectTrigger className="w-full py-5 shadow-none text-[#4A4C56] text-sm font-medium">
                        <SelectValue placeholder="bbls" className=" " />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>bbls</SelectLabel>
                          <SelectItem value="apple">gallons</SelectItem>
                          <SelectItem value="banana">MCF</SelectItem>
                          <SelectItem value="blueberry">tons</SelectItem>
                          {/* <SelectItem value="grapes">type D</SelectItem>
                          <SelectItem value="pineapple">type E</SelectItem> */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* right side */}
             <div className=" block md:flex-1 ">
                <div className=" flex items-center gap-3 mb-8">
                   <LocationIcon/>
                  <h3 className=" text-lg text-[#1D1F2C] font-medium">
                   Location & Transport
                  </h3>
                </div>
                <div className=" space-y-6">
                  
                  <div>
                    <p className="  text-xs text-graytext mb-2">Origin</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter origin location"
                      className=" py-3 px-4 w-full text-sm font-medium text-graytext border border-[#E6E6E6]  rounded-[10px]"
                    />
                  </div>
                  <div>
                    <p className="  text-xs text-graytext mb-2">Destination</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter destination location"
                      className=" py-3 px-4 w-full text-sm font-medium text-graytext border border-[#E6E6E6]  rounded-[10px]"
                    />
                  </div>
                  <div>
                    <p className="  text-xs text-graytext mb-2">Transport Mode</p>
                    <Select>
                      <SelectTrigger className="w-full py-5 shadow-none text-[#4A4C56] text-sm font-medium">
                        <SelectValue placeholder="Select transport mode" className=" " />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select transport mode</SelectLabel>
                          <SelectItem value="apple">Pipeline</SelectItem>
                          <SelectItem value="banana">Trucking</SelectItem>
                          <SelectItem value="blueberry">Railcar</SelectItem>
                          <SelectItem value="grapes">Marine</SelectItem>
                          {/* <SelectItem value="pineapple">type E</SelectItem> */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* flex form second */}
            <div className=" mb-6">
                <div className=" flex items-center gap-3 mb-8">
                  <CalenderIcon/>
                  <h3 className=" text-lg text-[#1D1F2C] font-medium">
                    Scheduling & Additional Information
                  </h3>
                </div>

                <div className=" flex flex-col md:flex-row items-center gap-14 ">
                    <div className=" block md:flex-1 ">
                    <p className="  text-xs text-[#4A4C56] mb-2">Beginning Date</p>
                     <input type="date" name="" id="" className=" w-full py-3 px-4 rounded-[10px] border border-[#E6E6E6] cursor-pointer"/>
                  </div>
                     <div className=" block md:flex-1 ">
                    <p className="  text-xs text-[#4A4C56] mb-2">End Date</p>
                     <input type="date" name="" id="" className=" w-full py-3 px-4 rounded-[10px] border border-[#E6E6E6] cursor-pointer"/>
                  </div>
            </div>
            </div>
            {/* textarea */}
            <div className=" mb-10">
                <p className="   text-xs text-[#4A4C56] mb-2">Notes (Optional)</p>
                 <textarea className=" w-full py-3 px-4 rounded-[10px] border border-[#E6E6E6]   h-36" placeholder=" Additional information, special requirements, or comments..."/>
            </div>
            {/* buttons  */}
            <div className=" flex justify-end gap-4">
                <button className=" text-[#1D1F2C] bg-[#E6E6E6]   text-sm font-medium py-3 px-12 rounded-xl cursor-pointer">Cancel</button>
                <button className=" text-white bg-primary   text-sm font-medium py-3 px-12 rounded-xl cursor-pointer">Submit Nomination</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
