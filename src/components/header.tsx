"use client";

import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Link from "next/link";
import HeaderCta from "./header-cta";
import Logo from "./logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="md:hidden" />
        <NavbarBrand className="hidden xs:block">
          <Logo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden md:flex">
        <NavbarItem>
          <Link href="#">Integrations</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
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
          <Link href="/login" className="w-full">
            Home
          </Link>
          <Link href="/" className="w-full xs:hidden">
            <Logo />
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
