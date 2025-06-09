'use client';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Shield, Camera, Zap, Users, Building, Car, Globe, ArrowRight, Play, Star, Eye, Lock, Cpu, Network, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SecuritySolutionsPage = () => {
  // Set 'smart-city' as the default active tab
  const [activeTab, setActiveTab] = useState('smart-city');

  // Intersection Observer for smooth fade-in
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: solutionsRef, inView: solutionsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Use real images and feature names as in your prompt
  const solutions = [
    {
      id: 1,
      category: 'smart-city',
      title: 'Smart City Solutions',
      description: 'Comprehensive urban security and traffic management systems with AI-powered analytics for safer, smarter cities.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Traffic Management', 'Public Safety Monitoring', 'Smart Lighting Control', 'Environmental Monitoring']
    },
    {
      id: 2,
      category: 'retail',
      title: 'Retail Security',
      description: 'Advanced retail analytics and loss prevention solutions designed for modern retail environments.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['People Counting Analytics', 'Customer Heat Mapping', 'Loss Prevention Systems', 'Queue Management']
    },
    {
      id: 3,
      category: 'industrial',
      title: 'Industrial Monitoring',
      description: 'Robust industrial surveillance and safety monitoring solutions for critical infrastructure protection.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Perimeter Security', 'Fire Detection Systems', 'Access Control Management', 'Equipment Monitoring']
    },
    {
      id: 4,
      category: 'healthcare',
      title: 'Healthcare Security',
      description: 'Specialized security solutions tailored for hospitals, clinics, and medical facilities.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Patient Safety Monitoring', 'Asset Tracking Systems', 'Restricted Access Control', 'Emergency Response']
    },
    {
      id: 5,
      category: 'education',
      title: 'Education Solutions',
      description: 'Campus security and smart learning environment management for educational institutions.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Campus Safety Systems', 'Attendance Tracking', 'Emergency Alert Systems', 'Visitor Management']
    },
    {
      id: 6,
      category: 'transportation',
      title: 'Transportation Security',
      description: 'Comprehensive security and management solutions for airports, railways, and transportation hubs.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Passenger Flow Management', 'Baggage Tracking', 'Security Screening', 'Emergency Management']
    }
  ];

  const categories = [
    { id: 'smart-city', name: 'Smart City', icon: Building },
    { id: 'retail', name: 'Retail', icon: Users },
    { id: 'industrial', name: 'Industrial', icon: Zap },
    { id: 'healthcare', name: 'Healthcare', icon: Shield },
    { id: 'education', name: 'Education', icon: Users },
    { id: 'transportation', name: 'Transportation', icon: Car }
  ];

  // Key features for the overview section
  const keyFeatures = [
    {
      icon: Eye,
      title: 'AI-Powered Surveillance',
      description: 'Advanced video analytics with intelligent object detection and behavioral analysis for proactive security monitoring.'
    },
    {
      icon: Lock,
      title: 'Access Control Systems',
      description: 'Multi-layered security with biometric authentication, smart cards, and mobile access solutions.'
    },
    {
      icon: Cpu,
      title: 'Smart Analytics',
      description: 'Real-time data processing and machine learning algorithms for predictive security insights.'
    },
    {
      icon: Network,
      title: 'Integrated Platform',
      description: 'Unified management system connecting all security components for centralized monitoring and control.'
    }
  ];

  const filteredSolutions = activeTab === 'all'
    ? solutions
    : solutions.filter(solution => solution.category === activeTab);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <motion.div
        className="relative h-screen bg-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Modern Security Operations Center"
            className="w-full h-full object-cover opacity-40"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Shield className="w-4 h-4 mr-2" />
                Next-Generation Security Solutions
              </motion.div>
              <motion.h1
                className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Intelligent Security
                <motion.span
                  className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  Infrastructure
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                Protecting what matters most with AI-powered surveillance, smart analytics,
                and comprehensive security solutions tailored for modern enterprises.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                
              </motion.div>
              {/* Stats Row */}
              <motion.div
                ref={statsRef}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left"
                initial="hidden"
                animate={statsInView ? "show" : "hidden"}
                variants={container}
              >
                {[
                  { value: "500K+", label: "Active Installations" },
                  { value: "99.9%", label: "System Reliability" },
                  { value: "24/7", label: "Expert Support" },
                  { value: "150+", label: "Countries Served" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="space-y-1"
                    variants={item}
                  >
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-8 right-8 hidden lg:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white max-w-sm">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium">System Status: Active</span>
            </div>
            <div className="text-xs text-gray-300">
              Real-time monitoring across all security infrastructure
            </div>
          </div>
        </motion.div>
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </motion.div>
      </motion.div>

      {/* Overview Section */}
      <motion.div
        className="bg-white py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Overview
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 mb-4 font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A rich portfolio of empowering and enabling solutions
          </motion.p>
          <motion.p
            className="text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Hikvision offers an abundance of solution options to facilitate the digital transformation process. These solutions enable intelligent operations in many sectors of society.
          </motion.p>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Beginning at video security and extending to AIoT-powered applications, our solutions are designed to provide comprehensive, end-to-end capabilities for diverse customers and industries, opening doors for new business opportunities, optimized operations, future-proof processes, and a winning edge in the competition.
          </motion.p>
        </div>
      </motion.div>

      {/* Key Features Section */}
      <motion.div
        ref={featuresRef}
        className="bg-gray-50 py-16"
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={slideUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Security Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive security platform combines innovative technology with proven reliability
              to deliver exceptional protection and peace of mind.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            animate={featuresInView ? "show" : "hidden"}
          >
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center transition-all duration-700 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:bg-white hover:shadow-xl rounded-lg p-4"
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-lg mb-4 transition-all duration-500 hover:bg-orange-500">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Solutions Section */}
      <motion.div
        ref={solutionsRef}
        className="bg-white py-16"
        initial="hidden"
        animate={solutionsInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={slideUp}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Solutions by Industry
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored to meet varied needs
            </p>
            <p className="text-gray-600 mt-4 max-w-4xl mx-auto">
              Covering a wide range of industries - from traffic to shipping, from retail to healthcare and beyond - our solutions are built on solid ground.
            </p>
          </motion.div>

          {/* Category Tabs */}
      <motion.div
  className="flex flex-wrap justify-center mb-12 gap-4"
  variants={container}
  initial="hidden"
  animate={solutionsInView ? "show" : "hidden"}
>
  {categories.map((category) => {
    const Icon = category.icon;
    return (
      <motion.button
        key={category.id}
        onClick={() => setActiveTab(category.id)}
        className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          activeTab === category.id
            ? 'bg-red-600 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
        style={{ 
          transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
          minWidth: '180px'
        }}
        variants={item}
        whileHover={{ 
          scale: 1.03,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span className="text-sm md:text-base">{category.name}</span>
      </motion.button>
    );
  })}
</motion.div>
          {/* Solutions Grid */}
          <AnimatePresence mode="wait">
            {filteredSolutions.length === 1 ? (
              <motion.div
                key={`single-${activeTab}`}
                className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 flex items-end shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={filteredSolutions[0].image}
                  alt={filteredSolutions[0].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gray-900/60" />
                <div className="relative z-10 p-10 text-white w-full flex flex-col justify-end">
                  <div className="flex items-center mb-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full mr-4">
                      {categories.find(cat => cat.id === filteredSolutions[0].category)?.name}
                    </span>
                    <h2 className="text-3xl font-bold">{filteredSolutions[0].title}</h2>
                  </div>
                  <p className="text-lg mb-4">{filteredSolutions[0].description}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {filteredSolutions[0].features.map((feature, idx) => (
                      <motion.span
                        key={idx}
                        className="inline-flex items-center px-4 py-1 bg-white/20 rounded-full text-white text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                  <button className="group relative inline-flex items-center px-10 py-4 bg-transparent text-grey-500 font-semibold rounded-xl border border-red-100 hover:border-transparent transition-all duration-500 ease-out shadow-[0_4px_20px_rgba(220,38,38,0.08)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-600 hover:text-white transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_10px_rgba(220,38,38,0.2)] backdrop-blur-sm overflow-hidden w-fit">

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                    <span className="relative z-10 tracking-wide">
                      Learn More
                    </span>

                    <ArrowRight className="relative z-10 w-5 h-5 ml-3 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110" />

                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-rose-600/0 group-hover:from-red-600/5 group-hover:to-rose-600/5 transition-all duration-500"></div>
                  </button>

                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`grid-${activeTab}`}
                className="grid md:grid-cols-2 gap-8"
                initial="hidden"
                animate="visible"
                variants={container}
              >
                {filteredSolutions.map((solution) => (
                  <motion.div
                    key={solution.id}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-200 hover:border-red-200"
                    variants={item}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative overflow-hidden h-64">
                      <motion.img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-700"></div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full transition-all duration-500 group-hover:bg-orange-500">
                          {categories.find(cat => cat.id === solution.category)?.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-500">
                        {solution.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {solution.description}
                      </p>
                      <div className="space-y-2 mb-6">
                        {solution.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <button className="group w-full inline-flex items-center justify-center px-6 py-3 bg-transparent text-gray-700 font-semibold rounded-lg relative overflow-hidden transition-all duration-300">
                        <span className="relative z-10 flex items-center">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        {/* Animated gradient background */}
                        <span
                          className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                          aria-hidden="true"
                        />
                      </button>

                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div
            ref={ctaRef}
            className="text-center mt-16"
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={slideUp}
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Security Infrastructure?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Connect with our security experts to design a customized solution that meets your specific requirements and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="inline-flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Get Free Consultation
                </motion.button>
               
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SecuritySolutionsPage;