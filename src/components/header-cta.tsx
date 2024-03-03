"use client";

import { Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "@/actions";

export default function HeaderCta() {
  const session = useSession();

  let content;
  if (session.data?.user) {
    content = (
      <NavbarItem>
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar src={session.data.user.image || ""} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4">
              <Link href="/settings">
                <Button type="submit" variant="light">
                  Settings
                </Button>
              </Link>
              <form action={signOut}>
                <Button type="submit" color="primary" variant="light">
                  Sign out
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </NavbarItem>
    );
  } else {
    content = (
      <>
        <NavbarItem>
          <Link href="/login">
            <Button type="submit" color="primary" variant="light">
              Log in
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/login">
            <Button type="submit" color="primary">
              Sign up
            </Button>
          </Link>
        </NavbarItem>
      </>
    );
  }

  return content;
}
