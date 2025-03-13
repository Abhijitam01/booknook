import { Suspense } from "react"
import { BookSearch } from "@/components/book-search"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search Books</h1>
          <p className="text-muted-foreground">Find books and add them to your library</p>
        </div>
      </div>

      <Suspense fallback={<SearchSkeleton />}>
        <BookSearch />
      </Suspense>
    </div>
  )
}

function SearchSkeleton() {
  return (
    <div className="mt-6 space-y-6">
      <div className="flex gap-2">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-60 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
      </div>
    </div>
  )
}

