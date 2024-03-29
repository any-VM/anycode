"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Session as AuthSession } from "next-auth";

export function Themes({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}

export function Session({
  children,
  session,
}: {
  children: React.ReactNode;
  session: AuthSession | null;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
