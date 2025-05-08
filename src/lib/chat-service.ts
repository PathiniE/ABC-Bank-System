"use client"

import { useState, useEffect } from "react"

// Types for chat functionality
export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  status: "sending" | "sent" | "error"
}

export interface ChatSession {
  messages: ChatMessage[]
  conversationId: string | null
}

// API request and response types
interface ChatRequest {
  user_input: string
  conversation_id: string | null
}

interface ChatResponse {
  response: string
  conversation_id: string | null
  confidence?: number
}

// Chat service functions
export const sendChatMessage = async (message: string, conversationId: string | null): Promise<ChatResponse> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_input: message,
        conversation_id: conversationId,
      } as ChatRequest),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error sending chat message:", error)
    throw error
  }
}

// Hook for managing chat state
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load conversation from localStorage on initial render
  useEffect(() => {
    const savedSession = localStorage.getItem("chatSession")
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession) as ChatSession
        setMessages(session.messages)
        setConversationId(session.conversationId)
      } catch (e) {
        console.error("Error loading chat session:", e)
      }
    }
  }, [])

  // Save conversation to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      const session: ChatSession = {
        messages,
        conversationId,
      }
      localStorage.setItem("chatSession", JSON.stringify(session))
    }
  }, [messages, conversationId])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // Create a new user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
      status: "sending",
    }

    // Add user message to state
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      // Send message to API
      const response = await sendChatMessage(content, conversationId)

      // Update user message status
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "sent" } : msg)))

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        role: "assistant",
        timestamp: new Date(),
        status: "sent",
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Update conversation ID if provided
      if (response.conversation_id) {
        setConversationId(response.conversation_id)
      }
    } catch (err) {
      setError("Failed to send message. Please try again.")

      // Update user message status to error
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "error" } : msg)))
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    setConversationId(null)
    localStorage.removeItem("chatSession")
  }

  return {
    messages,
    conversationId,
    isLoading,
    error,
    sendMessage,
    clearChat,
  }
}
