"use client";

import { useState, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { getAllServices, getAllDoctors, formatIDR, dayNames } from "@/lib/utils/helpers";
import { generateTimeSlots, formatDateDisplay } from "@/lib/booking-utils";
import type { BookingFormData } from "@/lib/booking-utils";

type Step = 1 | 2 | 3 | 4 | 5;

// ─── Midtrans Snap types ──────────────────────────────────────
declare global {
  interface Window {
    snap?: {
      pay: (token: string, options?: Record<string, unknown>) => void;
    };
  }
}

type SnapResponse = {
  token: string;
  redirect_url: string;
  order_id: string;
};

// ─── Sub-components ───────────────────────────────────────────

function StepIndicator({ step, t }: { step: Step; t: (k: string) => string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {([1, 2, 3, 4, 5] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  s === step
                    ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30 scale-110"
                    : s < step
                    ? "bg-accent-500 text-white"
                    : "bg-gray-200 text-text-muted"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              <span
                className={`mt-1.5 text-xs font-semibold whitespace-nowrap ${
                  s <= step ? "text-brand-600" : "text-text-muted"
                }`}
              >
                {t(`step${s}`)}
              </span>
            </div>
            {i < 4 && (
              <div
                className={`mx-1 mb-5 h-0.5 w-8 sm:w-16 transition-colors duration-300 ${
                  s < step ? "bg-accent-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectService({
  selected,
  onSelect,
  onNext,
  t,
  ct,
}: {
  selected: number | null;
  onSelect: (id: number) => void;
  onNext: () => void;
  t: (k: string) => string;
  ct: (k: string) => string;
}) {
  const locale = useLocale();
  const isId = locale === "id";
  const services = getAllServices();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
    >
      <h2 className="text-2xl font-extrabold text-text-primary font-display mb-2">
        {t("step1")}
      </h2>
      <p className="text-text-muted mb-6">{t("step1Desc")}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((svc) => (
          <button
            key={svc.id}
            onClick={() => onSelect(svc.id)}
            className={`group rounded-xl border-2 p-4 text-left transition-all duration-300 ${
              selected === svc.id
                ? "border-brand-600 bg-brand-50 shadow-md"
                : "border-gray-200 hover:border-brand-300 hover:bg-brand-50/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-text-primary group-hover:text-brand-600 transition-colors">
                  {isId ? svc.titleId : svc.titleEn}
                </p>
                <span className="text-xs text-text-muted">{svc.category}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-extrabold text-accent-600">
                  {formatIDR(svc.price)}
                </p>
                <p className="text-xs text-text-muted">
                  {svc.duration} {t("minutes")}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!selected}
          className="rounded-full bg-ink px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {ct("nextStep")} →
        </button>
      </div>
    </motion.div>
  );
}

function SelectDoctor({
  selected,
  onSelect,
  onNext,
  onBack,
  t,
  ct,
}: {
  selected: number | null;
  onSelect: (id: number) => void;
  onNext: () => void;
  onBack: () => void;
  t: (k: string) => string;
  ct: (k: string) => string;
}) {
  const locale = useLocale();
  const isId = locale === "id";
  const doctors = getAllDoctors();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
    >
      <h2 className="text-2xl font-extrabold text-text-primary font-display mb-2">
        {t("step2")}
      </h2>
      <p className="text-text-muted mb-6">{t("step2Desc")}</p>

      <div className="space-y-3">
        {doctors.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelect(doc.id)}
            className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-300 ${
              selected === doc.id
                ? "border-brand-600 bg-brand-50 shadow-md"
                : "border-gray-200 hover:border-brand-300 hover:bg-brand-50/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-brand-600/25 font-bold text-lg text-brand-700">
                {doc.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-text-primary">{doc.name}</p>
                <p className="text-sm text-accent-600 font-medium">
                  {isId ? doc.titleId : doc.titleEn}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {doc.schedules.map((s, i) => (
                    <span
                      key={i}
                      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-text-muted"
                    >
                      {dayNames[isId ? "id" : "en"][s.dayOfWeek].slice(0, 3)}{" "}
                      {s.startTime}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="rounded-xl border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-text-secondary hover:bg-gray-50 transition-colors"
        >
          ← {ct("back")}
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="rounded-full bg-ink px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {ct("nextStep")} →
        </button>
      </div>
    </motion.div>
  );
}

function SelectSchedule({
  doctorId,
  date,
  timeSlot,
  onDateChange,
  onSlotSelect,
  onNext,
  onBack,
  t,
  ct,
}: {
  doctorId: number | null;
  date: string | null;
  timeSlot: string | null;
  onDateChange: (d: string) => void;
  onSlotSelect: (s: string) => void;
  onNext: () => void;
  onBack: () => void;
  t: (k: string) => string;
  ct: (k: string) => string;
}) {
  const slots: { time: string; available: boolean }[] = doctorId
    ? generateTimeSlots(doctorId, date)
    : [];

  // Generate next 14 dates
  const today = new Date();
  const dates: string[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1); // start from tomorrow
    dates.push(d.toISOString().slice(0, 10));
  }

  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
    >
      <h2 className="text-2xl font-extrabold text-text-primary font-display mb-2">
        {t("step3")}
      </h2>
      <p className="text-text-muted mb-6">{t("step3Desc")}</p>

      {/* Date picker */}
      <p className="text-sm font-semibold text-text-primary mb-3">
        {t("selectDate")}
      </p>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
        {dates.map((d) => (
          <button
            key={d}
            onClick={() => {
              onDateChange(d);
              onSlotSelect("");
            }}
            className={`rounded-xl border-2 py-3 text-center text-xs transition-all duration-300 ${
              date === d
                ? "border-brand-600 bg-brand-50 text-brand-600 font-bold"
                : "border-gray-200 text-text-secondary hover:border-brand-300"
            }`}
          >
            <span className="block text-[10px] uppercase">
              {new Date(d + "T00:00:00").toLocaleDateString(
                locale === "id" ? "id-ID" : "en-US",
                { weekday: "short" }
              )}
            </span>
            <span className="block text-lg">
              {new Date(d + "T00:00:00").getDate()}
            </span>
            <span className="block text-[10px]">
              {new Date(d + "T00:00:00").toLocaleDateString(
                locale === "id" ? "id-ID" : "en-US",
                { month: "short" }
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Time slots */}
      {date && (
        <>
          <p className="text-sm font-semibold text-text-primary mb-3">
            {t("selectTime")}
          </p>
          {slots.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => onSlotSelect(slot.time)}
                  disabled={!slot.available}
                  className={`rounded-xl border-2 py-3 text-sm font-semibold transition-all duration-300 ${
                    timeSlot === slot.time
                      ? "border-brand-600 bg-brand-50 text-brand-600 shadow-md"
                      : "border-gray-200 text-text-secondary hover:border-brand-300"
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-surface-light p-8 text-center">
              <p className="text-text-muted">{t("noSchedule")}</p>
            </div>
          )}
        </>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="rounded-xl border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-text-secondary hover:bg-gray-50 transition-colors"
        >
          ← {ct("back")}
        </button>
        <button
          onClick={onNext}
          disabled={!date || !timeSlot}
          className="rounded-full bg-ink px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {ct("nextStep")} →
        </button>
      </div>
    </motion.div>
  );
}

function PatientDetails({
  data,
  onChange,
  onNext,
  onBack,
  t,
  ct,
}: {
  data: BookingFormData;
  onChange: (f: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  t: (k: string) => string;
  ct: (k: string) => string;
}) {
  const isValid = data.patientName.trim() && data.patientPhone.trim();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
    >
      <h2 className="text-2xl font-extrabold text-text-primary font-display mb-2">
        {t("step4")}
      </h2>
      <p className="text-text-muted mb-6">{t("step4Desc")}</p>

      <div className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">
            {t("fullName")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.patientName}
            onChange={(e) => onChange({ patientName: e.target.value })}
            placeholder={t("fullNamePlaceholder")}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/10 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">
            {t("phone")} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={data.patientPhone}
            onChange={(e) => onChange({ patientPhone: e.target.value })}
            placeholder="0812-3456-7890"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/10 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">
            {t("email")}
          </label>
          <input
            type="email"
            value={data.patientEmail}
            onChange={(e) => onChange({ patientEmail: e.target.value })}
            placeholder="contoh@email.com"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/10 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">
            {t("notes")}
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder={t("notesPlaceholder")}
            rows={3}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-text-primary focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/10 transition-all resize-none"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="rounded-xl border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-text-secondary hover:bg-gray-50 transition-colors"
        >
          ← {ct("back")}
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="rounded-full bg-ink px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {ct("nextStep")} →
        </button>
      </div>
    </motion.div>
  );
}

function ReviewAndPay({
  data,
  onBack,
  isProcessing,
  onPay,
  t,
  ct,
}: {
  data: BookingFormData;
  onBack: () => void;
  isProcessing: boolean;
  onPay: () => void;
  t: (k: string) => string;
  ct: (k: string) => string;
}) {
  const locale = useLocale();
  const isId = locale === "id";
  const service = getAllServices().find((s) => s.id === data.serviceId);
  const doctor = getAllDoctors().find((d) => d.id === data.doctorId);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
    >
      <h2 className="text-2xl font-extrabold text-text-primary font-display mb-2">
        {t("step5")}
      </h2>
      <p className="text-text-muted mb-6">{t("step5Desc")}</p>

      <div className="rounded-2xl bg-surface-light p-6 space-y-4">
        <div className="flex justify-between pb-3 border-b border-gray-200">
          <span className="text-text-muted">{t("service")}</span>
          <span className="font-bold text-text-primary">
            {service ? (isId ? service.titleId : service.titleEn) : ""}
          </span>
        </div>
        <div className="flex justify-between pb-3 border-b border-gray-200">
          <span className="text-text-muted">{t("doctor")}</span>
          <span className="font-bold text-text-primary">
            {doctor?.name || ""}
          </span>
        </div>
        <div className="flex justify-between pb-3 border-b border-gray-200">
          <span className="text-text-muted">{t("schedule")}</span>
          <span className="font-bold text-text-primary">
            {data.date ? formatDateDisplay(data.date, locale) : ""} · {data.timeSlot} WIB
          </span>
        </div>
        <div className="flex justify-between pb-3 border-b border-gray-200">
          <span className="text-text-muted">{t("patient")}</span>
          <span className="font-bold text-text-primary">
            {data.patientName} · {data.patientPhone}
          </span>
        </div>
        {data.notes && (
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-text-muted">{t("notes")}</span>
            <span className="text-sm text-text-secondary max-w-[200px] text-right">
              {data.notes}
            </span>
          </div>
        )}
        <div className="flex justify-between pt-2">
          <span className="text-lg font-bold text-text-primary">{ct("total")}</span>
          <span className="text-2xl font-extrabold text-accent-600">
            {service ? formatIDR(service.price) : ""}
          </span>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="rounded-xl border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-text-secondary hover:bg-gray-50 transition-colors disabled:opacity-40"
        >
          ← {ct("back")}
        </button>
        <button
          onClick={onPay}
          disabled={isProcessing}
          className="rounded-full bg-ink px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:opacity-60 flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {t("processing")}
            </>
          ) : (
            <>
              💳 {t("payNow")}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Booking Component ───────────────────────────────────

export default function BookingPage() {
  const locale = useLocale();
  const t = useTranslations("booking");
  const ct = useTranslations("common");
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<BookingFormData>({
    serviceId: null,
    doctorId: null,
    date: null,
    timeSlot: null,
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    notes: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const updateForm = useCallback(
    (patch: Partial<BookingFormData>) => setForm((f) => ({ ...f, ...patch })),
    []
  );

  const handlePay = async () => {
    setIsProcessing(true);
    setError("");

    try {
      const res = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });

      const data: SnapResponse & { error?: string } = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Gagal memproses pembayaran");
        setIsProcessing(false);
        return;
      }

      // Load Midtrans Snap
      if (!window.snap) {
        const script = document.createElement("script");
        script.src =
          "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "SB-Mid-client-placeholder");
        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Gagal memuat Midtrans"));
          document.head.appendChild(script);
        });
      }

      window.snap!.pay(data.token, {
        onSuccess() {
          window.location.href = `/${locale}/booking/success?order_id=${data.order_id}`;
        },
        onPending() {
          window.location.href = `/${locale}/booking/success?order_id=${data.order_id}&status=pending`;
        },
        onError() {
          setError("Pembayaran gagal. Silakan coba lagi.");
          setIsProcessing(false);
        },
        onClose() {
          setIsProcessing(false);
        },
      });
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-brand-900 pt-32 pb-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-lg text-white/70">{t("subtitle")}</p>
        </div>
      </div>

      {/* Booking Steps */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <StepIndicator step={step} t={t} />

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
              <button
                onClick={() => setError("")}
                className="ml-2 font-bold hover:underline"
              >
                ✕
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <SelectService
                key="s1"
                selected={form.serviceId}
                onSelect={(id) => updateForm({ serviceId: id })}
                onNext={() => setStep(2)}
                t={t}
                ct={ct}
              />
            )}
            {step === 2 && (
              <SelectDoctor
                key="s2"
                selected={form.doctorId}
                onSelect={(id) => updateForm({ doctorId: id })}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
                t={t}
                ct={ct}
              />
            )}
            {step === 3 && (
              <SelectSchedule
                key="s3"
                doctorId={form.doctorId}
                date={form.date}
                timeSlot={form.timeSlot}
                onDateChange={(d) => updateForm({ date: d })}
                onSlotSelect={(s) => updateForm({ timeSlot: s })}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
                t={t}
                ct={ct}
              />
            )}
            {step === 4 && (
              <PatientDetails
                key="s4"
                data={form}
                onChange={updateForm}
                onNext={() => setStep(5)}
                onBack={() => setStep(3)}
                t={t}
                ct={ct}
              />
            )}
            {step === 5 && (
              <ReviewAndPay
                key="s5"
                data={form}
                onBack={() => setStep(4)}
                isProcessing={isProcessing}
                onPay={handlePay}
                t={t}
                ct={ct}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
