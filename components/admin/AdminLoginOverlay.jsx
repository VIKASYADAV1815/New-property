"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/utils/api";

export default function AdminLoginOverlay({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      await api.post("/admin/login", { email, password });

      toast.success("Login successful 🔐", { id: toastId });
      onSuccess(); // 🔥 close overlay
    } catch (err) {
      toast.error("Invalid email or password", { id: toastId });
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-99 bg-black/90 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl p-6 shadow-xl"
      >
        <div className="flex justify-center">
          <div className="relative w-32 h-12">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-center mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-2 rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
