'use client'
import { useState, useEffect } from 'react'
import { FiMail, FiPhone, FiUser, FiPackage, FiCalendar, FiHome, FiRefreshCw, FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'

interface Enquiry {
  _id: string
  productId: {
    _id: string
    name: string
    images: string[]
  }
  productName: string
  message: string
  userDetails: {
    userId?: string
    name: string
    email: string
    phone?: string
    company?: string
  }
  status: 'pending' | 'responded' | 'closed'
  createdAt: string
}

const ProductEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'responded' | 'closed'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  
  const itemsPerPage = 2

  useEffect(() => {
    fetchEnquiries()
  }, [])

  useEffect(() => {
    filterEnquiries()
  }, [enquiries, statusFilter])

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/product-enquiries')
      const data = await response.json()
      
      if (response.ok) {
        setEnquiries(data.enquiries)
      }
    } catch (error) {
      console.error('Fetch enquiries error:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const filterEnquiries = () => {
    if (statusFilter === 'all') {
      setFilteredEnquiries(enquiries)
    } else {
      setFilteredEnquiries(enquiries.filter(enquiry => enquiry.status === statusFilter))
    }
    setCurrentPage(1)
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchEnquiries()
  }

  const updateEnquiryStatus = async (enquiryId: string, newStatus: 'pending' | 'responded' | 'closed') => {
    setUpdatingStatus(enquiryId)
    try {
      const response = await fetch(`/api/product-enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setEnquiries(prev => 
          prev.map(enquiry => 
            enquiry._id === enquiryId 
              ? { ...enquiry, status: newStatus }
              : enquiry
          )
        )
      }
    } catch (error) {
      console.error('Update status error:', error)
    } finally {
      setUpdatingStatus(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEnquiries = filteredEnquiries.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header with filters and refresh */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Enquiries</h1>
            <p className="text-gray-600 mt-2">Manage customer quote requests</p>
          </div>
          
          <div className="flex gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="responded">Responded</option>
                <option value="closed">Closed</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {currentEnquiries.length} of {filteredEnquiries.length} enquiries
          {statusFilter !== 'all' && ` (${statusFilter})`}
        </div>
      </div>

      {filteredEnquiries.length === 0 ? (
        <div className="text-center py-16">
          <FiMail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {statusFilter === 'all' ? 'No Enquiries Yet' : `No ${statusFilter} Enquiries`}
          </h3>
          <p className="text-gray-500">
            {statusFilter === 'all' 
              ? 'Customer quote requests will appear here' 
              : `No enquiries with ${statusFilter} status found`
            }
          </p>
        </div>
      ) : (
        <>
          {/* Enquiries List */}
          <div className="space-y-6 mb-8">
            {currentEnquiries.map((enquiry) => (
              <div key={enquiry._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-red-50 to-rose-50 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {enquiry.productId?.images && enquiry.productId.images.length > 0 ? (
                          <Image
                            src={enquiry.productId.images[0]}
                            alt={enquiry.productName}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiPackage className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">{enquiry.productName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <FiCalendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{formatDate(enquiry.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Dropdown */}
                    <div className="relative">
                      <select
                        value={enquiry.status}
                        onChange={(e) => updateEnquiryStatus(enquiry._id, e.target.value as any)}
                        disabled={updatingStatus === enquiry._id}
                        className={`appearance-none px-3 py-1 rounded-full text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                          enquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          enquiry.status === 'responded' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        } ${updatingStatus === enquiry._id ? 'opacity-50' : ''}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="responded">Responded</option>
                        <option value="closed">Closed</option>
                      </select>
                      {updatingStatus === enquiry._id && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Customer Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <FiUser className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900">{enquiry.userDetails.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FiMail className="w-5 h-5 text-gray-500" />
                          <a 
                            href={`mailto:${enquiry.userDetails.email}`}
                            className="text-red-600 hover:text-red-700"
                          >
                            {enquiry.userDetails.email}
                          </a>
                        </div>
                        {enquiry.userDetails.phone && (
                          <div className="flex items-center gap-3">
                            <FiPhone className="w-5 h-5 text-gray-500" />
                            <a 
                              href={`tel:${enquiry.userDetails.phone}`}
                              className="text-red-600 hover:text-red-700"
                            >
                              {enquiry.userDetails.phone}
                            </a>
                          </div>
                        )}
                        {enquiry.userDetails.company && (
                          <div className="flex items-center gap-3">
                            <FiHome className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-900">{enquiry.userDetails.company}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message - Made smaller */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Customer Message</h4>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-gray-700 leading-relaxed text-sm line-clamp-4">
                          {enquiry.message}
                        </p>
                        {enquiry.message.length > 150 && (
                          <button className="text-red-600 text-sm mt-2 hover:text-red-700">
                            Read more...
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3">
                    <a
                      href={`mailto:${enquiry.userDetails.email}?subject=Re: Quote Request for ${enquiry.productName}&body=Dear ${enquiry.userDetails.name},%0D%0A%0D%0AThank you for your interest in ${enquiry.productName}.%0D%0A%0D%0A`}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <FiMail className="w-4 h-4" />
                      Reply via Email
                    </a>
                    {enquiry.userDetails.phone && (
                      <a
                        href={`tel:${enquiry.userDetails.phone}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <FiPhone className="w-4 h-4" />
                        Call Customer
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(endIndex, filteredEnquiries.length)}</span> of{' '}
                    <span className="font-medium">{filteredEnquiries.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          page === currentPage
                            ? 'z-10 bg-red-600 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProductEnquiriesPage