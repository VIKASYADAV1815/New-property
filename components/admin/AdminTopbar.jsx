"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Search, Menu } from "lucide-react";
import { useState } from "react";

 export default function AdminTopbar({ user, onMenu }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };
  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 h-14">
      <div className="h-14 px-4 md:px-6 flex items-center gap-3">
        <button
          onClick={onMenu}
          className="lg:hidden p-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        <Link href="/admin" className="text-sm font-black uppercase tracking-[0.15em] text-gray-700">Admin</Link>
        <div className="flex-1 min-w-[160px]">
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
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700">{user?.role?.[0]?.toUpperCase() || "U"}</div>
          <button onClick={logout} className="px-3 py-2 rounded-full border border-gray-200 text-sm bg-gray-50 hover:bg-gray-100 flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
