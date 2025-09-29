'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getOptimizedImageUrl, getResponsiveSizes, preloadImages } from '../utils/imageOptimization'

const DataContext = createContext()

export function DataProvider({ children, initialProducts = [], initialIndustryProducts = [], initialImages = [] }) {
  const [products, setProducts] = useState(initialProducts)
  const [industryProducts, setIndustryProducts] = useState(initialIndustryProducts)
  const [images, setImages] = useState(initialImages)
  const [loading, setLoading] = useState(!initialProducts.length && !initialImages.length)
  const [error, setError] = useState(null)

  // Only fetch data if we don't have initial data (fallback for client-side)
  useEffect(() => {
    if (!initialProducts.length || !initialIndustryProducts.length || !initialImages.length) {
      fetchData()
    } else if (initialImages.length) {
      // Preload critical images for better performance
      const criticalImages = initialImages
        .slice(0, 6) // First 6 images are likely above the fold
        .map(img => getOptimizedImageUrl(img.filename, 'showcase'))
        .filter(Boolean)
      
      if (criticalImages.length > 0) {
        preloadImages(criticalImages)
      }
    }
  }, [initialProducts.length, initialIndustryProducts.length, initialImages.length])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [productsResponse, imagesResponse] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/images')
      ])

      if (!productsResponse.ok || !imagesResponse.ok) {
        throw new Error('Failed to fetch data')
      }

      const [productsData, imagesData] = await Promise.all([
        productsResponse.json(),
        imagesResponse.json()
      ])

      setProducts(productsData.products || [])
      setIndustryProducts(productsData.industryProducts || [])
      setImages(imagesData.images || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    products,
    industryProducts,
    images,
    loading,
    error,
    refetch: fetchData
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

// Individual hooks for backward compatibility
export function useProducts() {
  const { products, loading, error } = useData()
  return { products, loading, error }
}

export function useIndustryProducts() {
  const { industryProducts, loading, error } = useData()
  return { industryProducts, loading, error }
}

export function useImages() {
  const { images, loading, error } = useData()
  return { images, loading, error }
}

export function getImageUrl(imageId, size = 'card') {
  return getOptimizedImageUrl(imageId, size)
}

export function useImageUrl() {
  const { images, loading } = useData()
  
  return (imageId, size = 'card') => {
    // Only pass images array if it's loaded and not empty
    const imagesArray = (!loading && images && images.length > 0) ? images : []
    return getOptimizedImageUrl(imageId, size, 'webp', imagesArray)
  }
}