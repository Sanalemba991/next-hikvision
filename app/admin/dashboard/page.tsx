'use client'
import { useState, useEffect } from 'react'
import { FiUsers, FiUserCheck, FiUserX, FiMail, FiRefreshCw, FiPackage, FiShoppingCart, FiMessageSquare, FiPhone, FiTrendingUp, FiTrendingDown, FiActivity } from 'react-icons/fi'
import PageAnalytics from '@/components/PageAnalytics'

interface DashboardStats {
  users: {
    totalUsers: number
    activeUsers: number
    inactiveUsers: number
    googleUsers: number
    emailUsers: number
    recentUsers: Array<{
      _id: string
      name: string
      email: string
      provider: string
      createdAt: string
    }>
    growth: number
  }
  products: {
    totalProducts: number
    activeProducts: number
    inactiveProducts: number
    categories: Array<{
      name: string
      count: number
    }>
    recentProducts: Array<{
      _id: string
      name: string
      category: string
      price: number
      createdAt: string
    }>
    growth: number
  }
  productEnquiries: {
    totalEnquiries: number
    pendingEnquiries: number
    respondedEnquiries: number
    closedEnquiries: number
    recentEnquiries: Array<{
      _id: string
      customerName: string
      productName: string
      status: string
      createdAt: string
    }>
    growth: number
  }
  contactEnquiries: {
    totalEnquiries: number
    pendingEnquiries: number
    respondedEnquiries: number
    closedEnquiries: number
    subjects: Array<{
      name: string
      count: number
    }>
    recentEnquiries: Array<{
      _id: string
      name: string
      subject: string
      status: string
      createdAt: string
    }>
    growth: number
  }
}

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardStats>({
    users: {
      totalUsers: 0,
      activeUsers: 0,
      inactiveUsers: 0,
      googleUsers: 0,
      emailUsers: 0,
      recentUsers: [],
      growth: 0
    },
    products: {
      totalProducts: 0,
      activeProducts: 0,
      inactiveProducts: 0,
      categories: [],
      recentProducts: [],
      growth: 0
    },
    productEnquiries: {
      totalEnquiries: 0,
      pendingEnquiries: 0,
      respondedEnquiries: 0,
      closedEnquiries: 0,
      recentEnquiries: [],
      growth: 0
    },
    contactEnquiries: {
      totalEnquiries: 0,
      pendingEnquiries: 0,
      respondedEnquiries: 0,
      closedEnquiries: 0,
      subjects: [],
      recentEnquiries: [],
      growth: 0
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Fetch comprehensive dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api/admin/dashboard/comprehensive')
      const data = await response.json()

      if (response.ok) {
        setDashboardData(data.stats)
        setLastUpdated(new Date())
      } else {
        setError(data.error || 'Failed to fetch dashboard statistics')
      }
    } catch (error) {
      setError('Network error. Please try again.')
      console.error('Fetch dashboard stats error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardStats()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <FiTrendingUp className="w-4 h-4 text-green-600" />
    if (growth < 0) return <FiTrendingDown className="w-4 h-4 text-red-600" />
    return <FiActivity className="w-4 h-4 text-gray-600" />
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600'
    if (growth < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Comprehensive Dashboard</h1>
          <p className="text-gray-600">Real-time analytics for all system entities</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchDashboardStats}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1">
              {getGrowthIcon(dashboardData.users.growth)}
              <span className={`text-sm font-medium ${getGrowthColor(dashboardData.users.growth)}`}>
                {dashboardData.users.growth > 0 ? '+' : ''}{dashboardData.users.growth}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? '...' : dashboardData.users.totalUsers}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dashboardData.users.activeUsers} active, {dashboardData.users.inactiveUsers} inactive
            </p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <FiPackage className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1">
              {getGrowthIcon(dashboardData.products.growth)}
              <span className={`text-sm font-medium ${getGrowthColor(dashboardData.products.growth)}`}>
                {dashboardData.products.growth > 0 ? '+' : ''}{dashboardData.products.growth}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? '...' : dashboardData.products.totalProducts}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dashboardData.products.activeProducts} active, {dashboardData.products.inactiveProducts} inactive
            </p>
          </div>
        </div>

        {/* Product Enquiries */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
              <FiShoppingCart className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center gap-1">
              {getGrowthIcon(dashboardData.productEnquiries.growth)}
              <span className={`text-sm font-medium ${getGrowthColor(dashboardData.productEnquiries.growth)}`}>
                {dashboardData.productEnquiries.growth > 0 ? '+' : ''}{dashboardData.productEnquiries.growth}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Product Enquiries</p>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? '...' : dashboardData.productEnquiries.totalEnquiries}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dashboardData.productEnquiries.pendingEnquiries} pending
            </p>
          </div>
        </div>

        {/* Contact Enquiries */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <FiMessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1">
              {getGrowthIcon(dashboardData.contactEnquiries.growth)}
              <span className={`text-sm font-medium ${getGrowthColor(dashboardData.contactEnquiries.growth)}`}>
                {dashboardData.contactEnquiries.growth > 0 ? '+' : ''}{dashboardData.contactEnquiries.growth}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Contact Enquiries</p>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? '...' : dashboardData.contactEnquiries.totalEnquiries}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dashboardData.contactEnquiries.pendingEnquiries} pending
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* User Analytics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Analytics</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{dashboardData.users.googleUsers}</p>
                <p className="text-sm text-gray-600">Google Auth</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-600">{dashboardData.users.emailUsers}</p>
                <p className="text-sm text-gray-600">Email Auth</p>
              </div>
            </div>
            
            {/* Recent Users */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Registrations</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {dashboardData.users.recentUsers.slice(0, 3).map((user) => (
                  <div key={user._id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {user.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Analytics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Analytics</h2>
          <div className="space-y-4">
            {/* Category Distribution */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Top Categories</h3>
              <div className="space-y-2">
                {dashboardData.products.categories.slice(0, 3).map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{category.name}</span>
                    <span className="text-sm font-medium text-gray-900">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Products */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Products</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {dashboardData.products.recentProducts.slice(0, 3).map((product) => (
                  <div key={product._id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{formatCurrency(product.price)}</p>
                      <p className="text-xs text-gray-500">{formatDate(product.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Product Enquiry Analytics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Enquiry Status</h2>
          <div className="space-y-4">
            {/* Status Distribution */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-lg font-bold text-yellow-600">{dashboardData.productEnquiries.pendingEnquiries}</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-lg font-bold text-blue-600">{dashboardData.productEnquiries.respondedEnquiries}</p>
                <p className="text-xs text-gray-600">Responded</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-600">{dashboardData.productEnquiries.closedEnquiries}</p>
                <p className="text-xs text-gray-600">Closed</p>
              </div>
            </div>
            
            {/* Recent Enquiries */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Enquiries</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {dashboardData.productEnquiries.recentEnquiries.slice(0, 3).map((enquiry) => (
                  <div key={enquiry._id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{enquiry.customerName}</p>
                      <p className="text-xs text-gray-500 truncate">{enquiry.productName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        enquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        enquiry.status === 'responded' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {enquiry.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(enquiry.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Enquiry Analytics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Enquiry Analytics</h2>
          <div className="space-y-4">
            {/* Status Distribution */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-lg font-bold text-yellow-600">{dashboardData.contactEnquiries.pendingEnquiries}</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-lg font-bold text-blue-600">{dashboardData.contactEnquiries.respondedEnquiries}</p>
                <p className="text-xs text-gray-600">Responded</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-600">{dashboardData.contactEnquiries.closedEnquiries}</p>
                <p className="text-xs text-gray-600">Closed</p>
              </div>
            </div>
            
            {/* Subject Distribution */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Top Subjects</h3>
              <div className="space-y-2">
                {dashboardData.contactEnquiries.subjects.slice(0, 3).map((subject, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 truncate">{subject.name}</span>
                    <span className="text-sm font-medium text-gray-900">{subject.count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Enquiries */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Enquiries</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {dashboardData.contactEnquiries.recentEnquiries.slice(0, 2).map((enquiry) => (
                  <div key={enquiry._id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{enquiry.name}</p>
                      <p className="text-xs text-gray-500 truncate">{enquiry.subject}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        enquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        enquiry.status === 'responded' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {enquiry.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(enquiry.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Analytics Component */}
      <div className="mb-8">
        <PageAnalytics />
      </div>
    </div>
  )
}

export default AdminDashboard