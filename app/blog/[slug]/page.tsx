import { auth } from "@/lib/auth"
import { getBlogPostBySlug, getBlogComments } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ArrowLeft, Heart, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import BlogCommentForm from "@/components/blog-comment-form"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const session = await auth()
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const comments = await getBlogComments(post.id)

  return (
    <div className="container py-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/blog">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="mb-6">
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <img
                src={post.coverImage || "/placeholder.svg?height=400&width=800"}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    <CalendarDays className="inline-block mr-1 h-3 w-3" />
                    {post.publishedAt}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="mr-1 h-4 w-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="flex gap-2 mt-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <div>
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

            <BlogCommentForm postId={post.id} />

            <div className="space-y-6 mt-8">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.user.image} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{comment.user.name}</div>
                        <div className="text-xs text-muted-foreground">{comment.createdAt}</div>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <button className="hover:text-foreground">Like</button>
                      <button className="hover:text-foreground">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <h3 className="font-semibold">About the Author</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h4 className="font-medium">{post.author.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{post.author.bio}</p>
              </div>

              <Separator className="my-4" />

              <h4 className="font-medium mb-3">Related Books</h4>
              <div className="space-y-3">
                {post.relatedBooks.map((book) => (
                  <div key={book.id} className="flex gap-3">
                    <div className="h-16 w-12 flex-shrink-0">
                      <img
                        src={book.coverUrl || "/placeholder.svg?height=80&width=60"}
                        alt={book.title}
                        className="h-full w-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm line-clamp-1">{book.title}</div>
                      <div className="text-xs text-muted-foreground">{book.author}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <h4 className="font-medium mb-3">More from this Author</h4>
              <div className="space-y-2">
                {post.author.otherPosts.map((otherPost) => (
                  <Link href={`/blog/${otherPost.slug}`} key={otherPost.id} className="block">
                    <div className="text-sm font-medium hover:text-primary transition-colors line-clamp-1">
                      {otherPost.title}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

