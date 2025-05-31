'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

const ProductSpotlight = () => {
  const [activeProduct, setActiveProduct] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const spotlightProducts = [
    {
      id: 1,
      title: "ColorVu 3.0 Network Cameras",
      category: "Network Cameras",
      description: "Revolutionary 24/7 full-color imaging with enhanced low-light performance and AI-powered smart detection capabilities.",
      features: ["24/7 Full Color", "AI Smart Detection", "4K Ultra HD", "Advanced Night Vision"],
      image: "/ProductSpotlight/img1.webp",
      badge: "New Release",
      badgeColor: "bg-green-500"
    },
    {
      id: 2,
      title: "AcuSense Technology Suite",
      category: "AI Technology",
      description: "Intelligent video analytics powered by deep learning algorithms for accurate human and vehicle classification.",
      features: ["Human/Vehicle Classification", "False Alarm Reduction", "Real-time Analytics", "Edge Computing"],
      image: "/ProductSpotlight/img2.webp",
      badge: "AI Powered",

      badgeColor: "bg-red-500"
    },
    {
      id: 3,
      title: "Pro Series PTZ Cameras",
      category: "PTZ Cameras",
      description: "Professional-grade pan-tilt-zoom cameras with ultra-smooth movement and exceptional zoom capabilities.",
      features: ["360° Coverage", "40x Optical Zoom", "Smart Tracking", "Weather Resistant"],
      image: "/ProductSpotlight/img3.webp",
      badge: "Professional",
      badgeColor: "bg-gray-600"
    },
    {
      id: 4,
      title: "Thermal Imaging Solutions",
      category: "Thermal Cameras",
      description: "Advanced thermal imaging technology for perimeter protection and temperature monitoring applications.",
      features: ["Temperature Detection", "Perimeter Protection", "Fire Prevention", "24/7 Monitoring"],
      image: "/ProductSpotlight/img4.webp",
      badge: "Advanced",
      badgeColor: "bg-red-600"
    }
  ]

  const nextProduct = () => {
    setActiveProduct((prev) => (prev + 1) % spotlightProducts.length)
  }

  const prevProduct = () => {
    setActiveProduct((prev) => (prev - 1 + spotlightProducts.length) % spotlightProducts.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M30%2030c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20zm0%200c0-11.046%208.954-20%2020-20s20%208.954%2020%2020-8.954%2020-20%2020-20-8.954-20-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Featured Products
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Product
            <span className="bg-gradient-to-r from-red-600 to-gray-700 bg-clip-text text-transparent"> Spotlight</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our latest innovations in security technology, featuring cutting-edge AI capabilities
            and professional-grade performance for every application.
          </p>
        </div>

        {/* Main Product Display */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-gray-900 to-red-900 p-8 lg:p-12 flex items-center justify-center min-h-[400px]">
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
                  
                  {/* Fallback placeholder - hidden by default */}
                  <div className="hidden bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-white text-lg font-semibold">Product Image</h3>
                    <p className="text-white/70 text-sm">High-resolution product showcase</p>
                  </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-500/20 rounded-full -ml-24 -mb-24"></div>
              </div>

              {/* Product Info */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${spotlightProducts[activeProduct].badgeColor}`}>
                      {spotlightProducts[activeProduct].badge}
                    </span>
                    <span className="ml-3 text-sm text-red-600 font-medium">
                      {spotlightProducts[activeProduct].category}
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {spotlightProducts[activeProduct].title}
                  </h3>

                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {spotlightProducts[activeProduct].description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Key Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {spotlightProducts[activeProduct].features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Learn More
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-400 hover:border-red-600 text-gray-700 hover:text-red-600 font-semibold rounded-lg transition-all duration-300"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 z-10">
            <button
              onClick={prevProduct}
              className="w-12 h-12 bg-white hover:bg-red-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-6 z-10">
            <button
              onClick={nextProduct}
              className="w-12 h-12 bg-white hover:bg-red-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {spotlightProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveProduct(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeProduct
                  ? 'bg-red-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>

        {/* Quick Access Grid */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {spotlightProducts.map((product, index) => (
            <div
              key={product.id}
              onClick={() => setActiveProduct(index)}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${index === activeProduct
                  ? 'bg-red-100 border-2 border-red-500 shadow-lg scale-105'
                  : 'bg-white border-2 border-transparent hover:border-gray-200 hover:shadow-md hover:scale-102'}`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${index === activeProduct ? 'bg-red-600' : 'bg-gray-100'}`}>
                  <svg className={`w-6 h-6 ${index === activeProduct ? 'text-white' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className={`font-semibold text-sm mb-1 ${index === activeProduct ? 'text-red-900' : 'text-gray-900'}`}>
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </h4>
                <p className={`text-xs ${index === activeProduct ? 'text-red-700' : 'text-gray-600'}`}>
                  {product.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductSpotlight