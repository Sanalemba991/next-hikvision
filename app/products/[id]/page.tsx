import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'
import dbConnect from '@/lib/mongodb'

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
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface PageProps {
  params: Promise<{ id: string }>
}

// FIXED: Direct database access instead of HTTP fetch
async function getProductData(id: string) {
  try {
    await dbConnect()
    
    const { default: Product } = await import('@/models/Product')
    const { default: ProductDetail } = await import('@/models/ProductDetail')
    
    const product = await Product.findById(id).lean()
    
    if (!product || Array.isArray(product)) {
      return null
    }
    
    const productDetail = await ProductDetail.findOne({
      productId: id,
      isActive: true
    }).lean()
    
    // Serialize for client
    const serializedProduct: Product = {
      _id: (product._id as any).toString(),
      name: product.name || '',
      shortDescription: product.shortDescription || '',
      category: product.category || '',
      subCategory: product.subCategory || '',
      image: product.image || '',
      isActive: product.isActive ?? true,
      createdAt: product.createdAt?.toISOString?.() || new Date().toISOString(),
      updatedAt: product.updatedAt?.toISOString?.() || new Date().toISOString(),
    }
    
    const serializedProductDetail: ProductDetail | null = productDetail ? {
      _id: (productDetail._id as any).toString(),
      productId: (productDetail.productId as any).toString(),
      longDescription: productDetail.longDescription || '',
      featureImages: productDetail.featureImages || [],
      specifications: productDetail.specifications || [],
      features: productDetail.features || [],
      reviews: (productDetail.reviews || []).map((review: any) => ({
        customerName: review.customerName,
        rating: review.rating,
        comment: review.comment,
        date: review.date instanceof Date ? review.date.toISOString() : review.date
      })),
      isActive: productDetail.isActive ?? true,
      createdAt: productDetail.createdAt?.toISOString?.() || new Date().toISOString(),
      updatedAt: productDetail.updatedAt?.toISOString?.() || new Date().toISOString(),
    } : null
    
    return {
      product: serializedProduct,
      productDetail: serializedProductDetail
    }
    
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}

// FIXED: Direct database access instead of HTTP fetch
async function getRelatedProducts(category: string, excludeId: string): Promise<Product[]> {
  try {
    await dbConnect()
    
    const { default: Product } = await import('@/models/Product')
    
    const products = await Product.find({
      category,
      isActive: true,
      _id: { $ne: excludeId }
    })
    .limit(3)
    .lean()
    
    // Serialize for client
    const serializedProducts: Product[] = products.map(product => ({
      _id: (product._id as any).toString(),
      name: product.name || '',
      shortDescription: product.shortDescription || '',
      category: product.category || '',
      subCategory: product.subCategory || '',
      image: product.image || '',
      isActive: product.isActive ?? true,
      createdAt: product.createdAt?.toISOString?.() || new Date().toISOString(),
      updatedAt: product.updatedAt?.toISOString?.() || new Date().toISOString(),
    }))
    
    return serializedProducts
    
  } catch (error) {
    console.error('Failed to fetch related products:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const data = await getProductData(id)
  
  if (!data || !data.product) {
    return {
      title: 'Product Not Found | Hikvision Security Solutions',
      description: 'The requested product could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const { product, productDetail } = data
  
  const title = `${product.name} | Professional Security Solutions`
  const description = product.shortDescription || `${product.name} - Professional security solution`
  const keywords = [product.category, product.subCategory, 'security', 'surveillance']
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image || '/placeholder-product.png',
          width: 800,
          height: 600,
          alt: product.name,
        },
        ...(productDetail?.featureImages?.map((img: { image: string; altText: string }) => ({
          url: img.image || '/placeholder-product.png',
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
      images: [product.image || '/placeholder-product.png'],
    },
    alternates: {
      canonical: `/products/${id}`,
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
  const { id } = await params
  const data = await getProductData(id)
  
  if (!data || !data.product) {
    notFound()
  }

  const { product, productDetail } = data
  const relatedProducts = await getRelatedProducts(product.category, id)

  // Generate JSON-LD structured data for SEO
  const averageRating = productDetail?.reviews && productDetail.reviews.length > 0 
    ? productDetail.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / productDetail.reviews.length 
    : 0

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || `${product.name} - Professional security solution`,
    image: product.image || '/placeholder-product.png',
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Hikvision'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Hikvision'
    },
    ...(productDetail?.reviews && productDetail.reviews.length > 0 && {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ProductDetailClient
        initialProduct={product}
        initialProductDetail={productDetail as any}
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