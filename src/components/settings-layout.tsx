"use client";

import React from "react";
import { User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { paths } from "@/paths";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const session = useSession();
  const path = usePathname();

  return (
    <section className="mt-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <User name={session.data?.user?.name || "User"} description="Update your name and email" avatarProps={{ src: session.data?.user?.image || undefined }} className="justify-start" />
        <div className="grid grid-cols-[1fr_3fr]">
          <div>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href={paths.settings()} className={`${path === paths.settings() ? "font-bold" : ""}`}>
                  General
                </Link>
              </li>
              <li>
                <Link href={paths.profile()} className={`${path === paths.profile() ? "font-bold" : ""}`}>
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link href={paths.bookings()} className={`${path === paths.bookings() ? "font-bold" : ""}`}>
                  Bookings
                </Link>
              </li>
            </ul>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
