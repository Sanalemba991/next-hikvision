import { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
  params: { id: string }
}

// Server-side data fetching
async function getProductData(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}

async function getRelatedProducts(category: string, excludeId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/products?category=${encodeURIComponent(category)}&limit=4`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    const filtered = data.products.filter((p: Product) => p._id !== excludeId)
    return filtered.slice(0, 3)
  } catch (error) {
    console.error('Failed to fetch related products:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getProductData(params.id)
  
  if (!data || !data.product) {
    return {
      title: 'Product Not Found | Hikvision Security Solutions',
      description: 'The requested product could not be found.'
    }
  }

  const { product, productDetail } = data
  
  // Use SEO data from productDetail if available, otherwise fallback to product data
  const title = productDetail?.seo?.title || `${product.name} | Professional Security Solutions`
  const description = productDetail?.seo?.description || product.shortDescription
  const keywords = productDetail?.seo?.keywords || [product.category, product.subCategory, 'security', 'surveillance']
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
        ...(productDetail?.featureImages?.map((img: { image: string; altText: string }) => ({
          url: img.image,
          width: 800,
          height: 600,
          alt: img.altText || product.name,
        })) || [])
      ],
      type: 'website',
      siteName: 'Hikvision Security Solutions',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
    alternates: {
      canonical: `/products/${params.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Main page component (Server Component)
export default async function ProductDetailPage({ params }: PageProps) {
  const data = await getProductData(params.id)
  
  if (!data || !data.product) {
    notFound()
  }

  const { product, productDetail } = data
  const relatedProducts = await getRelatedProducts(product.category, params.id)

  // Generate JSON-LD structured data for SEO
  const averageRating = productDetail?.reviews?.length > 0 
    ? productDetail.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / productDetail.reviews.length 
    : 0

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.image,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Hikvision'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Hikvision'
    },
    ...(productDetail?.reviews?.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: averageRating,
        reviewCount: productDetail.reviews.length
      },
      review: productDetail.reviews.map((review: any) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.customerName
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating
        },
        reviewBody: review.comment,
        datePublished: review.date
      }))
    })
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Client Component with pre-fetched data */}
      <ProductDetailClient
        initialProduct={product}
        initialProductDetail={productDetail}
        initialRelatedProducts={relatedProducts}
      />
    </>
  )
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/products?limit=100`)
    
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    
    return data.products.map((product: Product) => ({
      id: product._id,
    }))
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
  }
}