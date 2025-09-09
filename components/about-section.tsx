import { Card } from "@/components/ui/card"
import { Code, Database, Cloud, AppWindowIcon } from "lucide-react"

const skills = [
  {
    icon: Code,
    title: "Backend Development",
    description: "Java Spring Boot, Python, GraphQL, REST APIs",
  },
  {
    icon: AppWindowIcon,
    title: "Frontend Lanuguages & Libraries",
    description: "REACT, Tailwind.css, TypeScript.js"
  },
  {
    icon: Database,
    title: "Database & Infrastructure",
    description: "PostgreSQL, Redis, Elasticsearch, Microservices",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Kubernetes (EKS), Azure Functions, CI/CD, Datadog",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-10 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-4xl text-foreground font-medium mb-2 font-montserrat">About Me</h2>
        <div className="w-20 h-1 bg-primary mb-8"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-muted-foreground mb-6 font-open-sans leading-relaxed">
              I'm a Full stack Software Engineer skilled at designing, developing, and scaling robust
              backend systems, distributed infrastructure, and visually appealing frontend displays. I specialize in transitioning monolithic architectures to
              microservices and optimizing database queries for high-performance applications.
            </p>
            <p className="text-lg text-muted-foreground mb-8 font-open-sans leading-relaxed">
              When not developing software, you can find me mentoring junior developers, playing basketball in any competitive recreaction leagues I can find, creating studio art, playing guitar, or designing with LEGO. I'm passionate about delivering
              secure, reliable services that maximize business impact.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Adaptability", "Organization", "Creativity", "Storytelling", "Self-Awareness", "Goal Oriented", "Business Minded", "Resilience"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-card text-card-foreground rounded-full text-sm font-open-sans font-medium"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
            {/* </CHANGE> */}
          </div>

          <div className="space-y-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-card-foreground mb-2 font-montserrat">{skill.title}</h3>
                      <p className="text-muted-foreground font-open-sans">{skill.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
