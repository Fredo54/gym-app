import { UserAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AvatarDropDown from "../components/AvatarDropdown";

const navItems = ["Routine", "History", "Progress", "Calendar"];

function NavBar() {
  return (
    <>
      {
        <nav className="flex flex-row items-start p-1 gap-4 m-auto mt-4 bg-neutral-800 rounded-2xl w-1/2">
          <button className="box-border justify-center pt-3 pb-3 pl-6 pr-6 gap-2 rounded-3xl hover:bg-cyan-500 transition duration-500 ease-in-out ">
            Routine
          </button>
          <button className="box-border justify-center pt-3 pb-3 pl-6 pr-6 gap-2 rounded-3xl">
            History
          </button>
          <button className="box-border justify-center pt-3 pb-3 pl-6 pr-6 gap-2 rounded-3xl">
            Progress
          </button>
          <button className="box-border justify-center pt-3 pb-3 pl-6 pr-6 gap-2 rounded-3xl">
            Calendar
          </button>
        </nav>
      }
    </>
  );
}

export default NavBar;
