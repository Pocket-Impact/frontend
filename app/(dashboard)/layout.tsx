import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AlertComponent from "../../components/AlertComponent";
import { FiSearch } from "react-icons/fi";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value

    if (!token) {
        redirect("/auth/signin");
    }

    return (
        <html lang="en">
            <body className={`${bricolageGrotesque.variable} overflow-hidden bg-background h-screen ${inter.variable} antialiased flex`}>
                <AlertComponent />
                <Sidebar />
                <div className="w-full">
                    <DashboardNavbar />
                    <div className="bg-clear overflow-y-scroll inter p-8 max-lg:p-5 max-md:p-4 w-full">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
