import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const QUOTES_FILE = path.join(process.cwd(), 'data', 'quotes.json')

// Ensure quotes data file exists
function ensureQuotesFile() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  
  if (!fs.existsSync(QUOTES_FILE)) {
    fs.writeFileSync(QUOTES_FILE, JSON.stringify([]))
  }
}

// GET - Retrieve all quotes
export async function GET() {
  try {
    ensureQuotesFile()
    const quotesData = fs.readFileSync(QUOTES_FILE, 'utf8')
    const quotes = JSON.parse(quotesData)
    
    return NextResponse.json({ 
      success: true, 
      quotes: quotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    })
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}

// POST - Create new quote submission
export async function POST(request) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.packagingType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    ensureQuotesFile()
    
    // Read existing quotes
    const quotesData = fs.readFileSync(QUOTES_FILE, 'utf8')
    const quotes = JSON.parse(quotesData)
    
    // Create new quote entry
    const newQuote = {
      id: Date.now().toString(),
      type: 'quote',
      name: formData.name,
      email: formData.email,
      company: formData.company || '',
      packagingType: formData.packagingType,
      quantity: formData.quantity || '',
      message: formData.message || '',
      status: 'pending',
      priority: 'normal',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Add to quotes array
    quotes.push(newQuote)
    
    // Save back to file
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2))
    
    console.log('Quote saved to admin panel:', newQuote.id)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Quote submitted successfully',
      id: newQuote.id
    })
    
  } catch (error) {
    console.error('Error saving quote:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save quote' },
      { status: 500 }
    )
  }
}

// PUT - Update quote status
export async function PUT(request) {
  try {
    const { id, status, priority } = await request.json()
    
    ensureQuotesFile()
    
    const quotesData = fs.readFileSync(QUOTES_FILE, 'utf8')
    const quotes = JSON.parse(quotesData)
    
    const quoteIndex = quotes.findIndex(q => q.id === id)
    if (quoteIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Quote not found' },
        { status: 404 }
      )
    }
    
    // Update quote
    if (status) quotes[quoteIndex].status = status
    if (priority) quotes[quoteIndex].priority = priority
    quotes[quoteIndex].updatedAt = new Date().toISOString()
    
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Quote updated successfully' 
    })
    
  } catch (error) {
    console.error('Error updating quote:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update quote' },
      { status: 500 }
    )
  }
}

// DELETE - Delete quote
export async function DELETE(request) {
  try {
    const { id } = await request.json()
    
    ensureQuotesFile()
    
    const quotesData = fs.readFileSync(QUOTES_FILE, 'utf8')
    const quotes = JSON.parse(quotesData)
    
    const filteredQuotes = quotes.filter(q => q.id !== id)
    
    if (filteredQuotes.length === quotes.length) {
      return NextResponse.json(
        { success: false, error: 'Quote not found' },
        { status: 404 }
      )
    }
    
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(filteredQuotes, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Quote deleted successfully' 
    })
    
  } catch (error) {
    console.error('Error deleting quote:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete quote' },
      { status: 500 }
    )
  }
} 