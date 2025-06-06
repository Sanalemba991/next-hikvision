'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiMail, FiPhone, FiMapPin, FiArrowUp, FiExternalLink, FiCheck } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const footerElement = document.querySelector('#footer-section')
    if (footerElement) {
      observer.observe(footerElement)
    }

    return () => observer.disconnect()
  }, [])

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

  const stats = [
    { metric: '500M+', label: 'Devices Connected', description: 'Global IoT network' },
    { metric: '180+', label: 'Countries', description: 'Worldwide presence' },
    { metric: '25+', label: 'Years Innovation', description: 'Industry expertise' },
    { metric: '40+', label: 'R&D Centers', description: 'Innovation hubs' }
  ]

  return (
    <footer id="footer-section" className="relative bg-gray-800 text-gray-300 overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0">
        {/* Primary gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
        
        {/* Animated mesh gradients */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-red-600/30 to-red-700/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-600/30 to-gray-700/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed"></div>
        </div>

        {/* Subtle animated lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-slide-x"></div>
        </div>
      </div>

      <div className="relative z-10">


        {/* Main Footer Content */}
        <div className={`border-t border-gray-200/50 transition-all duration-1000 ${isVisible ? 'animate-slideUp' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
              {/* Logo */}
              <div className="animate-fadeInUp mb-4 md:mb-0">
                <h3 className="text-3xl font-black">
                  <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">HIK</span>
                  <span className="text-white">VISION</span>
                </h3>
              </div>
              {/* Social Links */}
              <div className="flex gap-4 animate-fadeInUp delay-200">
                {[
                  { name: 'Facebook', href: '#', icon: '📘' },
                  { name: 'Twitter', href: '#', icon: '🔗' },
                  { name: 'LinkedIn', href: '#', icon: '💼' },
                  { name: 'Instagram', href: '#', icon: '📷' },
                  { name: 'YouTube', href: '#', icon: '📹' },
                  { name: 'WeChat', href: '#', icon: '💬' }
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    className="w-8 h-8 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
                  >
                    <span className="text-xl">{social.icon}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-6">
              {/* About Us */}
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-slideUp' : 'opacity-0 translate-y-8'}`}>
                <h4 className="text-white font-semibold mb-3 text-lg">About Us</h4>
                <ul className="space-y-2 text-base">
                  {[
                    'Company Profile',
                    'Investor Relations',
                    'Cybersecurity',
                    'Compliance',
                    'Sustainability',
                    'Focused on Quality',
                    'Contact Us'
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsroom */}
              <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'animate-slideUp' : 'opacity-0 translate-y-8'}`}>
                <h4 className="text-white font-semibold mb-3 text-lg">Newsroom</h4>
                <ul className="space-y-2 text-base">
                  {[
                    'Blog',
                    'Latest News',
                    'Success Stories',
                    'HikSnap',
                    'Video Library'
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Partner */}
              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'animate-slideUp' : 'opacity-0 translate-y-8'}`}>
                <h4 className="text-white font-semibold mb-3 text-lg">Partner</h4>
                <ul className="space-y-2 text-base">
                  {[
                    'Hik-Partner Pro',
                    'Find A Distributor',
                    'Find A Technology Partner',
                    'Technology Partner Portal',
                    'Hikvision Embedded Open Platform',
                    'Technology Partner Story'
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'animate-slideUp' : 'opacity-0 translate-y-8'}`}>
                <h4 className="text-white font-semibold mb-3 text-lg">Quick Links</h4>
                <ul className="space-y-2 text-base">
                  {[
                    'Hikvision eLearning',
                    'Where to Buy',
                    'Discontinued Products',
                    'Event List',
                    'Hikvision Live',
                    'Sitemap'
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter & Contact */}
              <div className={`col-span-2 transition-all duration-1000 delay-700 ${isVisible ? 'animate-slideUp' : 'opacity-0 translate-y-8'}`}>
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <button className="px-4 py-1.5 bg-transparent border border-gray-400 text-gray-400 hover:text-white hover:border-white rounded transition-all duration-300 transform hover:scale-105 text-sm">
                    Contact Us
                  </button>
                  <button 
                    onClick={handleSubscribe}
                    className="px-4 py-1.5 bg-transparent border border-gray-400 text-gray-400 hover:text-white hover:border-white rounded transition-all duration-300 transform hover:scale-105 text-sm flex items-center gap-2"
                  >
                    <FiMail className="w-4 h-4" />
                    Subscribe Newsletter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className={`border-t border-gray-700/50 bg-gray-900/80 transition-all duration-1000 delay-800 ${isVisible ? 'animate-slideUp' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-2 text-xs">
              {/* Copyright */}
              <div className="text-gray-400 text-center lg:text-left">
                <p>&copy; 2025 Hangzhou Hikvision Digital Technology Co., Ltd. All Rights Reserved.</p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap gap-4">
                {['Privacy Policy', 'Cookie Policy', 'Cookies Preferences', 'General Terms of Use'].map((item, index) => (
                  <Link
                    key={index}
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline underline-offset-4"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="group bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Back to top"
              >
                <FiArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        
        @keyframes slide-x {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes slide-x-reverse {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-slide-x {
          animation: slide-x 10s linear infinite;
        }
        
        .animate-slide-x-reverse {
          animation: slide-x-reverse 12s linear infinite;
        }
        
        .animate-slideUp {
          animation: slideUp 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-900 { animation-delay: 900ms; }
        .delay-1100 { animation-delay: 1100ms; }
        
        /* Backdrop blur fallback */
        @supports not (backdrop-filter: blur(12px)) {
          .backdrop-blur-sm {
            background-color: rgba(255, 255, 255, 0.9);
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer;