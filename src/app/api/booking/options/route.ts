import { NextResponse } from "next/server";
import { getServicesFromDb, getDoctorsFromDb } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [services, doctors] = await Promise.all([
      getServicesFromDb(),
      getDoctorsFromDb(),
    ]);
    return NextResponse.json({ services, doctors });
  } catch (err) {
    console.error("Booking options error:", err);
    return NextResponse.json({ error: "Failed to load options" }, { status: 500 });
  }
}
