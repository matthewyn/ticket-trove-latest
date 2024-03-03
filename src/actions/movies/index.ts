"use server";

import { db } from "@/db";

export async function getMovies() {
  return await db.movie.findMany({});
}
