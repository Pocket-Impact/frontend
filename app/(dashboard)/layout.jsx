// "use client";
import { Bricolage_Grotesque } from "next/font/google";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import AlertComponent from "../../components/AlertComponent";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

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
    icon: "/img/black.svg",
  },
};

<<<<<<< HEAD
export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${bricolageGrotesque.variable} overflow-hidden bg-background h-screen ${inter.variable} antialiased flex`}>
                <AlertComponent />
                <div className="flex w-full h-screen">
                    <Sidebar />
                    <div className="flex-1 flex flex-col h-screen">
                        <DashboardNavbar />
                        <main className="inter relative p-6 max-lg:p-5 max-md:p-4 w-full flex-1 overflow-y-scroll overflow-x-hidden scrolly" aria-label="Main content">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
=======
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.variable} overflow-hidden bg-background h-screen ${inter.variable} antialiased flex`}
      >
        <AlertComponent />
        <div className="flex w-full h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col h-screen">
            <DashboardNavbar />
            <div className="inter relative p-6 max-lg:p-5 max-md:p-4 w-full flex-1 overflow-y-scroll overflow-x-hidden scrolly">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
>>>>>>> b7291cb3ea80e97e7bbe72d3af94f6e5d674067e
}
