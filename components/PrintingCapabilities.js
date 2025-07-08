'use client'
import { useState } from 'react'
import SampleKitModal from './SampleKitModal'

const PrintingCapabilities = () => {
  const [isSampleKitModalOpen, setIsSampleKitModalOpen] = useState(false)
  const printingCapabilities = [
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Digital & Offset Excellence",
      description: "Lightning-fast digital printing for short runs and premium offset for large volumes. Get vibrant CMYK or precise Pantone matching with 1600 DPI resolution that makes every detail pop.",
      highlight: "Best for: All run sizes"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Eco-Friendly Ink Innovation",
      description: "100% soy-based and water-based inks that deliver brilliant colors while protecting our planet. Food-safe, VOC-free, and fully recyclable – sustainability never looked so vibrant.",
      highlight: "Certified: FDA & EU compliant"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Premium Finishing Mastery",
      description: "Transform your packaging with soft-touch lamination, spot UV accents, metallic foils, and embossing. Create tactile experiences that customers can't resist touching and sharing.",
      highlight: "30+ finishing options"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Color Precision Guarantee",
      description: "G7 certified color management ensures your brand colors are perfect every time. Advanced proofing technology and expert color matching deliver consistency across every print run.",
      highlight: "99.9% color accuracy"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Smart Print Integration",
      description: "Seamlessly incorporate QR codes, NFC tags, and variable data printing. Every package becomes a unique, trackable, interactive experience that connects physical to digital.",
      highlight: "Unlimited personalization"
    },
    {
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Rapid Turnaround Times",
      description: "Digital printing ships in 5-7 days, offset in 10-14 days. Need it faster? Our rush service delivers premium quality in just 48-72 hours without compromising on excellence.",
      highlight: "Rush service available"
    }
  ]

  const printShowcase = [
    {
      technique: "Spot UV",
      description: "Glossy coating that creates stunning visual contrast",
      image: "/Spot UV.png",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      technique: "Metallic Foil Stamping",
      description: "Luxury that shines at first glance",
      image: "/Metallic Foil Stamping.png",
      gradient: "from-teal-500 to-green-500"
    },
    {
      technique: "Embossed/Debossed",
      description: "Raised and recessed textures that captivate touch",
      image: "/Embossing & debossing.png",
      gradient: "from-emerald-500 to-teal-500"
    }
  ]

  const scrollToQuote = () => {
    const element = document.querySelector('#quote')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openConsultationWhatsApp = () => {
    const message = `FREE PRINT CONSULTATION REQUEST

Hi! I'm interested in booking a free print consultation to discuss:

- My packaging printing needs
- Premium finishing options (spot UV, foil stamping, embossing)
- Color matching and brand consistency
- Turnaround times and rush options
- Custom design recommendations

Please let me know your availability for a consultation call.

Thank you!`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/15102038855?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section id="printing" className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.06),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(52,211,153,0.06),transparent_50%)]"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-medium mb-4 sm:mb-6">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Industry-Leading Print Technology
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Printing That <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">Powers Your Brand</span>
          </h2>
          
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-3 sm:mb-4">
              From vibrant digital prints to premium offset perfection, we combine cutting-edge technology with eco-friendly practices to deliver packaging that doesn't just protect – it performs.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">
              Every print. Every finish. Every detail. Engineered to make your brand unforgettable.
            </p>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {printingCapabilities.map((capability, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative cursor-pointer transform hover:-translate-y-1 border border-gray-100">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {capability.icon}
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-green-600 transition-colors">
                  {capability.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  {capability.description}
                </p>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  {capability.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Showcase Section */}
        <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl mb-12 sm:mb-16 border border-green-200/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Premium Finishes That Enhance Every Touch
            </h3>
            <p className="text-base sm:text-lg text-gray-700">
              Transform your packaging from ordinary to extraordinary
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {printShowcase.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-24 mb-4 rounded-xl overflow-hidden bg-white/90 shadow-inner">
                  <img 
                    src={item.image} 
                    alt={item.technique}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.technique}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-lg sm:text-xl text-gray-700 mb-8">
            Ready to see how premium printing can transform your packaging?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsSampleKitModalOpen(true)}
              className="group relative px-8 py-4 bg-white border-2 border-green-600 text-green-600 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:text-white"
            >
              <span className="relative z-10">Request a Sample Kit</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button
              onClick={openConsultationWhatsApp}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="relative z-10">Book a Free Print Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>G7 Color Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>FDA Compliant Inks</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>ISO 9001 Certified</span>
          </div>
        </div>
      </div>

      {/* Sample Kit Modal */}
      <SampleKitModal 
        isOpen={isSampleKitModalOpen} 
        onClose={() => setIsSampleKitModalOpen(false)} 
      />
    </section>
  )
}

export default PrintingCapabilities 