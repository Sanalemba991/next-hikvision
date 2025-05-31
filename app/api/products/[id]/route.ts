import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
import ProductDetail from '@/models/ProductDetail'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Change this line
) {
  try {
    await dbConnect()
    
    // Await params before using
    const { id } = await params // Add this line
    
    // Fetch basic product info
    const product = await Product.findOne({ 
      _id: id, // Use id instead of params.id
      isActive: true 
    }).select('-__v').lean()
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Fetch detailed product information
    const productDetail = await ProductDetail.findOne({ 
      productId: id, // Use id instead of params.id
      isActive: true 
    }).select('-__v').lean()
    
    return NextResponse.json({
      success: true,
      product: {
        ...product,
        _id: (product as any)._id.toString()
      },
      productDetail: productDetail ? {
        ...productDetail,
        _id: (productDetail as any)._id.toString(),
        productId: (productDetail as any).productId.toString()
      } : null
    })

  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}