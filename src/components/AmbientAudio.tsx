import { useEffect, useRef, useState } from 'react'

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5z" />
      {muted ? (
        <>
          <path d="m17 9 4 6" />
          <path d="m21 9-4 6" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 6a9 9 0 0 1 0 12" />
        </>
      )}
    </svg>
  )
}

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = new Audio('/audio/ambient.m4a')
    el.loop = true
    el.volume = 0.35
    el.preload = 'auto'
    audioRef.current = el

    // Try to start on arrival. Browsers block audible autoplay until the visitor
    // has interacted with the page, so a rejection just leaves it paused — the
    // button below is then the way in.
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))

    return () => {
      el.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Turn ambient sound off' : 'Turn ambient sound on'}
      title={playing ? 'Sound on' : 'Sound off'}
      className="glass-surface fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-[#111318] hover:scale-[0.975] active:scale-95"
    >
      <SpeakerIcon muted={!playing} />
      {playing && (
        <span className="absolute inset-0 rounded-full ring-2 ring-[#54c489]/50" aria-hidden />
      )}
    </button>
  )
}
