import { HeroSection } from "@/components/hero-section"
import { Sidebar } from "@/components/sidebar"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import HobbiesSection from "@/components/hobbies-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden md:block">
       <Sidebar />
      </div>
      <main className="flex-1 md:ml-64">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <HobbiesSection />
        <ContactSection />
      </main>
    </div>
  )
}
