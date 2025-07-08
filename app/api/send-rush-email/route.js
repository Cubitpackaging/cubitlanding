// API Route for Rush Order Email Sending
// This handles rush order requests and sends them to your Gmail

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
    const emailData = EMAIL_TEMPLATES.rushOrder(formData)
    
    // Send email
    const result = await sendEmail(emailData)
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Rush order request sent successfully!',
        messageId: result.messageId
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('Rush order email API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send rush order request' },
      { status: 500 }
    )
  }
} 