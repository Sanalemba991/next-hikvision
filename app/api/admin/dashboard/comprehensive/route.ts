import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Product from '@/models/Product'
import ProductEnquiry from '@/models/ProductEnquiry'
import ContactEnquiry from '@/models/ContactEnquiry'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    // Get date ranges for growth calculation
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

    // User Statistics
    const userStats = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'inactive' }),
      User.countDocuments({ provider: 'google' }),
      User.countDocuments({ provider: 'credentials' }),
      User.find({}).sort({ createdAt: -1 }).limit(10).lean(),
      User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      User.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } })
    ])

    const userGrowth = userStats[7] > 0 ? 
      Math.round(((userStats[6] - userStats[7]) / userStats[7]) * 100) : 
      userStats[6] > 0 ? 100 : 0

    // Product Statistics
    const productStats = await Promise.all([
      Product.countDocuments({}),
      Product.countDocuments({ status: 'active' }),
      Product.countDocuments({ status: 'inactive' }),
      Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      Product.find({}).sort({ createdAt: -1 }).limit(10).lean(),
      Product.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Product.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } })
    ])

    const productGrowth = productStats[6] > 0 ? 
      Math.round(((productStats[5] - productStats[6]) / productStats[6]) * 100) : 
      productStats[5] > 0 ? 100 : 0

    // Product Enquiry Statistics
    const productEnquiryStats = await Promise.all([
      ProductEnquiry.countDocuments({}),
      ProductEnquiry.countDocuments({ status: 'pending' }),
      ProductEnquiry.countDocuments({ status: 'responded' }),
      ProductEnquiry.countDocuments({ status: 'closed' }),
      ProductEnquiry.find({})
        .populate('productId', 'name')
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
      ProductEnquiry.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      ProductEnquiry.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } })
    ])

    const productEnquiryGrowth = productEnquiryStats[6] > 0 ? 
      Math.round(((productEnquiryStats[5] - productEnquiryStats[6]) / productEnquiryStats[6]) * 100) : 
      productEnquiryStats[5] > 0 ? 100 : 0

    // Contact Enquiry Statistics
    const contactEnquiryStats = await Promise.all([
      ContactEnquiry.countDocuments({}),
      ContactEnquiry.countDocuments({ status: 'pending' }),
      ContactEnquiry.countDocuments({ status: 'responded' }),
      ContactEnquiry.countDocuments({ status: 'closed' }),
      ContactEnquiry.aggregate([
        {
          $group: {
            _id: '$subject',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      ContactEnquiry.find({}).sort({ createdAt: -1 }).limit(10).lean(),
      ContactEnquiry.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      ContactEnquiry.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } })
    ])

    const contactEnquiryGrowth = contactEnquiryStats[7] > 0 ? 
      Math.round(((contactEnquiryStats[6] - contactEnquiryStats[7]) / contactEnquiryStats[7]) * 100) : 
      contactEnquiryStats[6] > 0 ? 100 : 0

    // Compile comprehensive statistics
    const comprehensiveStats = {
      users: {
        totalUsers: userStats[0],
        activeUsers: userStats[1],
        inactiveUsers: userStats[2],
        googleUsers: userStats[3],
        emailUsers: userStats[4],
        recentUsers: userStats[5].map((user: any) => ({
          _id: user._id,
          name: user.name || 'Unknown',
          email: user.email,
          provider: user.provider || 'email',
          createdAt: user.createdAt
        })),
        growth: userGrowth
      },
      products: {
        totalProducts: productStats[0],
        activeProducts: productStats[1],
        inactiveProducts: productStats[2],
        categories: productStats[3].map((cat: any) => ({
          name: cat._id || 'Uncategorized',
          count: cat.count
        })),
        recentProducts: productStats[4].map((product: any) => ({
          _id: product._id,
          name: product.name,
          category: product.category || 'Uncategorized',
          price: product.price || 0,
          createdAt: product.createdAt
        })),
        growth: productGrowth
      },
      productEnquiries: {
        totalEnquiries: productEnquiryStats[0],
        pendingEnquiries: productEnquiryStats[1],
        respondedEnquiries: productEnquiryStats[2],
        closedEnquiries: productEnquiryStats[3],
        recentEnquiries: productEnquiryStats[4].map((enquiry: any) => ({
          _id: enquiry._id,
          customerName: enquiry.customerName,
          productName: enquiry.productId?.name || 'Unknown Product',
          status: enquiry.status,
          createdAt: enquiry.createdAt
        })),
        growth: productEnquiryGrowth
      },
      contactEnquiries: {
        totalEnquiries: contactEnquiryStats[0],
        pendingEnquiries: contactEnquiryStats[1],
        respondedEnquiries: contactEnquiryStats[2],
        closedEnquiries: contactEnquiryStats[3],
        subjects: contactEnquiryStats[4].map((subject: any) => ({
          name: subject._id || 'Unknown Subject',
          count: subject.count
        })),
        recentEnquiries: contactEnquiryStats[5].map((enquiry: any) => ({
          _id: enquiry._id,
          name: enquiry.name,
          subject: enquiry.subject,
          status: enquiry.status,
          createdAt: enquiry.createdAt
        })),
        growth: contactEnquiryGrowth
      }
    }

    return NextResponse.json({
      success: true,
      stats: comprehensiveStats
    })

  } catch (error) {
    console.error('Comprehensive dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}