'use client'

import { supabase } from '../lib/supabase'

class VisitorTracker {
  constructor() {
    this.visitorId = null
    this.sessionId = null
    this.sessionStartTime = null
    this.currentPageStartTime = null
    this.isInitialized = false
    this.heartbeatInterval = null
    this.pageUnloadHandlerAdded = false
  }

  // Initialize visitor tracking
  async init() {
    if (this.isInitialized || typeof window === 'undefined') return
    
    try {
      // Generate or retrieve visitor ID
      this.visitorId = this.getOrCreateVisitorId()
      
      // Generate session ID
      this.sessionId = this.generateSessionId()
      this.sessionStartTime = new Date()
      this.currentPageStartTime = new Date()
      
      // Create or update visitor record
      await this.createOrUpdateVisitor()
      
      // Create session record
      await this.createSession()
      
      // Track initial page view
      await this.trackPageView()
      
      // Set up page unload tracking
      this.setupPageUnloadTracking()
      
      // Set up heartbeat to keep session active
      this.startHeartbeat()
      
      this.isInitialized = true
      // Visitor tracking initialized
    } catch (error) {
      // Error initializing visitor tracking
    }
  }

  // Generate or retrieve visitor ID from localStorage
  getOrCreateVisitorId() {
    let visitorId = localStorage.getItem('visitor_tracking_id')
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('visitor_tracking_id', visitorId)
    }
    return visitorId
  }

  // Generate unique session ID
  generateSessionId() {
    // Check if we already have a session ID in sessionStorage
    const existingSessionId = sessionStorage.getItem('visitor_session_id')
    if (existingSessionId) {
      return existingSessionId
    }
    
    // Generate new session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('visitor_session_id', newSessionId)
    return newSessionId
  }

  // Get visitor information from browser
  getVisitorInfo() {
    const userAgent = navigator.userAgent
    const referrer = document.referrer || null
    
    // Parse URL parameters for UTM tracking
    const urlParams = new URLSearchParams(window.location.search)
    const utmSource = urlParams.get('utm_source')
    const utmMedium = urlParams.get('utm_medium')
    const utmCampaign = urlParams.get('utm_campaign')
    
    // Detect device type
    const deviceType = this.detectDeviceType(userAgent)
    const browser = this.detectBrowser(userAgent)
    const os = this.detectOS(userAgent)
    
    return {
      userAgent,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      deviceType,
      browser,
      os
    }
  }

  // Detect device type from user agent
  detectDeviceType(userAgent) {
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet'
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile'
    }
    return 'desktop'
  }

  // Detect browser from user agent
  detectBrowser(userAgent) {
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    if (userAgent.includes('Opera')) return 'Opera'
    return 'Unknown'
  }

  // Detect OS from user agent
  detectOS(userAgent) {
    if (userAgent.includes('Windows')) return 'Windows'
    if (userAgent.includes('Mac')) return 'macOS'
    if (userAgent.includes('Linux')) return 'Linux'
    if (userAgent.includes('Android')) return 'Android'
    if (userAgent.includes('iOS')) return 'iOS'
    return 'Unknown'
  }

  // Create or update visitor record
  async createOrUpdateVisitor() {
    const visitorInfo = this.getVisitorInfo()
    
    try {
      // Check if visitor exists
      const { data: existingVisitor } = await supabase
        .from('visitors')
        .select('id, total_sessions')
        .eq('visitor_id', this.visitorId)
        .single()
      
      if (existingVisitor) {
        // Update existing visitor
        await supabase
          .from('visitors')
          .update({
            last_seen_at: new Date().toISOString(),
            total_sessions: existingVisitor.total_sessions + 1,
            updated_at: new Date().toISOString()
          })
          .eq('visitor_id', this.visitorId)
      } else {
        // Create new visitor
        await supabase
          .from('visitors')
          .insert({
            visitor_id: this.visitorId,
            first_seen_at: new Date().toISOString(),
            last_seen_at: new Date().toISOString(),
            total_sessions: 1,
            total_page_views: 0,
            user_agent: visitorInfo.userAgent,
            referrer: visitorInfo.referrer,
            utm_source: visitorInfo.utmSource,
            utm_medium: visitorInfo.utmMedium,
            utm_campaign: visitorInfo.utmCampaign,
            device_type: visitorInfo.deviceType,
            browser: visitorInfo.browser,
            os: visitorInfo.os,
            is_chat_user: false
          })
      }
    } catch (error) {
      // Error creating/updating visitor
    }
  }

  // Create session record
  async createSession() {
    try {
      // Check if there's already an active session for this visitor
      const { data: existingSessions } = await supabase
        .from('visitor_sessions')
        .select('session_id')
        .eq('visitor_id', this.visitorId)
        .eq('is_active', true)
        .order('started_at', { ascending: false })
        .limit(1)

      if (existingSessions && existingSessions.length > 0) {
        // Reuse existing session
        this.sessionId = existingSessions[0].session_id
        // Reusing existing session
        return
      }

      // Create new session
      await supabase
        .from('visitor_sessions')
        .insert({
          visitor_id: this.visitorId,
          session_id: this.sessionId,
          started_at: this.sessionStartTime.toISOString(),
          entry_page: window.location.pathname + window.location.search,
          is_active: true
        })
    } catch (error) {
      // Error creating session
    }
  }

  // Track page view
  async trackPageView(previousPage = null) {
    if (!this.isInitialized) return
    
    try {
      // If there was a previous page, update its time_on_page
      if (previousPage && this.currentPageStartTime) {
        const timeOnPage = Math.floor((new Date() - this.currentPageStartTime) / 1000)
        await this.updatePageTimeOnPage(previousPage, timeOnPage)
      }
      
      // Track new page view
      await supabase
        .from('page_views')
        .insert({
          visitor_id: this.visitorId,
          session_id: this.sessionId,
          page_url: window.location.pathname + window.location.search,
          page_title: document.title,
          viewed_at: new Date().toISOString(),
          referrer: document.referrer || null
        })
      
      // Update current page start time
      this.currentPageStartTime = new Date()
      
      // Update visitor total page views
      await this.incrementVisitorPageViews()
      
    } catch (error) {
      // Error tracking page view
    }
  }

  // Update time spent on previous page
  async updatePageTimeOnPage(pageUrl, timeOnPage) {
    try {
      await supabase
        .from('page_views')
        .update({ time_on_page: timeOnPage })
        .eq('visitor_id', this.visitorId)
        .eq('session_id', this.sessionId)
        .eq('page_url', pageUrl)
        .order('viewed_at', { ascending: false })
        .limit(1)
    } catch (error) {
      // Error updating page time
    }
  }

  // Increment visitor page views count
  async incrementVisitorPageViews() {
    try {
      await supabase.rpc('increment_visitor_page_views', {
        visitor_id_param: this.visitorId
      })
    } catch (error) {
      // If RPC doesn't exist, fall back to manual update
      try {
        const { data: visitor } = await supabase
          .from('visitors')
          .select('total_page_views')
          .eq('visitor_id', this.visitorId)
          .single()
        
        if (visitor) {
          await supabase
            .from('visitors')
            .update({ total_page_views: visitor.total_page_views + 1 })
            .eq('visitor_id', this.visitorId)
        }
      } catch (fallbackError) {
        // Error incrementing page views
      }
    }
  }

  // Track page navigation (for SPA)
  async trackNavigation(newPath) {
    if (!this.isInitialized) return
    
    const previousPage = window.location.pathname + window.location.search
    
    // Update browser history state
    window.history.pushState({}, '', newPath)
    
    // Track the new page view
    await this.trackPageView(previousPage)
  }

  // Set up page unload tracking
  setupPageUnloadTracking() {
    if (this.pageUnloadHandlerAdded) return
    
    const handlePageUnload = async () => {
      await this.endSession()
    }
    
    // Use beforeunload for better compatibility
    window.addEventListener('beforeunload', handlePageUnload)
    
    // Also use visibilitychange for mobile browsers
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.endSession()
      }
    })
    
    this.pageUnloadHandlerAdded = true
  }

  // Start heartbeat to keep session active
  startHeartbeat() {
    // Send heartbeat every 30 seconds
    this.heartbeatInterval = setInterval(async () => {
      await this.sendHeartbeat()
    }, 30000)
  }

  // Send heartbeat to update session
  async sendHeartbeat() {
    if (!this.isInitialized) return
    
    try {
      const now = new Date()
      const duration = Math.floor((now - this.sessionStartTime) / 1000)
      
      await supabase
        .from('visitor_sessions')
        .update({
          duration_seconds: duration,
          updated_at: now.toISOString()
        })
        .eq('session_id', this.sessionId)
    } catch (error) {
      // Error sending heartbeat
    }
  }

  // End current session
  async endSession() {
    if (!this.isInitialized) return
    
    try {
      const now = new Date()
      const duration = Math.floor((now - this.sessionStartTime) / 1000)
      const currentPage = window.location.pathname + window.location.search
      const timeOnPage = Math.floor((now - this.currentPageStartTime) / 1000)
      
      // Update final page time
      await this.updatePageTimeOnPage(currentPage, timeOnPage)
      
      // End session
      await supabase
        .from('visitor_sessions')
        .update({
          ended_at: now.toISOString(),
          duration_seconds: duration,
          exit_page: currentPage,
          is_active: false
        })
        .eq('session_id', this.sessionId)
      
      // Clear heartbeat
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval)
      }
      
      // Clear session storage
      sessionStorage.removeItem('visitor_session_id')
      
    } catch (error) {
      // Error ending session
    }
  }

  // Mark visitor as chat user
  async markAsChatUser() {
    try {
      await supabase
        .from('visitors')
        .update({ is_chat_user: true })
        .eq('visitor_id', this.visitorId)
    } catch (error) {
      // Error marking as chat user
    }
  }

  // Get current visitor ID
  getVisitorId() {
    return this.visitorId
  }

  // Get current session ID
  getSessionId() {
    return this.sessionId
  }
}

// Create singleton instance
const visitorTracker = new VisitorTracker()

// Auto-initialization disabled - LiveChat is now handling visitor tracking
// if (typeof window !== 'undefined') {
//   // Wait for DOM to be ready
//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', () => {
//       visitorTracker.init()
//     })
//   } else {
//     visitorTracker.init()
//   }
// }

export default visitorTracker
export { VisitorTracker }