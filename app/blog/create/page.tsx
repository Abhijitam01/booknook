import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BlogEditor from "@/components/blog-editor"

export default async function CreateBlogPostPage() {
  const session = await auth()

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="container py-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/blog">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Create a Blog Post</h1>
          <p className="text-muted-foreground">Share your thoughts, reviews, and insights about books</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>Write your blog post content here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter a compelling title for your post" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Write a short summary of your post (will be displayed in previews)"
                  className="resize-none"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <BlogEditor />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Enter tags separated by commas (e.g., fiction, review, fantasy)" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
              <CardDescription>Configure your post settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reviews">Book Reviews</SelectItem>
                    <SelectItem value="recommendations">Recommendations</SelectItem>
                    <SelectItem value="reading-tips">Reading Tips</SelectItem>
                    <SelectItem value="author-spotlights">Author Spotlights</SelectItem>
                    <SelectItem value="literary-analysis">Literary Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover-image">Cover Image</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Drag and drop an image, or click to browse</div>
                    <div className="text-xs text-muted-foreground">Recommended size: 1200 x 630 pixels</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="related-books">Related Books</Label>
                <Select>
                  <SelectTrigger id="related-books">
                    <SelectValue placeholder="Select books from your library" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midnight-library">The Midnight Library</SelectItem>
                    <SelectItem value="atomic-habits">Atomic Habits</SelectItem>
                    <SelectItem value="project-hail-mary">Project Hail Mary</SelectItem>
                    <SelectItem value="addie-larue">The Invisible Life of Addie LaRue</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-muted-foreground mt-1">
                  You can select multiple books that are related to your post
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select defaultValue="public">
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Anyone can view)</SelectItem>
                    <SelectItem value="private">Private (Only you can view)</SelectItem>
                    <SelectItem value="draft">Draft (Save for later)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save Draft</Button>
              <Button>Publish Post</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

