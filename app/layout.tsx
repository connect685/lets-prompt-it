import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Let's Prompt It | The Prompt Studio",
  description: "The Prompt Studio that turns your ideas into bold, vibrant AI prompts.",
  icons: {
    icon: "/lets-prompt-it/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
