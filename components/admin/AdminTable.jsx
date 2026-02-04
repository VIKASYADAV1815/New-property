 "use client";
import { useEffect, useMemo, useState } from "react";
import { Download, Trash2, Edit2, Plus, Eye } from "lucide-react";

export default function AdminTable({ columns, rows, onCreate, onEdit, onDelete, onView }) {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState(columns?.[0]?.key || "id");
  const [sortDir, setSortDir] = useState("asc");
  const [selected, setSelected] = useState([]);
  const filtered = useMemo(() => {
    const base = Array.isArray(rows) ? rows : [];
    const f = base.filter((r) => {
      const str = JSON.stringify(r).toLowerCase();
      return str.includes(q.toLowerCase());
    });
    const s = [...f].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const res = String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: "base" });
      return sortDir === "asc" ? res : -res;
    });
    return s;
  }, [rows, q, sortKey, sortDir]);
  const toggleSelect = (id) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const bulkDelete = () => {
    if (!selected.length) return;
    onDelete?.(selected);
    setSelected([]);
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="px-3 py-2 rounded-full border border-gray-200 text-sm bg-gray-50 focus:bg-white" />
          <button onClick={exportJson} className="px-3 py-2 rounded-full border border-gray-200 text-sm bg-gray-50 hover:bg-gray-100 flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onCreate} className="px-3 py-2 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={(e) => setSelected(e.target.checked ? filtered.map((r) => r.id) : [])} />
              </th>
              {columns.map((c) => (
                <th key={c.key} className="p-3 text-left">
                  <button
                    onClick={() => {
                      setSortKey(c.key);
                      setSortDir((d) => (sortKey === c.key ? (d === "asc" ? "desc" : "asc") : "asc"));
                    }}
                    className="font-bold text-gray-900"
                  >
                    {c.label}
                  </button>
                </th>
              ))}
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={String(r.id)} className="border-t border-gray-100">
                <td className="p-3">
                  <input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggleSelect(r.id)} />
                </td>
                {columns.map((c) => (
                  <td key={c.key} className="p-3">
                    {(() => {
                      const v = r[c.key];
                      const s = (v == null ? "" : String(v)).trim();
                      return s || "—";
                    })()}
                  </td>
                ))}
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onView && (
                      <button onClick={() => onView?.(r)} className="px-3 py-2 rounded-full border border-gray-200 text-sm bg-gray-50 hover:bg-gray-100 inline-flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    )}
                    <button onClick={() => onEdit?.(r)} className="px-3 py-2 rounded-full bg-green-600 text-white text-sm hover:bg-green-700 inline-flex items-center gap-2">
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button onClick={() => onDelete?.([r.id])} className="px-3 py-2 rounded-full bg-red-600 text-white text-sm hover:bg-red-700 inline-flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length + 2} className="p-6 text-center text-gray-500">No items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
