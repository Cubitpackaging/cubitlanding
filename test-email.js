// Test script for EmailJS functionality
// Run this in browser console after EmailJS is configured

import { testEmailService } from './utils/emailService.js'

// Test the email service
console.log('Testing email service...')
testEmailService()
  .then(result => {
    if (result.success) {
      console.log('✅ Email test successful!')
    } else {
      console.error('❌ Email test failed:', result.error)
    }
  })
  .catch(error => {
    console.error('❌ Email test error:', error)
  })

// Manual test data
const testQuoteData = {
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Test Company',
  packagingType: 'Custom Mailer Boxes',
  quantity: '500',
  message: 'This is a test quote request to verify email functionality.'
}

const testRushOrderData = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '+1-555-0123',
  company: 'Urgent Corp',
  packagingType: 'Folding Cartons',
  quantity: '1000',
  dimensions: '10x8x3 inches',
  colors: '4-color process',
  material: 'Corrugated Cardboard',
  finishOptions: 'Matte Finish',
  deadline: '2024-02-15',
  urgencyLevel: 'urgent',
  projectDescription: 'Test rush order for email functionality verification.',
  specialRequirements: 'Food-safe materials required',
  uploadedFiles: []
}

// Uncomment to test manually:
// import { sendQuoteFormEmail, sendRushOrderEmail } from './utils/emailService.js'
// sendQuoteFormEmail(testQuoteData)
// sendRushOrderEmail(testRushOrderData) 