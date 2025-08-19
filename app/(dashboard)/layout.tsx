import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AlertComponent from "../../components/AlertComponent";

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
            <body className={`${bricolageGrotesque.variable} p-2.5 max-lg:p-2 max-md:p-1.5 gap-2.5 max-lg:gap-2 max-md:gap-1.5 bg-background h-screen ${inter.variable} antialiased flex`}>
                <AlertComponent />
                <Sidebar />
                <div className="bg-background rounded-x2l overflow-y-scroll inter p-6 py-4 max-lg:p-5 max-md:p-4 w-full">
                    {children}
                </div>
            </body>
        </html>
    );
}
