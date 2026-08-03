import { useEffect, useRef, useState } from 'react'
import Clouds from '../components/Clouds'

const ROOM_CHIPS = ['rambles sorted', 'apps wired in', 'memories kept', 'messages sent']

export default function Closing() {
  const dioramaRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = dioramaRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="get" className="sky-gradient relative flex min-h-[92svh] flex-col overflow-hidden">
      <Clouds count={4} />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6 pt-24 text-center sm:pt-32">
        <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#16334f] sm:text-6xl">
          One little helper,
          <br />
          everywhere your day happens.
        </h2>
        <p className="mt-5 max-w-md text-lg font-semibold text-[#16334f]/65">
          Sorting the inbox, wiring through your apps, remembering everything, sending with your say-so.
        </p>

        {/* diorama — comes in on scroll */}
        <div
          ref={dioramaRef}
          className="mt-12 w-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0) scale(1) rotate(0deg)' : 'translateY(90px) scale(0.9) rotate(1.5deg)',
          }}
        >
          <div className="glass-deep rounded-[2.5rem] p-3 shadow-[0_40px_80px_-30px_rgba(22,51,79,0.35)] sm:p-4">
            <img
              src="/art/diorama.png"
              alt="Daylist's little helper at work — sorting the inbox, wiring through your apps, keeping memories, and sending messages"
              className={`w-full rounded-[2rem] ${inView ? 'animate-float' : ''}`}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {ROOM_CHIPS.map((chip, i) => (
              <span
                key={chip}
                className="glass-chip transition-all duration-700"
                style={{
                  transitionDelay: `${400 + i * 120}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(14px)',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <a href="https://app.daylists.co" target="_blank" rel="noreferrer" className="glass-btn glass-btn-solid mt-12 !px-10 !py-4 !text-xl">
          Get the app
        </a>
        <p className="mt-3 pb-16 text-sm font-bold text-[#16334f]/50">free to start · your approvals, your rules</p>
      </div>

      {/* meadow bookend */}
      <div className="pointer-events-none relative z-[1] mt-auto h-[36vh]">
        <img
          src="/art/hero-meadow.png"
          alt=""
          className="h-full w-full object-cover"
          style={{
            objectPosition: '50% 64%',
            maskImage: 'linear-gradient(180deg, transparent 0%, black 30%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 30%)',
          }}
        />
      </div>

      <footer className="relative z-10 bg-[#848531]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-sm font-bold text-white/85">
          <span>daylist · made with care © 2026</span>
          <span className="flex gap-5">
            <a href="https://github.com/tolu-ab/daylist" target="_blank" rel="noreferrer" className="underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white">
              GitHub
            </a>
            <a href="https://app.daylists.co" target="_blank" rel="noreferrer" className="underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white">
              app.daylists.co
            </a>
          </span>
        </div>
      </footer>
    </section>
  )
}
