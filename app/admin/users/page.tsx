'use client'
import { useState, useEffect } from 'react'
import { FiSearch, FiEye, FiUser, FiMail, FiPhone, FiBriefcase, FiX, FiCalendar, FiShield } from 'react-icons/fi'

interface User {
  _id: string
  name: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  provider: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Fetch users from database
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/users')
      const data = await response.json()

      if (response.ok) {
        setUsers(data.users)
        setFilteredUsers(data.users)
      } else {
        setError(data.error || 'Failed to fetch users')
      }
    } catch (error) {
      setError('Network error. Please try again.')
      console.error('Fetch users error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm)
      )
      setFilteredUsers(filtered)
    }
  }, [searchTerm, users])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedUser(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getProviderBadge = (provider: string) => {
    return provider === 'google' ? (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <FiMail className="w-3 h-3 mr-1" />
        Email
      </span>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Users Management</h1>
          <p className="text-gray-600">View and manage all registered users</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-900">{users.length}</span> users
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, company, or phone..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        {filteredUsers.length !== users.length && (
          <p className="mt-2 text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center">
            <FiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm ? 'No users found matching your search.' : 'No users found.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auth Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    
                    {/* User Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.firstName?.charAt(0) || user.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName && user.lastName 
                              ? `${user.firstName} ${user.lastName}` 
                              : user.name || 'Unknown User'
                            }
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.phone ? (
                          <div className="flex items-center">
                            <FiPhone className="w-4 h-4 text-gray-400 mr-2" />
                            {user.phone}
                          </div>
                        ) : (
                          <span className="text-gray-400">No phone</span>
                        )}
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.company ? (
                          <div className="flex items-center">
                            <FiBriefcase className="w-4 h-4 text-gray-400 mr-2" />
                            {user.company}
                          </div>
                        ) : (
                          <span className="text-gray-400">No company</span>
                        )}
                      </div>
                    </td>

                    {/* Auth Method */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getProviderBadge(user.provider)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(user.createdAt).split(',')[0]}</div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors p-2 rounded-lg hover:bg-indigo-50"
                        title="View Details"
                      >
                        <FiEye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* User Avatar and Basic Info */}
              <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {selectedUser.firstName?.charAt(0) || selectedUser.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedUser.firstName && selectedUser.lastName 
                      ? `${selectedUser.firstName} ${selectedUser.lastName}` 
                      : selectedUser.name || 'Unknown User'
                    }
                  </h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <div className="mt-2">
                    {getProviderBadge(selectedUser.provider)}
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedUser.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Personal Information
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FiUser className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">First Name</p>
                        <p className="text-gray-900">{selectedUser.firstName || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FiUser className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p className="text-gray-900">{selectedUser.lastName || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FiMail className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900">{selectedUser.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FiPhone className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-900">{selectedUser.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FiBriefcase className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="text-gray-900">{selectedUser.company || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Account Information
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FiShield className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Authentication Method</p>
                        <div className="mt-1">{getProviderBadge(selectedUser.provider)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FiCalendar className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Joined</p>
                        <p className="text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FiCalendar className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Last Updated</p>
                        <p className="text-gray-900">{formatDate(selectedUser.updatedAt)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FiUser className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">User ID</p>
                        <p className="text-gray-900 font-mono text-sm">{selectedUser._id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      {!loading && filteredUsers.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.provider === 'google').length}
              </div>
              <div className="text-sm text-gray-600">Google Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {users.filter(u => u.provider === 'credentials').length}
              </div>
              <div className="text-sm text-gray-600">Email Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {users.filter(u => !u.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Inactive Users</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersPage