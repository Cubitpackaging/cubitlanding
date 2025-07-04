import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// GET /api/images - Fetch all images for public website
export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'images.json')
    
    // Create data directory and file if they don't exist
    if (!fs.existsSync(path.dirname(dataPath))) {
      fs.mkdirSync(path.dirname(dataPath), { recursive: true })
    }
    
    if (!fs.existsSync(dataPath)) {
      const initialData = { images: [] }
      fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2))
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    
    return NextResponse.json({
      success: true,
      images: data.images || []
    })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
} 