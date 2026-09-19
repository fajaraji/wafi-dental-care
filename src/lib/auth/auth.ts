import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { adminUsers, loginAttempts } from "@/lib/db/schema";
import crypto from "crypto";

const MAX_ATTEMPTS = 5;
const LOCK_MS = 60 * 1000; // 1 minute

async function isLocked(email: string): Promise<boolean> {
  const rows = await db.select().from(loginAttempts).where(eq(loginAttempts.email, email)).limit(1);
  const rec = rows[0];
  if (!rec || !rec.lockedUntil) return false;
  if (rec.lockedUntil.getTime() > Date.now()) return true;
  await db.delete(loginAttempts).where(eq(loginAttempts.email, email));
  return false;
}

async function recordFailure(email: string) {
  const rows = await db.select().from(loginAttempts).where(eq(loginAttempts.email, email)).limit(1);
  const rec = rows[0];
  const count = (rec?.count ?? 0) + 1;
  if (count >= MAX_ATTEMPTS) {
    await db
      .insert(loginAttempts)
      .values({ email, count: 0, lockedUntil: new Date(Date.now() + LOCK_MS) })
      .onConflictDoUpdate({
        target: loginAttempts.email,
        set: { count: 0, lockedUntil: new Date(Date.now() + LOCK_MS) },
      });
  } else {
    await db
      .insert(loginAttempts)
      .values({ email, count, lockedUntil: null })
      .onConflictDoUpdate({
        target: loginAttempts.email,
        set: { count, lockedUntil: null },
      });
  }
}

async function clearAttempts(email: string) {
  await db.delete(loginAttempts).where(eq(loginAttempts.email, email));
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const verify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === verify;
}

const authSecret = process.env.AUTH_SECRET;

if (!authSecret && process.env.NODE_ENV === "production") {
  throw new Error("AUTH_SECRET is required in production");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        if (await isLocked(email)) {
          throw new Error("Terlalu banyak percobaan. Coba lagi dalam 1 menit.");
        }

        const users = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.email, email))
          .limit(1);

        const user = users[0];
        if (!user || !user.isActive) {
          await recordFailure(email);
          return null;
        }

        const valid = verifyPassword(
          credentials.password as string,
          user.passwordHash
        );

        if (!valid) {
          await recordFailure(email);
          return null;
        }

        await clearAttempts(email);

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role || "admin",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: authSecret,
});

export { hashPassword };
