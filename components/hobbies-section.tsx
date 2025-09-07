import { Palette, Music, Dumbbell, Blocks, Trophy } from "lucide-react"
import Link from "next/link" 

export default function HobbiesSection() {
  const hobbies = [
    {
      icon: Trophy,
      title: "Former NCAA Basketball Athlete",
      description:
        "Competed at the collegiate level, developing teamwork, discipline, and leadership skills that translate directly to collaborative software development.",
    },
    {
      icon: Palette,
      title: "Studio Art Painter",
      description:
        "Express creativity through visual art, bringing an artistic perspective to UI/UX considerations and creative problem-solving in code.",
    },
    {
      icon: Music,
      title: "Amateur Guitarist",
      description:
        "Self-taught musician who enjoys playing guitar, demonstrating patience, practice, and the ability to learn complex skills independently.",
    },
    {
      icon: Blocks,
      title: "LEGO Designer",
      description:
        "Design and build custom LEGO creations, showcasing attention to detail, spatial reasoning, and systematic thinking - skills that enhance software architecture.",
    },
    {
      icon: Dumbbell,
      title: "Personal Trainer",
      description:
        "Certified personal trainer helping others achieve their fitness goals, combining technical knowledge with mentorship and motivation.",
    },
  ]

  return (
    <section id="hobbies" className="py-10 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-medium mb-2 text-center">Beyond Code</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          My diverse interests and activities contribute to a well-rounded perspective that enhances my professional
          work
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <div key={index} className="bg-card p-6 rounded-lg hover:bg-secondary/50 transition-colors group">
              <hobby.icon className="w-8 h-8 text-accent mb-4 transition-transform duration-200 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-3">{hobby.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{hobby.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href="/gallery"
          className="relative inline-block mt-10 px-2 py-1 font-semibold text-foreground group"
        >
          View Gallery
          <span
            className="absolute left-0 right-0 -bottom-1 mx-auto h-1 w-20 bg-cyan-400 
                      scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          />
        </Link>
      </div>
    </section>
  )
}
