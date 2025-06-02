'use client'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
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
  FiExternalLink
} from 'react-icons/fi'

// CRITICAL: Remove all dynamic imports for initial load
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
  
  // CRITICAL: Minimal state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description')
  const [isWishlisted, setIsWishlisted] = useState(false)

  // CRITICAL: Memoized calculations
  const averageRating = useMemo(() => {
    if (!productDetail?.reviews?.length) return 0
    return productDetail.reviews.reduce((acc, review) => acc + review.rating, 0) / productDetail.reviews.length
  }, [productDetail?.reviews])

  const hasFeatureImages = useMemo(() => {
    return productDetail?.featureImages && productDetail.featureImages.length > 0
  }, [productDetail?.featureImages])

  // CRITICAL: Optimized handlers
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
      alert('Link copied to clipboard!')
    }
  }, [product])

  const handleGetQuote = () => {
    if (!session) {
      router.push('/signup')
    } else {
      window.open(`/contact?product=${encodeURIComponent(product.name)}`, '_blank')
    }
  }

  // CRITICAL: Simple star rendering
  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* CRITICAL: Minimal header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* CRITICAL: Simplified hero section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            
            {/* CRITICAL: Optimized image section */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-50 rounded-xl relative overflow-hidden">
                {hasFeatureImages && productDetail?.featureImages[selectedImageIndex]?.image ? (
                  <>
                    <Image
                      src={productDetail.featureImages[selectedImageIndex].image}
                      alt={productDetail.featureImages[selectedImageIndex].altText || product.name}
                      fill
                      className="object-contain cursor-pointer"
                      onClick={() => setShowImageModal(true)}
                      priority={selectedImageIndex === 0}
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {productDetail.featureImages.length > 1 && (
                      <>
                        <button
                          onClick={() => handleImageNavigation('prev')}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                        >
                          <FiChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleImageNavigation('next')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                        >
                          <FiChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="absolute top-4 left-4 w-10 h-10 bg-white/80 rounded-full shadow-md flex items-center justify-center hover:bg-white"
                    >
                      <FiHeart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FiImage className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* CRITICAL: Simple thumbnails */}
              {hasFeatureImages && productDetail?.featureImages && productDetail.featureImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {productDetail.featureImages.slice(0, 5).map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-square border-2 rounded cursor-pointer ${
                        selectedImageIndex === index ? 'border-red-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={image.image}
                        alt={image.altText || ''}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain rounded"
                        quality={60}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CRITICAL: Simplified product details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              {productDetail?.reviews && productDetail.reviews.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <span className="font-semibold">{averageRating.toFixed(1)}</span>
                  <span className="text-sm text-gray-600">({productDetail.reviews.length} reviews)</span>
                </div>
              )}

              <p className="text-gray-700 leading-relaxed">{product.shortDescription}</p>

              {/* CRITICAL: Simple features */}
              {productDetail?.features && productDetail.features.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FiCheck className="w-5 h-5 text-green-600 mr-2" />
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {productDetail.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-3"></span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CRITICAL: Simple trust badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FiShield className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-semibold">Warranty</h4>
                    <p className="text-sm text-gray-600">Protected</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <FiCheck className="w-6 h-6 text-purple-600 mr-3" />
                  <div>
                    <h4 className="font-semibold">Certified</h4>
                    <p className="text-sm text-gray-600">Quality assured</p>
                  </div>
                </div>
              </div>

              {/* CRITICAL: Simple action buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleGetQuote}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center"
                  >
                    <FiShoppingCart className="w-5 h-5 mr-2" />
                    Get Quote
                  </button>
                  <Link
                    href="/contact"
                    className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center"
                  >
                    <FiPhone className="w-5 h-5 mr-2" />
                    Contact
                  </Link>
                </div>
                <button
                  onClick={handleShare}
                  className="w-full bg-white border border-gray-200 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center"
                >
                  <FiShare2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CRITICAL: Simple tabs */}
        {productDetail && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="border-b">
              <nav className="flex">
                {[
                  { key: 'description', label: 'Overview', icon: FiPackage },
                  { key: 'specifications', label: 'Specs', icon: FiTag },
                  { key: 'reviews', label: 'Reviews', icon: FiStar }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`py-4 px-6 font-medium flex items-center gap-2 ${
                      activeTab === tab.key
                        ? 'border-b-2 border-red-500 text-red-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: productDetail.longDescription?.replace(/\n/g, '<br>') || 'No description available.'
                  }}
                />
              )}

              {activeTab === 'specifications' && (
                <div>
                  {productDetail.specifications?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {productDetail.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between p-3 bg-gray-50 rounded">
                          <span className="font-medium">{spec.key}</span>
                          <span className="text-gray-600">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No specifications available.</p>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {productDetail.reviews?.length > 0 ? (
                    <div className="space-y-6">
                      {productDetail.reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                              <span className="text-red-600 font-semibold text-sm">
                                {review.customerName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium">{review.customerName}</h4>
                              <div className="flex items-center gap-2">
                                {renderStars(review.rating)}
                                <span className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                      <p className="text-gray-500">Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CRITICAL: Simple related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  href={`/products/${relatedProduct._id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-square bg-gray-50">
                    {relatedProduct.image ? (
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-contain"
                        quality={75}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      {relatedProduct.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-2 mb-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {relatedProduct.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CRITICAL: Simple image modal */}
      {showImageModal && hasFeatureImages && productDetail && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
            >
              <FiX className="w-6 h-6" />
            </button>
            <Image
              src={productDetail.featureImages[selectedImageIndex]?.image || ''}
              alt={productDetail.featureImages[selectedImageIndex]?.altText || ''}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain bg-white rounded-lg"
              quality={90}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailClient