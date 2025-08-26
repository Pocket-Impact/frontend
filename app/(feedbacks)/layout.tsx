import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import AlertComponent from "@/components/AlertComponent";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pocket Impact",
  description: "A platform for social impact",
  icons: {
    icon: "/img/black.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolageGrotesque.variable} overflow-hidden flex items-center justify-center bg-background ${inter.variable} antialiased h-screen`}>
        <AlertComponent />
        {children}
      </body>
    </html>
  );
}
