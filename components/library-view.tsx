"use client"

import type React from "react"

import { useState } from "react"
import { BookOpen, Filter, Plus, Tag, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { updateBookTags, removeBookFromLibrary, createCustomCategory } from "@/lib/actions"

interface BookType {
  id: string
  title: string
  author: string
  coverUrl: string
  genre: string
  tags: string[]
  customCategory?: string
}

interface LibraryViewProps {
  books: BookType[]
  filter: string
}

export default function LibraryView({ books, filter }: LibraryViewProps) {
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>(books)
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false)
  const { toast } = useToast()

  // Filter books based on the selected tab and tag filter
  const getFilteredBooks = () => {
    let result = books

    // Apply genre filter
    if (filter === "fiction") {
      result = result.filter((book) => book.genre.toLowerCase() === "fiction")
    } else if (filter === "non-fiction") {
      result = result.filter((book) => book.genre.toLowerCase() === "non-fiction")
    } else if (filter === "custom") {
      result = result.filter((book) => book.customCategory)
    }

    // Apply tag filter
    if (tagFilter) {
      result = result.filter((book) => book.tags.includes(tagFilter))
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (book) => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
      )
    }

    return result
  }

  const displayedBooks = getFilteredBooks()

  const handleTagClick = (tag: string) => {
    setTagFilter(tagFilter === tag ? null : tag)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleAddTag = async (bookId: string, tag: string) => {
    try {
      await updateBookTags(bookId, tag, "add")

      // Update local state
      setFilteredBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === bookId ? { ...book, tags: [...book.tags, tag] } : book)),
      )

      toast({
        title: "Tag added",
        description: `Added "${tag}" tag to book`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tag",
        variant: "destructive",
      })
    }
  }

  const handleRemoveTag = async (bookId: string, tag: string) => {
    try {
      await updateBookTags(bookId, tag, "remove")

      // Update local state
      setFilteredBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === bookId ? { ...book, tags: book.tags.filter((t) => t !== tag) } : book)),
      )

      toast({
        title: "Tag removed",
        description: `Removed "${tag}" tag from book`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove tag",
        variant: "destructive",
      })
    }
  }

  const handleRemoveBook = async (bookId: string) => {
    try {
      await removeBookFromLibrary(bookId)

      // Update local state
      setFilteredBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))

      toast({
        title: "Book removed",
        description: "Book has been removed from your library",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove book",
        variant: "destructive",
      })
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      })
      return
    }

    try {
      await createCustomCategory(newCategory)

      toast({
        title: "Category created",
        description: `Created "${newCategory}" category`,
      })

      setNewCategory("")
      setOpenCategoryDialog(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      })
    }
  }

  const availableTags = ["purchased", "non-purchased", "reading", "completed", "botm", "wishlist"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Input placeholder="Search books..." value={searchQuery} onChange={handleSearch} className="max-w-sm" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTagFilter(null)}>All Tags</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTagClick("purchased")}>Purchased</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTagClick("non-purchased")}>Non-Purchased</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTagClick("reading")}>Reading</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTagClick("completed")}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTagClick("wishlist")}>Wishlist</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {filter === "custom" && (
          <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
                <DialogDescription>Add a custom category to organize your books</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g., Favorites, Summer Reading"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateCategory}>Create Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {tagFilter && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtered by:</span>
          <Badge variant="secondary" className="capitalize">
            {tagFilter}
          </Badge>
          <Button variant="ghost" size="sm" onClick={() => setTagFilter(null)}>
            Clear
          </Button>
        </div>
      )}

      {displayedBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No books found</h3>
          <p className="text-muted-foreground mt-1">
            {filter !== "all"
              ? "Try changing your filter or add books to this category"
              : "Add books to your library from the search page"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {displayedBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden flex flex-col">
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={book.coverUrl || "/placeholder.svg"}
                  alt={book.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4 flex-grow">
                <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {book.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="capitalize text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Tag className="h-4 w-4 mr-1" />
                      Tags
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {availableTags.map((tag) => (
                      <DropdownMenuItem
                        key={tag}
                        onClick={() =>
                          book.tags.includes(tag) ? handleRemoveTag(book.id, tag) : handleAddTag(book.id, tag)
                        }
                      >
                        {book.tags.includes(tag) ? `Remove ${tag}` : `Add ${tag}`}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveBook(book.id)}>
                  <Trash className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

