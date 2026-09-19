import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function verifySignature(body: any): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return true; // dev fallback — warn: enable in production

  const orderId = String(body.order_id ?? "");
  const statusCode = String(body.status_code ?? "");
  const grossAmount = String(body.gross_amount ?? "");

  const expected = crypto
    .createHash("sha512")
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest("hex");

  const provided = body.signature_key;
  return provided === expected;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!verifySignature(body)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const orderId = body.order_id;
    const transactionStatus = body.transaction_status;
    const fraudStatus = body.fraud_status;

    if (!orderId) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    // Map Midtrans status to our payment status
    let paymentStatus = "pending";
    let bookingStatus = "pending";

    if (transactionStatus === "capture" && fraudStatus === "accept") {
      paymentStatus = "settlement";
      bookingStatus = "confirmed";
    } else if (transactionStatus === "settlement") {
      paymentStatus = "settlement";
      bookingStatus = "confirmed";
    } else if (["cancel", "deny", "expire"].includes(transactionStatus)) {
      paymentStatus = transactionStatus;
      bookingStatus = "cancelled";
    } else if (transactionStatus === "pending") {
      paymentStatus = "pending";
    }

    await db
      .update(bookings)
      .set({
        paymentStatus,
        status: bookingStatus,
        updatedAt: new Date(),
      })
      .where(eq(bookings.midtransOrderId, orderId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Midtrans webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
