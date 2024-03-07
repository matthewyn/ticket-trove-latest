"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { HiArrowSmallLeft } from "react-icons/hi2";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="ghost" startContent={<HiArrowSmallLeft />} onClick={() => router.back()}>
      Go back
    </Button>
  );
}
