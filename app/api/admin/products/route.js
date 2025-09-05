import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET() {
  try {
    // Fetch regular products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (productsError) {
      throw productsError
    }
    
    // Fetch industry products
    const { data: industryProducts, error: industryError } = await supabase
      .from('industry_products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (industryError) {
      throw industryError
    }
    
    return NextResponse.json({
      products: products || [],
      industryProducts: industryProducts || []
    })
  } catch (error) {
    return NextResponse.json({ products: [], industryProducts: [] })
  }
}

export async function POST(request) {
  try {
    const newProduct = await request.json()
    
    // Prepare product data
    const productData = {
      name: newProduct.name,
      description: newProduct.description,
      full_description: newProduct.fullDescription,
      category: newProduct.category,
      moq: newProduct.moq || newProduct.minOrder,
      features: newProduct.features,
      specifications: newProduct.specifications,
      popular: newProduct.popular || false,
      bestseller: newProduct.bestseller || false,
      image_id: newProduct.imageId,
      type: newProduct.type
    }
    
    let result
    
    // Insert into appropriate table
    if (newProduct.type === 'industryProducts') {
      const { data, error } = await supabase
        .from('industry_products')
        .insert([productData])
        .select()
        .single()
      
      if (error) throw error
      result = data
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single()
      
      if (error) throw error
      result = data
    }
    
    return NextResponse.json({ success: true, product: result })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}