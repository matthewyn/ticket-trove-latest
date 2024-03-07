"use server";

import * as auth from "@/auth";
import { paths } from "@/paths";

export async function signInGoogle() {
  return auth.signIn("google", { redirectTo: paths.home() });
}

export async function signOut() {
  return auth.signOut({ redirectTo: paths.home() });
}
