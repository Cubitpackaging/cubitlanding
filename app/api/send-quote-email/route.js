// API Route for Quote Form Email Sending
// This handles quote requests and sends them to your Gmail

import { NextResponse } from 'next/server'
import { sendEmail, EMAIL_TEMPLATES } from '../../../utils/gmailConfig'

export async function POST(request) {
  try {
    console.log('Quote email API called')
    
    const formData = await request.json()
    console.log('Form data received:', formData)
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    console.log('Validation passed, creating email content...')
    
    // Create email content
    const emailData = EMAIL_TEMPLATES.quoteRequest(formData)
    console.log('Email template created:', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject
    })
    
    // Check environment variables
    console.log('Environment check:', {
      GMAIL_USER: process.env.GMAIL_USER ? 'Set' : 'Not set',
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set'
    })
    
    console.log('Attempting to send email...')
    
    // Send email
    const result = await sendEmail(emailData)
    console.log('Email send result:', result)
    
    if (result.success) {
      console.log('Email sent successfully!')
      return NextResponse.json({
        success: true,
        message: 'Quote request sent successfully!',
        messageId: result.messageId
      })
    } else {
      console.error('Email sending failed:', result.error)
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('Quote email API error:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { success: false, error: 'Failed to send quote request' },
      { status: 500 }
    )
  }
} 