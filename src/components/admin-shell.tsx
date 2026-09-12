import Link from "next/link";
import { logout } from "@/app/admin/login/actions";
import { env } from "@/lib/env";
import type { AppRole } from "@/lib/auth/require-role";

export function AdminShell({ children, role }: { children: React.ReactNode; role: AppRole | null }) {
  const canManageUsers = role === "OWNER" && Boolean(env.serviceRoleKey);
  return <div className="admin-layout">
    <aside className="admin-sidebar">
      <Link className="brand" href="/">Alakhiarov Salekh</Link>
      <div className="admin-role">{role ?? "SETUP MODE"}</div>
      <nav>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/projects">Projects</Link>
        <Link href="/admin/projects/new">Add project</Link>
        {canManageUsers && <Link href="/admin/users">Users</Link>}
        <Link href="/">View portfolio ↗</Link>
      </nav>
      <form action={logout}><button className="ghost-admin" type="submit">Sign out</button></form>
    </aside>
    <main className="admin-main">{children}</main>
  </div>;
}
