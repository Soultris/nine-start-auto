import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nine-Start Auto",
  description: "Nine-start-auto.com is a car leasing company based in New York, USA. We offer a wide range of cars for lease at affordable prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
