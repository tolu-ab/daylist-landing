/* Felt-textured plush characters + meadow scene, drawn in SVG.
   feTurbulence + feDisplacementMap gives bodies their fuzzy felt edge. */

const INK = '#33475c'

export function MintBlob({ size = 96, filterId = 'felt-mascot' }: { size?: number; filterId?: string }) {
  return (
    <svg width={size} height={size} viewBox="-70 -90 140 160" aria-hidden>
      <defs>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" />
        </filter>
        <radialGradient id={`${filterId}-g`} cx="35%" cy="25%" r="90%">
          <stop offset="0%" stopColor="#a9ecc4" />
          <stop offset="100%" stopColor="#54c489" />
        </radialGradient>
      </defs>
      <g filter={`url(#${filterId})`}>
        {/* sprout */}
        <path d="M0,-58 C0,-66 0,-70 0,-74" stroke="#3ea96f" strokeWidth="5" strokeLinecap="round" fill="none" />
        <ellipse cx="-9" cy="-76" rx="9" ry="5" fill="#54c489" transform="rotate(-28 -9 -76)" />
        <ellipse cx="9" cy="-76" rx="9" ry="5" fill="#54c489" transform="rotate(28 9 -76)" />
        {/* body */}
        <path
          d="M-58,10 C-58,-38 -30,-58 0,-58 C30,-58 58,-38 58,10 C58,34 40,52 20,54 C10,55 6,46 0,46 C-6,46 -10,55 -20,54 C-40,52 -58,34 -58,10 Z"
          fill={`url(#${filterId}-g)`}
        />
        {/* sheen */}
        <ellipse cx="-22" cy="-30" rx="20" ry="12" fill="#ffffff" opacity="0.35" />
      </g>
      {/* face (kept crisp, unfuzzed) */}
      <circle cx="-17" cy="-12" r="4.6" fill={INK} />
      <circle cx="17" cy="-12" r="4.6" fill={INK} />
      <path d="M-10,5 Q0,13 10,5" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export default function PlushScene({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        <filter id="felt-grass" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
        </filter>
        <filter id="felt-body" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="10" />
        </filter>
        <linearGradient id="grass-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7cc465" />
          <stop offset="100%" stopColor="#4f9a48" />
        </linearGradient>
        <linearGradient id="grass-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9bd97b" />
          <stop offset="100%" stopColor="#5fae50" />
        </linearGradient>
        <radialGradient id="mint-g" cx="35%" cy="25%" r="90%">
          <stop offset="0%" stopColor="#a9ecc4" />
          <stop offset="100%" stopColor="#54c489" />
        </radialGradient>
        <radialGradient id="yellow-g" cx="35%" cy="25%" r="90%">
          <stop offset="0%" stopColor="#ffe49b" />
          <stop offset="100%" stopColor="#f2b348" />
        </radialGradient>
        <radialGradient id="pink-g" cx="35%" cy="25%" r="90%">
          <stop offset="0%" stopColor="#ffc0df" />
          <stop offset="100%" stopColor="#ef82bd" />
        </radialGradient>
        <radialGradient id="blue-g" cx="35%" cy="25%" r="90%">
          <stop offset="0%" stopColor="#aedaff" />
          <stop offset="100%" stopColor="#63aaeF" />
        </radialGradient>
      </defs>

      {/* hills */}
      <g filter="url(#felt-grass)">
        <path d="M0,300 C360,180 900,160 1440,260 L1440,520 L0,520 Z" fill="url(#grass-back)" />
        <path d="M0,392 C420,308 980,326 1440,404 L1440,520 L0,520 Z" fill="url(#grass-front)" />
      </g>

      {/* daisies on the front hill */}
      {[
        [180, 452], [340, 428], [520, 470], [760, 452], [1020, 440], [1230, 462], [1350, 430], [80, 490],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${i % 3 === 0 ? 1.25 : 0.95})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 5} cy={Math.sin((a * Math.PI) / 180) * 5} r="3.4" fill="#ffffff" />
          ))}
          <circle r="2.8" fill="#ffd54d" />
        </g>
      ))}

      {/* soft contact shadows */}
      <ellipse cx="620" cy="415" rx="66" ry="12" fill="#2e6b33" opacity="0.28" />
      <ellipse cx="782" cy="436" rx="70" ry="12" fill="#2e6b33" opacity="0.28" />
      <ellipse cx="948" cy="412" rx="58" ry="11" fill="#2e6b33" opacity="0.28" />
      <ellipse cx="1092" cy="442" rx="58" ry="11" fill="#2e6b33" opacity="0.28" />

      {/* mint blob */}
      <g transform="translate(620 366)">
        <g filter="url(#felt-body)">
          <path d="M0,-58 C0,-66 0,-70 0,-74" stroke="#3ea96f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <ellipse cx="-9" cy="-76" rx="9" ry="5" fill="#54c489" transform="rotate(-28 -9 -76)" />
          <ellipse cx="9" cy="-76" rx="9" ry="5" fill="#54c489" transform="rotate(28 9 -76)" />
          <path
            d="M-58,10 C-58,-38 -30,-58 0,-58 C30,-58 58,-38 58,10 C58,34 40,52 20,54 C10,55 6,46 0,46 C-6,46 -10,55 -20,54 C-40,52 -58,34 -58,10 Z"
            fill="url(#mint-g)"
          />
          <ellipse cx="-22" cy="-30" rx="20" ry="12" fill="#ffffff" opacity="0.35" />
        </g>
        <circle cx="-17" cy="-12" r="4.6" fill={INK} />
        <circle cx="17" cy="-12" r="4.6" fill={INK} />
        <path d="M-10,5 Q0,13 10,5" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>

      {/* yellow blob — laughing */}
      <g transform="translate(782 380) scale(1.06)">
        <g filter="url(#felt-body)">
          <ellipse cx="-60" cy="14" rx="14" ry="10" fill="url(#yellow-g)" transform="rotate(24 -60 14)" />
          <ellipse cx="60" cy="14" rx="14" ry="10" fill="url(#yellow-g)" transform="rotate(-24 60 14)" />
          <path
            d="M-62,12 C-62,-40 -32,-62 0,-62 C32,-62 62,-40 62,12 C62,44 36,60 0,60 C-36,60 -62,44 -62,12 Z"
            fill="url(#yellow-g)"
          />
          <ellipse cx="-24" cy="-32" rx="22" ry="12" fill="#ffffff" opacity="0.35" />
        </g>
        <circle cx="-18" cy="-16" r="4.6" fill={INK} />
        <circle cx="18" cy="-16" r="4.6" fill={INK} />
        <ellipse cx="0" cy="8" rx="11" ry="13" fill={INK} />
        <ellipse cx="0" cy="14" rx="6.5" ry="5.5" fill="#ff9d9d" />
      </g>

      {/* pink flower */}
      <g transform="translate(948 366) scale(0.95)">
        <g filter="url(#felt-body)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx={Math.cos(((a - 90) * Math.PI) / 180) * 36}
              cy={Math.sin(((a - 90) * Math.PI) / 180) * 36}
              rx="24"
              ry="30"
              fill="url(#pink-g)"
              transform={`rotate(${a} ${Math.cos(((a - 90) * Math.PI) / 180) * 36} ${Math.sin(((a - 90) * Math.PI) / 180) * 36})`}
            />
          ))}
          <circle r="30" fill="#ffd3e8" />
          <ellipse cx="-10" cy="-12" rx="12" ry="7" fill="#ffffff" opacity="0.4" />
        </g>
        <circle cx="-10" cy="-4" r="3.8" fill={INK} />
        <circle cx="10" cy="-4" r="3.8" fill={INK} />
        <path d="M-8,8 Q0,15 8,8" stroke={INK} strokeWidth="3.6" strokeLinecap="round" fill="none" />
      </g>

      {/* blue star — sleepy */}
      <g transform="translate(1092 396) scale(0.92)">
        <g filter="url(#felt-body)">
          <path
            d="M0,-58 L16,-22 L55,-18 L26,8 L34,47 L0,27 L-34,47 L-26,8 L-55,-18 L-16,-22 Z"
            fill="url(#blue-g)"
            stroke="url(#blue-g)"
            strokeWidth="26"
            strokeLinejoin="round"
          />
          <path d="M40,-46 C48,-56 58,-54 62,-46" stroke="#63aaef" strokeWidth="5" strokeLinecap="round" fill="none" />
          <ellipse cx="-18" cy="-22" rx="16" ry="9" fill="#ffffff" opacity="0.35" />
        </g>
        <path d="M-20,-8 Q-15,-14 -10,-8" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M10,-8 Q15,-14 20,-8" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="0" cy="8" r="3.4" fill={INK} />
      </g>
    </svg>
  )
}
