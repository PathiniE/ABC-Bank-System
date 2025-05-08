"use client"

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  status: 'sending' | 'sent' | 'error'
  timestamp: Date
}

interface ChatHook {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  sendMessage: (content: string) => Promise<void>
  clearChat: () => void
}

export function useChat(): ChatHook {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // API endpoint - update this to your Docker container URL
  const API_URL = 'http://localhost:8000/chat'

  const sendMessage = async (content: string) => {
    // Don't proceed if empty message or already loading
    if (!content.trim() || isLoading) return
    
    // Create a new user message
    const userMessageId = uuidv4()
    const userMessage: ChatMessage = {
      id: userMessageId,
      content: content,
      role: 'user',
      status: 'sent',
      timestamp: new Date()
    }
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage])
    
    // Create placeholder for assistant response
    const assistantMessageId = uuidv4()
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      content: '',
      role: 'assistant',
      status: 'sending',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, assistantMessage])
    setIsLoading(true)
    setError(null)
    
    try {
      // Call your API with message and conversation history
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get response from chatbot')
      }
      
      const data = await response.json()
      
      // Update assistant message with response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessageId
            ? { ...msg, content: data.response, status: 'sent' }
            : msg
        )
      )
    } catch (err) {
      console.error('Error sending message:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      
      // Update assistant message to show error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessageId
            ? { ...msg, content: 'Sorry, I encountered an error. Please try again.', status: 'error' }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
  }

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  }
}