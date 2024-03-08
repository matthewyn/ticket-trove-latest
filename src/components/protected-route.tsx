"use client";

import { paths } from "@/paths";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const session = useSession();
  const router = useRouter();

  if (!session.data?.user) {
    toast.error("Log in to continue");
    router.push(paths.login());
    return null;
  }

  return <main className="flex flex-col gap-20">{children}</main>;
}
