import {
  pgTable,
  serial,
  text,
  integer,
  date,
  time,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// ─── Patients ───────────────────────────────────────────────
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  dob: date("dob"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Doctors ────────────────────────────────────────────────
export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").default("drg."),
  specialtyId: text("specialty_id").notNull(),
  specialtyEn: text("specialty_en").notNull(),
  photo: text("photo"),
  bioId: text("bio_id"),
  bioEn: text("bio_en"),
  isActive: boolean("is_active").default(true),
});

// ─── Doctor Schedules ───────────────────────────────────────
export const doctorSchedules = pgTable("doctor_schedules", {
  id: serial("id").primaryKey(),
  doctorId: integer("doctor_id")
    .references(() => doctors.id)
    .notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0=Sunday, 6=Saturday
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isActive: boolean("is_active").default(true),
});

// ─── Services ───────────────────────────────────────────────
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  descId: text("desc_id"),
  descEn: text("desc_en"),
  price: integer("price").notNull(),
  duration: integer("duration").notNull(), // minutes
  category: text("category").notNull(),
  slug: text("slug").notNull().unique(),
  isActive: boolean("is_active").default(true),
});

// ─── Bookings ───────────────────────────────────────────────
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingCode: text("booking_code").notNull().unique(),
  patientId: integer("patient_id").references(() => patients.id),
  doctorId: integer("doctor_id").references(() => doctors.id),
  serviceId: integer("service_id").references(() => services.id),
  bookingDate: date("booking_date").notNull(),
  timeSlot: time("time_slot").notNull(),
  status: text("status").default("pending"),
  // pending | confirmed | in_progress | completed | cancelled
  paymentStatus: text("payment_status").default("pending"),
  // pending | settlement | expire | deny | cancel
  midtransOrderId: text("midtrans_order_id"),
  totalAmount: integer("total_amount").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Testimonials ───────────────────────────────────────────
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  patientName: text("patient_name").notNull(),
  rating: integer("rating").notNull().default(5),
  contentId: text("content_id").notNull(),
  contentEn: text("content_en"),
  photo: text("photo"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Blog Posts ─────────────────────────────────────────────
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  contentId: text("content_id").notNull(),
  contentEn: text("content_en"),
  excerptId: text("excerpt_id"),
  excerptEn: text("excerpt_en"),
  slug: text("slug").notNull().unique(),
  image: text("image"),
  categoryId: text("category_id"),
  categoryEn: text("category_en"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  author: text("author"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Contact Messages ───────────────────────────────────────
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Admin Users ────────────────────────────────────────────
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").default("admin"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});
