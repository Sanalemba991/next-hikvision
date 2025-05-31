import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    // Get all users data
    const allUsers = await User.find({}).select('-password').sort({ createdAt: -1 })
    
    // Calculate statistics
    const totalUsers = allUsers.length
    const activeUsers = allUsers.filter(user => user.isActive !== false).length
    const inactiveUsers = totalUsers - activeUsers
    const googleUsers = allUsers.filter(user => user.provider === 'google').length
    const emailUsers = allUsers.filter(user => user.provider === 'credentials' || !user.provider).length
    
    // Get recent users (last 10)
    const recentUsers = allUsers.slice(0, 10).map(user => ({
      _id: user._id.toString(),
      name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User',
      email: user.email,
      provider: user.provider || 'credentials',
      createdAt: user.createdAt
    }))

    const stats = {
      totalUsers,
      activeUsers,
      inactiveUsers,
      googleUsers,
      emailUsers,
      recentUsers
    }

    return NextResponse.json({
      success: true,
      stats
    })

  } catch (error) {
    console.error('Dashboard stats fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user statistics' },
      { status: 500 }
    )
  }
}