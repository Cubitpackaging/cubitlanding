import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'products.json')

function readProducts() {
  const data = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(data)
}

function writeProducts(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const updatedProduct = await request.json()
    const products = readProducts()
    
    updatedProduct.id = id
    updatedProduct.updatedAt = new Date().toISOString()
    
    // Find and update in appropriate array
    if (updatedProduct.type === 'industryProducts') {
      const index = products.industryProducts.findIndex(p => p.id === id)
      if (index !== -1) {
        products.industryProducts[index] = updatedProduct
      }
    } else {
      const index = products.products.findIndex(p => p.id === id)
      if (index !== -1) {
        products.products[index] = updatedProduct
      }
    }
    
    writeProducts(products)
    
    return NextResponse.json({ success: true, product: updatedProduct })
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
    
    const products = readProducts()
    
    // Remove from appropriate array
    if (type === 'industryProducts') {
      products.industryProducts = products.industryProducts.filter((_, index) => index.toString() !== id)
    } else {
      products.products = products.products.filter((_, index) => index.toString() !== id)
    }
    
    writeProducts(products)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
} 