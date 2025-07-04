import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'products.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(dataPath)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({ products: [], industryProducts: [] }, null, 2))
  }
}

function readProducts() {
  ensureDataDir()
  const data = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(data)
}

function writeProducts(data) {
  ensureDataDir()
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

export async function GET() {
  try {
    const products = readProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error reading products:', error)
    return NextResponse.json({ products: [], industryProducts: [] })
  }
}

export async function POST(request) {
  try {
    const newProduct = await request.json()
    const products = readProducts()
    
    // Add ID and timestamp
    newProduct.id = Date.now().toString()
    newProduct.createdAt = new Date().toISOString()
    
    // Add to appropriate array
    if (newProduct.type === 'industryProducts') {
      products.industryProducts.push(newProduct)
    } else {
      products.products.push(newProduct)
    }
    
    writeProducts(products)
    
    return NextResponse.json({ success: true, product: newProduct })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
} 