import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { patients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await req.json();
    if (!b.id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await db
      .update(patients)
      .set({ name: b.name, email: b.email || null, phone: b.phone })
      .where(eq(patients.id, b.id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Update patient error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await db.delete(patients).where(eq(patients.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete patient error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
