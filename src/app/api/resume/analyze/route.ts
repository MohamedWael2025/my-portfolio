import { NextRequest, NextResponse } from "next/server"
import { analyzeResume } from "@/lib/huggingface"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const text = formData.get("text") as string | null

    let resumeText = text

    if (file) {
      // In production, you would parse PDF/DOCX here
      // For demo, we'll use sample text or extract text from the file
      resumeText = await file.text()
    }

    if (!resumeText) {
      return NextResponse.json(
        { error: "Please provide a resume file or text" },
        { status: 400 }
      )
    }

    // Check if Hugging Face API is configured
    if (!process.env.HUGGINGFACE_API_KEY) {
      // Return mock analysis for demo
      return NextResponse.json({
        analysis: {
          overallScore: 78,
          sections: {
            contact: { score: 95, feedback: "Contact information is complete and professional." },
            summary: { score: 72, feedback: "Consider adding more specific achievements and quantifiable results." },
            experience: { score: 80, feedback: "Good experience section. Add more action verbs and metrics." },
            education: { score: 85, feedback: "Education section is well-formatted." },
            skills: { score: 70, feedback: "Consider organizing skills by category and adding proficiency levels." },
          },
          keywords: {
            found: ["JavaScript", "React", "Node.js", "TypeScript", "Python", "AWS", "Docker"],
            missing: ["CI/CD", "Agile", "Scrum", "Testing", "GraphQL"],
          },
          suggestions: [
            "Add quantifiable achievements (e.g., 'Increased performance by 40%')",
            "Include relevant certifications",
            "Use more action verbs at the start of bullet points",
            "Add a professional summary section",
            "Include links to portfolio or GitHub",
            "Optimize for ATS by using standard section headings",
          ],
          atsCompatibility: {
            score: 75,
            issues: [
              "Consider using a simpler format for better ATS parsing",
              "Some section headers may not be recognized by ATS",
            ],
          },
          wordCount: resumeText.split(/\s+/).length,
          estimatedReadTime: Math.ceil(resumeText.split(/\s+/).length / 200) + " minutes",
        },
      })
    }

    // Use Hugging Face for actual analysis
    const analysis = await analyzeResume(resumeText)

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Resume analysis error:", error)
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    )
  }
}
