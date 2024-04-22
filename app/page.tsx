"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LoginButton from "@/components/auth/login-button";

export default function Page() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };
  return (
    <main className="flex h-full flex-col items-center text-center justify-center bg-neutral-900 text-zinc-200">
      <div className="space-y-6">
        <h1 className="text-6xl font-semibold drop-shadow-md">Auth</h1>
        <p className="text-lg">A simple Authentication Service</p>
      </div>
      <LoginButton>
        <Button
          className="rounded-md bg-blue-300 text-sky-950 pl-3 pr-3"
          size="lg"
          variant="destructive"
          // onClick={handleClick}
        >
          Sign In
        </Button>
      </LoginButton>
    </main>
  );
}
