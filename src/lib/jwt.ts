import "./server-only";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

export type SessionPayload = {
  sub: string;
  role: string;
  exp: number;
};

export function signSession(userId: string, role: string, expiresAt: Date) {
  return jwt.sign({ sub: userId, role, exp: Math.floor(expiresAt.getTime() / 1000) }, JWT_SECRET as jwt.Secret);
}

export function verifySession(token: string) {
  return jwt.verify(token, JWT_SECRET as jwt.Secret) as SessionPayload;
}
