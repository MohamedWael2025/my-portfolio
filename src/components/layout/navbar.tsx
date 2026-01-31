"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Code2, User, Mail, Briefcase, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { id: "home", href: "/", label: "Home", icon: Home, hash: "" },
  { id: "about", href: "/#about", label: "About", icon: User, hash: "about" },
  { id: "projects", href: "/#projects", label: "Projects", icon: Briefcase, hash: "projects" },
  { id: "contact", href: "/#contact", label: "Contact", icon: Mail, hash: "contact" },
]

const demoProjects = [
  { href: "/ai-powered-ecommerce", label: "AI E-Commerce" },
  { href: "/saas-task-manager", label: "Task Manager" },
  { href: "/ai-resume-analyzer", label: "Resume Analyzer" },
  { href: "/admin-dashboard", label: "Admin Dashboard" },
  { href: "/cpp-dev-tools", label: "C++ Tools" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState("home")
  const pathname = usePathname()
  const navRef = React.useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0 })

  // Update indicator position
  const updateIndicator = React.useCallback((itemId: string) => {
    if (navRef.current) {
      const activeEl = navRef.current.querySelector(`[data-nav-id="${itemId}"]`) as HTMLElement
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        })
      }
    }
  }, [])

  // Handle scroll and hash changes
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Only track sections on homepage
      if (pathname !== "/") return

      // Find which section is in view
      const sections = ["contact", "projects", "about"]
      let currentSection = "home"

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            currentSection = section
            break
          }
        }
      }

      if (currentSection !== activeItem) {
        setActiveItem(currentSection)
      }
    }

    // Handle hash change
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash && navItems.some(item => item.hash === hash)) {
        setActiveItem(hash)
      } else if (pathname === "/" && !hash) {
        setActiveItem("home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("hashchange", handleHashChange)
    
    // Initial check
    handleScroll()
    handleHashChange()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [pathname, activeItem])

  // Update indicator when activeItem changes
  React.useEffect(() => {
    updateIndicator(activeItem)
  }, [activeItem, updateIndicator])

  // Update indicator on resize
  React.useEffect(() => {
    const handleResize = () => updateIndicator(activeItem)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeItem, updateIndicator])

  // If on a demo page, don't highlight main nav items
  const isDemoPage = pathname !== "/" && !pathname.startsWith("/#")

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveItem(item.id)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
            MW
          </div>
          <span className="font-bold text-lg hidden sm:block">
            Mohamed Wael
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 relative" ref={navRef}>
          {/* Sliding Indicator */}
          {!isDemoPage && indicatorStyle.width > 0 && (
            <motion.div
              className="absolute top-0 bottom-0 bg-primary rounded-lg -z-10"
              initial={false}
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
            />
          )}

          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              data-nav-id={item.id}
              onClick={() => handleNavClick(item)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative z-10",
                !isDemoPage && activeItem === item.id
                  ? "text-primary-foreground"
                  : "hover:bg-muted/50"
              )}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Demo Projects Dropdown */}
          <div className="relative group">
            <button 
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1",
                isDemoPage
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <Code2 className="w-4 h-4" />
              Demos
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
              <div className="bg-background border rounded-lg shadow-lg p-2">
                {demoProjects.map((project) => (
                  <Link
                    key={project.href}
                    href={project.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm transition-colors",
                      pathname === project.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    {project.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false)
                    handleNavClick(item)
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    !isDemoPage && activeItem === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t pt-2 mt-2">
                <p className="px-4 py-1 text-xs text-muted-foreground font-semibold uppercase">
                  Demo Projects
                </p>
                {demoProjects.map((project) => (
                  <Link
                    key={project.href}
                    href={project.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === project.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    {project.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
