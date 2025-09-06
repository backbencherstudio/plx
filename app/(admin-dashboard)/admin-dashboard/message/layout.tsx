"use client";
import { useRouter } from "next/navigation";
import "../../../globals.css";
import MessagesSidebar from "./_components/MessageSidebar";
import MessagesSidebar2 from "./_components/MessageSidebar2";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    <div  className="adminMaxWidth overflow-y-auto scrollbar-hide"
      style={{ height: "calc(100vh - 150px)" }}>
      <div className="py-5 space-y-4 h-full">
        <div className="flex w-full gap-4 rounded-lg  h-full">
          {/* Sidebar (sticky + internal scroll) */}
          <aside className="hidden md:block w-[380px] shrink-0 sticky top-5 self-start  ">
            {/* wrapper provides the scroll area */}
            <div className="h-full overflow-y-auto">
              <MessagesSidebar2/>
            </div>
          </aside>

          {/* Content area (independent scroll) */}
          <main className="flex-1 
          ">
            {/* // h-full overflow-hidden  */}
            <div className="h-full overflow-y-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
