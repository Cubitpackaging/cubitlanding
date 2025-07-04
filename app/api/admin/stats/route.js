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
    
    // Read quotes (if exists)
    const quotesPath = path.join(dataDir, 'quotes.json')
    const quotesData = fs.existsSync(quotesPath)
      ? JSON.parse(fs.readFileSync(quotesPath, 'utf8'))
      : { quotes: [] }

    const stats = {
      totalProducts: productsData.products.length + productsData.industryProducts.length,
      totalImages: imagesData.images.length,
      totalQuotes: quotesData.quotes.length
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