"use client";

import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { paths } from "@/paths";

export default function Footer() {
  const path = usePathname();
  const excludedPage = [paths.login(), paths.signup(), paths.forgotPassword()];

  let content;

  if (!path.startsWith(paths.forgotPassword()) && !excludedPage.includes(path)) {
    content = (
      <footer className="py-10 pl-4 pr-8 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-6 sm:gap-0 items-center justify-items-center">
          <div className="flex-1">
            <Logo />
          </div>
          <div className="flex gap-4">
            <Link href="#">
              <BsInstagram size={20} />
            </Link>
            <Link href="#">
              <BsFacebook size={20} />
            </Link>
            <Link href="#">
              <BsTwitter size={20} />
            </Link>
          </div>
          <p className="text-end flex-1">&copy; Ticket Trove Inc. {new Date().getFullYear()}</p>
        </div>
      </footer>
    );
  }

  return content;
}
