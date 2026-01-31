import { Metadata } from "next"
import { Suspense } from "react"
import AdminDashboardApp from "./components/admin-dashboard-app"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Admin Analytics Dashboard",
  description: "Interactive dashboard with role-based analytics and data visualizations.",
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <div className="grid md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <AdminDashboardApp />
    </Suspense>
  )
}
