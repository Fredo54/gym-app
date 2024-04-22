"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type LoginButtonProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>TODO: Implement Modal</span>;
  }

  return (
    <span onClick={handleClick}>
      {/* <Button className="rounded-md bg-blue-300 text-sky-950 pl-3 pr-3">
        Sign In
      </button> */}
      {children}
    </span>
  );
}
