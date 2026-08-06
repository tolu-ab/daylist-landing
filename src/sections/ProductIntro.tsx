const STEPS = [
  ['Bring it in', 'A thought, an email, a meeting, or a message all land in one place.'],
  ['Make sense of it', 'Daylist finds the next useful action and the context around it.'],
  ['Keep your say-so', 'It can draft, schedule, and prepare the work while your rules stay in charge.'],
]

export default function ProductIntro() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[#F8EEE6] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-12 h-80 w-80 rounded-full bg-[#f8c5ae]/45 blur-3xl" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[#f7df8d]/40 blur-3xl" />
      </div>
      <div className="relative mx-auto w-[min(90vw,72rem)]">
        <div className="mx-auto max-w-3xl text-center">
          <span className="glass-chip inline-flex !text-xs font-extrabold uppercase tracking-[0.15em] text-[#111318]/55">Less noise. More done.</span>
          <h2 className="font-display mt-5 text-4xl leading-[1.04] tracking-tight text-[#111318] sm:text-5xl">A calmer way to run your day.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-[#111318]/65 sm:text-xl">Daylist turns noise from your apps into completed tasks, without making you manage another system.</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map(([title, body], index) => (
            <article key={title} className="rounded-[1.6rem] border border-white/70 bg-white/55 p-6 shadow-[0_12px_30px_rgba(81,57,61,0.07)]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#111318]/90 text-xs font-extrabold text-white">0{index + 1}</span>
              <h3 className="font-display mt-5 text-2xl text-[#111318]">{title}</h3>
              <p className="mt-3 text-base font-semibold leading-relaxed text-[#111318]/55">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
