'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { FiX, FiSend, FiUser, FiMail, FiPhone } from 'react-icons/fi'
import { toast } from 'react-toastify'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  productId: string
}

const QuoteModal = ({ isOpen, onClose, productName, productId }: QuoteModalProps) => {
  const { data: session } = useSession()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) {
      toast.error('Please enter your message')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/product-enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          productName,
          message: message.trim()
        })
      })

      if (response.ok) {
        toast.success('Quote request sent successfully!')
        setMessage('')
        onClose()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to send quote request')
      }
    } catch (error) {
      console.error('Quote submission error:', error)
      toast.error('Failed to send quote request')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !session) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Request Quote</h2>
              <p className="text-gray-600 mt-1">Get a personalized quote for this product</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-8 bg-red-50 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">Product:</h3>
          <p className="text-red-600 font-medium">{productName}</p>
        </div>

        {/* User Info Display */}
        <div className="p-8 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Your Information:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FiUser className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{session.user?.name || 'Not provided'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <FiMail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{session.user?.email || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
              Your Message *
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Please describe your requirements, quantity needed, or any specific questions about this product..."
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Include details like quantity, delivery timeline, or specific requirements
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-red-200/50 transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  Send Quote Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuoteModal