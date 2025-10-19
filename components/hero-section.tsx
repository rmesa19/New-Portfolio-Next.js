"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeroSection() {

const downloadResume = async () => {
  const pdfUrl = "/files/resume.pdf";

  window.open(pdfUrl, "_blank");
  try {
    await fetch("/api/log-resume-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Resume click log failed", err);
  }

};

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.7)), url('/code-background.png')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-8">
        <h1 className="text-4xl md:text-5xl text-foreground mb-6">Rodolph Mesadieu</h1>
        <h2 className="text-2xl md:text-4xl text-primary mb-8 font-medium">Fullstack Software Engineer</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-open-sans leading-relaxed">
          I create innovative business solutions through the design, development and deployment of scalable, robust backend systems, distributed infrastructure, and visually appealing frontend displays in alignment with business strategy.
        </p>
        {/* </CHANGE> */}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-open-sans font-semibold"
            onClick={downloadResume}
          >
            {/* <Download className="mr-2 h-5 w-5" /> */}
            View Resume
          </Button>
          {/* <Button
            size="lg"
            variant="outline"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background font-open-sans font-semibold bg-transparent"
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Projects
          </Button> */}
          {/* <Button 
            className="border-foreground text-foreground font-open-sans font-semibold bg-transparent"
            onClick={()=> router.push("../archive")}
          >
           View Archive
          </Button> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </section>
  )
}
