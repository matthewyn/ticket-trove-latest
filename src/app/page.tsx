import Image from "next/image";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import Hero from "@/components/hero";
import home from "/public/home.jpg";
import Carousel from "@/components/carousel";
import { getMovies } from "@/actions/movies";
import MovieRatings from "@/components/movie-ratings";

export default async function Home() {
  const movies = await getMovies();

  const list = movies.map((movie) => (
    <Card key={movie.id} shadow="sm">
      <CardHeader>
        <Image src={`${process.env.TMDB_POSTER_URL_PATH}/w342${movie.poster}`} width={342} height={200} alt={`${movie.title} poster`} className="object-cover rounded-lg" />
      </CardHeader>
      <CardBody>
        <p>{movie.genres.join("/")}</p>
        <h2 className="text-lg mb-4">{movie.title}</h2>
        <MovieRatings rating={movie.ratingsAverage} />
      </CardBody>
    </Card>
  ));

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
          <Button color="primary">Book now</Button>
        </div>
      </Hero>
      <section>
        <div className="max-w-5xl mx-auto mb-20">
          <Carousel>{list}</Carousel>
        </div>
      </section>
    </main>
  );
}
