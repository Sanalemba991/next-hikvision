'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { FiUser, FiLock, FiLogOut } from 'react-icons/fi'

// Simple icons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const GlobeAltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s-1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

// Simplified menu structure
const productCategories = [
  'Network Products', 'Turbo HD Products', 'Access Control', 'Video Intercom',
  'Speed Gates and Turnstiles', 'Alarm', 'LED Displays', 'Interactive Flat Panel Displays',
  'Display and Control', 'Networking', 'Thermal', 'Parking Management',
  'Intelligent Traffic', 'Portable Products', 'Onboard Security', 'Security Inspection'
]

const networkProductsSubcategories = {
  'Network Cameras': [
    'Pro Series', 'Pro Series with AcuSense', 'Pro Series with ColorVu 3.0',
    'DeepinView Series', 'Panoramic Series', 'Special Series', 'Ultra Series',
    'Cable-Free Series', 'Solar-powered Series', 'PT Series', 'Value Series'
  ],
  'PTZ Cameras': [
    'TandemVu PTZ Cameras', 'Ultra Series', 'Pro Series', 'Value Series', 'Special Series'
  ],
  'Network Video Recorders': [
    'Ultra Series', 'Pro Series', 'Value Series', 'Special Series'
  ],
  'Storage': ['Hybrid SAN', 'Cluster Storage'],
  'Servers': ['General Purpose Server', 'VMS Servers'],
  'Kits': ['PoE Kits', 'Wi-Fi Kits']
}

const turboHDProductsSubcategories = {
  'Turbo HD Cameras': [
    'Turbo HD Cameras with ColorVu',
    'Value Series',
    'Pro Series', 
    'Ultra Series',
    'IOT Series'
  ],
  'DVR': [
    'eDVR Series',
    'Pro Series with AcuSense',
    'Value Series',
    'Ultra Series',
    'Special Series'
  ],
  'Back-end Accessories': [],
  'PTZ Cameras': [
    'Pro Series'
  ]
}

const accessControlSubcategories = {
  'Face Recognition Terminals': [
    'Value Series',
    'Pro Series',
    'Ultra Series'
  ],
  'Face Recognition Modules for Turnstile': [],
  'Card Terminals': [
    'Value Series',
    'Pro Series'
  ],
  'Visitor Terminals': [
    'Pro Series'
  ],
  'FingerPrint Terminals': [
    'Value Series',
    'Pro Series',
    'Ultra Series'
  ],
  'Controllers': [
    'Value Series',
    'Pro Series',
    'Ultra Series'
  ],
  'Kits': [
    'Face Product Kits',
    'Fingerprint Product Kits'
  ],
  'Readers': [
    'Value Series',
    'Pro Series'
  ],
  'Payment Terminals': [
    'Pro Series'
  ],
  'Electrical Locks': [
    'Value Series',
    'Pro Series'
  ]
}

const videoIntercomSubcategories = {
  'IP Series': [
    'Pro Series',
    'Value Series',
    'Ultra Series'
  ],
  'All-in-one Indoor Station': [],
  'SIP-Phone': [
    'Pro Series',
    'Value Series',
    'Ultra Series'
  ],
  '2-Wire Series': [
    '2 Wire IP',
    '2 Wire HD',
    '2 Wire Analog'
  ],
  '4-Wire Series': [
    '4 Wire',
    '4 Wire HD',
    '4 Wire Hybrid',
    '4-Wire Hybrid HD'
  ],
  'Kits': [
    'IP Kits',
    '2-Wire Kits',
    '4-Wire Kits',
    'Hybrid Intercom Kit',
    'Hybrid HD Intercom Kit'
  ],
  'Emergency Intercom': [
    'Panic Alarm Master Station',
    'Panic Alarm Panel',
    'Panic Alarm Box',
    'Panic Alarm Station'
  ]
}

const speedGatesAndTurnstilesSubcategories = {
  'Speed Gates': [
    'Swing Barriers',
    'Flap Barrier',
    'Swing Gates'
  ],
  'Turnstiles': [
    'Full Height Turnstile',
    'Tripod Turnstile'
  ],
  'Peripheral Products': [
    'Fixed Base',
    'Reader Components',
    'Side Fence',
    'Remote Controller',
    'Stand Pole'
  ],
  'Spare Parts': [
    'Spare Parts'
  ],
  'Gate Opener': [
    'Door Operator'
  ]
}

const alarmSubcategories = {
  'Wired Intrusion Alarm': [
    'AX Hybrid PRO',
    'General Wired Sounders',
    'General Wired Detectors'
  ],
  'Wireless Intrusion Alarm': [
    'AX PRO',
    'AX HOME'
  ],
  'Intrusion Accessory': [
    'Common Accessory',
    'Detector Accessory'
  ]
}

const ledDisplaysSubcategories = {
  'Indoor LED Displays': [
    'Ultra Series',
    'Solid Plus Series',
    'Solid Series',
    'Flex Series',
    'Value Series'
  ],
  'LED Modules': [
    'Soft LED Module for indoor Series',
    'Normal LED Module for Indoor Series',
    'Normal LED Module for Outdoor Series'
  ],
  'LED Accessory': [],
  'Outdoor LED Displays': [
    'LumiFit Series',
    'LumiSquare Series',
    'LumiUltra Series'
  ],
  'Rental LED Displays': [
    'Rental LED Displays'
  ],
  'LED Controllers': [
    'LED Controllers'
  ],
  'Creative LED Displays': [
    'LED All-in-one display',
    'LED Poster display'
  ],
  'Video Wall Controllers': [
    'Video Wall Controllers'
  ]
}

const interactiveFlatPanelDisplaysSubcategories = {
  'Interactive Flat Panel Displays': [
    'Ultra Series',
    'Performance Series',
    'Value Series',
    'Accessories'
  ],
  'Blackboard Series': [
    'Conference Series',
    'Select Series'
  ],
  'Digital Signage': [
    'Wall-Mounted Series',
    'Floor-Standing Series',
    'Class Board'
  ],
  'Digital Signage Servers & Boxes': []
}

const displayAndControlSubcategories = {
  'LCD Video Walls': [
    'Mirror Series'
  ],
  'Monitors': [
    'Commercial Monitor'
  ],
  'Controllers': [],
  'Keyboards': [],
  'Decoders': [],
  'MVC': [],
  'KVM': []
}

const networkingSubcategories = {
  'Switches': [
    'Smart Managed Switch',
    'Enterprise Campus Switch',
    'Industrial Switch',
    'Unmanaged Switch'
  ],
  'SOHO Networking': [
    'SOHO Switch',
    'Wi-Fi Router'
  ],
  'Wireless Bridge': [
    'Outdoor Wireless Bridge',
    'Elevator Wireless Bridge'
  ],
  'WLAN': [
    'Celling AP',
    'Wall Mount AP',
    'Outdoor AP'
  ],
  'Routing': [
    'Smart Managed Router'
  ],
  'Accessories': [
    'Optical Module',
    'Industrial Power Supplies',
    'Media Convertor'
  ]
}

const thermalSubcategories = {
  'Security Thermal Cameras': [
    'HeatPro Series',
    'Bullet Series',
    'Special Industry Series',
    'Speed Dome Series',
    'PT Series'
  ],
  'Thermography Thermal Cameras': [
    'Fixed Series',
    'Bullet Series',
    'Special Industry Series',
    'PT Series'
  ]
}

const parkingManagementSubcategories = {
  'Vehicle Access Control Management': [
    'Barrier Gates',
    'ANPR Cameras',
    'Entrance & Exit Radars',
    'Entrance & Exit LED Screens',
    'Entrance & Exit Controllers',
    'UHF System',
    'Entrance & Exit Control Terminals',
    'Payment Machines',
    'All-in-One Entrance & Exit Manager',
    'Entrance & Exit Signal Light'
  ],
  'Parking Guidance': [
    'Parking Guidance Cameras',
    'Parking Guidance LED Screens',
    'Parking Inquiry Machines'
  ],
  'Parking Servers': [],
  'On-Street Parking': [
    'On-Street Parking Cameras',
    'Parking Terminals',
    'Geomagnetic Management System'
  ]
}

