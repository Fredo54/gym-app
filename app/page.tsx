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
    <main className="flex h-full flex-col items-center text-center justify-center">
      <div className="space-y-6">
        <h1 className="text-6xl font-semibold drop-shadow-md">Gym App</h1>
        <p className="text-lg">A simple fitness app tracking service</p>
      </div>
      <LoginButton>
        <Button className="rounded-md pl-3 pr-3" size="lg">
          Sign In
        </Button>
      </LoginButton>
    </main>
  );
}
