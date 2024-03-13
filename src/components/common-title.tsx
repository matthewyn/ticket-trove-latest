import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface CommonTitleProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function CommonTitle({ title, subtitle, children }: CommonTitleProps) {
  return (
    <section className="px-8 mt-16 sm:mt-24 text-center">
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        <p className="text-sm text-pink-400 font-bold">{title}</p>
        <h1 className="text-4xl font-semibold">{subtitle}</h1>
        {children}
      </div>
    </section>
  );
}
