"use client";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { toast } from "react-hot-toast";

export default function AdminSettings() {
  const [siteName, setSiteName] = useState("PropertySearch.in");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [saving, setSaving] = useState(false);

  // Admin profile
  const [name, setName] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get("/admin/me")
      .then((res) => {
        if (!mounted) return;
        const admin = res.data?.admin || {};
        setName(admin.name || "");
        setPhotoPreview(admin.photo || null);
      })
      .catch(() => {})
      .finally(() => mounted && setLoadingProfile(false));
    return () => (mounted = false);
  }, []);

  const handlePhotoChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPhotoFile(f);
    setPhotoPreview(URL.createObjectURL(f));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      const form = new FormData();
      form.append("name", name);
      if (photoFile) form.append("image", photoFile);

      const res = await api.put("/admin/me", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.data?.admin) {
        if (res.data.admin.photo) setPhotoPreview(res.data.admin.photo);
        if (res.data.admin.name) setName(res.data.admin.name);
      }
      // small success feedback
      toast.success("Profile updated");
      // notify other parts of the UI (topbar) to refresh
      try {
        window.dispatchEvent(new CustomEvent("adminProfileUpdated", { detail: res.data.admin }));
      } catch (e) {}
      setSaving(false);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

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

        <div className="rounded-2xl border border-gray-200 p-4">
          <div className="text-sm font-bold text-gray-900">Admin Profile</div>

          <div className="mt-3">
            <label className="block text-sm text-gray-500">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white" />
          </div>

          <div className="mt-3">
            <label className="block text-sm text-gray-500">Photo</label>
            <div className="flex items-center gap-3 mt-2">
              <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoPreview} alt="admin" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-gray-600">A</div>
                )}
              </div>

              <div>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button onClick={saveProfile} disabled={saving || loadingProfile} className="px-6 py-2 rounded-full bg-green-600 text-white text-sm font-bold hover:bg-green-700">{saving ? "Saving..." : "Save Profile"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
