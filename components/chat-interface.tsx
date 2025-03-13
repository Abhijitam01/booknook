"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Image, Smile, PaperclipIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { sendMessage, getMessages } from "@/lib/actions"

interface Message {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
    image: string
  }
}

export default function ChatInterface({ discussionId }: { discussionId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getMessages(discussionId)
        setMessages(fetchedMessages)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load messages",
          variant: "destructive",
        })
      }
    }

    fetchMessages()

    // In a real app, we would set up a WebSocket or polling here
    const interval = setInterval(() => {
      fetchMessages()
    }, 5000)

    return () => clearInterval(interval)
  }, [discussionId, toast])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !session?.user) return

    setLoading(true)
    try {
      await sendMessage({
        discussionId,
        content: newMessage,
      })

      // Optimistically add the message to the UI
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: newMessage,
          createdAt: new Date().toISOString(),
          user: {
            id: session.user.id,
            name: session.user.name || "User",
            image: session.user.image || "",
          },
        },
      ])

      setNewMessage("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {}
  messages.forEach((message) => {
    const date = formatDate(message.createdAt)
    if (!groupedMessages[date]) {
      groupedMessages[date] = []
    }
    groupedMessages[date].push(message)
  })

  return (
    <div className="flex flex-col h-[calc(80vh-200px)] border rounded-lg bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">{date}</div>
            </div>
            {dateMessages.map((message, index) => {
              const isCurrentUser = message.user.id === session?.user?.id
              const showAvatar = index === 0 || dateMessages[index - 1]?.user.id !== message.user.id

              return (
                <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} max-w-[80%] gap-2`}>
                    {showAvatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.user.image} alt={message.user.name} />
                        <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8" />
                    )}
                    <div>
                      {showAvatar && !isCurrentUser && (
                        <div className="text-sm font-medium mb-1">{message.user.name}</div>
                      )}
                      <div className="flex items-end gap-2">
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.content}
                        </div>
                        <div className="text-xs text-muted-foreground">{formatTime(message.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button type="button" size="icon" variant="ghost">
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Button type="button" size="icon" variant="ghost">
            <Image className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="button" size="icon" variant="ghost">
            <Smile className="h-5 w-5" />
          </Button>
          <Button type="submit" disabled={loading || !newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