const intelligentTrafficSubcategories = {
  'Checkpoint Systems': [
    'Checkpoint Capture Units'
  ],
  'Strobe Supplement Lights': [
    'Flash Supplement Lights'
  ],
  'Traffic Servers': [],
  'Traffic Radar Products': [
    'Traffic Radar'
  ],
  'Traffic Flow Systems': [
    'Traffic Flow Detection'
  ],
  'Intersection Violation Systems': [
    'Intersection Violation Units'
  ],
  'Smart Monitoring Systems': [
    'Smart Monitoring Cameras'
  ],
  'Continuous Lights': [],
  'Signal Control Systems': [
    'Signal Control'
  ],
  'AID Systems': [
    'Smart Servers',
    'Incident Detection Camera'
  ],
  'Traffic Guidance Systems': [
    'Traffic Guidance Screens'
  ],
  'Road Management System': [],
  'Mobile Enforcement System': []
}

const portableProductsSubcategories = {
  'Portable Products': [
    'Body Worn Camera Series',
    'Portable Camera Series'
  ],
  'Enterprise PDAs': [
    'Full-Screen Enterprise PDAs',
    'Keypad Enterprise PDAs'
  ]
}

const onboardSecuritySubcategories = {
  'Mobile Cameras': [
    'Mobile Analog Cameras',
    'Mobile Network Cameras',
    'Mobile AI Network Cameras'
  ],
  'View Assist System': [
    'View Assist System',
    'E-Mirror'
  ],
  'Mobile Video Recorders': [
    'Digital Video Recorders',
    'Network Video Recorders',
    'Intelligent Vehicle Terminal'
  ],
  'Accessory': [
    'Electronic Accessory',
    'Consumer Accessory'
  ],
  'Dash Cameras': [
    'Industry Dash Camera',
    'Consumer Dash Camera'
  ]
}

