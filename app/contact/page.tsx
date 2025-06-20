'use client'
import { useState, useEffect } from 'react'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiUser, FiMessageSquare, FiHome, FiHeadphones, FiZap, FiGlobe } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'

import { motion } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'

const HIKVISION_BANNER =
  'http://atechs.in/assets/frontend/img/hikvision/banner2.jpg'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    
    // Trigger initial animations after component mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => {
      window.removeEventListener('resize', checkDevice)
      clearTimeout(timer)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact-enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        })
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: FiPhone,
      title: 'Phone',
      details: ['+971 4 123 4567', '+971 50 123 4567'],
      action: 'tel:+97141234567'
    },
    {
      icon: FiMail,
      title: 'Email',
      details: ['info@hikvision.ae', 'support@hikvision.ae'],
      action: 'mailto:info@hikvision.ae'
    },
    {
      icon: FiMapPin,
      title: 'Address',
      details: ['Dubai Marina, UAE', 'P.O. Box 12345, Dubai'],
      action: 'https://maps.google.com/maps?q=25.262528,55.290111'
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      details: ['Sun - Thu: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      action: null
    }
  ]

  const subjects = [
    'Product Inquiry',
    'Technical Support',
    'Sales Question',
    'Partnership',
    'General Question',
    'Other'
  ]

  // Mobile animation variants with faster, more visible animations
  const mobileVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const mobileStaggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const desktopVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <ToastContainer 
        position="top-right" 
        className="mt-16 sm:mt-20 md:mt-4 z-50"
        toastClassName="text-sm"
      />
      
      {/* Hero Section - Fully Responsive */}
      <div className="relative h-[250px] xs:h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[420px] flex items-center justify-center overflow-hidden">
        <img
          src={HIKVISION_BANNER}
          alt="Hikvision Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.7) blur(0px)' }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/70 via-black/40 to-black/60"></div>
        
        <motion.div
          className="relative z-10 text-center max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8"
          variants={mobileStaggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h1
            variants={mobileVariants}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 xs:mb-4 sm:mb-6 text-white leading-tight"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            variants={mobileVariants}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-4 xs:mb-6 sm:mb-8 text-red-100 px-2 xs:px-4 sm:px-0 max-w-4xl mx-auto"
          >
            We're here to help with all your security and surveillance needs
          </motion.p>
          {/* Banner Buttons - Row Layout without Glow */}
          <motion.div
            variants={mobileStaggerContainer}
            className="flex flex-row justify-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 px-2 xs:px-4 sm:px-0 max-w-4xl mx-auto"
          >
            {/* Support Button */}
            <motion.div
              variants={mobileVariants}
              className="group relative flex-1 xs:flex-none"
            >
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 hover:bg-white/20 transition-all duration-300 cursor-pointer justify-center">
                <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiHeadphones className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </div>
                <div className="text-white font-semibold text-[10px] xs:text-xs sm:text-sm">Support</div>
              </div>
            </motion.div>

            {/* Response Button */}
            <motion.div
              variants={mobileVariants}
              className="group relative flex-1 xs:flex-none"
            >
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 hover:bg-white/20 transition-all duration-300 cursor-pointer justify-center">
                <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiZap className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </div>
                <div className="text-white font-semibold text-[10px] xs:text-xs sm:text-sm">Response</div>
              </div>
            </motion.div>

            {/* Global Button */}
            <motion.div
              variants={mobileVariants}
              className="group relative flex-1 xs:flex-none"
            >
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 hover:bg-white/20 transition-all duration-300 cursor-pointer justify-center">
                <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiGlobe className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </div>
                <div className="text-white font-semibold text-[10px] xs:text-xs sm:text-sm">Global</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content - Fully Responsive Layout */}
      <motion.div
        className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 lg:py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: 0.2, duration: isMobile ? 0.5 : 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8 lg:gap-12">
          {/* Contact Information - Mobile First Order */}
          <motion.div
            className="lg:col-span-1 order-2 lg:order-1"
            initial={{ opacity: 0, x: isMobile ? 0 : -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : -40 }}
            transition={{ delay: 0.3, duration: isMobile ? 0.5 : 0.7 }}
          >
            <div className="lg:sticky lg:top-8">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-4 xs:mb-6 sm:mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-3 xs:space-y-4 sm:space-y-6 mb-4 xs:mb-6 sm:mb-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-200 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 20 : 30 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: isMobile ? 0.4 : 0.5 }}
                  >
                    <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-4">
                      <div className="w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-md xs:rounded-lg sm:rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <item.icon className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 xs:mb-1.5 sm:mb-2 text-xs xs:text-sm sm:text-base">
                          {item.title}
                        </h3>
                        {item.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 mb-0.5 xs:mb-1 text-xs xs:text-sm sm:text-base break-words">
                            {item.action && detailIndex === 0 ? (
                              <a 
                                href={item.action}
                                className="text-red-600 hover:text-red-700 transition-colors"
                                target={item.action.startsWith('http') ? '_blank' : undefined}
                                rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media - Responsive Grid */}
              <motion.div
                className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 20 : 30 }}
                transition={{ delay: 0.8, duration: isMobile ? 0.4 : 0.6 }}
              >
                <h3 className="font-semibold text-gray-900 mb-2.5 xs:mb-3 sm:mb-4 text-xs xs:text-sm sm:text-base">
                  Follow Us
                </h3>
                <div className="flex gap-1.5 xs:gap-2 sm:gap-3 flex-wrap">
                  {[
                    { 
                      icon: FaFacebookF, 
                      color: 'hover:bg-blue-600', 
                      href: 'https://www.facebook.com/hikvision.uae',
                      label: 'Facebook'
                    },
                    { 
                      icon: FaTwitter, 
                      color: 'hover:bg-sky-500', 
                      href: 'https://twitter.com/hikvision_uae',
                      label: 'Twitter'
                    },
                    { 
                      icon: FaLinkedinIn, 
                      color: 'hover:bg-blue-700', 
                      href: 'https://www.linkedin.com/company/hikvision-uae',
                      label: 'LinkedIn'
                    },
                    { 
                      icon: FaInstagram, 
                      color: 'hover:bg-pink-600', 
                      href: 'https://www.instagram.com/hikvision.uae',
                      label: 'Instagram'
                    },
                    { 
                      icon: FaWhatsapp, 
                      color: 'hover:bg-green-600', 
                      href: 'https://wa.me/971552929644',
                      label: 'WhatsApp'
                    }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12 bg-gray-100 rounded-md xs:rounded-lg sm:rounded-xl flex items-center justify-center text-gray-600 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.9 + index * 0.08, duration: isMobile ? 0.3 : 0.4 }}
                      title={`Follow us on ${social.label}`}
                    >
                      <social.icon className="w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form - Responsive Form */}
          <motion.div
            className="lg:col-span-2 order-1 lg:order-2"
            initial={{ opacity: 0, x: isMobile ? 0 : 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : 40 }}
            transition={{ delay: 0.4, duration: isMobile ? 0.5 : 0.7 }}
          >
            <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-rose-50 p-3 xs:p-4 sm:p-6 lg:p-8 border-b border-gray-100">
                <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 xs:mb-1.5 sm:mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-3 xs:p-4 sm:p-6 lg:p-8">
                {/* Form Fields - Mobile Responsive Grid */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 mb-3 xs:mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 20 : 30 }}
                  transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.5 }}
                >
                  {/* Name Field */}
                  <motion.div
                    className="sm:col-span-1"
                    initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : -30 }}
                    transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.6 }}
                  >
                    <label htmlFor="name" className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2 sm:mb-3">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 xs:pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <FiUser className="h-3.5 xs:h-4 sm:h-5 w-3.5 xs:w-4 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block w-full pl-8 xs:pl-10 sm:pl-12 pr-2.5 xs:pr-3 sm:pr-4 py-2.5 xs:py-3 sm:py-4 border border-gray-300 rounded-md xs:rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-xs xs:text-sm sm:text-base"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="sm:col-span-1"
                    initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : 30 }}
                    transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.7 }}
                  >
                    <label htmlFor="email" className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2 sm:mb-3">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 xs:pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <FiMail className="h-3.5 xs:h-4 sm:h-5 w-3.5 xs:w-4 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full pl-8 xs:pl-10 sm:pl-12 pr-2.5 xs:pr-3 sm:pr-4 py-2.5 xs:py-3 sm:py-4 border border-gray-300 rounded-md xs:rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-xs xs:text-sm sm:text-base"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    className="sm:col-span-1"
                    initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : -30 }}
                    transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.8 }}
                  >
                    <label htmlFor="phone" className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2 sm:mb-3">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 xs:pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <FiPhone className="h-3.5 xs:h-4 sm:h-5 w-3.5 xs:w-4 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full pl-8 xs:pl-10 sm:pl-12 pr-2.5 xs:pr-3 sm:pr-4 py-2.5 xs:py-3 sm:py-4 border border-gray-300 rounded-md xs:rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-xs xs:text-sm sm:text-base"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </motion.div>

                  {/* Company Field */}
                  <motion.div
                    className="sm:col-span-1"
                    initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isMobile ? 0 : 30 }}
                    transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.9 }}
                  >
                    <label htmlFor="company" className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2 sm:mb-3">
                      Company
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2.5 xs:pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <FiHome className="h-3.5 xs:h-4 sm:h-5 w-3.5 xs:w-4 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="block w-full pl-8 xs:pl-10 sm:pl-12 pr-2.5 xs:pr-3 sm:pr-4 py-2.5 xs:py-3 sm:py-4 border border-gray-300 rounded-md xs:rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-xs xs:text-sm sm:text-base"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Subject Dropdown - Full Width */}
                <motion.div
                  className="mb-3 xs:mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 20 : 30 }}
                  transition={{ duration: isMobile ? 0.5 : 0.7, delay: 1.0 }}
                >
                  <label htmlFor="subject" className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2 sm:mb-3">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="block w-full px-2.5 xs:px-3 sm:px-4 py-2.5 xs:py-3 sm:py-4 border border-gray-300 rounded-md xs:rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-xs xs:text-sm sm:text-base"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </motion.div>

                {/* Message Textarea - Full Width */}
                <motion.div
                  className="mb-4 xs:mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 20 : 30 }}
                  transition={{ duration: isMobile ? 0.5 : 0.8, delay: 1.1 }}
                >
                  <label htmlFor="message" className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 xs:mb-2 sm:mb-3">
                    Message *
                  </label>
                  <div className="relative">
                    <div className="absolute top-2.5 xs:top-3 sm:top-4 left-2.5 xs:left-3 sm:left-4 pointer-events-none">
                      <FiMessageSquare className="h-3.5 xs:h-4 sm:h-5 w-3.5 xs:w-4 sm:w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={isMobile ? 3 : 6}
                      className="block w-full pl-8 xs:pl-10 sm:pl-12 pr-2.5 xs:pr-3 sm:pr-4 py-2.5 xs:py-3 sm:py-4 border border-gray-300 rounded-md xs:rounded-lg sm:rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none text-xs xs:text-sm sm:text-base"
                      placeholder="Enter your message here..."
                    />
                  </div>
                </motion.div>

                {/* Submit Button - Responsive */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-md xs:rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-red-200/50 transition-all duration-300 font-semibold flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-xs xs:text-sm sm:text-base"
                  initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 20 : 30 }}
                  transition={{ duration: isMobile ? 0.5 : 0.8, delay: 1.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="hidden xs:inline">Sending Message...</span>
                      <span className="xs:hidden">Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section - Responsive Height */}
        <motion.div
          className="mt-6 xs:mt-8 sm:mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.6, duration: isMobile ? 0.5 : 0.8 }}
        >
          <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <motion.div 
              className="p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-red-50 to-rose-50 border-b border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: isMobile ? 0.4 : 0.6 }}
            >
              <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 xs:mb-1.5 sm:mb-2">
                Find Us
              </h2>
              <p className="text-gray-600 text-xs xs:text-sm sm:text-base">
                Visit our office or contact us for directions
              </p>
            </motion.div>
            <motion.div 
              className="h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.8, duration: isMobile ? 0.5 : 0.8 }}
            >
              <div className="h-full">
                <iframe
                  src="https://www.google.com/maps?q=25.262528,55.290111&hl=en&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hikvision UAE Office Location"
                  className="rounded-b-xl xs:rounded-b-2xl sm:rounded-b-3xl"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ContactPage