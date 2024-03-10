"use client";

import React from "react";
import { Select, SelectItem, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { paths } from "@/paths";
import Link from "next/link";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const session = useSession();
  const path = usePathname();

  let content;
  let description;
  switch (path) {
    case paths.settings():
      content = "General";
      description = "Update your name and email";
      break;
    case paths.profile():
      content = "Edit Profile";
      description = "Set up your Ticket Trove presence";
      break;
    case paths.bookings():
      content = "Bookings";
      description = "View your booking here";
  }

  return (
    <section className="mt-16 px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <User name={session.data?.user?.name || ""} description={description} avatarProps={{ src: session.data?.user?.image || "" }} className="justify-start" />
        <div className="grid gap-y-6 sm:grid-cols-[1fr_3fr]">
          <Select size="sm" label={content} className="sm:hidden">
            <SelectItem key="general" as={Link} href={paths.settings()}>
              General
            </SelectItem>
            <SelectItem key="edit profile" as={Link} href={paths.profile()}>
              Edit Profile
            </SelectItem>
            <SelectItem key="bookings" as={Link} href={paths.bookings()}>
              Bookings
            </SelectItem>
          </Select>
          <div className="hidden sm:block">
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
