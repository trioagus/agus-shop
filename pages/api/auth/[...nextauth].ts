import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as argon2 from "argon2";
import { prisma } from "@/prisma/prisma";
import { Role } from "@prisma/client";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isPasswordValid = await argon2.verify(user.password, credentials.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as Role;
        session.user.isAdmin = token.role === Role.ADMIN;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "production",
});
