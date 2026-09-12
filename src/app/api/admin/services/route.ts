import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await req.json();
    if (!b.titleId || !b.titleEn || !b.slug || b.price == null || b.duration == null) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await db.insert(services).values({
      titleId: b.titleId,
      titleEn: b.titleEn,
      descId: b.descId || null,
      descEn: b.descEn || null,
      price: Number(b.price),
      duration: Number(b.duration),
      category: b.category || "Umum",
      slug: b.slug,
      isActive: Boolean(b.isActive),
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Create service error:", e);
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
      .update(services)
      .set({
        titleId: b.titleId,
        titleEn: b.titleEn,
        descId: b.descId || null,
        descEn: b.descEn || null,
        price: Number(b.price),
        duration: Number(b.duration),
        category: b.category,
        slug: b.slug,
        isActive: Boolean(b.isActive),
      })
      .where(eq(services.id, b.id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Update service error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await db.delete(services).where(eq(services.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete service error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
