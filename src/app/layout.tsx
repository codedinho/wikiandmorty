import type { Metadata } from "next";
import { Mulish, Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const mulish = Mulish({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rick and Morty Wiki",
  description: "All things Rick and Morty, get schwifty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 bg-background p-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
