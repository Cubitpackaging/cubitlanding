'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const Hero = () => {
  const [activePackage, setActivePackage] = useState(0)
  
  const scrollToQuote = () => {
    const element = document.querySelector('#quote')
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Premium Packaging Solutions
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Eco-Smart Custom Packaging
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Beautifully printed, eco-smart packaging with built-in digital experiences. 
              From sustainable boxes to tech-enabled mylar bags — we power the unboxing moments 
              that turn customers into brand advocates.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Sustainable Materials
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z"/>
                </svg>
                Smart Connected
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm">
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"/>
                </svg>
                Low Minimums
              </span>
            </div>

            {/* Single CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <button
                onClick={scrollToQuote}
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <span className="relative z-10">Request a Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">1000+ Happy Brands</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-sm text-gray-600">4.9/5 Average Rating</span>
              </div>
            </div>
          </div>

          {/* Right Side - Package Showcase */}
          <div className="relative">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Packaging Type</span>
              </h2>
              <p className="text-lg text-gray-600">
                From custom boxes to smart mylar bags
              </p>
            </div>

            {/* Package Showcase Grid */}
            <div className="grid grid-cols-1 gap-6">
              {packageShowcase.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative bg-gradient-to-br ${pkg.bgColor} rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    index === activePackage ? 'ring-2 ring-purple-500 scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setActivePackage(index)}
                >
                  <div className="flex items-center gap-4">
                    {/* Package Visual */}
                    <div className={`w-16 h-16 text-transparent bg-gradient-to-br ${pkg.color} bg-clip-text flex-shrink-0`}>
                      {pkg.icon}
                    </div>
                    
                    {/* Package Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.type}</h3>
                      <div className="flex flex-wrap gap-2">
                        {pkg.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/80 text-gray-700 rounded-full text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 