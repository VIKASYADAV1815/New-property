 "use client";
import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import EntityForm from "@/components/admin/EntityForm";

export default function AdminProperties() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const columns = [
    { key: "title", label: "Title" },
    { key: "location", label: "Location" },
    { key: "price", label: "Price" },
    { key: "beds", label: "Beds" },
  ];
  const load = async () => {
    const res = await fetch("/api/admin/properties");
    const json = await res.json();
    setItems(json.items || []);
  };
  useEffect(() => {
    const id = setTimeout(() => {
      load();
    }, 0);
    return () => clearTimeout(id);
  }, []);
  const onCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const onEdit = (item) => {
    setEditing(item);
    setOpen(true);
  };
  const onView = (item) => {
    setViewing(item);
  };
  const onDelete = async (ids) => {
    await fetch("/api/admin/properties", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
    await load();
  };
  const onSubmit = async (data) => {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...editing, ...data } : data;
    await fetch("/api/admin/properties", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setOpen(false);
    await load();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
        <div className="text-sm text-gray-500">Manage properties</div>
      </div>
      <AdminTable columns={columns} rows={items} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} onView={onView} />
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 overflow-y-auto p-4 sm:p-6" onClick={() => setOpen(false)}>
            <div className="mx-auto my-6 w-full max-w-[900px] rounded-2xl border border-gray-200 bg-white p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="text-sm font-bold text-gray-900">{editing ? "Edit property" : "New property"}</div>
              <EntityForm
                initial={editing || {}}
                fields={[
                  { key: "title", label: "Title", type: "text" },
                  { key: "location", label: "Location", type: "text" },
                  { key: "price", label: "Price", type: "text" },
                  { key: "beds", label: "Beds", type: "text" },
                  { key: "baths", label: "Baths", type: "text" },
                  { key: "sqft", label: "Sqft", type: "text" },
                  { key: "image", label: "Image", type: "image" },
                  { key: "image1", label: "Image 1", type: "image" },
                  { key: "image2", label: "Image 2", type: "image" },
                  { key: "image3", label: "Image 3", type: "image" },
                  { key: "description", label: "Description", type: "textarea" },
                ]}
                onCancel={() => setOpen(false)}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
      )}
      {viewing && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setViewing(null)} />
          <div className="absolute inset-0 overflow-y-auto p-4 sm:p-6" onClick={() => setViewing(null)}>
            <div className="mx-auto my-6 w-full max-w-[900px] rounded-2xl border border-gray-200 bg-white p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="text-sm font-bold text-gray-900">Property details</div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-xs text-gray-500">{viewing.location}</div>
                  <div className="text-lg font-bold text-gray-900">{viewing.title}</div>
                  <div className="text-sm font-bold text-sky-600">{viewing.price}</div>
                  <div className="text-sm text-gray-600">Beds: {viewing.beds} • Baths: {viewing.baths} • Sqft: {viewing.sqft}</div>
                  <div className="mt-3 text-sm text-gray-700">{viewing.description}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[viewing.image, viewing.image1, viewing.image2, viewing.image3].filter(Boolean).slice(0,3).map((img, i) => (
                    <div key={i} className="relative h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                      {img && <img src={img} alt={`img-${i}`} className="w-full h-full object-cover" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
                <button onClick={() => setViewing(null)} className="px-4 py-2 rounded-full border border-gray-200 text-sm bg-gray-50 hover:bg-gray-100">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
