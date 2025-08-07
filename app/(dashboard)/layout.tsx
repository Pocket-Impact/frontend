import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/dashboard/Sidebar";

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
        icon: "/img/black.svg", // Relative to /public
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${bricolageGrotesque.variable} p-2.5 max-lg:p-2 max-md:p-1.5 gap-2.5 max-lg:gap-2 max-md:gap-1.5 bg-background h-screen ${inter.variable} antialiased flex`}>
                <Sidebar />
                <div className="bg-white rounded-x2l inter p-6 max-lg:p-5 max-md:p-4 w-full border-stroke border">
                    {children}
                </div>
            </body>
        </html>
    );
}
