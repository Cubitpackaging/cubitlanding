'use client'

const WhyChoose = () => {
  const valueBlocks = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      title: "We Get Founders, Not Just Files",
      description: "You're not just placing an order, you're building a brand. We walk with you from your first sketch to scale, helping you avoid overwhelm, misprints, and wasted spend."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Packaging That Converts, Not Just Protects",
      description: "We combine stunning design with interactive tech like QR and NFC so your packaging doesn't just arrive, it performs. Drive reorders, tell your story, and capture attention from the moment of unboxing."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      title: "Low Minimums, Zero Limitations",
      description: "You don't need big budgets to have big-brand impact. Whether you're testing a new product or launching your flagship, we adapt to your volume and vision."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h16a2 2 0 002-2v-4a2 2 0 00-2-2h-5L9 14" />
        </svg>
      ),
      title: "Design Help That Doesn't Cost You More",
      description: "You'll never feel stuck in a design tool or PDF again. Our in-house creatives refine your layout, guide your print prep, and even help position QR codes free of charge."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Sustainability That Speaks for Itself",
      description: "Eco-friendly packaging is no longer optional, it's expected. We offer sustainable materials and help you tell that story with transparency through scan-to-learn features built into your box."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Your Brand. Your Box. Your Control.",
      description: "Cubit is your silent backstage partner, giving you everything you need to ship faster, look better, and grow smarter. All with no guesswork, hidden fees, or long lead times."
    }
  ]

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-gray-900 mb-6">
            Why Brands Trust <span className="text-gradient">Cubit</span> for Custom Packaging
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              Your packaging isn't just a box, it's your customer's first impression, your silent salesperson, and your most powerful retention tool.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              That's why the smartest brands choose Cubit.
            </p>
          </div>
        </div>

        {/* Value Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {valueBlocks.map((block, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                {block.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{block.title}</h3>
              <p className="text-gray-600 leading-relaxed">{block.description}</p>
            </div>
          ))}
        </div>

        {/* CTA/Closer Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
              "Our customers don't just comment on the product, they post about the packaging."
            </blockquote>
            <p className="text-xl text-gray-700 mb-6">
              That's what you get with Cubit. Let's build yours.
            </p>
          </div>
        </div>


      </div>
    </section>
  )
}

export default WhyChoose 