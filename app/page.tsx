import { HeroSection } from "@/components/hero-section"
import { Sidebar } from "@/components/sidebar"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import HobbiesSection from "@/components/hobbies-section"
import { EducationSection } from "@/components/education-section"

export default function HomePage() {
  const fetchRandomFact = async () => {
      try {
        const res = await fetch("https://queens-facts.vercel.app/api/facts?random=true&limit=1")
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          return data[0]
        } else if (data.fact_text) {
          return data
        }
        return { fact_text: "No fact available right now." }
      } catch (err) {
        console.error("Error fetching fact:", err)
        return { fact_text: "Error fetching fact." }
      }
    }

    const handleNewFact = async () => {

    setTimeout(async () => {
      const fact = await fetchRandomFact();

      await fetch("https://queens-facts.vercel.app/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: "porfolio visit",
        path: "/",
      }),
      });

    }, 300)
  }

  const fact = handleNewFact();
  
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
        <EducationSection />
        <HobbiesSection />
        <ContactSection />
      </main>
    </div>
  )
}
