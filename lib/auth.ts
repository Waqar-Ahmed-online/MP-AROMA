import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || "");
const COOKIE_NAME = "admin_session";

export async function createSessionToken(username: string): Promise<string> {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return { username: payload.username as string };
  } catch {
    return null;
  }
}

export async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;