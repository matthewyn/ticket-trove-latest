"use client";

import { getMovie } from "@/actions/movies";
import MovieHeader from "@/components/movie-header";
import Player from "@/components/player";
import { paths } from "@/paths";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import type { Movie } from "@prisma/client";

interface MovieDetailsProps {
  params: {
    slug: string;
  };
}

export default function MovieDetails({ params }: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie | null>({} as Movie);

  useEffect(
    function () {
      async function fetchMovies() {
        const res = await getMovie(params.slug);
        setMovie(res);
      }
      fetchMovies();
    },
    [params.slug]
  );

  if (!movie) return notFound();

  if (!movie.id) return null;

  const content = movie.cast?.map((el) => (
    <li key={el.name}>
      <Image src={`https://image.tmdb.org/t/p/w154${el.profile}`} alt={el.character} quality={80} width={132} height={90} />
      <h3 className="font-semibold text-medium mt-2">{el.character}</h3>
      <p>{el.name}</p>
    </li>
  ));

  const player = movie.mediaKey?.map((key) => <Player mediaKey={key} key={key} />);

  return (
    <main className="flex flex-col gap-20">
      <MovieHeader movie={movie} isRedirect={true} href={paths.movieScreenings(params.slug)} />
      <section className="px-8">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">Summary</h2>
            <p>{movie.summary}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">Cast</h2>
            <ul className="xs:flex gap-2 grid grid-cols-2">{content}</ul>
          </div>
        </div>
      </section>
      <section className="px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-2">
          <h2 className="font-bold text-xl col-span-2">Highlight</h2>
          <div className="grid md:grid-cols-2 gap-2 h-[480px] md:h-[360px] sm:h-[600px]">{player}</div>
        </div>
      </section>
    </main>
  );
}
