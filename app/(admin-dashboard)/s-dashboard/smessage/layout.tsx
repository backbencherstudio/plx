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
    <div className="adminMaxWidth h-full"
      style={{ height: "calc(100vh - 150px)" }}>
      <div className="h-full">
        <div className="flex w-full gap-4 rounded-lg h-full">
          {/* Sidebar (fixed position + internal scroll) */}
          <aside className="hidden md:block w-[380px] shrink-0 h-full">
            {/* wrapper provides the scroll area */}
            <div className="h-full overflow-y-auto scrollbar-hide">
              <MessagesSidebar2/>
            </div>
          </aside>

          {/* Content area (fixed position + independent scroll) */}
          <main className="flex-1 h-full">
            <div className="h-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
