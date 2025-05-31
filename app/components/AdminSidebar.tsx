'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FiGrid, 
  FiUsers, 
  FiBox, 
  FiList, 
  FiMessageSquare, 
  FiMail, 
  FiMenu, 
  FiX, 
  FiChevronRight,
  FiLogOut,
  FiShield
} from 'react-icons/fi'

interface SidebarLink {
  path: string
  icon: React.ReactNode
  label: string
}

const AdminSidebar = ({ username }: { username: string }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile sidebar when path changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close mobile sidebar when screen is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const links: SidebarLink[] = [
    {
      path: '/admin/dashboard',
      icon: <FiGrid className="w-5 h-5" />,
      label: 'Dashboard Analytics'
    },
    {
      path: '/admin/users',
      icon: <FiUsers className="w-5 h-5" />,
      label: 'Users'
    },
    {
      path: '/admin/products',
      icon: <FiBox className="w-5 h-5" />,
      label: 'Products'
    },
    {
      path: '/admin/product-details',
      icon: <FiList className="w-5 h-5" />,
      label: 'Product Details'
    },
    {
      path: '/admin/product-enquiries',
      icon: <FiMessageSquare className="w-5 h-5" />,
      label: 'Product Enquiries'
    },
    {
      path: '/admin/contact-enquiries',
      icon: <FiMail className="w-5 h-5" />,
      label: 'Contact Enquiries'
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminUsername')
    window.location.href = '/admin'
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-40 lg:hidden bg-white p-2 rounded-lg shadow-lg text-gray-700 hover:text-red-600 transition-colors"
      >
        {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white z-40 shadow-xl transition-all duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-lg flex-shrink-0">
              <FiShield className="w-6 h-6 text-white" />
            </div>
            {!collapsed && (
              <div className="transition-opacity duration-300">
                <h1 className="font-bold text-gray-900">Hikvision</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-white flex items-center justify-center font-bold flex-shrink-0">
            {username?.charAt(0).toUpperCase() || 'A'}
          </div>
          {!collapsed && (
            <div className="ml-3 transition-opacity duration-300">
              <p className="font-medium text-sm text-gray-900">Welcome,</p>
              <p className="text-sm text-gray-600 truncate">{username || 'Administrator'}</p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-3">
          <ul className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.path
              
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-red-50 text-red-600 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="flex-shrink-0">{link.icon}</span>
                    {!collapsed && (
                      <span className="transition-opacity duration-300 whitespace-nowrap">{link.label}</span>
                    )}
                    {isActive && collapsed && (
                      <span className="absolute left-0 w-1 h-8 bg-red-600 rounded-r-md"></span>
                    )}
                  </Link>
                </li>
              )
            })}
            
            {/* Logout Button */}
            <li className="mt-6">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 w-full 
                  text-gray-600 hover:bg-red-50 hover:text-red-600"
              >
                <span className="flex-shrink-0">
                  <FiLogOut className="w-5 h-5" />
                </span>
                {!collapsed && (
                  <span className="transition-opacity duration-300">Logout</span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Push content to the right when sidebar is expanded */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      />
    </>
  )
}

export default AdminSidebar