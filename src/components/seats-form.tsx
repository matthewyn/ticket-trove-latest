"use client";

import { CheckboxGroup } from "@nextui-org/react";
import { useState } from "react";
import CustomCheckbox from "./custom-checkbox";

import type { Prisma } from "@prisma/client";

type SeatsWithAvailableSeats = Prisma.ScreeningsAvailableSeatsGetPayload<{
  select: {
    available: true;
    unavailable: true;
    sold: true;
  };
}>;

interface SeatsFormProps {
  availableSeats: SeatsWithAvailableSeats;
}

export default function SeatsForm({ availableSeats }: SeatsFormProps) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = Object.values(availableSeats)
    .flat()
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .reverse();

  return (
    <CheckboxGroup value={selectedSeats} onChange={setSelectedSeats} className="overflow-x-auto">
      <div className="grid grid-cols-[repeat(2,min-content)] gap-24 justify-center">
        <div className="grid grid-cols-[repeat(8,auto)] items-center gap-2">
          <div>&nbsp;</div>
          <div>14</div>
          <div>13</div>
          <div>12</div>
          <div>11</div>
          <div>10</div>
          <div>9</div>
          <div>8</div>
          <div className="col-start-1 row-start-2">H</div>
          <div className="col-start-1 row-start-3">G</div>
          <div className="col-start-1 row-start-4">F</div>
          <div className="col-start-1 row-start-5">E</div>
          <div className="col-start-1 row-start-6">D</div>
          <div className="col-start-1 row-start-7">C</div>
          <div className="col-start-1 row-start-8">B</div>
          <div className="col-start-1 row-start-9">A</div>
          {seats
            .filter((seat) => Number(seat.slice(1)) > 7)
            .map((seat) => (
              <CustomCheckbox value={seat} key={seat}>
                &nbsp;
              </CustomCheckbox>
            ))}
        </div>
        <div className="grid grid-cols-[repeat(8,auto)] items-center gap-2">
          <div>7</div>
          <div>6</div>
          <div>5</div>
          <div>4</div>
          <div>3</div>
          <div>2</div>
          <div>1</div>
          <div>&nbsp;</div>
          <div className="col-start-8 row-start-2">H</div>
          <div className="col-start-8 row-start-3">G</div>
          <div className="col-start-8 row-start-4">F</div>
          <div className="col-start-8 row-start-5">E</div>
          <div className="col-start-8 row-start-6">D</div>
          <div className="col-start-8 row-start-7">C</div>
          <div className="col-start-8 row-start-8">B</div>
          <div className="col-start-8 row-start-9">A</div>
          {seats
            .filter((seat) => Number(seat.slice(1)) <= 7)
            .map((seat) => (
              <CustomCheckbox value={seat} key={seat}>
                &nbsp;
              </CustomCheckbox>
            ))}
        </div>
      </div>
      <div className="flex justify-center mt-12 gap-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border-default bg-default-100 border-medium rounded-small">&nbsp;</div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border-primary bg-primary border-medium rounded-small">&nbsp;</div>
          <span>Available</span>
        </div>
      </div>
    </CheckboxGroup>
  );
}