const securityInspectionSubcategories = {
  'Detectors': [
    'Metal Detectors'
  ],
  'Intelligent Security Analyzer': [
    'Intelligent Security Analyzer'
  ],
  'X-Ray Inspection Systems': [
    'X-Ray Screening'
  ],
  'Millimeter Wave Security Inspection System': [
    'Millimeter Wave Person Security Inspection System'
  ]
}
export default function Navbar() {
  const { data: session } = useSession()
  const [isClient, setIsClient] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(menu)
    setActiveSubmenu(null)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      setActiveSubmenu(null)
    }, 150)
  }

  const handleSubmenuEnter = (submenu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveSubmenu(submenu)
  }

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: '/', // Redirect to home page after logout
        redirect: true
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/hikvision-logo.png" 
                alt="Hikvision" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Products
                <ChevronDownIcon className="ml-1 h-4 w-4 transition-transform" />
              </button>

              {/* Products Mega Menu */}
              {isClient && activeDropdown === 'products' && (
                <div className="absolute -left-96 mt-2 w-screen max-w-5xl bg-white rounded-lg shadow-2xl border border-gray-200 p-6">
                  <div className="grid grid-cols-4 gap-6">
                    {productCategories.slice(0, 16).map((category) => (
                      <div key={category} className="space-y-2">
                        <div 
                          className="relative"
                          onMouseEnter={() => handleSubmenuEnter(category)}
                        >
                          <h3 className="font-semibold text-gray-900 text-sm mb-2 cursor-pointer hover:text-blue-600 transition-colors flex items-center justify-between">
                            {category}
                            {(category === 'Network Products' || category === 'Turbo HD Products' || category === 'Access Control' || category === 'Video Intercom' || category === 'Speed Gates and Turnstiles' || category === 'Alarm' || category === 'LED Displays' || category === 'Interactive Flat Panel Displays' || category === 'Display and Control' || category === 'Networking' || category === 'Thermal' || category === 'Parking Management' || category === 'Intelligent Traffic' || category === 'Portable Products' || category === 'Onboard Security' || category === 'Security Inspection') && (
                              <ChevronDownIcon className="h-3 w-3 text-gray-400" />
                            )}
                          </h3>

                          {/* Network Products Sub-dropdown */}
                          {isClient && activeSubmenu === 'Network Products' && category === 'Network Products' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(networkProductsSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/network-products/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Turbo HD Products Sub-dropdown */}
                          {isClient && activeSubmenu === 'Turbo HD Products' && category === 'Turbo HD Products' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(turboHDProductsSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/turbo-hd-products/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Access Control Sub-dropdown */}
                          {isClient && activeSubmenu === 'Access Control' && category === 'Access Control' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(accessControlSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/access-control/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Video Intercom Sub-dropdown */}
                          {isClient && activeSubmenu === 'Video Intercom' && category === 'Video Intercom' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(videoIntercomSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/video-intercom/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Speed Gates and Turnstiles Sub-dropdown */}
                          {isClient && activeSubmenu === 'Speed Gates and Turnstiles' && category === 'Speed Gates and Turnstiles' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(speedGatesAndTurnstilesSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/speed-gates-and-turnstiles/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Alarm Sub-dropdown */}
                          {isClient && activeSubmenu === 'Alarm' && category === 'Alarm' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(alarmSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/alarm/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* LED Displays Sub-dropdown */}
                          {isClient && activeSubmenu === 'LED Displays' && category === 'LED Displays' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(ledDisplaysSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/led-displays/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Interactive Flat Panel Displays Sub-dropdown */}
                          {isClient && activeSubmenu === 'Interactive Flat Panel Displays' && category === 'Interactive Flat Panel Displays' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(interactiveFlatPanelDisplaysSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/interactive-flat-panel-displays/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Display and Control Sub-dropdown */}
                          {isClient && activeSubmenu === 'Display and Control' && category === 'Display and Control' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(displayAndControlSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/display-and-control/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Networking Sub-dropdown */}
                          {isClient && activeSubmenu === 'Networking' && category === 'Networking' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(networkingSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/networking/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Thermal Sub-dropdown */}
                          {isClient && activeSubmenu === 'Thermal' && category === 'Thermal' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(thermalSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/thermal/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Parking Management Sub-dropdown */}
                          {isClient && activeSubmenu === 'Parking Management' && category === 'Parking Management' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(parkingManagementSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/parking-management/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Intelligent Traffic Sub-dropdown */}
                          {isClient && activeSubmenu === 'Intelligent Traffic' && category === 'Intelligent Traffic' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(intelligentTrafficSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/intelligent-traffic/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Portable Products Sub-dropdown */}
                          {isClient && activeSubmenu === 'Portable Products' && category === 'Portable Products' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(portableProductsSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/portable-products/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Onboard Security Sub-dropdown */}
                          {isClient && activeSubmenu === 'Onboard Security' && category === 'Onboard Security' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(onboardSecuritySubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/onboard-security/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Security Inspection Sub-dropdown */}
                          {isClient && activeSubmenu === 'Security Inspection' && category === 'Security Inspection' && (
                            <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-60">
                              <div className="space-y-4">
                                {Object.entries(securityInspectionSubcategories).map(([subcat, items]) => (
                                  <div key={subcat} className="space-y-2">
                                    <h4 className="font-medium text-gray-800 text-xs uppercase tracking-wide border-b border-gray-200 pb-1">
                                      {subcat}
                                    </h4>
                                    <div className="space-y-1">
                                      {items.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/products/security-inspection/${subcat.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                          className="block text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                                        >
                                          {item}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* View All Products */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <Link 
                        href="/products" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View All Products
                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Menu Items */}
            <Link href="/solutions" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Solutions
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Support
            </Link>
            <Link href="/technologies" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Technologies
            </Link>
            <Link href="/commercial-display" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Commercial Display
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center space-x-2 text-gray-600 text-sm cursor-pointer hover:text-blue-600 transition-colors">
              <GlobeAltIcon className="h-4 w-4" />
              <span>Global | EN</span>
              <ChevronDownIcon className="h-3 w-3" />
            </div>

            {/* User Icon - Sign Up */}
            {session ? (
              <div className="relative group">
                {/* Profile Button */}
                <Link 
                  href="/profile" 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {session.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-600 font-semibold">
                        {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {session.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      My Profile
                    </Link>
                    <Link
                      href="/profile?tab=security"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FiLock className="w-4 h-4" />
                      Security
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                href="/signup" 
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FiUser className="w-4 h-4" />
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-blue-600 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isClient && (
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
              <Link 
                href="/products" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/solutions" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link 
                href="/support" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </Link>
              <Link 
                href="/technologies" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Technologies
              </Link>
              <Link 
                href="/commercial-display" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Commercial Display
              </Link>
              
              {/* Mobile Sign Up Link */}
              <Link 
                href="/signup" 
                className="block px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}