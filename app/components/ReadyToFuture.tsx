'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiMail, FiExternalLink } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

const ReadyToFuture = ({ currentTime }: { currentTime?: string }) => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showTime, setShowTime] = useState(false)

  useEffect(() => {
    // Animate in the time badge
    setTimeout(() => setShowTime(true), 300)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 4000)
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Floating time badge */}
        <div className={`absolute top-8 right-8 hidden lg:block transition-all duration-700 ${showTime ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl px-6 py-3 border border-gray-200 shadow-2xl hover:shadow-red-200 transition-shadow duration-300">
            <div className="text-xs text-gray-500 mb-1">New York Time</div>
            <div className="text-lg font-mono text-gray-900 tracking-widest">{currentTime}</div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          {/* Main CTA */}
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-xl animate-fadeIn">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Global Security Leader
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Ready to Secure
              </span>
              <br />
              <span className="text-red-600 drop-shadow-lg">Your Future?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl animate-fadeIn delay-200">
              Join the millions who trust Hikvision's cutting-edge security technology. 
              Experience innovation that protects what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/get-started"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <span>Get Started Today</span>
                <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 font-bold rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <span>Book Demo</span>
                <FiExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {/* Newsletter Card */}
          <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 shadow-2xl hover:shadow-red-100 transition-shadow duration-300 animate-fadeIn delay-300">
            <div className="text-center mb-6">
              <HiSparkles className="w-12 h-12 text-red-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Informed</h3>
              <p className="text-gray-600">Get weekly security insights</p>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <FiMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
              <button
                type="submit"
                disabled={isSubscribed}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubscribed ? '✅ Subscribed!' : 'Subscribe Now'}
              </button>
            </form>
            <div className="flex justify-center gap-4 mt-6 text-xs text-gray-500">
              <span>✓ No spam</span>
              <span>✓ Weekly updates</span>
              <span>✓ Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fadeIn.delay-200 {
          animation-delay: .2s;
        }
        .animate-fadeIn.delay-300 {
          animation-delay: .3s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  )
}

export default ReadyToFuture