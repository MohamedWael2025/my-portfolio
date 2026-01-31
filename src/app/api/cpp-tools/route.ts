import { NextRequest, NextResponse } from "next/server"

// Simple C++ code formatter simulation
function formatCppCode(code: string): { formatted: string; changes: number } {
  let formatted = code
  let changes = 0

  // Add space after keywords
  const keywords = ["if", "else", "for", "while", "switch", "return", "class", "struct", "public", "private", "protected"]
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\(`, "g")
    const count = (formatted.match(regex) || []).length
    formatted = formatted.replace(regex, `${keyword} (`)
    changes += count
  })

  // Fix brace spacing
  formatted = formatted.replace(/\)\s*{/g, ") {")
  formatted = formatted.replace(/}\s*else/g, "} else")

  // Fix operator spacing
  formatted = formatted.replace(/([=+\-*/<>!])(?=[^\s=])/g, "$1 ")
  formatted = formatted.replace(/(?<=[^\s=])([=+\-*/<>!])/g, " $1")

  // Remove trailing whitespace
  formatted = formatted.replace(/[ \t]+$/gm, "")

  // Ensure newline at end
  if (!formatted.endsWith("\n")) {
    formatted += "\n"
  }

  return { formatted, changes }
}

// Simple C++ linter simulation
interface LintDiagnostic {
  line: number
  column: number
  severity: "error" | "warning" | "info" | "hint"
  message: string
  code: string
}

function lintCppCode(code: string): LintDiagnostic[] {
  const diagnostics: LintDiagnostic[] = []
  const lines = code.split("\n")

  lines.forEach((line, index) => {
    const lineNum = index + 1

    // Check for using namespace std
    if (line.includes("using namespace std")) {
      diagnostics.push({
        line: lineNum,
        column: line.indexOf("using") + 1,
        severity: "warning",
        message: "Avoid 'using namespace std' - prefer explicit std:: prefix",
        code: "W001",
      })
    }

    // Check for raw pointers
    if (line.match(/\w+\s*\*\s*\w+\s*=\s*new\s+/)) {
      diagnostics.push({
        line: lineNum,
        column: line.indexOf("new") + 1,
        severity: "warning",
        message: "Consider using smart pointers (std::unique_ptr or std::shared_ptr) instead of raw pointers",
        code: "W002",
      })
    }

    // Check for C-style casts
    if (line.match(/\(\s*(int|float|double|char|long)\s*\)/)) {
      diagnostics.push({
        line: lineNum,
        column: 1,
        severity: "info",
        message: "Consider using C++ style casts (static_cast, dynamic_cast, etc.)",
        code: "I001",
      })
    }

    // Check for magic numbers
    if (line.match(/[^0-9.][0-9]{2,}[^0-9.]/)) {
      diagnostics.push({
        line: lineNum,
        column: 1,
        severity: "hint",
        message: "Consider defining constants for magic numbers",
        code: "H001",
      })
    }

    // Check for long lines
    if (line.length > 120) {
      diagnostics.push({
        line: lineNum,
        column: 121,
        severity: "info",
        message: "Line exceeds 120 characters - consider breaking it up",
        code: "I002",
      })
    }

    // Check for TODO comments
    if (line.includes("TODO") || line.includes("FIXME")) {
      diagnostics.push({
        line: lineNum,
        column: line.indexOf("TODO") + 1 || line.indexOf("FIXME") + 1,
        severity: "info",
        message: "Unresolved TODO/FIXME comment",
        code: "I003",
      })
    }
  })

  return diagnostics
}

// Simple code analysis
interface AnalysisResult {
  complexity: {
    cyclomatic: number
    cognitive: number
    linesOfCode: number
    functions: number
    classes: number
  }
  performance: {
    estimatedComplexity: string
    suggestions: string[]
  }
}

function analyzeCppCode(code: string): AnalysisResult {
  const lines = code.split("\n")
  const nonEmptyLines = lines.filter((l) => l.trim().length > 0)

  // Count functions
  const functionMatches = code.match(/\w+\s+\w+\s*\([^)]*\)\s*{/g) || []
  const functions = functionMatches.length

  // Count classes
  const classMatches = code.match(/class\s+\w+/g) || []
  const classes = classMatches.length

  // Cyclomatic complexity (simplified)
  const ifCount = (code.match(/\bif\b/g) || []).length
  const forCount = (code.match(/\bfor\b/g) || []).length
  const whileCount = (code.match(/\bwhile\b/g) || []).length
  const caseCount = (code.match(/\bcase\b/g) || []).length
  const catchCount = (code.match(/\bcatch\b/g) || []).length
  const andCount = (code.match(/&&/g) || []).length
  const orCount = (code.match(/\|\|/g) || []).length

  const cyclomatic = 1 + ifCount + forCount + whileCount + caseCount + catchCount + andCount + orCount

  // Cognitive complexity (simplified)
  const cognitive = cyclomatic + (code.match(/\brecursive\b|\breturn\s+\w+\s*\(/g) || []).length * 3

  // Performance suggestions
  const suggestions: string[] = []

  if (code.includes("vector") && !code.includes("reserve")) {
    suggestions.push("Consider using vector.reserve() when the size is known in advance")
  }

  if (code.match(/for\s*\([^;]*;\s*[^;]*\.size\(\)/)) {
    suggestions.push("Cache container size in loop condition to avoid repeated calls")
  }

  if (code.includes("string") && code.includes("+")) {
    suggestions.push("Consider using string concatenation with reserve() or stringstream for better performance")
  }

  if (code.includes("new") && !code.includes("unique_ptr") && !code.includes("shared_ptr")) {
    suggestions.push("Use smart pointers to avoid memory leaks")
  }

  if (code.includes("recursive") || code.match(/return\s+\w+\s*\(/)) {
    suggestions.push("Consider tail recursion optimization or iterative approach")
  }

  // Estimate complexity
  let estimatedComplexity = "O(1)"
  if (code.match(/for\s*\([^)]*\)\s*{\s*for\s*\([^)]*\)/)) {
    estimatedComplexity = "O(n²)"
  } else if (forCount > 0 || whileCount > 0) {
    estimatedComplexity = "O(n)"
  }
  if (code.includes("recursive") || code.match(/return\s+\w+\s*\([^)]*-\s*1/)) {
    estimatedComplexity = "O(2^n) - consider memoization"
  }

  return {
    complexity: {
      cyclomatic,
      cognitive,
      linesOfCode: nonEmptyLines.length,
      functions,
      classes,
    },
    performance: {
      estimatedComplexity,
      suggestions,
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, action } = body

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 })
    }

    switch (action) {
      case "format": {
        const result = formatCppCode(code)
        return NextResponse.json({
          formatted: result.formatted,
          changes: result.changes,
          message: `Formatted code with ${result.changes} changes`,
        })
      }

      case "lint": {
        const diagnostics = lintCppCode(code)
        return NextResponse.json({
          diagnostics,
          summary: {
            errors: diagnostics.filter((d) => d.severity === "error").length,
            warnings: diagnostics.filter((d) => d.severity === "warning").length,
            info: diagnostics.filter((d) => d.severity === "info").length,
            hints: diagnostics.filter((d) => d.severity === "hint").length,
          },
        })
      }

      case "analyze": {
        const analysis = analyzeCppCode(code)
        return NextResponse.json({ analysis })
      }

      case "compile": {
        // In production, this would send to a secure sandboxed compiler service
        // For demo, we simulate compilation output
        await new Promise((resolve) => setTimeout(resolve, 500))

        return NextResponse.json({
          success: true,
          output: `Compilation successful!

$ g++ -std=c++17 -O2 -Wall main.cpp -o main
$ ./main

[Program output would appear here]

Process finished with exit code 0
Execution time: 0.023s
Memory usage: 1.2 MB`,
          compilationTime: "0.234s",
          warnings: [],
        })
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("C++ tools error:", error)
    return NextResponse.json({ error: "Failed to process code" }, { status: 500 })
  }
}
