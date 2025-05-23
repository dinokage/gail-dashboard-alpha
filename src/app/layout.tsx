import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header"; // Import the Header component
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Engineering Drawings DMS",
  description: "Data Management System for Engineering Drawings",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <Header /> {/* Add the Header component here */}
          <main className="flex-grow"> {/* Ensure children take up remaining space */}
            <AppProvider>
                {children}
            </AppProvider>
          </main>
          {/* You could add a Footer component here if needed */}
        </Providers>
      </body>
    </html>
  );
}

