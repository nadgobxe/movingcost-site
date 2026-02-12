import { ensureServerOnly } from "./server-only";

ensureServerOnly();

import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

export const pool = new Pool({ connectionString: databaseUrl });

export async function query<T = unknown>(
  text: string,
  params?: Array<string | number | boolean | null>
) {
  const client = await pool.connect();
  try {
    const res = await client.query<T>(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}
