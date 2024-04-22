"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // You can do some server stuff here
  // prior to logging out the user
  await signOut();
};
