"use client";

import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { paths } from "@/paths";

export default function Footer() {
  const path = usePathname();
  const excludedPage = [paths.login(), paths.signup()];

  let content;

  if (!excludedPage.includes(path)) {
    content = (
      <footer className="py-10 pl-4 pr-8 mt-8">
        <div className="max-w-6xl mx-auto grid gap-y-6 md:grid-cols-[auto_1fr_auto] items-center justify-items-center">
          <div>
            <Logo />
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="#">About</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Support</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">About</Link>
          </div>
          <div className="flex gap-3">
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
          <p className="md:col-span-3 text-center">&copy; Ticket Trove Inc. 2023</p>
        </div>
      </footer>
    );
  }

  return content;
}
