 "use client";
import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import EntityForm from "@/components/admin/EntityForm";

export default function AdminCommunities() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const columns = [
    { key: "name", label: "Name" },
    { key: "slug", label: "Slug" },
    { key: "projects", label: "Projects" },
  ];
  const load = async () => {
    const res = await fetch("/api/admin/communities");
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
  const onDelete = async (ids) => {
    await fetch("/api/admin/communities", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
    await load();
  };
  const onSubmit = async (data) => {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...editing, ...data } : data;
    await fetch("/api/admin/communities", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setOpen(false);
    await load();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Communities</h1>
        <div className="text-sm text-gray-500">Manage communities</div>
      </div>
      <AdminTable columns={columns} rows={items} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-6" onClick={() => setOpen(false)}>
            <div className="w-[min(700px,95vw)] rounded-2xl border border-gray-200 bg-white p-6" onClick={(e) => e.stopPropagation()}>
              <div className="text-sm font-bold text-gray-900">{editing ? "Edit community" : "New community"}</div>
              <EntityForm
                initial={editing || {}}
                fields={[
                  { key: "name", label: "Name", type: "text" },
                  { key: "slug", label: "Slug", type: "text" },
                  { key: "projects", label: "Projects", type: "text" },
                  { key: "image", label: "Image", type: "image" },
                  { key: "image1", label: "Image 1", type: "image" },
                  { key: "image2", label: "Image 2", type: "image" },
                  { key: "image3", label: "Image 3", type: "image" },
                ]}
                onCancel={() => setOpen(false)}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
