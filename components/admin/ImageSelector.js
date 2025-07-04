'use client'

import { useState, useEffect } from 'react'

export default function ImageSelector({ selectedImageId, onImageSelect }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/images')
      const data = await response.json()
      
      // Handle both response formats: { success: true, images: [] } or { images: [] }
      if (data.success && data.images) {
        setImages(data.images)
      } else if (data.images) {
        setImages(data.images)
      } else {
        setImages([])
      }
    } catch (error) {
      console.error('Error loading images:', error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const selectedImage = images.find(img => img.id === selectedImageId)

  return (
    <div className="space-y-4">
      {/* Current Selection */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        {selectedImage ? (
          <div className="flex items-center space-x-4">
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{selectedImage.name}</p>
              <p className="text-sm text-gray-500">Selected Image</p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                onImageSelect(null)
              }}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No image selected</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setShowModal(true)
          }}
          className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
        >
          Choose Image
        </button>
        <a
          href="/admin/images"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors inline-block"
        >
          Manage Images
        </a>
      </div>

      {/* Image Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Select Image</h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowModal(false)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className={`relative border-2 rounded-lg cursor-pointer transition-all ${
                        selectedImageId === image.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onImageSelect(image.id)
                        setShowModal(false)
                      }}
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <div className="p-2">
                        <p className="text-xs text-gray-600 truncate">{image.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No images available. Upload some images first.</p>
                  <a
                    href="/admin/images"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Go to Image Management
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 