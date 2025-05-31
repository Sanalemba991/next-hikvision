import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import ContactEnquiry from '@/models/ContactEnquiry'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    if (!status || !['pending', 'responded', 'closed'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required' },
        { status: 400 }
      )
    }

    await dbConnect()

    const enquiry = await ContactEnquiry.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    )

    if (!enquiry) {
      return NextResponse.json(
        { error: 'Contact enquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      enquiry
    })

  } catch (error) {
    console.error('Update contact enquiry error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const enquiry = await ContactEnquiry.findById(params.id)

    if (!enquiry) {
      return NextResponse.json(
        { error: 'Contact enquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      enquiry
    })

  } catch (error) {
    console.error('Fetch contact enquiry error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}