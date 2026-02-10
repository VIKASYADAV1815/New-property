"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function AdminTourBookings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const loadTourBookings = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tour-bookings");

      if (Array.isArray(data)) setItems(data);
      else if (data?.tourBookings) setItems(data.tourBookings);
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

  const openConfirm = (id, action) => {
    setSelectedId(id);
    setConfirmAction(action);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setSelectedId(null);
    setConfirmAction(null);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;

    try {
      setDeletingId(selectedId);
      await api.delete(`/tour-bookings/${selectedId}`);
      setItems((prev) => prev.filter((item) => item._id !== selectedId));
    } catch (error) {
      console.error("Delete failed");
    } finally {
      setDeletingId(null);
      closeConfirm();
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const { data } = await api.put(`/tour-bookings/${id}`, { status: newStatus });
      
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
    } catch (error) {
      console.error("Update failed");
    } finally {
      setUpdatingId(null);
      closeConfirm();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="p-6 relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tour Bookings</h1>
        <p className="text-gray-600 text-sm">
          Manage property tour booking requests
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
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Property</th>
                <th className="px-4 py-3 text-left">Date & Time</th>
                <th className="px-4 py-3 text-left">Guests</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No tour bookings found
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3">
                      <div className="text-xs">
                        <p>{item.email}</p>
                        <p className="text-gray-500">{item.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {item.propertyId?.title || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs">
                        <p>{new Date(item.preferredDate).toLocaleDateString()}</p>
                        <p className="text-gray-500">{item.preferredTime}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs">
                        <p>{item.numberOfPeople} {item.numberOfPeople === 1 ? "guest" : "guests"}</p>
                        <p className="text-gray-500">{item.guestType}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        {item.status === "pending" && (
                          <button
                            onClick={() => openConfirm(item._id, "confirm")}
                            disabled={updatingId === item._id}
                            className="px-2 py-1 rounded-md bg-green-600 text-white text-xs font-semibold hover:bg-green-700 disabled:opacity-50"
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          onClick={() => openConfirm(item._id, "delete")}
                          disabled={deletingId === item._id}
                          className="px-2 py-1 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- CONFIRM MODAL ---------- */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {confirmAction === "delete" ? "Delete Tour Booking?" : "Confirm Tour Booking?"}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              {confirmAction === "delete"
                ? "This action cannot be undone. Are you sure you want to delete this tour booking?"
                : "Are you sure you want to confirm this tour booking? The guest will be notified."}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmAction === "delete") {
                    confirmDelete();
                  } else if (confirmAction === "confirm") {
                    updateStatus(selectedId, "confirmed");
                  }
                }}
                disabled={updatingId === selectedId || deletingId === selectedId}
                className={`px-4 py-2 rounded-md text-white text-sm font-semibold disabled:opacity-50 ${
                  confirmAction === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {updatingId === selectedId || deletingId === selectedId
                  ? "Processing..."
                  : confirmAction === "delete"
                  ? "Delete"
                  : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}