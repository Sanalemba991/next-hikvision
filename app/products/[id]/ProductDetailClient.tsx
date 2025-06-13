'use client'
import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowLeft,
  FiTag,
  FiPackage,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
  FiShoppingCart,
  FiX,
  FiCheck,
  FiShield,
  FiPhone,
  FiImage,
  FiHeart,
  FiExternalLink,
  FiHome,
  FiChevronRight as FiBreadcrumbChevron,
  FiAward,
  FiTruck,
  FiHeadphones,
  FiDownload
} from 'react-icons/fi'

// Import your existing QuoteModal
import QuoteModal from '@/components/QuoteModal'

interface Product {
  _id: string
  name: string
  shortDescription: string
  category: string
  subCategory: string
  image: string
  isActive: boolean
}

interface ProductDetail {
  _id: string
  longDescription: string
  featureImages: Array<{
    image: string
    altText: string
  }>
  specifications: Array<{
    key: string
    value: string
  }>
  features: string[]
  reviews: Array<{
    customerName: string
    rating: number
    comment: string
    date: string
  }>
}

interface ProductDetailClientProps {
  product: Product
  productDetail: ProductDetail | null
  relatedProducts: Product[]
}

const ProductDetailClient = ({ product, productDetail, relatedProducts }: ProductDetailClientProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  
  // State management
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)

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
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }

  // Enhanced tab content animation variants
  const tabContentVariants = {
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
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const tabItemVariants = {
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
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  // Memoized calculations
  const averageRating = useMemo(() => {
    if (!productDetail?.reviews?.length) return 0
    return productDetail.reviews.reduce((acc, review) => acc + review.rating, 0) / productDetail.reviews.length
  }, [productDetail?.reviews])

  const hasFeatureImages = useMemo(() => {
    return productDetail?.featureImages && productDetail.featureImages.length > 0
  }, [productDetail?.featureImages])

  // Optimized handlers
  const handleImageNavigation = useCallback((direction: 'prev' | 'next') => {
    if (!hasFeatureImages) return
    
    const maxIndex = productDetail!.featureImages.length - 1
    setSelectedImageIndex(prev => {
      if (direction === 'next') {
        return prev >= maxIndex ? 0 : prev + 1
      } else {
        return prev <= 0 ? maxIndex : prev - 1
      }
    })
  }, [hasFeatureImages, productDetail])

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      // Use a more professional notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50'
      notification.textContent = 'Link copied to clipboard'
      document.body.appendChild(notification)
      setTimeout(() => document.body.removeChild(notification), 3000)
    }
  }, [product])

  const handleGetQuote = useCallback(() => {
    if (!session) {
      router.push('/signup')
    } else {
      setShowQuoteModal(true)
    }
  }, [session, router])

  // Professional star rendering
  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
      >
        <FiStar
          className={`w-4 h-4 ${i < rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
        />
      </motion.div>
    ))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional header with navigation */}
      <motion.div 
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors font-medium"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft className="w-5 h-5" />
              Back to Products
            </motion.button>
            
            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiShare2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-600'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="container mx-auto px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Professional Breadcrumbs */}
        <motion.nav 
          className="flex items-center gap-2 text-sm text-gray-600 mb-8"
          variants={itemVariants}
        >
          <Link href="/" className="hover:text-red-600 transition-colors flex items-center font-medium">
            <FiHome className="w-4 h-4 mr-1" />
            Home
          </Link>
          <FiBreadcrumbChevron className="w-4 h-4 text-gray-400" />
          <Link href="/products" className="hover:text-red-600 transition-colors font-medium">
            Products
          </Link>
          
         
           
         
          <FiBreadcrumbChevron className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-semibold truncate">
            {product.name}
          </span>
        </motion.nav>

        {/* Professional Product Hero Section */}
        <motion.div 
          className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 p-8 lg:p-12">
            
            {/* Enhanced Image Gallery */}
            <motion.div 
              className="space-y-6"
              variants={imageVariants}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl relative overflow-hidden border border-gray-200">
                <AnimatePresence mode="wait">
                  {hasFeatureImages && productDetail?.featureImages[selectedImageIndex]?.image ? (
                    <motion.div
                      key={selectedImageIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={productDetail.featureImages[selectedImageIndex].image}
                        alt={productDetail.featureImages[selectedImageIndex].altText || product.name}
                        fill
                        className="object-contain cursor-pointer p-8"
                        onClick={() => setShowImageModal(true)}
                        priority={selectedImageIndex === 0}
                        quality={90}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="flex items-center justify-center h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <FiImage className="w-24 h-24 text-gray-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Navigation arrows */}
                {hasFeatureImages && productDetail?.featureImages && productDetail.featureImages.length > 1 && (
                  <>
                    <motion.button
                      onClick={() => handleImageNavigation('prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiChevronLeft className="w-5 h-5 text-gray-700" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleImageNavigation('next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiChevronRight className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </>
                )}

                {/* Image counter */}
                {hasFeatureImages && productDetail?.featureImages && productDetail.featureImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageIndex + 1} / {productDetail.featureImages.length}
                  </div>
                )}
              </div>

              {/* Professional Thumbnails */}
              {hasFeatureImages && productDetail?.featureImages && productDetail.featureImages.length > 1 && (
                <motion.div 
                  className="grid grid-cols-6 gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {productDetail.featureImages.slice(0, 6).map((image, index) => (
                    <motion.div
                      key={index}
                      className={`aspect-square border-2 rounded-xl cursor-pointer overflow-hidden transition-all duration-300 ${
                        selectedImageIndex === index 
                          ? 'border-red-500 shadow-lg ring-2 ring-red-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={image.image}
                        alt={image.altText || ''}
                        width={100}
                        height={100}
                        className="w-full h-full object-contain p-2"
                        quality={70}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Enhanced Product Information */}
            <motion.div 
              className="space-y-8"
              variants={itemVariants}
            >
              {/* Product Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <motion.h1 
                      className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {product.name}
                    </motion.h1>
                    <motion.div 
                      className="flex items-center gap-3 mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-semibold shadow-lg">
                        {product.category}
                      </span>
                      <span className="text-gray-500 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                        {product.subCategory}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Professional Rating Display */}
                {productDetail?.reviews && productDetail.reviews.length > 0 && (
                  <motion.div 
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-1">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-900">{averageRating.toFixed(1)}</span>
                      <span className="text-gray-600 font-medium">({productDetail.reviews.length} reviews)</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Product Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  {product.shortDescription}
                </p>
              </motion.div>

              {/* Professional Key Features */}
              {productDetail?.features && productDetail.features.length > 0 && (
                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                    <FiCheck className="w-6 h-6 text-green-600 mr-3" />
                    Key Features & Benefits
                  </h3>
                  <ul className="space-y-3">
                    {productDetail.features.slice(0, 6).map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Professional Trust Indicators */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <FiShield className="w-8 h-8 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Warranty</h4>
                    <p className="text-sm text-gray-600 font-medium">Protected Coverage</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                  <FiAward className="w-8 h-8 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Certified</h4>
                    <p className="text-sm text-gray-600 font-medium">Quality Assured</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                  <FiHeadphones className="w-8 h-8 text-orange-600 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Support</h4>
                    <p className="text-sm text-gray-600 font-medium">Expert Help</p>
                  </div>
                </div>
              </motion.div>

              {/* Professional Action Buttons */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.button
                    onClick={handleGetQuote}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-bold flex items-center justify-center shadow-lg hover:shadow-xl"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FiShoppingCart className="w-5 h-5 mr-3" />
                    Request Quote
                  </motion.button>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Link
                      href="/contact"
                      className="bg-gray-100 text-gray-800 px-8 py-4 rounded-xl hover:bg-gray-200 transition-all duration-300 font-bold flex items-center justify-center border border-gray-300 hover:border-gray-400"
                    >
                      <FiPhone className="w-5 h-5 mr-3" />
                      Contact Sales
                    </Link>
                  </motion.div>
                </div>
                
                {/* Additional Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    onClick={handleShare}
                    className="bg-white border-2 border-gray-200 px-6 py-3 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center justify-center"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FiShare2 className="w-4 h-4 mr-2" />
                    Share
                  </motion.button>
                  <motion.button
                    className="bg-white border-2 border-gray-200 px-6 py-3 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center justify-center"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FiDownload className="w-4 h-4 mr-2" />
                    Brochure
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Professional Tabbed Content */}
        {productDetail && (
          <motion.div 
            className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12"
            variants={itemVariants}
          >
            <div className="border-b border-gray-200">
              <nav className="flex">
                {[
                  { key: 'description', label: 'Product Overview', icon: FiPackage },
                  { key: 'specifications', label: 'Technical Specifications', icon: FiTag },
                  { key: 'reviews', label: 'Customer Reviews', icon: FiStar }
                ].map((tab) => (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`py-6 px-8 font-semibold flex items-center gap-3 transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'border-b-3 border-red-500 text-red-600 bg-red-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                className="p-8 lg:p-12"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {activeTab === 'description' && (
                  <motion.div
                    variants={tabItemVariants}
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: productDetail.longDescription?.replace(/\n/g, '<br>') || '<p class="text-gray-500 text-center py-8">Detailed product description will be available soon.</p>'
                    }}
                  />
                )}

                {activeTab === 'specifications' && (
                  <motion.div variants={tabItemVariants}>
                    {productDetail.specifications?.length > 0 ? (
                      <motion.div 
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {productDetail.specifications.map((spec, index) => (
                          <motion.div 
                            key={index} 
                            className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-300"
                            variants={itemVariants}
                            whileHover={{ 
                              scale: 1.02,
                              transition: { duration: 0.2 }
                            }}
                            custom={index}
                          >
                            <span className="font-semibold text-gray-900">{spec.key}</span>
                            <span className="text-gray-700 font-medium">{spec.value}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="text-center py-12"
                        variants={tabItemVariants}
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <FiTag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        </motion.div>
                        <motion.p 
                          className="text-gray-500 text-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          Technical specifications will be available soon.
                        </motion.p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div variants={tabItemVariants}>
                    {productDetail.reviews?.length > 0 ? (
                      <motion.div 
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {productDetail.reviews.map((review, index) => (
                          <motion.div 
                            key={index} 
                            className="border-b border-gray-200 pb-6 last:border-b-0"
                            variants={itemVariants}
                            custom={index}
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">
                                  {review.customerName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-gray-900 text-lg">{review.customerName}</h4>
                                  <span className="text-sm text-gray-500 font-medium">
                                    {new Date(review.date).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="flex">
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className="font-semibold text-amber-600">{review.rating}.0</span>
                                </div>
                                <p className="text-gray-700 leading-relaxed font-medium">{review.comment}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="text-center py-16"
                        variants={tabItemVariants}
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <FiStar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        </motion.div>
                        <motion.h3 
                          className="text-2xl font-bold text-gray-900 mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          No Reviews Yet
                        </motion.h3>
                        <motion.p 
                          className="text-gray-500 text-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          Be the first to share your experience with this product!
                        </motion.p>
                        <motion.button
                          className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Write a Review
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Professional Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Link
                    href={`/products/${relatedProduct._id}`}
                    className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
                  >
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                      {relatedProduct.image ? (
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-contain p-6 hover:scale-110 transition-transform duration-500"
                          quality={80}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiImage className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
                        {relatedProduct.category}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-3 mb-2 text-lg leading-tight">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {relatedProduct.shortDescription}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Professional Image Modal */}
      <AnimatePresence>
        {showImageModal && hasFeatureImages && productDetail && (
          <motion.div 
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div 
              className="relative max-w-6xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="w-6 h-6" />
              </motion.button>
              <Image
                src={productDetail.featureImages[selectedImageIndex]?.image || ''}
                alt={productDetail.featureImages[selectedImageIndex]?.altText || ''}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain bg-white rounded-2xl shadow-2xl"
                quality={95}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        productName={product.name}
        productId={product._id}
        onSuccess={() => setShowQuoteModal(false)}
      />
    </div>
  )
}

export default ProductDetailClient