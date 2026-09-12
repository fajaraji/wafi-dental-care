import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { doctors, doctorSchedules } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

type ScheduleInput = { dayOfWeek: number; startTime: string; endTime: string };

async function upsertSchedules(doctorId: number, schedules: ScheduleInput[]) {
  await db.delete(doctorSchedules).where(eq(doctorSchedules.doctorId, doctorId));
  for (const s of schedules) {
    if (!s.startTime || !s.endTime) continue;
    await db.insert(doctorSchedules).values({
      doctorId,
      dayOfWeek: Number(s.dayOfWeek),
      startTime: s.startTime,
      endTime: s.endTime,
      isActive: true,
    });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await req.json();
    if (!b.name) return NextResponse.json({ error: "name required" }, { status: 400 });
    const [created] = await db
      .insert(doctors)
      .values({
        name: b.name,
        title: b.title || "drg.",
        specialtyId: b.specialtyId || "",
        specialtyEn: b.specialtyEn || "",
        photo: b.photo || null,
        bioId: b.bioId || null,
        bioEn: b.bioEn || null,
        isActive: Boolean(b.isActive),
      })
      .returning({ id: doctors.id });
    await upsertSchedules(created.id, b.schedules || []);
    return NextResponse.json({ success: true, id: created.id });
  } catch (e) {
    console.error("Create doctor error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await req.json();
    if (!b.id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await db
      .update(doctors)
      .set({
        name: b.name,
        title: b.title || "drg.",
        specialtyId: b.specialtyId,
        specialtyEn: b.specialtyEn,
        photo: b.photo || null,
        bioId: b.bioId || null,
        bioEn: b.bioEn || null,
        isActive: Boolean(b.isActive),
      })
      .where(eq(doctors.id, b.id));
    await upsertSchedules(b.id, b.schedules || []);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Update doctor error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await db.delete(doctorSchedules).where(eq(doctorSchedules.doctorId, id));
    await db.delete(doctors).where(eq(doctors.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete doctor error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
