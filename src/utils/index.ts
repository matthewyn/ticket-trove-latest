import { useSession } from "next-auth/react";

export function formatRuntime(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours} h ${minutes} m`;
}

export function formatTimeFromUrl(time: string) {
  return time.replace(/%3A/g, ":");
}
