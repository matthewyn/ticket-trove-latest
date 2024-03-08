"use server";

import { db } from "@/db";

export async function getSeats(startTime: string) {
  const schedule = new Date(startTime);
  return await db.screening.findFirst({ where: { startTime: schedule }, select: { availableSeats: { select: { available: true, unavailable: true, sold: true } } } });
}
