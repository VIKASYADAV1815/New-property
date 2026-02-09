"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function AdminContact() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/contact");

      if (Array.isArray(data)) setItems(data);
      else if (data?.items) setItems(data.items);
      else setItems([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const openConfirm = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setSelectedId(null);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;

    try {
      setDeletingId(selectedId);
      await api.delete(`/contact/${selectedId}`);
      setItems((prev) => prev.filter((item) => item._id !== selectedId));
    } catch (error) {
      console.error("Delete failed");
    } finally {
      setDeletingId(null);
      closeConfirm();
    }
  };

  return (
    <div className="p-6 relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Contact Inquiries</h1>
        <p className="text-gray-600 text-sm">
          User contact form submissions (delete only)
        </p>
      </div>

      {loading ? (
        <div className="text-blue-600 font-medium">Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Interest</th>
                <th className="px-4 py-3 text-left">Call Time</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No contact inquiries found
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">{item.propertyInterest}</td>
                    <td className="px-4 py-3">{item.bestTime}</td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      {item.message}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => openConfirm(item._id)}
                        disabled={deletingId === item._id}
                        className="px-3 py-1.5 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- DELETE CONFIRM MODAL ---------- */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete Contact?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone. Are you sure you want to delete this
              contact inquiry?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId}
                className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
