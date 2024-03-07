"use server";

import { db } from "@/db";

export async function getScreenings(slug: string) {
  const movie = await db.movie.findFirst({ where: { slug } });
  const screenings = await db.screening.findMany({ where: { movieId: movie?.id }, include: { studio: true } });
  return { movie, screenings };
}
