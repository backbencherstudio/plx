'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditIcon from "@/public/commonIcons/EditIcon";
import React from "react";

export default function AdminInfo() {
  return (
    <div>
      {/* Admin Information */}
      <div className="bg-white px-6 pt-6 pb-10 rounded-[12px]">
        {/* header */}
        <div className="flex items-center justify-between mb-7">
          <h3 className="text-lg text-[#4A4C56] font-semibold">
            Admin Information
          </h3>
          <button className="flex items-center gap-2 cursor-pointer">
            <EditIcon />
            <p className="text-primary text-xs font-medium underline">Edit</p>
          </button>
        </div>

        {/* form */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* left (flex-2) */}
          <div className="flex-2 space-y-7">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-xs text-[#4A4C56]">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="PLX Energy Transportation Expertise"
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-xs text-[#4A4C56]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="plx123@gmail.com"
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5"
              />
            </div>
          </div>

          {/* right (flex-1) */}
          <div className="flex-1 space-y-7">
            <div className="flex flex-col">
              <label htmlFor="accountType" className="text-xs text-[#4A4C56]">
                Account Type
              </label>
              <input
                type="text"
                disabled
                id="accountType"
                placeholder="Admin"
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#A5A5AB] placeholder:font-medium mt-1.5 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-xs text-[#4A4C56]">
                Phone No
              </label>
              <input
                type="text"
                id="phone"
                placeholder="(704) 555-0127"
                className="border border-[#E6E8EA] py-3 px-4 rounded-[10px] placeholder:text-xs placeholder:text-[#4A4C56] placeholder:font-medium mt-1.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preference */}
      <div className="bg-white px-6 pt-6 pb-10 rounded-[12px] mt-6">
        <h3 className="text-lg text-[#4A4C56] font-semibold mb-7">Preference</h3>
        <div className="flex flex-col md:flex-row gap-6">
          {/* left */}
          <div className="flex-1">
            <p className="text-xs text-graytext mb-2">Prefered Timezone</p>
            <Select>
              <SelectTrigger className="w-full py-6 shadow-none">
                <SelectValue placeholder="UTC + 7" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select commodity type</SelectLabel>
                  <SelectItem value="a">type A</SelectItem>
                  <SelectItem value="b">type B</SelectItem>
                  <SelectItem value="c">type C</SelectItem>
                  <SelectItem value="d">type D</SelectItem>
                  <SelectItem value="e">type E</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* right */}
          <div className="flex-1">
            <p className="text-xs text-graytext mb-2">Date Format</p>
            <Select>
              <SelectTrigger className="w-full py-6 shadow-none">
                <SelectValue placeholder="MM/DD/YYYY" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>MM/DD/YYYY</SelectLabel>
                  <SelectItem value="a">type A</SelectItem>
                  <SelectItem value="b">type B</SelectItem>
                  <SelectItem value="c">type C</SelectItem>
                  <SelectItem value="d">type D</SelectItem>
                  <SelectItem value="e">type E</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
