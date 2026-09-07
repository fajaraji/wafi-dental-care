import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";

async function parseDate(value: string | null | undefined): Promise<Date | null> {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.titleId || !body.titleEn || !body.slug) {
      return NextResponse.json({ error: "titleId, titleEn, slug required" }, { status: 400 });
    }

    const publishedAt = await parseDate(body.publishedAt);
    const [created] = await db
      .insert(blogPosts)
      .values({
        titleId: body.titleId,
        titleEn: body.titleEn,
        contentId: body.contentId || "",
        contentEn: body.contentEn || null,
        excerptId: body.excerptId || null,
        excerptEn: body.excerptEn || null,
        slug: body.slug,
        image: body.image || null,
        categoryId: body.categoryId || null,
        categoryEn: body.categoryEn || null,
        author: body.author || null,
        isPublished: Boolean(body.isPublished),
        publishedAt,
      })
      .returning({ id: blogPosts.id });

    return NextResponse.json({ success: true, id: created.id });
  } catch (err) {
    console.error("Create blog post error:", err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const publishedAt = await parseDate(body.publishedAt);
    await db
      .update(blogPosts)
      .set({
        titleId: body.titleId,
        titleEn: body.titleEn,
        contentId: body.contentId,
        contentEn: body.contentEn || null,
        excerptId: body.excerptId || null,
        excerptEn: body.excerptEn || null,
        slug: body.slug,
        image: body.image || null,
        categoryId: body.categoryId || null,
        categoryEn: body.categoryEn || null,
        author: body.author || null,
        isPublished: Boolean(body.isPublished),
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, body.id));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update blog post error:", err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete blog post error:", err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
