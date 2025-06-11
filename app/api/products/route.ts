import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const subCategory = searchParams.get('subCategory') || ''
    const sortBy = searchParams.get('sortBy') || 'newest'

    // Build query
    const query: any = { isActive: true }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { subCategory: { $regex: search, $options: 'i' } }
      ]
    }

    if (category) {
      query.category = category
    }

    if (subCategory) {
      query.subCategory = subCategory
    }

    // Sort options
    let sortOption: any = { createdAt: -1 }
    switch (sortBy) {
      case 'oldest':
        sortOption = { createdAt: 1 }
        break
      case 'name_asc':
        sortOption = { name: 1 }
        break
      case 'name_desc':
        sortOption = { name: -1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(query)
    const totalPages = Math.ceil(totalProducts / limit)

    // Get products with pagination
    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-__v')
      .lean()

    // Get all unique categories and subcategories for filters
    const allCategories = await Product.distinct('category', { isActive: true })
    const allSubCategories = category 
      ? await Product.distinct('subCategory', { isActive: true, category })
      : await Product.distinct('subCategory', { isActive: true })

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      categories: allCategories,
      subCategories: allSubCategories
    })

  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}