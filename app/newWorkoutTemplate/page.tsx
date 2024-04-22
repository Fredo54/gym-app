"use client";
import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import DynamicForm from "./DynamicForm";
export default function Page() {
  const { user, googleSignIn, signOutUser } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="pt-10">
      <h1>Hello, Create Exercise Page!</h1>
      <DynamicForm />
    </div>
  );
}
