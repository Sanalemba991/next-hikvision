'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Camera, 
  Users, 
  TrendingUp, 
  Eye, 
  Lock, 
  BarChart3, 
  Building, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight, 
  Play,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Activity,
  Zap,
  Target,
  UserCheck,
  Package,
  Phone,
  Info,
  Car,
  Navigation,
  Lightbulb,
  Wifi,
  Globe,
  Monitor,
  Database,
  Settings,
  ChevronRight,
  FileText,
  Download,
  ExternalLink,
  Truck,
  Plane,
  Ship,
  Train,
  Route
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransportationPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Refs for sections
  const overviewRef = useRef<HTMLElement>(null);
  const solutionsRef = useRef<HTMLElement>(null);

  // Intersection Observer hooks
  const { ref: bannerRef, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: solutionsInViewRef, inView: solutionsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Function to scroll to specific section
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    
    const sectionRefs = {
      overview: overviewRef,
      solutions: solutionsRef
    };
    
    const targetRef = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (targetRef && targetRef.current) {
      // Offset for sticky nav
      const navHeight = 80;
      const elementPosition = targetRef.current.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll spy for active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'overview', ref: overviewRef },
        { id: 'solutions', ref: solutionsRef }
      ];

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tab navigation data
  const tabData = [
    { id: 'overview', label: 'Overview', icon: Truck },
    { id: 'solutions', label: 'Solutions', icon: Settings }
  ];

  // Solutions by category
  const solutionCategories = [
    {
      title: 'Airport & Aviation Security',
      subtitle: 'Comprehensive Aviation Protection',
      description: 'Advanced security systems for airports, terminals, and aviation facilities with intelligent monitoring and access control.',
      solutions: [
        'Perimeter Intrusion Detection',
        'Passenger Screening Systems',
        'Baggage Handling Monitoring',
        'Runway Safety Solutions'
      ],
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Railway & Metro Systems',
      subtitle: 'Smart Transit Security',
      description: 'Intelligent monitoring solutions for train stations, platforms, and railway infrastructure to ensure passenger safety.',
      solutions: [
        'Platform Safety Monitoring',
        'Crowd Management Systems',
        'Track Intrusion Detection',
        'Emergency Response Integration'
      ],
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Port & Maritime Security',
      subtitle: 'Comprehensive Port Protection',
      description: 'Advanced surveillance and security systems for ports, harbors, and maritime facilities with 24/7 monitoring capabilities.',
      solutions: [
        'Port Perimeter Security',
        'Cargo Monitoring Systems',
        'Vessel Traffic Management',
        'Maritime Threat Detection'
      ],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Highway & Traffic Management',
      subtitle: 'Intelligent Traffic Solutions',
      description: 'Smart traffic monitoring and management systems for highways, intersections, and urban transportation networks.',
      solutions: [
        'Traffic Flow Analytics',
        'Incident Detection Systems',
        'License Plate Recognition',
        'Speed Enforcement Solutions'
      ],
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Mobile Optimized */}
      <motion.section
        ref={bannerRef}
        className="relative py-8 md:py-12 lg:py-20 bg-gradient-to-br from-gray-900 via-red-900 to-gray-800 overflow-hidden"
        initial="hidden"
        animate={bannerInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated background elements - Hidden on mobile */}
        <motion.div 
          className="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 md:w-72 md:h-72 bg-red-600/10 rounded-full blur-3xl hidden md:block"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-48 h-48 md:w-96 md:h-96 bg-blue-600/10 rounded-full blur-3xl hidden md:block"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <motion.div className="space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden" variants={staggerContainer}>
              <motion.div variants={fadeInUp}>
                <motion.div 
                  className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full text-red-300 text-xs md:text-sm font-medium mb-4 md:mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Truck className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  Transportation Solutions
                </motion.div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 md:mb-4 lg:mb-6">
              Transportation Security
                </h1>
                <p className="text-sm md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                 Hikvision's transportation solutions protect airports, railways, ports, and highways with smart monitoring and traffic management.
                </p>
              </motion.div>

              <motion.div className="flex flex-col sm:flex-row gap-3 md:gap-4" variants={fadeInUp}>
                <motion.button
                  className="px-4 py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
                  onClick={() => scrollToSection('overview')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Solutions
                </motion.button>
                <motion.button
                  className="px-4 py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm md:text-base"
                  onClick={() => setIsVideoPlaying(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 inline mr-1.5 md:mr-2" />
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative overflow-hidden"
              variants={slideInRight}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Transportation Security Technology"
                className="w-full h-48 md:h-64 lg:h-80 xl:h-96 object-cover rounded-xl md:rounded-2xl shadow-2xl"
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Navigation Tabs - Mobile Optimized */}
      <motion.section 
        className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/95 overflow-hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <nav className="flex space-x-4 md:space-x-8 overflow-x-auto">
            {tabData.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`flex items-center px-4 py-3 md:px-6 md:py-4 border-b-2 font-medium text-xs md:text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
                  {tab.label}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </motion.section>

      {/* Overview Section - Mobile Optimized */}
      <section ref={overviewRef} className="py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Key Benefits */}
          <motion.div 
            ref={benefitsRef}
            className="bg-gradient-to-r from-red-50 to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 overflow-hidden"
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <motion.div className="text-center mb-6 md:mb-8" variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
                Why Choose Hikvision Transportation Solutions?
              </h2>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 overflow-hidden"
              variants={staggerContainer}
            >
              {[
                {
                  icon: TrendingUp,
                  title: "Traffic Efficiency",
                  description: "75% improvement in traffic flow and 60% reduction in response times",
                  color: "bg-red-600"
                },
                {
                  icon: Shield,
                  title: "Security Excellence",
                  description: "Multi-layered security with real-time threat detection and response",
                  color: "bg-gray-600"
                },
                {
                  icon: Route,
                  title: "Smart Analytics",
                  description: "AI-powered insights for predictive maintenance and operational optimization",
                  color: "bg-red-600"
                }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div 
                    key={index}
                    className="text-center overflow-hidden"
                    variants={scaleUp}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 md:w-16 md:h-16 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5 md:mb-2">{benefit.title}</h3>
                    <p className="text-sm md:text-base text-gray-600">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section - Mobile Optimized */}
      <section ref={solutionsRef} className="py-8 md:py-12 lg:py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <motion.div
            ref={solutionsInViewRef}
            initial="hidden"
            animate={solutionsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="overflow-hidden"
          >
            <motion.div className="text-center mb-8 md:mb-12 overflow-hidden" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Transportation Solutions</h2>
              <p className="text-lg md:text-xl text-gray-600">Comprehensive security and management solutions for all transportation sectors</p>
            </motion.div>

            <div className="space-y-8 md:space-y-12 lg:space-y-16 overflow-hidden">
              {solutionCategories.map((category, index) => (
                <motion.div 
                  key={index} 
                  className={`grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center overflow-hidden ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div 
                    className={`space-y-4 md:space-y-6 overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                    variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  >
                    <div className="overflow-hidden">
                      <motion.p 
                        className="text-xs md:text-sm font-medium text-red-600 uppercase tracking-wide mb-1.5 md:mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {category.subtitle}
                      </motion.p>
                      <motion.h3 
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {category.title}
                      </motion.h3>
                      <motion.p 
                        className="text-sm md:text-base lg:text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {category.description}
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      className="space-y-2 md:space-y-3 overflow-hidden"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {category.solutions.map((solution, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-center overflow-hidden"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                        >
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 mr-2 md:mr-3 flex-shrink-0" />
                          <span className="text-sm md:text-base text-gray-700">{solution}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className={`overflow-hidden ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                    variants={index % 2 === 0 ? slideInRight : slideInLeft}
                  >
                    <motion.img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-xl md:rounded-2xl shadow-2xl"
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal - Mobile Optimized */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              className="relative max-w-4xl w-full aspect-video bg-black rounded-lg md:rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white z-10 text-lg md:text-xl"
                onClick={() => setIsVideoPlaying(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
              <iframe
                src="https://www.youtube.com/embed/Q_p3pka81uc?autoplay=1"
                className="w-full h-full"
                allowFullScreen
                title="Hikvision Transportation Solutions Demo"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransportationPage;