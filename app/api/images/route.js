import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// GET /api/images - Fetch all images for public website
export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const imagesPath = path.join(dataDir, 'images.json')
    
    // Read images from JSON file
    const imagesData = JSON.parse(fs.readFileSync(imagesPath, 'utf8'))
    
    // Transform data to include url field for frontend compatibility
    const transformedImages = (imagesData.images || []).map(image => ({
      ...image,
      url: `/uploads/${image.filename}`,
      name: image.originalName || image.filename
    }))
    
    return NextResponse.json({
      success: true,
      images: transformedImages
    })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}