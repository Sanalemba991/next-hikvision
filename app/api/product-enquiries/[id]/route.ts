import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ProductEnquiry from '@/models/ProductEnquiry'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params before accessing its properties
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!['pending', 'responded', 'closed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    await dbConnect()

    const updatedEnquiry = await ProductEnquiry.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    )

    if (!updatedEnquiry) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      enquiry: updatedEnquiry
    })

  } catch (error) {
    console.error('Update enquiry error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}