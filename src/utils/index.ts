import bcrypt from "bcryptjs";
import crypto from "crypto";

export function formatRuntime(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours} h ${minutes} m`;
}

export function formatTimeFromUrl(time: string) {
  return time.replace(/%3A/g, ":");
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 12);
}

export function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function comparePassword(password: string, currentPassword: string) {
  return await bcrypt.compare(password, currentPassword);
}

export function formatTime(time: Date) {
  return new Date(time).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function formatDate(time: Date) {
  return new Date(time).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" });
}
