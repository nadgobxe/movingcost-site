import { cookies, headers } from "next/headers";
import { randomBytes, scryptSync } from "crypto";
import { query } from "./db";

const SESSION_COOKIE = "mc_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

type QueryParam = string | number | boolean | null | Date;

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hashed = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashed}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  const hashed = scryptSync(password, salt, 64).toString("hex");
  return hashed === hash;
}

async function createSession(userId: string) {
  const token = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  await query(
    "INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3)",
    [token, userId, expiresAt] as QueryParam[],
  );
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
  });
}

async function destroySession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) {
    await query("DELETE FROM sessions WHERE token = $1", [token]);
    cookies().delete(SESSION_COOKIE);
  }
}

async function auditLogin(userId: string | null, success: boolean) {
  const hdrs = headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const agent = hdrs.get("user-agent") ?? "unknown";
  await query(
    "INSERT INTO audit_logins (user_id, ip_address, user_agent, success) VALUES ($1,$2,$3,$4)",
    [userId, ip, agent, success],
  );
}

export async function login(email: string, password: string) {
  const users = await query<{ id: string; password_hash: string }>(
    "SELECT id, password_hash FROM users WHERE email = $1",
    [email],
  );
  const user = users.at(0);
  const success = user ? verifyPassword(password, user.password_hash) : false;

  await auditLogin(user?.id ?? null, success);

  if (!user || !success) {
    throw new Error("invalid_credentials");
  }

  await createSession(user.id);
}

export async function logout() {
  await destroySession();
}

export async function register(email: string, password: string) {
  const hashed = hashPassword(password);
  const users = await query<{ id: string }>(
    "INSERT INTO users (email, password_hash) VALUES ($1,$2) RETURNING id",
    [email, hashed],
  );
  await createSession(users[0].id);
}
