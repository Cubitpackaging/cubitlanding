'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RushOrderModal from './RushOrderModal'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [rushOrderModalOpen, setRushOrderModalOpen] = useState(false)

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Request Quote', href: '#quote' },
    { name: 'Smart Packaging', href: '#smart' },
    { name: 'Sustainability', href: '#sustainability' },
    { name: 'Terms', href: '/terms-of-service', isPage: true },
    { name: 'Privacy', href: '/privacy-policy', isPage: true }
  ]

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/15102038855',
      isWhatsApp: true
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/cubitpackaging',
      iconPath: '/Instagram.svg'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/cubit-packaging',
      iconPath: '/LinkedIn.svg'
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/cubitpackaging',
      iconPath: '/facebook.svg'
    },
    {
      name: 'Pinterest',
      href: 'https://pinterest.com/cubitpackaging',
      iconPath: '/Pintrest.svg'
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@cubitpackaging',
      iconPath: '/tiktok.svg'
    }
  ]

  const scrollToSection = (href) => {
    if (href === '#') return
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLinkClick = (link) => {
    if (link.action) {
      link.action()
    } else {
      scrollToSection(link.href)
    }
  }

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,107,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(34,197,94,0.08),transparent_50%)]"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {/* Column 1 - Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3 sm:mb-4">
              <svg className="h-12 sm:h-16 md:h-20 w-auto" viewBox="0 0 375.62 164.8" xmlns="http://www.w3.org/2000/svg">
                <g>
                  {/* Green leaf - keeping original color */}
                  <polygon fill="#CDF501" points="131.23,74.39 94.81,74.39 120.62,48.57 113.54,41.48 87.41,67.6 87.41,31.09 77.39,31.09 77.39,67.6 51.27,41.48 44.18,48.57 70,74.39 33.62,74.39 33.06,74.39 33.06,84.41 33.62,84.41 81.89,84.41 82.4,84.41 82.92,84.41 131.23,84.41 131.74,84.41 131.74,74.39 "/>
                  {/* Purple/blue elements - keeping original color */}
                  <path fill="#7B6AF7" d="M82.49 112.79l0 20.93c-24.32,0 -44.59,-17.27 -49.26,-40.21l29.97 0c10.65,0 19.28,8.63 19.28,19.28l0 -0.01z"/>
                  <path fill="#7B6AF7" d="M82.49 112.79l0 20.93c24.32,0 44.59,-17.27 49.26,-40.21l-29.97 0c-10.65,0 -19.28,8.63 -19.28,19.28l0 -0.01z"/>
                  {/* Text - changed to white */}
                  <path fill="white" d="M164.35 85.05c0,-13.41 10.52,-24.07 24,-24.07 8.04,0 15.75,4.26 19.19,11.48l-8.18 4.61c-2.27,-3.99 -5.84,-6.53 -11.41,-6.53 -7.7,0 -13.27,6.12 -13.27,14.51 0,8.39 5.5,14.51 13.27,14.51 5.57,0 9.28,-2.54 11.41,-6.53l8.18 4.61c-3.44,7.22 -11.14,11.48 -19.19,11.48 -13.48,0 -24,-10.66 -24,-24.07l0 -0z"/>
                  <path fill="white" d="M232.83 89.86l0 -15.75 9.76 0 0 16.92c0,9.97 -5.91,18.01 -17.33,18.01 -11.35,0 -17.26,-8.04 -17.26,-18.01l0 -16.92 9.76 0 0 15.81c0,5.23 2.48,9.7 7.5,9.7 5.02,0 7.56,-4.47 7.56,-9.76l0 0z"/>
                  <path fill="white" d="M273.33 91.17c0,-4.81 -3.64,-8.8 -8.66,-8.8 -5.02,0 -8.66,3.99 -8.66,8.8 0,4.81 3.64,8.73 8.66,8.73 5.02,0 8.66,-3.92 8.66,-8.73zm-27.09 0l0 -32.73 9.76 0 0 17.88c2.54,-1.92 5.77,-3.16 9.21,-3.16 10.59,0 17.88,7.43 17.88,18.02 0,9.83 -7.91,17.95 -18.43,17.95 -10.59,0 -18.43,-7.63 -18.43,-17.95l0 0z"/>
                  <polygon fill="white" points="296.63,108.15 286.87,108.15 286.87,74.12 296.63,74.12 "/>
                  <path fill="white" d="M304.88 94.67l0 -12.31 -6.26 0 0 -8.25 6.26 0 0 -8.66 9.76 0 0 8.66 12.03 0 0 8.25 -12.03 0 0 12.03c0,3.78 2.27,5.98 5.84,5.98 2,0 4.54,-0.62 6.19,-1.65l0 8.73c-1.72,1.1 -4.68,1.65 -7.08,1.65 -9.83,0 -14.71,-5.91 -14.71,-14.44l0 0z"/>
                  <path fill="white" d="M330.59 102.86c0,-3.3 2.68,-6.05 6.05,-6.05 3.3,0 5.98,2.75 5.98,6.05 0,3.3 -2.68,6.05 -5.98,6.05 -3.37,0 -6.05,-2.75 -6.05,-6.05z"/>
                  {/* Green leaf in "i" dot - keeping original color */}
                  <path fill="#CDF501" d="M287.23 71.68c0,-0.42 0,-0.79 0,-1.17 0,-1.82 -0,-3.63 0,-5.45 0.01,-4.69 3.74,-8.62 8.42,-8.89 0.4,-0.02 0.8,-0 1.23,-0 0.01,0.16 0.02,0.28 0.02,0.41 0,2.08 0.01,4.16 -0,6.24 -0.02,5.05 -4.36,9.15 -9.41,8.89 -0.07,-0 -0.13,-0.01 -0.26,-0.03z"/>
                </g>
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Leading provider of eco-smart custom packaging solutions combining sustainability and innovation.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-2 sm:mb-3">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.isPage ? (
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-300 hover:text-green-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-xs sm:text-sm text-gray-300 hover:text-green-400 transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-2 sm:mb-3">Services</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><span className="text-xs sm:text-sm text-gray-300">Custom Packaging</span></li>
              <li><span className="text-xs sm:text-sm text-gray-300">Smart Technology</span></li>
              <li><span className="text-xs sm:text-sm text-gray-300">Eco-Friendly Solutions</span></li>
              <li><span className="text-xs sm:text-sm text-gray-300">Design Services</span></li>
              <li>
                <button
                  onClick={() => setRushOrderModalOpen(true)}
                  className="text-xs sm:text-sm text-gray-300 hover:text-green-400 transition-colors duration-300 text-left"
                >
                  Rush Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-2 sm:mb-3">Contact Us</h3>
            <div className="space-y-2 sm:space-y-3">
              {/* Location */}
              <a 
                href="https://g.co/kgs/bwE8LJ6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 sm:space-x-3 group hover:text-green-400 transition-colors duration-300"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors duration-300">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium text-white">Fremont, CA</div>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:hi@cubitpackaging.com" 
                className="flex items-center space-x-2 sm:space-x-3 group hover:text-green-400 transition-colors duration-300"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors duration-300">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium text-white">hi@cubitpackaging.com</div>
                </div>
              </a>

              {/* Phone */}
              <a 
                href="tel:+15102038855" 
                className="flex items-center space-x-2 sm:space-x-3 group hover:text-green-400 transition-colors duration-300"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors duration-300">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium text-white">510-203-8855</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-xs order-2 sm:order-1">
              © {currentYear} Cubit Packaging. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4 order-1 sm:order-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-all duration-300 p-1"
                  aria-label={social.name}
                >
                  {social.isWhatsApp ? (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                      <Image
                        src={social.iconPath}
                        alt={social.name}
                        width={24}
                        height={24}
                        className="w-full h-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  )}
                </a>
              ))}
            </div>
            </div>
          </div>
        </div>



      {/* Rush Order Modal */}
      <RushOrderModal 
        isOpen={rushOrderModalOpen} 
        onClose={() => setRushOrderModalOpen(false)} 
      />
    </footer>
  )
}

export default Footer