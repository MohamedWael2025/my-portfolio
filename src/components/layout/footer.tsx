import Link from "next/link"
import { Instagram, Mail, Phone, Github, Linkedin, ExternalLink } from "lucide-react"

const socialLinks = [
  { 
    href: "https://instagram.com/its_mohamedwael", 
    icon: Instagram, 
    label: "Instagram" 
  },
  { 
    href: "mailto:contact@itsmohamedwael.info", 
    icon: Mail, 
    label: "Email" 
  },
  { 
    href: "tel:+201212549545", 
    icon: Phone, 
    label: "Phone" 
  },
  { 
    href: "https://github.com/mohamedwael", 
    icon: Github, 
    label: "GitHub" 
  },
  { 
    href: "https://linkedin.com/in/mohamedwael", 
    icon: Linkedin, 
    label: "LinkedIn" 
  },
]

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
]

const demoLinks = [
  { href: "/ai-powered-ecommerce", label: "AI E-Commerce" },
  { href: "/saas-task-manager", label: "SaaS Task Manager" },
  { href: "/ai-resume-analyzer", label: "AI Resume Analyzer" },
  { href: "/admin-dashboard", label: "Admin Dashboard" },
  { href: "/cpp-tools", label: "C++ Developer Tools" },
]

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                MW
              </div>
              <span className="font-bold text-lg">Mohamed Wael</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Software Engineer, Full-Stack Developer, Graphic Designer, and AI Developer 
              passionate about creating innovative digital solutions.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors border"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo Projects */}
          <div>
            <h3 className="font-semibold mb-4">Demo Projects</h3>
            <ul className="space-y-2">
              {demoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@itsmohamedwael.info" className="hover:text-primary transition-colors">
                  contact@itsmohamedwael.info
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href="tel:+201212549545" className="hover:text-primary transition-colors">
                  +20 121 254 9545
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Instagram className="w-4 h-4" />
                <a 
                  href="https://instagram.com/its_mohamedwael" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @its_mohamedwael
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mohamed Wael. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
