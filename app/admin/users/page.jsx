 "use client";
import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import EntityForm from "@/components/admin/EntityForm";

export default function AdminUsers() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];
  const load = async () => {
    const res = await fetch("/api/admin/users");
    const json = await res.json();
    setItems(json.items || []);
  };
  useEffect(() => {
    load();
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
    await fetch("/api/admin/users", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
    await load();
  };
  const onSubmit = async (data) => {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...editing, ...data } : data;
    await fetch("/api/admin/users", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setOpen(false);
    await load();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <div className="text-sm text-gray-500">Manage roles</div>
      </div>
      <AdminTable columns={columns} rows={items} onCreate={onCreate} onEdit={onEdit} onDelete={onDelete} />
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-6" onClick={() => setOpen(false)}>
            <div className="w-[min(700px,95vw)] rounded-2xl border border-gray-200 bg-white p-6" onClick={(e) => e.stopPropagation()}>
              <div className="text-sm font-bold text-gray-900">{editing ? "Edit user" : "New user"}</div>
              <EntityForm
                initial={editing || {}}
                fields={[
                  { key: "name", label: "Name", type: "text" },
                  { key: "email", label: "Email", type: "text" },
                  { key: "role", label: "Role", type: "text" },
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
