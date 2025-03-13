"use client"

import { useState } from "react"
import { Book, BookPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { searchBooks, addBookToLibrary } from "@/lib/actions"

interface BookType {
  id: string
  title: string
  author: string
  coverUrl: string
  genre: string
}

export function BookSearch() {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { data: session } = useSession()

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const results = await searchBooks(query)
      setBooks(results)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search books",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddToLibrary = async (book: BookType) => {
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
    <div className="mt-6 space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Search by title, author, or ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
          className="max-w-md"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {books.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Book className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No books found</h3>
          <p className="text-muted-foreground mt-1">Try searching for a book title, author, or ISBN</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
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
                  <p className="text-xs text-muted-foreground mt-1">{book.genre}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

