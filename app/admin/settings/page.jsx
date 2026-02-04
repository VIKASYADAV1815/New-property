 "use client";
import { useState } from "react";

export default function AdminSettings() {
  const [siteName, setSiteName] = useState("PropertySearch.in");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [saving, setSaving] = useState(false);
  const save = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <div className="text-sm text-gray-500">Project preferences</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="text-sm font-bold text-gray-900">General</div>
          <div className="mt-3">
            <label className="block text-sm text-gray-500">Site name</label>
            <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white" />
          </div>
          <div className="mt-3">
            <label className="block text-sm text-gray-500">Timezone</label>
            <input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white" />
          </div>
          <div className="mt-4">
            <button onClick={save} disabled={saving} className="px-6 py-2 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800">{saving ? "Saving..." : "Save"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
