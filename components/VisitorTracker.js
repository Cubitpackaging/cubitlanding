'use client'

import { useEffect } from 'react'
import visitorTracker from '../utils/visitorTracking'

const VisitorTracker = () => {
  useEffect(() => {
    // Initialize visitor tracking when component mounts
    const initTracking = async () => {
      try {
        await visitorTracker.init()
      } catch (error) {
        console.error('Failed to initialize visitor tracking:', error)
      }
    }

    initTracking()

    // Track page navigation for SPA routing
    const handleRouteChange = () => {
      const currentPath = window.location.pathname + window.location.search
      visitorTracker.trackNavigation(currentPath)
    }

    // Listen for browser navigation events
    window.addEventListener('popstate', handleRouteChange)

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  // This component doesn't render anything visible
  return null
}

export default VisitorTracker