"use client"
import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"

import projects from "@/data/projects.json"
// const projects = [
//   {
//     id: 1,
//     title: "Financial Data API Platform",
//     description: "Scalable REST APIs serving real-time Bloomberg bond data with 24% latency reduction",
//     image: "/financial-dashboard.png",
//     tags: ["Java", "Spring Boot", "GraphQL", "Bloomberg API"],
//     featured: true,
//   },
//   {
//     id: 2,
//     title: "Healthcare Messaging System",
//     description: "Cloud-native application supporting 890+ healthcare facilities with 97.9% uptime",
//     image: "/secure-healthcare-messaging.png",
//     tags: ["Java", "Azure Functions", "GraphQL", "HIPAA Compliance"],
//     featured: true,
//   },
//   {
//     id: 3,
//     title: "ETL Data Pipeline",
//     description: "Python-based pipeline processing 30,000+ financial records from Oracle databases",
//     image: "/data-pipeline-flowchart.png",
//     tags: ["Python", "SQL", "Oracle", "ETL"],
//     featured: false,
//   },
//   {
//     id: 4,
//     title: "Microservices Architecture",
//     description: "Transitioned monolithic systems to microservices, reducing deployment time by 30%",
//     image: "/microservices-containers-diagram.png",
//     tags: ["Kubernetes", "Docker", "Microservices", "CI/CD"],
//     featured: false,
//   },
//   {
//     id: 5,
//     title: "RiderWeb Platform Migration",
//     description: "Migrated mobile UI to web using React and TypeScript for Lyft's platform",
//     image: "/placeholder-fmev2.png",
//     tags: ["React", "TypeScript", "Node.js", "Kotlin"],
//     featured: false,
//   },
//   {
//     id: 6,
//     title: "Performance Optimization Suite",
//     description: "Database query optimization and API performance tuning for real-time systems",
//     image: "/performance-monitoring-dashboard.png",
//     tags: ["PostgreSQL", "Redis", "Datadog", "Performance Tuning"],
//     featured: false,
//   },
// ]

export function ProjectsSection() {
 const displayedProjects = useMemo(() => {
    const showcaseProjects = projects.filter((p) => p.showcase)
    const remainingProjects = projects.filter((p) => !p.showcase)

    // Shuffle remaining projects
    const shuffled = [...remainingProjects].sort(() => 0.5 - Math.random())

    // Fill remaining slots to reach 6
    const needed = 6 - showcaseProjects.length
    const selected = shuffled.slice(0, needed)

    return [...showcaseProjects, ...selected]
  }, [])

  return (
    <section id="projects" className="py-10 px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-4xl font-medium text-foreground mb-2 font-montserrat">Featured Projects</h2>
        <div className="w-20 h-1 bg-primary mb-10"></div>

        <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-6">
          {displayedProjects.map((project) => (
            <Card
              key={project.id}
              className={`group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 ${
                project.featured ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {project.link && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </Link>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2 font-montserrat">{project.title}</h3>
                <p className="text-muted-foreground mb-4 font-open-sans">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-open-sans font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* {!showAll && projects.length > 4 && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-open-sans font-semibold"
            >
              View More Projects
            </Button>
          </div>
        )} */}
      </div>
      <div className="flex justify-center">
        <Link
          href="/archive"
          className="relative inline-block mt-10 px-2 py-1 font-semibold text-foreground group"
        >
          View Archive
          <span
            className="absolute left-0 right-0 -bottom-1 mx-auto h-1 w-20 bg-cyan-400 
                      scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          />
        </Link>
      </div>
    </section>
  )
}
  