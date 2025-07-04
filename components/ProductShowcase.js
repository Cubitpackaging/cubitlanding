'use client'

import { useState, useEffect } from 'react'
import { useProducts, useImages, getImageUrl } from '../hooks/useProducts'

const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quotationForm, setQuotationForm] = useState({
    name: '',
    email: '',
    company: '',
    quantity: '',
    message: ''
  })

  const { products, loading: productsLoading, error: productsError } = useProducts()
  const { images, loading: imagesLoading } = useImages()

  // Debug logging
  useEffect(() => {
    console.log('ProductShowcase - Products:', products)
    console.log('ProductShowcase - Loading:', productsLoading)
    console.log('ProductShowcase - Error:', productsError)
  }, [products, productsLoading, productsError])

  // Fallback products for when admin data is not available
  const fallbackProducts = [
    {
      name: "Mailer Boxes",
      description: "Custom printed shipping boxes that protect your products while showcasing your brand.",
      fullDescription: "Our premium mailer boxes are designed to make a lasting impression from the moment your customers receive their package. Made from high-quality corrugated cardboard, these boxes offer excellent protection while providing a canvas for your brand story. Perfect for e-commerce businesses looking to enhance their unboxing experience.",
      price: "Starting at $0.85",
      minOrder: "MOQ: 50 units",
      image: "https://via.placeholder.com/300x200/CDF501/000000?text=Mailer+Box",
      features: ["Custom sizes available", "Full-color printing", "Tear-strip opening", "Eco-friendly materials", "Fast 4-7 day turnaround"],
      specifications: {
        "Material": "Corrugated cardboard",
        "Thickness": "3mm, 5mm options",
        "Print": "Full CMYK + spot colors",
        "Finish": "Matte, gloss, or soft-touch",
        "Sizes": "Custom dimensions up to 24x18x12 inches"
      },
      popular: true
    },
    {
      name: "Pouches & Bags",
      description: "Flexible packaging solutions perfect for food, supplements, and retail products.",
      fullDescription: "Versatile stand-up pouches and flat bags that combine functionality with eye-catching design. Our pouches feature advanced barrier properties to keep contents fresh while offering excellent printability for brand messaging. Ideal for food products, supplements, cosmetics, and retail items.",
      price: "Starting at $0.65",
      minOrder: "MOQ: 100 units",
      image: "https://via.placeholder.com/300x200/7B6AF7/FFFFFF?text=Pouches",
      features: ["Stand-up pouches", "Resealable zippers", "Barrier protection", "Clear windows available", "Multiple sizes"],
      specifications: {
        "Material": "Laminated films (PET/PE/BOPP)",
        "Barrier": "Oxygen, moisture, light protection",
        "Print": "Up to 10 colors gravure printing",
        "Features": "Resealable, tear notch, hang hole",
        "Sizes": "From 3x5 inches to 12x18 inches"
      },
      popular: false
    },
    {
      name: "Folding Cartons",
      description: "Premium retail packaging that enhances product presentation and brand experience.",
      fullDescription: "Sophisticated folding cartons that elevate your product presentation on retail shelves. These boxes combine structural integrity with premium finishing options to create packaging that customers want to keep. Perfect for cosmetics, electronics, food products, and luxury items.",
      price: "Starting at $1.25",
      minOrder: "MOQ: 75 units",
      image: "https://via.placeholder.com/300x200/CDF501/000000?text=Folding+Carton",
      features: ["Luxury finishes", "Window cutouts", "Magnetic closures", "Embossing/debossing", "Foil stamping"],
      specifications: {
        "Material": "SBS, kraft, or recycled paperboard",
        "Thickness": "12pt to 24pt options",
        "Print": "Offset printing with spot colors",
        "Finish": "UV coating, lamination, soft-touch",
        "Features": "Die-cut windows, magnetic closure, ribbon pulls"
      },
      popular: false
    },
    {
      name: "Shipping Boxes",
      description: "Durable corrugated boxes designed for safe product transport and delivery.",
      fullDescription: "Heavy-duty shipping boxes engineered for maximum protection during transit. Our corrugated boxes feature reinforced corners and edges to prevent damage while maintaining cost-effectiveness. Available in various strengths and sizes to accommodate different shipping needs.",
      price: "Starting at $1.15",
      minOrder: "MOQ: 50 units",
      image: "https://via.placeholder.com/300x200/7B6AF7/FFFFFF?text=Shipping+Box",
      features: ["Various sizes", "Double-wall strength", "Easy assembly", "Crush-resistant", "Stackable design"],
      specifications: {
        "Material": "Single or double-wall corrugated",
        "Strength": "32 ECT to 275 lb test",
        "Print": "Flexographic printing",
        "Closure": "Regular slotted container (RSC)",
        "Sizes": "Standard and custom dimensions"
      },
      popular: false
    },
    {
      name: "Labels & Stickers",
      description: "Custom labels and stickers for branding, product information, and promotional use.",
      fullDescription: "High-quality labels and stickers that make your products stand out. Our labels are designed to adhere perfectly to various surfaces while maintaining vibrant colors and sharp text. Perfect for product labeling, promotional campaigns, and brand identification.",
      price: "Starting at $0.15",
      minOrder: "MOQ: 250 units",
      image: "https://via.placeholder.com/300x200/CDF501/000000?text=Labels",
      features: ["Waterproof options", "Die-cut shapes", "Specialty adhesives", "Scratch-resistant", "UV-resistant inks"],
      specifications: {
        "Material": "Vinyl, paper, or polyester",
        "Adhesive": "Permanent, removable, or repositionable",
        "Print": "Digital or flexographic printing",
        "Finish": "Matte, gloss, or clear overlaminate",
        "Shapes": "Round, square, oval, or custom die-cut"
      },
      popular: false
    }
  ]

  // Use admin data if available, otherwise use fallback
  const displayProducts = products.length > 0 ? products : fallbackProducts

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {displayProducts.map((product, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden relative cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Top badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                {product.popular && (
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
              <div className="relative h-80 bg-gray-50 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 p-8 flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {product.imageId && getImageUrl(product.imageId, images) ? (
                      <img 
                        src={getImageUrl(product.imageId, images)} 
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
              <div className="p-4">
                {/* Color swatches */}
                <div className="flex space-x-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-200"></div>
                  <div className="w-5 h-5 rounded-full bg-amber-700 border-2 border-gray-200"></div>
                  <div className="w-5 h-5 rounded-full bg-gray-300 border-2 border-gray-200"></div>
                  <div className="w-5 h-5 rounded-full bg-rose-200 border-2 border-gray-200"></div>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Cubit Packaging</p>
                
                {/* Price and MOQ */}
                <div className="space-y-2">
                  <div className="text-xl font-bold text-black">{product.price}</div>
                  <div className="text-sm text-gray-600">{product.moq || product.minOrder}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Bar */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <div className="font-semibold text-gray-900">Fast Delivery</div>
                <div className="text-sm text-gray-600">4-7 days</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <div>
                <div className="font-semibold text-gray-900">Free Design</div>
                <div className="text-sm text-gray-600">No extra cost</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <div>
                <div className="font-semibold text-gray-900">Eco-Friendly</div>
                <div className="text-sm text-gray-600">Sustainable materials</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <div>
                <div className="font-semibold text-gray-900">Low Minimums</div>
                <div className="text-sm text-gray-600">From 50 units</div>
              </div>
            </div>
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
                  <p className="text-gray-600">by Cubit Packaging</p>
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

export default ProductShowcase 