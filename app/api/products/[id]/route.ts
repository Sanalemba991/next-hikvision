import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
import ProductDetail from '@/models/ProductDetail'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    // Fetch basic product info
    const product = await Product.findOne({ 
      _id: params.id, 
      isActive: true 
    }).select('-__v').lean()
    
    if (!product || Array.isArray(product)) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Fetch detailed product information
    const productDetail = await ProductDetail.findOne({ 
      productId: params.id,
      isActive: true 
    }).select('-__v').lean()
    
    // Debug: Log the productDetail to see what we're getting
    console.log('Product Detail:', JSON.stringify(productDetail, null, 2))
    
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