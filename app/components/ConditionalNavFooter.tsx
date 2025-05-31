'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import AdminSidebar from './AdminSidebar'

export default function ConditionalNavFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [adminUsername, setAdminUsername] = useState('')
  const [mounted, setMounted] = useState(false)
  
  // Check if current path is admin related
  const isAdminRoute = pathname?.startsWith('/admin')
  const isAdminLoginPage = pathname === '/admin'

  // Wait for component to mount before accessing localStorage
  useEffect(() => {
    setMounted(true)
    
    if (isAdminRoute && typeof window !== 'undefined') {
      const username = localStorage.getItem('adminUsername')
      setAdminUsername(username || 'Admin')
    }
  }, [isAdminRoute])

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return <>{children}</>
  }

  if (isAdminRoute) {
    // Special case for login page - no sidebar, just the login form
    if (isAdminLoginPage) {
      return <>{children}</>
    }
    
    // Admin pages with sidebar but no navbar/footer
    return (
      <>
        <AdminSidebar username={adminUsername} />
        <div className="lg:pl-64 min-h-screen bg-gray-50">
          {children}
        </div>
      </>
    )
  }

  // Regular pages with navbar and footer (non-admin routes)
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}