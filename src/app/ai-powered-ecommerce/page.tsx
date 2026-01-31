import { Metadata } from "next"
import { Suspense } from "react"
import EcommerceApp from "./components/ecommerce-app"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "AI-Powered E-Commerce",
  description: "Full-stack e-commerce platform with AI product recommendations powered by Hugging Face.",
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <Skeleton className="h-10 w-64" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default function AIEcommercePage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <EcommerceApp />
    </Suspense>
  )
}
