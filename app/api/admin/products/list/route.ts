import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

// GET - Fetch products list for dropdown
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const products = await Product.find({ isActive: true })
      .select('_id name image category')
      .sort({ name: 1 })
    
    return NextResponse.json({
      success: true,
      products
    })

  } catch (error) {
    console.error('Products list fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products list' },
      { status: 500 }
    )
  }
}