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
} from "@/components/ui/sheet";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <nav className="bg-secondary hidden md:flex justify-between items-center p-4 rounded-xl  shadow-sm">
        <div className="flex	 gap-x-2">
          <Button
            asChild
            variant={pathname === "/server" ? "default" : "outline"}
          >
            <Link href="/server">Server</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/client" ? "default" : "outline"}
          >
            <Link href="/client">Client</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
            <Link href="/admin">Admin</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/training-log" ? "default" : "outline"}
          >
            <Link href="/training-log">Training Log</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/training-template" ? "default" : "outline"}
          >
            <Link href="/training-template">Training Template</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "outline"}
          >
            <Link href="/settings">Settings</Link>
          </Button>
        </div>
        <UserButton />
      </nav>
      {}
      <div className="md:hidden flex items-center justify-between pt-3">
        <Sheet>
          <SheetTrigger asChild>
            <HamburgerMenuIcon className="h-6 w-6 " />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="sm:max-w-xs flex flex-col items-start "
          >
            <div className="flex h-16 items-center px-4 font-semibold">
              Fitness Tracker
            </div>

            <nav className="flex flex-col gap-y-2">
              <Link
                className={`${
                  pathname === "/server" ? "text-green-400" : ""
                } bg-green-200 rounded-md p-4  `}
                href="/server"
              >
                Server
              </Link>
              <Link
                className={`${
                  pathname === "/client" ? "text-green-400" : ""
                } bg-green-200 rounded-md p-4  `}
                href="/client"
              >
                Client
              </Link>
              <Link
                className={`${
                  pathname === "/admin" ? "text-green-400" : ""
                } bg-green-200 rounded-md p-4  `}
                href="/admin"
              >
                Admin
              </Link>
              <Link
                className={`${
                  pathname === "/training-log" ? "text-green-400" : ""
                } bg-green-200 rounded-md p-4  `}
                href="/training-log"
              >
                Training Log
              </Link>
              <Link
                className={`${
                  pathname === "/training-template" ? "text-green-400" : ""
                } bg-green-200 rounded-md p-4  `}
                href="/training-template"
              >
                Training Template
              </Link>
              <Link
                className={`${
                  pathname === "/settings" ? "text-green-400" : ""
                } bg-green-200 rounded-md p-4  `}
                href="/settings"
              >
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <UserButton />
      </div>
    </div>
  );
};
