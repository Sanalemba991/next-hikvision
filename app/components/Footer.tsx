'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin, FiArrowUp } from 'react-icons/fi'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  
  // Dynamic categories from API - same as Navbar
  const [categories, setCategories] = useState<string[]>([])
  const [subCategories, setSubCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  // Fetch categories from API - same as Navbar
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/products?limit=1')
      const data = await response.json()
      
      if (data.success) {
        setCategories(data.categories || [])
        setSubCategories(data.subCategories || [])
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      // Fallback to default categories if API fails
      setCategories(['Network Cameras', 'Access Control', 'Video Surveillance', 'Thermal Cameras', 'Alarm Systems'])
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gray-900 text-gray-300">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Logo and Social Links */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              {/* Logo */}
              <div>
                <h3 className="text-3xl font-bold">
                  <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">HIKVISION</span>
                  <span className="text-white"> UAE</span>
                </h3>
                <p className="text-gray-400 mt-2 max-w-sm">
                  Leading provider of innovative security solutions and video surveillance technology in the UAE.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  {
                    name: 'Facebook',
                    href: 'https://www.facebook.com/hikvision.uae',
                    icon: '📘'
                  },
                  {
                    name: 'Twitter',
                    href: 'https://twitter.com/hikvision_uae',
                    icon: '🐦'
                  },
                  {
                    name: 'LinkedIn',
                    href: 'https://www.linkedin.com/company/hikvision-uae',
                    icon: '💼'
                  },
                  {
                    name: 'Instagram',
                    href: 'https://www.instagram.com/hikvision.uae',
                    icon: '📷'
                  },
                  {
                    name: 'YouTube',
                    href: 'https://www.youtube.com/hikvision',
                    icon: '📹'
                  },
                  {
                    name: 'WhatsApp',
                    href: 'https://wa.me/971552929644',
                    icon: '💬'
                  }
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors duration-300"
                  >
                    <span className="text-lg">{social.icon}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Products - Dynamic from API - Same as Navbar */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-lg">Products</h4>
                <ul className="space-y-3">
                  {loading ? (
                    <li className="text-gray-400 text-sm">Loading categories...</li>
                  ) : (
                    categories.slice(0, 5).map((category, index) => (
                      <li key={index}>
                        <Link
                          href={`/products?category=${encodeURIComponent(category)}`}
                          className="text-gray-400 hover:text-white transition-colors duration-300"
                        >
                          {category}
                        </Link>
                      </li>
                    ))
                  )
                  }
                  {categories.length > 5 && (
                    <li>
                      <Link
                        href="/products"
                        className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm font-medium"
                      >
                        View All Products →
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Solutions - With enhanced hash navigation */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-lg">Solutions</h4>
                <ul className="space-y-3">
                  {[
                    {
                      name: 'Smart City',
                      href: '/solutions#smart-city',
                      hash: 'smart-city'
                    },
                    {
                      name: 'Retail',
                      href: '/solutions#retail',
                      hash: 'retail'
                    },
                    {
                      name: 'Industrial',
                      href: '/solutions#industrial',
                      hash: 'industrial'
                    },
                    {
                      name: 'Healthcare',
                      href: '/solutions#healthcare',
                      hash: 'healthcare'
                    },
                    {
                      name: 'Education',
                      href: '/solutions#education',
                      hash: 'education'
                    },
                    {
                      name: 'Transportation',
                      href: '/solutions#transportation',
                      hash: 'transportation'
                    }
                  ].map((solution, index) => (
                    <li key={index}>
                      <Link
                        href={solution.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        onClick={(e) => {
                          // If we're already on solutions page, handle hash change manually
                          if (typeof window !== 'undefined' && window.location.pathname === '/solutions') {
                            e.preventDefault();
                            
                            // Update URL hash
                            window.location.hash = solution.hash;
                            
                            // Manually trigger hashchange event
                            window.dispatchEvent(new HashChangeEvent('hashchange', {
                              newURL: window.location.href,
                              oldURL: window.location.href.split('#')[0]
                            }));
                            
                            // Scroll to solutions section
                            setTimeout(() => {
                              const solutionsSection = document.getElementById('solutions-section');
                              if (solutionsSection) {
                                solutionsSection.scrollIntoView({ 
                                  behavior: 'smooth',
                                  block: 'start'
                                });
                              }
                            }, 100);
                          }
                        }}
                      >
                        {solution.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/solutions"
                      className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm font-medium"
                    >
                      View All Solutions →
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support - With specific categories */}
             

              {/* Company - Reduced links */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-lg">Company</h4>
                <ul className="space-y-3">
                  {[
                    {
                      name: 'About Us',
                      href: '/about'
                    },
                    {
                      name: 'Contact Us',
                      href: '/contact'
                    },
                   
                    {
                      name: 'Partners',
                      href: '/partners'
                    }
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact & Newsletter */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-lg">Stay Connected</h4>
                <div className="space-y-4">
                  {/* Newsletter */}
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <FiMail className="w-4 h-4" />
                      {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                    </button>
                  </form>

                  {/* Contact Info - Updated to match support page */}
                  <div className="space-y-2 text-sm text-gray-400">
                    <p className="flex items-center gap-2">
                      <FiPhone className="w-4 h-4" />
                      +971 55 292 9644
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMail className="w-4 h-4" />
                      support@hikvision.ae
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4" />
                      Dubai, UAE
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      Mon-Fri 9AM-6PM GST
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-gray-400 text-sm text-center md:text-left">
                <p>&copy; 2025 Hikvision UAE. All Rights Reserved.</p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {[
                  {
                    name: 'Privacy Policy',
                    href: '/privacy-policy'
                  },
                  {
                    name: 'Terms of Use',
                    href: '/terms-of-use'
                  },
                  {
                    name: 'Cookie Policy',
                    href: '/cookie-policy'
                  }
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Back to top"
              >
                <FiArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer