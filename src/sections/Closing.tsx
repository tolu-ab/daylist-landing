import { useEffect, useRef, useState } from 'react'
import Clouds from '../components/Clouds'
import LogoMark, { LOGO_TIGHT_VIEWBOX } from '../components/LogoMark'

function FeatureIcon({ kind }: { kind: 'mic' | 'shield' | 'sparkle' }) {
  const cls = 'h-7 w-7'
  if (kind === 'mic')
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </svg>
    )
  if (kind === 'shield')
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
        <path d="M12 3l7 3v5c0 4.6-3 7.7-7 9.2-4-1.5-7-4.6-7-9.2V6l7-3z" />
        <path d="M9 11.5l2.2 2.2L15.5 9.5" />
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}>
      <path d="M12 4l1.7 4.8L18.5 10.5l-4.8 1.7L12 17l-1.7-4.8L5.5 10.5l4.8-1.7L12 4z" />
      <path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </svg>
  )
}

const FEATURES = [
  {
    icon: 'mic' as const,
    title: 'Ramble it in',
    body: 'Voice or text — the inbox sorts the mess into a plan while you pour the coffee.',
    tint: 'bg-palette-sky',
  },
  {
    icon: 'shield' as const,
    title: 'You stay the boss',
    body: 'Approval rules mean nothing sends, books, or posts without your say-so.',
    tint: 'bg-palette-lavender',
  },
  {
    icon: 'sparkle' as const,
    title: 'It remembers',
    body: 'Your preferences, patterns, and corrections stick — Daylist gets better every day.',
    tint: 'bg-palette-butter',
  },
]

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

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-6 pt-24 text-center sm:pt-32">
        <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#111318] sm:text-6xl">
          More time for
          <br />
          everywhere your day happens.
        </h2>
        <p className="mt-5 max-w-md text-lg font-semibold text-[#111318]/65">
          Daylist works through the apps you already use — Gmail, Calendar, Slack, Notion, Canva, and more.
        </p>

        <div className="mt-12 grid w-full gap-4 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="glass-card animate-pop p-6 text-left"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-[#111318]/70 ${f.tint}`}>
                <FeatureIcon kind={f.icon} />
              </span>
              <p className="font-display mt-4 text-xl font-semibold text-[#111318]">{f.title}</p>
              <p className="mt-1.5 text-[15px] font-semibold leading-relaxed text-[#111318]/60">{f.body}</p>
            </div>
          ))}
        </div>

        <a href="https://app.daylists.co" target="_blank" rel="noreferrer" className="glass-btn glass-btn-solid mt-12 !px-10 !py-4 !text-xl">
          Get the app
        </a>
        <p className="mt-3 text-sm font-bold text-[#111318]/50">free to start · your approvals, your rules</p>
      </div>

      {/* picnic bookend — fades in from the sky above AND out into the footer below.
          Taller than the overlap below it, and the bottom fade starts late (88%) so
          most of the scene stays fully visible before it melts into the footer. */}
      <div className="pointer-events-none relative z-[2] mt-auto h-[54vh]">
        <img
          src="/art/closing-picnic.png"
          alt=""
          className="h-full w-full object-cover"
          style={{
            objectPosition: '50% 30%',
            maskImage: 'linear-gradient(180deg, transparent 0%, black 16%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 16%, black 70%, transparent 100%)',
          }}
        />
      </div>

      {/* footer sits behind the picnic image's bottom fade, so the dark bg reads as a smooth blend, not a hard edge */}
      <footer className="relative z-[1] -mt-[17vh] overflow-hidden bg-[#0f2439] pt-[17vh]">
        {/* huge wordmark — tight viewBox so the whole word fills the width, bottom edge melting away */}
        <div
          className="pointer-events-none w-full px-6 pt-4"
          style={{
            maskImage: 'linear-gradient(180deg, black 0%, black 72%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 72%, transparent 100%)',
          }}
        >
          <LogoMark
            viewBox={LOGO_TIGHT_VIEWBOX}
            className="mx-auto block h-auto w-full max-w-[1150px] text-white/20"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-5 text-sm font-bold text-white/85">
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
