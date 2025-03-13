"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BookPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { addBookToLibrary } from "@/lib/actions"

interface Book {
  id: string
  title: string
  author: string
  coverUrl: string
  genre: string
}

export default function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { data: session } = useSession()

  useEffect(() => {
    // In a real app, this would fetch from an API
    setTimeout(() => {
      setBooks([
        {
          id: "1",
          title: "The Midnight Library",
          author: "Matt Haig",
          coverUrl: "/placeholder.svg?height=300&width=200",
          genre: "Fiction",
        },
        {
          id: "2",
          title: "Atomic Habits",
          author: "James Clear",
          coverUrl: "/placeholder.svg?height=300&width=200",
          genre: "Self-Help",
        },
        {
          id: "3",
          title: "Project Hail Mary",
          author: "Andy Weir",
          coverUrl: "/placeholder.svg?height=300&width=200",
          genre: "Science Fiction",
        },
        {
          id: "4",
          title: "The Invisible Life of Addie LaRue",
          author: "V.E. Schwab",
          coverUrl: "/placeholder.svg?height=300&width=200",
          genre: "Fantasy",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddToLibrary = async (book: Book) => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add books to your library",
        variant: "destructive",
      })
      return
    }

    try {
      await addBookToLibrary({
        bookId: book.id,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        genre: book.genre,
        tags: ["non-purchased"],
      })

      toast({
        title: "Book added",
        description: `${book.title} has been added to your library`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add book to library",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
      {loading
        ? Array(4)
            .fill(null)
            .map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <Skeleton className="h-64 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
        : books.map((book) => (
            <Card key={book.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={book.coverUrl || "/placeholder.svg"}
                    alt={book.title}
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <Button
                        onClick={() => handleAddToLibrary(book)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <BookPlus className="mr-2 h-4 w-4" />
                        Add to Library
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  )
}

