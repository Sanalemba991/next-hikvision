'use client'
import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiUser, FiMessageSquare, FiHome } from 'react-icons/fi'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <ToastContainer position="top-right" />
      
      {/* Hero Section */}
      <motion.div
        className="relative h-[340px] md:h-[420px] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <img
          src={HIKVISION_BANNER}
          alt="Hikvision Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.7) blur(0px)' }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/70 via-black/40 to-black/60"></div>
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-red-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            We're here to help with all your security and surveillance needs
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center gap-3 border border-white/20 shadow-md">
              <FiPhone className="w-5 h-5 text-white" />
              <span className="text-white">24/7 Support</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center gap-3 border border-white/20 shadow-md">
              <FiMail className="w-5 h-5 text-white" />
              <span className="text-white">Quick Response</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center gap-3 border border-white/20 shadow-md">
              <FiMapPin className="w-5 h-5 text-white" />
              <span className="text-white">Global Reach</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="sticky top-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-200 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        {item.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 mb-1">
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

              {/* Social Media */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
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
                      className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-110`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.08, duration: 0.4 }}
                      title={`Follow us on ${social.label}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-rose-50 p-8 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </motion.div>

                  {/* Company */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-3">
                      Company
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiHome className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Subject */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-3">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                    Message *
                  </label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <FiMessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Enter your message here..."
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-red-200/50 transition-all duration-300 font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <motion.div 
              className="p-8 bg-gradient-to-r from-red-50 to-rose-50 border-b border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Us</h2>
              <p className="text-gray-600">Visit our office or contact us for directions</p>
            </motion.div>
            <motion.div 
              className="h-96 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.4, duration: 0.8 }}
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
                  className="rounded-b-3xl"
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