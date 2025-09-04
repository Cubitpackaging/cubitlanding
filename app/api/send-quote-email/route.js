// API Route for Quote Form Email Sending
// This handles quote requests and sends them to your Gmail

import { NextResponse } from 'next/server'
import { sendEmail, EMAIL_TEMPLATES } from '../../../utils/gmailConfig'

export async function POST(request) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    // Create email content
    const emailData = EMAIL_TEMPLATES.quoteRequest(formData)
    
    // Send email
    const result = await sendEmail(emailData)
    
    if (result.success) {
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
    return NextResponse.json(
      { success: false, error: 'Failed to send quote request' },
      { status: 500 }
    )
  }
}