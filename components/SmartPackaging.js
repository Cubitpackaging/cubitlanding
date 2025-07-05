'use client'

const SmartPackaging = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      title: "Customer Engagement",
      description: "Connect customers to your brand story, product information, and digital experiences."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Product Authentication",
      description: "Verify product authenticity and combat counterfeiting with secure digital certificates."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Supply Chain Tracking",
      description: "Enable full traceability from production to consumer with blockchain integration."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Analytics & Insights",
      description: "Gather valuable data on customer interactions and packaging performance."
    }
  ]

  return (
    <section id="smart" className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Make Your Packaging <span className="text-gradient">Intelligent</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Embed QR codes or NFC chips to connect physical packaging to digital microsites, 
              product stories, traceability, and more. Transform every package into a smart 
              touchpoint that engages customers and builds brand loyalty.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-secondary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                const quoteSection = document.getElementById('quote')
                if (quoteSection) {
                  quoteSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="btn-secondary text-lg px-8 py-4"
            >
              Explore Smart Features
            </button>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative w-full h-[500px] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
              {/* Main Package Visual */}
              <div className="absolute inset-8 bg-white rounded-xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center relative">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    
                    {/* QR Code */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-lg p-2 shadow-lg">
                      <div className="w-full h-full bg-gray-900 rounded grid grid-cols-4 gap-0.5 p-1">
                        {Array.from({ length: 16 }, (_, i) => {
                          // Create a static pattern instead of random
                          const pattern = [true, false, true, true, false, true, false, false, true, false, true, true, false, false, true, false]
                          return (
                            <div key={i} className={`${pattern[i] ? 'bg-white' : 'bg-gray-900'} rounded-sm`}></div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Package</h3>
                  <p className="text-gray-600">QR + NFC Enabled</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Data Flow Lines */}
              <div className="absolute top-20 right-20 w-32 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
              <div className="absolute bottom-20 left-20 w-32 h-0.5 bg-gradient-to-r from-secondary to-transparent"></div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-2xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-secondary mb-1">89%</div>
                  <div className="text-sm text-gray-600">Engagement Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary mb-1">3.2x</div>
                  <div className="text-sm text-gray-600">Brand Recall</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Data Tracking</div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default SmartPackaging 