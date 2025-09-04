import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    // Get image from Supabase
    const { data: image, error: fetchError } = await supabase
      .from('images')
      .select('*')
      .eq('id', id)
      .single()
    
    if (fetchError || !image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }
    
    // Delete file from filesystem
    const filepath = path.join(uploadsDir, image.filename)
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }

    // Delete from Supabase
    const { error: deleteError } = await supabase
      .from('images')
      .delete()
      .eq('id', id)
    
    if (deleteError) {
      throw deleteError
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}