import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getDiscussionById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Users, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import ChatInterface from "@/components/chat-interface"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function DiscussionPage({ params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    redirect("/sign-in")
  }

  const discussion = await getDiscussionById(params.id)

  if (!discussion) {
    redirect("/discussions")
  }

  return (
    <div className="container py-10">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/discussions">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{discussion.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{discussion.book}</span>
            {discussion.isPrivate && (
              <Badge variant="outline" className="ml-2">
                Private
              </Badge>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Invite Members</DropdownMenuItem>
            <DropdownMenuItem>Leave Discussion</DropdownMenuItem>
            {discussion.isCreator && (
              <DropdownMenuItem className="text-destructive">Delete Discussion</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue="chat">
            <TabsList className="mb-4">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="space-y-4">
              <ChatInterface discussionId={params.id} />
            </TabsContent>
            <TabsContent value="about">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">About this Discussion</h3>
                  <p className="text-muted-foreground mb-4">{discussion.description}</p>

                  <h4 className="font-medium mb-2">Created by</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={discussion.creator.image} alt={discussion.creator.name} />
                      <AvatarFallback>{discussion.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{discussion.creator.name}</span>
                  </div>

                  <h4 className="font-medium mb-2">Created on</h4>
                  <p className="text-muted-foreground mb-4">{discussion.createdAt}</p>

                  <h4 className="font-medium mb-2">Book Information</h4>
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={discussion.bookCover || "/placeholder.svg?height=120&width=80"}
                      alt={discussion.book}
                      className="h-24 w-16 object-cover rounded"
                    />
                    <div>
                      <h5 className="font-medium">{discussion.book}</h5>
                      <p className="text-sm text-muted-foreground">{discussion.bookAuthor}</p>
                      <p className="text-sm mt-2">{discussion.bookDescription}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Members</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{discussion.members.length}</span>
                </div>
              </div>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {discussion.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium leading-none">{member.name}</div>
                        {member.isCreator && <div className="text-xs text-muted-foreground">Creator</div>}
                      </div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-500" title="Online"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

