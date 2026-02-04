 "use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@propertysearch.in");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    setLoading(false);
    if (!json.ok) {
      setError(json.error || "Login failed");
      return;
    }
    router.push("/admin");
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-[min(600px,95vw)] rounded-3xl border border-gray-200 bg-white p-6">
        <div className="text-sm font-black uppercase tracking-[0.15em] text-gray-500">Admin</div>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">Sign in</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-500">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-500">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button type="submit" disabled={loading} className="w-full px-4 py-2 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-4 text-xs text-gray-500">
          Default admin password is admin123 unless overridden by environment.
        </div>
        <div className="mt-6">
          <Link href="/" className="text-sm font-bold text-gray-900">Back to site</Link>
        </div>
      </div>
    </div>
  );
}
