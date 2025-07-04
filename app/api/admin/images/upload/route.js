import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'images.json')
const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

function ensureDirectories() {
  // Ensure data directory exists
  const dataDir = path.dirname(dataPath)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({ images: [] }, null, 2))
  }

  // Ensure uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }
}

function readImages() {
  ensureDirectories()
  const data = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(data)
}

function writeImages(data) {
  ensureDirectories()
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

export async function POST(request) {
  try {
    ensureDirectories()
    
    const formData = await request.formData()
    const file = formData.get('file')
    const name = formData.get('name') || file.name

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const filename = `${timestamp}${extension}`
    const filepath = path.join(uploadsDir, filename)

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    fs.writeFileSync(filepath, buffer)

    // Create image record
    const imageRecord = {
      id: timestamp.toString(),
      name: name,
      filename: filename,
      url: `/uploads/${filename}`,
      size: file.size,
      type: file.type,
      createdAt: new Date().toISOString()
    }

    // Save to images.json
    const images = readImages()
    images.images.push(imageRecord)
    writeImages(images)

    return NextResponse.json({ 
      success: true, 
      image: imageRecord 
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
} 