import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'images.json')
const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

function readImages() {
  const data = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(data)
}

function writeImages(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const images = readImages()
    
    // Find image
    const imageIndex = images.images.findIndex(img => img.id === id)
    if (imageIndex === -1) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    const image = images.images[imageIndex]
    
    // Delete file from filesystem
    const filepath = path.join(uploadsDir, image.filename)
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }

    // Remove from images array
    images.images.splice(imageIndex, 1)
    writeImages(images)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
} 