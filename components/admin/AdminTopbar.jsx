"use client";

import Link from "next/link";
import { LogOut, Search, Menu } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/utils/api";

export default function AdminTopbar({ user, onMenu }) {
  const [q, setQ] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const toastId = toast.loading("Logging out...");

    try {
      await api.post("/admin/logout");
      toast.success("Logged out successfully", { id: toastId });
      window.location.reload(); // 🔥 simplest & safest (overlay will appear)
    } catch (err) {
      toast.error("Logout failed", { id: toastId });
      console.error(err);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 h-14">
        <div className="h-14 px-4 md:px-6 flex items-center gap-3">
          <button
            onClick={onMenu}
            className="lg:hidden p-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          <Link
            href="/admin"
            className="text-sm font-black uppercase tracking-[0.15em] text-gray-700"
          >
            Admin
          </Link>

          <div className="flex-1 min-w-40">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="w-full pl-9 pr-2 py-2 rounded-full border border-gray-200 text-sm bg-gray-50 focus:bg-white focus:outline-none"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700">
              {user?.role?.[0]?.toUpperCase() || "A"}
            </div>

            <button
              onClick={() => setShowConfirm(true)}
              className="px-3  cursor-pointer py-2 rounded-full text-white text-sm bg-red-600 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🔐 LOGOUT CONFIRMATION OVERLAY */}
      {showConfirm && (
        <div className="fixed inset-0 z-999 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold mb-2">Confirm Logout</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout from admin panel?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border text-sm"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm disabled:opacity-60"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
