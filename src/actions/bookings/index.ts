"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { headers } from "next/headers";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getCheckoutSession(startTime: string, seatsBooked: string[]) {
  const schedule = new Date(startTime);
  const screening = await db.screening.findFirst({ where: { startTime: schedule }, include: { movie: true, studio: true } });
  const session = await auth();
  const header = headers();
  const origin = header.get("origin");

  if (!session?.user || !screening) return;

  const response = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${origin}/bookings`,
    cancel_url: `${origin}/movies/${screening.movie.slug}`,
    customer_email: session.user.email,
    client_reference_id: screening.id,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `${screening.movie.title} Movie`,
            description: `${screening.movie.summary}`,
            images: [`${process.env.TMDB_POSTER_URL_PATH}/w300${screening.movie.poster}`],
          },
          currency: "usd",
          unit_amount: screening.studio.price * 100,
        },
        quantity: seatsBooked.length,
      },
    ],
    metadata: {
      seatsBooked: seatsBooked.join(", "),
    },
  });

  return response;
}

export async function getBookings() {
  const session = await auth();
  return await db.booking.findMany({ where: { userId: session?.user.id }, include: { screening: { select: { movie: true, studio: true, startTime: true, endTime: true } } }, orderBy: [{ createdAt: "desc" }] });
}

export async function getBooking(id: string) {
  return await db.booking.findFirst({ where: { id }, include: { screening: { select: { movie: true, studio: true, startTime: true, endTime: true } } } });
}
