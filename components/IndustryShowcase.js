'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useProducts, useImages } from '../hooks/useProducts'

const IndustryShowcase = () => {
  const { products: allProducts, loading: productsLoading, error } = useProducts()
  const { images, loading: imagesLoading } = useImages()
  
  // Extract industry products from the API response
  const products = allProducts?.industryProducts || []
  const [selectedProduct, setSelectedProduct] = useState(null)

  const getImageUrl = (imageId) => {
    const image = images.find(img => img.id === imageId)
    return image ? `/uploads/${image.filename}` : null
  }

  // No fallback products - show empty state if no products loaded

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  // Loading state
  if (productsLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading industry products...</p>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    console.error('IndustryShowcase error:', error)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      <div className="max-w-7xl mx-auto section-padding relative z-10">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-900 mb-6">
            Industry-Specific <span className="text-gradient">Packaging Solutions</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized packaging designed for your industry's unique requirements and regulations.
          </p>
          {products?.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Showing {products.length} industry-specific products
            </p>
          )}
        </div>

        {!productsLoading && !imagesLoading && !error && products?.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
              <p className="text-gray-600 mb-6">We're currently updating our product catalog. Please check back soon or contact us for custom solutions.</p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        )}

        {products?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
            <div 
              key={product.id || index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative cursor-pointer transform hover:-translate-y-1 flex flex-col h-[600px]"
              onClick={() => handleProductClick(product)}
            >
              {/* Badge */}
                {product.bestseller && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-lg shadow-md z-10">
                  Best Seller
                  </div>
                )}
              
              {/* Product Image */}
              <div className="relative h-56 bg-gray-50 overflow-hidden">
                <div className="absolute inset-0 p-6 flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    {product.imageId && getImageUrl(product.imageId) ? (
                      <Image 
                        src={getImageUrl(product.imageId)} 
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg mb-2">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div className="text-xs font-medium text-gray-600">{product.category}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1">
                {/* Main Content */}
                <div className="flex-1">
                  {/* Category */}
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                    {product.category}
                  </div>

                  {/* Product Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.features?.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Price and CTA - Fixed at bottom */}
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-bold text-gray-900">
                        {product.price}
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        const quoteSection = document.getElementById('quote')
                        if (quoteSection) {
                          quoteSection.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center gap-2"
                  >
                    <span>Get Quote</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </button>
                </div>

                  {/* Rating and Stock */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="text-xs text-gray-700 font-medium">
                        {product.minOrder || "MOQ: 25 units"}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-green-600">
                      Ready to Quote
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Don't See Your Industry? We've Got You Covered!
          </h3>
          <p className="text-xl mb-6">
            Our packaging experts work with businesses across all industries to create custom solutions.
          </p>
          <button 
            onClick={() => {
              const quoteSection = document.getElementById('quote')
              if (quoteSection) {
                quoteSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            Contact Our Experts
            </button>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Product Info */}
                <div>
                  {/* Product Image */}
                  <div className="relative h-64 bg-gray-50 rounded-xl mb-6">
                    <div className="absolute inset-0 p-8 flex items-center justify-center">
                      <div className="w-full h-full bg-white rounded-lg shadow-sm flex items-center justify-center">
                        {selectedProduct.imageId && getImageUrl(selectedProduct.imageId) ? (
                          <img 
                            src={getImageUrl(selectedProduct.imageId)} 
                            alt={selectedProduct.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price and Category */}
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-black mb-2">{selectedProduct.price}</div>
                    <div className="text-gray-600">{selectedProduct.category}</div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedProduct.fullDescription}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Features</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedProduct.features?.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Specifications */}
                    <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h4>
                  <div className="space-y-4">
                    {selectedProduct.specifications && Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-200 pb-2">
                        <div className="font-medium text-gray-900">{key}</div>
                        <div className="text-gray-700">{value}</div>
                    </div>
                    ))}
                    </div>

                  {/* CTA Button */}
                  <div className="mt-8">
                    <button 
                      onClick={() => {
                        closeModal()
                        setTimeout(() => {
                          const quoteSection = document.getElementById('quote')
                          if (quoteSection) {
                            quoteSection.scrollIntoView({ behavior: 'smooth' })
                          }
                        }, 100)
                      }}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:from-primary hover:to-primary transition-all duration-300 shadow-lg"
                    >
                      Get Custom Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default IndustryShowcase