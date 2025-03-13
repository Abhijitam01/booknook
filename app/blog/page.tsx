import { auth } from "@/lib/auth"
import { getBlogPosts } from "@/lib/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MessageSquare, Plus, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default async function BlogPage() {
  const session = await auth()
  const blogPosts = await getBlogPosts()

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Blog</h1>
          <p className="text-muted-foreground">Discover book reviews, reading tips, and literary discussions</p>
        </div>
        <Link href="/blog/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Write a Post
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input placeholder="Search blog posts..." className="w-full" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="reviews">Book Reviews</SelectItem>
              <SelectItem value="recommendations">Recommendations</SelectItem>
              <SelectItem value="reading-tips">Reading Tips</SelectItem>
              <SelectItem value="author-spotlights">Author Spotlights</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <Card className="h-full transition-all hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={post.coverImage || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        {post.categories.map((category) => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.image} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{post.author.name}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    <span>{post.publishedAt}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    <span>{post.commentCount} comments</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Book Reviews", count: 42, icon: <BookOpen className="h-5 w-5" /> },
              { name: "Reading Tips", count: 28, icon: <BookOpen className="h-5 w-5" /> },
              { name: "Author Spotlights", count: 16, icon: <BookOpen className="h-5 w-5" /> },
              { name: "Literary Analysis", count: 23, icon: <BookOpen className="h-5 w-5" /> },
            ].map((category) => (
              <Link href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`} key={category.name}>
                <div className="bg-muted rounded-lg p-6 hover:bg-muted/80 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

