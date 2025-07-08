import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// GET - Retrieve all quotes
export async function GET() {
  try {
    console.log('Fetching quotes from Supabase...')
    
    const { data: quotes, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Supabase error fetching quotes:', error)
      throw error
    }
    
    console.log('Successfully fetched quotes:', quotes?.length || 0)
    
    return NextResponse.json({ 
      success: true, 
      quotes: quotes || []
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
    console.log('Creating new quote in Supabase...')
    
    const formData = await request.json()
    console.log('Quote form data:', formData)
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.packagingType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create new quote entry
    const newQuote = {
      type: 'quote',
      name: formData.name,
      email: formData.email,
      company: formData.company || '',
      packaging_type: formData.packagingType,
      quantity: formData.quantity || '',
      message: formData.message || '',
      status: 'pending',
      priority: 'normal'
    }
    
    console.log('Inserting quote into Supabase:', newQuote)
    
    const { data, error } = await supabase
      .from('quotes')
      .insert([newQuote])
      .select()
    
    if (error) {
      console.error('Supabase error saving quote:', error)
      throw error
    }
    
    console.log('Quote saved to Supabase successfully:', data?.[0]?.id)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Quote submitted successfully',
      id: data?.[0]?.id
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
    
    console.log('Updating quote in Supabase:', { id, status, priority })
    
    const updateData = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    updateData.updated_at = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('quotes')
      .update(updateData)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Supabase error updating quote:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Quote not found' },
        { status: 404 }
      )
    }
    
    console.log('Quote updated successfully in Supabase')
    
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
    
    console.log('Deleting quote from Supabase:', id)
    
    const { data, error } = await supabase
      .from('quotes')
      .delete()
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Supabase error deleting quote:', error)
      throw error
    }
    
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Quote not found' },
        { status: 404 }
      )
    }
    
    console.log('Quote deleted successfully from Supabase')
    
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