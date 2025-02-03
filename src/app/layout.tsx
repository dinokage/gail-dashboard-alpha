import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppProvider } from "@/context/AppContext"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Engineering Drawings DMS",
  description: "Data Management System for Engineering Drawings",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
            {children}
        </AppProvider>
      </body>
    </html>
  )
}

