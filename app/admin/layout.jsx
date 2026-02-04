 "use client";
import Link from "next/link";
import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopbar user={null} onMenu={() => setSidebarOpen(true)} />
      <div className="pt-14">
        <div className="w-full px-0 md:px-4 pt-0 pb-40">
          <div className="h-[calc(100vh-56px)]">
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden h-full flex">
              <div className="hidden lg:block w-72 shrink-0 border-r border-gray-200 h-full">
                <AdminSidebar minimal />
              </div>
              <div id="admin-content-scroll" className="flex-1 h-full overflow-auto">
                <div className="p-4 md:p-6 min-h-full">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="absolute top-0 left-0 h-full w-[85vw] max-w-[320px] bg-white border-r border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-14 border-b border-gray-200 flex items-center px-4 text-sm font-black uppercase tracking-[0.15em] text-gray-700">
              Menu
            </div>
            <div className="h-[calc(100%-56px)]">
              <AdminSidebar minimal />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
