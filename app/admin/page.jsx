import { properties } from "@/data/properties";
import { communities } from "@/data/communities";
import { blogs } from "@/data/blogs";
import { Building2, Home, Newspaper, BarChart3, Sparkles } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Properties", value: properties.length, icon: Home, tone: "from-sky-50 to-white" },
    { label: "Communities", value: communities.length, icon: Building2, tone: "from-violet-50 to-white" },
    { label: "Blogs", value: blogs?.length || 0, icon: Newspaper, tone: "from-rose-50 to-white" },
  ];
  const max = Math.max(...stats.map((s) => s.value), 1);
  const total = stats.reduce((a, s) => a + s.value, 0);
  return (
    <div className="space-y-8 min-h-full">
      <div className="rounded-3xl border border-gray-200 p-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.15em] text-gray-500">Admin</div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">Welcome back</h1>
            <div className="mt-2 text-sm text-gray-600">Manage content and monitor site health</div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/admin/properties" className="px-3 md:px-4 py-2 rounded-full bg-black text-white text-xs md:text-sm font-bold hover:bg-gray-800">New Property</a>
            <a href="/admin/blogs" className="px-3 md:px-4 py-2 rounded-full border border-gray-200 text-xs md:text-sm bg-gray-50 hover:bg-gray-100">New Blog</a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <BarChart3 className="w-4 h-4" />
          <span>Overview</span>
        </div>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-gray-900">Site health</div>
            <div className="flex items-center gap-2">
              {["Manage", "Create", "Review"].map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-full border border-gray-200 text-xs bg-gray-50">{t}</span>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={`rounded-2xl border border-gray-200 p-4 bg-gradient-to-br ${s.tone}`}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-sky-600" />
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{s.value}</div>
                  <div className="mt-4 h-20 grid grid-cols-7 gap-1 items-end">
                    {Array.from({ length: 7 }).map((_, j) => {
                      const h = ((s.value + j * 2) % (max + 1)) / max;
                      return (
                        <div
                          key={j}
                          className="bg-sky-200 rounded"
                          style={{ height: `${Math.max(12, h * 100)}%` }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-2xl border border-gray-200 p-4 bg-gray-50">
            <div className="text-xs text-gray-500">Total items</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{total}</div>
          </div>
      </div>
      <div className="rounded-3xl border border-gray-200 p-4 md:p-6 bg-white">
          <div className="text-sm font-bold text-gray-900">Recent activity</div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-3 bg-gray-50">
                <div className="text-sm font-bold text-gray-900">Update</div>
                <div className="text-xs text-gray-500 mt-1">Recent changes recorded</div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
