"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function AdminTourBookings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeleteId] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const loadTourBookings = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tour-bookings");

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
    loadTourBookings();
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
      setDeleteId(selectedId);
      await api.delete(`/tour-bookings/${selectedId}`);
      setItems((prev) => prev.filter((item) => item._id !== selectedId));
    } catch (error) {
      console.error("Delete failed");
    } finally {
      setDeleteId(null);
      closeConfirm();
    }
  };

  return (
    <div className="p-6 relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tour Booking Inquiries</h1>
        <p className="text-gray-600 text-sm">
          View tour booking requests. Admin manually contacts guests (like contact form).
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
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Guests</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-left">Submitted</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-6 text-gray-500">
                    No tour bookings found
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
                    <td className="px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3">{new Date(item.preferredDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{item.preferredTime}</td>
                    <td className="px-4 py-3">{item.numberOfPeople}</td>
                    <td className="px-4 py-3">{item.guestType}</td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      {item.message || "-"}
                    </td>
                    <td className="px-4 py-3">{new Date(item.createdAt).toLocaleDateString()}</td>
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

      {/* DELETE CONFIRMATION */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h3 className="text-lg font-bold mb-3">Delete Tour Booking?</h3>
            <p className="text-gray-600 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeConfirm}
                disabled={deletingId !== null}
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId !== null}
                className="flex-1 px-4 py-2 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
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