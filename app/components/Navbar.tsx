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

const GlobeAltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s-1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

// Simplified menu structure
const productCategories = [
  'Network Cameras', 'Access Control', 'Video Surveillance',
  'Thermal Cameras', 'Alarm Systems'
]

const networkProductsSubcategories = {
  'Network Cameras': [
    'IP Cameras', 'PTZ Cameras', 'Dome Cameras', 'Bullet Cameras',
  ]
}

const accessControlProductsSubcategories = {
  'Access Control': [
    'Face Recognition',
    'Card Readers',
    'Turnstiles',
    'Controllers', 
  ]
}

const videoSurveillanceSubcategories = {
  'Video Surveillance': [
    'NVR Systems',
    'DVR Systems',
    'Monitors',
    'Accessories',
  ]
}

const thermalCamerasSubcategories = {
  'Thermal Cameras': [
    'Handheld',
    'Fixed',
    'Mobile',
    'Speciality'
  ],  
}

const alarmSystemsSubcategories = {
  'Alarm Systems': [
    'Intrusion Detection',
    'Fire Alarm',
    'Sensors',
    'Control Panels'
  ],
}

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
    setActiveSubmenu(productCategories[0]); // auto-select first category
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      setActiveSubmenu(null)
    }, 150)
  }

  const handleSubmenuEnter = (submenu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveSubmenu(submenu)
  }

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: '/', // Redirect to home page after logout
        redirect: true
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
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
            <Link href="/" className="flex-shrink-0">
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

              {/* Products Mega Menu */}
              {isClient && activeDropdown === 'products' && (
                <div className="fixed left-0 top-[80px] w-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-b-lg shadow-2xl border-t border-gray-700 p-8 z-50 animate-navbarFadeIn">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex gap-8">
                      {/* Left: Categories */}
                      <div className="w-64 flex-shrink-0">
                        <h3 className="text-red-500 font-bold text-sm uppercase tracking-wide mb-4 border-b border-gray-700 pb-2">
                          Categories
                        </h3>
                        <ul>
                          {productCategories.map((category) => (
                            <li
                              key={category}
                              className={`py-2 px-4 rounded cursor-pointer font-semibold text-gray-200 hover:text-red-500 transition-colors ${
                                activeSubmenu === category ? 'bg-gray-800 text-red-500' : ''
                              }`}
                              onMouseEnter={() => setActiveSubmenu(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Right: Subcategories & Products */}
                      <div className="flex-1 grid grid-cols-3 gap-8">
                        {(() => {
                          let subcats = null;
                          if (activeSubmenu === 'Network Cameras') subcats = networkProductsSubcategories;
                          else if (activeSubmenu === 'Access Control') subcats = accessControlProductsSubcategories;
                          else if (activeSubmenu === 'Video Surveillance') subcats = videoSurveillanceSubcategories;
                          else if (activeSubmenu === 'Thermal Cameras') subcats = thermalCamerasSubcategories;
                          else if (activeSubmenu === 'Alarm Systems') subcats = alarmSystemsSubcategories;

                          if (!subcats) {
                            return (
                              <div className="col-span-3 flex items-center justify-center text-gray-400">
                                <span>Select a category to view products</span>
                              </div>
                            );
                          }

                          return Object.entries(subcats).map(([subcat, items]) => (
                            <div key={subcat} className="min-w-[180px] mb-4">
                              <h4 className="font-semibold text-gray-100 text-xs uppercase tracking-wide border-b border-gray-700 pb-1 mb-2">
                                {subcat}
                              </h4>
                              <div className="flex flex-col gap-1">
                                {items.length === 0 ? (
                                  <span className="text-xs text-gray-500 italic">No products</span>
                                ) : (
                                  items.map((item, idx) => (
                                    <Link
                                      key={idx}
                                      href={`/products/${activeSubmenu?.toLowerCase().replace(/\s+/g, '-')}/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="block text-xs text-gray-300 hover:text-red-400 hover:bg-gray-800 px-2 py-1 rounded transition-colors"
                                    >
                                      {item}
                                    </Link>
                                  ))
                                )}
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Menu Items */}
            <NavLink href="/solutions">Solutions</NavLink>
            <NavLink href="/support">Support</NavLink>
            <NavLink href="/technologies">Technologies</NavLink>
            <NavLink href="/commercial-display">Commercial Display</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* User Icon - Sign Up */}
            {session ? (
              <div className="relative group">
                {/* Profile Button */}
                <Link 
                  href="/profile" 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
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
                    <p className="text-sm font-medium text-gray-900">
                      {session.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
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
                className="relative flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white rounded-full shadow-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-red-400 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
                <FiUser className="w-5 h-5 z-10 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                <span className="font-bold tracking-wide z-10 transition-colors duration-300 group-hover:text-yellow-200 animate-fadeIn">
                  Sign In
                </span>
                <span className="absolute left-0 top-0 w-full h-full rounded-full pointer-events-none group-hover:animate-pulseGlow"></span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-200 hover:text-red-500 p-2"
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

        {/* Mobile Menu */}
        {isClient && (
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2">
              <Link 
                href="/products" 
                className="block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/solutions" 
                className="block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                href="/support" 
                className="block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </Link>
              <Link 
                href="/technologies" 
                className="block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Technologies
              </Link>
              <Link 
                href="/commercial-display" 
                className="block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Commercial Display
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 text-gray-200 hover:text-red-500 hover:bg-gray-700 rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile Sign Up Link */}
              <Link 
                href="/signup" 
                className="block px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md font-medium transition-colors mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
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
        .animate-navbarFadeIn {
          animation: navbarFadeIn 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out both;
        }
        body {
          overflow-x: hidden !important;
        }
      `}</style>
    </nav>
  )
}