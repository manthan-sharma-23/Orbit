import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, type DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const options: AuthOptions = {
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => {
      console.log("Callback", session, user);
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    GithubProvider({
      name: "github",
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { placeholder: "Enter your email", type: "text" },
        password: { placeholder: "Enter your password", type: "text" },
      },
      async authorize(credentials, req) {
        console.log("Runnning auth service");
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;

        if (!user.password) return null;

        const compare = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!compare) return null;

        console.log(compare, user);

        return user;
      },
    }),
  ],
};
