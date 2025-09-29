'use client'

import { useEffect, useRef } from 'react'

// Lazy load visitor tracker to reduce initial bundle size
const loadVisitorTracker = () => import('../utils/visitorTracking').then(module => module.default)

const VisitorTracker = () => {
  const initRef = useRef(false)
  const trackerRef = useRef(null)

  useEffect(() => {
    // Prevent multiple initializations
    if (initRef.current) return
    initRef.current = true

    // Delay initialization to not block initial render
    const initTracking = async () => {
      try {
        // Lazy load the tracker
        const visitorTracker = await loadVisitorTracker()
        trackerRef.current = visitorTracker
        
        // Initialize with a small delay to improve perceived performance
        setTimeout(async () => {
          await visitorTracker.init()
        }, 1000)
      } catch (error) {
        console.error('Failed to initialize visitor tracking:', error)
      }
    }

    // Use requestIdleCallback if available for better performance
    if (typeof window !== 'undefined' && window.requestIdleCallback) {
      window.requestIdleCallback(initTracking)
    } else {
      setTimeout(initTracking, 100)
    }

    // Track page navigation for SPA routing (with debouncing)
    let navigationTimeout
    const handleRouteChange = () => {
      clearTimeout(navigationTimeout)
      navigationTimeout = setTimeout(() => {
        if (trackerRef.current) {
          const currentPath = window.location.pathname + window.location.search
          trackerRef.current.trackNavigation(currentPath)
        }
      }, 300) // Debounce navigation tracking
    }

    // Listen for browser navigation events
    window.addEventListener('popstate', handleRouteChange)

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      clearTimeout(navigationTimeout)
    }
  }, [])

  // This component doesn't render anything visible
  return null
}

export default VisitorTracker