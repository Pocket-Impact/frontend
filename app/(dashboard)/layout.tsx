import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AlertComponent from "../../components/AlertComponent";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { apiFetch } from "@/utils/apiFetch";

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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${bricolageGrotesque.variable} overflow-hidden bg-gray-50 h-screen ${inter.variable} antialiased flex`}>
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
}
