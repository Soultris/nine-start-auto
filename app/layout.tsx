import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const montserrat = localFont({
  src: "../public/fonts/Montserrat-Variable.ttf",
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nine Star Auto",
    template: "%s - Nine Star Auto",
  },
  description:
    "Nine Star Auto is a car leasing company based in New York, USA. We offer a wide range of cars for lease at affordable prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/*
          Set Freshchat pre-init config before the embed script executes.
          `beforeInteractive` runs before any JS hydration, guaranteeing that
          `window.fcSettings` exists when the fw-cdn.com loader reads it.
          This is the primary mechanism to hide the default Freshchat launcher.
          Must live in the root layout — Next.js ignores beforeInteractive
          scripts placed in sub-layouts or Client Components.
        */}
        <Script id="freshchat-pre-config" strategy="beforeInteractive">{`
          window.fcSettings = {
            config: {
              headerProperty: {
                hideChatButton: true
              }
            }
          };
        `}</Script>
        {children}
      </body>
    </html>
  );
}

