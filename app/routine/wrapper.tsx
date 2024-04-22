import Routine from "./routine";
import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import DropdownMenu from "../components/DropdownMenu";
import WorkoutTemplate from "../components/WorkoutTemplate";

const Wrapper = (Component: React.FC) => {
  return () => {
    const { user, googleSignIn, signOutUser } = UserAuth();
    const router = useRouter();
    useEffect(() => {
      if (!user) {
        router.push("/");
      }
    }, [user, router]);

    // Logic to execute before mounting
    console.log("Component is about to mount");
    if (user) return <Component />;
    else return null;
    // return {user ? {<Component />}: null};
  };
};

export default Wrapper(Routine);
