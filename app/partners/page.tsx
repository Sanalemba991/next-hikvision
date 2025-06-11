'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown, FiMail, FiPhone, FiMapPin, FiExternalLink, FiUsers, FiGlobe, FiAward, FiTrendingUp } from "react-icons/fi";

const partnerTabs = [
  { id: "channel", label: "Channel Program" },
  { id: "technology", label: "Technology Program" },
];

const partnerTypes = [
  "All Partners",
  "System Integrators",
  "Distributors",
  "Solution Partners",
  "Training Partners"
];

const partnerRegions = [
  "All Regions",
  "Middle East",
  "North Africa",
  "UAE",
  "Saudi Arabia",
  "Egypt",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain"
];

const channelPartnersData = [
  {
    id: 1,
    name: "TechnoVision Systems",
    type: "System Integrators",
    region: "UAE",
    location: "Dubai, UAE",
    logo: "/partners/technovision-logo.png",
    description: "Leading system integrator specializing in comprehensive security solutions across the Middle East.",
    expertise: ["Video Surveillance", "Access Control", "Integrated Security"],
    certifications: ["Hikvision Certified", "Gold Partner"],
    website: "https://technovision.ae",
    email: "info@technovision.ae",
    phone: "+971 4 123 4567"
  },
  {
    id: 2,
    name: "SecureNet Middle East",
    type: "Distributors",
    region: "Middle East",
    location: "Riyadh, Saudi Arabia",
    logo: "/partners/securenet-logo.png",
    description: "Premier distributor of security technology solutions serving the GCC region.",
    expertise: ["Distribution", "Technical Support", "Training"],
    certifications: ["Authorized Distributor", "Platinum Partner"],
    website: "https://securenet-me.com",
    email: "partners@securenet-me.com",
    phone: "+966 11 234 5678"
  },
  {
    id: 3,
    name: "Gulf Security Technologies",
    type: "Solution Partners",
    region: "Qatar",
    location: "Doha, Qatar",
    logo: "/partners/gst-logo.png",
    description: "Trusted channel partner delivering end-to-end security solutions for enterprise clients.",
    expertise: ["Enterprise Solutions", "Consultation", "Maintenance"],
    certifications: ["Certified Partner", "Gold Status"],
    website: "https://gulfsectech.qa",
    email: "contact@gulfsectech.qa",
    phone: "+974 4 456 7890"
  }
];

const technologyPartnersData = [
  {
    id: 1,
    name: "Digital Guard Solutions",
    type: "AI Technology",
    region: "Egypt",
    location: "Cairo, Egypt",
    logo: "/partners/digitalguard-logo.png",
    description: "Innovative technology partner developing AI-powered security analytics solutions.",
    expertise: ["AI Analytics", "Software Development", "Cloud Solutions"],
    certifications: ["Technology Partner", "Innovation Award"],
    website: "https://digitalguard.com.eg",
    email: "tech@digitalguard.com.eg",
    phone: "+20 2 345 6789"
  },
  {
    id: 2,
    name: "Smart Systems Kuwait",
    type: "IoT Integration",
    region: "Kuwait",
    location: "Kuwait City, Kuwait",
    logo: "/partners/smartsystems-logo.png",
    description: "Innovative solution partner specializing in smart city and IoT security implementations.",
    expertise: ["Smart Cities", "IoT Security", "System Integration"],
    certifications: ["Solution Partner", "Smart City Certified"],
    website: "https://smartsystems.com.kw",
    email: "solutions@smartsystems.com.kw",
    phone: "+965 2 567 8901"
  }
];

const channelPartnerBenefits = [
  "Comprehensive product portfolio",
  "Co-marketing opportunities",
  "Growth incentives",
  "Project registration, solution & special price support",
  "World-class training and support",
  "Discounted demonstration equipment"
];

const partnershipBenefits = [
  {
    icon: <FiUsers className="w-8 h-8" />,
    title: "Expert Support",
    description: "Access to dedicated partner support teams and technical experts"
  },
  {
    icon: <FiAward className="w-8 h-8" />,
    title: "Certification Programs",
    description: "Comprehensive training and certification programs for your team"
  },
  {
    icon: <FiTrendingUp className="w-8 h-8" />,
    title: "Business Growth",
    description: "Marketing support and lead generation to grow your business"
  },
  {
    icon: <FiGlobe className="w-8 h-8" />,
    title: "Global Network",
    description: "Join a worldwide network of trusted security technology partners"
  }
];

