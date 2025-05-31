'use client'
import { useRef, useEffect } from 'react'

const Header = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Simple initialization of the video element
    const video = videoRef.current
    if (video) {
      video.play().catch(err => {
        console.log('Video autoplay failed:', err)
      })
    }
  }, [])

  return (
    <header className="relative h-screen w-full overflow-hidden">
      {/* Video Background Only */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </header>
  )
}

export default Header