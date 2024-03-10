import { HiMiniFilm } from "react-icons/hi2";

interface BookingStudioProps {
  studio: string;
}

export default function BookingStudio({ studio }: BookingStudioProps) {
  return (
    <p className="flex items-center gap-1">
      <HiMiniFilm size={20} />
      <span>{studio}</span>
    </p>
  );
}
