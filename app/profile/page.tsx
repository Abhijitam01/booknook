import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getUserProfile } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, BookMarked, BookCheck, BookPlus } from "lucide-react"

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    redirect("/sign-in")
  }

  const profile = await getUserProfile(session.user.id)

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and view your reading stats</p>
        </div>
        <Button asChild>
          <a href="/settings">Edit Profile</a>
        </Button>
      </div>

      <div className="grid gap-8 mt-8 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
              <AvatarFallback className="text-2xl">{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{session.user?.name}</h3>
            <p className="text-sm text-muted-foreground">{session.user?.email}</p>
            <div className="mt-6 w-full">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Member since</span>
                <span>{profile.memberSince}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Reading goal</span>
                <span>{profile.readingGoal} books per year</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Favorite genre</span>
                <span>{profile.favoriteGenre}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Reading Statistics</CardTitle>
            <CardDescription>Track your reading progress and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-2xl font-bold">{profile.stats.totalBooks}</span>
                <span className="text-sm text-muted-foreground">Total Books</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <BookMarked className="h-8 w-8 text-pink-600 mb-2" />
                <span className="text-2xl font-bold">{profile.stats.currentlyReading}</span>
                <span className="text-sm text-muted-foreground">Currently Reading</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <BookCheck className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-2xl font-bold">{profile.stats.completed}</span>
                <span className="text-sm text-muted-foreground">Completed</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">Reading Progress</h3>
              <div className="w-full bg-muted rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full"
                  style={{ width: `${(profile.stats.completed / profile.readingGoal) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                {profile.stats.completed} of {profile.readingGoal} books read this year (
                {Math.round((profile.stats.completed / profile.readingGoal) * 100)}%)
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {profile.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="rounded-full bg-muted p-2 mt-1">
                      {activity.type === "added" ? <BookPlus className="h-4 w-4" /> : <BookCheck className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

