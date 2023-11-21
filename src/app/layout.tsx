import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keel / Next.js",
  description: "Example of using Keel auth with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
