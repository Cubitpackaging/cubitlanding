'use client'
import { useState } from 'react'
import { useProducts, useImages } from '../hooks/useProducts'

const ProductShowcase = () => {
  const { products, loading: productsLoading, error } = useProducts()
  const { images, loading: imagesLoading } = useImages()
  const [selectedProduct, setSelectedProduct] = useState(null)

  const getImageUrl = (imageId) => {
    const image = images.find(img => img.id === imageId)
    return image ? `/uploads/${image.filename}` : null
  }

  const fallbackProducts = [
    {
      name: "Custom Mailer Boxes",
      description: "Branded shipping boxes that turn unboxing into a marketing experience.",
      fullDescription: "Transform your shipping experience with custom-branded mailer boxes. These durable corrugated boxes feature your logo, colors, and messaging, creating excitement from the moment customers receive their package. Perfect for e-commerce, subscription boxes, and direct-to-consumer brands.",
      price: "Starting at $0.85",
      originalPrice: "$1.20",
      minOrder: "MOQ: 50 units",
      image: "https://via.placeholder.com/400x300/7B6AF7/FFFFFF?text=Mailer+Box",
      features: ["Custom branding", "Various sizes", "Tear-away strip", "Eco-friendly", "Fast setup"],
      specifications: {
        "Material": "Single or double-wall corrugated cardboard",
        "Thickness": "32 ECT or 44 ECT options",
        "Print": "Full-color flexographic printing",
        "Closure": "Self-locking tabs, no tape needed",
        "Sizes": "From 4x4x2 to 24x18x6 inches"
      },
      popular: true,
      rating: 4.8,
      reviews: 324,
      status: "Available"
    },
    {
      name: "Pouches & Bags",
      description: "Flexible packaging solutions perfect for food, supplements, and retail products.",
      fullDescription: "Versatile stand-up pouches and flat bags that combine functionality with eye-catching design. Our pouches feature advanced barrier properties to keep contents fresh while offering excellent printability for brand messaging. Ideal for food products, supplements, cosmetics, and retail items.",
      price: "Starting at $0.65",
      originalPrice: "$0.95",
      minOrder: "MOQ: 100 units",
      image: "https://via.placeholder.com/400x300/CDF501/000000?text=Pouches",
      features: ["Stand-up pouches", "Resealable zippers", "Barrier protection", "Clear windows available", "Multiple sizes"],
      specifications: {
        "Material": "Laminated films (PET/PE/BOPP)",
        "Barrier": "Oxygen, moisture, light protection",
        "Print": "Up to 10 colors gravure printing",
        "Features": "Resealable, tear notch, hang hole",
        "Sizes": "From 3x5 inches to 12x18 inches"
      },
      popular: false,
      rating: 4.9,
      reviews: 156,
      stock: "In Stock"
    },
    {
      name: "Folding Cartons",
      description: "Premium retail packaging that enhances product presentation and brand experience.",
      fullDescription: "Sophisticated folding cartons that elevate your product presentation on retail shelves. These boxes combine structural integrity with premium finishing options to create packaging that customers want to keep. Perfect for cosmetics, electronics, food products, and luxury items.",
      price: "Starting at $1.25",
      originalPrice: "$1.85",
      minOrder: "MOQ: 75 units",
      image: "https://via.placeholder.com/400x300/CDF501/000000?text=Folding+Carton",
      features: ["Luxury finishes", "Window cutouts", "Magnetic closures", "Embossing/debossing", "Foil stamping"],
      specifications: {
        "Material": "SBS, kraft, or recycled paperboard",
        "Thickness": "12pt to 24pt options",
        "Print": "Offset printing with spot colors",
        "Finish": "UV coating, lamination, soft-touch",
        "Features": "Die-cut windows, magnetic closure, ribbon pulls"
      },
      popular: false,
      rating: 4.7,
      reviews: 89,
      stock: "In Stock"
    },
    {
      name: "Shipping Boxes",
      description: "Durable corrugated boxes designed for safe product transport and delivery.",
      fullDescription: "Heavy-duty shipping boxes engineered for maximum protection during transit. Our corrugated boxes feature reinforced corners and edges to prevent damage while maintaining cost-effectiveness. Available in various strengths and sizes to accommodate different shipping needs.",
      price: "Starting at $1.15",
      originalPrice: "$1.55",
      minOrder: "MOQ: 50 units",
      image: "https://via.placeholder.com/400x300/7B6AF7/FFFFFF?text=Shipping+Box",
      features: ["Various sizes", "Double-wall strength", "Easy assembly", "Crush-resistant", "Stackable design"],
      specifications: {
        "Material": "Single or double-wall corrugated",
        "Strength": "32 ECT to 275 lb test",
        "Print": "Flexographic printing",
        "Closure": "Regular slotted container (RSC)",
        "Sizes": "Standard and custom dimensions"
      },
      popular: false,
      rating: 4.6,
      reviews: 203,
      stock: "In Stock"
    },
    {
      name: "Tube Packaging",
      description: "Cylindrical packaging perfect for posters, documents, and specialty products.",
      fullDescription: "Elegant tube packaging that combines protection with premium presentation. Our custom tubes are perfect for artwork, documents, cosmetics, and specialty products that need secure cylindrical packaging. Available in various materials and finishes.",
      price: "Starting at $1.45",
      originalPrice: "$1.95",
      minOrder: "MOQ: 25 units",
      image: "https://via.placeholder.com/400x300/7B6AF7/FFFFFF?text=Tube+Box",
      features: ["Custom lengths", "Premium materials", "Secure closures", "Branding options", "Protective padding"],
      specifications: {
        "Material": "Cardboard or kraft paper",
        "Diameter": "1 inch to 6 inches",
        "Length": "Up to 48 inches",
        "Closure": "Plastic caps or metal ends",
        "Print": "Full-color or kraft natural"
      },
      popular: false,
      rating: 4.5,
      reviews: 67,
      stock: "In Stock"
    },
    {
      name: "Tubes & Jars",
      description: "Premium squeezable tubes and cosmetic jars for beauty, pharmaceutical, and food products.",
      fullDescription: "Professional tubes and jars designed for cosmetics, pharmaceuticals, and food applications. Our plastic and aluminum tubes offer excellent barrier properties with 360° printing capabilities, while our jars provide secure storage with custom branding options. Perfect for creams, lotions, ointments, food pastes, and specialty products requiring precise dispensing or storage.",
      price: "Starting at $0.75",
      originalPrice: "$1.10",
      minOrder: "MOQ: 100 units",
      image: "https://via.placeholder.com/400x300/16A085/FFFFFF?text=Tubes+%26+Jars",
      features: ["360° printing", "Barrier protection", "Multiple cap options", "Food-safe materials", "Recyclable options"],
      specifications: {
        "Materials": "PE, PP, aluminum, or laminated films",
        "Tube Sizes": "5ml to 300ml capacity",
        "Jar Sizes": "15ml to 500ml capacity",
        "Printing": "Offset, screen, flexographic, gravure",
        "Caps": "Flip-top, screw, pump, or squeeze caps",
        "Barrier": "Oxygen, moisture, and light protection"
      },
      popular: false,
      rating: 4.7,
      reviews: 142,
      stock: "In Stock"
    }
  ]

  const displayProducts = products?.length > 0 ? products : fallbackProducts

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  // Loading state
  if (productsLoading) {
    return (
      <section id="packaging" className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    console.error('ProductShowcase error:', error)
  }

  return (
    <section id="packaging" className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-900 mb-6">
            Our Custom <span className="text-gradient">Packaging Solutions</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Professional packaging solutions with fast turnaround and competitive pricing.
          </p>
          {products?.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Showing {products.length} custom packaging solutions
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product, index) => (
            <div 
              key={product.id || index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleProductClick(product)}
            >
              {/* Badge */}
              {product.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-lg shadow-md z-10">
                  Popular
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-56 bg-gray-50 overflow-hidden">
                <div className="absolute inset-0 p-6 flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    {product.imageId && getImageUrl(product.imageId) ? (
                      <img 
                        src={getImageUrl(product.imageId)} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category */}
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  Custom Packaging
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features?.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-medium">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex justify-between items-center mb-4">
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
                      {product.minOrder || "MOQ: 50 units"}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-green-600">
                    Ready to Quote
                  </div>
                </div>
              </div>
            </div>
          ))}
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

                  {/* Price and MOQ */}
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-black mb-2">{selectedProduct.price}</div>
                    <div className="text-gray-600">{selectedProduct.moq || selectedProduct.minOrder}</div>
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

export default ProductShowcase 