'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

const ProductSpotlight = () => {
  const [activeProduct, setActiveProduct] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const [sectionInView, setSectionInView] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Intersection Observer for scroll-triggered animations
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  useEffect(() => {
    if (inView) {
      setSectionInView(true)
    } else {
      setAutoPlay(false) // Pause auto-play when not in view
    }
  }, [inView])

  const spotlightProducts = [
    {
      id: 1,
      title: "ColorVu 3.0 Network Cameras",
      category: "Network Cameras",
      description: "Revolutionary 24/7 full-color imaging with enhanced low-light performance and AI-powered smart detection capabilities for uncompromising security coverage.",
      features: ["24/7 Full Color", "AI Smart Detection", "4K Ultra HD", "Advanced Night Vision"],
      image: "/ProductSpotlight/img1.webp",
      badge: "New Release",
      badgeColor: "bg-red-600",
      accentColor: "from-red-600 to-red-500"
    },
    {
      id: 2,
      title: "AcuSense Technology Suite",
      category: "AI Technology",
      description: "Intelligent video analytics powered by deep learning algorithms for accurate human and vehicle classification with industry-leading precision.",
      features: ["Human/Vehicle Classification", "False Alarm Reduction", "Real-time Analytics", "Edge Computing"],
      image: "/ProductSpotlight/img2.webp",
      badge: "AI Powered",
      badgeColor: "bg-red-600",
      accentColor: "from-red-600 to-red-500"
    },
    {
      id: 3,
      title: "Pro Series PTZ Cameras",
      category: "PTZ Cameras",
      description: "Professional-grade pan-tilt-zoom cameras with ultra-smooth movement and exceptional zoom capabilities for comprehensive surveillance.",
      features: ["360° Coverage", "40x Optical Zoom", "Smart Tracking", "Weather Resistant"],
      image: "/ProductSpotlight/img3.webp",
      badge: "Professional",
      badgeColor: "bg-red-600",
      accentColor: "from-red-600 to-red-500"
    },
    {
      id: 4,
      title: "Thermal Imaging Solutions",
      category: "Thermal Cameras",
      description: "Advanced thermal imaging technology for perimeter protection and temperature monitoring applications with military-grade precision.",
      features: ["Temperature Detection", "Perimeter Protection", "Fire Prevention", "24/7 Monitoring"],
      image: "/ProductSpotlight/img4.webp",
      badge: "Advanced",
      badgeColor: "bg-red-600",
      accentColor: "from-red-600 to-red-500"
    }
  ]

  const nextProduct = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveProduct((prev) => (prev + 1) % spotlightProducts.length)
      setIsTransitioning(false)
    }, 150)
  }

  const prevProduct = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveProduct((prev) => (prev - 1 + spotlightProducts.length) % spotlightProducts.length)
      setIsTransitioning(false)
    }, 150)
  }

  const selectProduct = (index: number) => {
    if (index === activeProduct || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveProduct(index)
      setIsTransitioning(false)
    }, 150)
  }

  // Enhanced Auto-play functionality that only runs when section is in view
  useEffect(() => {
    if (autoPlay && sectionInView) {
      intervalRef.current = setInterval(() => {
        nextProduct()
      }, 5000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [activeProduct, autoPlay, sectionInView])

  const handleMouseEnter = () => {
    setAutoPlay(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleMouseLeave = () => {
    setAutoPlay(true)
  }

  return (
    <section 
      ref={inViewRef}
      className="py-24 bg-gradient-to-br from-slate-50 via-white to-red-50/30 relative overflow-hidden"
    >
      {/* Enhanced Background Pattern with scroll animation */}
      <div className={`absolute inset-0 opacity-[0.02] transition-all duration-1000 ${sectionInView ? 'opacity-[0.02]' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M40%2040c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20zm0%200c0-11.046%208.954-20%2020-20s20%208.954%2020%2020-8.954%2020-20%2020-20-8.954-20-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Floating elements with scroll-triggered animations */}
      <div className={`absolute top-20 left-10 w-2 h-2 bg-red-400 rounded-full animate-pulse transition-all duration-1000 delay-100 ${sectionInView ? 'opacity-100' : 'opacity-0 -translate-x-5'}`}></div>
      <div className={`absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce transition-all duration-1000 delay-200 ${sectionInView ? 'opacity-100' : 'opacity-0 translate-x-5'}`} style={{animationDelay: '1s'}}></div>
      <div className={`absolute bottom-40 left-20 w-1 h-1 bg-green-400 rounded-full animate-ping transition-all duration-1000 delay-300 ${sectionInView ? 'opacity-100' : 'opacity-0 -translate-y-5'}`} style={{animationDelay: '2s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Section Header with scroll animation */}
        <div className={`text-center mb-20 transition-all duration-700 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 rounded-full text-sm font-semibold mb-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
            <svg className="w-4 h-4 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Featured Products
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            <span className={`inline-block transition-all duration-500 delay-100 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>Product</span>
            <span className={`inline-block bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent animate-gradient transition-all duration-500 delay-200 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}> Spotlight</span>
          </h2>

          <p className={`text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Discover our cutting-edge innovations in security technology, featuring advanced AI capabilities
            and professional-grade performance engineered for mission-critical applications.
          </p>
        </div>

        {/* Enhanced Main Product Display with scroll animation */}
        <div 
          className={`relative transition-all duration-1000 delay-500 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-700 hover:shadow-3xl hover:scale-[1.02] ${isTransitioning ? 'opacity-90 scale-[0.98]' : 'opacity-100 scale-100'}`}>
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Enhanced Product Image */}
              <div className="relative bg-gradient-to-br from-[#2d0b16] via-[#4b1d2c] to-[#a8233b] p-8 lg:p-12 flex items-center justify-center min-h-[400px]">
                {/* Actual product image */}
                <div className="relative z-10 w-full max-w-md">
                  <img 
                    src={spotlightProducts[activeProduct].image} 
                    alt={spotlightProducts[activeProduct].title}
                    className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextElementSibling) {
                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                      }
                    }}
                  />
                  {/* Enhanced Fallback placeholder */}
                  <div className="hidden bg-white/20 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/30">
                    <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                      <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">Product Showcase</h3>
                    <p className="text-white/80 text-sm">Professional product visualization</p>
                  </div>
                </div>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-500/20 rounded-full -ml-24 -mb-24"></div>
              </div>

              {/* Enhanced Product Info */}
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50/50">
                <div className={`transform transition-all duration-700 ${isTransitioning ? 'translate-x-4 opacity-70' : 'translate-x-0 opacity-100'}`}>
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold text-white ${spotlightProducts[activeProduct].badgeColor} shadow-lg transform hover:scale-105 transition-all duration-300`}>
                        {spotlightProducts[activeProduct].badge}
                      </span>
                      <span className="ml-4 text-sm text-red-600 font-bold uppercase tracking-wider">
                        {spotlightProducts[activeProduct].category}
                      </span>
                    </div>

                    <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                      {spotlightProducts[activeProduct].title}
                    </h3>

                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      {spotlightProducts[activeProduct].description}
                    </p>
                  </div>

                  {/* Enhanced Features */}
                  <div className="mb-10">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {spotlightProducts[activeProduct].features.map((feature, index) => (
                        <div key={index} className="flex items-center group">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${spotlightProducts[activeProduct].accentColor} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}>
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/products"
                      className={`group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r ${spotlightProducts[activeProduct].accentColor} hover:shadow-xl text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
                    >
                      Learn More
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 font-bold rounded-xl transition-all duration-300 hover:bg-red-50 transform hover:scale-105"
                    >
                      Request Demo
                      <svg className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-20">
            <button
              onClick={prevProduct}
              disabled={isTransitioning}
              className="group w-14 h-14 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-red-300 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600 group-hover:-translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-6 z-20">
            <button
              onClick={nextProduct}
              disabled={isTransitioning}
              className="group w-14 h-14 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-red-300 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Product Indicators with scroll animation */}
        <div className={`flex justify-center items-center mt-16 space-x-4 transition-all duration-700 delay-700 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {spotlightProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => selectProduct(index)}
              disabled={isTransitioning}
              className={`relative transition-all duration-500 disabled:cursor-not-allowed ${
                index === activeProduct
                  ? 'w-12 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg'
                  : 'w-4 h-4 bg-gray-300 hover:bg-gray-400 rounded-full hover:scale-125'
              }`}
            >
              {index === activeProduct && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
          
          {/* Auto-play indicator */}
          <div className="ml-6 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${autoPlay ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-500 font-medium">{autoPlay ? 'Auto' : 'Manual'}</span>
          </div>
        </div>

        {/* Enhanced Quick Access Grid with staggered animations */}
        <div className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${sectionInView ? 'opacity-100' : 'opacity-0'}`}>
          {spotlightProducts.map((product, index) => (
            <div
              key={product.id}
              onClick={() => selectProduct(index)}
              className={`group p-8 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                index === activeProduct
                  ? `bg-gradient-to-br ${product.accentColor} text-white shadow-2xl scale-105 -translate-y-2`
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:-translate-y-1'
              } ${sectionInView ? 'animate-fadeInUp' : 'opacity-0 translate-y-5'}`}
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  index === activeProduct 
                    ? 'bg-white/20 backdrop-blur-sm shadow-lg' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-red-50 group-hover:to-red-100'
                }`}>
                  <svg className={`w-8 h-8 transition-all duration-300 ${
                    index === activeProduct ? 'text-white' : 'text-gray-600 group-hover:text-red-600'
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className={`font-bold text-sm mb-2 transition-colors duration-300 ${
                  index === activeProduct ? 'text-white' : 'text-gray-900 group-hover:text-red-600'
                }`}>
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </h4>
                <p className={`text-xs font-medium transition-colors duration-300 ${
                  index === activeProduct ? 'text-white/80' : 'text-gray-600 group-hover:text-red-500'
                }`}>
                  {product.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        * {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  )
}

export default ProductSpotlight