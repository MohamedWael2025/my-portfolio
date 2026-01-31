import { Metadata } from "next"
import { Suspense } from "react"
import TaskManagerApp from "./components/task-manager-app"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "SaaS Task Manager",
  description: "Team collaboration platform with real-time updates, boards, and role-based access.",
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <Skeleton className="w-64 h-screen" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-72 h-96" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TaskManagerPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <TaskManagerApp />
    </Suspense>
  )
}
