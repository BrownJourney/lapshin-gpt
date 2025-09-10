import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manropeFont = Manrope({
  variable: "--main-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LapshinGPT",
  description: "Explore my abilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${manropeFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
