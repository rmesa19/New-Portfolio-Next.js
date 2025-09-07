import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ArchivePage() {
  // Example data (you can replace with your own)
  const projects = [
    {
      year: "2025",
      title: "Personal Portfolio",
      made_at: "Personal Project",
      description: "A reactive portfolio showcasing my skillset and experience",
      tech: "Next.js, Tailwind, TypeScript",
      link: null,
    },
    {
      year: "2022",
      title: "Distributed Chatroom",
      made_at: "Northeastern University",
      description: "Auto reconnect and load balanced Distributed 2-Phase Commit(2PC) Chatroom application built using Java RMI (Remote Method Invocation) utilizing Pub/Sub paridigm. Built to facilitate realtime communication between users.",
      tech: "Java RMI, Java, TCP/IP",
      link: "https://github.com/rmesa19/Distributed-ChatRoom/tree/main",
    },  
    {
      year: "2023",
      title: "Funko Shop",
      made_at: "Northeastern University",
      description: "REACT app for taking inventory, comparing and trading Funko Pop collection", 
      tech: "MongoDB, Express.js, React.js, Node.js",
      link: "https://github.com/rmesa19/The-Funko-Shop/tree/main",
    },
    {
      year: "2024",
      title: "ETL Data Pipeline",
      made_at: "Fitch Group",
      description: "Data pipeline for the extraction, transformation and loading of airport data stored in JSON format within various SQL Tables",
      tech: "Python, Airflow, AWS",
      link: null,
    },
    {
      year: "2025",
      title: "Queens New York Fun Facts API",
      made_at: "Personal Project",
      description: "API built using Express framework, hosted via Vercel that pulls facts and tidbits about Queens, NY.",
      tech: "Node.js, Express.js, Vercel",
      link: null,
    },
    {
      year: "2025",
      title: "Queens New York Fun Facts Database",
      made_at: "Personal Project",
      description: "Postgres Database built using data scraper that stores fun facts about Queens, NY across all neighborhoods in 10 categories.",
      tech: "Python, Postgres",
      link: null,
    },
    
  ];

  const sortedProjects = projects.sort((a,b)=> Number(b.year) - Number(a.year));

return (
    <>
      {/* Back Arrow */}
      <div className="px-6 pt-8">
        <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Link>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Archive</h1>
        <p className="mb-12 text-muted-foreground">
          A collection of projects, work, and experiments I’ve done over the years.
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-sm text-muted-foreground">
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Made at</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Built With</th>
                <th className="py-3 px-4">Link</th>
              </tr>
            </thead>
            <tbody>
              {sortedProjects.map((proj, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">{proj.year}</td>
                  <td className="py-3 px-4 font-semibold">{proj.title}</td>
                  <td className="py-3 px-4">{proj.made_at}</td>
                  <td className="py-3 px-4">{proj.description}</td>
                  <td className="py-3 px-4">{proj.tech}</td>
                  <td className="py-3 px-4">
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-primary/80"
                      >
                        Visit
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
