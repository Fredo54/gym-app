"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import DropdownMenu from "../components/DropdownMenu";
import WorkoutTemplate from "../components/WorkoutTemplate";

export default function Page() {
  const { user, googleSignIn, signOutUser } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("user: ", user);
    if (!user) {
      //   router.push("/");
      console.log("no user");
    }
  }, [user, router]);

  return (
    <div className="pt-10 flex flex-wrap w-1/2 sm:flex-no-wrap justify-center m-auto">
      <div className="sm:w-1/2 p-4">
        <h1>Welcome {user?.displayName}</h1>
        <DropdownMenu menuName={"Select Workout"} />
        <button
          onClick={() => router.push("newWorkoutTemplate")}
          className="p-4 mt-4 bg-green-500 rounded-lg"
        >
          Create a new Workout!
        </button>
      </div>
      <div className="sm:w-1/2 p-4">
        <WorkoutTemplate />
      </div>
    </div>
  );
}
