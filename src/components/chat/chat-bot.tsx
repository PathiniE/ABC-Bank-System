"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, MessageSquare, Send, X } from "lucide-react"
import { useChat } from "../../lib/chat-service"
import { ChatMessage } from "../chat/chat-message"
import { SuggestedQueries } from "../chat/suggested-queries"

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const currentSection = pathname.split("/").pop() || "dashboard"

  const { messages, isLoading, sendMessage, clearChat } = useChat()

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSuggestedQuery = (query: string) => {
    sendMessage(query) // Directly send the query instead of just setting input
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-lg flex flex-col h-[500px] max-h-[80vh]">
          <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Credit Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              {/* Only keep one button that serves to close the chat */}
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-7 w-7" title="Close chat">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-2">How can I help you today?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ask me anything about your credit score or financial health.
                </p>
                <SuggestedQueries onSelectQuery={handleSuggestedQuery} currentSection={currentSection} />
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Loader2 className="h-3 w-3 animate-spin mr-2" />
                      Thinking...
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="flex items-center w-full space-x-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} disabled={!input.trim() || isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Button onClick={toggleChat} size="icon" className="h-12 w-12 rounded-full shadow-lg">
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}