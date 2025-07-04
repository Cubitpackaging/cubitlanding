'use client'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Request Quote', href: '#quote' },
    { name: 'Smart Packaging', href: '#smart' },
    { name: 'Sustainability', href: '#sustainability' },
    { name: 'Terms', href: '#' },
    { name: 'Privacy', href: '#' }
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.013 6.71.072 5.493.131 4.67.333 3.953.63a5.612 5.612 0 00-2.051 1.303 5.612 5.612 0 00-1.303 2.051C.333 4.67.131 5.493.072 6.71.013 7.929 0 8.396 0 12.017c0 3.624.013 4.09.072 5.31.059 1.217.261 2.04.558 2.757.298.718.686 1.329 1.303 2.051.722.617 1.333 1.005 2.051 1.303.717.297 1.54.499 2.757.558 1.22.059 1.686.072 5.31.072 3.624 0 4.09-.013 5.31-.072 1.217-.059 2.04-.261 2.757-.558a5.612 5.612 0 002.051-1.303c.617-.722 1.005-1.333 1.303-2.051.297-.717.499-1.54.558-2.757.059-1.22.072-1.686.072-5.31 0-3.624-.013-4.09-.072-5.31-.059-1.217-.261-2.04-.558-2.757a5.612 5.612 0 00-1.303-2.051A5.612 5.612 0 0019.747.63C19.03.333 18.207.131 16.99.072 15.771.013 15.304 0 11.683 0h.334zm-.717 1.442h.718c3.136 0 3.554.012 4.81.07 1.160.053 1.79.249 2.207.412.555.216.95.475 1.365.89.415.415.674.81.89 1.365.163.417.359 1.047.412 2.207.058 1.256.07 1.674.07 4.81 0 3.136-.012 3.554-.07 4.81-.053 1.16-.249 1.79-.412 2.207-.216.555-.475.95-.89 1.365-.415.415-.81.674-1.365.89-.417.163-1.047.359-2.207.412-1.256.058-1.674.07-4.81.07-3.136 0-3.554-.012-4.81-.07-1.16-.053-1.79-.249-2.207-.412a3.67 3.67 0 01-1.365-.89 3.67 3.67 0 01-.89-1.365c-.163-.417-.359-1.047-.412-2.207-.058-1.256-.07-1.674-.07-4.81 0-3.136.012-3.554.07-4.81.053-1.16.249-1.79.412-2.207.216-.555.475-.95.89-1.365a3.67 3.67 0 011.365-.89c.417-.163 1.047-.359 2.207-.412 1.256-.058 1.674-.07 4.81-.07l-.718-.07z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    }
  ]

  const scrollToSection = (href) => {
    if (href === '#') return
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src="/logo.svg" 
                alt="Cubit Packaging" 
                className="h-16 md:h-20 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Leading provider of eco-smart custom packaging solutions. We combine sustainability, 
              innovation, and quality to help brands create memorable unboxing experiences.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">Fremont, CA</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400">hello@cubitpackaging.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
                <span className="text-gray-400">cubitpackaging.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Custom Packaging</span></li>
              <li><span className="text-gray-400">Smart Technology</span></li>
              <li><span className="text-gray-400">Eco-Friendly Solutions</span></li>
              <li><span className="text-gray-400">Design Services</span></li>
              <li><span className="text-gray-400">Rush Orders</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Cubit Packaging. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>


      </div>
    </footer>
  )
}

export default Footer 