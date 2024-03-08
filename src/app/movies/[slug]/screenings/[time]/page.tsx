import { getSeats } from "@/actions/seats";
import { formatTimeFromUrl } from "@/utils";
import Image from "next/image";
import curve from "/public/curve.svg";
import SeatsForm from "@/components/seats-form";
import { notFound } from "next/navigation";
import { Button } from "@nextui-org/react";
import BackButton from "@/components/back-button";
import ProtectedRoute from "@/components/protected-route";

interface MovieSeatsProps {
  params: {
    time: string;
  };
}

export default async function MovieSeats({ params }: MovieSeatsProps) {
  const formattedTime = formatTimeFromUrl(params.time);
  const screening = await getSeats(formattedTime);

  if (!screening) return notFound();

  return (
    <ProtectedRoute>
      <section className="px-8 mt-16 sm:mt-24 text-center">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div>
            <Image src={curve} alt="Screen in cinema" />
            <h1 className="font-bold text-2xl xs:text-3xl">Screen</h1>
          </div>
          <SeatsForm availableSeats={screening.availableSeats} />
          <div className="flex items-stretch gap-2 justify-center">
            <Button color="primary">Pay now</Button>
            <BackButton />
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
