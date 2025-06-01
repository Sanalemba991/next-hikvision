'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiTag, 
  FiPackage, 
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiShare2,
  FiHeart,
  FiShoppingCart,
  FiX,
  FiCheck,
  FiAward,
  FiShield,
  FiTruck,
  FiPhone,
  FiImage
} from 'react-icons/fi'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductImage from '@/components/ProductImage'
import { useSession } from 'next-auth/react'
import QuoteModal from '@/components/QuoteModal'

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

interface ProductDetail {
  _id: string
  productId: string
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
  seo: {
    focusKeyword: string
    title: string
    description: string
    keywords: string[]
  }
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface Props {
  initialProduct: Product
  initialProductDetail: ProductDetail | null
  initialRelatedProducts: Product[]
}

const ProductDetailClient = ({ 
  initialProduct, 
  initialProductDetail, 
  initialRelatedProducts 
}: Props) => {
  const router = useRouter()
  const [product] = useState<Product>(initialProduct)
  const [productDetail] = useState<ProductDetail | null>(initialProductDetail)
  const [relatedProducts] = useState<Product[]>(initialRelatedProducts)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [featureImageIndex, setFeatureImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description')
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  
  const { data: session, status } = useSession()

  // Debug: Add this to see what data you're getting (keeping your original debug)
  useEffect(() => {
    if (productDetail) {
      console.log('=== PRODUCT DETAIL DEBUG ===')
      console.log('Full productDetail:', productDetail)
      console.log('Feature Images:', productDetail.featureImages)
      console.log('Feature Images Length:', productDetail.featureImages?.length)
      console.log('Feature Images Type:', typeof productDetail.featureImages)
      console.log('Is Array?:', Array.isArray(productDetail.featureImages))
      console.log('=== END DEBUG ===')
    }
  }, [productDetail])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateAverageRating = () => {
    if (!productDetail?.reviews?.length) return 0
    const sum = productDetail.reviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / productDetail.reviews.length
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const getAllImages = () => {
    const images = []
    
    // Only add feature images from ProductDetail (skip main product image)
    if (productDetail?.featureImages && Array.isArray(productDetail.featureImages)) {
      productDetail.featureImages.forEach(img => {
        if (img && img.image) {
          images.push(img.image)
        }
      })
    }
    
    // If no feature images, add main product image as fallback
    if (images.length === 0 && product?.image) {
      images.push(product.image)
    }
    
    return images
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.shortDescription,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const handleGetQuote = () => {
    if (status === 'loading') return // Still checking auth status
    
    if (!session) {
      // User is not logged in, redirect to signup page
      router.push('/signup')
      toast.info('Please sign in to request a quote')
    } else {
      // User is logged in, show quote modal
      setShowQuoteModal(true)
    }
  }

  // Feature image carousel navigation - IMPROVED (keeping your original logic)
  const nextFeatureImage = () => {
    if (productDetail?.featureImages && productDetail.featureImages.length > 0) {
      const nextIndex = featureImageIndex >= productDetail.featureImages.length - 1 ? 0 : featureImageIndex + 1
      console.log('Next image:', { currentIndex: featureImageIndex, nextIndex, totalImages: productDetail.featureImages.length })
      setFeatureImageIndex(nextIndex)
    }
  }

  const prevFeatureImage = () => {
    if (productDetail?.featureImages && productDetail.featureImages.length > 0) {
      const prevIndex = featureImageIndex <= 0 ? productDetail.featureImages.length - 1 : featureImageIndex - 1
      console.log('Previous image:', { currentIndex: featureImageIndex, prevIndex, totalImages: productDetail.featureImages.length })
      setFeatureImageIndex(prevIndex)
    }
  }

  const goToFeatureImage = (index: number) => {
    if (productDetail?.featureImages && index >= 0 && index < productDetail.featureImages.length) {
      console.log('Go to image:', { currentIndex: featureImageIndex, newIndex: index })
      setFeatureImageIndex(index)
    }
  }

  // Add this useEffect to reset feature image index when product changes (keeping your original)
  useEffect(() => {
    setFeatureImageIndex(0)
    setSelectedImageIndex(0)
  }, [productDetail])

  // Add this function near the top of your component (keeping your original debug):
  useEffect(() => {
    if (productDetail?.featureImages?.[0]?.image) {
      const image = productDetail.featureImages[0].image;
      
      console.log('=== IMAGE DEBUG ===');
      console.log('Image length:', image.length);
      console.log('Starts with "data:image":', image.startsWith('data:image'));
      console.log('First 50 chars:', image.substring(0, 50));
      console.log('Last 10 chars:', image.substring(image.length - 10));
      
      // Check if it's base64
      const isBase64Format = /^[A-Za-z0-9+/=]+$/.test(image.replace(/^data:image\/[a-z]+;base64,/, ''));
      console.log('Appears to be valid base64:', isBase64Format);
      
      // Create test image
      const testImg = new Image();
      testImg.onload = () => console.log('✅ Test image loaded successfully');
      testImg.onerror = () => console.log('❌ Test image failed to load');
      
      if (image.startsWith('data:image')) {
        testImg.src = image;
      } else {
        testImg.src = `data:image/jpeg;base64,${image}`;
      }
    }
  }, [productDetail]);

  const allImages = getAllImages()
  const averageRating = calculateAverageRating()

  // Add this helper function (keeping your original)
  const formatDescription = (description: string) => {
    if (!description) return ''
    
    // Convert line breaks to proper HTML and format headings
    let formatted = description
      .split('\n')
      .map(line => {
        const trimmed = line.trim()
        
        // Convert heading patterns
        if (trimmed.startsWith('# ')) {
          return `<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">${trimmed.substring(2)}</h1>`
        } else if (trimmed.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3">${trimmed.substring(3)}</h2>`
        } else if (trimmed.startsWith('### ')) {
          return `<h3 class="text-xl font-bold text-gray-900 mt-5 mb-3">${trimmed.substring(4)}</h3>`
        } else if (trimmed.startsWith('#### ')) {
          return `<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">${trimmed.substring(5)}</h4>`
        } else if (trimmed.startsWith('##### ')) {
          return `<h5 class="text-base font-bold text-gray-900 mt-3 mb-2">${trimmed.substring(6)}</h5>`
        } else if (trimmed.startsWith('###### ')) {
          return `<h6 class="text-sm font-bold text-gray-900 mt-3 mb-2">${trimmed.substring(7)}</h6>`
        } else if (trimmed.length === 0) {
          return '<br>'
        } else {
          return `<p class="mb-4">${trimmed}</p>`
        }
      })
      .join('')
    
    return formatted
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ToastContainer position="top-right" />
      
      <div className="container mx-auto px-4 py-12">
        {/* Improved Breadcrumb (keeping your exact design) */}
        <nav className="flex items-center space-x-3 text-sm mb-8 bg-white/70 backdrop-blur-sm rounded-xl px-5 py-3 shadow-sm border border-gray-100/50">
          <Link href="/" className="text-gray-500 hover:text-red-600 transition-colors">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/products" className="text-gray-500 hover:text-red-600 transition-colors">
            Products
          </Link>
          <span className="text-gray-300">/</span>
          <Link 
            href={`/products?category=${encodeURIComponent(product.category)}`} 
            className="text-gray-500 hover:text-red-600 transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-red-600 font-medium">{product.name}</span>
        </nav>

        {/* Back Button - Styled More Elegantly (keeping your exact design) */}
        <div className="mb-10">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-500 hover:text-red-600 transition-all duration-300 group"
          >
            <div className="w-8 h-8 mr-3 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-red-50 group-hover:shadow-lg transition-all">
              <FiArrowLeft className="w-4 h-4 group-hover:text-red-600" />
            </div>
            <span className="font-medium">Back to Products</span>
          </button>
        </div>

        {/* Main Product Section - Redesigned with Improved UI (keeping your exact design) */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Image Section - Enhanced with Better Visual Appeal (keeping your exact design) */}
            <div className="p-10 bg-white border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="space-y-8">
                {/* Main Image Display - With Enhanced Styling (keeping your exact design) */}
                <div 
                  className="aspect-square bg-white rounded-3xl overflow-hidden relative group shadow-lg border border-gray-100" 
                  style={{ 
                    minHeight: '400px', 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                  }}
                >
                  {productDetail?.featureImages && 
                   Array.isArray(productDetail.featureImages) && 
                   productDetail.featureImages.length > 0 && 
                   productDetail.featureImages[selectedImageIndex]?.image ? (
                    <>
                      <ProductImage
                        src={productDetail.featureImages[selectedImageIndex].image}
                        alt={productDetail.featureImages[selectedImageIndex].altText || `Product image ${selectedImageIndex + 1}`}
                        className="w-full h-full cursor-pointer"
                        onClick={() => setShowImageModal(true)}
                      />
                      
                      {/* Enhanced Zoom Overlay (keeping your exact design) */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                          <FiZoomIn className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                      
                      {/* Image counter - Enhanced (keeping your exact design) */}
                      {productDetail.featureImages.length > 1 && (
                        <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                          {selectedImageIndex + 1} / {productDetail.featureImages.length}
                        </div>
                      )}
                      
                      {/* Navigation arrows - Improved (keeping your exact design) */}
                      {productDetail.featureImages.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              const newIndex = selectedImageIndex <= 0 
                                ? productDetail.featureImages.length - 1 
                                : selectedImageIndex - 1
                              setSelectedImageIndex(newIndex)
                            }}
                            className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white transition-all duration-300 group z-10"
                          >
                            <FiChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors" />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              const newIndex = selectedImageIndex >= productDetail.featureImages.length - 1 
                                ? 0 
                                : selectedImageIndex + 1
                              setSelectedImageIndex(newIndex)
                            }}
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white transition-all duration-300 group z-10"
                          >
                            <FiChevronRight className="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors" />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    // Fallback when no feature images - Improved (keeping your exact design)
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <div className="text-center p-8">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FiImage className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No images available</p>
                        <p className="text-sm text-gray-400 mt-2">Upload images via Admin → Product Details</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Thumbnails - Improved Design (keeping your exact design) */}
                {productDetail?.featureImages && 
                 Array.isArray(productDetail.featureImages) && 
                 productDetail.featureImages.length > 1 && (
                  <div className="grid grid-cols-5 gap-4">
                    {productDetail.featureImages.map((image, index) => (
                      <div
                        key={index}
                        className={`aspect-square bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                          selectedImageIndex === index 
                            ? 'ring-2 ring-red-600 ring-offset-2 shadow-md transform scale-105' 
                            : 'border border-gray-100 hover:border-red-200 shadow-sm'
                        }`}
                        onClick={() => {
                          setSelectedImageIndex(index)
                        }}
                      >
                        <ProductImage
                          src={image.image || '/placeholder-product.png'}
                          alt={image.altText || `Product view ${index + 1}`}
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section - Redesigned with Better Layout (keeping your exact design) */}
            <div className="p-10 bg-white">
              {/* Product Name - Added at the Top for Better Hierarchy (keeping your exact design) */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Category Tag - Added for Better Visual Info (keeping your exact design) */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100">
                  {product.category}
                </span>
              </div>

              {/* Rating Display - Enhanced (keeping your exact design) */}
              {productDetail?.reviews && productDetail.reviews.length > 0 && (
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    {renderStars(Math.round(averageRating))}
                    <span className="text-xl font-semibold text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    ({productDetail.reviews.length} reviews)
                  </span>
                </div>
              )}

              {/* Description - Improved Typography (keeping your exact design) */}
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Key Features - Redesigned (keeping your exact design) */}
              {productDetail?.features && productDetail.features.length > 0 && (
                <div className="mb-10 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <FiCheck className="w-4 h-4 text-green-600" />
                    </div>
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 gap-3 pl-4">
                    {productDetail.features.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trust Badges - Redesigned to Remove Free Shipping (keeping your exact design) */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl border border-blue-100 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <FiShield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Warranty</h4>
                      <p className="text-sm text-gray-600 mt-1">Guaranteed protection</p>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-100 shadow-sm">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <FiAward className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Certified</h4>
                      <p className="text-sm text-gray-600 mt-1">Quality assured</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Redesigned (keeping your exact design) */}
              <div className="space-y-5">
                {/* Primary Actions - Improved with gradients (keeping your exact design) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <button
                    onClick={handleGetQuote}
                    disabled={status === 'loading'}
                    className="group bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-4 rounded-2xl hover:shadow-lg hover:shadow-red-200/50 transition-all duration-300 text-center font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 group-hover:bg-white/30 transition-colors">
                      <FiShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    {status === 'loading' ? 'Loading...' : 'Get Quote'}
                  </button>
                  <Link
                    href="/contact"
                    className="group bg-gradient-to-r from-gray-50 to-white text-gray-800 px-6 py-4 rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-md transition-all duration-300 text-center font-semibold flex items-center justify-center"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-red-50 transition-colors">
                      <FiPhone className="w-5 h-5 text-gray-700 group-hover:text-red-600" />
                    </div>
                    Contact Us
                  </Link>
                </div>
                
                {/* Share Button - Removed Save for Later as requested (keeping your exact design) */}
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                >
                  <FiShare2 className="w-5 h-5 text-gray-700" />
                  <span className="font-medium">Share Product</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Modern Redesign (keeping your exact design) */}
        {productDetail && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-100">
            {/* Tab Navigation - More Modern Design (keeping your exact design) */}
            <div className="border-b border-gray-100 bg-white">
              <nav className="flex px-8">
                {[
                  { key: 'description' as const, label: 'Description', icon: FiPackage },
                  { key: 'specifications' as const, label: 'Specifications', icon: FiTag },
                  { key: 'reviews' as const, label: `Reviews (${productDetail.reviews?.length || 0})`, icon: FiStar }
                ].map((tab) => {
                  const IconComponent = tab.icon
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`py-6 px-8 font-semibold text-sm flex items-center gap-3 transition-all duration-300 ${
                        activeTab === tab.key
                          ? 'border-b-2 border-red-600 text-red-600 bg-red-50/30'
                          : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activeTab === tab.key ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`w-4 h-4 ${
                          activeTab === tab.key ? 'text-red-600' : 'text-gray-500'
                        }`} />
                      </div>
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Tab Content - Improved Design (keeping your exact design) */}
            <div className="p-10">
              {activeTab === 'description' && (
                <div>
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed formatted-content"
                      dangerouslySetInnerHTML={{
                        __html: formatDescription(productDetail.longDescription)
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  {productDetail.specifications && productDetail.specifications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {productDetail.specifications.map((spec, index) => (
                        <div key={index} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-900">{spec.key}</span>
                            <span className="text-gray-700 bg-white px-4 py-2 rounded-xl border border-gray-100">{spec.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">No specifications available for this product.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {productDetail.reviews && productDetail.reviews.length > 0 ? (
                    <div className="space-y-10">
                      {/* Rating Summary - Improved Design (keeping your exact design) */}
                      <div className="p-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-100 shadow-sm">
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <div className="text-5xl font-bold text-amber-600 mb-3">{averageRating.toFixed(1)}</div>
                            <div className="flex items-center justify-center mb-3">
                              {renderStars(Math.round(averageRating))}
                            </div>
                            <p className="text-sm text-gray-600 font-medium">
                              {productDetail.reviews.length} review{productDetail.reviews.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Reviews</h3>
                            <p className="text-gray-600">
                              See what our customers are saying about this product
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Individual Reviews - Improved Design (keeping your exact design) */}
                      <div className="space-y-6">
                        {productDetail.reviews.map((review, index) => (
                          <div key={index} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-start gap-5">
                              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-md">
                                {review.customerName.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                  <h4 className="font-semibold text-gray-900 text-lg">{review.customerName}</h4>
                                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                    {renderStars(review.rating)}
                                  </div>
                                  <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                    {formatDate(review.date)}
                                  </span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiStar className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                      <p className="text-gray-500 text-lg">Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related Products - Redesigned (keeping your exact design) */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/products/${relatedProduct._id}`}
                  className="group bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500"
                >
                  <div className="h-72 bg-white overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-product.png'
                      }}
                    />
                  </div>
                  <div className="p-8 border-t border-gray-100">
                    <span className="inline-block px-4 py-2 bg-red-50 text-red-700 text-xs font-medium rounded-full mb-4 border border-red-100">
                      {relatedProduct.category}
                    </span>
                    <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {relatedProduct.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal - Enhanced (keeping your exact design) */}
      {showImageModal && productDetail?.featureImages && productDetail.featureImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative max-w-6xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-5 right-5 text-white hover:text-red-300 z-20 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
            >
              <FiX className="w-6 h-6" />
            </button>
            
            <div className="p-2 rounded-3xl bg-white/5 backdrop-blur-sm">
              <ProductImage
                src={productDetail.featureImages[selectedImageIndex]?.image || productDetail.featureImages[0].image}
                alt={productDetail.featureImages[selectedImageIndex]?.altText || productDetail.featureImages[0].altText}
                className="w-full h-auto max-h-[85vh] bg-white rounded-2xl"
              />
            </div>
            
            {productDetail.featureImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : productDetail.featureImages.length - 1)}
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-red-600/80 transition-all duration-300"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev < productDetail.featureImages.length - 1 ? prev + 1 : 0)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-red-600/80 transition-all duration-300"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
                
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm text-black px-4 py-2 rounded-full font-medium">
                  {selectedImageIndex + 1} of {productDetail.featureImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quote Modal (keeping your exact design) */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        productName={product?.name || ''}
        productId={product?._id || ''}
      />

      {/* Add this CSS to your global styles or add a style tag (keeping your exact styles): */}
      <style jsx>{`
        .formatted-content h1,
        .formatted-content h2,
        .formatted-content h3,
        .formatted-content h4,
        .formatted-content h5,
        .formatted-content h6 {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          font-weight: bold;
          color: #111827;
        }
        
        .formatted-content h1 { font-size: 1.875rem; }
        .formatted-content h2 { font-size: 1.5rem; }
        .formatted-content h3 { font-size: 1.25rem; }
        .formatted-content h4 { font-size: 1.125rem; }
        .formatted-content h5 { font-size: 1rem; }
        .formatted-content h6 { font-size: 0.875rem; }
        
        .formatted-content p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        
        img {
          image-rendering: auto;
          image-rendering: crisp-edges;
          image-rendering: -webkit-optimize-contrast;
        }
      `}</style>
    </div>
  )
}

export default ProductDetailClient