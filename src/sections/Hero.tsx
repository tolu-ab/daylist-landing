import Clouds from '../components/Clouds'
import LogoMark from '../components/LogoMark'
import StatusChip from '../components/StatusChip'

export default function Hero() {
  return (
    // hero — full-bleed sky, meadow, nav, and headline
    <div className="sky-gradient relative flex min-h-[100svh] flex-col overflow-hidden">
        {/* full-bleed meadow artwork, top edge melted into the CSS sky */}
        <img
          src="/art/hero-meadow.jpeg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: '50% 100%',
            transform: 'translateY(6%)',
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
            Get the app
          </a>
        </header>

        {/* headline */}
        <div className="relative z-20 mx-auto mt-auto flex w-full max-w-3xl flex-col items-center px-6 pb-[38vh] text-center">
          <StatusChip />
          <h1
            className="font-display animate-pop mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-[#111318] drop-shadow-[0_2px_18px_rgba(255,255,255,0.65)] sm:text-5xl md:text-6xl"
            style={{ animationDelay: '0.08s' }}
          >
            Get your day back.
          </h1>
          <p
            className="animate-pop mt-4 max-w-xl text-lg font-semibold leading-relaxed text-[#111318]/75 drop-shadow-[0_2px_14px_rgba(255,255,255,0.6)] sm:text-xl"
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
      </div>
  )
}
