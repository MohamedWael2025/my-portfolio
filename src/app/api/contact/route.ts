import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    // 4. Add spam protection (reCAPTCHA, honeypot)

    // For demo, we simulate sending
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Log the contact (in production, save to DB)
    console.log("Contact form submission:", {
      name,
      email,
      subject: subject || "No subject",
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
