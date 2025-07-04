import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'images.json')

function ensureDataDir() {
  const dataDir = path.dirname(dataPath)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({ images: [] }, null, 2))
  }
}

function readImages() {
  ensureDataDir()
  const data = fs.readFileSync(dataPath, 'utf8')
  return JSON.parse(data)
}

export async function GET() {
  try {
    const data = readImages()
    return NextResponse.json({ success: true, images: data.images })
  } catch (error) {
    console.error('Error reading images:', error)
    return NextResponse.json({ success: false, images: [] })
  }
} 