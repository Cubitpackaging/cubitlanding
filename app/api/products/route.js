import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// GET /api/products - Fetch all products for public website
export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const productsPath = path.join(dataDir, 'products.json')
    
    // Read products from JSON file
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'))
    
    return NextResponse.json({
      success: true,
      products: productsData.products || [],
      industryProducts: productsData.industryProducts || []
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}