"use client";

import { getBookings } from "@/actions/bookings";
import BookingStudio from "@/components/booking-studio";
import SettingsLayout from "@/components/settings-layout";
import { paths } from "@/paths";
import { formatDate, formatTime } from "@/utils";
import { Card, CardBody, Pagination } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Bookings = Prisma.BookingGetPayload<{
  include: {
    screening: {
      select: {
        movie: true;
        studio: true;
        startTime: true;
        endTime: true;
      };
    };
  };
}>[];

export default function Bookings() {
  const [bookings, setBookings] = useState<Bookings>([] as Bookings);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = currentPage * 10 - 1;
  const totalPage = Math.ceil(bookings.length / 10);
  const currentBookings = bookings.slice(startIndex, endIndex);

  const content =
    currentBookings.length > 0
      ? currentBookings.map((booking) => (
          <Card key={booking.id} as={Link} href={paths.bookingDetails(booking.id)} shadow="sm">
            <CardBody className="grid grid-cols-[auto_1fr] gap-4">
              <div>
                <Image src={`https://image.tmdb.org/t/p/w154${booking.screening.movie.poster}`} alt={`${booking.screening.movie.title} poter`} quality={80} width={90} height={56} />
              </div>
              <div className="text-sm flex flex-col gap-1">
                <div className="flex flex-col xs:flex-row gap-2">
                  <BookingStudio studio={booking.screening.studio.name} />
                  <span>{formatDate(booking.createdAt)}</span>
                </div>
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
        ))
      : null;

  useEffect(function () {
    async function fetchBookings() {
      const res = await getBookings();
      if (!res) return;
      setBookings(res);
    }
    fetchBookings();
  }, []);

  return (
    <SettingsLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">{content}</div>
        <Pagination total={totalPage} page={currentPage} onChange={setCurrentPage} color="default" />
      </div>
    </SettingsLayout>
  );
}
