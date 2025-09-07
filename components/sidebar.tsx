"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, User, Briefcase, Mail, FolderOpen, Heart } from "lucide-react"

const navigation = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Hobbies", href: "#hobbies", icon: Heart },
  { name: "Contact", href: "#contact", icon: Mail },
]

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("home")

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(href.slice(1))
    }
  }

  useEffect(() => {
    // If your content is inside a scrollable container, give it a data attribute:
    // <main data-scroll-container className="overflow-auto">...</main>
    const scrollRoot =
      (document.querySelector("[data-scroll-container]") as Element | null) ?? null

    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => !!el)

    if (sections.length === 0) return

    // Activate when section is roughly centered in view:
    // The negative top/bottom margins shrink the effective viewport to the middle band.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: scrollRoot,                // null = viewport; otherwise use your scroll container
        rootMargin: "-35% 0px -55% 0px", // center band; good for short sections
        threshold: [0, 0.1, 0.25, 0.5],  // lower thresholds work better for short/tall mixes
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50">
      <div className="p-6">
        <h1 className="text-2xl text-white">Rodolph Mesadieu</h1>
        <h2 className="text-lg font-medium text-white mt-.5 mb-4">Fullstack Engineer</h2>
        <p className="text-sm text-sidebar-foreground/70 mt-2">
          I design, develop and deploy scalable, robust backend systems, distributed infrastructure, and visually appealing frontend
          displays.
        </p>
      </div>

      <nav className="px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.href.slice(1)

          return (
            <Button
              key={item.name}
              variant="ghost"
              className={`w-full h-12 flex items-center overflow-hidden transition-all duration-300
                ${isActive
                  ? "bg-sidebar-primary/30 text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              onClick={() => scrollToSection(item.href)}
            >
              {/* Thin expanding bar on the left */}
              <span
                className={`h-[2px] bg-white transition-all duration-300
                  ${isActive ? "w-1/5" : "w-0 group-hover:w-1/5"}`}
              ></span>

              {/* Icon + text — minimal padding from the bar */}
              <span
                className={`flex items-center gap-2 pl-1 transition-transform duration-300
                  ${isActive ? "translate-x-4" : "group-hover:translate-x-4"}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </span>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
