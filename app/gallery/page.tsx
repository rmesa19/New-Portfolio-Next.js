// app/gallery/page.tsx
"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20 flex flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
        Gallery
      </h1>
      <p className="text-muted-foreground text-lg font-open-sans">
        This page is currently under construction. Please check back soon!
      </p>
    </main>
  )
}
