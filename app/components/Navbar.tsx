'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { FiUser, FiLock, FiLogOut } from 'react-icons/fi'
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
  const [showMobileProducts, setShowMobileProducts] = useState(false)
  const [showMobileSolutions, setShowMobileSolutions] = useState(false)
  
  // Dynamic categories from API
  const [categories, setCategories] = useState<string[]>([])
  const [subCategories, setSubCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingSubCategories, setLoadingSubCategories] = useState(false)
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Solutions data - same structure as products
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
    setShowMobileProducts(false)
    setShowMobileSolutions(false)
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
      // Fallback to default categories if API fails
      setCategories(['Network Cameras', 'Access Control', 'Video Surveillance', 'Thermal Cameras', 'Alarm Systems'])
    } finally {
      setLoading(false)
    }
  }

  // Fetch subcategories for specific category
  const fetchSubCategories = async (category: string) => {
    try {
      setLoadingSubCategories(true)
      setSubCategories([]) // Clear previous subcategories immediately
      
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

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
    
    if (menu === 'products') {
      // Clear previous state and auto-select first category
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
      setSubCategories([]) // Clear subcategories when closing menu
    }, 150)
  }

  const handleSubmenuEnter = (submenu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Always clear previous subcategories and set new selection
    setSubCategories([]);
    setActiveSubmenu(submenu);
    fetchSubCategories(submenu);
  }

  const handleCategoryClick = (category: string) => {
    // Reset dropdown state and navigate
    setActiveDropdown(null);
    setActiveSubmenu(null);
    setSubCategories([]);
  }

  const handleSubCategoryClick = (category: string, subCategory: string) => {
    // Reset dropdown state and navigate to specific subcategory
    setActiveDropdown(null);
    setActiveSubmenu(null);
    setSubCategories([]);
  }

  const handleSolutionClick = () => {
    // Reset dropdown state
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

  // Enhanced mobile link click handler
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
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform origin-left animate-slideIn"></span>
      )}
    </Link>
  )

  return (
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

          {/* Desktop Navigation */}
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
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform origin-left animate-slideIn"></span>
                )}
              </Link>

              {/* Products Mega Menu - Enhanced Transitions */}
              <div className={`fixed left-0 top-[80px] w-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-b-lg shadow-2xl border-t border-gray-700 p-8 z-50 transform transition-all duration-500 ease-out ${
                isClient && activeDropdown === 'products' 
                  ? 'opacity-100 translate-y-0 visible' 
                  : 'opacity-0 -translate-y-4 invisible pointer-events-none'
              }`}>
                <div className="max-w-7xl mx-auto">
                  <div className="flex gap-8">
                    {/* Left: Categories */}
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
                              className={`py-2 px-4 rounded cursor-pointer font-semibold transition-all duration-300 ${
                                activeSubmenu === category 
                                  ? 'bg-gray-800 text-red-500 border-l-2 border-red-500' 
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
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                    
                    {/* Right: Subcategories */}
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
                                className="block text-sm text-gray-300 hover:text-red-400 hover:bg-gray-800 px-3 py-2 rounded transition-all duration-300 border border-transparent hover:border-gray-600 transform hover:scale-105"
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

            {/* Solutions Dropdown - Enhanced Transitions */}
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
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform origin-left animate-slideIn"></span>
                )}
              </Link>

              {/* Solutions Mega Menu - Enhanced Transitions */}
              <div className={`fixed left-0 top-[80px] w-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-b-lg shadow-2xl border-t border-gray-700 p-8 z-50 transform transition-all duration-500 ease-out ${
                isClient && activeDropdown === 'solutions' 
                  ? 'opacity-100 translate-y-0 visible' 
                  : 'opacity-0 -translate-y-4 invisible pointer-events-none'
              }`}>
                <div className="max-w-7xl mx-auto">
                  <div className="flex gap-8">
                    {/* Left: Solution Categories */}
                    <div className="w-64 flex-shrink-0">
                      <h3 className="text-red-500 font-bold text-sm uppercase tracking-wide mb-4 border-b border-gray-700 pb-2">
                        Solutions
                      </h3>
                      <ul>
                        {solutionsData.map((solution, index) => (
                          <li
                            key={solution}
                            className="py-2 px-4 rounded cursor-pointer font-semibold transition-all duration-300 text-gray-200 hover:text-red-500 hover:bg-gray-800 transform hover:scale-105"
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
                    
                    {/* Right: Content Area (No Subcategories) */}
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
            {/* User Authentication - Hidden on Mobile */}
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

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      My Profile
                    </Link>
                    <Link
                      href="/profile?tab=security"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FiLock className="w-4 h-4" />
                      Security
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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

        {/* Enhanced Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out transform ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2">
            {/* Home Link */}
            <Link 
              href="/" 
              className={`block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors duration-300 ${
                isActiveLink('/') ? 'text-red-500 bg-gray-700' : ''
              }`}
              onClick={handleMobileLinkClick}
            >
              Home
            </Link>

            {/* Products with Dropdown */}
            <div>
              <button
                onClick={() => setShowMobileProducts(!showMobileProducts)}
                className={`w-full text-left flex items-center justify-between px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-all duration-300 ${
                  isActiveLink('/products') ? 'text-red-500 bg-gray-700' : ''
                }`}
              >
                Products
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${showMobileProducts ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                showMobileProducts ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-6 space-y-1">
                  {categories.slice(0, 3).map((category) => (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(category)}`}
                      className="block px-3 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors duration-200"
                      onClick={handleMobileLinkClick}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Solutions with Dropdown */}
            <div>
              <button
                onClick={() => setShowMobileSolutions(!showMobileSolutions)}
                className={`w-full text-left flex items-center justify-between px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-all duration-300 ${
                  isActiveLink('/solutions') || solutionsData.some(solution => isActiveLink(`/${solution.toLowerCase().replace(/\s+/g, '').replace('&', '')}`)) ? 'text-red-500 bg-gray-700' : ''
                }`}
              >
                Solutions
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${showMobileSolutions ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                showMobileSolutions ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-6 space-y-1">
                  {solutionsData.slice(0, 3).map((solution) => (
                    <Link
                      key={solution}
                      href={`/${solution.toLowerCase().replace(/\s+/g, '').replace('&', '')}`}
                      className="block px-3 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors duration-200"
                      onClick={handleMobileLinkClick}
                    >
                      {solution}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Links */}
            <Link 
              href="/support" 
              className={`block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors duration-300 ${
                isActiveLink('/support') ? 'text-red-500 bg-gray-700' : ''
              }`}
              onClick={handleMobileLinkClick}
            >
              Support
            </Link>
            <Link 
              href="/about" 
              className={`block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors duration-300 ${
                isActiveLink('/about') ? 'text-red-500 bg-gray-700' : ''
              }`}
              onClick={handleMobileLinkClick}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors duration-300 ${
                isActiveLink('/contact') ? 'text-red-500 bg-gray-700' : ''
              }`}
              onClick={handleMobileLinkClick}
            >
              Contact Us
            </Link>
            <Link 
              href="/partners" 
              className={`block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors duration-300 ${
                isActiveLink('/partners') ? 'text-red-500 bg-gray-700' : ''
              }`}
              onClick={handleMobileLinkClick}
            >
              Partners
            </Link>

            {/* Sign In/Profile Section */}
            {!session ? (
              <Link 
                href="/signin" 
                className={`block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors duration-300 ${
                  isActiveLink('/signin') ? 'text-red-500 bg-gray-700' : ''
                }`}
                onClick={handleMobileLinkClick}
              >
                Sign In
              </Link>
            ) : (
              <div className="border-t border-gray-700 pt-2 mt-2">
                <Link
                  href="/profile"
                  className={`block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors duration-300 ${
                    isActiveLink('/profile') ? 'text-red-500 bg-gray-700' : ''
                  }`}
                  onClick={handleMobileLinkClick}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    resetMobileMenu()
                  }}
                  className="w-full text-left px-3 py-2 text-red-400 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors duration-300"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
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
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
        body {
          overflow-x: hidden !important;
        }
      `}</style>
    </nav>
  )
}