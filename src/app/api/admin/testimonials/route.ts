import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await req.json();
    if (!b.patientName || !b.contentId) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    await db.insert(testimonials).values({
      patientName: b.patientName,
      rating: Number(b.rating) || 5,
      contentId: b.contentId,
      contentEn: b.contentEn || null,
      isActive: Boolean(b.isActive),
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Create testimonial error:", e);
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
      .update(testimonials)
      .set({
        patientName: b.patientName,
        rating: Number(b.rating) || 5,
        contentId: b.contentId,
        contentEn: b.contentEn || null,
        isActive: Boolean(b.isActive),
      })
      .where(eq(testimonials.id, b.id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Update testimonial error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await db.delete(testimonials).where(eq(testimonials.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete testimonial error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
