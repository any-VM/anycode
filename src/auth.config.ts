import Keycloak from "next-auth/providers/keycloak";
import prisma from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
const config: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    signIn: async ({ profile }) => {
      const { email, name, sub: id } = profile! || {};
      const userExists = await prisma.user.findFirst({
        where: {
          id,
        },
      });
      if (!userExists && id && email) {
        await prisma.user.create({
          data: {
            email,
            id,
            name,
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            email,
            name,
          },
        });
      }
      return true;
    },
  },
  providers: [
    Keycloak({
      clientId: process.env.KEYCLOAK_ID || "",
      clientSecret: process.env.KEYCLOAK_SECRET || "",
      issuer: process.env.KEYCLOAK_ISSUER || "",
    }),
  ],
};
export default config;
