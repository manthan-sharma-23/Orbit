import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const db = new PrismaClient();
config();

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

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    jwt: ({ token, account, user }) => {
      if (account) {
        token.accesstoken = account.access_token;
        token.id = user.id;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: "231fe68fbbf29a0f0163",
      clientSecret: "5ac40e12a122657e7c41e45e722e1aa1d81ed83a",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username or Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password)
          return null;

        let user = await db.user.findUnique({
          where: {
            email: credentials.username,
          },
        });

        if (!user) return null;

        if (!user.password) return null;

        const compare = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!compare) return null;

        console.log("user logged in successfully");
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const getServerAuthSession = () => getServerSession(authOptions);
