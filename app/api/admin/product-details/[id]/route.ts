import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ProductDetail from '@/models/ProductDetail'
import Product from '@/models/Product'

// GET - Fetch single product details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const productDetail = await ProductDetail.findById(params.id).populate('productId')
    
    if (!productDetail) {
      return NextResponse.json(
        { error: 'Product details not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      productDetail
    })

  } catch (error) {
    console.error('Product details fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product details' },
      { status: 500 }
    )
  }
}

// PUT - Update product details
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const {
      longDescription,
      featureImages,
      specifications,
      features,
      reviews,
      seo
    } = body
    
    // Validate required fields
    if (!longDescription || !seo?.focusKeyword) {
      return NextResponse.json(
        { error: 'Long description and SEO focus keyword are required' },
        { status: 400 }
      )
    }
    
    // Update product details
    const productDetail = await ProductDetail.findByIdAndUpdate(
      params.id,
      {
        longDescription,
        featureImages: featureImages || [],
        specifications: specifications || [],
        features: features || [],
        reviews: reviews || [],
        seo
      },
      { new: true }
    ).populate('productId')
    
    if (!productDetail) {
      return NextResponse.json(
        { error: 'Product details not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product details updated successfully',
      productDetail
    })

  } catch (error) {
    console.error('Product details update error:', error)
    return NextResponse.json(
      { error: 'Failed to update product details' },
      { status: 500 }
    )
  }
}

// DELETE - Delete product details
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const productDetail = await ProductDetail.findByIdAndDelete(params.id)
    
    if (!productDetail) {
      return NextResponse.json(
        { error: 'Product details not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product details deleted successfully'
    })

  } catch (error) {
    console.error('Product details deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product details' },
      { status: 500 }
    )
  }
}