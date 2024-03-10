import { getBooking } from "@/actions/bookings";
import BookingStudio from "@/components/booking-studio";
import SettingsLayout from "@/components/settings-layout";
import ShareButton from "@/components/share-button";
import { paths } from "@/paths";
import { formatTime } from "@/utils";
import { Button } from "@nextui-org/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiChevronLeft } from "react-icons/hi2";

interface BookingDetailsProps {
  params: {
    id: string;
  };
}

export default async function BookingDetails({ params }: BookingDetailsProps) {
  const booking = await getBooking(params.id);
  const header = headers();
  const origin = header.get("origin");

  if (!booking) return notFound();

  return (
    <SettingsLayout>
      <div className="flex flex-col gap-8 mt-6 sm:mt-0">
        <div>
          <Button as={Link} href={paths.bookings()} variant="flat" startContent={<HiChevronLeft />} radius="full">
            All bookings
          </Button>
        </div>
        <h2 className="font-semibold text-xl">Booking details</h2>
        <ShareButton url={`${origin}/movies/${booking.screening.movie.slug}`} />
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <div>
            <Image src={`${process.env.TMDB_POSTER_URL_PATH}/w154${booking.screening.movie.poster}`} alt={`${booking.screening.movie.title} poter`} quality={80} width={90} height={56} priority />
          </div>
          <div className="text-sm flex flex-col gap-1">
            <BookingStudio studio={booking.screening.studio.name} />
            <div>
              <h1 className="text-base font-semibold" style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical" }}>
                {booking.screening.movie.title}
              </h1>
              <p>
                {formatTime(booking.screening.startTime)} &mdash; {formatTime(booking.screening.endTime)}
              </p>
              <p>{booking.seatsBooked.join(", ")}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Transaction details</h2>
          <table className="w-full">
            <tbody>
              <tr>
                <td>Total amount</td>
                <td>{booking.totalAmount} &cent;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SettingsLayout>
  );
}
