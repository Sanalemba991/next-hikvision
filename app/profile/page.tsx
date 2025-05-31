'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FiUser, FiMail, FiBriefcase, FiPhone, FiLock, FiSave, FiCamera, FiEye, FiEyeOff, FiLogOut } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'
import ImageUpload from '../components/ImageUpload'

interface UserProfile {
  id: string
  name: string
  email: string
  firstName?: string
  lastName?: string
  company?: string
  phone?: string
  image?: string
  provider: string
  createdAt: string
  updatedAt: string
}

const optimizeGoogleImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  // For Google profile images, ensure we get a larger size
  if (url.includes('googleusercontent.com')) {
    // Remove existing size parameter and add s200-c for 200px size
    return url.replace(/=s\d+-c/, '=s200-c');
  }
  
  return url;
};

const ProfilePage = () => {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup')
    }
  }, [status, router])

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.email) {
        setIsLoading(true)
        try {
          const response = await fetch('/api/user/profile')
          const data = await response.json()
          
          if (response.ok) {
            setProfile(data.user)
            setFormData({
              firstName: data.user.firstName || '',
              lastName: data.user.lastName || '',
              company: data.user.company || '',
              phone: data.user.phone || '',
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            })
          } else {
            setError(data.error || 'Failed to fetch profile')
          }
        } catch (error) {
          setError('Network error. Please try again.')
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchProfile()
  }, [session])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      // Validate password confirmation
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match')
        setIsSaving(false)
        return
      }

      // Prepare update data
      const updateData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        phone: formData.phone,
      }

      // Add password data if provided
      if (formData.newPassword && formData.currentPassword) {
        updateData.currentPassword = formData.currentPassword
        updateData.newPassword = formData.newPassword
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      const data = await response.json()

      if (response.ok) {
        setProfile(data.user)
        setSuccess('Profile updated successfully!')
        
        // Update session
        await update({
          ...session,
          user: {
            ...session?.user,
            name: data.user.name,
          }
        })

        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))
      } else {
        setError(data.error || 'Failed to update profile')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: '/',
        redirect: true
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleImageUpload = async (imageData: string) => {
    try {
      const response = await fetch('/api/user/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      })

      if (response.ok) {
        // Update local state
        setProfile(prev => prev ? { ...prev, image: imageData } : null)
        
        // Update session
        await update({
          ...session,
          user: {
            ...session?.user,
            image: imageData,
          }
        })
        
        setSuccess('Profile picture updated successfully!')
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      setError('Failed to upload image')
    }
  }

  const getInitials = (name: string) => {
    if (!name) return 'U'
    const names = name.split(' ')
    if (names.length === 1) return names[0].charAt(0).toUpperCase()
    return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  // Debugging useEffect for image URLs
  useEffect(() => {
    console.log('=== PROFILE IMAGE DEBUG ===');
    console.log('Profile Image:', profile?.image);
    console.log('Session Image:', session?.user?.image);
    console.log('Session User:', session?.user);
    console.log('Profile Object:', profile);
    console.log('========================');
  }, [profile, session]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-100 to-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <HiSparkles className="w-4 h-4" />
            Profile Settings
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Profile
          </h1>
          
          <p className="text-lg text-gray-600">
            Manage your account settings and personal information
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-12 text-white">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white bg-opacity-20 flex items-center justify-center text-3xl font-bold">
                  {/* Force image refresh by adding timestamp */}
                  {(profile?.image || session?.user?.image) ? (
                    <img 
                      src={`${optimizeGoogleImageUrl(profile?.image || session?.user?.image)}${
                        (profile?.image || session?.user?.image)?.includes('?') ? '&' : '?'
                      }t=${Date.now()}`}
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        const img = e.currentTarget;
                        console.log('Image failed to load:', img.src);
                        console.log('Original URL:', profile?.image || session?.user?.image);
                        
                        // Try without timestamp first
                        if (img.src.includes('t=')) {
                          img.src = optimizeGoogleImageUrl(profile?.image || session?.user?.image) || '';
                          return;
                        }
                        
                        // If still fails, show fallback
                        img.style.display = 'none';
                        const fallback = img.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                      onLoad={(e) => {
                        console.log('Image loaded successfully:', e.currentTarget.src);
                      }}
                    />
                  ) : null}
                  
                  {/* Colored initials fallback */}
                  <div 
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white ${getAvatarColor(profile?.name || session?.user?.name || 'User')}`}
                    style={{ display: (profile?.image || session?.user?.image) ? 'none' : 'flex' }}
                  >
                    <span>{getInitials(profile?.name || session?.user?.name || 'User')}</span>
                  </div>
                </div>
                
                <ImageUpload 
                  currentImage={profile?.image || session?.user?.image || undefined}
                  onImageUpload={handleImageUpload}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">{profile?.name || session?.user?.name || 'User'}</h2>
                <p className="text-red-100 mb-1">{profile?.email || session?.user?.email}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
                    {profile?.provider === 'google' ? 'Google Account' : 'Email Account'}
                  </span>
                  <span className="text-red-100 text-sm">
                    Member since {new Date(profile?.createdAt || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="px-8">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'profile'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'security'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Security
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            
            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Profile Information Tab */}
              {activeTab === 'profile' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* First Name */}
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 pl-12"
                          placeholder="John"
                        />
                        <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 pl-12"
                          placeholder="Doe"
                        />
                        <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          value={profile?.email || ''}
                          disabled
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 pl-12 cursor-not-allowed"
                        />
                        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 pl-12"
                          placeholder="+1 (555) 123-4567"
                        />
                        <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="md:col-span-2">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 pl-12"
                          placeholder="Your Company Ltd."
                        />
                        <FiBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <>
                  {profile?.provider === 'google' ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Account</h3>
                      <p className="text-gray-600 mb-4">
                        Your account is managed by Google. Password changes should be done through your Google account settings.
                      </p>
                      <a
                        href="https://myaccount.google.com/security"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Manage Google Security
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      
                      {/* Current Password */}
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            id="currentPassword"
                            name="currentPassword"
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 pl-12 pr-12"
                            placeholder="Enter current password"
                          />
                          <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showCurrentPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            id="newPassword"
                            name="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 pl-12 pr-12"
                            placeholder="Enter new password"
                          />
                          <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showNewPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 pl-12"
                            placeholder="Confirm new password"
                          />
                          <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800 text-sm">
                          <strong>Password Requirements:</strong> At least 8 characters long. 
                          Leave password fields empty if you don't want to change your password.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Logout Section */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-8">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FiLogOut className="w-5 h-5" />
                  Sign Out
                </button>
                
                <button
                  type="submit"
                  disabled={isSaving}
                  className="group flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage