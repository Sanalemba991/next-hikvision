'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiX,
  FiTag,
  FiPackage,
  FiHeart,
  FiShare2,
  FiStar,
  FiSliders,
  FiRefreshCw,
  FiArrowRight
} from 'react-icons/fi'

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

interface FilterState {
  search: string
  category: string
  subCategory: string
  sortBy: string
}

const ProductsContent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // State management
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set())
  
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

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.5
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
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

  const imageVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const badgeVariants = {
    initial: { scale: 1, opacity: 0.9 },
    hover: { 
      scale: 1.05, 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  }

  const quickActionVariants = {
    initial: { opacity: 0, scale: 0.8, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        delay: 0.2,
        ease: "backOut"
      }
    },
    hover: { 
      scale: 1.1, 
      transition: { duration: 0.2 }
    }
  }

  // Memoized filter state
  const filterState = useMemo((): FilterState => ({
    search: searchTerm,
    category: selectedCategory,
    subCategory: selectedSubCategory,
    sortBy
  }), [searchTerm, selectedCategory, selectedSubCategory, sortBy])

  const hasActiveFilters = useMemo(() => {
    return searchTerm || selectedCategory || selectedSubCategory || sortBy !== 'newest'
  }, [searchTerm, selectedCategory, selectedSubCategory, sortBy])

  // Read URL parameters on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const subCategoryParam = searchParams.get('subCategory')
    const searchParam = searchParams.get('search')
    
    if (categoryParam) setSelectedCategory(categoryParam)
    if (subCategoryParam) setSelectedSubCategory(subCategoryParam)
    if (searchParam) setSearchTerm(searchParam)
  }, [searchParams])

  // Update URL when filters change
  const updateURL = useCallback((newCategory: string, newSubCategory: string, newSearch: string) => {
    const params = new URLSearchParams()
    
    if (newCategory) params.set('category', newCategory)
    if (newSubCategory) params.set('subCategory', newSubCategory)
    if (newSearch) params.set('search', newSearch)
    
    const queryString = params.toString()
    const newUrl = queryString ? `/products?${queryString}` : '/products'
    
    router.push(newUrl, { scroll: false })
  }, [router])

  // Fetch products with filters
  const fetchProducts = useCallback(async (page = 1, showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      
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
      setRefreshing(false)
    }
  }, [searchTerm, selectedCategory, selectedSubCategory, sortBy])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Handle filter changes with URL updates
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
    setSelectedSubCategory('') // Reset subcategory when category changes
    updateURL(category, '', searchTerm)
  }, [searchTerm, updateURL])

  const handleSubCategoryChange = useCallback((subCategory: string) => {
    setSelectedSubCategory(subCategory)
    updateURL(selectedCategory, subCategory, searchTerm)
  }, [selectedCategory, searchTerm, updateURL])

  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search)
    updateURL(selectedCategory, selectedSubCategory, search)
  }, [selectedCategory, selectedSubCategory, updateURL])

  // Handle pagination
  const handlePageChange = useCallback((page: number) => {
    fetchProducts(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [fetchProducts])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedSubCategory('')
    setSortBy('newest')
    router.push('/products', { scroll: false })
  }, [router])

  // Handle wishlist toggle
  const toggleWishlist = useCallback((productId: string) => {
    setWishlistedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }, [])

  // Handle share
  const handleShare = useCallback(async (product: Product) => {
    const url = `${window.location.origin}/products/${product._id}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: url,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      await navigator.clipboard.writeText(url)
      // Professional notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-medium'
      notification.textContent = 'Product link copied to clipboard'
      document.body.appendChild(notification)
      setTimeout(() => document.body.removeChild(notification), 3000)
    }
  }, [])

  // Render pagination
  const renderPagination = useCallback(() => {
    if (pagination.totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-12">
        <motion.button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiChevronLeft className="w-5 h-5" />
        </motion.button>
        
        <div className="flex items-center gap-1">
          {pages.map(pageNumber => (
            <motion.button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                pageNumber === pagination.currentPage
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {pageNumber}
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    )
  }, [pagination, handlePageChange])

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Hero Section */}
      <motion.section 
        className="relative overflow-hidden text-white h-96 flex items-center"
        style={{
          backgroundImage: "url('/images/Deepinview-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/50" />
        
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
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 ml-3">
                Products
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Supporting Smart Decision Making and Delivering Commercial Growth
            </motion.p>

            {/* Show active filters */}
            {hasActiveFilters && (
              <motion.div 
                className="mt-6 flex items-center gap-2 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-white/70 text-sm font-medium">Filtered by:</span>
                {selectedCategory && (
                  <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full font-semibold">
                    {selectedCategory}
                  </span>
                )}
                {selectedSubCategory && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full font-semibold">
                    {selectedSubCategory}
                  </span>
                )}
                {searchTerm && (
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-semibold">
                    "{searchTerm}"
                  </span>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      <motion.div 
        className="container mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Professional Search and Filter Bar */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
          variants={itemVariants}
        >
          <div className="flex flex-col space-y-4">
            {/* Main Search Bar */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-lg"
              />
              {searchTerm && (
                <motion.button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX className="w-5 h-5" />
                </motion.button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Category Filter */}
              <div className="w-full lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 font-medium bg-white"
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
              <div className="w-full lg:w-64">
                <select
                  value={selectedSubCategory}
                  onChange={(e) => handleSubCategoryChange(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 font-medium bg-white"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 font-medium bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name_asc">Name A-Z</option>
                  <option value="name_desc">Name Z-A</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-xl overflow-hidden bg-white">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiGrid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiList className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Refresh Button */}
              <motion.button
                onClick={() => fetchProducts(1, true)}
                disabled={refreshing}
                className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiRefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </motion.button>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <motion.button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 text-red-600 hover:text-red-700 font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiX className="w-4 h-4" />
                  Clear All
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Professional Results Summary */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          variants={itemVariants}
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {pagination.totalProducts} Product{pagination.totalProducts !== 1 ? 's' : ''} Found
            </h2>
            {hasActiveFilters && (
              <p className="text-gray-600 mt-1 font-medium">
                {searchTerm && `Searching for "${searchTerm}"`}
                {selectedCategory && ` in ${selectedCategory}`}
                {selectedSubCategory && ` > ${selectedSubCategory}`}
              </p>
            )}
          </div>
          
          <div className="text-gray-600 font-medium">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
        </motion.div>

        {/* Products Display */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              className="flex justify-center items-center py-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="inline-block w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.span 
                className="ml-4 text-gray-600 text-lg font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Loading products...
              </motion.span>
            </motion.div>
          ) : products.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <FiSearch className="w-12 h-12 text-gray-400" />
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                No Products Found
              </motion.h3>
              <motion.p 
                className="text-gray-600 mb-6 text-lg max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {hasActiveFilters
                  ? "Try adjusting your search criteria or filters to find what you're looking for"
                  : "No products are currently available"
                }
              </motion.p>
              {hasActiveFilters && (
                <motion.button
                  onClick={clearFilters}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: 0.4 }}
                >
                  <FiX className="w-5 h-5 mr-2" />
                  Clear All Filters
                </motion.button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key="grid-view"
                >
                  {products.map((product, index) => (
                    <motion.div 
                      key={product._id} 
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                      variants={cardVariants}
                      layout
                      layoutId={`product-${product._id}`}
                    >
                      <motion.div 
                        className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
                      >
                        <motion.div
                          variants={imageVariants}
                          initial="initial"
                          whileHover="hover"
                          className="w-full h-full"
                        >
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-6"
                              quality={80}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              >
                                <FiPackage className="w-16 h-16 text-gray-300" />
                              </motion.div>
                            </div>
                          )}
                        </motion.div>
                        
                        {/* Quick Actions */}
                        <motion.div 
                          className="absolute top-4 right-4 flex flex-col gap-2"
                          variants={quickActionVariants}
                          initial="initial"
                          animate="visible"
                        >
                          <motion.button
                            onClick={(e) => {
                              e.preventDefault()
                              toggleWishlist(product._id)
                            }}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                              wishlistedItems.has(product._id)
                                ? 'bg-red-500 text-white shadow-lg'
                                : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md'
                            }`}
                            variants={quickActionVariants}
                            whileHover="hover"
                            whileTap={{ scale: 0.9 }}
                          >
                            <motion.div
                              animate={wishlistedItems.has(product._id) ? { scale: [1, 1.3, 1] } : {}}
                              transition={{ duration: 0.3 }}
                            >
                              <FiHeart className={`w-4 h-4 ${wishlistedItems.has(product._id) ? 'fill-current' : ''}`} />
                            </motion.div>
                          </motion.button>
                          <motion.button
                            onClick={(e) => {
                              e.preventDefault()
                              handleShare(product)
                            }}
                            className="p-2 bg-white/90 text-gray-700 rounded-full hover:bg-white hover:shadow-md backdrop-blur-sm transition-all duration-300"
                            variants={quickActionVariants}
                            whileHover="hover"
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiShare2 className="w-4 h-4" />
                          </motion.button>
                        </motion.div>

                        {/* Category Badge */}
                        <motion.div 
                          className="absolute top-4 left-4"
                          variants={badgeVariants}
                          initial="initial"
                          whileHover="hover"
                        >
                          <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full shadow-lg">
                            {product.category}
                          </span>
                        </motion.div>
                      </motion.div>

                      <motion.div 
                        className="p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <motion.div 
                          className="mb-4"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                            {product.subCategory}
                          </span>
                        </motion.div>
                        
                        <h3 className="font-bold text-gray-900 mb-4 text-lg leading-tight line-clamp-2">
                          {product.name}
                        </h3>

                        <motion.div 
                          className="mb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                        >
                          <p className="text-xs text-gray-500 font-medium">
                            Added: {formatDate(product.createdAt)}
                          </p>
                        </motion.div>

                        <motion.div 
                          className="flex items-center justify-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          <div className="w-full">
                            <Link
                              href={`/products/${product._id}`}
                              className="group w-full inline-flex items-center justify-center px-6 py-3 text-red-600 font-bold text-sm transition-all duration-300"
                            >
                              {/* Text with hover effect only on "Details" */}
                              <span className="tracking-wide">
                                View <span className="group-hover:text-red-700 transition-colors duration-300">Details</span>
                              </span>
                              
                              {/* Arrow with slow smooth transition */}
                              <motion.div
                                className="ml-2"
                                animate={{ x: 0 }}
                                transition={{ 
                                  duration: 0.6, 
                                  ease: [0.25, 0.46, 0.45, 0.94] 
                                }}
                              >
                                <FiChevronRight className="w-4 h-4 group-hover:text-red-700 group-hover:translate-x-1 transition-all duration-500 ease-out" />
                              </motion.div>
                            </Link>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key="list-view"
                >
                  {products.map((product, index) => (
                    <motion.div 
                      key={product._id} 
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                      variants={cardVariants}
                      layout
                      layoutId={`product-list-${product._id}`}
                    >
                      <div className="flex flex-col lg:flex-row">
                        <motion.div 
                          className="lg:w-80 h-64 lg:h-auto bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 relative overflow-hidden"
                        >
                          <motion.div
                            variants={imageVariants}
                            initial="initial"
                            whileHover="hover"
                            className="w-full h-full"
                          >
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-6"
                                quality={80}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <motion.div
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                  <FiPackage className="w-16 h-16 text-gray-300" />
                                </motion.div>
                              </div>
                            )}
                          </motion.div>
                          
                          {/* Category Badge */}
                          <motion.div 
                            className="absolute top-4 left-4"
                            variants={badgeVariants}
                            initial="initial"
                            whileHover="hover"
                          >
                            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full shadow-lg">
                              {product.category}
                            </span>
                          </motion.div>
                        </motion.div>

                        <motion.div 
                          className="flex-1 p-8"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between h-full">
                            <div className="flex-1 lg:mr-6">
                              <motion.div 
                                className="flex items-center gap-3 mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.4 }}
                              >
                                <motion.span 
                                  className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium"
                                  whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {product.subCategory}
                                </motion.span>
                                <div className="flex items-center gap-2">
                                  <motion.button
                                    onClick={() => toggleWishlist(product._id)}
                                    className={`p-2 rounded-full transition-all duration-300 ${
                                      wishlistedItems.has(product._id)
                                        ? 'text-red-500 bg-red-50'
                                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                    }`}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <motion.div
                                      animate={wishlistedItems.has(product._id) ? { scale: [1, 1.3, 1] } : {}}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <FiHeart className={`w-5 h-5 ${wishlistedItems.has(product._id) ? 'fill-current' : ''}`} />
                                    </motion.div>
                                  </motion.button>
                                  <motion.button
                                    onClick={() => handleShare(product)}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all duration-300"
                                    whileHover={{ scale: 1.2, rotate: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <FiShare2 className="w-5 h-5" />
                                  </motion.button>
                                </div>
                              </motion.div>
                              
                              <motion.h3 
                                className="text-2xl font-bold text-gray-900 mb-4 transition-colors group-hover:text-red-600"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                                whileHover={{ x: 5 }}
                              >
                                {product.name}
                              </motion.h3>

                              <motion.div 
                                className="mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.6 }}
                              >
                                <p className="text-sm text-gray-500 font-medium">
                                  Added: {formatDate(product.createdAt)}
                                </p>
                              </motion.div>
                            </div>
                            
                            <motion.div 
                              className="mt-6 lg:mt-0 flex-shrink-0"
                              initial={{ opacity: 0, x: 30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.7 }}
                            >
                              <div>
                                <Link
                                  href={`/products/${product._id}`}
                                  className="group inline-flex items-center px-8 py-4 text-red-600 font-bold text-lg transition-all duration-300"
                                >
                                  {/* Text with hover effect only on "Details" */}
                                  <span className="tracking-wide">
                                    View <span className="group-hover:text-red-700 transition-colors duration-300">Details</span>
                                  </span>
                                  
                                  {/* Arrow with slow smooth transition */}
                                  <motion.div
                                    className="ml-3"
                                    animate={{ x: 0 }}
                                    transition={{ 
                                      duration: 0.6, 
                                      ease: [0.25, 0.46, 0.45, 0.94] 
                                    }}
                                  >
                                    <FiChevronRight className="w-5 h-5 group-hover:text-red-700 group-hover:translate-x-2 transition-all duration-500 ease-out" />
                                  </motion.div>
                                </Link>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Pagination */}
              {renderPagination()}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ProductsContent