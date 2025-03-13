"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { addComment } from "@/lib/actions"

export default function BlogCommentForm({ postId }: { postId: string }) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim()) return
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to comment on blog posts",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await addComment({
        postId,
        content: comment,
      })

      setComment("")
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session) {
    return (
      <div className="bg-muted p-4 rounded-lg text-center">
        <p className="text-sm text-muted-foreground mb-2">Please sign in to leave a comment</p>
        <Button variant="outline" size="sm" asChild>
          <a href="/sign-in">Sign In</a>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Share your thoughts on this post..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px] resize-none"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !comment.trim()}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  )
}

