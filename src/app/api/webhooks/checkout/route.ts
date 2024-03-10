import { db } from "@/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");
    if (!sig) throw new Error("Unauthorized");
    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    if (event.type === "checkout.session.completed") {
      const checkoutSessionCompleted = event.data.object;
      const seatsBooked = checkoutSessionCompleted?.metadata?.seatsBooked.split(", ") as string[];
      const user = await db.user.findFirst({ where: { email: checkoutSessionCompleted.customer_email as string } });
      const screening = await db.screening.findFirst({ where: { id: checkoutSessionCompleted.client_reference_id as string } });
      if (!screening) {
        throw new Error("No screening found");
      }
      screening.availableSeats.available = screening.availableSeats.available.filter((seat) => !seatsBooked.includes(seat));
      screening.availableSeats.sold = screening.availableSeats.sold.concat(seatsBooked);
      // Then define and call a function to handle the event checkout.session.completed
      await db.screening.update({ where: { id: checkoutSessionCompleted.client_reference_id as string }, data: { availableSeats: screening.availableSeats } });
      await db.booking.create({
        data: {
          screeningId: checkoutSessionCompleted.client_reference_id as string,
          totalAmount: checkoutSessionCompleted.amount_total as number,
          userId: user?.id as string,
          seatsBooked: checkoutSessionCompleted.metadata?.seatsBooked.split(", ") as string[],
        },
      });
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(`💥 Error message: ${err.message}`);
      return new Response(`Webhook error: ${err.message}`, { status: 400 });
    } else {
      console.log(`💥 Error message: Something bad happen`);
      return new Response(`Webhook error: Something bad happen`, { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
