import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import premiere from "/public/premiere.jpg";
import festival from "/public/festival.jpg";
import movieNights from "/public/movie-nights.jpg";

export default function Events() {
  return (
    <main className="flex flex-col gap-20">
      <section className="px-8 mt-16 sm:mt-24 text-center">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          <p className="text-sm text-pink-400 font-bold">TROVE EVENTS</p>
          <h1 className="text-4xl font-semibold">Discover Unforgettable Experiences</h1>
          <p className="max-w-xl mx-auto">Explore a diverse array of events designed to delight and captivate audiences of all tastes and interests.</p>
          <div>
            <Button color="primary" as={Link} href="#events">
              Get started today
            </Button>
          </div>
        </div>
      </section>
      <section className="px-8" id="events">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-xl">Exclusive Premieres</h2>
            <p>
              Be among the first to witness blockbuster hits and critically acclaimed films before they hit mainstream theaters. Experience the excitement of a red-carpet premiere and indulge in the thrill of seeing a movie before anyone
              else.
            </p>
          </div>
          <div>
            <Image src={premiere} alt="Experience blockbuster hits" className="w-full h-64 xs:h-80 lg:h-96 object-cover" quality={80} />
          </div>
          <div>
            <Image src={festival} alt="Immerse yourself in the magic of cinema with our curated film festivals" className="w-full h-64 xs:h-80 lg:h-96 object-cover" quality={80} />
          </div>
          <div className="flex flex-col gap-4 row-start-3 md:row-start-2 md:col-start-2">
            <h2 className="font-bold text-xl">Film Festivals</h2>
            <p>
              Immerse yourself in the magic of cinema with our curated film festivals. From international gems to niche genres, our festivals celebrate the art of storytelling in all its forms. Join us for a cinematic journey like no other.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-xl">Themed Movie Nights</h2>
            <p>
              Step into a world of nostalgia and fantasy with our themed movie nights. From classic favorites to cult classics, our themed events transport you to different eras, genres, and worlds, ensuring a unique and unforgettable
              experience every time.
            </p>
          </div>
          <div>
            <Image src={movieNights} alt="Step into a world of nostalgia and fantasy with our themed movie nights" className="w-full h-64 xs:h-80 lg:h-96 object-cover" quality={80} />
          </div>
        </div>
      </section>
      <section className="px-8">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">Peter Parker</h4>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <p>From exclusive premieres to themed movie nights, this app offers an unparalleled range of events that cater to every taste and interest.</p>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">Friendly Neighborhood Spiderman</p>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">Bucky</h4>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <p>Love how the app brings together like-minded movie enthusiasts to share in these special moments together.</p>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">The Winter</p>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">Steve Roger</h4>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <p>One of the things I love most about the app is its user-friendly interface. Navigating through the Event Page is a breeze, and I appreciate how easy it is to filter events based on my preferences.</p>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">Capt</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
