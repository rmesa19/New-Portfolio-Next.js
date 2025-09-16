"use client"

import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { useState } from "react"
import education from "@/data/education.json"

export function EducationSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="education" className="py-10 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-4xl font-medium text-foreground mb-2 font-montserrat">
          Education
        </h2>
        <div className="w-20 h-1 bg-primary mb-12"></div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center"
            >
              {/* Period */}
              <div className="md:w-48 flex-shrink-0 flex justify-start md:justify-end pr-8">
                <div
                  className={`text-right transition-all duration-300 cursor-pointer relative ${
                    hoveredIndex === index
                      ? "text-white transform scale-105"
                      : "text-primary"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="font-semibold text-[10px] md:text-xs lg:text-sm font-montserrat">
                    {edu.period}
                  </div>
                </div>
              </div>

              {/* Card */}
              <Card
                className="flex-1 p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 border border-border">
                      <img
                        src={`${edu.logo}?height=50&width=50`}
                        alt={`${edu.school} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-card-foreground mb-2 font-montserrat">
                        {edu.school}
                      </h3>
                      <a
                        className="text-xl text-primary mb-2 font-montserrat font-semibold"
                        href={edu.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {edu.degree}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2 text-muted-foreground mt-4 md:mt-0">
                    <div className="flex items-center gap-2 font-open-sans">
                      <MapPin className="h-4 w-4" />
                      {edu.location}
                    </div>
                  </div>
                </div>

                {/* <p className="text-muted-foreground mb-6 font-open-sans leading-relaxed">
                  {edu.description}
                </p> */}

                {/* <div>
                  <h5 className="text-lg font-semibold text-card-foreground mb-3 font-montserrat">
                    Highlights:
                  </h5>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-muted-foreground font-open-sans"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div> */}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
