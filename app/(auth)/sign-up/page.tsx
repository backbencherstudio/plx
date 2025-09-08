"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/sidebar/images/logo.png";
import sImg from "@/public/subscriber-login.png";
import googleImg from "@/public/google-login.png";
import EmailIcon from "@/public/commonIcons/EmailIcon";
import LockIcon from "@/public/commonIcons/LockIcon";
import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <div className=" flex flex-col xl:flex-row items-center justify-center bg-[#F5F8FA]">
        <div className=" max-w-[570px] mx-4 xl:mx-auto flex-1 py-4">
          <Image src={logo} width={200} height={89} alt="logo" />
          <h1 className=" text-black text-[40px] font-medium mt-14">
            Welcome to PLX!
          </h1>
          <p className=" text-base text-[#777980] mb-10">
            Sign up to access your dashboard
          </p>

          <div className=" flex items-center gap-4 mb-4">
            <div>
              <label
                htmlFor="first-name"
                className=" text-sm text-[#4A4C56] mb-[2px]"
              >
                First name
              </label>
              <input
                className="py-4 px-5   w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="email"
                id="first-name"
                placeholder="Enter Your first Name "
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className=" text-sm text-[#4A4C56] mb-[2px]"
              >
               Last Name
              </label>
              <input
                className="py-4 px-5   w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="last-name"
                id="email"
                placeholder="Enter Your Last Name "
              />
            </div>
          </div>
          {/* email */}
          <div className="flex flex-col relative">
            <label htmlFor="email" className=" text-sm text-[#4A4C56] mb-[2px]">
              Email
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 placeholder:ml-3 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="email"
                id="email"
                placeholder="Enter Your Email "
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <EmailIcon />
              </div>
            </div>
          </div>
          {/* password */}
          <div className="flex flex-col relative mt-6">
            <label
              htmlFor="enter-password"
              className=" text-sm text-[#4A4C56] mb-[2px] "
            >
              Enter Password
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 placeholder:ml-3 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="password"
                id="enter-password"
                placeholder="Enter Your Password"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <LockIcon />
              </div>
            </div>
          </div>
          {/* re enter password */}
          <div className="flex flex-col relative mt-6">
            <label
              htmlFor="re-enter-password"
              className=" text-sm text-[#4A4C56] mb-[2px] "
            >
              Re-Enter Password
            </label>
            <div className="relative">
              <input
                className="py-4 px-5 pl-12 placeholder:ml-3 w-full rounded-[10px] border border-[#E6E8EA] bg-white"
                type="re-enter-password"
                id="enter-password"
                placeholder="Enter Your Password"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <LockIcon />
              </div>
            </div>
          </div>

          <Link href="/subscriber-login">
            <button className=" hover:scale-105 active:scale-95 transition-all ease-in-out duration-300 w-full py-4 px-6 text-center bg-primary text-white mt-12 rounded-[8px] text-lg font-bold cursor-pointer">
            Sign Up
            </button>
          </Link>
          <div className={`flex items-center pt-6 pb-[18px]`}>
            <div className="flex-1 h-px bg-[#D2D2D5]"></div>
            <span className="px-4 text-[#777980] text-xs font-medium"> OR</span>
            <div className="flex-1 h-px bg-[#D2D2D5]"></div>
          </div>
          <div className=" border border-[#E6E8EA] py-4 px-6 rounded-[8px] bg-white cursor-pointer">
            <div className=" flex justify-center items-center gap-6">
              <Image src={googleImg} alt="google img" />
              <p>Continue with Google</p>
            </div>
          </div>
          <p className=" text-sm text-[#4A4C56] text-center mt-8">
            Already have an Account?
            <Link
              href="/subscriber-login"
              className=" text-primary font-semibold ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
        <div className=" px-6 py-7  ">
          <Image src={sImg} alt="admin img" width={750} height={893} />
        </div>
      </div>
    </>
  );
}
