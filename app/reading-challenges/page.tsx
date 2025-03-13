import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Calendar, Plus } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default async function ReadingChallengesPage() {
  const session = await auth()

  if (!session) {
    redirect("/sign-in")
  }

  const activeChallenges = [
    {
      id: "1",
      title: "2023 Reading Goal",
      description: "Read 24 books in 2023",
      progress: 18,
      total: 24,
      type: "personal",
      deadline: "December 31, 2023",
    },
    {
      id: "2",
      title: "Science Fiction Challenge",
      description: "Read 5 classic sci-fi novels",
      progress: 2,
      total: 5,
      type: "group",
      participants: 12,
      deadline: "November 30, 2023",
    },
    {
      id: "3",
      title: "Summer Reading Sprint",
      description: "Read 3 books during summer",
      progress: 3,
      total: 3,
      type: "personal",
      completed: true,
      deadline: "September 1, 2023",
    },
  ]

  const availableChallenges = [
    {
      id: "4",
      title: "Diverse Authors Challenge",
      description: "Read books by authors from 5 different countries",
      participants: 34,
      deadline: "December 31, 2023",
    },
    {
      id: "5",
      title: "Classics Club",
      description: "Read 10 classic novels published before 1950",
      participants: 28,
      deadline: "Ongoing",
    },
    {
      id: "6",
      title: "Genre Explorer",
      description: "Read one book from each of 8 different genres",
      participants: 42,
      deadline: "December 31, 2023",
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reading Challenges</h1>
          <p className="text-muted-foreground">Set goals, join community challenges, and track your reading progress</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Challenge
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a Reading Challenge</DialogTitle>
              <DialogDescription>Set a new reading goal for yourself or create a group challenge</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="challenge-title">Challenge Title</Label>
                <Input id="challenge-title" placeholder="Enter a title for your challenge" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="challenge-description">Description</Label>
                <Input id="challenge-description" placeholder="Describe your reading challenge" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="challenge-type">Challenge Type</Label>
                <Select defaultValue="personal">
                  <SelectTrigger id="challenge-type">
                    <SelectValue placeholder="Select challenge type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Challenge</SelectItem>
                    <SelectItem value="group">Group Challenge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="book-count">Number of Books</Label>
                  <Input id="book-count" type="number" min="1" defaultValue="12" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Challenge</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Your Active Challenges</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeChallenges.map((challenge) => (
            <Card key={challenge.id} className={challenge.completed ? "border-green-500" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{challenge.title}</CardTitle>
                  {challenge.type === "group" && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{challenge.participants}</span>
                    </div>
                  )}
                </div>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {challenge.progress} of {challenge.total} books
                      </span>
                    </div>
                    <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Deadline: {challenge.deadline}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {challenge.completed ? (
                  <div className="flex items-center text-green-600 font-medium">
                    <Trophy className="mr-2 h-5 w-5" />
                    Challenge Completed!
                  </div>
                ) : (
                  <Button variant="outline" className="w-full">
                    Update Progress
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Join a Challenge</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableChallenges.map((challenge) => (
            <Card key={challenge.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{challenge.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    <span>{challenge.participants}</span>
                  </div>
                </div>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Deadline: {challenge.deadline}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Challenge</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

