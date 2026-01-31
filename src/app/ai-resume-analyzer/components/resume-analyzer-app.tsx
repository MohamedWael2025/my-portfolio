"use client"

import * as React from "react"
import { useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  FileText,
  Brain,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Target,
  Loader2,
  Download,
  Trash2,
  RefreshCw,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Types
interface AnalysisResult {
  overallScore: number
  experienceScore: number
  educationScore: number
  skillsScore: number
  formatScore: number
  summary: string
  strengths: string[]
  improvements: string[]
  keywords: string[]
  sections: {
    name: string
    found: boolean
    score: number
    feedback: string
  }[]
  atsCompatibility: number
  industryMatch: string[]
}

interface UploadedFile {
  id: string
  name: string
  size: number
  uploadedAt: Date
  status: "pending" | "analyzing" | "completed" | "failed"
  result?: AnalysisResult
}

export default function ResumeAnalyzerApp() {
  const [files, setFiles] = React.useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [activeFile, setActiveFile] = React.useState<UploadedFile | null>(null)

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf" || 
              file.type === "application/msword" ||
              file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )

    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles[0])
    }
  }, [])

  // Handle file input
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  // Process file upload
  const handleFileUpload = async (file: File) => {
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      uploadedAt: new Date(),
      status: "pending",
    }

    setFiles(prev => [newFile, ...prev])
    setActiveFile(newFile)

    // Start analysis
    await analyzeResume(newFile.id)
  }

  // Simulate AI analysis
  const analyzeResume = async (fileId: string) => {
    setFiles(prev =>
      prev.map(f =>
        f.id === fileId ? { ...f, status: "analyzing" as const } : f
      )
    )

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Generate mock analysis result
    const result: AnalysisResult = {
      overallScore: Math.floor(Math.random() * 30) + 70,
      experienceScore: Math.floor(Math.random() * 30) + 65,
      educationScore: Math.floor(Math.random() * 25) + 75,
      skillsScore: Math.floor(Math.random() * 20) + 80,
      formatScore: Math.floor(Math.random() * 15) + 85,
      summary: "This resume demonstrates strong technical skills and relevant experience. The candidate shows proficiency in modern web development technologies and has a solid educational background. With some improvements to formatting and keyword optimization, this resume has excellent potential for attracting recruiters.",
      strengths: [
        "Strong technical skills section with relevant technologies",
        "Clear and concise work experience descriptions",
        "Quantified achievements with metrics",
        "Well-organized layout and structure",
        "Relevant educational background",
      ],
      improvements: [
        "Add more action verbs to describe accomplishments",
        "Include a professional summary at the top",
        "Optimize for ATS with more industry keywords",
        "Add links to portfolio or GitHub profile",
        "Consider adding relevant certifications",
      ],
      keywords: [
        "JavaScript",
        "React",
        "Node.js",
        "TypeScript",
        "Full-Stack",
        "Agile",
        "REST API",
        "Database",
        "Git",
        "Problem Solving",
      ],
      sections: [
        { name: "Contact Information", found: true, score: 100, feedback: "All essential contact details present" },
        { name: "Professional Summary", found: false, score: 0, feedback: "Consider adding a brief professional summary" },
        { name: "Work Experience", found: true, score: 85, feedback: "Good descriptions, could add more metrics" },
        { name: "Education", found: true, score: 90, feedback: "Well documented with relevant coursework" },
        { name: "Skills", found: true, score: 95, feedback: "Comprehensive list of technical skills" },
        { name: "Projects", found: true, score: 80, feedback: "Good projects, add more context about your role" },
      ],
      atsCompatibility: Math.floor(Math.random() * 20) + 75,
      industryMatch: ["Software Development", "Web Development", "Full-Stack Engineering", "Frontend Development"],
    }

    setFiles(prev =>
      prev.map(f =>
        f.id === fileId ? { ...f, status: "completed" as const, result } : f
      )
    )

    setActiveFile(prev =>
      prev?.id === fileId ? { ...prev, status: "completed" as const, result } : prev
    )
  }

  // Delete file
  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
    if (activeFile?.id === fileId) {
      setActiveFile(null)
    }
  }

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-500"
    if (score >= 60) return "from-amber-500 to-orange-500"
    return "from-red-500 to-rose-500"
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge className="bg-white/20 hover:bg-white/30 text-white">
              <Brain className="w-3 h-3 mr-1" />
              Powered by Hugging Face AI
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold">
              AI Resume Analyzer
            </h1>
            <p className="text-white/80 text-lg">
              Get instant, AI-powered feedback on your resume. Improve your chances of landing interviews with actionable insights.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload & History */}
          <div className="space-y-6">
            {/* Upload Zone */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Resume
                </CardTitle>
                <CardDescription>
                  Drag and drop your resume or click to browse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-primary/50"
                  )}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-medium">Drop your resume here</p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {files.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No resumes uploaded yet
                  </p>
                ) : (
                  files.map((file) => (
                    <div
                      key={file.id}
                      onClick={() => setActiveFile(file)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                        activeFile?.id === file.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted"
                      )}
                    >
                      <div className="flex-shrink-0">
                        {file.status === "analyzing" ? (
                          <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        ) : file.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : file.status === "failed" ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.status === "analyzing" ? "Analyzing..." :
                           file.status === "completed" ? `Score: ${file.result?.overallScore}%` :
                           file.status === "failed" ? "Analysis failed" :
                           "Pending"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteFile(file.id)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2">
            {!activeFile ? (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-16">
                  <Brain className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
                  <p className="text-muted-foreground max-w-md">
                    Upload your resume to get AI-powered insights, scoring, and improvement suggestions
                  </p>
                </CardContent>
              </Card>
            ) : activeFile.status === "analyzing" ? (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-16">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-primary/20 mx-auto mb-4" />
                    <Loader2 className="w-20 h-20 absolute top-0 left-1/2 -translate-x-1/2 animate-spin text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analyzing Your Resume</h3>
                  <p className="text-muted-foreground">
                    Our AI is reviewing your resume using Hugging Face NLP models...
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-sm text-muted-foreground">Processing with AI</span>
                  </div>
                </CardContent>
              </Card>
            ) : activeFile.result ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <Card className="overflow-hidden">
                  <div className={cn("h-2 bg-gradient-to-r", getScoreGradient(activeFile.result.overallScore))} />
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Overall Score</p>
                        <div className="flex items-baseline gap-2">
                          <span className={cn("text-5xl font-bold", getScoreColor(activeFile.result.overallScore))}>
                            {activeFile.result.overallScore}
                          </span>
                          <span className="text-2xl text-muted-foreground">/100</span>
                        </div>
                      </div>
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            className="stroke-muted fill-none"
                            strokeWidth="12"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            className={cn("fill-none", getScoreColor(activeFile.result.overallScore).replace('text', 'stroke'))}
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={`${(activeFile.result.overallScore / 100) * 352} 352`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Award className={cn("w-10 h-10", getScoreColor(activeFile.result.overallScore))} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Score Breakdown */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Experience", score: activeFile.result.experienceScore, icon: Briefcase },
                    { label: "Education", score: activeFile.result.educationScore, icon: GraduationCap },
                    { label: "Skills", score: activeFile.result.skillsScore, icon: Code },
                    { label: "Format", score: activeFile.result.formatScore, icon: Target },
                  ].map((item) => (
                    <Card key={item.label}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <span className={cn("font-bold", getScoreColor(item.score))}>
                            {item.score}%
                          </span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Detailed Analysis */}
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="sections">Sections</TabsTrigger>
                    <TabsTrigger value="keywords">Keywords</TabsTrigger>
                    <TabsTrigger value="tips">Tips</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">AI Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {activeFile.result.summary}
                        </p>
                        
                        <div className="mt-6">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Industry Match
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {activeFile.result.industryMatch.map((industry) => (
                              <Badge key={industry} variant="secondary">
                                {industry}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">ATS Compatibility</span>
                            <span className={cn("font-bold", getScoreColor(activeFile.result.atsCompatibility))}>
                              {activeFile.result.atsCompatibility}%
                            </span>
                          </div>
                          <Progress value={activeFile.result.atsCompatibility} className="h-2" />
                          <p className="text-sm text-muted-foreground mt-2">
                            Your resume is {activeFile.result.atsCompatibility >= 80 ? 'well' : 'moderately'} optimized for Applicant Tracking Systems
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="sections" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Section Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {activeFile.result.sections.map((section) => (
                          <div
                            key={section.name}
                            className={cn(
                              "p-4 rounded-lg border",
                              section.found ? "bg-background" : "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                            )}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {section.found ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-amber-500" />
                                )}
                                <span className="font-medium">{section.name}</span>
                              </div>
                              {section.found && (
                                <span className={cn("font-bold text-sm", getScoreColor(section.score))}>
                                  {section.score}%
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{section.feedback}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="keywords" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Detected Keywords</CardTitle>
                        <CardDescription>
                          Keywords found in your resume that are relevant to your target roles
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {activeFile.result.keywords.map((keyword) => (
                            <Badge key={keyword} variant="outline" className="text-sm py-1 px-3">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                            💡 Keyword Tip
                          </h4>
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            Consider adding more industry-specific keywords like "CI/CD", "Cloud Computing", 
                            "Leadership", or "Cross-functional collaboration" to improve ATS matching.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tips" className="mt-4">
                    <div className="grid gap-4">
                      <Card className="border-green-200 dark:border-green-800">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-400">
                            <CheckCircle2 className="w-5 h-5" />
                            Strengths
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {activeFile.result.strengths.map((strength, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <Star className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-amber-200 dark:border-amber-800">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2 text-amber-700 dark:text-amber-400">
                            <TrendingUp className="w-5 h-5" />
                            Areas for Improvement
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {activeFile.result.improvements.map((improvement, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                {improvement}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => analyzeResume(activeFile.id)}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Re-analyze
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
