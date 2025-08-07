import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import "./globals.css";
import AppSidebar from "@/components/app-sidebar";

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sidcn",
  description: "Another Shadcn component registry",
  authors: {
    name: "Siddhesh Agarwal",
    url: "https://siddhesh.cc/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        <Providers>
          <AppSidebar>{children}</AppSidebar>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
