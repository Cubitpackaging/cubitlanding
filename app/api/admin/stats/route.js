import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    
    // Read products
    const productsPath = path.join(dataDir, 'products.json')
    const productsData = fs.existsSync(productsPath) 
      ? JSON.parse(fs.readFileSync(productsPath, 'utf8'))
      : { products: [], industryProducts: [] }
    
    // Read images
    const imagesPath = path.join(dataDir, 'images.json')
    const imagesData = fs.existsSync(imagesPath)
      ? JSON.parse(fs.readFileSync(imagesPath, 'utf8'))
      : { images: [] }
    
    // Read quotes (handle both array and object formats)
    const quotesPath = path.join(dataDir, 'quotes.json')
    let quotesCount = 0
    if (fs.existsSync(quotesPath)) {
      const quotesData = JSON.parse(fs.readFileSync(quotesPath, 'utf8'))
      if (Array.isArray(quotesData)) {
        quotesCount = quotesData.length
      } else if (quotesData && Array.isArray(quotesData.quotes)) {
        quotesCount = quotesData.quotes.length
      }
    }

    const stats = {
      totalProducts: (productsData.products?.length || 0) + (productsData.industryProducts?.length || 0),
      totalImages: imagesData.images?.length || 0,
      totalQuotes: quotesCount
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json(
      { totalProducts: 0, totalImages: 0, totalQuotes: 0 },
      { status: 200 }
    )
  }
} 