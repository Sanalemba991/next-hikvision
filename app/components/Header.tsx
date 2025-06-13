'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiShield, FiEye, FiGlobe, FiAward, FiUsers } from 'react-icons/fi'

const Header = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Professional content slides that change every 5 seconds
  const contentSlides = [
    {
      title: "Committed to Security,",
      subtitle: "Committed to the Future.",
      description: "We have an unwavering drive to make the world safer.",
      subtext: "We turn on the promise of a secure tomorrow.",
      linkText: "Our technology and innovation",
      linkHref: "/products",
      icon: FiShield
    },
    {
      title: "Pioneering Smart Cities,",
      subtitle: "Innovative Tomorrow.",
      description: "We create intelligent infrastructure for urban transformation.",
      subtext: "We deliver on the vision of connected communities.",
      linkText: "Our smart city solutions",
      linkHref: "/solutions",
      icon: FiGlobe
    },
    {
      title: "Protecting What Matters,",
      subtitle: "Unlock Potential.",
      description: "We safeguard businesses with cutting-edge surveillance technology.",
      subtext: "We enable growth through comprehensive security solutions.",
      linkText: "Our enterprise solutions",
      linkHref: "/products",
      icon: FiEye
    },
    {
      title: "Trusted by Millions,",
      subtitle: "Proven Worldwide.",
      description: "We serve customers across the globe with reliable security solutions.",
      subtext: "We establish lasting partnerships built on trust and excellence.",
      linkText: "Our global presence",
      linkHref: "/about",
      icon: FiUsers
    },
    {
      title: "Innovation Driven,",
      subtitle: "Excellence Delivered.",
      description: "We push the boundaries of what's possible in security technology.",
      subtext: "We transform ideas into industry-leading solutions.",
      linkText: "Our research and development",
      linkHref: "/about",
      icon: FiAward
    }
  ]

  useEffect(() => {
    // Simple initialization of the video element
    const video = videoRef.current
    if (video) {
      video.play().catch(err => {
        console.log('Video autoplay failed:', err)
      })
    }
  }, [])

  // Auto-slide content every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contentSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [contentSlides.length])

  const slideVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <header className="relative h-screen w-full overflow-hidden">
      {/* Video Background Only */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content Overlay - Moved up slightly */}
      <div className="absolute inset-0 flex items-center justify-start z-10 ">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4"
              >
                {/* Main Title */}
                <motion.div variants={itemVariants}>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                    {contentSlides[currentSlide].title}
                    <br />
                    <span className="text-white">
                      {contentSlides[currentSlide].subtitle}
                    </span>
                  </h1>
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants} className="space-y-2 max-w-2xl">
                  <p className="text-lg lg:text-xl text-white/90 font-medium">
                    {contentSlides[currentSlide].description}
                  </p>
                  <p className="text-base lg:text-lg text-white/75">
                    {contentSlides[currentSlide].subtext}
                  </p>
                </motion.div>

                {/* Call to Action Link */}
                <motion.div variants={itemVariants} className="pt-2">
                  <Link
                    href={contentSlides[currentSlide].linkHref}
                    className="group inline-flex items-center text-base lg:text-lg text-red-400 hover:text-red-500 transition-colors duration-300 font-medium"
                  >
                    <FiArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    {contentSlides[currentSlide].linkText}
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-6 lg:left-12 z-20">
        <div className="flex space-x-2">
          {contentSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Navigation Links - Moved up slightly */}
      <div className="absolute top-1/2 right-6 lg:right-12 transform -translate-y-16 z-20 hidden lg:block">
        <div className="space-y-3">
          <Link
            href="/products"
            className="block p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            title="Products"
          >
            <FiShield className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
          </Link>
          <Link
            href="/solutions"
            className="block p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            title="Solutions"
          >
            <FiGlobe className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
          </Link>
          <Link
            href="/about"
            className="block p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            title="About Us"
          >
            <FiAward className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
          </Link>
          <Link
            href="/contact"
            className="block p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            title="Contact"
          >
            <FiUsers className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header