const technologyPartnerBenefits = [
  "Synergy between Your Solutions and Hikvision's",
  "Global Reach and Support",
  "Faster Time to Market"
];

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState("channel");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Partners");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);

  const getCurrentPartners = () => {
    switch (activeTab) {
      case "channel":
        return channelPartnersData;
      case "technology":
        return technologyPartnersData;
      default:
        return [];
    }
  };

  const filteredPartners = getCurrentPartners().filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "All Partners" || partner.type === selectedType;
    const matchesRegion = selectedRegion === "All Regions" || partner.region === selectedRegion;
    return matchesSearch && matchesType && matchesRegion;
  });

  // Function to navigate to contact page
  const handleContactUs = () => {
    window.location.href = '/contact';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 30px rgba(220, 38, 38, 0.15)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ fontFamily: "Inter, -apple-system, sans-serif", background: "#fafafa", color: "#1f2937", minHeight: "100vh" }}
    >
      {/* Hero Banner Section with Hikvision Banner Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: "relative",
          height: "70vh",
          minHeight: "500px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Background Banner Image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('https://www.bsysnetwork.com/uploads/3540/Hikvision-banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1
          }}
        />

        {/* Animated Background Elements */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)",
            zIndex: 3
          }}
        />

        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            top: "-30%",
            right: "-30%",
            width: "150%",
            height: "150%",
            background: "radial-gradient(circle, rgba(220, 38, 38, 0.05) 0%, transparent 60%)",
            zIndex: 3
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -60, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              background: "#dc2626",
              borderRadius: "50%",
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
              zIndex: 4,
              filter: "blur(1px)"
            }}
          />
        ))}

        {/* Banner Content */}
        <div style={{
          position: "relative",
          zIndex: 5,
          textAlign: "center",
          color: "#ffffff",
          maxWidth: "800px",
          padding: "0 2rem"
        }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            style={{
              marginBottom: "2rem"
            }}
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              style={{
                fontSize: "4rem",
                fontWeight: "800",
                marginBottom: "1rem",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                background: "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
             OUR PARTNERS
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
            style={{
              fontSize: "1.25rem",
              marginBottom: "2rem",
              opacity: 0.95,
              maxWidth: "600px",
              margin: "0 auto 2rem",
              lineHeight: 1.6,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)"
            }}
          >
            Building the Future of Security Technology Together
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.1 }}
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: "0.75rem 2rem",
                background: "rgba(220, 38, 38, 0.9)",
                color: "#ffffff",
                borderRadius: "50px",
                fontSize: "1rem",
                fontWeight: "600",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}
            >
              Channel Partners
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: "0.75rem 2rem",
                background: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                borderRadius: "50px",
                fontSize: "1rem",
                fontWeight: "600",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}
            >
              Technology Partners
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Bottom Wave */}
        <motion.div
          animate={{
            x: [-100, 0, -100]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 120\" preserveAspectRatio=\"none\"><path d=\"M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\" fill=\"%23fafafa\"></path></svg>') repeat-x",
            backgroundSize: "200% 100%",
            zIndex: 6
          }}
        />
      </motion.section>

      {/* Hero Section with Tabs */}
      <motion.section
        variants={itemVariants}
        style={{
          background: "#fafafa",
          padding: "2rem 2rem 2rem 2rem",
          borderBottom: "1px solid #e5e7eb"
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Tab Navigation */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              borderBottom: "1px solid #e5e7eb"
            }}
          >
            {partnerTabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "1rem 2rem",
                  background: "transparent",
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: activeTab === tab.id ? "#dc2626" : "#6b7280",
                  cursor: "pointer",
                  borderBottom: activeTab === tab.id ? "3px solid #dc2626" : "3px solid transparent",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}
      >
        {/* Channel Program Tab */}
        {activeTab === "channel" && (
          <motion.section
            variants={containerVariants}
            style={{
              background: "#ffffff",
              margin: "1rem 0",
              padding: "4rem 3rem",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #f1f5f9"
            }}
          >
            <div style={{ display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap" }}>
              {/* Left side - Description */}
              <motion.div 
                variants={slideInLeft}
                style={{ flex: "1", minWidth: "350px" }}
              >
                <motion.h2
                  variants={itemVariants}
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "800",
                    color: "#1f2937",
                    marginBottom: "2rem",
                    lineHeight: 1.2
                  }}
                >
                  Hikvision Channel Partner Program
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  style={{
                    fontSize: "1.1rem",
                    color: "#6b7280",
                    marginBottom: "2.5rem",
                    lineHeight: 1.7
                  }}
                >
                  Hikvision's Channel Partner Program is tailored for resellers, system integrators and installers around the globe to promote products and solutions and grow businesses together. Join our network of certified partners and unlock exclusive benefits.
                </motion.p>

                <motion.div
                  variants={containerVariants}
                  style={{ marginBottom: "2.5rem" }}
                >
                  <motion.h3
                    variants={itemVariants}
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#1f2937",
                      marginBottom: "1.5rem"
                    }}
                  >
                    Partner Benefits Include:
                  </motion.h3>
                  
                  <motion.ul
                    variants={containerVariants}
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {channelPartnerBenefits.map((benefit, idx) => (
                      <motion.li
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          marginBottom: "1rem",
                          fontSize: "1rem",
                          color: "#374151",
                          padding: "0.75rem",
                          borderRadius: "8px",
                          background: "#fafafa",
                          border: "1px solid #f1f5f9"
                        }}
                      >
                        <div style={{
                          width: "8px",
                          height: "8px",
                          background: "#dc2626",
                          borderRadius: "50%",
                          flexShrink: 0
                        }} />
                        {benefit}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContactUs}
                    style={{
                      padding: "1rem 2rem",
                      background: "#dc2626",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    Contact Us
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right side - Channel Program Visual */}
              <motion.div 
                variants={slideInRight}
                style={{ flex: "0 0 450px", minWidth: "350px" }}
              >
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  style={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Channel Partner Program"
                    style={{
                      width: "100%",
                      height: "320px",
                      objectFit: "cover"
                    }}
                  />
                  <motion.div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                      color: "#ffffff",
                      padding: "2rem",
                      textAlign: "center"
                    }}
                  >
                    <h4 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                      Global Partner Network
                    </h4>
                    <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                      Join thousands of certified partners worldwide
                    </p>
                  </motion.div>
                </motion.div>

                {/* Partner Stats */}
                <motion.div
                  variants={containerVariants}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    marginTop: "1.5rem"
                  }}
                >
                  {[
                    { number: "10,000+", label: "Partners" },
                    { number: "150+", label: "Countries" },
                    { number: "24/7", label: "Support" }
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        textAlign: "center",
                        padding: "1rem",
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #f1f5f9"
                      }}
                    >
                      <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#dc2626" }}>
                        {stat.number}
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Technology Program Tab */}
        {activeTab === "technology" && (
          <motion.section
            variants={containerVariants}
            style={{
              background: "#ffffff",
              margin: "1rem 0",
              padding: "4rem 3rem",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #f1f5f9"
            }}
          >
            <div style={{ display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap" }}>
              {/* Left side - Description */}
              <motion.div 
                variants={slideInLeft}
                style={{ flex: "1", minWidth: "350px" }}
              >
                <motion.h2
                  variants={itemVariants}
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "800",
                    color: "#1f2937",
                    marginBottom: "2rem",
                    lineHeight: 1.2
                  }}
                >
                  Technology Partner Program
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  style={{
                    fontSize: "1.1rem",
                    color: "#6b7280",
                    marginBottom: "2.5rem",
                    lineHeight: 1.7
                  }}
                >
                  By joining the technology partner program, you will enjoy access to a wealth of technical and commercial resources. We ensure that your solution gets the proper response through our communication channels.
                </motion.p>

                <motion.div
                  variants={containerVariants}
                  style={{ marginBottom: "2.5rem" }}
                >
                  <motion.h3
                    variants={itemVariants}
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "700",
                      color: "#1f2937",
                      marginBottom: "1.5rem"
                    }}
                  >
                    Technology Benefits:
                  </motion.h3>
                  
                  <motion.ul
                    variants={containerVariants}
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {technologyPartnerBenefits.map((benefit, idx) => (
                      <motion.li
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 10 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          marginBottom: "1rem",
                          fontSize: "1rem",
                          color: "#374151",
                          padding: "0.75rem",
                          borderRadius: "8px",
                          background: "#fafafa",
                          border: "1px solid #f1f5f9"
                        }}
                      >
                        <div style={{
                          width: "8px",
                          height: "8px",
                          background: "#dc2626",
                          borderRadius: "50%",
                          flexShrink: 0
                        }} />
                        {benefit}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  style={{
                    fontSize: "1rem",
                    color: "#6b7280",
                    lineHeight: 1.6,
                    marginBottom: "2rem"
                  }}
                >
                  The Hikvision Technology Partner Program features three levels. Choose the partnership level that best suits your scope and ambitions as well as organizational capabilities.
                </motion.p>

                <motion.div 
                  variants={itemVariants}
                  style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContactUs}
                    style={{
                      padding: "1rem 2rem",
                      background: "#dc2626",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    Contact Us
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right side - Technology Program Visual */}
              <motion.div 
                variants={slideInRight}
                style={{ flex: "0 0 450px", minWidth: "350px" }}
              >
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  style={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Technology Partner Program"
                    style={{
                      width: "100%",
                      height: "320px",
                      objectFit: "cover"
                    }}
                  />
                  <motion.div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                      color: "#ffffff",
                      padding: "2rem",
                      textAlign: "center"
                    }}
                  >
                    <h4 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                      Innovation Ecosystem
                    </h4>
                    <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                      Cutting-edge technology integration platform
                    </p>
                  </motion.div>
                </motion.div>

                {/* Technology Stats */}
                <motion.div
                  variants={containerVariants}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    marginTop: "1.5rem"
                  }}
                >
                  {[
                    { number: "500+", label: "Tech Partners" },
                    { number: "50+", label: "Integrations" },
                    { number: "99.9%", label: "Uptime" }
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        textAlign: "center",
                        padding: "1rem",
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #f1f5f9"
                      }}
                    >
                      <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#dc2626" }}>
                        {stat.number}
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </motion.div>
    </motion.main>
  );
}