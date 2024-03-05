"use server";

import { db } from "@/db";

export async function getMovies() {
  return await db.movie.findMany({});
}

export async function getMovie(slug: string) {
  return await db.movie.findFirst({ where: { slug } });
}
