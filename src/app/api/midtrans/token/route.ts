import { NextRequest, NextResponse } from "next/server";
import { generateSnapToken, generateOrderId, SnapParam } from "@/lib/midtrans";
import { db } from "@/lib/db";
import { patients, bookings } from "@/lib/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { getServiceByIdFromDb, getDoctorByIdFromDb } from "@/lib/db/queries";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      serviceId,
      doctorId,
      date,
      timeSlot,
      patientName,
      patientEmail,
      patientPhone,
      notes,
      locale = "id",
    } = body;

    // Validate
    if (!serviceId || !doctorId || !date || !timeSlot || !patientName || !patientPhone) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const service = await getServiceByIdFromDb(Number(serviceId));
    const doctor = await getDoctorByIdFromDb(Number(doctorId));

    if (!service || !doctor) {
      return NextResponse.json(
        { error: "Layanan atau dokter tidak ditemukan" },
        { status: 404 }
      );
    }

    // Normalize "HH:MM" -> "HH:MM:00" for `time` column
    const timeSlotNorm = timeSlot.length === 5 ? `${timeSlot}:00` : timeSlot;

    // Prevent double-booking same doctor + date + slot
    const conflict = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.doctorId, Number(doctorId)),
          eq(bookings.bookingDate, date),
          eq(bookings.timeSlot, timeSlotNorm),
          ne(bookings.status, "cancelled")
        )
      )
      .limit(1);

    if (conflict.length > 0) {
      return NextResponse.json(
        { error: "Jadwal ini sudah dibooking. Silakan pilih waktu lain." },
        { status: 409 }
      );
    }

    const orderId = generateOrderId("WDC");
    const isId = locale === "id";

    const snapParams: SnapParam = {
      transaction_details: {
        order_id: orderId,
        gross_amount: service.price,
      },
      customer_details: {
        first_name: patientName,
        email: patientEmail || undefined,
        phone: patientPhone,
      },
      item_details: [
        {
          id: `SVC-${service.id}`,
          price: service.price,
          quantity: 1,
          name: (isId ? service.titleId : service.titleEn).slice(0, 50),
        },
      ],
      callbacks: {
        finish: `${req.nextUrl.origin}/${locale}/booking/success?order_id=${orderId}`,
        error: `${req.nextUrl.origin}/${locale}/booking?status=error`,
        pending: `${req.nextUrl.origin}/${locale}/booking?status=pending`,
      },
    };

    const snapResponse = await generateSnapToken(snapParams);

    // Upsert patient by phone
    const existingPatients = await db
      .select()
      .from(patients)
      .where(eq(patients.phone, patientPhone))
      .limit(1);
    let patientId = existingPatients[0]?.id;
    if (!patientId) {
      const [created] = await db
        .insert(patients)
        .values({
          name: patientName,
          email: patientEmail || null,
          phone: patientPhone,
        })
        .returning({ id: patients.id });
      patientId = created.id;
    }

    // Persist booking (status pending until webhook confirms payment)
    const [booking] = await db
      .insert(bookings)
      .values({
        bookingCode: orderId,
        patientId,
        doctorId: Number(doctorId),
        serviceId: Number(serviceId),
        bookingDate: date,
        timeSlot: timeSlotNorm,
        status: "pending",
        paymentStatus: "pending",
        midtransOrderId: orderId,
        totalAmount: service.price,
        notes: notes || null,
      })
      .returning({ id: bookings.id });

    return NextResponse.json({
      token: snapResponse.token,
      redirect_url: snapResponse.redirect_url,
      order_id: orderId,
      bookingId: booking.id,
      metadata: {
        serviceId,
        doctorId,
        date,
        timeSlot,
        patientName,
        patientEmail,
        patientPhone,
        notes,
        amount: service.price,
      },
    });
  } catch (err: unknown) {
    console.error("Snap token error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Gagal membuat token pembayaran" },
      { status: 500 }
    );
  }
}
