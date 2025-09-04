'use client'
import { useState, useEffect, useRef } from 'react'

// Enhanced cache with better management
class DataCache {
  constructor(duration = 10 * 60 * 1000) { // 10 minutes default
    this.cache = new Map()
    this.duration = duration
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() - item.timestamp > this.duration) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  clear() {
    this.cache.clear()
  }
}

const dataCache = new DataCache()

// Prevent multiple simultaneous requests
const pendingRequests = new Map()

const fetchWithCache = async (url, cacheKey) => {
  // Check cache first
  const cached = dataCache.get(cacheKey)
  if (cached) {
    return cached
  }

  // Check if request is already pending
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey)
  }

  // Make new request
  const requestPromise = fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${cacheKey}`)
      }
      return response.json()
    })
    .then(data => {
      dataCache.set(cacheKey, data)
      pendingRequests.delete(cacheKey)
      return data
    })
    .catch(error => {
      pendingRequests.delete(cacheKey)
      throw error
    })

  pendingRequests.set(cacheKey, requestPromise)
  return requestPromise
}

// Hook to fetch all products
export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await fetchWithCache('/api/products', 'products')
        
        if (isMounted.current) {
          // Return the full data object so components can access both products and industryProducts
          setProducts(data || {})
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        if (isMounted.current) {
          setError(err.message)
        }
      } finally {
        if (isMounted.current) {
          setLoading(false)
        }
      }
    }

    fetchProducts()
    
    return () => {
      isMounted.current = false
    }
  }, [])

  return { products, loading, error }
}

// Hook to fetch images
export const useImages = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    
    const fetchImages = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await fetchWithCache('/api/images', 'images')
        
        if (isMounted.current) {
          setImages(data.images || [])
        }
      } catch (err) {
        console.error('Error fetching images:', err)
        if (isMounted.current) {
          setError(err.message)
        }
      } finally {
        if (isMounted.current) {
          setLoading(false)
        }
      }
    }

    fetchImages()
    
    return () => {
      isMounted.current = false
    }
  }, [])

  return { images, loading, error }
}

// Helper function to get image URL by ID
export const getImageUrl = (imageId, images) => {
  const image = images.find(img => img.id === imageId)
  return image ? `/uploads/${image.filename}` : null
}