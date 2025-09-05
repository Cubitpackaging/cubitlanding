import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { createClient } from '@supabase/supabase-js'

const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function ensureUploadsDir() {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }
}

export async function POST(request) {
  try {
    ensureUploadsDir()
    
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
    const id = uuidv4()
    const extension = path.extname(file.name)
    const filename = `${id}${extension}`
    const filepath = path.join(uploadsDir, filename)

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    fs.writeFileSync(filepath, buffer)

    // Create image record
    const imageRecord = {
      id: id,
      name: name,
      filename: filename,
      url: `/uploads/${filename}`,
      size: file.size,
      type: file.type,
      created_at: new Date().toISOString()
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('images')
      .insert([imageRecord])
      .select()
      .single()

    if (error) {
      // Clean up uploaded file
      fs.unlinkSync(filepath)
      return NextResponse.json(
        { error: 'Failed to save image metadata' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      image: data 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}