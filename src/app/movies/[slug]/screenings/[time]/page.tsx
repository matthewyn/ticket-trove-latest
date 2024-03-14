"use client";

import { getSeats } from "@/actions/seats";
import { formatTimeFromUrl } from "@/utils";
import Image from "next/image";
import Script from "next/script";
import curve from "/public/curve.svg";
import { notFound } from "next/navigation";
import { CheckboxGroup, CircularProgress } from "@nextui-org/react";
import BackButton from "@/components/back-button";
import SubmitButton from "@/components/submit-button";
import { FormEventHandler, useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import CustomCheckbox from "@/components/custom-checkbox";
import toast from "react-hot-toast";
import { getCheckoutSession } from "@/actions/bookings";
import ProtectedRoute from "@/components/protected-route";
import Stripe from "stripe";
import getStripe from "@/utils/stripe";

interface MovieSeatsProps {
  params: {
    time: string;
  };
}

interface availableSeats {
  availableSeats: Prisma.ScreeningsAvailableSeatsGetPayload<{
    select: {
      available: true;
      sold: true;
      unavailable: true;
    };
  }>;
}

const stripe = new Stripe("pk_test_51Os4SZF3E14Y3BbHbfRT9GX8gq4jb5ergO0d42vNv4vY3DZhWvLG34uRtWJ1pLJoFEvD6yRju7Sgoz5WrkxaYULm00ErFktExd");

export default function MovieSeats({ params }: MovieSeatsProps) {
  const formattedTime = formatTimeFromUrl(params.time);
  const [screening, setScreening] = useState({} as availableSeats);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const seats = Object.values(screening.availableSeats || {})
    .flat()
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .reverse();

  useEffect(function () {
    async function fetchScreening() {
      const res = await getSeats(formattedTime);
      if (!res) return;
      setScreening(res);
      setIsLoading(false);
    }
    fetchScreening();
  }, []);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) return toast.error("Please select seat");
    if (selectedSeats.length > 8) return toast.error("Maximum seat allowed is 8");
    try {
      const session = await getCheckoutSession(formattedTime, selectedSeats);
      if (!session) throw new Error("Failed creating payment session");
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({ sessionId: session.id });
      if (error) throw new Error(error.message);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something bad happen");
      }
    }
  };

  if (!screening) return notFound();

  if (isLoading)
    return (
      <div className="w-full absolute h-[calc(100vh-64px)] z-50 backdrop-blur-md flex items-center justify-center">
        <CircularProgress aria-label="Loading..." />
      </div>
    );

  return (
    <ProtectedRoute>
      <section className="px-8 mt-16 sm:mt-24 text-center">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div>
            <Image src={curve} alt="Screen in cinema" />
            <h1 className="font-bold text-2xl xs:text-3xl">Screen</h1>
          </div>
          <CheckboxGroup value={selectedSeats} onValueChange={(string) => setSelectedSeats([...string])} className="overflow-x-auto">
            <div className="grid grid-cols-[repeat(2,min-content)] gap-24 justify-center">
              <div className="grid grid-cols-[repeat(8,auto)] items-center gap-2">
                <div>&nbsp;</div>
                <div>14</div>
                <div>13</div>
                <div>12</div>
                <div>11</div>
                <div>10</div>
                <div>9</div>
                <div>8</div>
                <div className="col-start-1 row-start-2">H</div>
                <div className="col-start-1 row-start-3">G</div>
                <div className="col-start-1 row-start-4">F</div>
                <div className="col-start-1 row-start-5">E</div>
                <div className="col-start-1 row-start-6">D</div>
                <div className="col-start-1 row-start-7">C</div>
                <div className="col-start-1 row-start-8">B</div>
                <div className="col-start-1 row-start-9">A</div>
                {seats
                  .filter((seat) => Number(seat.slice(1)) > 7)
                  .map((seat) => (
                    <CustomCheckbox value={seat} key={seat} availableseats={screening.availableSeats}>
                      &nbsp;
                    </CustomCheckbox>
                  ))}
              </div>
              <div className="grid grid-cols-[repeat(8,auto)] items-center gap-2">
                <div>7</div>
                <div>6</div>
                <div>5</div>
                <div>4</div>
                <div>3</div>
                <div>2</div>
                <div>1</div>
                <div>&nbsp;</div>
                <div className="col-start-8 row-start-2">H</div>
                <div className="col-start-8 row-start-3">G</div>
                <div className="col-start-8 row-start-4">F</div>
                <div className="col-start-8 row-start-5">E</div>
                <div className="col-start-8 row-start-6">D</div>
                <div className="col-start-8 row-start-7">C</div>
                <div className="col-start-8 row-start-8">B</div>
                <div className="col-start-8 row-start-9">A</div>
                {seats
                  .filter((seat) => Number(seat.slice(1)) <= 7)
                  .map((seat) => (
                    <CustomCheckbox value={seat} key={seat} availableseats={screening.availableSeats}>
                      &nbsp;
                    </CustomCheckbox>
                  ))}
              </div>
            </div>
            <div className="flex justify-center mt-12 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-default bg-default-100 border-medium rounded-small">&nbsp;</div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-primary bg-primary border-medium rounded-small">&nbsp;</div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-danger bg-danger border-medium rounded-small">&nbsp;</div>
                <span>Sold</span>
              </div>
            </div>
          </CheckboxGroup>
          <form className="flex items-stretch gap-2 justify-center" onSubmit={handleSubmit}>
            <SubmitButton>Pay now</SubmitButton>
            <BackButton />
          </form>
        </div>
      </section>
    </ProtectedRoute>
  );
}
