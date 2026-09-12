import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, isRead } = await req.json();
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await db
      .update(contactMessages)
      .set({ isRead: Boolean(isRead) })
      .where(eq(contactMessages.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Update message error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
