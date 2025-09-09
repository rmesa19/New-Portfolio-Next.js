"use client"

import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "Rmesadieu@gmail.com",
    href: "mailto:Rmesadieu@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "917-500-2968",
    href: "tel:9175002968",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Queens, New York",
    href: "#",
  },
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/rmesa19/",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/rodolph-mesadieu",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-10 px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-4">Get In Touch</h2>
        <div className="w-20 h-1 bg-primary mb-12"></div>

        <div className="max-w-2xl">
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            I'm always interested in new opportunities and unique engineering challenges. Whether you have a
            question about my experience or want to discuss potential collaborations, feel free to reach out!
          </p>

          <div className="space-y-8 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="flex items-center gap-6">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                    <a
                      href={info.href}
                      className="text-lg text-foreground hover:text-primary transition-colors font-medium"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Connect With Me</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-primary/10 transition-colors group"
                  >
                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
