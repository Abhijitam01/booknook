import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getDiscussionGroups } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Users, BookOpen, Plus } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default async function DiscussionsPage() {
  const session = await auth()

  if (!session) {
    redirect("/sign-in")
  }

  const discussionGroups = await getDiscussionGroups()

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Discussions</h1>
          <p className="text-muted-foreground">Join conversations about your favorite books with other readers</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a New Discussion</DialogTitle>
              <DialogDescription>Start a conversation about a book with other readers</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="discussion-title">Discussion Title</Label>
                <Input id="discussion-title" placeholder="Enter a title for your discussion" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="book">Book</Label>
                <Select>
                  <SelectTrigger id="book">
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="midnight-library">The Midnight Library</SelectItem>
                    <SelectItem value="atomic-habits">Atomic Habits</SelectItem>
                    <SelectItem value="project-hail-mary">Project Hail Mary</SelectItem>
                    <SelectItem value="addie-larue">The Invisible Life of Addie LaRue</SelectItem>
                    <SelectItem value="other">Other (specify below)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="What would you like to discuss about this book?" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select defaultValue="public">
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Anyone can join)</SelectItem>
                    <SelectItem value="private">Private (Invitation only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit">Create Discussion</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Input placeholder="Search discussions..." className="max-w-sm" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Discussions</SelectItem>
              <SelectItem value="my-discussions">My Discussions</SelectItem>
              <SelectItem value="active">Most Active</SelectItem>
              <SelectItem value="recent">Recently Created</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {discussionGroups.map((group) => (
            <Link href={`/discussions/${group.id}`} key={group.id}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1">{group.title}</CardTitle>
                    {group.isPrivate && <Badge variant="outline">Private</Badge>}
                  </div>
                  <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="mr-1 h-4 w-4" />
                    <span className="line-clamp-1">{group.book}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    <span>{group.memberCount} members</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    <span>{group.messageCount} messages</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

