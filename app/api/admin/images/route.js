import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function readImages() {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error reading images from Supabase:', error)
    return { images: [] }
  }
  
  // Transform data to include url and name fields for frontend compatibility
  const transformedData = (data || []).map(image => ({
    ...image,
    url: `/uploads/${image.filename}`,
    name: image.original_name || image.filename,
    createdAt: image.created_at
  }))
  
  return { images: transformedData }
}

export async function GET() {
  try {
    const data = await readImages()
    return NextResponse.json({ success: true, images: data.images })
  } catch (error) {
    console.error('Error reading images:', error)
    return NextResponse.json({ success: false, images: [] })
  }
}