/**
 * Image optimization utilities for better performance
 */

// Image size configurations for different use cases
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  card: { width: 300, height: 200 },
  showcase: { width: 600, height: 400 },
  hero: { width: 1200, height: 800 },
  modal: { width: 800, height: 600 }
}

// Responsive image sizes for Next.js Image component
export const RESPONSIVE_SIZES = {
  thumbnail: '150px',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px',
  showcase: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px',
  hero: '100vw',
  modal: '(max-width: 768px) 100vw, 800px'
}

/**
 * Get optimized image URL with WebP support
 * @param {string} imageId - The image identifier
 * @param {string} size - Size category (thumbnail, card, showcase, hero, modal)
 * @param {string} format - Image format preference (webp, jpg, png)
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (imageId, size = 'card', format = 'webp', images = []) => {
  if (!imageId) {
    console.warn('getOptimizedImageUrl: No imageId provided')
    return null
  }

  console.log(`getOptimizedImageUrl called with:`, { imageId, size, format, imagesCount: images?.length || 0 })
  
  // For local images in uploads folder - if imageId already contains a file extension
  if (imageId.includes('.')) {
    const basePath = `/uploads/${imageId}`
    return basePath
  }
  
  // Look up the filename from images data
  if (Array.isArray(images) && images.length > 0) {
    const imageData = images.find(img => img.id === imageId)
    if (imageData && imageData.filename) {
      console.log(`✓ Found image data for ${imageId}:`, imageData.filename)
      return `/uploads/${imageData.filename}`
    } else {
      console.warn(`✗ Image not found in images array for imageId: ${imageId}`)
      console.log('Available image IDs:', images.map(img => img.id))
    }
  } else {
    console.warn('getOptimizedImageUrl: Images array is empty or not provided')
  }
  
  // Fallback: treat imageId as filename
  console.log(`Using imageId as filename: ${imageId}`)
  return `/uploads/${imageId}`
}

/**
 * Get responsive sizes string for Next.js Image component
 * @param {string} sizeCategory - Size category
 * @returns {string} Responsive sizes string
 */
export const getResponsiveSizes = (sizeCategory = 'card') => {
  return RESPONSIVE_SIZES[sizeCategory] || RESPONSIVE_SIZES.card
}

/**
 * Get image dimensions for a size category
 * @param {string} sizeCategory - Size category
 * @returns {object} Width and height
 */
export const getImageDimensions = (sizeCategory = 'card') => {
  return IMAGE_SIZES[sizeCategory] || IMAGE_SIZES.card
}

/**
 * Preload critical images for better performance
 * @param {Array} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  if (typeof window === 'undefined') return
  
  imageUrls.forEach(url => {
    if (url) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    }
  })
}

/**
 * Lazy load images with intersection observer
 * @param {HTMLElement} element - Image element to observe
 * @param {Function} callback - Callback when image enters viewport
 */
export const setupLazyLoading = (element, callback) => {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    callback()
    return
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback()
          observer.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
      threshold: 0.1
    }
  )
  
  observer.observe(element)
  return observer
}

/**
 * Generate srcSet for responsive images
 * @param {string} baseUrl - Base image URL
 * @param {Array} widths - Array of widths for different screen sizes
 * @returns {string} srcSet string
 */
export const generateSrcSet = (baseUrl, widths = [300, 600, 900, 1200]) => {
  if (!baseUrl) return ''
  
  return widths
    .map(width => `${baseUrl}?w=${width} ${width}w`)
    .join(', ')
}

export default {
  getOptimizedImageUrl,
  getResponsiveSizes,
  getImageDimensions,
  preloadImages,
  setupLazyLoading,
  generateSrcSet,
  IMAGE_SIZES,
  RESPONSIVE_SIZES
}