import Clouds from '../components/Clouds'

function LogoDots({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" fill="#16334f" />
      <circle cx="22" cy="12" r="6" fill="#16334f" opacity="0.85" />
      <circle cx="13" cy="22" r="6" fill="#16334f" opacity="0.7" />
      <circle cx="22" cy="21" r="4.5" fill="#16334f" opacity="0.55" />
    </svg>
  )
}

export default function Hero() {
  return (
    <header className="sky-gradient relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* full-bleed meadow artwork, top edge melted into the CSS sky */}
      <img
        src="/art/hero-meadow.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: '50% 100%',
          maskImage: 'linear-gradient(180deg, transparent 0%, black 22%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 22%)',
        }}
      />
      <Clouds count={2} />

      {/* giant brand word floating in the sky, Npuman-style */}
      <div
        aria-hidden
        className="font-display pointer-events-none absolute inset-x-0 z-10 select-none text-center font-bold leading-none text-white"
        style={{
          top: '6vh',
          fontSize: 'clamp(6rem, 20vw, 22rem)',
          letterSpacing: '-0.03em',
          opacity: 0.95,
          textShadow: '0 12px 70px rgba(60, 110, 180, 0.5)',
        }}
      >
        daylist
      </div>

      {/* nav */}
      <nav className="relative z-30 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
        <a href="#" className="flex items-center gap-2.5">
          <LogoDots />
          <span className="font-display text-2xl font-semibold tracking-tight text-[#16334f]">daylist</span>
        </a>
        <a href="https://app.daylists.co" target="_blank" rel="noreferrer" className="glass-btn !px-5 !py-2.5 !text-base">
          Get the app
        </a>
      </nav>

      {/* headline — suspended between the big word and the meadow */}
      <div className="relative z-20 mx-auto mt-auto flex w-full max-w-3xl flex-col items-center px-6 pb-[45vh] text-center">
        <span className="glass-chip animate-pop">a tiny helper for your day</span>
        <h1
          className="font-display animate-pop mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-[#16334f] drop-shadow-[0_2px_18px_rgba(255,255,255,0.65)] sm:text-5xl md:text-6xl"
          style={{ animationDelay: '0.08s' }}
        >
          Get your day back.
        </h1>
        <p
          className="animate-pop mt-4 max-w-xl text-lg font-semibold leading-relaxed text-[#16334f]/75 drop-shadow-[0_2px_14px_rgba(255,255,255,0.6)] sm:text-xl"
          style={{ animationDelay: '0.16s' }}
        >
          Capture the chaos — typed or rambled — and Daylist does the doing through your
          apps, with your rules. Your hours go back to the things that matter.
        </p>
        <div className="animate-pop mt-7 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '0.24s' }}>
          <a href="https://app.daylists.co" target="_blank" rel="noreferrer" className="glass-btn glass-btn-solid">
            Get the app
          </a>
          <a href="#demo" className="glass-btn">
            See it work
            <span className="animate-bounce-soft inline-block">↓</span>
          </a>
        </div>
      </div>
    </header>
  )
}
