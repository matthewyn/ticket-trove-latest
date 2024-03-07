"use client";

import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import BackButton from "./back-button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

type ScreeningsWithStudio = Prisma.ScreeningGetPayload<{
  include: {
    studio: true;
  };
}>;

interface ScreeningsFormProps {
  screenings: ScreeningsWithStudio[];
  slug: string;
}

export default function ScreeningsForm({ screenings, slug }: ScreeningsFormProps) {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  function handleClick() {
    if (!selected) return toast.error("Please pick schedule");
    router.push(`${paths.movieSeats(slug, selected)}`);
  }

  const regular2D = screenings
    .filter((screening) => screening.studio.type === "Regular 2D")
    .map((screening) => (
      <Button as={Radio} value={screening.startTime.toISOString()} key={screening.id} variant="ghost">
        {new Date(screening.startTime).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
      </Button>
    ));
  const regular3D = screenings
    .filter((screening) => screening.studio.type === "Regular 3D")
    .map((screening) => (
      <Button as={Radio} value={screening.startTime.toISOString()} key={screening.id} variant="ghost">
        {new Date(screening.startTime).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
      </Button>
    ));
  const imax3D = screenings
    .filter((screening) => screening.studio.type === "IMAX 3D")
    .map((screening) => (
      <Button as={Radio} value={screening.startTime.toISOString()} key={screening.id} variant="ghost">
        {new Date(screening.startTime).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
      </Button>
    ));

  return (
    <div className="flex flex-col gap-10">
      <RadioGroup value={selected} onValueChange={setSelected}>
        <div className="flex flex-col gap-8">
          {regular2D.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl">Regular 2D</h2>
              <div className="ml-2">{regular2D}</div>
            </div>
          ) : null}
          {regular3D.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl">Regular 3D</h2>
              <div className="ml-2">{regular3D}</div>
            </div>
          ) : null}
          {imax3D.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl">IMAX 3D</h2>
              <div className="ml-2">{imax3D}</div>
            </div>
          ) : null}
        </div>
      </RadioGroup>
      <div className="flex items-stretch gap-2">
        <Button color="primary" onClick={handleClick}>
          Pick a seat
        </Button>
        <BackButton />
      </div>
    </div>
  );
}
