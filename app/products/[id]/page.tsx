import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ProductDetailClient from './ProductDetailClient'

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

interface PageProps {
  params: Promise<{ id: string }> // Changed to Promise
}

// OPTIMIZED: Add timeout and better error handling
async function getProduct(id: string): Promise<{ product: Product; productDetail: ProductDetail } | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    
    // FIXED: Increased timeout and removed cache for large responses
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // Increased to 10 seconds
    
    const response = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: 'no-store', // CHANGED: Don't cache large responses
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// OPTIMIZED: Cache related products
async function getRelatedProducts(category: string, excludeId: string): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // Reduced timeout for smaller response
    
    const response = await fetch(`${baseUrl}/api/products?category=${encodeURIComponent(category)}&limit=4`, {
      cache: 'force-cache',
      next: { revalidate: 1800 }, // Revalidate every 30 minutes
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    const filtered = data.products.filter((p: Product) => p._id !== excludeId)
    return filtered.slice(0, 3)
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

// ENHANCED: Better SEO with structured data - FIXED ASYNC PARAMS
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params // FIXED: Await params
  const productData = await getProduct(id)
  
  if (!productData) {
    return {
      title: 'Product Not Found | Professional Security Solutions',
      description: 'The requested product could not be found.',
      robots: 'noindex, nofollow'
    }
  }
  
  const { product, productDetail } = productData
  
  const title = productDetail?.seo?.title || `${product.name} | Professional Security Solutions`
  const description = productDetail?.seo?.description || product.shortDescription || `Discover ${product.name} in our ${product.category} category. High-quality security solutions for your needs.`
  const keywords = productDetail?.seo?.keywords || [product.category, product.subCategory, 'security', 'surveillance']
  
  // Get the best image URL
  const imageUrl = (() => {
    if (productDetail?.featureImages?.[0]?.image) {
      return productDetail.featureImages[0].image.startsWith('data:') 
        ? '/images/placeholder-product.png' // FIXED: Correct path
        : productDetail.featureImages[0].image
    }
    return product.image || '/images/placeholder-product.png' // FIXED: Correct path
  })()
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    
    // Enhanced Open Graph
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/products/${id}`, // FIXED: Use awaited id
      siteName: 'Professional Security Solutions',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
          type: 'image/jpeg'
        }
      ]
    },
    
    // Enhanced Twitter
    twitter: {
      card: 'summary_large_image',
      site: '@yourtwitterhandle',
      title,
      description,
      images: [imageUrl]
    },
    
    // Better canonicals and alternates
    alternates: {
      canonical: `/products/${id}` // FIXED: Use awaited id
    },
    
    // Add robots meta
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    
    // Add other important meta tags
    other: {
      'product:brand': 'Professional Security Solutions',
      'product:category': product.category,
      'product:condition': 'new',
      'product:availability': product.isActive ? 'in stock' : 'out of stock'
    }
  }
}

// OPTIMIZED: Add loading component
function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-6"></div>
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    </div>
  )
}

// ENHANCED: Add structured data - FIXED ASYNC PARAMS
export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params // FIXED: Await params
  const productData = await getProduct(id)
  
  if (!productData) {
    notFound()
  }
  
  const { product, productDetail } = productData
  const relatedProducts = await getRelatedProducts(product.category, id) // FIXED: Use awaited id
  
  // Generate structured data for better SEO
  const averageRating = productDetail?.reviews?.length 
    ? productDetail.reviews.reduce((acc, review) => acc + review.rating, 0) / productDetail.reviews.length 
    : 0
  
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.shortDescription,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "Professional Security Solutions"
    },
    "sku": product._id,
    "offers": {
      "@type": "Offer",
      "availability": product.isActive ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "priceCurrency": "USD",
      "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/products/${id}` // FIXED: Use awaited id
    }
  }
  
  // Add reviews to structured data if available
  if (productDetail?.reviews?.length) {
    structuredData["aggregateRating"] = {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": productDetail.reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    }
    
    structuredData["review"] = productDetail.reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.customerName
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.comment,
      "datePublished": review.date
    }))
  }
  
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Suspense for better loading */}
      <Suspense fallback={<ProductDetailLoading />}>
        <ProductDetailClient
          product={product}
          productDetail={productDetail}
          relatedProducts={relatedProducts}
        />
      </Suspense>
    </>
  )
}

// OPTIMIZED: Better static params generation - REMOVED TO AVOID BUILD ISSUES
// Comment out or remove generateStaticParams if it's causing issues
// export async function generateStaticParams() {
//   return [] // Return empty array to disable static generation for now
// }