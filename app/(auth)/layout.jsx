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

export const metadata = {
    title: "Pocket Impact",
    description: "A platform for social impact",
    icons: {
        icon: "/img/black.svg", // Relative to /public
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${bricolageGrotesque.variable} bg-background ${inter.variable} antialiased h-screen`}>
                <AlertComponent />
                {children}
            </body>
        </html>
    );
}