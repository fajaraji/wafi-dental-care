import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import AdminLayoutClient from "@/components/AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutClient userName={session.user.name || undefined}>
      {children}
    </AdminLayoutClient>
  );
}
