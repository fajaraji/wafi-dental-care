import { NextRequest, NextResponse } from "next/server";
import { generateSnapToken, generateOrderId, SnapParam } from "@/lib/midtrans";
import { getServiceById, getDoctorById } from "@/lib/booking-utils";

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

    const service = getServiceById(Number(serviceId));
    const doctor = getDoctorById(Number(doctorId));

    if (!service || !doctor) {
      return NextResponse.json(
        { error: "Layanan atau dokter tidak ditemukan" },
        { status: 404 }
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
          name: `${isId ? service.titleId : service.titleEn} — drg. ${doctor.name.split(",")[0]} | ${date} ${timeSlot}`,
        },
      ],
      callbacks: {
        finish: `${req.nextUrl.origin}/${locale}/booking/success?order_id=${orderId}`,
        error: `${req.nextUrl.origin}/${locale}/booking?status=error`,
        pending: `${req.nextUrl.origin}/${locale}/booking?status=pending`,
      },
    };

    const snapResponse = await generateSnapToken(snapParams);

    return NextResponse.json({
      token: snapResponse.token,
      redirect_url: snapResponse.redirect_url,
      order_id: orderId,
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
