'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { AuthService } from '../../../lib/auth'
import { Eye, MessageCircle, Clock, Globe, Smartphone, Monitor, Tablet, Send, X, RefreshCw } from 'lucide-react'

const AdminVisitorsPage = () => {
  const [visitors, setVisitors] = useState([])
  const [selectedVisitor, setSelectedVisitor] = useState(null)
  const [visitorPageViews, setVisitorPageViews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPageViews, setIsLoadingPageViews] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [proactiveMessage, setProactiveMessage] = useState('')
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [filter, setFilter] = useState('all') // all, active, chat_users, non_chat_users
  const [refreshInterval, setRefreshInterval] = useState(null)
  const router = useRouter()

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { success, session } = await AuthService.getSession()
      
      if (!success || !session) {
        router.push('/admin')
        return
      }

      const isAdmin = await AuthService.isAdmin(session.user)
      if (!isAdmin) {
        router.push('/admin')
        return
      }

      // Load visitors after authentication
      await loadVisitors()
      
      // Set up auto-refresh every 30 seconds
      const interval = setInterval(loadVisitors, 30000)
      setRefreshInterval(interval)
      
    } catch (error) {
      router.push('/admin')
    }
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }
    }
  }, [refreshInterval])

  // Load visitors based on filter
  const loadVisitors = async () => {
    setIsLoading(true)
    try {
      let query = supabase.from('visitors').select('*')
      
      // Apply filters
      switch (filter) {
        case 'active':
          // Visitors active in last 30 minutes
          const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()
          query = query.gte('last_seen_at', thirtyMinutesAgo)
          break
        case 'chat_users':
          query = query.eq('is_chat_user', true)
          break
        case 'non_chat_users':
          query = query.eq('is_chat_user', false)
          break
        default:
          // All visitors
          break
      }
      
      const { data, error } = await query.order('last_seen_at', { ascending: false }).limit(100)
      
      if (error) throw error
      setVisitors(data || [])
    } catch (error) {
      // Error loading visitors
    } finally {
      setIsLoading(false)
    }
  }

  // Load page views for selected visitor
  const loadVisitorPageViews = async (visitorId) => {
    setIsLoadingPageViews(true)
    try {
      const { data, error } = await supabase.rpc('get_visitor_page_views', {
        visitor_id_param: visitorId
      })
      
      if (error) throw error
      setVisitorPageViews(data || [])
    } catch (error) {
      setVisitorPageViews([])
    } finally {
      setIsLoadingPageViews(false)
    }
  }

  // Handle visitor selection
  const handleVisitorSelect = (visitor) => {
    setSelectedVisitor(visitor)
    loadVisitorPageViews(visitor.visitor_id)
  }

  // Send proactive message to visitor
  const sendProactiveMessage = async () => {
    if (!selectedVisitor || !proactiveMessage.trim()) return
    
    setIsSendingMessage(true)
    try {
      // Check if visitor already has an active conversation
      const { data: existingConversations } = await supabase
        .from('conversations')
        .select('id')
        .eq('visitor_id', selectedVisitor.visitor_id)
        .eq('status', 'active')
        .limit(1)
      
      let conversationId
      
      if (existingConversations && existingConversations.length > 0) {
        // Use existing conversation
        conversationId = existingConversations[0].id
      } else {
        // Create new conversation
        const { data: newConversation, error: convError } = await supabase
          .from('conversations')
          .insert({
            visitor_id: selectedVisitor.visitor_id,
            status: 'active',
            metadata: {
              initiated_by: 'admin',
              proactive_message: true,
              timestamp: new Date().toISOString()
            }
          })
          .select('id')
          .single()
        
        if (convError) throw convError
        conversationId = newConversation.id
      }
      
      // Send the proactive message
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          content: proactiveMessage,
          role: 'agent'
        })
      
      if (messageError) throw messageError
      
      // Mark visitor as chat user
      await supabase
        .from('visitors')
        .update({ is_chat_user: true })
        .eq('visitor_id', selectedVisitor.visitor_id)
      
      // Create admin notification
      await supabase
        .from('admin_notifications')
        .insert({
          type: 'proactive_message_sent',
          conversation_id: conversationId,
          visitor_id: selectedVisitor.visitor_id,
          message: `Proactive message sent to visitor`,
          metadata: {
            message_content: proactiveMessage,
            timestamp: new Date().toISOString()
          }
        })
      
      // Reset form and close modal
      setProactiveMessage('')
      setShowMessageModal(false)
      
      // Refresh visitors list
      await loadVisitors()
      
      alert('Proactive message sent successfully!')
      
    } catch (error) {
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSendingMessage(false)
    }
  }

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInSeconds = Math.floor((now - time) / 1000)
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  // Format duration
  const formatDuration = (seconds) => {
    if (!seconds) return '0s'
    if (seconds < 60) return `${seconds}s`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
  }

  // Get device icon
  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="h-4 w-4" />
      case 'tablet': return <Tablet className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  // Filter change handler
  useEffect(() => {
    loadVisitors()
  }, [filter])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Website Visitors</h1>
              <p className="text-gray-600">Monitor and engage with website visitors</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={loadVisitors}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visitors List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {/* Filter Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {[
                    { key: 'all', label: 'All Visitors', count: visitors.length },
                    { key: 'active', label: 'Active (30m)', count: visitors.filter(v => {
                      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
                      return new Date(v.last_seen_at) > thirtyMinutesAgo
                    }).length },
                    { key: 'chat_users', label: 'Chat Users', count: visitors.filter(v => v.is_chat_user).length },
                    { key: 'non_chat_users', label: 'Non-Chat', count: visitors.filter(v => !v.is_chat_user).length }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setFilter(tab.key)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        filter === tab.key
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </nav>
              </div>

              {/* Visitors List */}
              <div className="divide-y divide-gray-200">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-500">Loading visitors...</p>
                  </div>
                ) : visitors.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No visitors found for the selected filter.
                  </div>
                ) : (
                  visitors.map((visitor) => {
                    const isActive = new Date(visitor.last_seen_at) > new Date(Date.now() - 30 * 60 * 1000)
                    
                    return (
                      <div
                        key={visitor.visitor_id}
                        onClick={() => handleVisitorSelect(visitor)}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${
                          selectedVisitor?.visitor_id === visitor.visitor_id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {getDeviceIcon(visitor.device_type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {visitor.visitor_id.split('_')[1] || 'Unknown'}
                                </p>
                                {isActive && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                  </span>
                                )}
                                {visitor.is_chat_user && (
                                  <MessageCircle className="h-4 w-4 text-blue-500" />
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-1">
                                <p className="text-xs text-gray-500">
                                  {visitor.browser} • {visitor.os}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {visitor.total_page_views} pages • {visitor.total_sessions} sessions
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-xs text-gray-500">
                              {formatTimeAgo(visitor.last_seen_at)}
                            </p>
                            {!visitor.is_chat_user && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedVisitor(visitor)
                                  setShowMessageModal(true)
                                }}
                                className="mt-1 text-xs text-blue-600 hover:text-blue-800"
                              >
                                Send Message
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>

          {/* Visitor Details */}
          <div className="lg:col-span-1">
            {selectedVisitor ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Visitor Details</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Visitor ID</label>
                    <p className="text-sm text-gray-900">{selectedVisitor.visitor_id}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">First Visit</label>
                    <p className="text-sm text-gray-900">{new Date(selectedVisitor.first_seen_at).toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Seen</label>
                    <p className="text-sm text-gray-900">{new Date(selectedVisitor.last_seen_at).toLocaleString()}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Sessions</label>
                      <p className="text-sm text-gray-900">{selectedVisitor.total_sessions}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Page Views</label>
                      <p className="text-sm text-gray-900">{selectedVisitor.total_page_views}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Device & Browser</label>
                    <p className="text-sm text-gray-900">{selectedVisitor.device_type} • {selectedVisitor.browser} • {selectedVisitor.os}</p>
                  </div>
                  
                  {selectedVisitor.referrer && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Referrer</label>
                      <p className="text-sm text-gray-900 break-all">{selectedVisitor.referrer}</p>
                    </div>
                  )}
                  
                  {(selectedVisitor.utm_source || selectedVisitor.utm_medium || selectedVisitor.utm_campaign) && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">UTM Parameters</label>
                      <div className="text-sm text-gray-900">
                        {selectedVisitor.utm_source && <p>Source: {selectedVisitor.utm_source}</p>}
                        {selectedVisitor.utm_medium && <p>Medium: {selectedVisitor.utm_medium}</p>}
                        {selectedVisitor.utm_campaign && <p>Campaign: {selectedVisitor.utm_campaign}</p>}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-gray-500">Page Views</label>
                      {isLoadingPageViews && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      )}
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {visitorPageViews.map((pageView, index) => (
                        <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                          <p className="font-medium">{pageView.page_title || pageView.page_url}</p>
                          <p className="text-gray-500">{pageView.page_url}</p>
                          <div className="flex justify-between mt-1">
                            <span>{new Date(pageView.viewed_at).toLocaleString()}</span>
                            {pageView.time_on_page && (
                              <span>{formatDuration(pageView.time_on_page)}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {!selectedVisitor.is_chat_user && (
                    <div className="pt-4 border-t">
                      <button
                        onClick={() => setShowMessageModal(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4" />
                        Send Proactive Message
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a visitor to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Proactive Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-medium">Send Proactive Message</h3>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Send a message to {selectedVisitor?.visitor_id} to start a conversation.
              </p>
              <textarea
                value={proactiveMessage}
                onChange={(e) => setProactiveMessage(e.target.value)}
                placeholder="Hi! I noticed you're browsing our website. Is there anything I can help you with?"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={sendProactiveMessage}
                disabled={!proactiveMessage.trim() || isSendingMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isSendingMessage ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminVisitorsPage