'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const FeaturedInsights = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [heroInView, setHeroInView] = useState(false)
  const [gridInView, setGridInView] = useState(false)
  const [statsInView, setStatsInView] = useState(false)
  const [newsletterInView, setNewsletterInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const statsRef = useRef(null)
  const newsletterRef = useRef(null)
  
  const router = useRouter()

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) setHeroInView(true)
            if (entry.target === gridRef.current) setGridInView(true)
            if (entry.target === statsRef.current) setStatsInView(true)
            if (entry.target === newsletterRef.current) setNewsletterInView(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (heroRef.current) observer.observe(heroRef.current)
    if (gridRef.current) observer.observe(gridRef.current)
    if (statsRef.current) observer.observe(statsRef.current)
    if (newsletterRef.current) observer.observe(newsletterRef.current)

    return () => observer.disconnect()
  }, [])

  // Custom Icons as SVG components
  const ArrowRightIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )

  const ChevronRightIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )

  const EnvelopeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )

  const insightsData = [
    {
      id: 1,
      category: "Innovation",
      title: "What's new",
      subtitle: "Hikvision AIoT Technologies",
      description: "Explore our advantages in AIoT techs",
      longDescription: `Hikvision's AIoT (Artificial Intelligence of Things) technologies represent a revolutionary approach to intelligent security and beyond. Our cutting-edge solutions integrate advanced AI algorithms with IoT connectivity to create smart, responsive systems that adapt to real-world challenges.

Our AIoT platform combines deep learning, computer vision, and edge computing to deliver unprecedented accuracy in object detection, facial recognition, and behavioral analysis. From smart cities to retail analytics, our technology empowers organizations to make data-driven decisions while ensuring robust security infrastructure.

The future of security lies in the seamless integration of artificial intelligence with physical world applications. Our R&D teams have developed proprietary algorithms that can process millions of data points in real-time, providing actionable insights that help prevent incidents before they occur. This proactive approach to security represents a paradigm shift from reactive monitoring to predictive intelligence.`,
      image: "/FeaturedInsights/img1.webp",
      color: "from-red-600 to-red-700",
      href: "/innovations/aiot"
    },
    {
      id: 2,
      category: "Resources",
      title: "Quick Guide for Project-Oriented",
      subtitle: "Premium Products",
      description: "Download and Explore",
      longDescription: `Our comprehensive project-oriented guide serves as your ultimate resource for implementing premium security solutions across various industries. This detailed documentation provides step-by-step methodologies, best practices, and technical specifications for successful project deployment.

Whether you're managing large-scale enterprise installations or specialized vertical market applications, our premium product portfolio offers scalable solutions that grow with your business needs. Each product in our lineup has been meticulously engineered to deliver exceptional performance, reliability, and long-term value.

The guide includes detailed case studies from successful implementations worldwide, featuring everything from smart city surveillance networks to advanced retail analytics systems. Our technical experts have compiled years of field experience into actionable insights that help project managers avoid common pitfalls and optimize system performance from day one.`,
      image: "/FeaturedInsights/img2.webp",
      color: "from-gray-600 to-gray-700",
      href: "/resources/project-guide"
    },
    {
      id: 3,
      category: "Sustainability",
      title: "Our Green Practice",
      subtitle: "Environmental Commitment",
      description: "Towards a greener footprint",
      longDescription: `Hikvision's commitment to environmental sustainability goes far beyond regulatory compliance – it's embedded in our corporate DNA and drives innovation across all our operations. Our green practices encompass the entire product lifecycle, from sustainable design and manufacturing to energy-efficient operation and responsible end-of-life recycling.

Our manufacturing facilities operate under strict environmental standards, utilizing renewable energy sources and implementing comprehensive waste reduction programs. We've invested heavily in clean technology research, developing products that consume significantly less power while delivering superior performance compared to traditional security solutions.

Through our Green Vision initiative, we're pioneering the development of carbon-neutral security technologies that help our customers reduce their environmental impact while maintaining the highest security standards. Our smart power management systems, eco-friendly packaging, and circular economy principles demonstrate our unwavering commitment to creating a sustainable future for the security industry and the planet.`,
      image: "/FeaturedInsights/img3.webp",
      color: "from-green-600 to-green-700",
      href: "/sustainability"
    },
    {
      id: 4,
      category: "Solutions",
      title: "Perimeter Protection Solution",
      subtitle: "Advanced Security",
      description: "Advanced perimeter solutions leveraging AI and multidimensional perception",
      longDescription: `Our state-of-the-art perimeter protection solutions represent the pinnacle of security technology, combining multiple detection modalities with advanced AI analytics to create impenetrable security barriers. These comprehensive systems utilize thermal imaging, visible light cameras, radar detection, and smart sensors to provide 360-degree situational awareness.

The multi-layered approach to perimeter security ensures that potential threats are detected and classified at the earliest possible stage, allowing security personnel to respond proactively rather than reactively. Our intelligent video analytics can distinguish between genuine security threats and false alarms caused by environmental factors, dramatically reducing operational costs and improving response efficiency.

Advanced machine learning algorithms continuously adapt to site-specific conditions, learning normal patterns of activity and automatically adjusting sensitivity levels to maintain optimal detection performance. The system's self-optimizing capabilities ensure consistent protection across diverse environmental conditions, from harsh industrial settings to sensitive government facilities, providing unmatched reliability and peace of mind.`,
      image: "/FeaturedInsights/img4.webp",
      color: "from-purple-600 to-purple-700",
      href: "/solutions/perimeter-protection"
    },
    {
      id: 5,
      category: "Insights",
      title: "Hikvision Blog",
      subtitle: "Industry Trends 2025",
      description: "Top 5 trends for the AIoT industry in 2025",
      longDescription: `The AIoT industry is experiencing unprecedented transformation as we approach 2025, with five major trends reshaping how organizations approach intelligent automation and security. Edge computing is becoming the cornerstone of real-time decision making, enabling instant processing of vast amounts of sensor data without relying on cloud connectivity.

Sustainability and energy efficiency are driving innovation in smart device design, with manufacturers focusing on creating solutions that deliver maximum performance while minimizing environmental impact. The integration of 5G networks is unlocking new possibilities for massive IoT deployments, enabling seamless connectivity for millions of devices across smart city infrastructures.

Privacy-preserving AI technologies are emerging as critical differentiators, allowing organizations to leverage powerful analytics while maintaining strict data protection standards. The convergence of virtual and augmented reality with physical security systems is creating immersive monitoring experiences that enhance operator effectiveness and training capabilities. These trends collectively point toward a future where intelligent systems become invisible yet indispensable components of our daily lives.`,
      image: "/FeaturedInsights/img5.webp",
      color: "from-indigo-600 to-indigo-700",
      href: "/blog/aiot-trends-2025"
    }
  ]

  // Navigation function for Talk to Expert
  const handleTalkToExpert = () => {
    router.push('/contact')
  }

  const handleLinkClick = (href: string) => {
    console.log(`Navigating to: ${href}`)
  }

  // Enhanced PDF download function with image
  const handleDownload = async (item: any) => {
    try {
      // Import jsPDF dynamically
      const { jsPDF } = await import('jspdf')

      // Create new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const contentWidth = pageWidth - (margin * 2)

      // Set up fonts and colors
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(24)
      pdf.setTextColor(220, 38, 38) // Red color

      // Add title
      const titleLines = pdf.splitTextToSize(item.title, contentWidth)
      pdf.text(titleLines, margin, 30)

      // Add subtitle
      pdf.setFontSize(16)
      pdf.setTextColor(100, 100, 100)
      const subtitleY = 30 + (titleLines.length * 8)
      const subtitleLines = pdf.splitTextToSize(item.subtitle, contentWidth)
      pdf.text(subtitleLines, margin, subtitleY)

      // Add category badge
      pdf.setFontSize(10)
      pdf.setTextColor(255, 255, 255)
      pdf.setFillColor(220, 38, 38)
      pdf.roundedRect(margin, subtitleY + 15, 30, 8, 2, 2, 'F')
      pdf.text(item.category.toUpperCase(), margin + 15, subtitleY + 20, { align: 'center' })

      // Try to add actual image
      try {
        const imageY = subtitleY + 35
        const imageHeight = 60
        const imageWidth = contentWidth

        // Function to convert image to base64
        const getImageBase64 = (url: string): Promise<string> => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.onload = () => {
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')
              canvas.width = img.width
              canvas.height = img.height
              ctx?.drawImage(img, 0, 0)
              resolve(canvas.toDataURL('image/jpeg', 0.8))
            }
            img.onerror = reject
            img.src = url
          })
        }

        // Try to load and add the image
        try {
          const imageBase64 = await getImageBase64(item.image)
          pdf.addImage(imageBase64, 'JPEG', margin, imageY, imageWidth, imageHeight)
        } catch (imageError) {
          console.log('Failed to load image, creating placeholder:', imageError)
          
          // Create a visual placeholder when image fails to load
          pdf.setFillColor(245, 245, 245)
          pdf.rect(margin, imageY, imageWidth, imageHeight, 'F')
          
          // Add border
          pdf.setDrawColor(200, 200, 200)
          pdf.setLineWidth(0.5)
          pdf.rect(margin, imageY, imageWidth, imageHeight)
          
          // Add placeholder icon and text
          pdf.setTextColor(150, 150, 150)
          pdf.setFontSize(14)
          pdf.text('📷', margin + imageWidth/2 - 5, imageY + imageHeight/2 - 5, { align: 'center' })
          pdf.setFontSize(10)
          pdf.text('Image Preview', margin + imageWidth/2, imageY + imageHeight/2 + 5, { align: 'center' })
          pdf.setFontSize(8)
          pdf.text(item.image.split('/').pop() || 'Image', margin + imageWidth/2, imageY + imageHeight/2 + 12, { align: 'center' })
        }

        // Add content after image
        let currentY = imageY + imageHeight + 20

        // Add description section
        pdf.setTextColor(60, 60, 60)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(14)
        pdf.text('Overview', margin, currentY)
        currentY += 10

        // Add short description
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(11)
        const descLines = pdf.splitTextToSize(item.description, contentWidth)
        pdf.text(descLines, margin, currentY)
        currentY += descLines.length * 5 + 15

        // Add detailed content section
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(14)
        pdf.text('Detailed Analysis', margin, currentY)
        currentY += 10

        // Add long description with proper formatting
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(10)
        
        const paragraphs = item.longDescription.split('\n\n')

        paragraphs.forEach((paragraph: string, index: number) => {
          if (paragraph.trim()) {
            const lines = pdf.splitTextToSize(paragraph.trim(), contentWidth)

            // Check if we need a new page
            if (currentY + (lines.length * 4) > pageHeight - margin) {
              pdf.addPage()
              currentY = margin
            }

            pdf.text(lines, margin, currentY)
            currentY += lines.length * 4 + 8
          }
        })

        // Add footer on each page
        const addFooter = () => {
          const footerY = pageHeight - 15
          pdf.setFontSize(8)
          pdf.setTextColor(120, 120, 120)
          
          // Company info
          pdf.text('© 2025 Hikvision', margin, footerY)
          
          // Category and date
          const rightText = `${item.category} Insights | ${new Date().toLocaleDateString()}`
          pdf.text(rightText, pageWidth - margin, footerY, { align: 'right' })
          
          // Add separator line
          pdf.setDrawColor(200, 200, 200)
          pdf.setLineWidth(0.3)
          pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5)
        }

        // Add footer to current page
        addFooter()

        // If content spans multiple pages, add footer to all pages
        const totalPages = pdf.getNumberOfPages()
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i)
          addFooter()
        }

      } catch (imageError) {
        console.error('Image processing failed:', imageError)
        
        // Fallback: create content without image
        let currentY = subtitleY + 35
        
        pdf.setTextColor(60, 60, 60)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(11)
        
        const paragraphs = item.longDescription.split('\n\n')
        
        paragraphs.forEach((paragraph: string) => {
          if (paragraph.trim()) {
            const lines = pdf.splitTextToSize(paragraph.trim(), contentWidth)
            
            if (currentY + (lines.length * 5) > pageHeight - margin) {
              pdf.addPage()
              currentY = margin
            }
            
            pdf.text(lines, margin, currentY)
            currentY += lines.length * 5 + 10
          }
        })
      }

      // Save the PDF
      const fileName = `${item.category}-${item.title.replace(/\s+/g, '-')}.pdf`
      pdf.save(fileName)

      console.log(`Downloaded PDF: ${item.title}`)

    } catch (error) {
      console.error('PDF generation failed:', error)

      // Fallback to text file
      const content = `
${item.title}
${item.subtitle}

Category: ${item.category}

${item.longDescription}

© 2025 Hikvision - ${item.category} Insights
For more information, visit our website.
      `.trim()

      const blob = new Blob([content], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${item.category}-${item.title.replace(/\s+/g, '-')}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      console.log(`Downloaded text file: ${item.title}`)
    }
  }

  // Subtle animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-50 py-16 overflow-hidden">
      {/* Fixed container to prevent toolkit overflow */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="text-center mb-16"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            variants={fadeInUp}
          >
            <EnvelopeIcon className="w-4 h-4" />
            Featured Insights
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.span
              className="block"
              variants={fadeInUp}
            >
              Latest
            </motion.span>
            <motion.span
              className="block text-red-600"
              variants={fadeInUp}
            >
              Updates
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Discover cutting-edge innovations and insights that are shaping the future of security technology
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          ref={gridRef}
          className="grid lg:grid-cols-5 gap-8 mb-20"
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >

          {/* Left Navigation Panel */}
          <motion.div
            className="lg:col-span-2"
            variants={slideInLeft}
          >
            <motion.h3
              className="text-2xl font-bold text-gray-900 mb-8"
              variants={fadeInUp}
            >
              Explore Topics
            </motion.h3>

            <motion.div
              className="space-y-3"
              variants={staggerContainer}
            >
              {insightsData.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-5 rounded-xl group transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-white shadow-lg border-l-4 border-red-600'
                      : 'bg-white hover:bg-gray-50 border-l-4 border-transparent hover:shadow-md'
                  }`}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start gap-4">
                    {/* Image Thumbnail */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                            activeIndex === index ? 'text-red-600' : 'text-gray-500'
                          }`}
                        >
                          {item.category}
                        </span>

                        <motion.div
                          animate={{
                            rotate: activeIndex === index ? 90 : 0,
                            color: activeIndex === index ? '#dc2626' : '#9ca3af'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRightIcon className="w-4 h-4" />
                        </motion.div>
                      </div>

                      <h4
                        className={`font-semibold text-base mb-1 transition-colors duration-300 ${
                          activeIndex === index ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                        }`}
                      >
                        {item.title}
                      </h4>

                      <p
                        className={`text-sm transition-colors duration-300 ${
                          activeIndex === index ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-600'
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content Area */}
          <motion.div
            className="lg:col-span-3"
            variants={slideInRight}
          >
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Header with Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    className="h-72 relative overflow-hidden"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.img
                      src={insightsData[activeIndex].image}
                      alt={insightsData[activeIndex].title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
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
                      <div className="text-center text-white">
                        <h2 className="text-3xl font-bold mb-2">
                          {insightsData[activeIndex].category}
                        </h2>
                        <p className="text-lg opacity-90">
                          Featured Content
                        </p>
                      </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <motion.div
                      className="absolute top-6 left-6"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="px-3 py-1 bg-white/90 text-gray-800 text-sm font-medium rounded-full">
                        {insightsData[activeIndex].category}
                      </span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${activeIndex}`}
                    className="p-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">
                        {insightsData[activeIndex].title}
                      </h3>

                      <h4 className="text-xl font-semibold text-red-600 mb-4">
                        {insightsData[activeIndex].subtitle}
                      </h4>

                      <p className="text-base text-gray-600 leading-relaxed mb-6">
                        {insightsData[activeIndex].description}
                      </p>

                      {/* Long Description Preview */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                          {insightsData[activeIndex].longDescription.substring(0, 200)}...
                        </p>
                        <p className="text-xs text-red-600 mt-2 font-medium">
                          Click download to read the full article
                        </p>
                      </div>
                    </div>

                    {/* Download Button */}
                    <div className="flex justify-center">
                      <motion.button
                        onClick={() => handleDownload(insightsData[activeIndex])}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 relative overflow-hidden group"
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 8px 20px rgba(220, 38, 38, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">Download PDF</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 gap-2">
                {insightsData.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'bg-red-600'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mb-20"
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by <span className="text-red-600">Millions</span> Worldwide
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our global impact speaks for itself through innovation, reach, and trusted partnerships
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "500M+", label: "Connected Devices", description: "Devices worldwide" },
                { number: "180+", label: "Countries Served", description: "Global presence" },
                { number: "25+", label: "Years Innovation", description: "Industry experience" },
                { number: "40+", label: "R&D Centers", description: "Research facilities" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={scaleUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <h4 className="text-base font-semibold text-gray-700 mb-1">{stat.label}</h4>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievement Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {[
              { title: "Industry Leadership", description: "Leading security technology provider globally", metric: "#1" },
              { title: "Innovation Awards", description: "Recognition for cutting-edge solutions", metric: "50+" },
              { title: "Customer Satisfaction", description: "Trusted by enterprises worldwide", metric: "98%" }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                variants={scaleUp}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {achievement.metric}
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="bg-gradient-to-br from-gray-900 via-red-900 to-gray-800 rounded-2xl overflow-hidden relative">
            {/* Background animation */}
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative px-8 py-12 md:px-12 md:py-16">
              <div className="grid lg:grid-cols-2 gap-8 items-center">

                {/* Left Content */}
                <motion.div variants={slideInLeft}>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    Experience the Future of Security Technology
                  </h3>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    Join thousands of enterprises worldwide who trust Hikvision for their security needs.
                    Connect with our experts to explore tailored solutions for your organization.
                  </p>

                  {/* Action Button */}
                  <motion.button
                    onClick={handleTalkToExpert}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 15px 35px rgba(220, 38, 38, 0.4)"
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="relative z-10">Talk to Expert</span>
                    <ArrowRightIcon />
                    {/* Background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  </motion.button>

                  {/* Trust Indicators */}
                  <div className="flex items-center gap-6 mt-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span>Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      <span>No Commitment</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Content */}
                <motion.div
                  className="relative"
                  variants={slideInRight}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h4 className="text-xl font-semibold text-white mb-4">
                      What You'll Get:
                    </h4>
                    <div className="space-y-3">
                      {[
                        { title: "Live Product Demo", desc: "See our solutions in action" },
                        { title: "Custom Solution Design", desc: "Tailored to your needs" },
                        { title: "ROI Analysis", desc: "Calculate your savings" },
                        { title: "Implementation Plan", desc: "Step-by-step roadmap" }
                      ].map((benefit, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {index + 1}
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">
                              {benefit.title}
                            </h5>
                            <p className="text-gray-400 text-xs">{benefit.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          ref={newsletterRef}
          className="max-w-2xl mx-auto bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-lg"
          initial="hidden"
          animate={newsletterInView ? "visible" : "hidden"}
          variants={scaleUp}
        >
          <div className="flex items-center justify-center mb-4">
            <EnvelopeIcon className="w-6 h-6 text-red-600" />
          </div>

          <h4 className="text-2xl font-bold text-gray-900 mb-3">
            Stay Updated with Latest Innovations
          </h4>

          <p className="text-gray-600 mb-6">
            Get exclusive insights, product updates, and industry trends delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />

            <motion.button
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 relative overflow-hidden group min-w-[120px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Subscribe</span>
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FeaturedInsights