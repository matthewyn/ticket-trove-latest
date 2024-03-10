import { getBooking } from "@/actions/bookings";
import BookingStudio from "@/components/booking-studio";
import ButtonModal from "@/components/button-modal";
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
import QRCode from "react-qr-code";

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
        <div className="grid sm:grid-cols-[2fr_1fr] gap-8 items-start">
          <div className="flex flex-col gap-8">
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
          <div className="border-small border-default rounded-md py-6">
            <div className="text-center">
              <ButtonModal buttonLabel="Show QR" title="QR Code">
                <div className="flex flex-col gap-6">
                  <div className="mx-auto">
                    <QRCode value="hey" size={128} />
                  </div>
                  <p className="text-sm text-center">Show this QR code to our officer to get your ticket</p>
                </div>
              </ButtonModal>
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
}
