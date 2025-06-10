'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const cardHoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const searchBarVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  }

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
      {/* Professional Hero Section with Local Background Image */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative overflow-hidden text-white h-96 flex items-center"
        style={{
          backgroundImage: "url('/images/Deepinview-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Dark overlay for better text readability */}
        <motion.div 
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="text-left">
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90">
               A Pioneer in Security and Beyond
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-light mb-4 text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Our
              <motion.span 
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 ml-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Products
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Supporting Smart Decision Making and Delivering Commercial Growth
            </motion.p>
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
          variants={searchBarVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            
            {/* Search Bar */}
            <motion.div 
              className="relative flex-1 w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
            </motion.div>

            {/* Category Filter */}
            <motion.div 
              className="w-full lg:w-48"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setSelectedSubCategory('') // Reset subcategory when category changes
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Sub Category Filter */}
            <motion.div 
              className="w-full lg:w-48"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                disabled={!selectedCategory}
              >
                <option value="">All Sub Categories</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Sort By */}
            <motion.div 
              className="w-full lg:w-48"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name_asc">Name A-Z</option>
                <option value="name_desc">Name Z-A</option>
              </select>
            </motion.div>

            {/* View Mode Toggle */}
            <motion.div 
              className="flex border border-gray-300 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGrid className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiList className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Clear Filters */}
            <AnimatePresence>
              {(searchTerm || selectedCategory || selectedSubCategory || sortBy !== 'newest') && (
                <motion.button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 text-red-600 hover:text-red-700 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiX className="w-4 h-4" />
                  Clear
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
        </motion.div>

        {/* Products Display */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              className="flex justify-center items-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="inline-block w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="ml-3 text-gray-600">Loading products...</span>
            </motion.div>
          ) : products.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <FiSearch className="w-8 h-8 text-gray-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory || selectedSubCategory
                  ? "Try adjusting your search criteria or filters"
                  : "No products are currently available"
                }
              </p>
              {(searchTerm || selectedCategory || selectedSubCategory) && (
                <motion.button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiX className="w-4 h-4 mr-2" />
                  Clear All Filters
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {products.map((product, index) => (
                    <motion.div 
                      key={product._id} 
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
                      variants={itemVariants}
                      whileHover="hover"
                      custom={index}
                      {...cardHoverVariants}
                    >
                      {/* Product Image */}
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.png'
                          }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div 
                          className="absolute top-3 left-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                            {product.category}
                          </span>
                        </motion.div>
                      </div>

                      {/* Product Info */}
                      <motion.div 
                        className="p-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
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
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link
                              href={`/products/${product._id}`}
                              className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              <FiEye className="w-4 h-4 mr-1" />
                              View
                            </Link>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <motion.div 
                  className="space-y-4 mb-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {products.map((product, index) => (
                    <motion.div 
                      key={product._id} 
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                      variants={itemVariants}
                      whileHover="hover"
                      custom={index}
                      {...cardHoverVariants}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Product Image */}
                        <div className="md:w-48 h-48 bg-gray-100 flex-shrink-0 overflow-hidden">
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-product.png'
                            }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between h-full">
                            <div className="flex-1">
                              <motion.div 
                                className="flex items-center gap-2 mb-2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <span className="inline-block px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                                  {product.category}
                                </span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {product.subCategory}
                                </span>
                              </motion.div>
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
                            
                            <motion.div 
                              className="mt-4 md:mt-0 md:ml-6 flex-shrink-0"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                href={`/products/${product._id}`}
                                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                <FiEye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <motion.div 
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </motion.button>
                  
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
                        <motion.button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-2 text-sm rounded-md ${
                            pageNumber === pagination.currentPage
                              ? 'bg-red-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {pageNumber}
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ProductsPage