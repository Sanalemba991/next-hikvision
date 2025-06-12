import { Suspense } from 'react'
import ProductsContent from './components/ProductsContent'

// Loading component for the entire page
function ProductsPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-96 bg-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-6 z-10 flex items-center h-full">
          <div className="text-left">
            <div className="w-48 h-8 bg-white/20 rounded mb-4"></div>
            <div className="w-96 h-16 bg-white/20 rounded mb-4"></div>
            <div className="w-80 h-6 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="h-12 bg-gray-200 rounded flex-1 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
        
        {/* Results Summary Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        
        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination Skeleton */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

// Main page component with Suspense boundary
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageLoading />}>
      <ProductsContent />
    </Suspense>
  )
}