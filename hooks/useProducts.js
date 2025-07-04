import { useState, useEffect } from 'react'

// Hook to fetch all products
export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [industryProducts, setIndustryProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        const data = await response.json()
        
        if (data.success) {
          setProducts(data.products)
          setIndustryProducts(data.industryProducts)
        } else {
          setError(data.error || 'Failed to fetch products')
        }
      } catch (err) {
        setError('Failed to fetch products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, industryProducts, loading, error }
}

// Hook to fetch images
export const useImages = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/images')
        const data = await response.json()
        
        if (data.success) {
          setImages(data.images)
        } else {
          setError(data.error || 'Failed to fetch images')
        }
      } catch (err) {
        setError('Failed to fetch images')
        console.error('Error fetching images:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return { images, loading, error }
}

// Helper function to get image URL by ID
export const getImageUrl = (imageId, images) => {
  const image = images.find(img => img.id === imageId)
  return image ? `/uploads/${image.filename}` : null
} 