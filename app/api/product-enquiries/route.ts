import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import dbConnect from '@/lib/mongodb'
import ProductEnquiry from '@/models/ProductEnquiry'
import User from '@/models/User'

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, productName, message } = body

    if (!productId || !productName || !message) {
      return NextResponse.json(
        { error: 'Product ID, name, and message are required' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Find user details from database
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create enquiry
    const enquiry = new ProductEnquiry({
      productId,
      productName,
      message,
      userDetails: {
        userId: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        company: user.company || ''
      },
      status: 'pending'
    })

    await enquiry.save()

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      enquiryId: enquiry._id
    })

  } catch (error) {
    console.error('Enquiry submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    // Option 1: Without populate (simpler)
    const enquiries = await ProductEnquiry.find({})
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      enquiries
    })

  } catch (error) {
    console.error('Fetch enquiries error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}