"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/session";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  // Cookie used by earlier versions of the dashboard.
  cookieStore.delete("dashboard_auth");
  redirect("/dashboard/login");
}
