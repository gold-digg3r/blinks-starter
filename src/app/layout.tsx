import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/app/components/navbar";
import AppWalletProvider from "@/app/components/AppWalletProvider";

export const metadata: Metadata = {
  title: "Blinks Scaffold Solana",
  description:
    "Build Blinks in minutes with Dialect Labs's Blinks Scaffold for Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className="bg-black text-white min-h-screen font-sans antialiased">
        <AppWalletProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-6">{children}</main>
        </AppWalletProvider>
      </body>
    </html>
  );
}
