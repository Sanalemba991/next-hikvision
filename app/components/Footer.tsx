'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiMail, FiPhone, FiMapPin, FiArrowUp, FiExternalLink } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 4000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: 'Security Cameras', href: '/cameras', popular: true },
    { name: 'AI Analytics', href: '/ai-analytics', popular: true },
    { name: 'Access Control', href: '/access-control', popular: false },
    { name: 'Video Management', href: '/vms', popular: false },
    { name: 'Thermal Imaging', href: '/thermal', popular: true },
    { name: 'Network Storage', href: '/storage', popular: false }
  ]

  const industries = [
    { name: 'Smart Cities', href: '/smart-cities', icon: '🏙️' },
    { name: 'Retail', href: '/retail', icon: '🛍️' },
    { name: 'Transportation', href: '/transportation', icon: '🚊' },
    { name: 'Healthcare', href: '/healthcare', icon: '🏥' },
    { name: 'Education', href: '/education', icon: '🎓' },
    { name: 'Banking', href: '/banking', icon: '🏦' }
  ]

  const resources = [
    { name: 'Download Center', href: '/downloads' },
    { name: 'Technical Docs', href: '/docs' },
    { name: 'Training Hub', href: '/training' },
    { name: 'Support Portal', href: '/support' },
    { name: 'Community Forum', href: '/forum' },
    { name: 'Developer API', href: '/api' }
  ]

  return (
    <footer className="relative bg-white text-gray-900 overflow-hidden">
      
      {/* Light Background */}
      <div className="absolute inset-0">
        {/* Main light gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>
        
        {/* Subtle colored mesh gradient */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2s"></div>
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4s"></div>
        </div>

        {/* Light geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #333333 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10">
        
        {/* Hero CTA Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            
            {/* Floating time badge */}
            <div className="absolute top-8 right-8 hidden lg:block">
              <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl px-6 py-3 border border-gray-200 shadow-lg">
                <div className="text-xs text-gray-500 mb-1">New York Time</div>
                <div className="text-lg font-mono text-gray-900">{currentTime}</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-16 items-center">
              
              {/* Main CTA */}
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-xl">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Global Security Leader
                </div>
                
                <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Ready to Secure
                  </span>
                  <br />
                  <span className="text-red-600">Your Future?</span>
                </h2>
                
                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                  Join the millions who trust Hikvision's cutting-edge security technology. 
                  Experience innovation that protects what matters most.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <Link
                    href="/get-started"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    <span>Get Started Today</span>
                    <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 font-bold rounded-2xl transition-all duration-300 backdrop-blur-sm"
                  >
                    <span>Book Demo</span>
                    <FiExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Newsletter Card */}
              <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 shadow-2xl">
                <div className="text-center mb-6">
                  <HiSparkles className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Informed</h3>
                  <p className="text-gray-600">Get weekly security insights</p>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <FiMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubscribed}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isSubscribed ? '✅ Subscribed!' : 'Subscribe Now'}
                  </button>
                </form>

                <div className="flex justify-center gap-4 mt-6 text-xs text-gray-500">
                  <span>✓ No spam</span>
                  <span>✓ Weekly updates</span>
                  <span>✓ Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-5 gap-12">
              
              {/* Company Section */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h3 className="text-4xl font-black mb-6">
                    <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Hik</span>
                    <span className="text-gray-900">vision</span>
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Pioneering the future of AIoT with intelligent security solutions. 
                    Protecting lives, property, and possibilities worldwide.
                  </p>
                </div>

                {/* Global Presence */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { metric: '500M+', label: 'Devices Connected' },
                    { metric: '180+', label: 'Countries' },
                    { metric: '25+', label: 'Years Innovation' },
                    { metric: '40+', label: 'R&D Centers' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-2xl font-bold text-red-600 mb-1 group-hover:text-red-700 transition-colors duration-300">
                        {stat.metric}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact & Social */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-600 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FiPhone className="w-5 h-5 text-red-600" />
                    </div>
                    <span>+1 (855) 447-8392</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-gray-600 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FiMail className="w-5 h-5 text-red-600" />
                    </div>
                    <span>info@hikvision.com</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 mt-6">
                  {[
                    { name: 'LinkedIn', href: '#', icon: '💼', color: 'hover:bg-blue-100' },
                    { name: 'Twitter', href: '#', icon: '🔗', color: 'hover:bg-blue-50' },
                    { name: 'YouTube', href: '#', icon: '📹', color: 'hover:bg-red-100' },
                    { name: 'Instagram', href: '#', icon: '📷', color: 'hover:bg-pink-100' }
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 bg-gray-100 ${social.color} rounded-xl flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-110`}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                  Products
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between text-gray-600 hover:text-red-600 transition-all duration-300"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                        {link.popular && (
                          <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">HOT</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Industries */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                  Industries
                </h4>
                <ul className="space-y-3">
                  {industries.map((industry, index) => (
                    <li key={index}>
                      <Link
                        href={industry.href}
                        className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition-all duration-300"
                      >
                        <span className="text-lg">{industry.icon}</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {industry.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                  Resources
                </h4>
                <ul className="space-y-3">
                  {resources.map((resource, index) => (
                    <li key={index}>
                      <Link
                        href={resource.href}
                        className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {resource.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              
              {/* Copyright */}
              <div className="text-gray-500 text-sm text-center lg:text-left">
                <p>&copy; 2024 Hangzhou Hikvision Digital Technology Co., Ltd. All rights reserved.</p>
              </div>

              {/* Legal */}
              <div className="flex flex-wrap gap-6 text-sm">
                {['Privacy', 'Terms', 'Cookie Settings', 'Sitemap'].map((item, index) => (
                  <Link
                    key={index}
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-500 hover:text-gray-900 transition-colors duration-300 hover:underline"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="group bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                aria-label="Back to top"
              >
                <FiArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2s { animation-delay: 2s; }
        .animation-delay-4s { animation-delay: 4s; }
      `}</style>
    </footer>
  )
}

export default Footer