"use client";
import React, { useState } from "react";
 import { Urbanist } from "next/font/google";
import Sidebar from "./components/common/usersidebar";
import Header from "../_components/Header";
 
 
 


const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '600','700'],  
})

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
 

  <div className={`${urbanist.className} `}
  style={{
  background: 'linear-gradient(176deg, #212121 -17.27%, #0A0A0A 100%)'
}}
  >
   <div className="flex h-dvh md:h-screen w-full  bg-gray-100 overflow-y-hidden">

    <Sidebar
      isOpen={isSidebarOpen} 
      onClose={() => setIsSidebarOpen(false)} 
    />


      <div className={`
      flex-1 flex flex-col h-full min-h-0 min-w-0 transition-all duration-300 ease-in-out
      ${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'}
    `}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-auto  min-w-0 min-h-0 p-4 sm:p-5 md:p-6 bg-[#F5F8FA]">
          {children}
        </main>
      </div>

      {/* Overlay with fade effect */}
      <div
        className={`
        fixed inset-0 bg-black transition-opacity duration-300 md:hidden
        ${isSidebarOpen ? 'opacity-50 z-30' : 'opacity-0 -z-10'}
      `}
        onClick={() => setIsSidebarOpen(false)}
      />
    </div>
  </div>
 
 

  );
}
