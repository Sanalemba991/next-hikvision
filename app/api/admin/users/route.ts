import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd verify admin authentication here
    // For now, we'll assume the admin is authenticated via localStorage check on frontend
    
    await dbConnect()
    
    // Fetch all users (excluding password field)
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 }) // Most recent first
    
    // Transform the data for better frontend consumption
    const transformedUsers = users.map(user => ({
      _id: user._id.toString(),
      name: user.name,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      phone: user.phone || '',
      company: user.company || '',
      provider: user.provider || 'credentials',
      isActive: user.isActive !== false, // Default to true if not set
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      users: transformedUsers,
      total: transformedUsers.length
    })

  } catch (error) {
    console.error('Admin users fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}