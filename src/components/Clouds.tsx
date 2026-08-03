type CloudSpec = {
  top: string
  scale: number
  duration: number
  delay: number
  opacity: number
}

const CLOUDS: CloudSpec[] = [
  { top: '6%', scale: 1.1, duration: 150, delay: -12, opacity: 0.9 },
  { top: '16%', scale: 0.7, duration: 110, delay: -64, opacity: 0.7 },
  { top: '28%', scale: 1.5, duration: 190, delay: -100, opacity: 0.95 },
  { top: '38%', scale: 0.55, duration: 95, delay: -30, opacity: 0.55 },
  { top: '10%', scale: 0.85, duration: 130, delay: -90, opacity: 0.8 },
  { top: '46%', scale: 0.9, duration: 170, delay: -140, opacity: 0.65 },
]

function Cloud({ spec }: { spec: CloudSpec }) {
  return (
    <div
      className="cloud-drift absolute left-0"
      style={{
        top: spec.top,
        opacity: spec.opacity,
        animationDuration: `${spec.duration}s`,
        animationDelay: `${spec.delay}s`,
      }}
    >
      <div className="animate-float relative" style={{ animationDelay: `${spec.delay / 6}s` }}>
        <div style={{ transform: `scale(${spec.scale})`, transformOrigin: 'left top' }}>
          <div className="relative h-28 w-72">
            <div className="cloud-blob" style={{ left: '2%', bottom: '-10%', width: '58%', height: '100%' }} />
            <div className="cloud-blob" style={{ left: '28%', bottom: '4%', width: '64%', height: '130%' }} />
            <div className="cloud-blob" style={{ left: '62%', bottom: '-8%', width: '46%', height: '92%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Clouds({ count = CLOUDS.length }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {CLOUDS.slice(0, count).map((c, i) => (
        <Cloud key={i} spec={c} />
      ))}
    </div>
  )
}
