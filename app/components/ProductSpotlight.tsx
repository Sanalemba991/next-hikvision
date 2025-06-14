'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'

const ProductSpotlight = () => {
  const [activeProduct, setActiveProduct] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const [sectionInView, setSectionInView] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Intersection Observer for scroll-triggered animations
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  useEffect(() => {
    if (inView) {
      setSectionInView(true)
      setAutoPlay(true)
    } else {
      setAutoPlay(false)
    }
  }, [inView])

  const spotlightProducts = [
    {
      id: 1,
      title: "ColorVu 3.0 Network Cameras",
      category: "Network Cameras",
      description: "Revolutionary 24/7 full-color imaging with enhanced low-light performance and AI-powered smart detection capabilities.",
      features: ["24/7 Full Color", "AI Smart Detection", "4K Ultra HD", "Advanced Night Vision"],
      image: "/ProductSpotlight/img1.webp",
      badge: "New Release",
      badgeColor: "bg-emerald-600",
      accentColor: "from-red-600 to-red-700"
    },
    {
      id: 2,
      title: "AcuSense Technology Suite",
      category: "AI Technology",
      description: "Intelligent video analytics powered by deep learning algorithms for accurate human and vehicle classification.",
      features: ["Human/Vehicle Classification", "False Alarm Reduction", "Real-time Analytics", "Edge Computing"],
      image: "/ProductSpotlight/img2.webp",
      badge: "AI Powered",
      badgeColor: "bg-blue-600",
      accentColor: "from-red-600 to-red-700"
    },
    {
      id: 3,
      title: "Pro Series PTZ Cameras",
      category: "PTZ Cameras",
      description: "Professional-grade pan-tilt-zoom cameras with ultra-smooth movement and exceptional zoom capabilities.",
      features: ["360° Coverage", "40x Optical Zoom", "Smart Tracking", "Weather Resistant"],
      image: "/ProductSpotlight/img3.webp",
      badge: "Professional",
      badgeColor: "bg-purple-600",
      accentColor: "from-red-600 to-red-700"
    },
    {
      id: 4,
      title: "Thermal Imaging Solutions",
      category: "Thermal Cameras",
      description: "Advanced thermal imaging technology for perimeter protection and temperature monitoring applications.",
      features: ["Temperature Detection", "Perimeter Protection", "Fire Prevention", "24/7 Monitoring"],
      image: "/ProductSpotlight/img4.webp",
      badge: "Advanced",
      badgeColor: "bg-orange-600",
      accentColor: "from-red-600 to-red-700"
    }
  ]

  const nextProduct = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveProduct((prev) => (prev + 1) % spotlightProducts.length)
      setIsTransitioning(false)
    }, 200)
  }

  const prevProduct = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveProduct((prev) => (prev - 1 + spotlightProducts.length) % spotlightProducts.length)
      setIsTransitioning(false)
    }, 200)
  }

  const selectProduct = (index: number) => {
    if (index === activeProduct || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveProduct(index)
      setIsTransitioning(false)
    }, 200)
  }

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && sectionInView) {
      intervalRef.current = setInterval(nextProduct, 6000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [activeProduct, autoPlay, sectionInView])

  const handleMouseEnter = () => setAutoPlay(false)
  const handleMouseLeave = () => setAutoPlay(true)

  // Animation variants - Optimized for smoothness
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section 
      ref={inViewRef}
      className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-red-50/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Professional Section Header */}
        <motion.div 
          className="text-center mb-10 md:mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-full text-sm font-semibold mb-6"
            variants={itemVariants}
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Featured Products
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            variants={itemVariants}
          >
            Product
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700 ml-3">
              Spotlight
            </span>
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Discover our cutting-edge innovations in security technology, featuring advanced AI capabilities
            and professional-grade performance.
          </motion.p>
        </motion.div>

        {/* Main Product Display */}
        <motion.div 
          className="relative mb-8 md:mb-10 group"
          variants={itemVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
              
              {/* Product Image Section */}
              <div className="relative bg-gradient-to-br from-gray-900 via-red-900 to-gray-800 p-6 md:p-8 lg:p-12 flex items-center justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-lg"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm">
                      <Image
                        src={spotlightProducts[activeProduct].image}
                        alt={spotlightProducts[activeProduct].title}
                        fill
                        className="object-contain p-4 md:p-6"
                        quality={90}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-red-500/10 rounded-full -mr-16 -mt-16 md:-mr-24 md:-mt-24"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 bg-blue-500/10 rounded-full -ml-12 -mb-12 md:-ml-18 md:-mb-18"></div>
              </div>

              {/* Mobile & Tablet Navigation - After Image */}
              <div className="lg:hidden flex justify-center items-center py-4 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <button
                    onClick={prevProduct}
                    disabled={isTransitioning}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 disabled:cursor-not-allowed active:bg-red-100"
                  >
                    <svg className="w-5 h-5 text-gray-500 hover:text-gray-700 active:text-red-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex items-center space-x-2">
                    {spotlightProducts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => selectProduct(index)}
                        disabled={isTransitioning}
                        className={`transition-all duration-200 disabled:cursor-not-allowed ${
                          index === activeProduct
                            ? 'w-6 h-2 bg-red-600 rounded-full'
                            : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 active:bg-red-400 rounded-full'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextProduct}
                    disabled={isTransitioning}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 disabled:cursor-not-allowed active:bg-red-100"
                  >
                    <svg className="w-5 h-5 text-gray-500 hover:text-gray-700 active:text-red-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {/* Badge and Category */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${spotlightProducts[activeProduct].badgeColor} w-fit`}>
                        {spotlightProducts[activeProduct].badge}
                      </span>
                      <span className="text-sm text-red-600 font-bold uppercase tracking-wider">
                        {spotlightProducts[activeProduct].category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                      {spotlightProducts[activeProduct].title}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                      {spotlightProducts[activeProduct].description}
                    </p>

                    {/* Features */}
                    <div className="mb-6 md:mb-8">
                      <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Key Features</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {spotlightProducts[activeProduct].features.map((feature, index) => (
                          <div key={index} className="flex items-center group">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center mr-3 flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 group"
                      >
                        Learn More
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>

                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 font-semibold rounded-xl transition-all duration-200 hover:bg-red-50 group"
                      >
                        Request Demo
                        <svg className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Clean Arrows Only */}
          <div className="hidden lg:block">
            <button
              onClick={prevProduct}
              disabled={isTransitioning}
              className="absolute top-1/2 -translate-y-1/2 -left-6 xl:-left-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7 text-gray-400 hover:text-red-800 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextProduct}
              disabled={isTransitioning}
              className="absolute top-1/2 -translate-y-1/2 -right-6 xl:-right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7 text-gray-400 hover:text-red-800 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Desktop Product Indicators */}
        <motion.div 
          className="hidden lg:flex justify-center items-center space-x-3"
          variants={itemVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          {spotlightProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => selectProduct(index)}
              disabled={isTransitioning}
              className={`relative transition-all duration-200 disabled:cursor-not-allowed ${
                index === activeProduct
                  ? 'w-8 md:w-12 h-3 md:h-4 bg-red-600 rounded-full shadow-lg'
                  : 'w-3 md:w-4 h-3 md:h-4 bg-gray-300 hover:bg-red-400 rounded-full hover:scale-110'
              }`}
            />
          ))}
          
          {/* Auto-play indicator */}
          <div className="flex ml-6 items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${autoPlay ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-500 font-medium">{autoPlay ? 'Auto' : 'Manual'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductSpotlight