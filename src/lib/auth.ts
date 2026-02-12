import { headers } from "next/headers";
import { randomBytes, scryptSync } from "crypto";
import { query } from "./db";
import { signSession } from "./jwt";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export type SessionInfo = {
  token: string;
  expiresAt: Date;
};

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hashed = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashed}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  const hashed = scryptSync(password, salt, 64).toString("hex");
  return hashed === hash;
}

function buildSession(userId: string, role: string): SessionInfo {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const token = signSession(userId, role, expiresAt);
  return { token, expiresAt };
}

async function auditLogin(userId: string | null, success: boolean) {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const agent = hdrs.get("user-agent") ?? "unknown";
  await query(
    "INSERT INTO audit_logins (user_id, ip_address, user_agent, success) VALUES ($1,$2,$3,$4)",
    [userId, ip, agent, success],
  );
}

export async function login(email: string, password: string) {
  const users = await query<{ id: string; password_hash: string; role: string }>(
    "SELECT id, password_hash, role FROM users WHERE email = $1",
    [email],
  );
  const user = users.at(0);
  const success = user ? verifyPassword(password, user.password_hash) : false;

  await auditLogin(user?.id ?? null, success);

  if (!user || !success) {
    throw new Error("invalid_credentials");
  }

  if (user.role !== "admin") {
    throw new Error("not_authorized");
  }

  return buildSession(user.id, user.role);
}

export async function register(email: string, password: string) {
  const hashed = hashPassword(password);
  const users = await query<{ id: string; role: string }>(
    "INSERT INTO users (email, password_hash) VALUES ($1,$2) RETURNING id, role",
    [email, hashed],
  );
  return buildSession(users[0].id, users[0].role);
}
