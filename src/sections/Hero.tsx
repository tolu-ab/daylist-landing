import { useEffect, useState } from 'react'
import Clouds from '../components/Clouds'
import LogoMark from '../components/LogoMark'
import StatusChip from '../components/StatusChip'

export default function Hero() {
  const [showScrollCue, setShowScrollCue] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowScrollCue(true), 4200)
    const handleScroll = () => {
      if (window.scrollY > 24) setShowScrollCue(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    // hero — full-bleed sky, meadow, nav, and headline
    <div className="sky-gradient relative flex min-h-[100svh] flex-col overflow-hidden">
        {/* full-bleed meadow artwork, top edge melted into the CSS sky */}
        <img
          src="/art/hero-meadow.jpeg"
          alt=""
          className="hero-meadow-art pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: '50% 100%',
            maskImage: 'linear-gradient(180deg, transparent 0%, black 22%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 22%)',
          }}
        />
        <Clouds count={2} />

        {/* nav — sits directly over the sky, no backing band */}
        <header className="relative z-30 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <a href="#" className="flex items-center gap-2.5 text-white">
            <LogoMark className="h-14 w-auto" />
          </a>
          <a href="https://app.daylists.co" target="_blank" rel="noreferrer" className="glass-btn !px-5 !py-2.5 !text-base">
            Log in
          </a>
        </header>

        {/* headline */}
        <div className="relative z-20 mx-auto mt-auto flex w-full max-w-3xl flex-col items-center px-6 pb-[44vh] text-center">
          <StatusChip />
          <h1
            className="font-display animate-pop mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-[#111318] drop-shadow-[0_2px_18px_rgba(255,255,255,0.65)] sm:text-5xl md:text-6xl"
            style={{ animationDelay: '0.08s' }}
          >
            Get Your Day Back
          </h1>
          <p
            className="animate-pop mt-4 max-w-xl text-xl font-semibold leading-relaxed text-[#111318]/75 drop-shadow-[0_2px_14px_rgba(255,255,255,0.6)] sm:text-2xl"
            style={{ animationDelay: '0.16s' }}
          >
            <span className="block">Type it, capture it, say it.</span>
            <span className="block">Daylist gets it done.</span>
          </p>
          <div className="animate-pop mt-7 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '0.24s' }}>
            <a href="https://app.daylists.co" target="_blank" rel="noreferrer" className="glass-btn glass-btn-solid hero-cta-float">
              Download for macOS
            </a>
            <a href="#demo" className="glass-btn hero-cta-float">
              See it work
            </a>
          </div>
        </div>

        {showScrollCue && (
          <div className="scroll-cue glass-chip absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 !px-4 !py-2 text-xs">
            <span>Scroll to explore</span>
            <span className="scroll-cue-track" aria-hidden="true">
              <span className="scroll-cue-dot" />
            </span>
          </div>
        )}
      </div>
  )
}
