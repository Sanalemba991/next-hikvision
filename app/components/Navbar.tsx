'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { FiUser, FiLock, FiLogOut, FiChevronRight, FiX, FiHome, FiShoppingBag, FiSettings } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

// Simple icons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showProductsSubmenu, setShowProductsSubmenu] = useState(false)
  const [showSolutionsSubmenu, setShowSolutionsSubmenu] = useState(false)
  const [showMainMobileMenu, setShowMainMobileMenu] = useState(true)
  
  // Dynamic categories from API
  const [categories, setCategories] = useState<string[]>([])
  const [subCategories, setSubCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingSubCategories, setLoadingSubCategories] = useState(false)
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Solutions data
  const solutionsData = [
    'Smart City',
    'Retail',
    'Industrial',
    'Healthcare', 
    'Education',
    'Transportation',
  ]

  useEffect(() => {
    setIsClient(true)
    fetchCategories()
  }, [])

  // Reset mobile menu when route changes
  useEffect(() => {
    resetMobileMenu()
  }, [pathname])

  // Function to reset mobile menu state
  const resetMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setShowProductsSubmenu(false)
    setShowSolutionsSubmenu(false)
    setShowMainMobileMenu(true)
  }

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/products?limit=1')
      const data = await response.json()
      
      if (data.success) {
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      setCategories(['Network Cameras', 'Access Control', 'Video Surveillance', 'Thermal Cameras', 'Alarm Systems'])
    } finally {
      setLoading(false)
    }
  }

  // Fetch subcategories for specific category
  const fetchSubCategories = async (category: string) => {
    try {
      setLoadingSubCategories(true)
      setSubCategories([])
      
      const response = await fetch(`/api/products?category=${encodeURIComponent(category)}&limit=1`)
      const data = await response.json()
      
      if (data.success) {
        setSubCategories(data.subCategories || [])
      }
    } catch (error) {
      console.error('Failed to fetch subcategories:', error)
      setSubCategories([])
    } finally {
      setLoadingSubCategories(false)
    }
  }

  // Handle mobile products menu
  const handleShowProductsMenu = () => {
    setShowMainMobileMenu(false)
    setShowProductsSubmenu(true)
    setShowSolutionsSubmenu(false)
  }

  // Handle mobile solutions menu
  const handleShowSolutionsMenu = () => {
    setShowMainMobileMenu(false)
    setShowSolutionsSubmenu(true)
    setShowProductsSubmenu(false)
  }

  // Handle back to main menu
  const handleBackToMainMenu = () => {
    setShowMainMobileMenu(true)
    setShowProductsSubmenu(false)
    setShowSolutionsSubmenu(false)
  }

  // Desktop handlers with enhanced animations
  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
    
    if (menu === 'products') {
      setActiveSubmenu(null);
      setSubCategories([]);
      
      if (categories.length > 0) {
        setActiveSubmenu(categories[0]);
        fetchSubCategories(categories[0]);
      }
    }
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      setActiveSubmenu(null)
      setSubCategories([])
    }, 150)
  }

  const handleSubmenuEnter = (submenu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    setSubCategories([]);
    setActiveSubmenu(submenu);
    fetchSubCategories(submenu);
  }

  const handleCategoryClick = (category: string) => {
    setActiveDropdown(null);
    setActiveSubmenu(null);
    setSubCategories([]);
  }

  const handleSubCategoryClick = (category: string, subCategory: string) => {
    setActiveDropdown(null);
    setActiveSubmenu(null);
    setSubCategories([]);
  }

  const handleSolutionClick = () => {
    setActiveDropdown(null);
    setActiveSubmenu(null);
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

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const handleMobileLinkClick = () => {
    resetMobileMenu()
  }

  const NavLink = ({ href, children, className = "" }: { href: string, children: React.ReactNode, className?: string }) => (
    <Link 
      href={href} 
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
        isActiveLink(href) 
          ? 'text-red-500' 
          : 'text-gray-200 hover:text-red-500'
      } ${className}`}
    >
      {children}
      {isActiveLink(href) && (
        <span className="absolute bottom-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
      )}
    </Link>
  )

  return (
    <>
      <nav className="bg-gradient-to-b from-gray-900 via-gray-800 to-black shadow-lg border-b border-gray-700 sticky top-0 z-50 transition-all duration-700 animate-navbarFadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0" onClick={handleMobileLinkClick}>
                <img 
                  src="/hikvision-logo.png" 
                  alt="Hikvision" 
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation with Enhanced Animations */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              {/* Products Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  href="/products"
                  className={`relative flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                    isActiveLink('/products') 
                      ? 'text-red-500' 
                      : 'text-gray-200 hover:text-red-500'
                  }`}
                >
                  Products
                  <ChevronDownIcon
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === 'products' ? 'rotate-180' : ''
                    }`}
                  />
                  {isActiveLink('/products') && (
                    <span className="absolute bottom-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                  )}
                </Link>

                {/* Enhanced Desktop Mega Menu */}
                <div className={`fixed left-0 top-[80px] w-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-b-lg shadow-2xl border-t border-gray-700 p-8 z-50 transform transition-all duration-500 ease-out ${
                  isClient && activeDropdown === 'products' 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 -translate-y-4 invisible pointer-events-none'
                }`}>
                  <div className="max-w-7xl mx-auto">
                    <div className="flex gap-8">
                      <div className="w-64 flex-shrink-0">
                        <h3 className="text-red-500 font-bold text-sm uppercase tracking-wide mb-4 border-b border-gray-700 pb-2">
                          Categories
                        </h3>
                        <ul>
                          {loading ? (
                            <li className="py-2 px-4 text-gray-400">Loading categories...</li>
                          ) : (
                            categories.map((category, index) => (
                              <li
                                key={category}
                                className={`relative py-2 px-4 rounded cursor-pointer font-semibold transition-all duration-300 animate-fadeIn ${
                                  activeSubmenu === category 
                                    ? 'bg-gray-800 text-red-500' 
                                    : 'text-gray-200 hover:text-red-500 hover:bg-gray-800'
                                }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                                onMouseEnter={() => handleSubmenuEnter(category)}
                              >
                                <Link
                                  href={`/products?category=${encodeURIComponent(category)}`}
                                  className="block w-full h-full"
                                  onClick={() => handleCategoryClick(category)}
                                >
                                  {category}
                                </Link>
                                {activeSubmenu === category && (
                                  <span className="absolute top-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                                )}
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-3 gap-8">
                        {loading ? (
                          <div className="col-span-3 flex items-center justify-center text-gray-400">
                            <span>Loading categories...</span>
                          </div>
                        ) : loadingSubCategories ? (
                          <div className="col-span-3 flex items-center justify-center text-gray-400">
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                              <span>Loading subcategories...</span>
                            </div>
                          </div>
                        ) : activeSubmenu && subCategories.length > 0 ? (
                          <div className="col-span-3">
                            <h4 className="font-semibold text-gray-100 text-sm uppercase tracking-wide border-b border-gray-700 pb-2 mb-4">
                              {activeSubmenu} Subcategories
                            </h4>
                            <div className="grid grid-cols-3 gap-4">
                              {subCategories.map((subCategory, idx) => (
                                <Link
                                  key={idx}
                                  href={`/products?category=${encodeURIComponent(activeSubmenu)}&subCategory=${encodeURIComponent(subCategory)}`}
                                  className="block text-sm text-gray-300 hover:text-red-400 hover:bg-gray-800 px-3 py-2 rounded transition-all duration-300 border border-transparent hover:border-gray-600 transform hover:scale-105 animate-fadeIn"
                                  style={{ animationDelay: `${idx * 30}ms` }}
                                  onClick={() => handleSubCategoryClick(activeSubmenu || '', subCategory)}
                                >
                                  {subCategory}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : activeSubmenu ? (
                          <div className="col-span-3 flex items-center justify-center text-gray-400">
                            <span>No subcategories available for {activeSubmenu}</span>
                          </div>
                        ) : (
                          <div className="col-span-3 flex items-center justify-center text-gray-400">
                            <span>Hover over a category to view subcategories</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  href="/solutions"
                  className={`relative flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                    isActiveLink('/solutions') || solutionsData.some(solution => isActiveLink(`/${solution.toLowerCase().replace(/\s+/g, '').replace('&', '')}`))
                      ? 'text-red-500' 
                      : 'text-gray-200 hover:text-red-500'
                  }`}
                >
                  Solutions
                  <ChevronDownIcon
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === 'solutions' ? 'rotate-180' : ''
                    }`}
                  />
                  {(isActiveLink('/solutions') || solutionsData.some(solution => isActiveLink(`/${solution.toLowerCase().replace(/\s+/g, '').replace('&', '')}`))) && (
                    <span className="absolute bottom-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                  )}
                </Link>

                {/* Enhanced Desktop Solutions Menu */}
                <div className={`fixed left-0 top-[80px] w-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-b-lg shadow-2xl border-t border-gray-700 p-8 z-50 transform transition-all duration-500 ease-out ${
                  isClient && activeDropdown === 'solutions' 
                    ? 'opacity-100 translate-y-0 visible' 
                    : 'opacity-0 -translate-y-4 invisible pointer-events-none'
                }`}>
                  <div className="max-w-7xl mx-auto">
                    <div className="flex gap-8">
                      <div className="w-64 flex-shrink-0">
                        <h3 className="text-red-500 font-bold text-sm uppercase tracking-wide mb-4 border-b border-gray-700 pb-2">
                          Solutions
                        </h3>
                        <ul>
                          {solutionsData.map((solution, index) => (
                            <li
                              key={solution}
                              className="py-2 px-4 rounded cursor-pointer font-semibold transition-all duration-300 text-gray-200 hover:text-red-500 hover:bg-gray-800 transform hover:scale-105 animate-fadeIn"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <Link
                                href={`/${solution.toLowerCase().replace(/\s+/g, '').replace('&', '')}`}
                                className="block w-full h-full"
                                onClick={handleSolutionClick}
                              >
                                {solution}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-3 gap-8">
                        <div className="col-span-3 flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <h4 className="font-semibold text-gray-100 text-lg mb-2">
                              Industry Solutions
                            </h4>
                            <p className="text-gray-400 text-sm">
                              Select a solution category to explore our comprehensive security offerings
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Menu Items */}
              <NavLink href="/support">Support</NavLink>
              <NavLink href="/about">About Us</NavLink>
              <NavLink href="/contact">Contact Us</NavLink>
              <NavLink href="/partners">Partners</NavLink>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* User Authentication */}
              {session ? (
                <div className="relative group hidden sm:block">
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {session.user?.image ? (
                        <img 
                          src={session.user.image} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 font-semibold">
                          {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-white">
                        {session.user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-300">View Profile</p>
                    </div>
                  </Link>

                  <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-lg shadow-2xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
                    <div className="py-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-red-500 transition-colors"
                      >
                        <FiUser className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/profile?tab=security"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-red-500 transition-colors"
                      >
                        <FiLock className="w-4 h-4" />
                        Security
                      </Link>
                      <hr className="my-1 border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-500 transition-colors"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  href="/signup" 
                  className="hidden sm:flex relative items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white/30 group"
                >
                  <FiUser className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium tracking-wide">
                    Sign In
                  </span>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-gray-200 hover:text-red-500 p-2 transition-colors duration-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu with Navbar Color Scheme */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 transition-all duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar with Navbar Color Scheme */}
          <div className={`absolute left-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-black shadow-2xl transform transition-all duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center">
                <img src="/hikvision-logo.png" alt="Hikvision" className="h-8 w-auto" />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-200 hover:text-red-500 transition-colors duration-300"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Content with Staggered Animations */}
            <div className="h-full overflow-y-auto pb-20">
              
              {/* Main Menu */}
              {showMainMobileMenu && (
                <div className="p-4 space-y-2">
                  <div className="flex items-center text-gray-400 text-sm mb-4 animate-fadeIn">
                    <span>Main Menu</span>
                  </div>

                  <Link
                    href="/"
                    className={`relative flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn ${
                      isActiveLink('/') ? 'bg-gray-800 text-red-500' : ''
                    }`}
                    style={{ animationDelay: '100ms' }}
                    onClick={handleMobileLinkClick}
                  >
                    <FiHome className="h-5 w-5 mr-3" />
                    <span>Home</span>
                    {isActiveLink('/') && (
                      <span className="absolute top-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                    )}
                  </Link>

                  <Link
                    href="/about"
                    className={`relative flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn ${
                      isActiveLink('/about') ? 'bg-gray-800 text-red-500' : ''
                    }`}
                    style={{ animationDelay: '150ms' }}
                    onClick={handleMobileLinkClick}
                  >
                    <FiUser className="h-5 w-5 mr-3" />
                    <span>About</span>
                    {isActiveLink('/about') && (
                      <span className="absolute top-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                    )}
                  </Link>

                  <button
                    onClick={handleShowProductsMenu}
                    className={`relative w-full flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn ${
                      isActiveLink('/products') ? 'bg-gray-800 text-red-500' : ''
                    }`}
                    style={{ animationDelay: '200ms' }}
                  >
                    <FiShoppingBag className="h-5 w-5 mr-3" />
                    <span>Products</span>
                    <FiChevronRight className="ml-auto h-4 w-4" />
                    {isActiveLink('/products') && (
                      <span className="absolute top-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                    )}
                  </button>

                  <button
                    onClick={handleShowSolutionsMenu}
                    className={`relative w-full flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn ${
                      isActiveLink('/solutions') || solutionsData.some(solution => isActiveLink(`/${solution.toLowerCase().replace(/\s+/g, '').replace('&', '')}`)) ? 'bg-gray-800 text-red-500' : ''
                    }`}
                    style={{ animationDelay: '250ms' }}
                  >
                    <FiSettings className="h-5 w-5 mr-3" />
                    <span>Solutions</span>
                    <FiChevronRight className="ml-auto h-4 w-4" />
                    {(isActiveLink('/solutions') || solutionsData.some(solution => isActiveLink(`/${solution.toLowerCase().replace(/\s+/g, '').replace('&', '')}`))) && (
                      <span className="absolute top-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                    )}
                  </button>

                  <Link
                    href="/support"
                    className={`relative flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn ${
                      isActiveLink('/support') ? 'bg-gray-800 text-red-500' : ''
                    }`}
                    style={{ animationDelay: '300ms' }}
                    onClick={handleMobileLinkClick}
                  >
                    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Support</span>
                    {isActiveLink('/support') && (
                      <span className="absolute top-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                    )}
                  </Link>

                  <Link
                    href="/contact"
                    className={`relative flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn ${
                      isActiveLink('/contact') ? 'bg-gray-800 text-red-500' : ''
                    }`}
                    style={{ animationDelay: '350ms' }}
                    onClick={handleMobileLinkClick}
                  >
                    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Contact</span>
                    {isActiveLink('/contact') && (
                      <span className="absolute top-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                    )}
                  </Link>

                  {/* Sign In/Profile with Enhanced Animations */}
                  {!session ? (
                    <div className="pt-4 border-t border-gray-700 mt-4">
                      <Link
                        href="/signin"
                        className={`relative flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn ${
                          isActiveLink('/signin') ? 'bg-gray-800 text-red-500' : ''
                        }`}
                        style={{ animationDelay: '400ms' }}
                        onClick={handleMobileLinkClick}
                      >
                        <FiUser className="h-5 w-5 mr-3" />
                        <span>Sign In</span>
                        {isActiveLink('/signin') && (
                          <span className="absolute top-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                        )}
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-gray-700 mt-4 space-y-2">
                      <Link
                        href="/profile"
                        className={`relative flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn ${
                          isActiveLink('/profile') ? 'bg-gray-800 text-red-500' : ''
                        }`}
                        style={{ animationDelay: '400ms' }}
                        onClick={handleMobileLinkClick}
                      >
                        <FiUser className="h-5 w-5 mr-3" />
                        <span>Profile</span>
                        {isActiveLink('/profile') && (
                          <span className="absolute top-0 right-0 w-1 h-full bg-red-500 transform origin-right animate-slideIn"></span>
                        )}
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          resetMobileMenu()
                        }}
                        className="w-full flex items-center px-3 py-3 text-red-400 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn"
                        style={{ animationDelay: '450ms' }}
                      >
                        <FiLogOut className="h-5 w-5 mr-3" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Products Submenu with Slide Animation */}
              {showProductsSubmenu && (
                <div className="p-4 space-y-2 animate-slideInLeft">
                  <button
                    onClick={handleBackToMainMenu}
                    className="w-full flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 mb-4 animate-fadeIn"
                  >
                    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Main Menu</span>
                  </button>

                  <div className="border-b border-gray-700 pb-2 mb-4">
                    <h3 className="text-lg font-bold text-gray-200 animate-fadeIn">Product Categories</h3>
                  </div>

                  {loading ? (
                    <div className="text-gray-400 px-3 py-2 animate-fadeIn">Loading categories...</div>
                  ) : (
                    categories.map((category, index) => (
                      <Link
                        key={category}
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className="flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={handleMobileLinkClick}
                      >
                        <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>{category}</span>
                      </Link>
                    ))
                  )}

                  <Link
                    href="/products"
                    className="flex items-center px-3 py-3 text-red-400 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 font-medium mt-4 animate-fadeIn"
                    style={{ animationDelay: `${categories.length * 50 + 100}ms` }}
                    onClick={handleMobileLinkClick}
                  >
                    <span>View All Products →</span>
                  </Link>
                </div>
              )}

              {/* Solutions Submenu with Slide Animation */}
              {showSolutionsSubmenu && (
                <div className="p-4 space-y-2 animate-slideInLeft">
                  <button
                    onClick={handleBackToMainMenu}
                    className="w-full flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 mb-4 animate-fadeIn"
                  >
                    <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Main Menu</span>
                  </button>

                  <div className="border-b border-gray-700 pb-2 mb-4">
                    <h3 className="text-lg font-bold text-gray-200 animate-fadeIn">Industry Solutions</h3>
                  </div>

                  {solutionsData.map((solution, index) => (
                    <Link
                      key={solution}
                      href={`/${solution.toLowerCase().replace(/\s+/g, '').replace('&', '')}`}
                      className="flex items-center px-3 py-3 text-gray-200 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 animate-fadeIn"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={handleMobileLinkClick}
                    >
                      <FiSettings className="h-5 w-5 mr-3" />
                      <span>{solution}</span>
                    </Link>
                  ))}

                  <Link
                    href="/solutions"
                    className="flex items-center px-3 py-3 text-red-400 hover:bg-gray-800 hover:text-red-500 rounded-lg transition-all duration-300 font-medium mt-4 animate-fadeIn"
                    style={{ animationDelay: `${solutionsData.length * 50 + 100}ms` }}
                    onClick={handleMobileLinkClick}
                  >
                    <span>View All Solutions →</span>
                  </Link>
                </div>
              )}

              {/* Contact Info Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700">
                <div className="text-gray-200 text-sm space-y-1">
                  <div className="flex items-center">
                    <span className="text-gray-400">📧</span>
                    <span className="ml-2">sales@hikvision.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400">📞</span>
                    <span className="ml-2">+971 55 362 6644</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-400">🌐</span>
                    <span className="ml-2">hikvision.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes navbarFadeIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-navbarFadeIn {
          animation: navbarFadeIn 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out both;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out both;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out both;
        }
        body {
          overflow-x: hidden !important;
        }
      `}</style>
    </>
  )
}