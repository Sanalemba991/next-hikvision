'use client'
import { useState, useEffect } from 'react'
import { 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiX
} from 'react-icons/fi'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  shortDescription: string
  category: string
  subCategory: string
  image: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalProducts: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPrevPage: false
  })

  // Categories from database
  const [categories, setCategories] = useState<string[]>([])
  const [subCategories, setSubCategories] = useState<string[]>([])

  // Fetch products with filters
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true)
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        search: searchTerm,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        sortBy
      })

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()

      if (response.ok) {
        setProducts(data.products)
        setPagination(data.pagination)
        
        // Extract unique categories and subcategories
        if (data.categories) setCategories(data.categories)
        if (data.subCategories) setSubCategories(data.subCategories)
      } else {
        console.error('Failed to fetch products:', data.error)
      }
    } catch (error) {
      console.error('Fetch products error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [searchTerm, selectedCategory, selectedSubCategory, sortBy])

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchProducts(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedSubCategory('')
    setSortBy('newest')
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our comprehensive range of security and surveillance solutions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setSelectedSubCategory('') // Reset subcategory when category changes
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category Filter */}
            <div className="w-full lg:w-48">
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                disabled={!selectedCategory}
              >
                <option value="">All Sub Categories</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="w-full lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name_asc">Name A-Z</option>
                <option value="name_desc">Name Z-A</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory || selectedSubCategory || sortBy !== 'newest') && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-3 text-red-600 hover:text-red-700 transition-colors"
              >
                <FiX className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {pagination.totalProducts} Product{pagination.totalProducts !== 1 ? 's' : ''} Found
            </h2>
            {(searchTerm || selectedCategory || selectedSubCategory) && (
              <p className="text-gray-600 text-sm mt-1">
                {searchTerm && `Searching for "${searchTerm}"`}
                {selectedCategory && ` in ${selectedCategory}`}
                {selectedSubCategory && ` > ${selectedSubCategory}`}
              </p>
            )}
          </div>
          
          <div className="text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
        </div>

        {/* Products Display */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory || selectedSubCategory
                ? "Try adjusting your search criteria or filters"
                : "No products are currently available"
              }
            </p>
            {(searchTerm || selectedCategory || selectedSubCategory) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FiX className="w-4 h-4 mr-2" />
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {products.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow group">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-product.png'
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {product.subCategory}
                        </span>
                        <Link
                          href={`/products/${product._id}`}
                          className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          <FiEye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4 mb-8">
                {products.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      {/* Product Image */}
                      <div className="md:w-48 h-48 bg-gray-100 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.png'
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between h-full">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                                {product.category}
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {product.subCategory}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {product.shortDescription}
                            </p>
                            <p className="text-sm text-gray-500">
                              Added {formatDate(product.createdAt)}
                            </p>
                          </div>
                          
                          <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                            <Link
                              href={`/products/${product._id}`}
                              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <FiEye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                    let pageNumber;
                    if (pagination.totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNumber = pagination.totalPages - 4 + i;
                    } else {
                      pageNumber = pagination.currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-2 text-sm rounded-md ${
                          pageNumber === pagination.currentPage
                            ? 'bg-red-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProductsPage