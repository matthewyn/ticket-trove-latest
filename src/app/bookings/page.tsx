import { getBookings } from "@/actions/bookings";
import BookingStudio from "@/components/booking-studio";
import SettingsLayout from "@/components/settings-layout";
import { paths } from "@/paths";
import { formatTime } from "@/utils";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default async function Bookings() {
  const bookings = await getBookings();

  const content = bookings.map((booking) => (
    <Card key={booking.id} as={Link} href={paths.bookingDetails(booking.id)}>
      <CardBody className="grid grid-cols-[auto_1fr] gap-4">
        <div>
          <Image src={`${process.env.TMDB_POSTER_URL_PATH}/w154${booking.screening.movie.poster}`} alt={`${booking.screening.movie.title} poter`} quality={80} width={90} height={56} />
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
      </CardBody>
    </Card>
  ));

  return <SettingsLayout>{content}</SettingsLayout>;
}
