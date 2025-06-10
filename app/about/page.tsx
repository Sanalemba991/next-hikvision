"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Users, Globe, Award, Eye, Target, Zap, Building, Camera, Monitor, Server } from 'lucide-react';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState('mission');

  useEffect(() => {
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

    return () => observer.disconnect();
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

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Hero Section */}
      <section className="relative overflow-hidden text-white min-h-screen flex items-center" style={{ 
        backgroundImage: "url('https://www.f6s.com/content-resource/media/5551605_6553c4e253a0d69874dbf750d0371658ede130ca.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 z-10">
          <div 
            id="hero"
            data-animate
            className={`text-center transform transition-all duration-1000 ${
              isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90 mb-8">
                Security Excellence Since 2003
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light mb-6 text-white leading-tight">
              About
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 ml-4">
                HIK
              </span>
              VISION

              <span className="  bg-clip-text  ml-4">UAE</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Leading the future of intelligent security solutions across the UAE and Middle East region with cutting-edge technology and unparalleled expertise.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105">
                Our Solutions
              </button>
              <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-lg">
                Contact Us
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            id="stats"
            data-animate
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-200 ${
              isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl mb-4 group-hover:shadow-xl transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div 
              id="overview"
              data-animate
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible.overview ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-sm font-medium rounded-full border border-red-200">
                  About Our Company
                </span>
              </div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6 leading-tight">
                Pioneering Security Excellence
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Hikvision UAE stands as the premier provider of intelligent security solutions, 
                combining cutting-edge technology with unparalleled expertise to deliver 
                comprehensive protection for businesses and communities across the region.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our commitment to innovation and quality has established us as the trusted 
                partner for governments, enterprises, and organizations seeking advanced 
                security infrastructure that adapts to evolving threats and challenges.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border">AI-Powered Solutions</span>
                <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border">24/7 Support</span>
                <span className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">Enterprise Grade</span>
              </div>
            </div>
            
            <div 
              id="overview-visual"
              data-animate
              className={`transform transition-all duration-1000 delay-500 ${
                isVisible['overview-visual'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-red-700/90 to-red-900/95 backdrop-blur-sm rounded-2xl p-8 text-white shadow-2xl border border-red-600/20">
                  <h3 className="text-2xl font-bold mb-6 text-white">Our Expertise</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center group">
                      <div className="w-2 h-2 bg-white/80 rounded-full mr-4 group-hover:scale-150 transition-transform"></div>
                      <span className="group-hover:text-red-100 transition-colors">Video Surveillance Systems</span>
                    </li>
                    <li className="flex items-center group">
                      <div className="w-2 h-2 bg-white/60 rounded-full mr-4 group-hover:scale-150 transition-transform"></div>
                      <span className="group-hover:text-red-200 transition-colors">Access Control Solutions</span>
                    </li>
                    <li className="flex items-center group">
                      <div className="w-2 h-2 bg-white/80 rounded-full mr-4 group-hover:scale-150 transition-transform"></div>
                      <span className="group-hover:text-red-100 transition-colors">AI Analytics & Intelligence</span>
                    </li>
                    <li className="flex items-center group">
                      <div className="w-2 h-2 bg-white/60 rounded-full mr-4 group-hover:scale-150 transition-transform"></div>
                      <span className="group-hover:text-red-200 transition-colors">Integrated Security Platforms</span>
                    </li>
                  </ul>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-20 bg-gradient-to-b from-slate-50/80 to-white/90 backdrop-blur-sm relative">
        {/* Subtle professional overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 via-white/20 to-red-50/30"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div 
            id="values-header"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['values-header'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-red-100/80 backdrop-blur-sm text-red-700 text-sm font-semibold rounded-full mb-4 border border-red-200/60 shadow-sm">
              Our Foundation
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">Vision, Mission & Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Built on principles of excellence, innovation, and unwavering commitment to security
            </p>
          </div>

          <div 
            id="values-tabs"
            data-animate
            className={`transform transition-all duration-1000 delay-200 ${
              isVisible['values-tabs'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex justify-center mb-16">
              <div className="flex bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 p-2">
                {values.map((value, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(value.title.toLowerCase())}
                    className={`px-10 py-5 rounded-xl transition-all duration-300 font-semibold text-base ${
                      activeTab === value.title.toLowerCase()
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/80'
                    }`}
                  >
                    {value.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    activeTab === value.title.toLowerCase() 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 absolute translate-y-8 pointer-events-none'
                  }`}
                >
                  <div className="bg-white/95 backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl border border-gray-200/30 hover:shadow-3xl transition-all duration-500">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-8 shadow-xl">
                      <value.icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold text-slate-800 mb-8 leading-tight">{value.title}</h3>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">{value.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products & Solutions */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            id="products-header"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['products-header'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-sm font-medium rounded-full mb-4 border border-red-200">
              Our Solutions
            </span>
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Comprehensive Security Products</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Advanced security solutions designed for the modern world
            </p>
          </div>

          <div 
            id="products-grid"
            data-animate
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transform transition-all duration-1000 delay-300 ${
              isVisible['products-grid'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {products.map((product, index) => (
              <div key={index} className="group">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <product.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">{product.name}</h3>
                  <p className="text-slate-600 leading-relaxed">{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay with blur effect */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        {/* Professional pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div 
            id="cta"
            data-animate
            className={`transform transition-all duration-1000 ${
              isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
              Ready to Secure Your Future?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow">
              Partner with Hikvision UAE for industry-leading security solutions tailored to your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/95 backdrop-blur-sm text-red-700 px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg border border-white/30">
                Contact Our Experts
              </button>
              <button className="bg-red-600/20 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-500/30 hover:border-white/60 transition-all duration-300 hover:scale-105">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;