'use client'
import { useState, useEffect } from 'react'
import { 
  FiSearch, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiX, 
  FiImage,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiSave,
  FiRefreshCw
} from 'react-icons/fi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdvancedSEOGenerator from '@/components/AdvancedSEOGenerator'

interface Product {
  _id: string
  name: string
  image: string
  category: string
}

interface ProductDetail {
  _id: string
  productId: string
  product: Product
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

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalProducts: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

const ProductDetailsPage = () => {
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingDetail, setEditingDetail] = useState<ProductDetail | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPrevPage: false
  })

  // Form state
  const [formData, setFormData] = useState({
    productId: '',
    longDescription: '',
    featureImages: [{ image: '', altText: '' }],
    specifications: [{ key: '', value: '' }],
    features: [''],
    reviews: [{ customerName: '', rating: 5, comment: '', date: new Date().toISOString() }],
    seo: {
      focusKeyword: '',
      title: '',
      description: '',
      keywords: ['']
    }
  })

  // Fetch product details
  const fetchProductDetails = async (page = 1, search = '') => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/admin/product-details?page=${page}&limit=10&search=${encodeURIComponent(search)}`
      )
      const data = await response.json()

      if (response.ok) {
        setProductDetails(data.productDetails)
        setPagination(data.pagination)
      } else {
        toast.error(data.error || 'Failed to fetch product details')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      console.error('Fetch product details error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch products list
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products/list')
      const data = await response.json()

      if (response.ok) {
        setProducts(data.products)
      } else {
        toast.error('Failed to fetch products list')
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      console.error('Fetch products error:', error)
    }
  }

  useEffect(() => {
    fetchProductDetails()
    fetchProducts()
  }, [])

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    fetchProductDetails(1, value)
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchProductDetails(page, searchTerm)
  }

  // Auto-generate SEO
  const autoGenerateSEO = () => {
    const selectedProduct = products.find(p => p._id === formData.productId)
    if (selectedProduct && formData.longDescription) {
      const generatedTitle = `${selectedProduct.name} - ${selectedProduct.category} | Professional Security Solutions`
      const generatedDesc = formData.longDescription.substring(0, 150) + '...'
      const generatedKeywords = [
        formData.seo.focusKeyword,
        selectedProduct.name.toLowerCase(),
        selectedProduct.category.toLowerCase(),
        'security camera',
        'surveillance',
        'hikvision'
      ].filter(Boolean)

      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          title: generatedTitle,
          description: generatedDesc,
          keywords: generatedKeywords
        }
      }))

      toast.success('SEO content auto-generated successfully!')
    } else {
      toast.error('Please select a product and add description first')
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.productId || !formData.longDescription || !formData.seo.focusKeyword) {
      toast.error('Product, long description, and SEO focus keyword are required')
      return
    }

    try {
      const url = editingDetail 
        ? `/api/admin/product-details/${editingDetail._id}`
        : '/api/admin/product-details'
      
      const method = editingDetail ? 'PUT' : 'POST'
      
      // Filter out empty values
      const cleanFormData = {
        ...formData,
        featureImages: formData.featureImages.filter(img => img.image && img.altText),
        specifications: formData.specifications.filter(spec => spec.key && spec.value),
        features: formData.features.filter(feature => feature.trim()),
        reviews: formData.reviews.filter(review => review.customerName && review.comment),
        seo: {
          ...formData.seo,
          keywords: formData.seo.keywords.filter(keyword => keyword.trim())
        }
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanFormData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setShowModal(false)
        resetForm()
        fetchProductDetails(pagination.currentPage, searchTerm)
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      console.error('Submit error:', error)
    }
  }

  // Handle delete
  const handleDelete = async (detailId: string) => {
    if (!confirm('Are you sure you want to delete these product details?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/product-details/${detailId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        fetchProductDetails(pagination.currentPage, searchTerm)
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      console.error('Delete error:', error)
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFormData(prev => ({
          ...prev,
          featureImages: prev.featureImages.map((img, i) => 
            i === index ? { ...img, image: result } : img
          )
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Add/Remove array items
  const addFeatureImage = () => {
    if (formData.featureImages.length < 5) {
      setFormData(prev => ({
        ...prev,
        featureImages: [...prev.featureImages, { image: '', altText: '' }]
      }))
    }
  }

  const removeFeatureImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      featureImages: prev.featureImages.filter((_, i) => i !== index)
    }))
  }

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }))
  }

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const addReview = () => {
    setFormData(prev => ({
      ...prev,
      reviews: [...prev.reviews, { customerName: '', rating: 5, comment: '', date: new Date().toISOString() }]
    }))
  }

  const removeReview = (index: number) => {
    setFormData(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index)
    }))
  }

  const addKeyword = () => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: [...prev.seo.keywords, '']
      }
    }))
  }

  const removeKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter((_, i) => i !== index)
      }
    }))
  }

  // Form helpers
  const openCreateModal = () => {
    resetForm()
    setEditingDetail(null)
    setShowModal(true)
  }

  const openEditModal = (detail: ProductDetail) => {
    setFormData({
      productId: detail.productId,
      longDescription: detail.longDescription,
      featureImages: detail.featureImages.length > 0 ? detail.featureImages : [{ image: '', altText: '' }],
      specifications: detail.specifications.length > 0 ? detail.specifications : [{ key: '', value: '' }],
      features: detail.features.length > 0 ? detail.features : [''],
      reviews: detail.reviews.length > 0 ? detail.reviews : [{ customerName: '', rating: 5, comment: '', date: new Date().toISOString() }],
      seo: {
        focusKeyword: detail.seo.focusKeyword,
        title: detail.seo.title,
        description: detail.seo.description,
        keywords: detail.seo.keywords.length > 0 ? detail.seo.keywords : ['']
      }
    })
    setEditingDetail(detail)
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      productId: '',
      longDescription: '',
      featureImages: [{ image: '', altText: '' }],
      specifications: [{ key: '', value: '' }],
      features: [''],
      reviews: [{ customerName: '', rating: 5, comment: '', date: new Date().toISOString() }],
      seo: {
        focusKeyword: '',
        title: '',
        description: '',
        keywords: ['']
      }
    })
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingDetail(null)
    resetForm()
  }

  return (
    <div className="p-8">
      <ToastContainer position="top-right" />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Details Management</h1>
          <p className="text-gray-600">Manage detailed information, features, and SEO for your products</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add Product Details
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product name, category, or SEO keyword..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      {/* Product Details Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading product details...</p>
          </div>
        ) : productDetails.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FiImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p>{searchTerm ? 'No product details found matching your search.' : 'No product details found. Create your first product detail!'}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEO Info</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviews</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productDetails.map((detail) => (
                    <tr key={detail._id} className="hover:bg-gray-50">
                      
                      {/* Product Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 flex-shrink-0">
                            <img
                              src={detail.product.image}
                              alt={detail.product.name}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-product.png'
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {detail.product.name}
                            </div>
                            <div className="text-sm text-gray-500">{detail.product.category}</div>
                          </div>
                        </div>
                      </td>

                      {/* SEO Info */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div className="font-medium">Focus: {detail.seo.focusKeyword}</div>
                          <div className="text-gray-500 truncate max-w-xs">{detail.seo.title}</div>
                        </div>
                      </td>

                      {/* Features Count */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div>{detail.features.length} Features</div>
                          <div className="text-gray-500">{detail.featureImages.length} Images</div>
                        </div>
                      </td>

                      {/* Reviews Count */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {detail.reviews.length} Reviews
                        </div>
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(detail.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(detail)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors p-2 rounded-lg hover:bg-indigo-50"
                            title="Edit Details"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(detail._id)}
                            className="text-red-600 hover:text-red-900 transition-colors p-2 rounded-lg hover:bg-red-50"
                            title="Delete Details"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.totalProducts)} of {pagination.totalProducts} product details
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm rounded-md ${
                            page === pagination.currentPage
                              ? 'bg-red-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingDetail ? 'Edit Product Details' : 'Create Product Details'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Product *
                </label>
                {!editingDetail ? (
                  <div className="space-y-2">
                    <select
                      value={formData.productId}
                      onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select a product</option>
                      {products
                        .filter(product => !productDetails.some(detail => detail.productId === product._id))
                        .map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.name} - {product.category}
                          </option>
                        ))}
                    </select>
                    
                    {/* Product Preview */}
                    {formData.productId && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                        {(() => {
                          const selectedProduct = products.find(p => p._id === formData.productId)
                          return selectedProduct ? (
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 flex-shrink-0">
                                <img
                                  src={selectedProduct.image}
                                  alt={selectedProduct.name}
                                  className="w-full h-full object-cover rounded-lg"
                                  onError={(e) => {
                                    e.currentTarget.src = '/placeholder-product.png'
                                  }}
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{selectedProduct.name}</h4>
                                <p className="text-sm text-gray-600">{selectedProduct.category}</p>
                                <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                  Ready for details
                                </span>
                              </div>
                            </div>
                          ) : null
                        })()}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={editingDetail.product.image}
                          alt={editingDetail.product.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.png'
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{editingDetail.product.name}</h4>
                        <p className="text-sm text-gray-600">{editingDetail.product.category}</p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          Editing mode
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Product cannot be changed when editing</p>
                  </div>
                )}
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long Description *
                </label>
                <textarea
                  value={formData.longDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter detailed product description..."
                  required
                />
              </div>

              {/* Feature Images */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Feature Images (Max 5)
                  </label>
                  <button
                    type="button"
                    onClick={addFeatureImage}
                    disabled={formData.featureImages.length >= 5}
                    className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    + Add Image
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.featureImages.map((img, index) => (
                    <div key={index} className="flex gap-3 items-start p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                          className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <input
                          type="text"
                          placeholder="Alt text for SEO"
                          value={img.altText}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            featureImages: prev.featureImages.map((image, i) => 
                              i === index ? { ...image, altText: e.target.value } : image
                            )
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      {img.image && (
                        <div className="w-16 h-16 flex-shrink-0">
                          <img
                            src={img.image}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFeatureImage(index)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Specifications
                  </label>
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    + Add Specification
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.specifications.map((spec, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Specification key"
                        value={spec.key}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          specifications: prev.specifications.map((specification, i) => 
                            i === index ? { ...specification, key: e.target.value } : specification
                          )
                        }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                      <input
                        type="text"
                        placeholder="Specification value"
                        value={spec.value}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          specifications: prev.specifications.map((specification, i) => 
                            i === index ? { ...specification, value: e.target.value } : specification
                          )
                        }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Features
                  </label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Enter product feature"
                        value={feature}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          features: prev.features.map((f, i) => 
                            i === index ? e.target.value : f
                          )
                        }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Customer Reviews
                  </label>
                  <button
                    type="button"
                    onClick={addReview}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    + Add Review
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.reviews.map((review, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg space-y-2">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Customer name"
                          value={review.customerName}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            reviews: prev.reviews.map((r, i) => 
                              i === index ? { ...r, customerName: e.target.value } : r
                            )
                          }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <select
                          value={review.rating}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            reviews: prev.reviews.map((r, i) => 
                              i === index ? { ...r, rating: parseInt(e.target.value) } : r
                            )
                          }))}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>{rating}★</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => removeReview(index)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        placeholder="Review comment"
                        value={review.comment}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          reviews: prev.reviews.map((r, i) => 
                            i === index ? { ...r, comment: e.target.value } : r
                          )
                        }))}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Advanced SEO Section */}
              <div className="border-t border-gray-200 pt-6">
                <AdvancedSEOGenerator
                  seoData={formData.seo}
                  productName={products.find(p => p._id === formData.productId)?.name || ''}
                  productCategory={products.find(p => p._id === formData.productId)?.category || ''}
                  longDescription={formData.longDescription}
                  onSEOUpdate={(seo) => setFormData(prev => ({ ...prev, seo }))}
                />
                
                {/* Manual SEO Fields (for fine-tuning) */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Manual SEO Adjustments</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {/* Focus Keyword */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Focus Keyword *
                      </label>
                      <input
                        type="text"
                        value={formData.seo.focusKeyword}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          seo: { ...prev.seo, focusKeyword: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Main keyword for SEO"
                        required
                      />
                    </div>

                    {/* SEO Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        value={formData.seo.title}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          seo: { ...prev.seo, title: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="SEO title for search engines"
                        maxLength={60}
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-gray-500">{formData.seo.title.length}/60 characters</span>
                        <span className={`${formData.seo.title.length >= 30 && formData.seo.title.length <= 60 ? 'text-green-600' : 'text-orange-600'}`}>
                          {formData.seo.title.length >= 30 && formData.seo.title.length <= 60 ? 'Optimal' : 'Needs adjustment'}
                        </span>
                      </div>
                    </div>

                    {/* SEO Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO Description
                      </label>
                      <textarea
                        value={formData.seo.description}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          seo: { ...prev.seo, description: e.target.value }
                        }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="SEO description for search engines"
                        maxLength={160}
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-gray-500">{formData.seo.description.length}/160 characters</span>
                        <span className={`${formData.seo.description.length >= 120 && formData.seo.description.length <= 160 ? 'text-green-600' : 'text-orange-600'}`}>
                          {formData.seo.description.length >= 120 && formData.seo.description.length <= 160 ? 'Optimal' : 'Needs adjustment'}
                        </span>
                      </div>
                    </div>

                    {/* SEO Keywords */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          SEO Keywords ({formData.seo.keywords.filter(k => k.trim()).length} keywords)
                        </label>
                        <button
                          type="button"
                          onClick={addKeyword}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          + Add Keyword
                        </button>
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {formData.seo.keywords.map((keyword, index) => (
                          <div key={index} className="flex gap-3 items-center">
                            <input
                              type="text"
                              placeholder="SEO keyword"
                              value={keyword}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                seo: {
                                  ...prev.seo,
                                  keywords: prev.seo.keywords.map((k, i) => 
                                    i === index ? e.target.value : k
                                  )
                                }
                              }))}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                            <button
                              type="button"
                              onClick={() => removeKeyword(index)}
                              className="text-red-600 hover:text-red-700 p-2"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FiSave className="w-4 h-4" />
                  {editingDetail ? 'Update Details' : 'Create Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailsPage