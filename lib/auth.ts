import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "rumah_owen_admin";

function secret() {
  return process.env.AUTH_SECRET || "dev-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function verifyCredentials(username: string, password: string) {
  return username === (process.env.DASHBOARD_USERNAME || "admin") && password === (process.env.DASHBOARD_PASSWORD || "admin");
}

export async function createSession() {
  const value = `admin.${Date.now()}`;
  const token = `${value}.${sign(value)}`;
  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearSession() {
  (await cookies()).delete(cookieName);
}

export async function isAuthenticated() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const value = `${parts[0]}.${parts[1]}`;
  const expected = sign(value);
  const actualBuffer = Buffer.from(parts[2]);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}
