import Clouds from '../components/Clouds'

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
  },
  {
    icon: 'shield' as const,
    title: 'You stay the boss',
    body: 'Approval rules mean nothing sends, books, or posts without your say-so.',
  },
  {
    icon: 'sparkle' as const,
    title: 'It remembers',
    body: 'Your preferences, patterns, and corrections stick — Daylist gets better every day.',
  },
]

export default function Closing() {
  return (
    <section id="get" className="sky-gradient relative flex min-h-[92svh] flex-col overflow-hidden">
      <Clouds count={4} />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-6 pt-24 text-center sm:pt-32">
        <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#16334f] sm:text-6xl">
          More time for
          <br />
          the good stuff.
        </h2>
        <p className="mt-5 max-w-md text-lg font-semibold text-[#16334f]/65">
          Daylist works through the apps you already use — Gmail, Calendar, Slack, Notion, Canva, and more.
        </p>

        <div className="mt-12 grid w-full gap-4 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="glass animate-pop rounded-3xl p-6 text-left"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="glass inline-flex h-12 w-12 items-center justify-center rounded-2xl text-[#2a5acc]">
                <FeatureIcon kind={f.icon} />
              </span>
              <p className="font-display mt-4 text-xl font-semibold text-[#16334f]">{f.title}</p>
              <p className="mt-1.5 text-[15px] font-semibold leading-relaxed text-[#16334f]/60">{f.body}</p>
            </div>
          ))}
        </div>

        <a href="https://app.daylists.co" target="_blank" rel="noreferrer" className="glass-btn glass-btn-solid mt-12 !px-10 !py-4 !text-xl">
          Get the app
        </a>
        <p className="mt-3 text-sm font-bold text-[#16334f]/50">free to start · your approvals, your rules</p>
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

      <footer className="relative z-10 bg-[#4c6621]">
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
