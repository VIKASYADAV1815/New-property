import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

function storePath(entity) {
  const safe = String(entity || "").replace(/[^a-z0-9_-]/gi, "").toLowerCase();
  return path.join(process.cwd(), "data", "admin", `${safe}.json`);
}

async function readStore(entity) {
  const p = storePath(entity);
  try {
    const buf = await readFile(p);
    return JSON.parse(buf.toString("utf8"));
  } catch {
    return [];
  }
}

async function writeStore(entity, items) {
  const p = storePath(entity);
  const dir = path.dirname(p);
  await mkdir(dir, { recursive: true }).catch(() => null);
  await writeFile(p, JSON.stringify(items, null, 2));
}

export async function GET(req, { params }) {
  const items = await readStore(params.entity);
  return NextResponse.json({ ok: true, items });
}

export async function POST(req, { params }) {
  const data = await req.json().catch(() => null);
  if (!data || typeof data !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const items = await readStore(params.entity);
  const id = data.id || String(Date.now());
  const now = Date.now();
  const item = { ...data, id, createdAt: now, updatedAt: now };
  const next = [item, ...items];
  await writeStore(params.entity, next);
  return NextResponse.json({ ok: true, item });
}

export async function PUT(req, { params }) {
  const data = await req.json().catch(() => null);
  const id = data?.id;
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }
  const items = await readStore(params.entity);
  const idx = items.findIndex((x) => String(x.id) === String(id));
  if (idx === -1) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  const nextItem = { ...items[idx], ...data, updatedAt: Date.now() };
  const next = [...items];
  next[idx] = nextItem;
  await writeStore(params.entity, next);
  return NextResponse.json({ ok: true, item: nextItem });
}

export async function DELETE(req, { params }) {
  const data = await req.json().catch(() => null);
  const ids = Array.isArray(data?.ids) ? data.ids : [];
  if (!ids.length) {
    return NextResponse.json({ ok: false, error: "Missing ids" }, { status: 400 });
  }
  const items = await readStore(params.entity);
  const next = items.filter((x) => !ids.includes(String(x.id)));
  await writeStore(params.entity, next);
  return NextResponse.json({ ok: true, count: items.length - next.length });
}
