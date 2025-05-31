'use client'
import { useState, useEffect } from 'react'
import { FiGlobe, FiLayers, FiTrendingUp, FiDatabase } from 'react-icons/fi'

interface PageStats {
  totalPages: number
  staticPages: number
  dynamicPages: number
  adminPages: number
  apiRoutes: number
  productsCount: number
}

const PageAnalytics = () => {
  const [stats, setStats] = useState<PageStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPageStats()
  }, [])

  const fetchPageStats = async () => {
    try {
      // Fetch products count
      const productsResponse = await fetch('/api/products?limit=1000')
      const productsData = await productsResponse.json()
      const productsCount = productsData.products?.length || 0

      // Calculate page statistics
      const staticPages = 7 // Home, Products, Contact, Signup, Profile, Privacy, Terms
      const dynamicPages = productsCount // Each product gets its own page
      const adminPages = 6 // Admin dashboard, products, users, etc. (not public)
      const apiRoutes = 15 // Estimated API endpoints
      const totalPages = staticPages + dynamicPages

      setStats({
        totalPages,
        staticPages,
        dynamicPages,
        adminPages,
        apiRoutes,
        productsCount
      })
    } catch (error) {
      console.error('Error fetching page stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Website Page Analytics</h2>
        <p className="text-gray-600">Real-time statistics of your website structure</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiGlobe className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Public Pages</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiLayers className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Static Pages</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.staticPages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Dynamic Pages</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.dynamicPages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiDatabase className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Products</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.productsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Public Pages */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📄 Public Pages (Indexed by Google)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">🏠 Homepage</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Static</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">🛍️ Products Listing</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Static</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">📞 Contact Page</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Static</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">👤 User Pages (Signup, Profile)</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Static (2)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">📋 Legal Pages (Privacy, Terms)</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Static (2)</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-gray-600">🎯 Individual Product Pages</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Dynamic ({stats.dynamicPages})</span>
            </div>
          </div>
        </div>

        {/* Private/Admin Pages */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔒 Private Pages (Not Indexed)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">📊 Admin Dashboard</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Private</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">📦 Product Management</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Private</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">📝 Product Details Admin</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Private</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">👥 User Management</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Private</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">📧 Enquiries Management</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Private (2)</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-gray-600">🔧 API Endpoints</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Backend ({stats.apiRoutes})</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Impact */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 SEO Impact Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalPages}</div>
            <div className="text-sm text-gray-600">Pages for Google to Index</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round((stats.dynamicPages / stats.totalPages) * 100)}%</div>
            <div className="text-sm text-gray-600">Dynamic Content Ratio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">High</div>
            <div className="text-sm text-gray-600">SEO Potential Rating</div>
          </div>
        </div>
      </div>

      {/* Sitemap Links */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
        <p className="text-gray-600 mb-3">Access your website sitemaps:</p>
        <div className="flex justify-center gap-4">
          <a 
            href="/sitemap.xml" 
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiGlobe className="w-4 h-4 mr-2" />
            Static Sitemap (7 pages)
          </a>
          <a 
            href="/api/sitemap" 
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiDatabase className="w-4 h-4 mr-2" />
            Dynamic Sitemap (All pages)
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Static: Build-time pages | Dynamic: Runtime with products
        </p>
      </div>
    </div>
  )
}

export default PageAnalytics