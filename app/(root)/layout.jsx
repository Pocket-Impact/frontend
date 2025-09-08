import { Bricolage_Grotesque } from "next/font/google";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/root/Navbar";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Pocket Impact",
  description: "A platform for social impact",
  icons: {
    icon: "/img/black.svg", // Relative to /public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bricolageGrotesque.variable} scrolly ${inter.variable} bg-background antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
