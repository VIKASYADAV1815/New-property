"use client";

import { useState } from "react";
import api from "@/utils/api";
import { CalendarIcon, Users, Clock, ArrowRight, AlertCircle } from "lucide-react";

export default function TourBookingForm({ propertyId, propertyTitle }) {
  const [form, setForm] = useState({
    propertyId: propertyId || "",
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "9:00 AM",
    numberOfPeople: 1,
    guestType: "Individual",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "numberOfPeople" ? parseInt(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccess(false);
      setError(null);

      // Simple POST without propertyId if not provided
      const payload = { ...form };
      
      await api.post("/tour-bookings", payload);
      setSuccess(true);
      setForm({
        propertyId: propertyId || "",
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "9:00 AM",
        numberOfPeople: 1,
        guestType: "Individual",
        message: "",
      });
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Failed to submit tour booking";
      setError(errorMsg);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 z-20 relative">
      {/* NAME & EMAIL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      {/* PHONE & GUEST TYPE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+91 98765 43210"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
            Guest Type
          </label>
          <select
            name="guestType"
            value={form.guestType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white text-sm"
          >
            <option>Individual</option>
            <option>Couple</option>
            <option>Family</option>
            <option>Corporate</option>
          </select>
        </div>
      </div>

      {/* DATE & TIME */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide items-center gap-1">
            <CalendarIcon className="w-3.5 h-3.5" /> Preferred Date
          </label>
          <input
            type="date"
            name="preferredDate"
            value={form.preferredDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
          />
        </div>
        <div>
          <label className="flex text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Preferred Time
          </label>
          <select
            name="preferredTime"
            value={form.preferredTime}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white text-sm"
          >
            <option>9:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 PM</option>
            <option>2:00 PM</option>
            <option>3:00 PM</option>
            <option>4:00 PM</option>
            <option>5:00 PM</option>
          </select>
        </div>
      </div>

      {/* NUMBER OF PEOPLE */}
      <div>
        <label className="flex text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide items-center gap-1">
          <Users className="w-3.5 h-3.5" /> How many guests?
        </label>
        <select
          name="numberOfPeople"
          value={form.numberOfPeople}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white text-sm"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
      </div>

      {/* MESSAGE */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
          Message (Optional)
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Any specific preferences or questions..."
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm resize-none"
        />
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {success && (
        <p className="text-green-600 text-sm font-medium">
          ✅ Tour booking submitted successfully! Admin will contact you soon.
        </p>
      )}

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all text-sm flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Book Tour"}
        {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
      </button>
    </form>
  );
}
