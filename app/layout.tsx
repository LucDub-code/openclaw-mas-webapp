import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pilotage groupe",
  description: "Application web de tableau de bord d'un système de pilotage multi-agents IA OpenClaw pour le dirigeant d'un groupe de 5 entreprises.",
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("h-full", "antialiased", outfit.variable)}>
      <body className="flex flex-col min-h-full font-sans bg-background">{children}</body>
    </html>
  );
}
