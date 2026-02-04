import crypto from "crypto";

const secret = process.env.ADMIN_SECRET || "dev-secret";

export function sha256(input) {
  return crypto.createHash("sha256").update(String(input)).digest("hex");
}

export function signToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [data, sig] = parts;
  const expected = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const json = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    return json;
  } catch {
    return null;
  }
}
