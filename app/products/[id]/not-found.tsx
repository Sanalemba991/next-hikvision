import Link from 'next/link'
import { FiArrowLeft, FiPackage } from 'react-icons/fi'

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiPackage className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>
      </div>
    </div>
  )
}