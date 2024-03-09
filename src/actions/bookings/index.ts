"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { headers } from "next/headers";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getCheckoutSession(startTime: string) {
  const schedule = new Date(startTime);
  const screening = await db.screening.findFirst({ where: { startTime: schedule }, include: { movie: true, studio: true } });
  const session = await auth();
  const header = headers();
  const origin = header.get("origin");

  if (!session?.user || !screening) return;

  const response = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${origin}`,
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
        quantity: 1,
      },
    ],
  });

  return response;
}
