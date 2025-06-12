'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin, FiArrowUp, FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  
  // Dynamic categories from API - same as Navbar
  const [categories, setCategories] = useState<string[]>([])
  const [subCategories, setSubCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // Refs for animations
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.4
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <footer ref={footerRef} className="relative bg-gray-900 text-gray-300 overflow-hidden">
      {/* Compact Background with Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div 
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Compact Main Footer Content */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Compact Header Section */}
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8"
              variants={itemVariants}
            >
              {/* Compact Logo */}
              <div className="text-center md:text-left">
                <motion.h3 
                  className="text-2xl font-bold mb-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent">HIKVISION</span>
                  <span className="text-white"> UAE</span>
                </motion.h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Leading security solutions provider in the UAE
                </p>
              </div>

              {/* Compact Social Links */}
              <motion.div 
                className="flex gap-2"
                variants={itemVariants}
              >
                {[
                  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
                  { icon: FiTwitter, href: '#', label: 'Twitter' },
                  { icon: FiFacebook, href: '#', label: 'Facebook' },
                  { icon: FiInstagram, href: '#', label: 'Instagram' }
                ].map(({ icon: Icon, href, label }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="group bg-gray-800/50 border border-gray-700/50 rounded-lg p-2 hover:bg-red-600 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Compact Footer Links Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {/* Products Section */}
              <motion.div variants={itemVariants}>
                <h4 className="text-white font-semibold mb-3 text-sm">Products</h4>
                <motion.ul className="space-y-2">
                  {loading ? (
                    <motion.li 
                      className="text-gray-400 text-xs flex items-center gap-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                      Loading...
                    </motion.li>
                  ) : (
                    categories.slice(0, 4).map((category, index) => (
                      <motion.li 
                        key={index}
                        variants={linkVariants}
                        whileHover={{ x: 3, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={`/products?category=${encodeURIComponent(category)}`}
                          className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-xs"
                        >
                          {category}
                        </Link>
                      </motion.li>
                    ))
                  )}
                  
                </motion.ul>
              </motion.div>

              {/* Solutions Section */}
              <motion.div variants={itemVariants}>
                <h4 className="text-white font-semibold mb-3 text-sm">Solutions</h4>
                <motion.ul className="space-y-2">
                  {[
                    { name: 'Smart City', href: '/smart' },
                    { name: 'Retail', href: '/retail' },
                    { name: 'Industrial', href: '/industrial' },
                    { name: 'Healthcare', href: '/healthcare' }
                  ].map((solution, index) => (
                    <motion.li 
                      key={index}
                      variants={linkVariants}
                      whileHover={{ x: 3, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={solution.href}
                        className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-xs"
                      >
                        {solution.name}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Company Section */}
              <motion.div variants={itemVariants}>
                <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
                <motion.ul className="space-y-2">
                  {[
                    { name: 'About Us', href: '/about' },
                    { name: 'Contact', href: '/contact' },
                    { name: 'Support', href: '/support' },
                    { name: 'Partners', href: '/partners' }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      variants={linkVariants}
                      whileHover={{ x: 3, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-xs"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Compact Contact */}
              <motion.div variants={itemVariants}>
                <h4 className="text-white font-semibold mb-3 text-sm">Contact</h4>
                <div className="space-y-3">
                  {/* Quick Contact */}
                  <div className="space-y-2">
                    {[
                      { 
                        icon: FiPhone, 
                        text: '+971 55 292 9644',
                        href: 'tel:+971552929644',
                        type: 'phone'
                      },
                      { 
                        icon: FiMail, 
                        text: 'support@hikvision.ae',
                        href: 'mailto:support@hikvision.ae',
                        type: 'email'
                      },
                      { 
                        icon: FiMapPin, 
                        text: 'Dubai, UAE',
                        href: 'https://maps.google.com/?q=Dubai,UAE',
                        type: 'location'
                      }
                    ].map(({ icon: Icon, text, href, type }, index) => (
                      <motion.a
                        key={index}
                        href={href}
                        target={type === 'location' ? '_blank' : '_self'}
                        rel={type === 'location' ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 transition-all duration-300 cursor-pointer"
                        whileHover={{ x: 2, scale: 1.02 }}
                        initial={{ opacity: 0, x: -5 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
                        transition={{ delay: index * 0.05 + 0.4 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gray-800/50 rounded-full flex items-center justify-center group-hover:bg-red-600/20 transition-colors duration-300">
                          <Icon className="w-3 h-3 group-hover:text-red-400 transition-colors duration-300" />
                        </div>
                        <span>{text}</span>
                        {type === 'location' && (
                          <svg className="w-2 h-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </motion.a>
                    ))}
                  </div>

                  {/* Business Hours */}
                  <motion.div 
                    className="text-xs text-gray-500 bg-gray-800/20 rounded-lg p-2 border border-gray-700/30"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-medium">Mon-Fri 9AM-6PM GST</span>
                    </div>
                    <div className="text-gray-600 text-xs mt-1">
                      24/7 Emergency Support Available
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <motion.div 
          className="border-t border-gray-700/50 bg-gray-800/20"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Compact Copyright */}
              <motion.div 
                className="text-gray-400 text-xs text-center md:text-left"
                variants={itemVariants}
              >
                <p>&copy; 2025 Hikvision UAE. All Rights Reserved.</p>
              </motion.div>

              {/* Compact Legal Links */}
              <motion.div 
                className="flex gap-4 text-xs"
                variants={containerVariants}
              >
                {[
                  { name: 'Privacy', href: '/privacy-policy' },
                  { name: 'Terms', href: '/terms-of-use' },
                  { name: 'Cookies', href: '/cookie-policy' }
                ].map((item, index) => (
                  <motion.div key={index} variants={linkVariants}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Compact Back to Top */}
              <motion.button
                onClick={scrollToTop}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
                aria-label="Back to top"
              >
                <FiArrowUp className="w-3 h-3" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer