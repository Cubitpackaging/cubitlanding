// EmailJS Configuration for Cubit Packaging
// These are public keys and can be safely stored in the frontend

export const EMAIL_CONFIG = {
  // EmailJS Service Configuration
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_69z6f0a',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'user_PUT_YOUR_PUBLIC_KEY_HERE',
  
  // Email Templates
  templates: {
    quoteForm: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_5eqkkqf',
    rushOrder: process.env.NEXT_PUBLIC_EMAILJS_RUSH_TEMPLATE_ID || 'template_rush_order'
  },
  
  // Recipient Email
  recipientEmail: 'cubitpackaging@gmail.com',
  
  // Email Settings
  settings: {
    replyTo: 'noreply@cubitpackaging.com',
    fromName: 'Cubit Packaging Website'
  }
}

// Test configuration (for development)
export const TEST_CONFIG = {
  serviceId: 'default_service',
  publicKey: 'your-public-key',
  templates: {
    quoteForm: 'template_test',
    rushOrder: 'template_test'
  }
} 