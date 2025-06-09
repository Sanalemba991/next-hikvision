'use client';

import { useState } from 'react';

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

const supportCategories = [
  {
    icon: 'cog',
    color: 'slate',
    title: 'Enterprise Technical Support',
    desc: 'Comprehensive technical assistance for mission-critical security deployments with priority escalation and dedicated engineering resources.',
    features: [
      '24/7 Critical System Support',
      'Dedicated Technical Account Manager',
      'Priority Escalation Process',
      'Remote System Diagnostics',
    ],
    button: 'Access Enterprise Support',
    buttonColor: 'slate',
  },
  {
    icon: 'book-open',
    color: 'blue',
    title: 'Technical Documentation',
    desc: 'Comprehensive technical resources including API documentation, integration guides, and enterprise deployment best practices.',
    features: [
      'API & SDK Documentation',
      'System Integration Guides',
      'Enterprise Deployment Manuals',
      'Technical Specifications Database',
    ],
    button: 'Browse Documentation',
    buttonColor: 'blue',
  },
  {
    icon: 'download',
    color: 'indigo',
    title: 'Enterprise Software Suite',
    desc: 'Access professional-grade management software, development tools, and enterprise firmware packages with version control.',
    features: [
      'Enterprise Management Platforms',
      'Development SDKs & Tools',
      'Certified Firmware Releases',
      'Integration Middleware',
    ],
    button: 'Download Software',
    buttonColor: 'indigo',
  },
  {
    icon: 'academic-cap',
    color: 'emerald',
    title: 'Professional Certification',
    desc: 'Industry-recognized certification programs for system integrators, installers, and security professionals.',
    features: [
      'Certified Professional Programs',
      'Advanced Technical Training',
      'Continuing Education Credits',
      'Partner Certification Tracks',
    ],
    button: 'View Certifications',
    buttonColor: 'emerald',
  },
  {
    icon: 'shield-check',
    color: 'amber',
    title: 'Service & Warranty',
    desc: 'Comprehensive warranty management, RMA processing, and professional service contracts for enterprise customers.',
    features: [
      'Enterprise Warranty Management',
      'Advanced RMA Processing',
      'On-site Service Contracts',
      'Preventive Maintenance Programs',
    ],
    button: 'Manage Services',
    buttonColor: 'amber',
  },
  {
    icon: 'building-office',
    color: 'violet',
    title: 'Partner & Integrator Hub',
    desc: 'Dedicated resources for authorized partners, system integrators, and enterprise resellers with specialized support.',
    features: [
      'Partner Portal Access',
      'Technical Enablement Resources',
      'Sales & Marketing Support',
      'Advanced Training Programs',
    ],
    button: 'Partner Portal',
    buttonColor: 'violet',
  },
];

const contactMethods = [
  {
    icon: 'phone',
    title: 'Enterprise Support Line',
    description: 'Direct access to senior technical specialists',
    contact: '+971-4-XXX-XXXX',
    availability: '24/7 for Critical Issues',
    color: 'red',
  },
  {
    icon: 'envelope',
    title: 'Technical Support Email',
    description: 'Detailed technical assistance with case tracking',
    contact: 'enterprise.support@hikvision.ae',
    availability: 'Response within 4 hours',
    color: 'blue',
  },
  {
    icon: 'video',
    title: 'Remote Technical Session',
    description: 'Screen sharing and remote diagnostics',
    contact: 'Schedule Session',
    availability: 'Business hours or by appointment',
    color: 'green',
  },
];

export default function ProfessionalSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Enterprise Search: "${searchQuery}"\n\nThis would connect to your enterprise knowledge base and support system.`);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Professional Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Professional Support Center</h1>
                <p className="text-sm text-slate-600">Enterprise Security Solutions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Status: All Systems Operational</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Enterprise Security
              <span className="block text-red-500">Support Excellence</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Professional-grade technical support for mission-critical security infrastructure. 
              Dedicated resources, priority response, and enterprise-level service commitments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Emergency Support
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold transition-all duration-200">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Search */}
      <div className="container mx-auto px-6 -mt-12 relative z-10 mb-20">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">Enterprise Knowledge Base</h2>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="w-5 h-5 absolute left-4 top-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search technical documentation, KB articles, product guides..."
                className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 outline-none text-lg transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="text-sm text-slate-600 font-medium">Quick Access:</span>
            {['Enterprise Deployment', 'API Integration', 'System Architecture', 'Security Hardening'].map((item, i) => (
              <button
                key={i}
                className="text-sm bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 px-4 py-2 rounded-full transition-all duration-200 font-medium"
                onClick={() => setSearchQuery(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Support Categories */}
      <div className="container mx-auto px-6 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Professional Support Services</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive support infrastructure designed for enterprise security deployments and professional integrators
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {supportCategories.map((cat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 transition-all duration-300 border border-slate-100">
              <div className={`w-16 h-16 bg-${cat.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                <svg className={`w-8 h-8 text-${cat.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {cat.icon === 'cog' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
                  {cat.icon === 'book-open' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                  {cat.icon === 'download' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />}
                  {cat.icon === 'academic-cap' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />}
                  {cat.icon === 'shield-check' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                  {cat.icon === 'building-office' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{cat.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{cat.desc}</p>
              <ul className="text-sm text-slate-600 space-y-3 mb-8">
                {cat.features.map((f, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full bg-${cat.buttonColor}-600 hover:bg-${cat.buttonColor}-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg`}>
                {cat.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Technical Knowledge Base</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive answers to enterprise deployment and integration questions
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  className="w-full text-left p-8 focus:outline-none flex justify-between items-center hover:bg-slate-100 transition-all duration-200"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <h3 className="text-lg font-semibold text-slate-900 pr-4">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-slate-500 transform transition-transform duration-200 flex-shrink-0 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-8 pb-8">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Enterprise Support Channels</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Multiple ways to connect with our technical specialists and support engineers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl p-8 text-center hover:bg-slate-700 transition-all duration-200">
                <div className={`w-16 h-16 bg-${method.color}-500 bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <svg className={`w-8 h-8 text-${method.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {method.icon === 'phone' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                    {method.icon === 'envelope' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                    {method.icon === 'video' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />}
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">{method.title}</h3>
                <p className="text-slate-300 mb-6">{method.description}</p>
                <p className={`text-${method.color}-400 font-semibold text-lg mb-2`}>{method.contact}</p>
                <p className="text-sm text-slate-400">{method.availability}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Service Level Commitments</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Critical Issues</h4>
                  <p className="text-slate-300 text-sm">4-hour response time for system-down scenarios</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Standard Support</h4>
                  <p className="text-slate-300 text-sm">Next business day response for general inquiries</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Enterprise Customers</h4>
                  <p className="text-slate-300 text-sm">Dedicated technical account management</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Partners</h4>
                  <p className="text-slate-300 text-sm">Priority queue and specialized resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}