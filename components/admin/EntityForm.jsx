 "use client";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function EntityForm({ initial, fields, onCancel, onSubmit }) {
  const [data, setData] = useState(initial || {});
  const [saving, setSaving] = useState(false);
  const setField = (key, val) => setData((d) => ({ ...d, [key]: val }));
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSubmit?.(data);
    setSaving(false);
  };
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((f) => (
          <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2 lg:col-span-3" : ""}>
            <label className="block text-sm text-gray-500">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea value={data[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none" rows={4} />
            ) : f.type === "image" ? (
              <ImageUploader value={data[f.key]} onChange={(url) => setField(f.key, url)} />
            ) : (
              <input value={data[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none" />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-full border border-gray-200 text-sm bg-gray-50">Cancel</button>
        <button type="submit" disabled={saving} className="px-6 py-2 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
