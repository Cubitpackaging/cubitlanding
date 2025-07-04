'use client'
import { useState } from 'react'
import { useProducts, useImages } from '../hooks/useProducts'

const IndustryShowcase = () => {
  const { industryProducts, loading: productsLoading, error } = useProducts()
  const { images, loading: imagesLoading } = useImages()
  const [selectedProduct, setSelectedProduct] = useState(null)

  const getImageUrl = (imageId) => {
    const image = images.find(img => img.id === imageId)
    return image ? `/uploads/${image.filename}` : null
  }

  const fallbackProducts = [
    {
      name: "Food & Beverage Boxes",
      description: "Food-safe packaging for restaurants, cafes, and food delivery services.",
      fullDescription: "Our food-safe packaging solutions are designed to keep your culinary creations fresh and secure during transport. Made with FDA-approved materials and featuring grease-resistant coatings, these boxes are perfect for takeout orders, meal kits, and food delivery services.",
      price: "From $0.95",
      originalPrice: "$1.35",
      category: "Food & Beverage", 
      image: "https://via.placeholder.com/400x300/7B6AF7/FFFFFF?text=Food+Box",
      features: ["Food-safe materials", "Grease-resistant", "Stackable design", "Custom branding", "Various sizes"],
      specifications: {
        "Material": "Food-grade paperboard with PE coating",
        "Temperature": "Suitable for hot and cold foods",
        "Coating": "Grease and moisture resistant",
        "Certification": "FDA approved, BRC compliant",
        "Sizes": "From 4x4x2 to 12x12x4 inches"
      },
      bestseller: true,
      rating: 4.8,
      reviews: 287,
      stock: "In Stock"
    },
    {
      name: "Cosmetic Boxes",
      description: "Luxury packaging for skincare, makeup, and beauty products with premium finishes.",
      fullDescription: "Elegant cosmetic packaging that enhances your beauty brand's premium image. Our boxes feature luxury finishes, magnetic closures, and custom inserts to showcase your products beautifully. Perfect for skincare sets, makeup collections, and premium beauty products.",
      price: "From $1.85",
      originalPrice: "$2.45",
      category: "Beauty & Personal Care",
      image: "https://via.placeholder.com/400x300/CDF501/000000?text=Cosmetic+Box",
      features: ["Magnetic closure", "Custom inserts", "Luxury finishes", "Soft-touch coating", "Foil stamping"],
      specifications: {
        "Material": "Premium paperboard with luxury finishes",
        "Thickness": "18pt to 24pt options",
        "Closure": "Magnetic or ribbon closure",
        "Finish": "Soft-touch, UV coating, foil stamping",
        "Insert": "Custom foam or cardboard inserts"
      },
      bestseller: false,
      rating: 4.7,
      reviews: 156,
      stock: "In Stock"
    },
    {
      name: "Pharmaceutical Packaging",
      description: "Secure and compliant packaging for medicines, supplements, and healthcare products.",
      fullDescription: "Pharmaceutical-grade packaging that meets strict regulatory requirements while maintaining product integrity. Our child-resistant and tamper-evident designs ensure safety and compliance for prescription medications, over-the-counter drugs, and nutritional supplements.",
      price: "From $1.45",
      originalPrice: "$1.95",
      category: "Healthcare",
      image: "https://via.placeholder.com/400x300/7B6AF7/FFFFFF?text=Pharma+Box",
      features: ["Child-resistant", "Tamper-evident", "Regulatory compliant", "Moisture protection", "Serialization ready"],
      specifications: {
        "Material": "Pharmaceutical-grade paperboard",
        "Compliance": "FDA, USP, cGMP compliant",
        "Security": "Tamper-evident closures",
        "Barrier": "Moisture and light protection",
        "Serialization": "Ready for track and trace"
      },
      bestseller: false,
      rating: 4.9,
      reviews: 98,
      stock: "In Stock"
    },
    {
      name: "Electronics Packaging",
      description: "Anti-static boxes and protective packaging for phones, gadgets, and tech products.",
      fullDescription: "Specialized packaging for electronic devices and components. Our anti-static materials protect sensitive electronics while custom inserts ensure secure fit and professional presentation. Ideal for consumer electronics, components, and tech accessories.",
      price: "From $1.25",
      originalPrice: "$1.75",
      category: "Electronics",
      image: "https://via.placeholder.com/400x300/7B6AF7/FFFFFF?text=Electronics",
      features: ["Anti-static protection", "Custom foam inserts", "Shock absorption", "Clean room compatible", "ESD safe"],
      specifications: {
        "Material": "Anti-static corrugated or foam",
        "ESD": "Static dissipative materials",
        "Insert": "Custom-cut protective foam",
        "Certification": "ESD safe, clean room approved",
        "Testing": "Drop test and compression tested"
      },
      bestseller: false,
      rating: 4.9,
      reviews: 145,
      stock: "In Stock"
    },
    {
      name: "Jewelry Boxes",
      description: "Elegant presentation boxes for rings, necklaces, and luxury jewelry items.",
      fullDescription: "Exquisite jewelry packaging that reflects the value and beauty of your pieces. Our boxes feature premium materials, velvet inserts, and elegant designs that create memorable unboxing experiences for luxury jewelry brands.",
      price: "From $2.45",
      originalPrice: "$3.15",
      category: "Luxury Goods",
      image: "https://via.placeholder.com/400x300/CDF501/000000?text=Jewelry+Box",
      features: ["Velvet inserts", "Premium materials", "Elegant design", "Secure closure", "Custom branding"],
      specifications: {
        "Material": "Premium paperboard with luxury finishes",
        "Insert": "Velvet or silk-lined inserts",
        "Closure": "Magnetic or hinged lid",
        "Finish": "Embossed, foil stamped, or leather texture",
        "Sizes": "Ring, earring, necklace, and set boxes"
      },
      bestseller: false,
      rating: 4.8,
      reviews: 89,
      stock: "In Stock"
    },
    {
      name: "Gift Boxes",
      description: "Festive packaging for holidays, corporate gifts, and special occasions.",
      fullDescription: "Beautiful gift boxes that make every occasion special. Our seasonal and custom gift boxes feature premium finishes, ribbon details, and elegant designs perfect for corporate gifting, holidays, and special celebrations.",
      price: "From $1.35",
      originalPrice: "$1.85",
      category: "Gifts & Occasions",
      image: "https://via.placeholder.com/400x300/CDF501/000000?text=Gift+Box",
      features: ["Premium finishes", "Ribbon details", "Seasonal designs", "Custom branding", "Various sizes"],
      specifications: {
        "Material": "Premium paperboard with decorative finishes",
        "Closure": "Ribbon tie, magnetic, or lift-off lid",
        "Finish": "Foil stamping, embossing, or specialty coatings",
        "Customization": "Full-color printing and custom inserts",
        "Occasions": "Holiday, corporate, wedding, and event themes"
      },
      bestseller: false,
      rating: 4.8,
      reviews: 123,
      stock: "In Stock"
    }
  ]

  const displayProducts = industryProducts?.length > 0 ? industryProducts : fallbackProducts

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  // Loading state
  if (productsLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-7xl mx-auto section-padding">
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
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-900 mb-6">
            Industry-Specific <span className="text-gradient">Packaging Solutions</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized packaging designed for your industry's unique requirements and regulations.
          </p>
          {industryProducts?.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Showing {industryProducts.length} industry-specific products
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
                      <img 
                        src={getImageUrl(product.imageId)} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
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
              <div className="p-6">
                {/* Category */}
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  {product.category}
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
                  <button className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center gap-2">
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
          ))}
        </div>

        {/* Filter/Category Tabs */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
            Browse by Industry
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['All Products', 'Food & Beverage', 'Beauty & Care', 'Electronics', 'Fashion'].map((category, index) => (
              <button key={index} className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 text-sm ${index === 0 ? 'bg-secondary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Don't See Your Industry? We've Got You Covered!
          </h3>
          <p className="text-xl mb-6">
            Our packaging experts work with businesses across all industries to create custom solutions.
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
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
                    <button className="w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:from-primary hover:to-primary transition-all duration-300 shadow-lg">
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