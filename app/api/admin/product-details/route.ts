import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ProductDetail from '@/models/ProductDetail'
import Product from '@/models/Product'

// GET - Fetch all product details
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    
    const skip = (page - 1) * limit
    
    // Build aggregation pipeline
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      }
    ]
    
    // Add search filter if provided - REMOVE SEO SEARCH
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'product.name': { $regex: search, $options: 'i' } },
            { 'product.category': { $regex: search, $options: 'i' } },
            { 'longDescription': { $regex: search, $options: 'i' } }
            // REMOVED: { 'seo.focusKeyword': { $regex: search, $options: 'i' } }
          ]
        }
      })
    }
    
    // Add pagination
    pipeline.push(
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    )
    
    const productDetails = await ProductDetail.aggregate(pipeline)
    
    // Get total count
    const countPipeline = [...pipeline.slice(0, -2)]
    const totalCount = await ProductDetail.aggregate([
      ...countPipeline,
      { $count: 'total' }
    ])
    
    const totalProducts = totalCount[0]?.total || 0
    const totalPages = Math.ceil(totalProducts / limit)
    
    return NextResponse.json({
      success: true,
      productDetails,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })

  } catch (error) {
    console.error('Product details fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product details' },
      { status: 500 }
    )
  }
}

// POST - Create new product details
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const {
      productId,
      longDescription,
      featureImages,
      specifications,
      features,
      reviews
    } = body

    // Remove SEO validation - only check required fields
    if (!productId || !longDescription) {
      return NextResponse.json(
        { success: false, error: 'Product ID and long description are required' },
        { status: 400 }
      )
    }

    const productDetail = new ProductDetail({
      productId,
      longDescription,
      featureImages: featureImages || [],
      specifications: specifications || [],
      features: features || [],
      reviews: reviews || []
      // Remove seo field completely
    })

    await productDetail.save()
    await productDetail.populate('productId', 'name image category subCategory')

    return NextResponse.json({
      success: true,
      message: 'Product details created successfully',
      productDetail
    })

  } catch (error) {
    console.error('Product details creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product details' },
      { status: 500 }
    )
  }
}