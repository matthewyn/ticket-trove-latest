import { getScreenings } from "@/actions/screenings";
import MovieHeader from "@/components/movie-header";
import ScreeningsForm from "@/components/screenings-form";
import { notFound } from "next/navigation";

interface MovieScreeningsProps {
  params: {
    slug: string;
  };
}

export default async function MovieScreenings({ params }: MovieScreeningsProps) {
  const { movie, screenings } = await getScreenings(params.slug);

  if (!movie || !screenings) return notFound();

  return (
    <main className="flex flex-col gap-20">
      <MovieHeader movie={movie} />
      <section className="px-8">
        <div className="max-w-6xl mx-auto">
          <ScreeningsForm screenings={screenings} slug={params.slug} />
        </div>
      </section>
    </main>
  );
}
