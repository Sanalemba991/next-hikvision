import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import { z } from 'zod'

const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, 'Password must be at least 8 characters').optional(),
})

// GET - Get user profile
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await dbConnect()
    
    const user = await User.findOne({ email: session.user.email }).select('-password')
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('Profile API - User image:', user.image);
    console.log('Profile API - Session image:', session.user.image);

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        phone: user.phone,
        image: user.image || session.user.image, // Fallback to session image
        provider: user.provider,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = updateProfileSchema.parse(body)

    await dbConnect()
    
    const user = await User.findOne({ email: session.user.email })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Handle password update
    if (validatedData.newPassword && validatedData.currentPassword) {
      if (!user.password) {
        return NextResponse.json(
          { error: 'Cannot update password for social login users' },
          { status: 400 }
        )
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        validatedData.currentPassword,
        user.password
      )

      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        )
      }

      validatedData.newPassword = await bcrypt.hash(validatedData.newPassword, 12)
    }

    // Update user data
    const updateData: any = {}
    
    if (validatedData.firstName) updateData.firstName = validatedData.firstName
    if (validatedData.lastName) updateData.lastName = validatedData.lastName
    if (validatedData.company) updateData.company = validatedData.company
    if (validatedData.phone) updateData.phone = validatedData.phone
    if (validatedData.newPassword) updateData.password = validatedData.newPassword
    
    // Update name field if firstName or lastName changed
    if (validatedData.firstName || validatedData.lastName) {
      updateData.name = `${validatedData.firstName || user.firstName || ''} ${validatedData.lastName || user.lastName || ''}`.trim()
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      updateData,
      { new: true, select: '-password' }
    )

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        company: updatedUser.company,
        phone: updatedUser.phone,
        image: updatedUser.image,
        provider: updatedUser.provider,
        updatedAt: updatedUser.updatedAt,
      }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}