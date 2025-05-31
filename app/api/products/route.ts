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
    
    const skip = (page - 1) * limit
    
    // Build search query
    let searchQuery: any = { isActive: true } // Only show active products
    
    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { subCategory: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (category) {
      searchQuery.category = category
    }
    
    if (subCategory) {
      searchQuery.subCategory = subCategory
    }
    
    // Build sort query
    let sortQuery: any = {}
    switch (sortBy) {
      case 'newest':
        sortQuery = { createdAt: -1 }
        break
      case 'oldest':
        sortQuery = { createdAt: 1 }
        break
      case 'name_asc':
        sortQuery = { name: 1 }
        break
      case 'name_desc':
        sortQuery = { name: -1 }
        break
      default:
        sortQuery = { createdAt: -1 }
    }
    
    // Get products with pagination
    const products = await Product.find(searchQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .select('-__v') // Exclude version field
    
    // Get total count for pagination
    const totalProducts = await Product.countDocuments(searchQuery)
    const totalPages = Math.ceil(totalProducts / limit)
    
    // Get unique categories and subcategories for filters
    const allProducts = await Product.find({ isActive: true }).select('category subCategory')
    const categories = [...new Set(allProducts.map(p => p.category))].sort()
    const subCategories = category 
      ? [...new Set(allProducts.filter(p => p.category === category).map(p => p.subCategory))].sort()
      : [...new Set(allProducts.map(p => p.subCategory))].sort()
    
    return NextResponse.json({
      success: true,
      products,
      categories,
      subCategories,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })

  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}