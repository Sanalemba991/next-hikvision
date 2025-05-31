'use client'
import { useState } from 'react'
import { FiCamera, FiUpload, FiX } from 'react-icons/fi'

interface ImageUploadProps {
  currentImage?: string
  onImageUpload: (imageData: string) => Promise<void>
}

const ImageUpload = ({ currentImage, onImageUpload }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showUpload, setShowUpload] = useState(false)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB')
      return
    }

    setIsUploading(true)

    try {
      // Convert to base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = e.target?.result as string
        setPreviewImage(base64)
        
        // Upload the image
        await onImageUpload(base64)
        setShowUpload(false)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
      setIsUploading(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowUpload(true)}
        className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        <FiCamera className="w-4 h-4" />
      </button>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Profile Picture</h3>
              <button
                onClick={() => setShowUpload(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {previewImage ? (
                <div className="text-center">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <p className="text-sm text-gray-600">Image ready to upload</p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Choose an image file
                  </p>
                  <p className="text-xs text-gray-400">
                    Maximum size: 2MB
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full p-2 border border-gray-300 rounded-lg"
                disabled={isUploading}
              />

              {isUploading && (
                <div className="text-center">
                  <div className="inline-block w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600 mt-2">Uploading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUpload