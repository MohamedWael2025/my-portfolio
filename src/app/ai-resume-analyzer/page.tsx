import { Metadata } from "next"
import { Suspense } from "react"
import ResumeAnalyzerApp from "./components/resume-analyzer-app"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "AI Resume Analyzer",
  description: "Upload your resume and get AI-powered analysis with scoring and improvement suggestions using Hugging Face NLP.",
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default function ResumeAnalyzerPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ResumeAnalyzerApp />
    </Suspense>
  )
}
