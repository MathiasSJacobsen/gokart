import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bekk gokart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
