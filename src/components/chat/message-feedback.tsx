"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface MessageFeedbackProps {
  messageId: string
  onFeedback: (messageId: string, isPositive: boolean) => void
}

export function MessageFeedback({ messageId, onFeedback }: MessageFeedbackProps) {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null)

  const handleFeedback = (isPositive: boolean) => {
    const newFeedback = isPositive ? "positive" : "negative"
    setFeedback(newFeedback)
    onFeedback(messageId, isPositive)
  }

  return (
    <div className="flex items-center space-x-1 mt-1">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-6 w-6 rounded-full",
          feedback === "positive" && "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
        )}
        onClick={() => handleFeedback(true)}
      >
        <ThumbsUp className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-6 w-6 rounded-full",
          feedback === "negative" && "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
        )}
        onClick={() => handleFeedback(false)}
      >
        <ThumbsDown className="h-3 w-3" />
      </Button>
    </div>
  )
}
