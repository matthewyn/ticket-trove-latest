"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { paths } from "@/paths";

interface HeroProps {
  image: StaticImageData;
  altImage: string;
  children: React.ReactNode;
}

export default function Hero({ image, altImage, children }: HeroProps) {
  const path = usePathname();
  const excludedPage = [paths.login(), paths.signup(), paths.forgotPassword()];

  return (
    <section className={`grid lg:grid-cols-2 lg:min-h-screen`}>
      <div className="p-8 pb-0 lg:pb-8 flex items-center">
        <div className="lg:max-w-xl w-full lg:mx-auto flex flex-col gap-4">{children}</div>
      </div>
      <div className={`relative h-80 lg:h-auto row-start-1 lg:col-start-2 ${excludedPage.includes(path) || path.startsWith(paths.forgotPassword()) ? "hidden lg:block" : ""}`}>
        <Image src={image} alt={altImage} quality={80} fill objectFit="cover" objectPosition="center top" priority={true} />
      </div>
    </section>
  );
}
