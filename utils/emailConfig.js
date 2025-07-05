// EmailJS Configuration for Cubit Packaging
// These are public keys and can be safely stored in the frontend

export const EMAIL_CONFIG = {
  // EmailJS Service Configuration
  // TODO: Replace with your actual EmailJS credentials after following EMAIL_SETUP_GUIDE.md
  serviceId: 'service_cubit_pkg',           // Replace with your Service ID from EmailJS
  publicKey: 'YOUR_PUBLIC_KEY_HERE',        // Replace with your Public Key from EmailJS
  
  // Email Templates
  templates: {
    quoteForm: 'template_quote_req',        // Template ID for quote requests
    rushOrder: 'template_rush_order'        // Template ID for rush orders
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