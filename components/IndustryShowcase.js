'use client'

import { useState, useEffect } from 'react'
import { useProducts, useImages, getImageUrl } from '../hooks/useProducts'

const IndustryShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quotationForm, setQuotationForm] = useState({
    name: '',
    email: '',
    company: '',
    quantity: '',
    message: ''
  })

  const { industryProducts, loading: productsLoading, error: productsError } = useProducts()
  const { images, loading: imagesLoading } = useImages()

  // Debug logging
  useEffect(() => {
    console.log('IndustryShowcase - Industry Products:', industryProducts)
    console.log('IndustryShowcase - Loading:', productsLoading)
    console.log('IndustryShowcase - Error:', productsError)
  }, [industryProducts, productsLoading, productsError])

  // Fallback products for when admin data is not available
  const fallbackProducts = [
    {
      name: "Coffee Packaging",
      description: "Premium coffee bags with degassing valves and resealable closures for freshness.",
      fullDescription: "Our coffee packaging solutions are specifically designed to preserve the freshness and aroma of your coffee beans. Featuring one-way degassing valves, resealable zippers, and barrier films that protect against moisture, oxygen, and light. Perfect for roasters and coffee brands looking to maintain quality from roastery to cup.",
      price: "From $0.75",
      category: "Food & Beverage", 
      image: "https://via.placeholder.com/280x180/CDF501/000000?text=Coffee",
      features: ["One-way degassing valve", "Resealable zipper", "Barrier protection", "Custom printing", "Multiple sizes available"],
      specifications: {
        "Material": "Laminated barrier film",
        "Valve": "One-way degassing valve included",
        "Closure": "Resealable zipper or heat seal",
        "Print": "Full-color rotogravure printing",
        "Sizes": "8oz, 12oz, 16oz, 2lb, 5lb options"
      },
      bestseller: false,
      rating: 4.8
    },
    {
      name: "Food Containers",
      description: "Sustainable takeout containers, meal prep boxes, and food storage solutions.",
      fullDescription: "Eco-friendly food containers designed for restaurants, meal prep services, and food delivery. Made from sustainable materials with leak-proof designs and excellent insulation properties. Available in various sizes and configurations to meet your specific food service needs.",
      price: "From $0.45",
      category: "Food & Beverage", 
      image: "https://via.placeholder.com/280x180/7B6AF7/FFFFFF?text=Food+Containers",
      features: ["Leak-proof design", "Microwave safe", "Eco-friendly materials", "Custom branding", "Stack-friendly"],
      specifications: {
        "Material": "Biodegradable fiber or recycled plastic",
        "Temperature": "Microwave and freezer safe",
        "Capacity": "8oz to 64oz options",
        "Closure": "Secure snap-fit lid",
        "Certification": "FDA approved, compostable options"
      },
      bestseller: true,
      rating: 4.9
    },
    {
      name: "Cosmetic Boxes",
      description: "Luxury packaging for skincare, makeup, and beauty products with premium finishes.",
      fullDescription: "Elegant cosmetic packaging that enhances your beauty brand's premium image. Our boxes feature luxury finishes, magnetic closures, and custom inserts to showcase your products beautifully. Perfect for skincare sets, makeup collections, and premium beauty products.",
      price: "From $1.85",
      category: "Beauty & Personal Care",
      image: "https://via.placeholder.com/280x180/CDF501/000000?text=Cosmetic+Box",
      features: ["Magnetic closure", "Custom inserts", "Luxury finishes", "Soft-touch coating", "Foil stamping"],
      specifications: {
        "Material": "Premium paperboard with luxury finishes",
        "Thickness": "18pt to 24pt options",
        "Closure": "Magnetic or ribbon closure",
        "Finish": "Soft-touch, UV coating, foil stamping",
        "Insert": "Custom foam or cardboard inserts"
      },
      bestseller: false,
      rating: 4.7
    },
    {
      name: "Supplement Pouches",
      description: "Child-resistant pouches and bottles for vitamins, supplements, and health products.",
      fullDescription: "Specialized packaging for dietary supplements and health products. Our pouches and bottles meet FDA requirements with child-resistant features and tamper-evident seals. Designed to protect product integrity while ensuring consumer safety.",
      price: "From $0.95",
      category: "Health & Wellness",
      image: "https://via.placeholder.com/280x180/7B6AF7/FFFFFF?text=Supplements",
      features: ["Child-resistant closure", "Tamper-evident seal", "Moisture barrier", "FDA compliant", "Custom labeling"],
      specifications: {
        "Material": "Pharmaceutical-grade materials",
        "Closure": "Child-resistant cap or zipper",
        "Barrier": "Moisture and oxygen protection",
        "Compliance": "FDA, cGMP certified",
        "Capacity": "30ct to 500ct options"
      },
      bestseller: false,
      rating: 4.6
    },
    {
      name: "Apparel Mailers",
      description: "Branded mailers and poly bags for clothing, accessories, and fashion items.",
      fullDescription: "Stylish shipping solutions for fashion and apparel brands. Our mailers combine protection with brand presentation, featuring custom printing and eco-friendly materials. Perfect for online fashion retailers and subscription box services.",
      price: "From $0.55",
      category: "Fashion & Apparel",
      image: "https://via.placeholder.com/280x180/CDF501/000000?text=Apparel+Mailer",
      features: ["Custom branding", "Tear-resistant", "Eco-friendly options", "Self-sealing", "Multiple sizes"],
      specifications: {
        "Material": "Poly mailer or kraft paper",
        "Thickness": "2.5mil to 3.5mil options",
        "Closure": "Self-sealing adhesive strip",
        "Print": "Full-color flexographic printing",
        "Eco-option": "Biodegradable and recyclable materials"
      },
      bestseller: false,
      rating: 4.8
    },
    {
      name: "Electronics Packaging",
      description: "Anti-static boxes and protective packaging for phones, gadgets, and tech products.",
      fullDescription: "Specialized packaging for electronic devices and components. Our anti-static materials protect sensitive electronics while custom inserts ensure secure fit and professional presentation. Ideal for consumer electronics, components, and tech accessories.",
      price: "From $1.25",
      category: "Electronics",
      image: "https://via.placeholder.com/280x180/7B6AF7/FFFFFF?text=Electronics",
      features: ["Anti-static protection", "Custom foam inserts", "Shock absorption", "Clean room compatible", "ESD safe"],
      specifications: {
        "Material": "Anti-static corrugated or foam",
        "ESD": "Static dissipative materials",
        "Insert": "Custom-cut protective foam",
        "Certification": "ESD safe, clean room approved",
        "Testing": "Drop test and compression tested"
      },
      bestseller: false,
      rating: 4.9
    },
    {
      name: "Jewelry Boxes",
      description: "Elegant presentation boxes for rings, necklaces, and luxury jewelry items.",
      fullDescription: "Exquisite jewelry packaging that reflects the value and beauty of your pieces. Our boxes feature premium materials, velvet inserts, and elegant designs that create memorable unboxing experiences for luxury jewelry brands.",
      price: "From $2.45",
      category: "Luxury Goods",
      image: "https://via.placeholder.com/280x180/CDF501/000000?text=Jewelry+Box",
      features: ["Velvet inserts", "Premium materials", "Elegant design", "Secure closure", "Custom branding"],
      specifications: {
        "Material": "Premium paperboard with luxury finishes",
        "Insert": "Velvet or silk-lined inserts",
        "Closure": "Magnetic or hinged lid",
        "Finish": "Embossed, foil stamped, or leather texture",
        "Sizes": "Ring, earring, necklace, and set boxes"
      },
      bestseller: false,
      rating: 4.8
    },
    {
      name: "Book Mailers",
      description: "Protective mailers and rigid boxes for books, magazines, and printed materials.",
      fullDescription: "Reliable shipping solutions for publishers and book retailers. Our mailers provide excellent protection against bending and damage while maintaining cost-effectiveness for high-volume shipping. Available in various sizes for different book formats.",
      price: "From $0.85",
      category: "Publishing & Media",
      image: "https://via.placeholder.com/280x180/7B6AF7/FFFFFF?text=Book+Mailer",
      features: ["Bend-resistant", "Self-sealing", "Lightweight", "Custom sizes", "Eco-friendly"],
      specifications: {
        "Material": "Rigid cardboard or corrugated",
        "Protection": "Bend and crush resistant",
        "Closure": "Self-sealing or tape closure",
        "Sizes": "Paperback, hardcover, and oversized options",
        "Eco-option": "Recycled materials available"
      },
      bestseller: false,
      rating: 4.7
    },
    {
      name: "Gift Boxes",
      description: "Festive packaging for holidays, corporate gifts, and special occasions.",
      fullDescription: "Beautiful gift boxes that make every occasion special. Our seasonal and custom gift boxes feature premium finishes, ribbon details, and elegant designs perfect for corporate gifting, holidays, and special celebrations.",
      price: "From $1.35",
      category: "Gifts & Occasions",
      image: "https://via.placeholder.com/280x180/CDF501/000000?text=Gift+Box",
      features: ["Premium finishes", "Ribbon details", "Seasonal designs", "Custom branding", "Various sizes"],
      specifications: {
        "Material": "Premium paperboard with decorative finishes",
        "Closure": "Ribbon tie, magnetic, or lift-off lid",
        "Finish": "Foil stamping, embossing, or specialty coatings",
        "Customization": "Full-color printing and custom inserts",
        "Occasions": "Holiday, corporate, wedding, and event themes"
      },
      bestseller: false,
      rating: 4.8
    },
    {
      name: "Eco-Friendly Options",
      description: "100% recyclable and biodegradable packaging made from sustainable materials.",
      fullDescription: "Sustainable packaging solutions that don't compromise on quality or aesthetics. Our eco-friendly options include biodegradable materials, recycled content, and compostable films that help reduce environmental impact while maintaining product protection.",
      price: "From $0.65",
      category: "Sustainability",
      image: "https://via.placeholder.com/280x180/7B6AF7/FFFFFF?text=Eco+Friendly",
      features: ["100% recyclable", "Biodegradable options", "Compostable films", "Sustainable sourcing", "Carbon neutral"],
      specifications: {
        "Material": "Recycled paperboard, biodegradable films",
        "Certification": "FSC certified, compostable certified",
        "Recyclability": "100% recyclable or compostable",
        "Carbon": "Carbon neutral shipping options",
        "Sourcing": "Sustainably sourced materials"
      },
      bestseller: false,
      rating: 4.9
    }
  ]

  // Use admin data if available, otherwise use fallback
  const displayProducts = industryProducts.length > 0 ? industryProducts : fallbackProducts

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const handleClosePopup = () => {
    setSelectedProduct(null)
    setQuotationForm({
      name: '',
      email: '',
      company: '',
      quantity: '',
      message: ''
    })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setQuotationForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleQuotationSubmit = (e) => {
    e.preventDefault()
    console.log('Quotation request:', { product: selectedProduct.name, ...quotationForm })
    alert('Quotation request submitted successfully! We will contact you within 24 hours.')
    handleClosePopup()
  }

  // Loading state
  if (productsLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-900 mb-6">
            <span className="text-gradient">Industry-Specific</span> Packaging
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Shop our collection of specialized packaging solutions tailored to your industry's unique requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {displayProducts.map((product, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden relative cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Top badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                {product.bestseller && (
                  <div className="bg-gray-800 text-white px-3 py-1 rounded text-xs font-medium flex items-center">
                    <span className="mr-1">✨</span> Popular
                  </div>
                )}
                <button 
                  className="ml-auto bg-white rounded-full p-2 hover:bg-gray-50 transition-colors shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Add to favorites functionality
                  }}
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              {/* Product Image */}
              <div className="relative h-64 bg-gray-50 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 p-6 flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {product.imageId && getImageUrl(product.imageId, images) ? (
                      <img 
                        src={getImageUrl(product.imageId, images)} 
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
              <div className="p-4">
                {/* Color swatches */}
                <div className="flex space-x-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-200"></div>
                  <div className="w-5 h-5 rounded-full bg-amber-700 border-2 border-gray-200"></div>
                  <div className="w-5 h-5 rounded-full bg-gray-300 border-2 border-gray-200"></div>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Cubit Packaging</p>
                
                {/* Price */}
                <div className="text-xl font-bold text-black">{product.price}</div>
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
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Can't find what you need?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            We create custom packaging solutions for any industry. Tell us about your project!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.querySelector('#quote').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-lg px-8 py-4"
            >
              Request Custom Solution
            </button>
            <button className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
              Browse All Products
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                  <p className="text-gray-600">by Cubit Packaging • {selectedProduct.category}</p>
                </div>
                <button 
                  onClick={handleClosePopup}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Product Info */}
                <div>
                  {/* Product Image */}
                  <div className="relative h-64 bg-gray-50 rounded-xl mb-6">
                    <div className="absolute inset-0 p-8 flex items-center justify-center">
                      <div className="w-full h-full bg-white rounded-lg shadow-sm flex items-center justify-center">
                        {selectedProduct.imageId && getImageUrl(selectedProduct.imageId, images) ? (
                          <img 
                            src={getImageUrl(selectedProduct.imageId, images)} 
                            alt={selectedProduct.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg mb-4">
                              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                            <div className="text-sm font-medium text-gray-600">{selectedProduct.category}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-black mb-2">{selectedProduct.price}</div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedProduct.fullDescription}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700">{key}:</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Quotation Form */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Request Quotation</h4>
                  <form onSubmit={handleQuotationSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={quotationForm.name}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={quotationForm.email}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={quotationForm.company}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                      <input
                        type="text"
                        name="quantity"
                        value={quotationForm.quantity}
                        onChange={handleFormChange}
                        placeholder="e.g., 1,000 units"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                      <textarea
                        name="message"
                        value={quotationForm.message}
                        onChange={handleFormChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Tell us about your specific requirements..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-black font-semibold py-3 px-6 rounded-lg hover:bg-primary-hover transition-colors"
                    >
                      Request Quotation
                    </button>
                  </form>
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