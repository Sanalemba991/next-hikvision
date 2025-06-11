'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiChevronDown, FiMail, FiPhone, FiMapPin, FiExternalLink, FiUsers, FiGlobe, FiAward, FiTrendingUp } from "react-icons/fi";

const partnerTabs = [
  { id: "channel", label: "Channel Partners" },
  { id: "technology", label: "Technology Partners" },
  { id: "discover", label: "Discover More" }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.01,
      boxShadow: "0 6px 25px rgba(220, 38, 38, 0.1)",
      transition: {
        duration: 0.2
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
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        style={{
          background: "#f8f9fa",
          padding: "3rem 2rem 2rem 2rem",
          borderBottom: "1px solid #e5e7eb"
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.h1 
            variants={itemVariants}
            style={{ 
              fontSize: "2.5rem", 
              fontWeight: "700", 
              marginBottom: "0.5rem",
              color: "#1f2937"
            }}
          >
            Partners
          </motion.h1>
          
          {/* Tab Navigation */}
          <motion.div 
            variants={itemVariants}
            style={{
              display: "flex",
              gap: "2rem",
              marginTop: "2rem",
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
                  padding: "1rem 0",
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}
      >
        {/* Channel Partners Tab */}
        {activeTab === "channel" && (
          <>
            {/* Channel Partner Program Section */}
            <motion.section 
              variants={itemVariants}
              style={{
                background: "#ffffff",
                margin: "3rem 0",
                padding: "3rem",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
              }}
            >
              <div style={{ display: "flex", gap: "3rem", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ flex: "1", minWidth: "300px" }}>
                  <motion.h2 
                    variants={itemVariants}
                    style={{ 
                      fontSize: "2rem", 
                      fontWeight: "700", 
                      color: "#1f2937",
                      marginBottom: "1.5rem"
                    }}
                  >
                    Hikvision Channel Partner Program
                  </motion.h2>
                  
                  <motion.p 
                    variants={itemVariants}
                    style={{
                      fontSize: "1rem",
                      color: "#6b7280",
                      marginBottom: "2rem",
                      lineHeight: 1.6
                    }}
                  >
                    Hikvision's Channel Partner Program is tailored for resellers, system integrators and installers around the globe to promote products and solutions and grow businesses together. As a channel partner of Hikvision, you will immediately enjoy benefits that include:
                  </motion.p>

                  <motion.ul 
                    variants={containerVariants}
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {channelPartnerBenefits.map((benefit, idx) => (
                      <motion.li
                        key={idx}
                        variants={itemVariants}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "0.75rem",
                          fontSize: "0.95rem",
                          color: "#374151"
                        }}
                      >
                        <div style={{
                          width: "6px",
                          height: "6px",
                          background: "#dc2626",
                          borderRadius: "50%",
                          flexShrink: 0
                        }} />
                        {benefit}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
                
                <div style={{ flex: "0 0 400px", minWidth: "300px" }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Channel Partner Program"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                    }}
                  />
                </div>
              </div>
            </motion.section>
          </>
        )}

        {/* Technology Partners Tab */}
        {activeTab === "technology" && (
          <>
            {/* Technology Partner Program Section */}
            <motion.section 
              variants={itemVariants}
              style={{
                background: "#ffffff",
                margin: "3rem 0",
                padding: "3rem",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
              }}
            >
              <div style={{ display: "flex", gap: "3rem", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ flex: "1", minWidth: "300px" }}>
                  <motion.h2 
                    variants={itemVariants}
                    style={{ 
                      fontSize: "2rem", 
                      fontWeight: "700", 
                      color: "#1f2937",
                      marginBottom: "1.5rem"
                    }}
                  >
                    Hikvision Technology Partner Program
                  </motion.h2>
                  
                  <motion.p 
                    variants={itemVariants}
                    style={{
                      fontSize: "1rem",
                      color: "#6b7280",
                      marginBottom: "2rem",
                      lineHeight: 1.6
                    }}
                  >
                    By joining the technology partner program, you will enjoy access to a wealth of technical and commercial resources. We ensure that your solution gets the proper response through our communication channels.
                  </motion.p>

                  <motion.ul 
                    variants={containerVariants}
                    style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}
                  >
                    {technologyPartnerBenefits.map((benefit, idx) => (
                      <motion.li
                        key={idx}
                        variants={itemVariants}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "0.75rem",
                          fontSize: "0.95rem",
                          color: "#374151"
                        }}
                      >
                        <div style={{
                          width: "6px",
                          height: "6px",
                          background: "#dc2626",
                          borderRadius: "50%",
                          flexShrink: 0
                        }} />
                        {benefit}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.p 
                    variants={itemVariants}
                    style={{
                      fontSize: "0.95rem",
                      color: "#6b7280",
                      lineHeight: 1.6
                    }}
                  >
                    The Hikvision Technology Partner Program features three levels. Choose the partnership level that best suits your scope and ambitions ad well as organizational capabilities. With Hikvision, you can opt for project integration only, or you can choose to invest more time and effort and explore the many opportunities afforded by the partner program.
                  </motion.p>
                </div>
                
                <div style={{ flex: "0 0 400px", minWidth: "300px" }}>
                  <img 
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Technology Partner Program"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                    }}
                  />
                </div>
              </div>
            </motion.section>

            {/* Technology Partners Directory */}
            <motion.section 
              variants={itemVariants}
              style={{
                background: "#ffffff",
                margin: "2rem 0",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
              }}
            >
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "600", 
                color: "#1f2937",
                marginBottom: "1.5rem",
                textAlign: "center"
              }}>
                Find Technology Partners
              </h3>

              {/* Search Bar for Technology Partners */}
              <div style={{
                display: "flex",
                gap: "1rem",
                maxWidth: 600,
                margin: "0 auto 2rem",
                flexWrap: "wrap"
              }}>
                <motion.div 
                  style={{
                    position: "relative",
                    flex: "1",
                    minWidth: "250px"
                  }}
                >
                  <FiSearch style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    fontSize: "1rem"
                  }} />
                  <input
                    type="text"
                    placeholder="Search technology partners..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "all 0.2s ease",
                      backgroundColor: "#ffffff"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#dc2626";
                      e.target.style.boxShadow = "0 0 0 3px rgba(220, 38, 38, 0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </motion.div>
              </div>

              {/* Results Counter */}
              <div style={{ textAlign: "center", color: "#6b7280", fontSize: "0.85rem", marginBottom: "2rem" }}>
                Showing {filteredPartners.length} of {getCurrentPartners().length} technology partners
              </div>

              {/* Technology Partners Grid */}
              {filteredPartners.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: "1.5rem"
                  }}
                >
                  {filteredPartners.map((partner) => (
                    <motion.div
                      key={partner.id}
                      variants={cardVariants}
                      whileHover="hover"
                      style={{
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        padding: "1.5rem",
                        border: "1px solid #e5e7eb"
                      }}
                    >
                      {/* Partner Header */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{
                          width: "50px",
                          height: "50px",
                          background: "#dc2626",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}>
                          <span style={{ fontSize: "1.25rem", fontWeight: "600", color: "#ffffff" }}>
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ 
                            fontSize: "1.1rem", 
                            fontWeight: "600", 
                            color: "#1f2937",
                            marginBottom: "0.25rem"
                          }}>
                            {partner.name}
                          </h3>
                          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                            📍 {partner.location}
                          </div>
                        </div>
                      </div>

                      {/* Partner Description */}
                      <p style={{ 
                        color: "#6b7280", 
                        fontSize: "0.9rem",
                        marginBottom: "1rem",
                        lineHeight: 1.5
                      }}>
                        {partner.description}
                      </p>

                      {/* Expertise Tags */}
                      <div style={{ marginBottom: "1rem" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                          <span style={{
                            padding: "0.25rem 0.5rem",
                            background: "#dc2626",
                            color: "#ffffff",
                            borderRadius: "12px",
                            fontSize: "0.7rem",
                            fontWeight: "500"
                          }}>
                            {partner.type}
                          </span>
                          {partner.expertise.map((skill, idx) => (
                            <span key={idx} style={{
                              padding: "0.25rem 0.5rem",
                              background: "#fef2f2",
                              color: "#dc2626",
                              borderRadius: "12px",
                              fontSize: "0.7rem",
                              fontWeight: "500"
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div style={{ 
                        paddingTop: "1rem", 
                        borderTop: "1px solid #e5e7eb",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem"
                      }}>
                        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.25rem" }}>
                            <FiMail style={{ fontSize: "0.7rem" }} />
                            <span>{partner.email}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FiPhone style={{ fontSize: "0.7rem" }} />
                            <span>{partner.phone}</span>
                          </div>
                        </div>
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            padding: "0.5rem 1rem",
                            background: "#dc2626",
                            color: "#ffffff",
                            textDecoration: "none",
                            borderRadius: "6px",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                            transition: "all 0.2s ease"
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLAnchorElement).style.background = "#b91c1c";
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLAnchorElement).style.background = "#dc2626";
                          }}
                        >
                          Visit
                          <FiExternalLink style={{ fontSize: "0.7rem" }} />
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    color: "#6b7280",
                    background: "#f8f9fa",
                    borderRadius: "8px"
                  }}
                >
                  <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>No technology partners found matching your criteria.</p>
                  <p style={{ fontSize: "0.9rem" }}>Try adjusting your search terms.</p>
                </motion.div>
              )}
            </motion.section>
          </>
        )}

        {/* Discover More Tab */}
        {activeTab === "discover" && (
          <>
            {/* Partnership Benefits */}
            <motion.section 
              variants={itemVariants}
              style={{ 
                background: "#ffffff",
                margin: "3rem 0", 
                padding: "3rem", 
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
              }}
            >
              <motion.h2 
                variants={itemVariants}
                style={{ 
                  textAlign: "center", 
                  fontSize: "2rem", 
                  fontWeight: "700", 
                  color: "#1f2937",
                  marginBottom: "1rem"
                }}
              >
                Why Partner with Hikvision?
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                style={{ 
                  textAlign: "center", 
                  fontSize: "1.1rem", 
                  color: "#6b7280",
                  marginBottom: "3rem",
                  maxWidth: 650,
                  margin: "0 auto 3rem"
                }}
              >
                Join our global partner ecosystem and unlock new opportunities for growth and success
              </motion.p>
              <motion.div
                variants={containerVariants}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "2rem",
                }}
              >
                {partnershipBenefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    whileHover="hover"
                    style={{
                      textAlign: "center",
                      padding: "1.5rem",
                    }}
                  >
                    <div style={{ 
                      color: "#dc2626", 
                      marginBottom: "1rem",
                      display: "flex",
                      justifyContent: "center"
                    }}>
                      {benefit.icon}
                    </div>
                    <h3 style={{ 
                      fontSize: "1.125rem", 
                      fontWeight: "600", 
                      marginBottom: "0.75rem", 
                      color: "#1f2937" 
                    }}>
                      {benefit.title}
                    </h3>
                    <p style={{ 
                      fontSize: "0.95rem", 
                      color: "#6b7280",
                      lineHeight: 1.6
                    }}>
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Become a Partner CTA */}
            <motion.section 
              variants={itemVariants}
              style={{ 
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)",
                color: "#ffffff",
                padding: "3rem 2rem", 
                textAlign: "center",
                borderRadius: "8px",
                margin: "0 0 4rem"
              }}
            >
              <motion.h2 
                variants={itemVariants}
                style={{ 
                  fontSize: "2rem", 
                  fontWeight: "700", 
                  marginBottom: "1rem"
                }}
              >
                Ready to Become a Partner?
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                style={{ 
                  fontSize: "1.1rem", 
                  marginBottom: "2rem",
                  maxWidth: 650,
                  margin: "0 auto 2rem",
                  opacity: 0.95
                }}
              >
                Join our growing network of partners and help shape the future of security technology
              </motion.p>
              <motion.div
                variants={itemVariants}
                style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "0.875rem 2rem",
                    background: "#ffffff",
                    color: "#dc2626",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  Apply Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "0.875rem 2rem",
                    background: "transparent",
                    color: "#ffffff",
                    border: "2px solid #ffffff",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.section>
          </>
        )}
      </motion.div>
    </motion.main>
  );
}