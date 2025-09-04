'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { AuthService } from '../../../lib/auth'
import { createNotificationSound, playSimpleBeep } from '../../../public/notification-sound.js'

const AdminChatPage = () => {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const notificationSoundRef = useRef(null)
  const router = useRouter()

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load conversations on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      console.log('Chat: Checking auth status...')
      const { success, session } = await AuthService.getSession()
      console.log('Chat: Session check result:', { success, hasSession: !!session })
      
      if (!success || !session) {
        console.log('Chat: No valid session, redirecting to login')
        router.push('/admin')
        return
      }

      const isAdmin = await AuthService.isAdmin(session.user)
      console.log('Chat: Is admin check result:', isAdmin)
      
      if (!isAdmin) {
        console.log('Chat: User is not admin, redirecting to login')
        router.push('/admin')
        return
      }

      console.log('Chat: Auth successful, loading conversations')
      loadConversations()
      setupNotificationSubscription()
    } catch (error) {
      console.error('Chat: Auth check error:', error)
      router.push('/admin')
    }
  }

  // Initialize notification sound
  useEffect(() => {
    if (typeof window !== 'undefined') {
      notificationSoundRef.current = createNotificationSound()
    }
  }, [])

  // Setup real-time subscription for new visitor notifications
  const setupNotificationSubscription = () => {
    const channel = supabase
      .channel('admin_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_notifications',
          filter: 'type=eq.new_visitor'
        },
        (payload) => {
          console.log('New visitor notification:', payload.new)
          
          // Add notification to state
          setNotifications(prev => [payload.new, ...prev])
          
          // Play sound notification
          if (soundEnabled) {
            try {
              if (notificationSoundRef.current) {
                notificationSoundRef.current.playNotificationSound()
              } else {
                playSimpleBeep()
              }
            } catch (error) {
              console.warn('Could not play notification sound:', error)
            }
          }
          
          // Show browser notification if permission granted
          if (Notification.permission === 'granted') {
            new Notification('New Visitor!', {
              body: payload.new.message,
              icon: '/favicon.ico',
              tag: 'new-visitor'
            })
          }
          
          // Refresh conversations list
          loadConversations()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  // Request notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission()
      }
    }
  }, [])

  // Play notification sound manually (for testing)
  const playTestSound = () => {
    if (notificationSoundRef.current) {
      notificationSoundRef.current.playNotificationSound()
    } else {
      playSimpleBeep()
    }
  }

  // Load conversations list
  const loadConversations = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          visitor_id,
          status,
          created_at,
          updated_at,
          messages!inner(content, created_at)
        `)
        .order('updated_at', { ascending: false })

      if (error) throw error

      // Process conversations to get latest message preview
      const processedConversations = data.map(conv => {
        const latestMessage = conv.messages
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
        
        return {
          ...conv,
          latestMessage: latestMessage?.content || 'No messages',
          messageCount: conv.messages.length
        }
      })

      setConversations(processedConversations)
    } catch (error) {
      console.error('Error loading conversations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load messages for selected conversation
  const loadMessages = async (conversationId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  // Select conversation and load its messages
  const selectConversation = async (conversation) => {
    setSelectedConversation(conversation)
    await loadMessages(conversation.id)
    
    // Set up realtime subscription for this conversation
    setupRealtimeSubscription(conversation.id)
  }

  // Set up realtime subscription for selected conversation
  const setupRealtimeSubscription = (conversationId) => {
    // Remove existing subscription
    supabase.removeAllChannels()

    const channel = supabase
      .channel('admin_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new])
          // Refresh conversations list to update latest message
          loadConversations()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  // Send message as agent
  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation || isSending) return

    const messageContent = newMessage.trim()
    setNewMessage('')
    setIsSending(true)

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: selectedConversation.id,
          content: messageContent,
          role: 'agent'
        })

      if (error) throw error

      // Update conversation updated_at timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', selectedConversation.id)

    } catch (error) {
      console.error('Error sending message:', error)
      setNewMessage(messageContent) // Restore message on error
    } finally {
      setIsSending(false)
    }
  }

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(e)
    }
  }

  // Focus input when conversation is selected
  useEffect(() => {
    if (selectedConversation && inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedConversation])

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Close conversation
  const closeConversation = async (conversationId) => {
    try {
      await supabase
        .from('conversations')
        .update({ status: 'closed' })
        .eq('id', conversationId)
      
      // Refresh conversations list
      loadConversations()
      
      // If this was the selected conversation, clear selection
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null)
        setMessages([])
      }
    } catch (error) {
      console.error('Error closing conversation:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chat Management</h1>
              <p className="mt-2 text-gray-600">Manage customer conversations and provide support</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  soundEnabled 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
              </button>
              
              {/* Test Sound Button */}
              <button
                onClick={playTestSound}
                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                🔔 Test Sound
              </button>
              
              {/* Notifications Badge */}
              {notifications.length > 0 && (
                <div className="relative">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {notifications.length} new visitor{notifications.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Recent Notifications */}
          {notifications.length > 0 && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-blue-900">Recent Visitor Notifications</h3>
                <button
                  onClick={() => setNotifications([])}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {notifications.slice(0, 5).map((notification, index) => (
                  <div key={notification.id || index} className="text-sm text-blue-800">
                    <span className="font-medium">🆕 {notification.message}</span>
                    <span className="text-blue-600 ml-2">
                      {formatDate(notification.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
              <button
                onClick={loadConversations}
                className="mt-2 text-sm text-green-600 hover:text-green-700 focus:outline-none"
              >
                Refresh
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No conversations yet</div>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => selectConversation(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedConversation?.id === conversation.id ? 'bg-green-50 border-green-200' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {conversation.visitor_id.substring(0, 12)}...
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          conversation.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {conversation.status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(conversation.updated_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.latestMessage}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {conversation.messageCount} messages
                      </span>
                      {conversation.status === 'active' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            closeConversation(conversation.id)
                          }}
                          className="text-xs text-red-600 hover:text-red-700 focus:outline-none"
                        >
                          Close
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Conversation with {selectedConversation.visitor_id.substring(0, 12)}...
                  </h3>
                  <p className="text-sm text-gray-600">
                    Started {formatDate(selectedConversation.created_at)}
                  </p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === 'agent' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.role === 'agent'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.role === 'agent' ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your reply..."
                      disabled={isSending}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || isSending}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      {isSending ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
                  <p className="mt-1 text-sm text-gray-500">Choose a conversation from the list to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminChatPage