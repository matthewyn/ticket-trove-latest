"use server";

import * as auth from "@/auth";

export async function signIn() {
  return auth.signIn("google", { redirectTo: "/" });
}

export async function signOut() {
  return auth.signOut({ redirectTo: "/" });
}
