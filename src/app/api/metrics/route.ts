import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  const data = await query<{ metric_date: string; total_clicks: number; total_leads: number }>(
    "SELECT metric_date, total_clicks, total_leads FROM metrics_daily ORDER BY metric_date DESC LIMIT 14"
  );
  return NextResponse.json({ data });
}
