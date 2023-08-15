import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideNavBar from "./SideNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Theme appearance="light" accentColor="gray" grayColor="olive">
                    <div className="flex">
                        <SideNavBar />
                        {children}
                    </div>
                </Theme>
            </body>
        </html>
    );
}
