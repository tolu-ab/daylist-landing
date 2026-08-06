const FAQS = [
  ['Is Daylist free?', 'Yes. Daylist is free to start, with a macOS app and a version you can add to your phone home screen.'],
  ['Does Daylist act without asking me?', 'You keep the final say. Daylist can prepare the work, and your approval rules decide what can send, book, or post.'],
  ['Which apps does it work with?', 'Connect the apps you choose, including Gmail, Google Calendar, Slack, Canva, LinkedIn, Instagram, Google Drive, Google Docs, Google Sheets, Notion, and Granola.'],
  ['What happens to my data?', 'Privacy details are coming soon. This is where we will explain what Daylist can access, what it stores, how long it is retained, and how to disconnect an app.'],
]

export default function FAQ() {
  return (
    <section id="faq" className="relative isolate overflow-hidden bg-[#030b16] px-4 py-20 sm:px-6 sm:py-28">
      <img
        src="/art/faq-night-mountains.png"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(2,11,24,0.9)_0%,rgba(4,24,45,0.68)_50%,rgba(2,10,22,0.9)_100%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-gradient-to-t from-[#020814]/85 via-[#020814]/20 to-transparent" aria-hidden />

      <div className="relative mx-auto grid w-[min(100%,74rem)] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div className="lg:pb-7">
          <span className="inline-flex rounded-full border border-white/20 bg-[#0a2038]/55 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/75 shadow-[0_8px_28px_rgba(0,0,0,0.2)] backdrop-blur-md">
            Questions, answered
          </span>
          <h2 className="font-display mt-5 max-w-md text-4xl leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
            A few things worth knowing.
          </h2>
          <p className="mt-5 max-w-sm text-base font-semibold leading-relaxed text-sky-50/70 sm:text-lg">
            What Daylist connects to, what it can do, and where you stay in control.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/20 bg-[#07192b]/65 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl sm:p-3">
          {FAQS.map(([question, answer], index) => (
            <details
              key={question}
              className="group border-b border-white/15 px-5 py-5 last:border-b-0 sm:px-6 sm:py-6"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 text-left marker:hidden">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[10px] font-extrabold text-white/85">
                  0{index + 1}
                </span>
                <span className="flex-1 text-lg font-bold leading-snug text-white sm:text-xl">{question}</span>
                <span className="text-2xl font-normal leading-none text-white/60 transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="ml-12 max-w-xl pt-4 text-sm font-semibold leading-relaxed text-sky-50/70 sm:text-base">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
