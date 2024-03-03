import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import HeaderCta from "./header-cta";

export default function Header() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Link href="/" className="flex items-center">
          <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <p className="font-bold">TICKET TROVE</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
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
    </Navbar>
  );
}
