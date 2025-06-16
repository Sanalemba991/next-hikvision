"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Globe, Award, Eye, Target, Zap, Building, Camera, Monitor, Server } from 'lucide-react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState('mission');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile or tablet
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Only add intersection observer for desktop
    if (window.innerWidth >= 1024) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({
                ...prev,
                [entry.target.id]: true
              }));
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('[data-animate]').forEach((el) => {
        observer.observe(el);
      });

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', checkDevice);
      };
    } else {
      // For mobile/tablet, set all animations as visible immediately
      setIsVisible({
        hero: true,
        stats: true,
        overview: true,
        'overview-visual': true,
        'values-header': true,
        'values-tabs': true,
        'products-header': true,
        'products-grid': true,
        cta: true
      });
    }

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const stats = [
    { icon: Shield, number: "20+", text: "Years of Excellence" },
    { icon: Users, number: "500+", text: "Projects Delivered" },
    { icon: Globe, number: "50+", text: "Countries Served" },
    { icon: Award, number: "#1", text: "Security Solutions" }
  ];

  const products = [
    { icon: Camera, name: "IP Cameras", desc: "Advanced surveillance cameras with AI capabilities" },
    { icon: Monitor, name: "NVR Systems", desc: "Network video recorders for comprehensive monitoring" },
    { icon: Server, name: "Storage Solutions", desc: "Scalable storage systems for video data" },
    { icon: Building, name: "Access Control", desc: "Smart access control and management systems" }
  ];

  const values = [
    { icon: Eye, title: "Vision", content: "To be the leading provider of intelligent security solutions in the UAE and Middle East region." },
    { icon: Target, title: "Mission", content: "Delivering cutting-edge security technology that protects what matters most to our clients." },
    { icon: Zap, title: "Innovation", content: "Continuously advancing security technology through research, development, and strategic partnerships." }
  ];

  // Mobile/Tablet Framer Motion Variants
  const mobileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const mobileStaggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileSlideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const mobileCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const mobileButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const mobileTabVariants = {
    inactive: {
      scale: 1,
      opacity: 0.8
    },
    active: {
      scale: 1.05,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Animation classes - different for mobile/tablet vs desktop
  const getAnimationClass = (elementId: string, defaultClass: string = '') => {
    if (isMobile) {
      return 'opacity-100 translate-y-0 translate-x-0'; // Static positioning for mobile/tablet
    }
    return `transform transition-all duration-1000 ${defaultClass} ${
      isVisible[elementId] ? 'translate-y-0 opacity-100 translate-x-0' : 'translate-y-10 opacity-0'
    }`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Hero Section */}
      <section 
        className="relative overflow-hidden text-white h-[85vh] md:h-[75vh] lg:min-h-screen flex items-center" 
        style={{
          backgroundImage: "url('https://www.f6s.com/content-resource/media/5551605_6553c4e253a0d69874dbf750d0371658ede130ca.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: isMobile ? "scroll" : "fixed"
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Subtle Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 xl:py-24 z-10">
          {isMobile ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={mobileStaggerContainer}
              className="text-center"
            >
              <motion.div variants={mobileVariants} className="mb-3 sm:mb-4">
                <motion.span
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs sm:text-sm font-medium text-white/90 mb-4 sm:mb-6 transition-all duration-300 ease-out hover:bg-white/20 hover:border-white/30 hover:shadow-lg"
                >
                  Security Excellence Since 2003
                </motion.span>
              </motion.div>

              <motion.h1
                variants={mobileSlideUp}
                className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4 text-white leading-tight"
              >
                About
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 ml-2 sm:ml-3">
                  HIK
                </span>
                VISION
                <span className="bg-clip-text ml-2 sm:ml-3">UAE</span>
              </motion.h1>

              <motion.p
                variants={mobileVariants}
                className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed font-light px-4 sm:px-0 mb-6 sm:mb-8"
              >
                Leading the future of intelligent security solutions across the UAE and Middle East region with cutting-edge technology and unparalleled expertise.
              </motion.p>

              <motion.div
                variants={mobileStaggerContainer}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
              >
                <motion.button
                  variants={mobileButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ease-out hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10"
                >
                  Our Solutions
                </motion.button>
                <motion.button
                  variants={mobileButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium shadow-lg text-sm sm:text-base transition-all duration-300 ease-out hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/20"
                >
                  Contact Us
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <div
              id="hero"
              data-animate
              className={`text-center ${getAnimationClass('hero')}`}
            >
              <div className="mb-4 sm:mb-6">
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs sm:text-sm font-medium text-white/90 mb-6 sm:mb-8 transition-all duration-300 ease-out hover:bg-white/20 hover:border-white/30 hover:shadow-lg cursor-pointer">
                  Security Excellence Since 2003
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-4 sm:mb-6 text-white leading-tight">
                About
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 ml-2 sm:ml-4">
                  HIK
                </span>
                VISION
                <span className="bg-clip-text ml-2 sm:ml-4">UAE</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light px-4 sm:px-0">
                Leading the future of intelligent security solutions across the UAE and Middle East region with cutting-edge technology and unparalleled expertise.
              </p>

              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
                <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ease-out hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10 hover:scale-105 active:scale-95">
                  Our Solutions
                </button>
                <button className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium shadow-lg text-sm sm:text-base transition-all duration-300 ease-out hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/20 hover:scale-105 active:scale-95">
                  Contact Us
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce hidden lg:block">
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-12 lg:py-16 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {isMobile ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={mobileStaggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={mobileCardVariants}
                  whileTap="tap"
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="text-center rounded-lg p-2 transition-all duration-300 ease-out hover:bg-gray-50/50"
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mb-2 sm:mb-3 shadow-md transition-all duration-300 ease-out"
                  >
                    <stat.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </motion.div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 mb-1 transition-colors duration-300">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">{stat.text}</div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div
              id="stats"
              data-animate
              className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 ${getAnimationClass('stats', 'delay-200')}`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center group rounded-lg p-2 transition-all duration-300 ease-out cursor-pointer hover:bg-gray-50/50 hover:-translate-y-1 hover:scale-105">
                  <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mb-2 sm:mb-3 shadow-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg">
                    <stat.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 mb-1 transition-colors duration-300 group-hover:text-red-600">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium transition-colors duration-300 group-hover:text-slate-700">{stat.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {isMobile ? (
              <>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={mobileSlideUp}
                >
                  <div className="mb-3 sm:mb-4">
                    <motion.span
                      whileTap={{ scale: 0.95 }}
                      className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs sm:text-sm font-medium rounded-full border border-red-200 transition-all duration-300 ease-out hover:bg-red-100 hover:border-red-300"
                    >
                      About Our Company
                    </motion.span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight">
                    Pioneering Security Excellence
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                    Hikvision UAE stands as the premier provider of intelligent security solutions,
                    combining cutting-edge technology with unparalleled expertise to deliver
                    comprehensive protection for businesses and communities across the region.
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed">
                    Our commitment to innovation and quality has established us as the trusted
                    partner for governments, enterprises, and organizations seeking advanced
                    security infrastructure that adapts to evolving threats and challenges.
                  </p>
                  <motion.div
                    variants={mobileStaggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2 sm:gap-3"
                  >
                    <motion.span variants={mobileCardVariants} whileTap="tap" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 text-slate-700 rounded-lg text-xs sm:text-sm font-medium border transition-all duration-300 ease-out hover:bg-slate-200 hover:border-slate-300">AI-Powered Solutions</motion.span>
                    <motion.span variants={mobileCardVariants} whileTap="tap" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 text-slate-700 rounded-lg text-xs sm:text-sm font-medium border transition-all duration-300 ease-out hover:bg-slate-200 hover:border-slate-300">24/7 Support</motion.span>
                    <motion.span variants={mobileCardVariants} whileTap="tap" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 text-red-700 rounded-lg text-xs sm:text-sm font-medium border border-red-200 transition-all duration-300 ease-out hover:bg-red-100 hover:border-red-300">Enterprise Grade</motion.span>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={mobileSlideUp}
                  className="relative"
                >
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-br from-red-700/90 to-red-900/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-red-600/20 transition-all duration-300 ease-out hover:shadow-3xl hover:from-red-800/90 hover:to-red-950/95"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Our Expertise</h3>
                    <motion.ul variants={mobileStaggerContainer} className="space-y-3 sm:space-y-4">
                      <motion.li variants={mobileVariants} whileTap={{ scale: 0.98 }} className="flex items-center rounded-lg p-1 transition-all duration-300 ease-out hover:bg-white/5">
                        <div className="w-2 h-2 bg-white/80 rounded-full mr-3 sm:mr-4"></div>
                        <span className="text-sm sm:text-base">Video Surveillance Systems</span>
                      </motion.li>
                      <motion.li variants={mobileVariants} whileTap={{ scale: 0.98 }} className="flex items-center rounded-lg p-1 transition-all duration-300 ease-out hover:bg-white/5">
                        <div className="w-2 h-2 bg-white/60 rounded-full mr-3 sm:mr-4"></div>
                        <span className="text-sm sm:text-base">Access Control Solutions</span>
                      </motion.li>
                      <motion.li variants={mobileVariants} whileTap={{ scale: 0.98 }} className="flex items-center rounded-lg p-1 transition-all duration-300 ease-out hover:bg-white/5">
                        <div className="w-2 h-2 bg-white/80 rounded-full mr-3 sm:mr-4"></div>
                        <span className="text-sm sm:text-base">AI Analytics & Intelligence</span>
                      </motion.li>
                      <motion.li variants={mobileVariants} whileTap={{ scale: 0.98 }} className="flex items-center rounded-lg p-1 transition-all duration-300 ease-out hover:bg-white/5">
                        <div className="w-2 h-2 bg-white/60 rounded-full mr-3 sm:mr-4"></div>
                        <span className="text-sm sm:text-base">Integrated Security Platforms</span>
                      </motion.li>
                    </motion.ul>
                  </motion.div>
                  <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-full blur-xl z-0"></div>
                </motion.div>
              </>
            ) : (
              <>
                <div
                  id="overview"
                  data-animate
                  className={getAnimationClass('overview', 'delay-300 lg:-translate-x-10')}
                >
                  <div className="mb-3 sm:mb-4">
                    <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs sm:text-sm font-medium rounded-full border border-red-200 transition-all duration-300 ease-out hover:bg-red-100 hover:border-red-300 cursor-pointer">
                      About Our Company
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight">
                    Pioneering Security Excellence
                  </h2>
                  <p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                    Hikvision UAE stands as the premier provider of intelligent security solutions,
                    combining cutting-edge technology with unparalleled expertise to deliver
                    comprehensive protection for businesses and communities across the region.
                  </p>
                  <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed">
                    Our commitment to innovation and quality has established us as the trusted
                    partner for governments, enterprises, and organizations seeking advanced
                    security infrastructure that adapts to evolving threats and challenges.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 text-slate-700 rounded-lg text-xs sm:text-sm font-medium border transition-all duration-300 ease-out hover:bg-slate-200 hover:border-slate-300 hover:scale-105 cursor-pointer">AI-Powered Solutions</span>
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 text-slate-700 rounded-lg text-xs sm:text-sm font-medium border transition-all duration-300 ease-out hover:bg-slate-200 hover:border-slate-300 hover:scale-105 cursor-pointer">24/7 Support</span>
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-50 text-red-700 rounded-lg text-xs sm:text-sm font-medium border border-red-200 transition-all duration-300 ease-out hover:bg-red-100 hover:border-red-300 hover:scale-105 cursor-pointer">Enterprise Grade</span>
                  </div>
                </div>

                <div
                  id="overview-visual"
                  data-animate
                  className={getAnimationClass('overview-visual', 'delay-500 lg:translate-x-10')}
                >
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-red-700/90 to-red-900/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-red-600/20 transition-all duration-300 ease-out hover:shadow-3xl cursor-pointer">
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Our Expertise</h3>
                      <ul className="space-y-3 sm:space-y-4">
                        <li className="flex items-center group rounded-lg p-1 transition-all duration-300 ease-out hover:bg-white/5 cursor-pointer">
                          <div className="w-2 h-2 bg-white/80 rounded-full mr-3 sm:mr-4 transition-all duration-300 ease-out group-hover:scale-150"></div>
                          <span className="text-sm sm:text-base transition-colors duration-300 group-hover:text-red-100">Video Surveillance Systems</span>
                        </li>
                        <li className="flex items-center group rounded-lg p-1 transition-all duration-300 ease-out hover:bg-white/5 cursor-pointer">
                          <div className="w-2 h-2 bg-white/60 rounded-full mr-3 sm:mr-4 transition-all duration-300 ease-out group-hover:scale-150"></div>
                          <span className="text-sm sm:text-base transition-colors duration-300 group-hover:text-red-200">Access Control Solutions</span>
                        </li>
                        <li className="flex items-center group rounded-lg p-1 transition-all duration-300 ease-out hover:bg-white/5 cursor-pointer">
                          <div className="w-2 h-2 bg-white/80 rounded-full mr-3 sm:mr-4 transition-all duration-300 ease-out group-hover:scale-150"></div>
                          <span className="text-sm sm:text-base transition-colors duration-300 group-hover:text-red-100">AI Analytics & Intelligence</span>
                        </li>
                        <li className="flex items-center group rounded-lg p-1 transition-all duration-300 ease-out hover:bg-white/5 cursor-pointer">
                          <div className="w-2 h-2 bg-white/60 rounded-full mr-3 sm:mr-4 transition-all duration-300 ease-out group-hover:scale-150"></div>
                          <span className="text-sm sm:text-base transition-colors duration-300 group-hover:text-red-200">Integrated Security Platforms</span>
                        </li>
                      </ul>
                    </div>
                    <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-full blur-xl z-0"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values - Professional & Compact */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50/80 to-white/90 backdrop-blur-sm relative">
        {/* Subtle professional overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 via-white/20 to-red-50/30"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {isMobile ? (
            <>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={mobileSlideUp}
                className="text-center mb-8 sm:mb-12"
              >
                <motion.span
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-4 py-2 bg-red-50/80 backdrop-blur-sm text-red-700 text-sm font-semibold rounded-full mb-4 border border-red-200/60 shadow-sm transition-all duration-300 ease-out hover:bg-red-100/80 hover:border-red-300/60"
                >
                  Our Foundation
                </motion.span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight">Vision, Mission & Values</h2>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Built on principles of excellence, innovation, and unwavering commitment to security
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={mobileStaggerContainer}
              >
                <motion.div variants={mobileVariants} className="flex justify-center mb-8">
                  <div className="flex flex-col sm:flex-row bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/50 p-1">
                    {values.map((value, index) => (
                      <motion.button
                        key={index}
                        variants={mobileTabVariants}
                        initial="inactive"
                        animate={activeTab === value.title.toLowerCase() ? "active" : "inactive"}
                        whileTap="tap"
                        onClick={() => setActiveTab(value.title.toLowerCase())}
                        className={`px-6 py-3 rounded-lg font-semibold text-sm mb-1 sm:mb-0 transition-all duration-300 ease-out ${
                          activeTab === value.title.toLowerCase()
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                            : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80'
                        }`}
                      >
                        {value.title}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        activeTab === value.title.toLowerCase()
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20, position: 'absolute', pointerEvents: 'none' }
                      }
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/95 backdrop-blur-md rounded-xl p-6 sm:p-8 text-center shadow-xl border border-gray-200/30 transition-all duration-300 ease-out hover:shadow-2xl"
                      >
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl mb-6 shadow-lg transition-all duration-300 ease-out hover:from-red-600 hover:to-red-700 hover:shadow-xl"
                        >
                          <value.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 leading-tight">{value.title}</h3>
                        <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">{value.content}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            <>
              <div
                id="values-header"
                data-animate
                className={`text-center mb-12 ${getAnimationClass('values-header')}`}
              >
                <span className="inline-block px-4 py-2 bg-red-50/80 backdrop-blur-sm text-red-700 text-sm font-semibold rounded-full mb-4 border border-red-200/60 shadow-sm transition-all duration-300 ease-out hover:bg-red-100/80 hover:border-red-300/60 cursor-pointer">
                  Our Foundation
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight">Vision, Mission & Values</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Built on principles of excellence, innovation, and unwavering commitment to security
                </p>
              </div>

              <div
                id="values-tabs"
                data-animate
                className={getAnimationClass('values-tabs', 'delay-200')}
              >
                <div className="flex justify-center mb-10">
                  <div className="flex bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/50 p-1">
                    {values.map((value, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(value.title.toLowerCase())}
                        className={`px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 ease-out ${
                          activeTab === value.title.toLowerCase()
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md transform scale-105'
                            : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80'
                        }`}
                      >
                        {value.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="max-w-4xl mx-auto">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-300 ease-out ${
                        activeTab === value.title.toLowerCase()
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 absolute translate-y-4 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 lg:p-10 text-center shadow-xl border border-gray-200/30 transition-all duration-300 ease-out hover:shadow-2xl cursor-pointer">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-xl mb-6 shadow-lg transition-all duration-300 ease-out hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:scale-110">
                          <value.icon className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-6 leading-tight">{value.title}</h3>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">{value.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Products & Solutions */}
      <section className="py-10 sm:py-12 lg:py-16 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {isMobile ? (
            <>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={mobileSlideUp}
                className="text-center mb-8 sm:mb-10"
              >
                <motion.span
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs sm:text-sm font-medium rounded-full mb-3 border border-red-200 transition-all duration-300 ease-out"
                >
                  Our Solutions
                </motion.span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-slate-800">Comprehensive Security Products</h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Advanced security solutions designed for the modern world
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={mobileStaggerContainer}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
              >
                {products.map((product, index) => (
                  <motion.div key={index} variants={mobileCardVariants} className="group">
                    <motion.div
                      whileTap="tap"
                      className="bg-white/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center border border-gray-200/50 transition-all duration-300 ease-out"
                    >
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mb-2 sm:mb-3 shadow-md transition-all duration-300 ease-out"
                      >
                        <product.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      </motion.div>
                      <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-slate-800">{product.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.desc}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <>
              <div
                id="products-header"
                data-animate
                className={`text-center mb-8 sm:mb-10 ${getAnimationClass('products-header')}`}
              >
                <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs sm:text-sm font-medium rounded-full mb-3 border border-red-200 transition-all duration-300 ease-out cursor-pointer">
                  Our Solutions
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-slate-800">Comprehensive Security Products</h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Advanced security solutions designed for the modern world
                </p>
              </div>

              <div
                id="products-grid"
                data-animate
                className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 ${getAnimationClass('products-grid', 'delay-300')}`}
              >
                {products.map((product, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center border border-gray-200/50 transition-all duration-300 ease-out">
                      <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mb-2 sm:mb-3 shadow-md transition-all duration-300 ease-out group-hover:from-red-600 group-hover:to-red-700 group-hover:shadow-xl group-hover:scale-110 active:scale-95">
                        <product.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-slate-800">{product.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-12 sm:py-16 lg:py-20 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: isMobile ? "scroll" : "fixed"
        }}
      >
        {/* Dark overlay with blur effect */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Professional pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        ></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {isMobile ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={mobileStaggerContainer}
            >
              <motion.h2 variants={mobileSlideUp} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
                Ready to Secure Your Future?
              </motion.h2>
              <motion.p variants={mobileVariants} className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed drop-shadow">
                Partner with Hikvision UAE for industry-leading security solutions tailored to your needs
              </motion.p>
              <motion.div variants={mobileStaggerContainer} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.button
                  variants={mobileButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full sm:w-auto bg-white/95 backdrop-blur-sm text-red-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-lg border border-white/30 text-sm sm:text-base transition-all duration-300 ease-out hover:bg-white hover:shadow-xl hover:border-white/50"
                >
                  Contact Our Experts
                </motion.button>
                <motion.button
                  variants={mobileButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full sm:w-auto bg-red-600/20 backdrop-blur-sm border-2 border-white/40 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ease-out hover:bg-red-500/30 hover:border-white/60"
                >
                  View Case Studies
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <div
              id="cta"
              data-animate
              className={getAnimationClass('cta')}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
                Ready to Secure Your Future?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed drop-shadow">
                Partner with Hikvision UAE for industry-leading security solutions tailored to your needs
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="w-full sm:w-auto bg-white/95 backdrop-blur-sm text-red-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-lg border border-white/30 text-sm sm:text-base transition-all duration-300 ease-out hover:bg-white hover:shadow-xl hover:border-white/50 hover:scale-105 active:scale-95">
                  Contact Our Experts
                </button>
                <button className="w-full sm:w-auto bg-red-600/20 backdrop-blur-sm border-2 border-white/40 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ease-out hover:bg-red-500/30 hover:border-white/60 hover:scale-105 active:scale-95">
                  View Case Studies
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;