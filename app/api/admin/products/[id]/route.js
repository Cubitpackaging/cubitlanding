import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const updatedProduct = await request.json()
    
    // Prepare product data
    const productData = {
      name: updatedProduct.name,
      description: updatedProduct.description,
      full_description: updatedProduct.fullDescription,
      category: updatedProduct.category,
      moq: updatedProduct.moq || updatedProduct.minOrder,
      features: updatedProduct.features,
      specifications: updatedProduct.specifications,
      popular: updatedProduct.popular || false,
      bestseller: updatedProduct.bestseller || false,
      image_id: updatedProduct.imageId,
      type: updatedProduct.type,
      updated_at: new Date().toISOString()
    }
    
    let result
    
    // Update in appropriate table
    if (updatedProduct.type === 'industryProducts') {
      const { data, error } = await supabase
        .from('industry_products')
        .update(productData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      result = data
    } else {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      result = data
    }
    
    return NextResponse.json({ success: true, product: result })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const url = new URL(request.url)
    const type = url.searchParams.get('type') || 'products'
    
    // Delete from appropriate table
    if (type === 'industryProducts') {
      const { error } = await supabase
        .from('industry_products')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}