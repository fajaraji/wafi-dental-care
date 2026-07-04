import { getAllDoctors, getAllServices, dayNames } from "@/lib/utils/helpers";

// ─── Types ────────────────────────────────────────────────────
export interface TimeSlot {
  time: string; // "08:00"
  available: boolean;
}

export interface BookingFormData {
  serviceId: number | null;
  doctorId: number | null;
  date: string | null; // "2026-07-15"
  timeSlot: string | null; // "09:30"
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes: string;
}

// ─── Time slot generator ──────────────────────────────────────
export function generateTimeSlots(
  doctorId: number,
  dateStr: string | null
): TimeSlot[] {
  if (!dateStr) return [];

  const doctor = getAllDoctors().find((d) => d.id === doctorId);
  if (!doctor) return [];

  // Get day of week for the selected date (0 = Sunday)
  const date = new Date(dateStr + "T00:00:00");
  const dayOfWeek = date.getDay();

  // Find schedule for that day
  const schedule = doctor.schedules.find((s) => s.dayOfWeek === dayOfWeek);
  if (!schedule) return [];

  // Parse times
  const [startH, startM] = schedule.startTime.split(":").map(Number);
  const [endH, endM] = schedule.endTime.split(":").map(Number);

  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  const slots: TimeSlot[] = [];
  for (let m = startMinutes; m < endMinutes; m += 30) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    const time = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
    slots.push({ time, available: true });
  }

  return slots;
}

// ─── Helpers ──────────────────────────────────────────────────
export function getServiceById(id: number) {
  return getAllServices().find((s) => s.id === id) ?? null;
}

export function getDoctorById(id: number) {
  return getAllDoctors().find((d) => d.id === id) ?? null;
}

export function formatDateDisplay(dateStr: string, locale: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString(
    locale === "id" ? "id-ID" : "en-US",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );
}

export function getDayName(dateStr: string, locale: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString(
    locale === "id" ? "id-ID" : "en-US",
    { weekday: "long" }
  );
}
