'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiChevronRight } from 'react-icons/fi'
import { FaRegEnvelope } from 'react-icons/fa' // Add this for a professional envelope icon
import { useInView } from 'react-intersection-observer'

const FeaturedInsights = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: newsletterRef, inView: newsletterInView } = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const insightsData = [
    {
      id: 1,
      category: "Innovation",
      title: "What's new",
      subtitle: "Hikvision AIoT Technologies",
      description: "Explore our advantages in AIoT techs",
      image: "/FeaturedInsights/img1.webp",
      color: "from-red-500 to-pink-500",
      href: "/innovations/aiot"
    },
    {
      id: 2,
      category: "Resources",
      title: "Quick Guide for Project-Oriented",
      subtitle: "Premium Products",
      description: "Download and Explore",
      image: "/FeaturedInsights/img2.webp",
      color: "from-blue-500 to-cyan-500",
      href: "/resources/project-guide"
    },
    {
      id: 3,
      category: "Sustainability",
      title: "Our Green Practice",
      subtitle: "Environmental Commitment",
      description: "Towards a greener footprint",
      image: "/FeaturedInsights/img3.webp",
      color: "from-green-500 to-emerald-500",
      href: "/sustainability"
    },
    {
      id: 4,
      category: "Solutions",
      title: "Perimeter Protection Solution",
      subtitle: "Advanced Security",
      description: "Advanced perimeter solutions leveraging AI and multidimensional perception",
      image: "/FeaturedInsights/img4.webp",
      color: "from-purple-500 to-indigo-500",
      href: "/solutions/perimeter-protection"
    },
    {
      id: 5,
      category: "Insights",
      title: "Hikvision Blog",
      subtitle: "Industry Trends 2025",
      description: "Top 5 trends for the AIoT industry in 2025",
      image: "/FeaturedInsights/img5.webp",
      color: "from-orange-500 to-red-500",
      href: "/blog/aiot-trends-2025"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div
          ref={heroRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <FaRegEnvelope className="w-4 h-4" /> {/* Professional envelope icon */}
            Featured Insights
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6">
            <span className={`block transition-all duration-700 delay-200 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Latest</span>
            <span className={`block text-red-600 transition-all duration-700 delay-400 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Updates</span>
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-500 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Discover cutting-edge innovations and insights that are shaping the future of security technology
          </p>
        </div>

        {/* Main Content */}
        <div
          ref={gridRef}
          className={`grid lg:grid-cols-5 gap-8 transition-all duration-1000 delay-200 ${
            gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          
          {/* Left Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Explore Topics</h3>
            <div className="space-y-4">
              {insightsData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-500 group ${
                    activeIndex === index
                      ? 'bg-white shadow-xl border-2 border-red-200 scale-[1.03]'
                      : 'bg-white hover:bg-gray-50 border-2 border-transparent hover:shadow-lg'
                  }`}
                  style={{
                    transitionDelay: gridInView ? `${index * 80 + 200}ms` : '0ms',
                    opacity: gridInView ? 1 : 0,
                    transform: gridInView ? 'translateX(0)' : 'translateX(-20px)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Image Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          if (target.nextElementSibling) {
                            (target.nextElementSibling as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                      {/* Fallback gradient */}
                      <div className={`hidden absolute inset-0 w-full h-full bg-gradient-to-r ${item.color} items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{item.category.slice(0, 2).toUpperCase()}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                          activeIndex === index ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {item.category}
                        </span>
                        <FiChevronRight className={`w-5 h-5 transition-all duration-500 ${
                          activeIndex === index
                            ? 'text-red-600 transform rotate-90 scale-110'
                            : 'text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1'
                        }`} />
                      </div>
                      
                      <h4 className={`font-bold text-lg mb-1 transition-all duration-300 ${
                        activeIndex === index ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {item.title}
                      </h4>
                      
                      <p className={`text-sm transition-all duration-300 ${
                        activeIndex === index ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-600'
                      }`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
                
                {/* Header with Image */}
                <div className="h-80 relative overflow-hidden">
                  <img
                    src={insightsData[activeIndex].image}
                    alt={insightsData[activeIndex].title}
                    className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  
                  {/* Fallback gradient background */}
                  <div className={`hidden absolute inset-0 w-full h-full bg-gradient-to-r ${insightsData[activeIndex].color} items-center justify-center`}>
                    <div className="text-center text-white z-10">
                      <h2 className="text-4xl font-bold mb-2">
                        {insightsData[activeIndex].category}
                      </h2>
                      <p className="text-xl opacity-90">Featured Content</p>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm text-white text-sm font-bold rounded-full animate-fade-in">
                      {insightsData[activeIndex].category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-4 animate-fade-in">
                      {insightsData[activeIndex].category}
                    </span>
                    
                    <h3 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up">
                      {insightsData[activeIndex].title}
                    </h3>
                    
                    <h4 className="text-2xl font-semibold text-red-600 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                      {insightsData[activeIndex].subtitle}
                    </h4>
                    
                    <p className="text-lg text-gray-600 leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
                      {insightsData[activeIndex].description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={insightsData[activeIndex].href}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                    >
                      Learn More
                      <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    
                    <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-bold rounded-xl transition-all duration-300 hover:shadow-md">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 gap-3">
                {insightsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-400 ease-out ${
                      activeIndex === index
                        ? 'bg-red-600 scale-125 shadow-lg'
                        : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Section - Redesigned */}
        <div
          ref={statsRef}
          className={`mt-24 transition-all duration-1000 delay-200 ${
            statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Trusted by <span className="text-red-600">Millions</span> Worldwide
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
              Our global impact speaks for itself through innovation, reach, and trusted partnerships
            </p>
          </div>
          {/* Stats Grid */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-gray-50 to-red-50 rounded-3xl"></div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-12">
              {[
                {
                  number: "500M+",
                  label: "Connected Devices",
                  description: "Devices worldwide",
                  color: "from-red-500 to-pink-500"
                },
                {
                  number: "180+",
                  label: "Countries Served",
                  description: "Global presence",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  number: "25+",
                  label: "Years Innovation",
                  description: "Industry experience",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  number: "40+",
                  label: "R&D Centers",
                  description: "Research facilities",
                  color: "from-purple-500 to-indigo-500"
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group animate-fade-in"
                  style={{
                    animationDelay: statsInView ? `${index * 200 + 200}ms` : '0ms',
                    opacity: statsInView ? 1 : 0,
                    transform: statsInView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)'
                  }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Icon/Number Container */}
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <span className="text-white text-2xl font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    {/* Stats Content */}
                    <div className="space-y-3">
                      <div className="text-4xl lg:text-5xl font-black text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                        {stat.number}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">{stat.label}</h4>
                      <p className="text-sm text-gray-600">{stat.description}</p>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-6">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: statsInView ? `${75 + (index * 5)}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Bottom Achievement Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Industry Leadership",
                description: "Leading security technology provider globally",
                metric: "#1",
                color: "bg-red-600"
              },
              {
                title: "Innovation Awards",
                description: "Recognition for cutting-edge solutions",
                metric: "50+",
                color: "bg-gray-700"
              },
              {
                title: "Customer Satisfaction",
                description: "Trusted by enterprises worldwide",
                metric: "98%",
                color: "bg-red-500"
              }
            ].map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group animate-fade-in" style={{ animationDelay: statsInView ? `${index * 150 + 800}ms` : '0ms' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${achievement.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                    {achievement.metric}
                  </div>
                  <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Demo & CTA Section */}
        <div className="mt-24 animate-fade-in">
          {/* Main CTA Hero */}
          <div className="bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 rounded-3xl overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M30%2030c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Content */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                    <FaRegEnvelope className="w-4 h-4" /> {/* Professional envelope icon */}
                    Ready to Get Started?
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-slide-up">
                    Experience the Future of 
                    <span className="text-red-400"> Security Technology</span>
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in">
                    Join thousands of enterprises worldwide who trust Hikvision for their security needs. 
                    Start your journey with a personalized demo today.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link
                      href="/demo"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Schedule Free Demo
                      <FiArrowRight className="w-5 h-5" />
                    </Link>
                    
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold rounded-xl transition-all duration-300"
                    >
                      Talk to Expert
                    </Link>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center gap-8 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>No Commitment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Quick Setup</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Preview */}
                <div className="relative">
                  <div
                    className="transition-all duration-500"
                    style={{ perspective: 1000 }}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 animate-fade-in transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                      <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        What You'll Get:
                        <FaRegEnvelope className="w-5 h-5 text-red-400" /> {/* Professional envelope icon */}
                      </h4>
                      <div className="space-y-4">
                        {[
                          { title: "Live Product Demo", desc: "See our solutions in action", time: "30 min" },
                          { title: "Custom Solution Design", desc: "Tailored to your needs", time: "Free" },
                          { title: "ROI Analysis", desc: "Calculate your savings", time: "Detailed" },
                          { title: "Implementation Plan", desc: "Step-by-step roadmap", time: "Complete" }
                        ].map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-opacity-20 shadow-sm animate-fade-in"
                            style={{
                              animationDelay: `${index * 120}ms`,
                              transitionDelay: `${index * 60}ms`
                            }}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {index + 1}
                              </div>
                              <div>
                                <h5 className="text-black font-semibold">
                                  {benefit.title}
                                </h5>
                                <p className="text-gray-400 text-sm">{benefit.desc}</p>
                              </div>
                            </div>
                            <span className="text-red-400 text-sm font-medium">{benefit.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-600 bg-opacity-20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white bg-opacity-10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Newsletter Signup */}
          <div
            ref={newsletterRef}
            className={`
              relative mt-16 max-w-2xl mx-auto bg-gradient-to-br from-white via-gray-50 to-red-50
              rounded-3xl p-10 text-center border border-gray-200 shadow-2xl
              transition-all duration-1000 animate-fade-in
              ${newsletterInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              hover:scale-[1.02] hover:shadow-3xl
            `}
          >
            <div className="flex items-center justify-center mb-4">
              <FaRegEnvelope className="w-8 h-8 text-red-500" />
            </div>
            <h4 className="text-3xl font-extrabold text-gray-900 mb-3">
              Stay Updated with Latest Innovations
            </h4>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto text-base">
              Get exclusive insights, product updates, and industry trends delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 border border-gray-300 rounded-lg bg-white/80 shadow-inner focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-red-400"
              >
                <span>Subscribe</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedInsights
