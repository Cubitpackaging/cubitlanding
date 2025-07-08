// Gmail SMTP Configuration for Cubit Packaging
// This provides reliable email delivery directly to your Gmail

import nodemailer from 'nodemailer'

// Gmail SMTP Configuration
export const GMAIL_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD // Your Gmail App Password
  }
}

// Create reusable transporter object using Gmail SMTP
export const createGmailTransporter = () => {
  try {
    console.log('Creating nodemailer transporter with config:', {
      host: GMAIL_CONFIG.host,
      port: GMAIL_CONFIG.port,
      secure: GMAIL_CONFIG.secure,
      user: GMAIL_CONFIG.auth.user,
      passwordSet: !!GMAIL_CONFIG.auth.pass
    })
    
    if (!nodemailer || typeof nodemailer.createTransporter !== 'function') {
      throw new Error('Nodemailer is not properly imported or createTransporter is not available')
    }
    
    return nodemailer.createTransporter(GMAIL_CONFIG)
  } catch (error) {
    console.error('Error creating Gmail transporter:', error)
    throw error
  }
}

// Email Templates
export const EMAIL_TEMPLATES = {
  quoteRequest: (formData) => ({
    from: `"Cubit Packaging Website" <${process.env.GMAIL_USER}>`,
    to: 'cubitpackaging@gmail.com',
    subject: `New Quote Request from ${formData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #16a34a; margin-bottom: 20px;">New Quote Request</h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Company:</strong> ${formData.company || 'Not specified'}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Project Details</h3>
          <p><strong>Packaging Type:</strong> ${formData.packagingType}</p>
          <p><strong>Quantity:</strong> ${formData.quantity || 'Not specified'}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Additional Information</h3>
          <p><strong>Project Details:</strong></p>
          <p>${formData.message || 'No additional details provided'}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #16a34a;">
          <p style="color: #666; font-size: 14px;">
            This quote request was submitted through the Cubit Packaging website.
          </p>
        </div>
      </div>
    `
  }),

  rushOrder: (formData) => ({
    from: `"Cubit Packaging Website" <${process.env.GMAIL_USER}>`,
    to: 'cubitpackaging@gmail.com',
    subject: `🚨 RUSH ORDER REQUEST - ${formData.name} - ${formData.urgencyLevel.toUpperCase()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #dc2626; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0; text-align: center;">🚨 RUSH ORDER REQUEST</h2>
          <p style="margin: 10px 0 0 0; text-align: center;">Urgency: ${formData.urgencyLevel.toUpperCase()} - Requires Immediate Attention</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Company:</strong> ${formData.company || 'Not specified'}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Project Specifications</h3>
          <p><strong>Packaging Type:</strong> ${formData.packagingType}</p>
          <p><strong>Quantity:</strong> ${formData.quantity}</p>
          <p><strong>Dimensions:</strong> ${formData.dimensions || 'Not specified'}</p>
          <p><strong>Colors:</strong> ${formData.colors || 'Not specified'}</p>
          <p><strong>Material:</strong> ${formData.material || 'Not specified'}</p>
          <p><strong>Finish Options:</strong> ${formData.finishOptions || 'Not specified'}</p>
        </div>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Timeline & Requirements</h3>
          <p><strong>Deadline:</strong> ${formData.deadline}</p>
          <p><strong>Urgency Level:</strong> ${formData.urgencyLevel}</p>
          <p><strong>Project Description:</strong></p>
          <p>${formData.projectDescription || 'No description provided'}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Special Requirements</h3>
          <p>${formData.specialRequirements || 'None specified'}</p>
          <p><strong>Attached Files:</strong> ${formData.uploadedFiles ? formData.uploadedFiles.length : 0} file(s)</p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
          <p style="margin: 0; color: #92400e; font-weight: bold;">
            ⚡ This is a ${formData.urgencyLevel} rush order request. Please respond as soon as possible.
          </p>
        </div>
      </div>
    `
  })
}

// Send Email Function
export const sendEmail = async (emailData) => {
  try {
    console.log('Creating Gmail transporter...')
    
    // Check environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error('Gmail credentials not found in environment variables')
    }
    
    const transporter = createGmailTransporter()
    
    console.log('Verifying Gmail connection...')
    // Verify connection
    await transporter.verify()
    console.log('Gmail SMTP connection verified successfully')
    
    console.log('Sending email...')
    // Send email
    const info = await transporter.sendMail(emailData)
    console.log('Email sent successfully:', info.messageId)
    
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    console.error('Error code:', error.code)
    console.error('Error command:', error.command)
    console.error('Error response:', error.response)
    return { success: false, error: error.message }
  }
} 