"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

interface NextUIProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: NextUIProviderProps) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
