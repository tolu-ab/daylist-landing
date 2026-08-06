import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/* The states a task moves through inside Daylist, cycled in the hero so the
   chip reads as a live status rather than a static tagline. */
const STATES = [
  { label: 'captured', color: '#54a6e8' },
  { label: 'sorting', color: '#b98cff' },
  { label: 'working', color: '#f2b348' },
  { label: 'scheduled', color: '#54c489' },
  { label: 'replied', color: '#54c489' },
  { label: 'created', color: '#54c489' },
  { label: 'handled', color: '#54c489' },
  { label: 'done', color: '#54c489' },
]

export default function StatusChip() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [width, setWidth] = useState<number>()
  const measureRef = useRef<HTMLSpanElement>(null)

  // re-measure the label's natural width whenever it changes, so the pill can
  // animate to the new size instead of staying a fixed width for every state
  useLayoutEffect(() => {
    if (measureRef.current) setWidth(measureRef.current.offsetWidth)
  }, [index])

  useEffect(() => {
    const iv = window.setInterval(() => {
      // fade the label out, swap it, fade back in
      setVisible(false)
      window.setTimeout(() => {
        setIndex((n) => (n + 1) % STATES.length)
        setVisible(true)
      }, 280)
    }, 2600)
    return () => window.clearInterval(iv)
  }, [])

  const state = STATES[index]

  return (
    <span
      className="glass-chip animate-pop inline-flex items-center justify-center gap-2 !text-xs font-extrabold uppercase tracking-wider"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ backgroundColor: state.color }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full transition-colors duration-300"
          style={{ backgroundColor: state.color }}
        />
      </span>
      {/* width tracks the current label's natural size and animates between them,
          so short words like "done" don't sit inside oversized padding */}
      <span
        className="relative inline-block overflow-hidden text-left transition-[width] duration-300 ease-out"
        style={{ width }}
      >
        <span
          className="inline-block whitespace-nowrap transition-all duration-300"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-4px)',
          }}
        >
          {state.label}
        </span>
        <span ref={measureRef} className="invisible absolute left-0 top-0 whitespace-nowrap" aria-hidden>
          {state.label}
        </span>
      </span>
    </span>
  )
}
