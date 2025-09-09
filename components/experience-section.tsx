"use client"

import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import experiences from "@/data/experiences.json"

// const experiences = [
//   {
//     title: "Software Engineer",
//     company: "Fitch Group",
//     link:"https://www.fitch.group/",
//     logo: "/fitchgroup_logo.jpeg",
//     location: "New York, NY",
//     period: "Sep 2023 - Present",
//     description:
//       "Build, maintain and optimize scalable REST APIs using Java Spring Boot, serving real-time Bloomberg bond data to customer-facing applications.",
//     achievements: [
//       "Reduced API latency and response time by 24%",
//       "Engineered ETL pipeline processing 30,000+ financial records",
//       "Decreased deployment time by 30% through microservice transition",
//       "Cut GraphQL request payload size by 27%",
//       "Increased release frequency by 25% with automated CI/CD",
//     ],
//   },
//   {
//     title: "Software Engineer",
//     company: "Northwell Health",
//     link: "https://www.northwell.edu/",
//     logo: "/northwell-logo.png",
//     location: "New York, NY",
//     period: "Dec 2022 - Aug 2023",
//     description:
//       "Developed secure, cloud-native applications using Java Spring Boot and GraphQL to support messaging for 890+ healthcare facilities.",
//     achievements: [
//       "Achieved 97.9% uptime for healthcare messaging systems",
//       "Integrated Azure Cloud services for scalable deployment",
//       "Implemented GraphQL interfaces for real-time data transactions",
//       "Ensured HIPAA compliance and security standards",
//     ],
//   },
//   {
//     title: "Software Engineer Intern",
//     company: "Lyft",
//     link: "https://www.lyft.com/",
//     logo: "/lyft-logo.png",
//     location: "New York, NY",
//     period: "Jun 2022 - Sep 2022",
//     description: "Migrated mobile UI experiences to web using React and TypeScript for the RiderWeb platform.",
//     achievements: [
//       "Reduced average API call latency by 27%",
//       "Designed couponing and discount systems",
//       "Worked with Node.js backend and Kotlin services",
//     ],
//   },
// ]

export function ExperienceSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="experience" className="py-10 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-4xl font-medium text-foreground mb-2 font-montserrat">Experience</h2>
        <div className="w-20 h-1 bg-primary mb-12"></div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
              <div className="md:w-48 flex-shrink-0 flex justify-start md:justify-end pr-8">
                <div
                  className={`text-right transition-all duration-300 cursor-pointer relative ${
                    hoveredIndex === index ? "text-white transform scale-105" : "text-primary"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="font-semibold text-[10px] md:text-xs lg:text-sm font-montserrat">{exp.period}</div>
                  {/* <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                      hoveredIndex === index ? "w-full" : "w-0"
                    }`}
                  /> */}
                </div>
              </div>

              <Card
                className="flex-1 p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 border border-border">
                      <img
                        src={`${exp.logo}?height=50&width=50`}
                        alt={`${exp.company} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-card-foreground mb-2 font-montserrat">{exp.title}</h3>
                      <a className="text-xl text-primary mb-2 font-montserrat font-semibold" href={exp.link} target="_blank">{exp.company}</a>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2 text-muted-foreground mt-4 md:mt-0">
                    <div className="flex items-center gap-2 font-open-sans">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 font-open-sans leading-relaxed">{exp.description}</p>

                <div>
                  <h5 className="text-lg font-semibold text-card-foreground mb-3 font-montserrat">Key Achievements:</h5>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground font-open-sans">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
