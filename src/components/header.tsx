"use client";

import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Link from "next/link";
import HeaderCta from "./header-cta";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { paths } from "@/paths";

export default function Header() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="md:hidden" />
        <NavbarBrand className="hidden sm:block">
          <Logo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden md:flex">
        <NavbarItem isActive={path === paths.home()}>
          <Link href="/" aria-current={path === paths.home() ? "page" : undefined}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path === paths.events()}>
          <Link href="/events" aria-current={path === paths.events() ? "page" : undefined}>
            Events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Features</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderCta />
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href="/" className="w-full">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/events" className="w-full">
            Events
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="/" className="w-full sm:hidden">
            <Logo />
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
