'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../components/admin/AdminLayout'
import { AuthService } from '../../../lib/auth'

export default function ImagesManagement() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [router])

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

      loadImages()
    } catch (error) {
      router.push('/admin')
    }
  }

  const loadImages = async () => {
    try {
      const response = await fetch('/api/admin/images')
      const data = await response.json()
      setImages(data.images || [])
    } catch (error) {
      // Failed to load images
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setUploading(true)
    
    try {
      for (const file of selectedFiles) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', file.name)
        formData.append('description', '')

        const response = await fetch('/api/admin/images/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          },
          body: formData
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }
      }

      await loadImages()
      setSelectedFiles([])
      setShowUploadModal(false)
      alert('Images uploaded successfully!')
    } catch (error) {
      alert('Failed to upload images: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`/api/admin/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })

      if (response.ok) {
        await loadImages()
      } else {
        alert('Failed to delete image')
      }
    } catch (error) {
      alert('Failed to delete image')
    }
  }

  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url)
    alert('Image URL copied to clipboard!')
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Images Management</h1>
            <p className="text-gray-600">Upload and manage your images</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
          >
            Upload Images
          </button>
        </div>

        {/* Image Grid */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {images.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No images uploaded</h3>
              <p className="text-gray-600">Upload your first image to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgMTZsNC41ODYtNC41ODZhMiAyIDAgMDEyLjgyOCAwTDE2IDE2bS0yLTJsMS41ODYtMS41ODZhMiAyIDAgMDEyLjgyOCAwTDIwIDE0bS02LTZoLjAxTTYgMjBoMTJhMiAyIDAgMDAyLTJWNmEyIDIgMCAwMC0yLTJINmEyIDIgMCAwMC0yIDJ2MTJhMiAyIDAgMDAyIDJ6IiBzdHJva2U9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 truncate">{image.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => copyImageUrl(image.url)}
                        className="flex-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        Copy URL
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="text-xs text-red-600 hover:text-red-800 px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Storage Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-800">Image Storage</h3>
              <p className="text-sm text-blue-700 mt-1">
                For production, consider using cloud storage services like Cloudinary, AWS S3, or Vercel Blob for better performance and CDN delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Upload Images</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                {selectedFiles.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Selected files:</p>
                    <ul className="text-sm space-y-1">
                      {selectedFiles.map((file, index) => (
                        <li key={index} className="text-gray-700">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploading || selectedFiles.length === 0}
                    className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary-hover disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}