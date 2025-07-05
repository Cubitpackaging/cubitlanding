import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const RUSH_ORDERS_FILE = path.join(process.cwd(), 'data', 'rush-orders.json')

// Ensure rush orders data file exists
function ensureRushOrdersFile() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  
  if (!fs.existsSync(RUSH_ORDERS_FILE)) {
    fs.writeFileSync(RUSH_ORDERS_FILE, JSON.stringify([]))
  }
}

// GET - Retrieve all rush orders
export async function GET() {
  try {
    ensureRushOrdersFile()
    const rushOrdersData = fs.readFileSync(RUSH_ORDERS_FILE, 'utf8')
    const rushOrders = JSON.parse(rushOrdersData)
    
    return NextResponse.json({ 
      success: true, 
      rushOrders: rushOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    })
  } catch (error) {
    console.error('Error fetching rush orders:', error)
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
    
    ensureRushOrdersFile()
    
    // Read existing rush orders
    const rushOrdersData = fs.readFileSync(RUSH_ORDERS_FILE, 'utf8')
    const rushOrders = JSON.parse(rushOrdersData)
    
    // Create new rush order entry
    const newRushOrder = {
      id: Date.now().toString(),
      type: 'rush-order',
      // Personal Details
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || '',
      
      // Project Details
      packagingType: formData.packagingType,
      quantity: formData.quantity || '',
      dimensions: formData.dimensions || '',
      colors: formData.colors || '',
      material: formData.material || '',
      finishOptions: formData.finishOptions || '',
      
      // Rush Details
      deadline: formData.deadline || '',
      urgencyLevel: formData.urgencyLevel || 'standard',
      projectDescription: formData.projectDescription || '',
      specialRequirements: formData.specialRequirements || '',
      
      // Files
      filesCount: formData.uploadedFiles ? formData.uploadedFiles.length : 0,
      
      // Status
      status: 'pending',
      priority: formData.urgencyLevel === 'same-day' ? 'urgent' : 
                formData.urgencyLevel === 'urgent' ? 'high' : 
                formData.urgencyLevel === 'rush' ? 'medium' : 'normal',
      
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Add to rush orders array
    rushOrders.push(newRushOrder)
    
    // Save back to file
    fs.writeFileSync(RUSH_ORDERS_FILE, JSON.stringify(rushOrders, null, 2))
    
    console.log('Rush order saved to admin panel:', newRushOrder.id)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Rush order submitted successfully',
      id: newRushOrder.id
    })
    
  } catch (error) {
    console.error('Error saving rush order:', error)
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
    
    ensureRushOrdersFile()
    
    const rushOrdersData = fs.readFileSync(RUSH_ORDERS_FILE, 'utf8')
    const rushOrders = JSON.parse(rushOrdersData)
    
    const rushOrderIndex = rushOrders.findIndex(r => r.id === id)
    if (rushOrderIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Rush order not found' },
        { status: 404 }
      )
    }
    
    // Update rush order
    if (status) rushOrders[rushOrderIndex].status = status
    if (priority) rushOrders[rushOrderIndex].priority = priority
    rushOrders[rushOrderIndex].updatedAt = new Date().toISOString()
    
    fs.writeFileSync(RUSH_ORDERS_FILE, JSON.stringify(rushOrders, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Rush order updated successfully' 
    })
    
  } catch (error) {
    console.error('Error updating rush order:', error)
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
    
    ensureRushOrdersFile()
    
    const rushOrdersData = fs.readFileSync(RUSH_ORDERS_FILE, 'utf8')
    const rushOrders = JSON.parse(rushOrdersData)
    
    const filteredRushOrders = rushOrders.filter(r => r.id !== id)
    
    if (filteredRushOrders.length === rushOrders.length) {
      return NextResponse.json(
        { success: false, error: 'Rush order not found' },
        { status: 404 }
      )
    }
    
    fs.writeFileSync(RUSH_ORDERS_FILE, JSON.stringify(filteredRushOrders, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Rush order deleted successfully' 
    })
    
  } catch (error) {
    console.error('Error deleting rush order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete rush order' },
      { status: 500 }
    )
  }
} 