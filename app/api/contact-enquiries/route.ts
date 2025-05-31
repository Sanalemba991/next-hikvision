import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { ContactEnquiry } from '@/models/ContactEnquiry'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required' },
        { status: 400 }
      )
    }

    await dbConnect()

    // Create contact enquiry
    const enquiry = new ContactEnquiry({
      name,
      email,
      phone: phone || '',
      company: company || '',
      subject,
      message,
      status: 'pending'
    })

    await enquiry.save()

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      enquiryId: enquiry._id
    })

  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const enquiries = await ContactEnquiry.find({})
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      enquiries
    })

  } catch (error) {
    console.error('Fetch contact enquiries error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}