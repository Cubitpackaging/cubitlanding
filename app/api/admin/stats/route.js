import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET() {
  try {
    // Get products count from Supabase
    let productsCount = 0
    try {
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
      
      if (!error) {
        productsCount = count || 0
      }
    } catch (error) {
      // Error fetching products count
    }
    
    // Get images count from Supabase
    let imagesCount = 0
    try {
      const { count, error } = await supabase
        .from('images')
        .select('*', { count: 'exact', head: true })
      
      if (!error) {
        imagesCount = count || 0
      }
    } catch (error) {
      // Error fetching images count
    }
    
    // Get quotes count from Supabase
    let quotesCount = 0
    try {
      const { count, error } = await supabase
        .from('quotes')
        .select('*', { count: 'exact', head: true })
      
      if (!error) {
        quotesCount = count || 0
      }
    } catch (error) {
      // Fall back to file system if Supabase fails
      const quotesPath = path.join(dataDir, 'quotes.json')
      if (fs.existsSync(quotesPath)) {
        const quotesData = JSON.parse(fs.readFileSync(quotesPath, 'utf8'))
        if (Array.isArray(quotesData)) {
          quotesCount = quotesData.length
        } else if (quotesData && Array.isArray(quotesData.quotes)) {
          quotesCount = quotesData.quotes.length
        }
      }
    }

    // Get rush orders count from Supabase
    let rushOrdersCount = 0
    try {
      const { count, error } = await supabase
        .from('rush_orders')
        .select('*', { count: 'exact', head: true })
      
      if (!error) {
        rushOrdersCount = count || 0
      }
    } catch (error) {
      // Fall back to file system if Supabase fails
      const rushOrdersPath = path.join(dataDir, 'rush-orders.json')
      if (fs.existsSync(rushOrdersPath)) {
        const rushOrdersData = JSON.parse(fs.readFileSync(rushOrdersPath, 'utf8'))
        if (Array.isArray(rushOrdersData)) {
          rushOrdersCount = rushOrdersData.length
        }
      }
    }

    const stats = {
      totalProducts: productsCount,
      totalImages: imagesCount,
      totalQuotes: quotesCount,
      totalRushOrders: rushOrdersCount
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { totalProducts: 0, totalImages: 0, totalQuotes: 0, totalRushOrders: 0 },
      { status: 200 }
    )
  }
}