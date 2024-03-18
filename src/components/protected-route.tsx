"use client";

import { paths } from "@/paths";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  slug: string;
}

export default function ProtectedRoute({ children, slug }: ProtectedRouteProps) {
  const session = useSession();
  const router = useRouter();

  if (!session.data?.user && session.status !== "loading") {
    toast.error("Log in to continue");
    router.replace(paths.login());
    return null;
  }

  if (!session.data?.user.emailVerified && session.status !== "loading") {
    toast.error("Confirm your email to continue");
    router.push(paths.movieDetails(slug));
    return null;
  }

  return <main className="flex flex-col gap-20">{children}</main>;
}
