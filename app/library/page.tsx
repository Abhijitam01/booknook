import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getUserLibrary } from "@/lib/data"
import LibraryView from "@/components/library-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function LibraryPage() {
  const session = await auth()

  if (!session) {
    redirect("/sign-in")
  }

  const library = await getUserLibrary(session.user.id)

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Library</h1>
          <p className="text-muted-foreground">Manage and organize your book collection</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Books</TabsTrigger>
          <TabsTrigger value="fiction">Fiction</TabsTrigger>
          <TabsTrigger value="non-fiction">Non-Fiction</TabsTrigger>
          <TabsTrigger value="custom">Custom Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <LibraryView books={library.books} filter="all" />
        </TabsContent>
        <TabsContent value="fiction">
          <LibraryView books={library.books} filter="fiction" />
        </TabsContent>
        <TabsContent value="non-fiction">
          <LibraryView books={library.books} filter="non-fiction" />
        </TabsContent>
        <TabsContent value="custom">
          <LibraryView books={library.books} filter="custom" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

