"use client"

import * as React from "react"
import { motion, type Variants } from "framer-motion"
import { 
  ArrowRight, 
  Code2, 
  Palette, 
  Brain, 
  Terminal,
  Mail,
  Phone,
  Instagram,
  ExternalLink,
  Send,
  Sparkles,
  Zap,
  Globe,
  Database
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Animation variants
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Typing effect component
function TypewriterText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [displayText, setDisplayText] = React.useState("")
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const currentText = texts[currentIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex, texts])

  return (
    <span className="gradient-text">
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  )
}

// Role badges
const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Graphic Designer",
  "C++ Programmer",
  "AI Developer"
]

// Skills
const skills = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "C++", "REST APIs"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "Prisma", "Mongoose", "Redis"] },
  { category: "AI/ML", items: ["Hugging Face", "TensorFlow", "NLP", "Computer Vision"] },
  { category: "Tools", items: ["Git", "Docker", "VS Code", "Figma", "Linux"] },
]

// Projects
const projects = [
  {
    title: "AI-Powered E-Commerce",
    description: "Full-stack e-commerce platform with AI product recommendations powered by Hugging Face.",
    href: "/ai-powered-ecommerce",
    tags: ["Next.js", "MongoDB", "Hugging Face", "Auth"],
    icon: Sparkles,
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "SaaS Task Manager",
    description: "Team collaboration platform with real-time updates, boards, and role-based access.",
    href: "/saas-task-manager",
    tags: ["Next.js", "PostgreSQL", "WebSockets", "Prisma"],
    icon: Zap,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "AI Resume Analyzer",
    description: "Upload resumes and get AI-powered analysis with scoring and improvement suggestions.",
    href: "/ai-resume-analyzer",
    tags: ["Hugging Face NLP", "PDF Processing", "File Upload"],
    icon: Brain,
    color: "from-purple-500 to-violet-500"
  },
  {
    title: "Admin Analytics Dashboard",
    description: "Interactive dashboard with role-based analytics and data visualizations.",
    href: "/admin-dashboard",
    tags: ["React", "Recharts", "MongoDB", "API Integration"],
    icon: Database,
    color: "from-orange-500 to-amber-500"
  },
  {
    title: "C++ Developer Tools Hub",
    description: "CLI tools integrated with web UI - network monitor, password checker, and more.",
    href: "/cpp-tools",
    tags: ["C++", "Node.js", "CLI", "Real-time"],
    icon: Terminal,
    color: "from-green-500 to-emerald-500"
  },
]

export default function HomePage() {
  const [contactForm, setContactForm] = React.useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert("Message sent! Thank you for reaching out.")
    setContactForm({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20" />
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
          <motion.div 
            className="text-center space-y-8 max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Globe className="w-4 h-4 mr-2" />
                Available for freelance projects
              </Badge>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
            >
              Hi, I'm{" "}
              <span className="gradient-text">Mohamed Wael</span>
            </motion.h1>

            <motion.div 
              variants={fadeInUp}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground h-12"
            >
              <TypewriterText texts={roles} />
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              I build exceptional digital experiences with modern technologies.
              Passionate about creating innovative solutions that make a difference.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="#projects">
                <Button size="lg" variant="gradient" className="gap-2">
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Get In Touch
                </Button>
              </Link>
            </motion.div>

            {/* Role badges */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-2 pt-4"
            >
              {roles.map((role) => (
                <Badge key={role} variant="outline" className="px-3 py-1">
                  {role}
                </Badge>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">About Me</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Building the Future of Web
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              With expertise in full-stack development, AI integration, and design,
              I create solutions that are both beautiful and functional.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full card-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Code2 className="w-6 h-6 text-blue-500" />
                  </div>
                  <CardTitle>Full-Stack Development</CardTitle>
                  <CardDescription>
                    Building end-to-end applications with modern frameworks like Next.js, 
                    Node.js, and robust databases.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full card-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-purple-500" />
                  </div>
                  <CardTitle>AI Integration</CardTitle>
                  <CardDescription>
                    Implementing AI-powered features using Hugging Face APIs for 
                    recommendations, NLP, and smart automation.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full card-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-pink-500" />
                  </div>
                  <CardTitle>UI/UX Design</CardTitle>
                  <CardDescription>
                    Creating beautiful, intuitive interfaces with attention to detail, 
                    animations, and user experience.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="h-full card-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <Terminal className="w-6 h-6 text-green-500" />
                  </div>
                  <CardTitle>C++ & Systems</CardTitle>
                  <CardDescription>
                    Developing high-performance CLI tools and system utilities 
                    with modern C++ practices.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-xl font-semibold text-center mb-8">Technical Skills</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category} className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">Projects</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Demo Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Full-stack applications with real backends, databases, authentication, 
              and AI features powered by Hugging Face.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={project.href}>
                  <Card className="h-full card-hover group overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <project.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="flex items-center justify-between">
                        {project.title}
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">Contact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear from you. 
              Send me a message and let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <a 
                    href="mailto:contact@itsmohamedwael.info"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-muted transition-colors border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">contact@itsmohamedwael.info</p>
                    </div>
                  </a>

                  <a 
                    href="tel:+201212549545"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-muted transition-colors border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+20 121 254 9545</p>
                    </div>
                  </a>

                  <a 
                    href="https://instagram.com/its_mohamedwael"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-muted transition-colors border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-muted-foreground">@its_mohamedwael</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      variant="gradient" 
                      className="w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
