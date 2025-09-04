'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { X, Send, Bot } from 'lucide-react'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [conversationId, setConversationId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [visitorId, setVisitorId] = useState(null)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Generate or retrieve visitor ID from localStorage
  useEffect(() => {
    let storedVisitorId = localStorage.getItem('chat_visitor_id')
    if (!storedVisitorId) {
      storedVisitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('chat_visitor_id', storedVisitorId)
    }
    setVisitorId(storedVisitorId)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load or create conversation when visitor ID is available
  useEffect(() => {
    if (!visitorId) return

    const loadOrCreateConversation = async () => {
      setIsLoading(true)
      try {
        // Check for existing conversation
        const { data: existingConversations, error: fetchError } = await supabase
          .from('conversations')
          .select('id')
          .eq('visitor_id', visitorId)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)

        if (fetchError) throw fetchError

        let convId
        if (existingConversations && existingConversations.length > 0) {
          convId = existingConversations[0].id
        } else {
          // Create new conversation
          const { data: newConversation, error: createError } = await supabase
            .from('conversations')
            .insert({ 
              visitor_id: visitorId,
              metadata: {
                user_agent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                page_url: window.location.href,
                is_new_visitor: true
              }
            })
            .select('id')
            .single()

          if (createError) throw createError
          convId = newConversation.id

          // Send welcome message from agent
          await supabase
            .from('messages')
            .insert({
              conversation_id: convId,
              content: 'Hi there! 👋 Welcome to Cubit. How can we help you today?',
              role: 'agent'
            })

          // Trigger new visitor notification
          await supabase
            .from('admin_notifications')
            .insert({
              type: 'new_visitor',
              conversation_id: convId,
              visitor_id: visitorId,
              message: `New visitor started a conversation`,
              metadata: {
                page_url: window.location.href,
                timestamp: new Date().toISOString()
              }
            })
        }

        setConversationId(convId)
        await loadMessages(convId)
      } catch (error) {
        console.error('Error loading conversation:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrCreateConversation()
  }, [visitorId])

  // Load messages for conversation
  const loadMessages = async (convId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  // Set up realtime subscription for new messages
  useEffect(() => {
    if (!conversationId) return

    const channel = supabase
      .channel('visitor_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          // Only add message if it's not from this visitor (to avoid duplicates)
          if (payload.new.role === 'agent') {
            setMessages(prev => [...prev, payload.new])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId])

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !conversationId || isLoading) return

    const messageContent = newMessage.trim()
    setNewMessage('')
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          content: messageContent,
          role: 'visitor'
        })

      if (error) throw error
    } catch (error) {
      console.error('Error sending message:', error)
      setNewMessage(messageContent) // Restore message on error
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(e)
    }
  }

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Check if footer is visible
  useEffect(() => {
    const checkFooterVisibility = () => {
      const footer = document.querySelector('footer')
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        const windowHeight = window.innerHeight
        setIsFooterVisible(footerRect.top < windowHeight)
      }
    }

    checkFooterVisibility()
    window.addEventListener('scroll', checkFooterVisibility)
    window.addEventListener('resize', checkFooterVisibility)

    return () => {
      window.removeEventListener('scroll', checkFooterVisibility)
      window.removeEventListener('resize', checkFooterVisibility)
    }
  }, [])

  return (
    <div className={`fixed right-5 z-50 transition-all duration-300 ${isFooterVisible ? 'bottom-20' : 'bottom-5'}`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-[calc(100%+16px)] right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-lg border border-border flex flex-col overflow-hidden transition-all duration-300 ease-out">
          {/* Header */}
          <div className="bg-primary p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
               <Bot className="h-5 w-5 text-primary-foreground" />
               <h3 className="font-medium text-primary-foreground">Chat with Cubit</h3>
             </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary/80 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
            {isLoading && messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-2 w-16 bg-muted rounded mb-2"></div>
                  <div className="h-2 w-24 bg-muted rounded"></div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'visitor' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                      message.role === 'visitor'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 border-t border-border bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 h-10 px-3 py-2 bg-white border border-input rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || isLoading}
                className="h-10 w-10 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative hover:scale-105"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
           <X className="h-6 w-6" />
         ) : (
           <>
             <svg
               className="w-6 h-6"
               viewBox="0 0 256 256"
               fill="currentColor"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path d="M51.8,28.2c-20.8,2-38.5,18.9-41.4,39.5C10,70.3,9.9,81.7,10,104.5c0.2,32.4,0.2,33,1.2,36.7c2.7,9.7,8.7,18.7,16.6,24.9c8,6.4,15.8,9.3,27.3,10.1l4.1,0.3v1.5c0,2.4,1.8,11.5,3.1,16.2c1.6,5.6,4.7,12.5,7.6,16.8c6,9,14.1,14.1,25.9,16.4c3.4,0.7,7.9,0.9,7.9,0.5c0-0.1-1.4-3-3-6.5c-7.6-15.7-8.1-26.5-2.1-41l1.6-3.8l52.6-0.3c57.9-0.3,55.1-0.1,63.2-3.3c13.4-5.2,24.6-17.7,28.6-32c1-3.7,1.1-4.3,1.2-37.1c0.2-36.7,0.1-37.9-2.7-45.7c-3.8-10.4-13.1-20.7-23.5-25.8c-5.1-2.5-9.9-3.8-15.9-4.5C198.5,27.6,57.6,27.6,51.8,28.2z"/>
             </svg>
             {/* Notification dot */}
             <span className="absolute top-2 right-2 w-3 h-3 bg-destructive rounded-full animate-pulse"></span>
           </>
         )}
      </button>
    </div>
  )
}

export default ChatWidget