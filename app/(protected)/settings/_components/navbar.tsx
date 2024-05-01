"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const routes = [
  {
    name: "Server",
    href: "/server",
  },
  {
    name: "Exercises",
    href: "/exercise",
  },
  {
    name: "Admin",
    href: "/admin",
  },
  {
    name: "Training Log",
    href: "/training-log",
  },
  {
    name: "Training Template",
    href: "/training-template",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <nav className="hidden md:flex justify-between items-center p-4 rounded-xl  shadow-sm">
        <div className="flex gap-x-2">
          {routes.map(({ name, href }) => (
            <Button
              asChild
              variant={pathname === href ? "default" : "link"}
              key={name}
            >
              <Link href={href}>{name}</Link>
            </Button>
          ))}
        </div>
        <UserButton />
      </nav>
      <div className="md:hidden flex items-center justify-between pt-3">
        <Sheet>
          <SheetTrigger asChild>
            <HamburgerMenuIcon className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="sm:max-w-xs flex flex-col items-start "
          >
            <div className="flex h-16 items-center px-4 font-semibold">
              Fitness Tracker
            </div>

            <nav className="flex flex-col gap-y-2">
              {routes.map(({ name, href }) => (
                <SheetClose asChild key={name}>
                  <Link
                    className={`${
                      pathname === href ? "primary" : ""
                    } rounded-md p-4`}
                    href={href}
                  >
                    {name}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <UserButton />
      </div>
    </div>
  );
};
