import { cn } from "@/lib/utils"
import type { ChatMessage as ChatMessageType } from "../../lib/chat-service"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import { MessageFeedback } from "../chat/message-feedback"

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    // In a real app, you would send this feedback to your backend
    console.log(`Feedback for message ${messageId}: ${isPositive ? "positive" : "negative"}`)
  }

  // Format timestamp safely
  const formatTime = (timestamp: Date | string) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "";
    }
  };

  return (
    <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
        <div className="flex flex-col">
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
          <div className="flex items-center justify-between mt-1 text-xs opacity-70">
            {!isUser && <MessageFeedback messageId={message.id} onFeedback={handleFeedback} />}
            <div className="flex items-center ml-auto">
              {message.status === "sending" && <Clock className="h-3 w-3 mr-1" />}
              {message.status === "sent" && <CheckCircle className="h-3 w-3 mr-1" />}
              {message.status === "error" && <AlertCircle className="h-3 w-3 mr-1" />}
              <span>{formatTime(message.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}