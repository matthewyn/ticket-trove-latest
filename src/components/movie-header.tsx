import Image from "next/image";

import type { Movie } from "@prisma/client";
import { formatRuntime } from "@/utils";
import MovieRatings from "./movie-ratings";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface MovieHeaderProps {
  movie: Movie;
  isRedirect?: boolean;
  href?: string;
}

export default function MovieHeader({ movie, isRedirect, href }: MovieHeaderProps) {
  return (
    <section className="lg:mt-12">
      <div className="relative h-80 lg:hidden">
        <Image src={`${process.env.TMDB_POSTER_URL_PATH}/w300${movie.poster}`} alt={`${movie.title} poster`} quality={80} fill objectFit="cover" />
      </div>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_3fr] px-8 gap-8">
        <div className="hidden lg:block">
          <Image src={`${process.env.TMDB_POSTER_URL_PATH}/w300${movie.poster}`} width={290} height={216} alt={`${movie.title} poster`} quality={80} priority={true} />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <p>
            {movie.genres.join(", ")} &bull; {formatRuntime(movie.runtime)}
          </p>
          <div>
            <h1 className="font-bold text-2xl">{movie.title}</h1>
            <MovieRatings rating={movie.ratingsAverage} />
          </div>
          {isRedirect ? (
            <div>
              <Button color="primary" as={Link} href={href}>
                Book now
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
