import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getRecommendedBooks } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookPlus } from "lucide-react"
import Link from "next/link"

export default async function RecommendationsPage() {
  const session = await auth()

  if (!session) {
    redirect("/sign-in")
  }

  const recommendedBooks = await getRecommendedBooks(session.user.id)

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recommended for You</h1>
          <p className="text-muted-foreground">Books we think you'll enjoy based on your reading history</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendedBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden group">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={book.coverUrl || "/placeholder.svg?height=300&width=200"}
                  alt={book.title}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <BookPlus className="mr-2 h-4 w-4" />
                      Add to Library
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="text-xs text-muted-foreground mt-1">{book.genre}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Explore More Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {["Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery", "Biography", "Self-Help", "History"].map(
            (category) => (
              <Link href={`/search?category=${category.toLowerCase()}`} key={category}>
                <div className="bg-muted rounded-lg p-6 text-center hover:bg-muted/80 transition-colors">
                  <h3 className="font-medium">{category}</h3>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

