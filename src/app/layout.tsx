import "~/styles/globals.css";

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Roc8 E-Commerce Project",
  description: "this is an e-Commerce project",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
