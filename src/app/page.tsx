"use client";

import Image from "next/image";
import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import Hero from "@/components/hero";
import home from "/public/home.jpg";
import Carousel from "@/components/carousel";
import { getMovies } from "@/actions/movies";
import MovieRatings from "@/components/movie-ratings";
import playStore from "/public/play-store.png";
import appleStore from "/public/apple-store.png";
import { paths } from "@/paths";
import { useEffect, useState } from "react";

import type { Movie } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  useEffect(function () {
    async function fetchMovies() {
      const movies = await getMovies();
      setMovies(movies);
      if (verified === "true") toast.success("Email confirmed");
    }
    fetchMovies();
  }, []);

  const list =
    movies.length > 0
      ? movies.map((movie) => (
          <Card key={movie.id} shadow="sm" as={Link} href={paths.movieDetails(movie.slug)}>
            <CardHeader>
              <Image src={`https://image.tmdb.org/t/p/w342${movie.poster}`} width={342} height={200} alt={`${movie.title} poster`} className="object-cover rounded-lg" quality={80} />
            </CardHeader>
            <CardBody>
              <p>
                {movie.genres.join("/")}&bull;{movie.certification}
              </p>
              <h2 className="text-lg mb-4 font-semibold">{movie.title}</h2>
              <MovieRatings rating={movie.ratingsAverage} />
            </CardBody>
          </Card>
        ))
      : null;

  return (
    <main className="flex flex-col gap-20">
      <Hero altImage="Person enjoying a film" image={home}>
        <p className="text-sm text-pink-400 font-bold">DISCOVER MOVIES</p>
        <h1 className="text-4xl font-semibold">Experience blockbuster magic at here</h1>
        <p>
          Step into a world of cinematic enchantment at our state-of-the-art movie theaters. Get ready for a thrilling journey through the silver screen as we bring you the latest Hollywood hits, heartwarming dramas, side-splitting
          comedies, and action-packed adventures.
        </p>
        <div>
          <Button color="primary" as={Link} href="#now-showing">
            Book now
          </Button>
        </div>
      </Hero>
      <section className="px-8" id="now-showing">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Now showing</h2>
          <div>
            <Carousel>{list}</Carousel>
          </div>
        </div>
      </section>
      <section className="bg-emerald-100 py-12 px-8">
        <div className="max-w-6xl mx-auto text-center flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Get Our App</h2>
          <p className="max-w-lg mx-auto">Unlock a world of convenience and exclusive perks by installing our Cinema Ticket Booking App. Download now to enjoy a seamless movie-going adventure!</p>
          <div className="flex gap-3 flex-col xs:flex-row justify-center">
            <Button color="primary" variant="ghost" startContent={<Image src={playStore} alt="Play sore icon" />}>
              Play store
            </Button>
            <Button color="primary" variant="ghost" startContent={<Image src={appleStore} alt="Play sore icon" />}>
              App store
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
