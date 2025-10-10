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
import React, { useEffect, useMemo, useState } from "react";
import axiosClient from "@/lib/axiosclient";

export default function NominationTop() {
  const [isExpanded, setIsExpanded] = useState(true);
  // subscriber search state
  const [subscriberQuery, setSubscriberQuery] = useState("");
  const [subscriberResults, setSubscriberResults] = useState<Array<{ id: string; label: string }>>([]);
  const [subscriberLoading, setSubscriberLoading] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<{ id: string; label: string } | null>(null);
  const [showSubscriberDropdown, setShowSubscriberDropdown] = useState(false);
  // commodity state
  const [commodityType, setCommodityType] = useState<string>("");
  const [crudeSubType, setCrudeSubType] = useState<string>("");
  const [showCommodityPanel, setShowCommodityPanel] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // fetch subscribers by first letters (debounced)
  useEffect(() => {
    const controller = new AbortController();
    const handler = setTimeout(async () => {
      try {
        if (!subscriberQuery.trim()) {
          setSubscriberResults([]);
          return;
        }
        setSubscriberLoading(true);
        const params: any = { page: 1, limit: 10, active: true, query: subscriberQuery.trim() };
        const res = await axiosClient.get(`/api/v1/users/search`, { params, signal: controller.signal });
        const data = (res.data?.data || []).map((u: any) => ({
          id: u.id,
          label: u.fullName || `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() || u.email,
        }));
        setSubscriberResults(data);
      } catch (e) {
        // ignore
      } finally {
        setSubscriberLoading(false);
      }
    }, 350);
    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [subscriberQuery]);

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
                <div className="relative">
                  <input
                    value={subscriberQuery}
                    onChange={(e) => { setSubscriberQuery(e.target.value); setShowSubscriberDropdown(true); }}
                    placeholder="Search by name or email..."
                    className="w-full py-4 px-4 rounded-[10px] border border-[#E6E6E6] text-sm font-medium text-graytext"
                  />
                  {(subscriberQuery && showSubscriberDropdown) && (
                    <div className="absolute z-10 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] max-h-64 overflow-y-auto">
                      {subscriberLoading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                      ) : subscriberResults.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">No results</div>
                      ) : (
                        subscriberResults.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => { setSelectedSubscriber(u); setSubscriberQuery(u.label); setShowSubscriberDropdown(false); }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-neutral-700"
                          >
                            {u.label}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                  {selectedSubscriber && (
                    <div className="mt-2 text-xs text-gray-500">Selected ID: {selectedSubscriber.id}</div>
                  )}
                </div>
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
                    <p className="  text-xs text-graytext mb-2">Asset Group</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter Asset Group"
                      className=" py-3 px-4 w-full text-sm font-medium text-graytext border border-[#E6E6E6]  rounded-[10px]"
                    />
                  </div>

                  <div className="relative">
                    <p className=" text-xs text-graytext mb-2">Commodity Type</p>
                    <button
                      type="button"
                      onClick={() => setShowCommodityPanel(v => !v)}
                      className="w-full py-5 px-4 text-left rounded-[10px] border border-[#E6E6E6] text-sm font-medium text-graytext"
                    >
                      {commodityType ? commodityType.replaceAll('_',' ') : 'Select commodity type.'}
                      {commodityType === 'crude_oil' && crudeSubType ? ` • ${crudeSubType.replaceAll('_',' ')}` : ''}
                    </button>
                    {showCommodityPanel && (
                      <div className="absolute z-20 mt-2 w-full bg-white rounded-xl border border-gray-200 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] p-0">
                        <div className="grid grid-cols-2 gap-0">
                          <div className="p-0">
                            <div className="px-4 py-2 bg-primary text-white rounded-tl-xl rounded-tr-none text-sm font-semibold">Select commodity type</div>
                            {[
                              {v:'ngls',l:'NGLs'},
                              {v:'refined_products',l:'Refined Products'},
                              {v:'natural_gas',l:'Natural Gas'},
                              {v:'petrochemicals',l:'Petrochemicals'},
                              {v:'crude_oil',l:'Crude Oil'},
                            ].map(opt => (
                              <button
                                key={opt.v}
                                onClick={() => { setCommodityType(opt.v); if(opt.v !== 'crude_oil'){ setCrudeSubType(''); setShowCommodityPanel(false);} }}
                                className={`w-full text-left px-4 py-3 hover:bg-gray-50 text-sm ${commodityType===opt.v? 'bg-gray-50':''}`}
                              >{opt.l}</button>
                            ))}
                          </div>
                          <div className="p-0">
                            {commodityType === 'crude_oil' && (
                              <div className="bg-white rounded-r-xl h-full">
                                <div className="px-4 py-2 text-sm font-semibold text-neutral-700">Crude Oil</div>
                                {[
                                  // Exclude base 'Crude Oil' here to avoid duplicate selection
                                  {v:'light_sweet_crude',l:'Light Sweet Crude'},
                                  {v:'medium_crude',l:'Medium Crude'},
                                  {v:'heavy_crude',l:'Heavy Crude'},
                                  {v:'petrochemicals',l:'Petrochemicals'},
                                ].map(opt => (
                                  <button
                                    key={opt.v}
                                    onClick={() => { setCrudeSubType(opt.v); setShowCommodityPanel(false); }}
                                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 text-sm ${crudeSubType===opt.v? 'bg-gray-50':''}`}
                                  >{opt.l}</button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
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
                          <SelectItem value="gallons">gallons</SelectItem>
                          <SelectItem value="mcf">MCF</SelectItem>
                          <SelectItem value="tons">tons</SelectItem>
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

 <div>
                    <p className="  text-xs text-graytext mb-2">Connection</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Remarks"
                      className=" py-3 px-4 w-full text-sm font-medium text-graytext border border-[#E6E6E6]  rounded-[10px]"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* flex form seconnd */}
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
