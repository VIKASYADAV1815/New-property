import { NextResponse } from "next/server";
import { users } from "@/data/users";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  const body = await req.json().catch(() => null);
  const email = body?.email || "";
  const password = body?.password || "";
  const adminDefault = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
  const editorDefault = process.env.EDITOR_DEFAULT_PASSWORD || "editor123";
  const user = users.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }
  const ok =
    (user.role === "admin" && password === adminDefault) ||
    (user.role === "editor" && password === editorDefault);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  const res = NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  res.cookies.set("admin_token", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  return res;
}
