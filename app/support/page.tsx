'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How do I configure enterprise-grade IP camera systems?',
    answer:
      'Enterprise IP camera configuration involves: 1) Network architecture planning with VLAN segmentation, 2) Bulk device discovery using SADP tool or network scanning, 3) Centralized configuration management through batch tools, 4) Security hardening with certificate management and user access controls, 5) Integration with enterprise management systems, 6) Comprehensive testing and documentation.',
  },
  {
    question: 'What professional management platforms are available?',
    answer:
      'Hikvision offers enterprise-grade management solutions: HikCentral Professional for large-scale deployments, iVMS-5200 for centralized monitoring, IVSS for intelligent video surveillance, and HikCentral Enterprise for comprehensive security management. All platforms support multi-site management, advanced analytics, and third-party integrations.',
  },
  {
    question: 'How do I implement firmware management across multiple devices?',
    answer:
      'Enterprise firmware management includes: 1) Centralized firmware repository setup, 2) Staged deployment planning with rollback procedures, 3) Automated batch updates using management platforms, 4) Pre-deployment testing in controlled environments, 5) Monitoring and validation post-update, 6) Compliance reporting and audit trails.',
  },
  {
    question: 'What are the professional service and warranty options?',
    answer:
      'Professional service tiers include: Standard warranty (2-3 years depending on product category), Extended warranty up to 5 years, Premium support with 4-hour response SLA, On-site technical services, Preventive maintenance programs, and 24/7 critical system monitoring. Enterprise customers receive dedicated technical account management.',
  },
];

const supportSections = [
  {
    title: 'Download',
    icon: 'download',
    items: ['Software', 'SDK', 'Firmware', 'Mobile Apps', 'Plugins']
  },
  {
    title: 'Tools',
    icon: 'tools',
    items: ['Product Selectors & System Designers', 'Installation & Maintenance Tools', 'Management Software', 'Integration SDKs', 'Configuration Tools']
  },
  {
    title: 'Documents',
    icon: 'document',
    items: ['Marketing Materials', 'FAQ', 'How to guide', 'Notice', 'User Manuals']
  },
  {
    title: 'Cybersecurity',
    icon: 'security',
    items: ['Security Advisory', 'Cybersecurity White Paper', 'Best Practices', 'Report an Issue', 'Vulnerability Reports']
  }
];

const quickLinks = [
  'SADP for Windows',
  'iVMS 4200',
  'Hik-Connect',
  'Hikvision App Store',
  'Technical Documentation',
  'Firmware Updates'
];

export default function ProfessionalSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Searching for: "${searchQuery}"`);
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'download':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        );
      case 'tools':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        );
      case 'document':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        );
      case 'security':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622C21 7.51 20.403 5.322 18.402 6A11.958 11.958 0 0112 2.753z" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative overflow-hidden min-h-[600px] flex items-center"
      >
        {/* Background Image with subtle overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Technical support background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Decorative elements (more subtle) */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-12 left-12 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute top-24 right-16 w-24 h-24 bg-white bg-opacity-5 rounded-full"></div>
            <div className="absolute bottom-16 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute bottom-8 right-1/3 w-20 h-20 bg-white bg-opacity-5 rounded-full"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="grid grid-cols-1 gap-12 items-center"
          >
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
              >
              <span className="text-red-500"> HIK</span>VISION UAE
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-md"
              >
                Find instant answers in our knowledge base or connect with our support team for further assistance
              </motion.p>
              
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comprehensive Support Resources</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
            Hikvision&apos;s Technical Support is available to you in many helpful formats. Wherever you are, whenever you need it, we have resources ready. Whether you are installing hardware or have questions about our services, our online support, documentation, and knowledgeable representatives are only a mouse-click away.
          </p>
        </motion.div>

        {/* Support Sections Grid */}
        

        {/* Quick Links Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ backgroundColor: openFaq === i ? '#f1f5f9' : '#fff' }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 flex justify-between items-center transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                      <motion.svg
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-5 h-5 text-gray-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { height: 'auto', opacity: 1 },
                            collapsed: { height: 0, opacity: 0 },
                          }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-white">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button className="text-sm text-red-600 hover:text-red-800 hover:underline text-left transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium text-gray-900">Phone</div>
                  <div className="text-gray-600">+971-4-XXX-XXXX</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <div className="text-gray-600">support@hikvision.ae</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Hours</div>
                  <div className="text-gray-600">Mon-Fri 9AM-6PM GST</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}