import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabase'

// GET - Retrieve all rush orders
export async function GET() {
  try {
    const { data: rushOrders, error } = await supabase
      .from('rush_orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch rush orders' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      rushOrders: rushOrders || []
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rush orders' },
      { status: 500 }
    )
  }
}

// POST - Create new rush order submission
export async function POST(request) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.packagingType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create new rush order entry
    const newRushOrder = {
      type: 'rush-order',
      // Personal Details
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || '',
      
      // Project Details
      packaging_type: formData.packagingType,
      quantity: formData.quantity || '',
      dimensions: formData.dimensions || '',
      colors: formData.colors || '',
      material: formData.material || '',
      finish_options: formData.finishOptions || '',
      
      // Rush Details
      deadline: formData.deadline || '',
      urgency_level: formData.urgencyLevel || 'standard',
      project_description: formData.projectDescription || '',
      special_requirements: formData.specialRequirements || '',
      
      // Files
      files_count: formData.uploadedFiles ? formData.uploadedFiles.length : 0,
      
      // Status
      status: 'pending',
      priority: formData.urgencyLevel === 'same-day' ? 'urgent' : 
                formData.urgencyLevel === 'urgent' ? 'high' : 
                formData.urgencyLevel === 'rush' ? 'medium' : 'normal'
    }
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('rush_orders')
      .insert([newRushOrder])
      .select()
    
    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to save rush order' },
        { status: 500 }
      )
    }
    

    
    return NextResponse.json({ 
      success: true, 
      message: 'Rush order submitted successfully',
      id: data[0].id
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save rush order' },
      { status: 500 }
    )
  }
}

// PUT - Update rush order status
export async function PUT(request) {
  try {
    const { id, status, priority } = await request.json()
    
    const updateData = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    
    const { data, error } = await supabase
      .from('rush_orders')
      .update(updateData)
      .eq('id', id)
      .select()
    
    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to update rush order' },
        { status: 500 }
      )
    }
    
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Rush order not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Rush order updated successfully' 
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update rush order' },
      { status: 500 }
    )
  }
}

// DELETE - Delete rush order
export async function DELETE(request) {
  try {
    const { id } = await request.json()
    
    const { data, error } = await supabase
      .from('rush_orders')
      .delete()
      .eq('id', id)
      .select()
    
    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete rush order' },
        { status: 500 }
      )
    }
    
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Rush order not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Rush order deleted successfully' 
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete rush order' },
      { status: 500 }
    )
  }
}