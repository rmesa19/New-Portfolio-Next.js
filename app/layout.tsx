import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
})

export const metadata: Metadata = {
  title: "Rodolph Mesadieu",
  description: "My portfolio showcasing professional experience"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${roboto.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
