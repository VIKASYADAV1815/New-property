import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const timestamp = Date.now();
  const safeName = file.name?.replace(/[^a-zA-Z0-9._-]/g, "_") || "upload";
  const filename = `${timestamp}-${safeName}`;
  const outDir = path.join(process.cwd(), "public", "uploads");
  const outPath = path.join(outDir, filename);
  await mkdir(outDir, { recursive: true }).catch(() => null);
  await writeFile(outPath, buffer).catch(() => null);
  const url = `/uploads/${filename}`;
  return NextResponse.json({ ok: true, url });
}
