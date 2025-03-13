"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, List, ListOrdered, Quote, LinkIcon, Image } from "lucide-react"

export default function BlogEditor() {
  const [content, setContent] = useState("")

  const handleFormat = (format: string) => {
    // Simple formatting implementation
    // In a real app, this would be more sophisticated
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let formattedText = ""
    let cursorPosition = 0

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        cursorPosition = 2
        break
      case "italic":
        formattedText = `*${selectedText}*`
        cursorPosition = 1
        break
      case "list":
        formattedText = `\n- ${selectedText}`
        cursorPosition = 3
        break
      case "ordered-list":
        formattedText = `\n1. ${selectedText}`
        cursorPosition = 4
        break
      case "quote":
        formattedText = `\n> ${selectedText}`
        cursorPosition = 3
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        cursorPosition = selectedText.length + 3
        break
      case "image":
        formattedText = `![${selectedText}](url)`
        cursorPosition = selectedText.length + 4
        break
      default:
        break
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)

    setContent(newContent)

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + cursorPosition, start + selectedText.length + cursorPosition)
    }, 0)
  }

  return (
    <div className="border rounded-md">
      <div className="flex items-center gap-1 p-2 border-b bg-muted/50">
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("list")} title="Bullet List">
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("ordered-list")}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("quote")} title="Quote">
          <Quote className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("link")} title="Link">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("image")} title="Image">
          <Image className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your blog post content here. You can use Markdown formatting."
        className="min-h-[300px] border-0 rounded-none focus-visible:ring-0 resize-none"
      />
      <div className="p-2 border-t bg-muted/50 text-xs text-muted-foreground">
        Markdown supported. Use the toolbar for formatting or write Markdown directly.
      </div>
    </div>
  )
}

