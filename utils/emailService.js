import emailjs from '@emailjs/browser'
import { EMAIL_CONFIG } from './emailConfig'

// Initialize EmailJS
export const initEmailJS = () => {
  try {
    emailjs.init(EMAIL_CONFIG.publicKey)
    console.log('EmailJS initialized successfully')
    return true
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error)
    return false
  }
}

// Send Quote Form Email
export const sendQuoteFormEmail = async (formData) => {
  try {
    // Initialize EmailJS if not already done
    initEmailJS()

    const templateParams = {
      to_email: EMAIL_CONFIG.recipientEmail,
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'Not specified',
      packaging_type: formData.packagingType,
      quantity: formData.quantity || 'Not specified',
      message: formData.message || 'No additional details provided',
      submission_type: 'Quote Request',
      submission_date: new Date().toLocaleDateString(),
      submission_time: new Date().toLocaleTimeString(),
      reply_to: formData.email
    }

    console.log('Sending quote form email with params:', templateParams)

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templates.quoteForm,
      templateParams
    )

    console.log('Quote form email sent successfully:', response)
    return { success: true, response }
  } catch (error) {
    console.error('Error sending quote form email:', error)
    return { success: false, error: error.message || 'Failed to send email' }
  }
}

// Send Rush Order Email
export const sendRushOrderEmail = async (formData) => {
  try {
    // Initialize EmailJS if not already done
    initEmailJS()

    const urgencyLevels = {
      'standard': '7-10 Business Days',
      'rush': '3-5 Business Days',
      'urgent': '1-2 Business Days',
      'same-day': 'Same Day Quote'
    }

    const templateParams = {
      to_email: EMAIL_CONFIG.recipientEmail,
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      company: formData.company || 'Not specified',
      packaging_type: formData.packagingType,
      quantity: formData.quantity,
      dimensions: formData.dimensions || 'Not specified',
      colors: formData.colors || 'Not specified',
      material: formData.material || 'Not specified',
      finish_options: formData.finishOptions || 'Not specified',
      deadline: formData.deadline,
      urgency_level: urgencyLevels[formData.urgencyLevel] || formData.urgencyLevel,
      project_description: formData.projectDescription,
      special_requirements: formData.specialRequirements || 'None specified',
      files_count: formData.uploadedFiles ? formData.uploadedFiles.length : 0,
      submission_type: 'RUSH ORDER REQUEST',
      submission_date: new Date().toLocaleDateString(),
      submission_time: new Date().toLocaleTimeString(),
      reply_to: formData.email
    }

    console.log('Sending rush order email with params:', templateParams)

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templates.rushOrder,
      templateParams
    )

    console.log('Rush order email sent successfully:', response)
    return { success: true, response }
  } catch (error) {
    console.error('Error sending rush order email:', error)
    return { success: false, error: error.message || 'Failed to send email' }
  }
}

// Generic email sender for any form
export const sendFormEmail = async (formType, formData) => {
  switch (formType) {
    case 'quote':
      return await sendQuoteFormEmail(formData)
    case 'rush-order':
      return await sendRushOrderEmail(formData)
    default:
      console.error('Unknown form type:', formType)
      return { success: false, error: 'Unknown form type' }
  }
}

// Test email functionality
export const testEmailService = async () => {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    packagingType: 'Custom Mailer Boxes',
    quantity: '100',
    message: 'This is a test email to verify the email service is working.'
  }

  console.log('Testing email service...')
  const result = await sendQuoteFormEmail(testData)
  
  if (result.success) {
    console.log('✅ Email service test passed!')
  } else {
    console.log('❌ Email service test failed:', result.error)
  }
  
  return result
} 