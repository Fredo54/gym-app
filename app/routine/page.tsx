"use client";
import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import DropdownMenu from "../components/DropdownMenu";
import WorkoutTemplate from "../components/WorkoutTemplate";
import Routine from "./wrapper";

export default function Page() {
  const { user, googleSignIn, signOutUser } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return <Routine />;
}
