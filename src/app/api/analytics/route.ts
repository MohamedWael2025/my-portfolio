import { NextRequest, NextResponse } from "next/server"

// Simulated analytics data
const generateAnalyticsData = (period: string) => {
  const periods: Record<string, number> = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "12m": 365,
  }

  const days = periods[period] || 30
  const data = []
  const baseDate = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      visitors: Math.floor(Math.random() * 1000) + 500,
      pageViews: Math.floor(Math.random() * 3000) + 1500,
      sessions: Math.floor(Math.random() * 800) + 400,
      bounceRate: Math.floor(Math.random() * 30) + 20,
      avgSessionDuration: Math.floor(Math.random() * 300) + 120,
    })
  }

  return data
}

const generateTopPages = () => [
  { path: "/", title: "Home", views: 12500, avgTime: "2:34" },
  { path: "/ai-powered-ecommerce", title: "AI E-Commerce", views: 8200, avgTime: "3:45" },
  { path: "/saas-task-manager", title: "Task Manager", views: 6800, avgTime: "4:12" },
  { path: "/ai-resume-analyzer", title: "Resume Analyzer", views: 5400, avgTime: "5:30" },
  { path: "/admin-dashboard", title: "Admin Dashboard", views: 4200, avgTime: "3:15" },
  { path: "/cpp-dev-tools", title: "C++ Tools", views: 3800, avgTime: "6:20" },
]

const generateTrafficSources = () => [
  { source: "Organic Search", visitors: 45000, percentage: 35 },
  { source: "Direct", visitors: 32000, percentage: 25 },
  { source: "Social Media", visitors: 25600, percentage: 20 },
  { source: "Referral", visitors: 15400, percentage: 12 },
  { source: "Email", visitors: 10200, percentage: 8 },
]

const generateDeviceStats = () => ({
  desktop: 58,
  mobile: 35,
  tablet: 7,
})

const generateGeographicData = () => [
  { country: "United States", visitors: 35000, percentage: 28 },
  { country: "United Kingdom", visitors: 15000, percentage: 12 },
  { country: "Germany", visitors: 12000, percentage: 10 },
  { country: "Egypt", visitors: 10000, percentage: 8 },
  { country: "India", visitors: 9000, percentage: 7 },
  { country: "Other", visitors: 44000, percentage: 35 },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30d"
    const metric = searchParams.get("metric")

    // Generate comprehensive analytics
    const timeSeriesData = generateAnalyticsData(period)

    // Calculate totals
    const totals = timeSeriesData.reduce(
      (acc, day) => ({
        visitors: acc.visitors + day.visitors,
        pageViews: acc.pageViews + day.pageViews,
        sessions: acc.sessions + day.sessions,
        avgBounceRate: acc.avgBounceRate + day.bounceRate,
        avgSessionDuration: acc.avgSessionDuration + day.avgSessionDuration,
      }),
      { visitors: 0, pageViews: 0, sessions: 0, avgBounceRate: 0, avgSessionDuration: 0 }
    )

    const numDays = timeSeriesData.length
    totals.avgBounceRate = Math.round(totals.avgBounceRate / numDays)
    totals.avgSessionDuration = Math.round(totals.avgSessionDuration / numDays)

    // If specific metric requested, return only that
    if (metric) {
      switch (metric) {
        case "visitors":
          return NextResponse.json({
            total: totals.visitors,
            data: timeSeriesData.map((d) => ({ date: d.date, value: d.visitors })),
          })
        case "pageViews":
          return NextResponse.json({
            total: totals.pageViews,
            data: timeSeriesData.map((d) => ({ date: d.date, value: d.pageViews })),
          })
        case "topPages":
          return NextResponse.json({ pages: generateTopPages() })
        case "traffic":
          return NextResponse.json({ sources: generateTrafficSources() })
        case "devices":
          return NextResponse.json({ devices: generateDeviceStats() })
        case "geographic":
          return NextResponse.json({ countries: generateGeographicData() })
      }
    }

    // Return full analytics dashboard data
    return NextResponse.json({
      period,
      summary: {
        totalVisitors: totals.visitors,
        totalPageViews: totals.pageViews,
        totalSessions: totals.sessions,
        avgBounceRate: totals.avgBounceRate,
        avgSessionDuration: totals.avgSessionDuration,
        visitorsChange: Math.floor(Math.random() * 20) - 5,
        pageViewsChange: Math.floor(Math.random() * 25) - 5,
      },
      timeSeries: timeSeriesData,
      topPages: generateTopPages(),
      trafficSources: generateTrafficSources(),
      devices: generateDeviceStats(),
      geographic: generateGeographicData(),
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
