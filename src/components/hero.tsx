import React from "react";
import Image, { StaticImageData } from "next/image";

interface HeroProps {
  image: StaticImageData;
  altImage: string;
  children: React.ReactNode;
}

export default function Hero({ image, altImage, children }: HeroProps) {
  return (
    <section className="grid grid-cols-2 min-h-screen">
      <div className="px-4 flex items-center">
        <div className="max-w-xl w-full mx-auto flex flex-col gap-4">{children}</div>
      </div>
      <div className="relative">
        <Image src={image} alt={altImage} quality={80} fill objectFit="cover" />
      </div>
    </section>
  );
}
