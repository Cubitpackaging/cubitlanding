'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import RushOrderModal from './RushOrderModal'
import { CrystalButton } from './ui/crystal-button'

const Hero = () => {
  const [activePackage, setActivePackage] = useState(0)
  const [rushOrderModalOpen, setRushOrderModalOpen] = useState(false)
  
  const scrollToQuote = () => {
    const element = document.querySelector('#quote')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToWork = () => {
    const element = document.querySelector('#packaging')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Auto-rotate showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePackage((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const packageShowcase = [
    {
      type: 'Custom Boxes',
      features: ['Full Color Print', 'Smart Tech Ready', 'Eco Materials'],
      color: 'from-purple-500 to-blue-500',
      bgColor: 'from-purple-50 to-blue-50',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
          <rect x="30" y="70" width="140" height="100" rx="8" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2"/>
          <path d="M30 70L100 40L170 70" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M100 40V70" stroke="currentColor" strokeWidth="2"/>
          <rect x="150" y="150" width="15" height="15" rx="2" fill="currentColor" opacity="0.3"/>
          <circle cx="157.5" cy="157.5" r="4" fill="currentColor"/>
        </svg>
      )
    },
    {
      type: 'Mylar Bags',
      features: ['Food Grade Safe', 'Resealable Design', 'Digital Connect'],
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-50 to-teal-50',
      image: '/mylar-bags.png',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
          <path d="M50 60Q50 40 70 40H130Q150 40 150 60V160Q150 180 130 180H70Q50 180 50 160V60Z" 
                fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2"/>
          <rect x="50" y="40" width="100" height="20" rx="10" fill="currentColor" opacity="0.2"/>
          <path d="M70 70H130M70 90H130M70 110H100" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
          <rect x="120" y="150" width="20" height="20" rx="3" fill="currentColor" opacity="0.3"/>
          <circle cx="130" cy="160" r="5" fill="currentColor"/>
        </svg>
      )
    },
    {
      type: 'Tech-Integrated',
      features: ['QR Codes', 'NFC Tags', 'Track & Trace'],
      color: 'from-orange-500 to-pink-500',
      bgColor: 'from-orange-50 to-pink-50',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
          <rect x="40" y="40" width="120" height="120" rx="12" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2"/>
          <g opacity="0.3">
            <rect x="60" y="60" width="30" height="30" fill="currentColor"/>
            <rect x="110" y="60" width="30" height="30" fill="currentColor"/>
            <rect x="60" y="110" width="30" height="30" fill="currentColor"/>
            <rect x="70" y="70" width="10" height="10" fill="white"/>
            <rect x="120" y="70" width="10" height="10" fill="white"/>
            <rect x="70" y="120" width="10" height="10" fill="white"/>
          </g>
          <circle cx="125" cy="125" r="15" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="125" cy="125" r="8" fill="currentColor" opacity="0.5"/>
        </svg>
      )
    }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,107,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(34,197,94,0.06),transparent_50%)]"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
          {/* Left Content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 flex flex-col justify-center order-1 lg:order-1">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full text-xs font-medium mb-4 sm:mb-6 w-fit mx-auto lg:mx-0">
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Premium Packaging Solutions
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Eco-Smart<br/>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Custom Packaging</span>
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              Beautifully printed, eco-smart packaging with built-in digital experiences. 
              From sustainable boxes to tech-enabled mylar bags, we power the unboxing moments 
              that turn customers into brand advocates.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-10 justify-center lg:justify-start px-4 sm:px-0">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-full text-xs sm:text-sm text-gray-700 shadow-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Sustainable Materials
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-full text-xs sm:text-sm text-gray-700 shadow-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z"/>
                </svg>
                Smart Connected
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-full text-xs sm:text-sm text-gray-700 shadow-sm">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"/>
                </svg>
                Low Minimums
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <button
                onClick={scrollToQuote}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl text-sm sm:text-base"
              >
                <span className="relative z-10">Request a Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <CrystalButton
                onClick={() => setRushOrderModalOpen(true)}
              >
                Rush Order
              </CrystalButton>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center gap-4 sm:gap-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=32&h=32&fit=crop&crop=face&auto=format&q=80" 
                    alt="Customer testimonial" 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=32&h=32&fit=crop&crop=face&auto=format&q=80" 
                    alt="Customer testimonial" 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face&auto=format&q=80" 
                    alt="Customer testimonial" 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face&auto=format&q=80" 
                    alt="Customer testimonial" 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Trusted by Businesses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Quality Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Premium Packaging Showcase */}
          <div className="relative flex items-center justify-center h-full order-2 lg:order-2">
            {/* Main Showcase Container */}
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-2xl h-[300px] sm:h-[400px] lg:h-[550px] flex items-center justify-center">
              {/* Rotating Package Display */}
              <div className="relative w-full h-full">
                {packageShowcase.map((pkg, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 flex items-center justify-center ${
                      index === activePackage 
                        ? 'opacity-100 scale-100 z-20' 
                        : index === (activePackage + 1) % 3
                        ? 'opacity-40 scale-90 translate-x-4 sm:translate-x-8 lg:translate-x-20 z-10'
                        : 'opacity-40 scale-90 -translate-x-4 sm:-translate-x-8 lg:-translate-x-20 z-10'
                    }`}
                  >
                    <div className={`relative bg-gradient-to-br ${pkg.bgColor} rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-100 w-full max-w-xs sm:max-w-sm lg:max-w-md`}>
                      {/* Package Visual */}
                      <div className={`h-32 sm:h-48 lg:h-64 mb-3 sm:mb-4 lg:mb-6 text-transparent bg-gradient-to-br ${pkg.color} bg-clip-text`}>
                        {pkg.image ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <img 
                              src={pkg.image} 
                              alt={pkg.type}
                              className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
                            />
                          </div>
                        ) : (
                          pkg.icon
                        )}
                      </div>
                      
                      {/* Package Info */}
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{pkg.type}</h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {pkg.features.map((feature, idx) => (
                          <span key={idx} className="px-2 sm:px-3 py-1 bg-white/80 text-gray-700 rounded-full text-xs sm:text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Elements - Hidden on mobile to reduce clutter */}
            <div className="hidden sm:block absolute -top-2 -right-2 bg-white rounded-2xl shadow-xl p-3 sm:p-4 animate-float">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">Eco Certified</div>
                  <div className="text-xs text-gray-600">Carbon Neutral</div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block absolute -bottom-2 -left-2 bg-white rounded-2xl shadow-xl p-3 sm:p-4 animate-float-delayed">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">Fast Delivery</div>
                  <div className="text-xs text-gray-600">5-7 Business Days</div>
                </div>
              </div>
            </div>

            {/* Package Type Indicators */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 sm:translate-y-8 flex gap-2">
              {packageShowcase.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePackage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activePackage 
                      ? 'w-6 sm:w-8 bg-gradient-to-r from-purple-600 to-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>

      <RushOrderModal isOpen={rushOrderModalOpen} onClose={() => setRushOrderModalOpen(false)} />
    </section>
  )
}

export default Hero 