import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";

export const authConfig = {
  // pages: {
  //   signIn: "/login",
  // },
  // callbacks: {
  //   // authorized({ auth, request: { nextUrl } }) {
  //   //   const isLoggedIn = !!auth?.user;
  //   //   const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  //   //   console.log(
  //   //     `isLoggedIn: ${isLoggedIn} isOnDashboard: ${isOnDashboard} nextUrl.pathname: ${nextUrl.pathname}`
  //   //   );
  //   //   if (isOnDashboard) {
  //   //     if (isLoggedIn) return true;
  //   //     return false; // Redirect unauthenticated users to login page
  //   //   } else if (isLoggedIn) {
  //   //     return Response.redirect(new URL("/dashboard", nextUrl));
  //   //   }
  //   //   return true;
  //   // },
  // },
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Credentials({
      // We can use Prisma inside Providers are these do not run on
      // the edge, they run when users sign in
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        console.log("credentials: ", credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;
