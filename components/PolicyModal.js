'use client'

import { useState, useEffect } from 'react'

const PolicyModal = ({ isOpen, onClose, type = 'privacy' }) => {
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const privacyContent = {
    title: "Privacy Policy",
    lastUpdated: "January 7, 2025",
    sections: [
      {
        id: "information-collection",
        title: "1. Information We Collect",
        content: (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Personal Information</h4>
              <p className="text-gray-600 mb-2">When you visit our website or place an order with Cubit Packaging, we collect:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Name, email address, phone number, and business information</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Order details, packaging specifications, and custom design requirements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Automatically Collected Information</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>IP address, browser type, and device information</li>
                <li>Pages viewed, time spent on pages, and navigation patterns</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: "information-use",
        title: "2. How We Use Your Information",
        content: (
          <div>
            <p className="text-gray-600 mb-3">We use the information we collect for:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Processing and fulfilling your custom packaging orders</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Sending order confirmations and shipping updates</li>
              <li>Improving our website, products, and services</li>
              <li>Sending marketing communications (with your consent)</li>
              <li>Preventing fraud and ensuring website security</li>
            </ul>
          </div>
        )
      },
      {
        id: "information-sharing",
        title: "3. Information Sharing",
        content: (
          <div>
            <p className="text-gray-600 mb-3">We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li><strong>Service Providers:</strong> For order processing, shipping, and payment processing</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
            </ul>
          </div>
        )
      },
      {
        id: "data-security",
        title: "4. Data Security",
        content: (
          <div>
            <p className="text-gray-600 mb-3">We protect your information using:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>SSL encryption for data transmission</li>
              <li>Secure servers with firewall protection</li>
              <li>Regular security audits and updates</li>
              <li>PCI DSS compliance for payment processing</li>
            </ul>
          </div>
        )
      },
      {
        id: "your-rights",
        title: "5. Your Rights",
        content: (
          <div>
            <p className="text-gray-600 mb-3">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
            <p className="text-gray-600 mt-3">Contact us at hi@cubitpackaging.com to exercise these rights.</p>
          </div>
        )
      },
      {
        id: "contact",
        title: "6. Contact Information",
        content: (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 mb-3">For privacy-related questions, contact us:</p>
            <div className="space-y-1 text-gray-700">
              <p><strong>Cubit Packaging</strong></p>
              <p>Email: hi@cubitpackaging.com</p>
              <p>Phone: 510-203-8855</p>
              <p>Address: Fremont, CA</p>
            </div>
          </div>
        )
      }
    ]
  }

  const termsContent = {
    title: "Terms of Service",
    lastUpdated: "January 7, 2025",
    sections: [
      {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        content: (
          <div>
            <p className="text-gray-600">
              By accessing our website or placing an order with Cubit Packaging, you agree to be bound by these Terms. 
              We reserve the right to update these Terms at any time. Your continued use constitutes acceptance of updated Terms.
            </p>
          </div>
        )
      },
      {
        id: "services",
        title: "2. Our Services",
        content: (
          <div>
            <p className="text-gray-600 mb-3">Cubit Packaging provides custom packaging solutions including:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Custom printed boxes and mailers</li>
              <li>Eco-friendly packaging materials</li>
              <li>Smart packaging with digital integration</li>
              <li>Mylar bags and flexible packaging</li>
              <li>Design and prototyping services</li>
            </ul>
          </div>
        )
      },
      {
        id: "ordering",
        title: "3. Ordering and Payment",
        content: (
          <div>
            <p className="text-gray-600 mb-3">Order terms:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>All orders subject to acceptance by Cubit Packaging</li>
              <li>Prices quoted in USD and subject to change</li>
              <li>Payment terms: typically 50% deposit, 50% on completion</li>
              <li>Custom quotes valid for 30 days</li>
              <li>Minimum order quantities (MOQs) apply to most products</li>
            </ul>
          </div>
        )
      },
      {
        id: "production",
        title: "4. Production and Quality",
        content: (
          <div>
            <p className="text-gray-600 mb-3">Production standards:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Digital proofs provided for approval before production</li>
              <li>Customer must approve proofs within 5 business days</li>
              <li>Industry-standard tolerances apply (±10% color, ±1/16" dimensions)</li>
              <li>Production times are estimates and begin after proof approval</li>
            </ul>
          </div>
        )
      },
      {
        id: "returns",
        title: "5. Returns and Cancellations",
        content: (
          <div>
            <p className="text-gray-600 mb-3">Return policy:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Custom orders cannot be cancelled once production begins</li>
              <li>Returns accepted only for defective products or our errors</li>
              <li>Claims must be made within 30 days of delivery</li>
              <li>Customer-approved proofs constitute acceptance</li>
            </ul>
          </div>
        )
      },
      {
        id: "liability",
        title: "6. Limitation of Liability",
        content: (
          <div>
            <p className="text-gray-600 mb-3">Liability limitations:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Total liability limited to amount paid for specific order</li>
              <li>Not liable for indirect or consequential damages</li>
              <li>Not responsible for delays beyond our control</li>
              <li>Defective product liability limited to replacement or refund</li>
            </ul>
          </div>
        )
      },
      {
        id: "contact",
        title: "7. Contact Information",
        content: (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 mb-3">For questions about these Terms:</p>
            <div className="space-y-1 text-gray-700">
              <p><strong>Cubit Packaging</strong></p>
              <p>Email: hi@cubitpackaging.com</p>
              <p>Phone: 510-203-8855</p>
              <p>WhatsApp: +1 (510) 203-8855</p>
            </div>
          </div>
        )
      }
    ]
  }

  const content = type === 'privacy' ? privacyContent : termsContent

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                  {content.title}
                </span>
              </h2>
              <p className="text-sm text-gray-500">Last updated: {content.lastUpdated}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex">
            {/* Table of Contents - Hidden on mobile */}
            <div className="hidden lg:block w-64 bg-gray-50 border-r border-gray-200 p-4 max-h-[calc(90vh-80px)] overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contents</h3>
              <nav className="space-y-1">
                {content.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
              <div className="space-y-8">
                {content.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`${activeSection && activeSection !== section.id ? 'hidden lg:block' : ''}`}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                    <div className="text-gray-600 leading-relaxed">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 Cubit Packaging. All rights reserved.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicyModal 