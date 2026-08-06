import { useState } from 'react'
import type { FormEvent } from 'react'
import Clouds from '../components/Clouds'

type ModalKind = 'faq' | 'contact' | 'privacy' | 'terms'

const FAQS = [
  ['Is Daylist free?', 'Yes. Daylist is free to start, with a macOS app and a version you can add to your phone home screen.'],
  ['Does Daylist act without asking me?', 'You keep the final say. Daylist can prepare the work, and your approval rules decide what can send, book, or post.'],
  ['Which apps does it work with?', 'Connect only the apps you choose, including Gmail, Google Calendar, Slack, Canva, LinkedIn, Instagram, Google Drive, Google Docs, Google Sheets, Notion, and Granola.'],
]

function FooterModal({ kind, onClose }: { kind: ModalKind; onClose: () => void }) {
  const [sent, setSent] = useState(false)
  const title = kind === 'faq' ? 'A few things worth knowing.' : kind === 'contact' ? 'Let’s talk.' : kind === 'privacy' ? 'Privacy policy' : 'Terms of use'

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="footer-modal-title">
      <button type="button" className="absolute inset-0 bg-[#020a14]/75 backdrop-blur-sm" onClick={onClose} aria-label="Close dialog" />
      <div className="relative max-h-[min(44rem,calc(100svh-2rem))] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/25 bg-[#07192b]/95 p-6 text-white shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-9">
        <button type="button" onClick={onClose} className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl text-white/80 transition hover:bg-white/20" aria-label="Close">
          ×
        </button>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-sky-100/55">Daylist</p>
        <h2 id="footer-modal-title" className="font-display mt-3 pr-10 text-4xl leading-none sm:text-5xl">{title}</h2>

        {kind === 'faq' && (
          <div className="mt-8 divide-y divide-white/15 rounded-[1.35rem] border border-white/15 bg-white/[0.06] px-5">
            {FAQS.map(([question, answer], index) => (
              <div key={question} className="py-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-sky-100/50">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-bold">{question}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-sky-50/70">{answer}</p>
              </div>
            ))}
          </div>
        )}

        {kind === 'contact' && (sent ? (
          <div className="mt-8 rounded-[1.35rem] border border-emerald-200/30 bg-emerald-300/10 p-6">
            <p className="text-lg font-bold">Message received.</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-sky-50/70">Thanks for reaching out. We’ll get back to you soon.</p>
          </div>
        ) : (
          <form className="mt-8 grid gap-4" onSubmit={submitContact}>
            <label className="grid gap-2 text-sm font-bold">Name<input required name="name" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-sky-200/70" placeholder="Your name" /></label>
            <label className="grid gap-2 text-sm font-bold">Email<input required type="email" name="email" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-sky-200/70" placeholder="you@example.com" /></label>
            <label className="grid gap-2 text-sm font-bold">How can we help?<textarea required name="message" rows={5} className="resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-sky-200/70" placeholder="Tell us what’s on your mind" /></label>
            <button type="submit" className="glass-btn glass-btn-solid mt-2 justify-self-start !px-5 !py-3 !text-sm">Send message</button>
          </form>
        ))}

        {kind === 'privacy' && (
          <div className="mt-8 space-y-5 text-sm font-semibold leading-relaxed text-sky-50/75">
            <p>Daylist only accesses the connected services you choose. We use that access to organize incoming work, prepare actions, and follow the rules you set.</p>
            <p>We do not sell your personal information. You can disconnect an app at any time, and we will publish fuller details about access, retention, and deletion before broader availability.</p>
            <p className="rounded-xl border border-amber-100/20 bg-amber-100/10 p-4 text-amber-50/85">This is a plain-language product placeholder, not a substitute for the final legal privacy policy.</p>
          </div>
        )}

        {kind === 'terms' && (
          <div className="mt-8 space-y-5 text-sm font-semibold leading-relaxed text-sky-50/75">
            <p>Use Daylist responsibly and only connect accounts you are authorized to use. You remain responsible for reviewing anything you approve, send, schedule, or publish.</p>
            <p>Daylist is provided as an evolving product. Features, available connections, and pricing may change as we improve the service.</p>
            <p className="rounded-xl border border-amber-100/20 bg-amber-100/10 p-4 text-amber-50/85">This is a product placeholder, not the final legal terms of use.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Closing() {
  const [modal, setModal] = useState<ModalKind | null>(null)

  return (
    <section id="get" className="dusk-gradient relative flex min-h-[92svh] flex-col overflow-hidden">
      <Clouds count={4} />

      {/* full-bleed picnic bookend behind the transparent footer */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <img
          src="/art/closing-picnic.png"
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: '50% 30%' }}
        />
      </div>

      <div className="absolute inset-x-0 top-[20%] z-[4] mx-auto w-[min(90vw,42rem)] px-4 text-center">
        <div className="rounded-[1.75rem] border border-white/65 bg-white/52 p-5 shadow-[0_16px_36px_rgba(15,54,82,0.16)] backdrop-blur-md sm:p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#111318]/50">Mac and mobile</p>
          <h2 className="font-display mt-2 text-3xl leading-none text-[#111318] sm:text-4xl">Take Daylist wherever your day happens.</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm font-semibold leading-relaxed text-[#111318]/60">Free to start on macOS, and add Daylist as an app to your mobile home screen.</p>
          <a href="https://app.daylists.co" target="_blank" rel="noreferrer" className="glass-btn glass-btn-solid mt-5 !px-6 !py-3 !text-base">Download for macOS</a>
        </div>
      </div>

      {/* footer overlays the lower edge of the picnic image so the photo carries through */}
      <footer className="relative z-[3] mt-auto overflow-hidden bg-transparent">
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-5 text-sm font-bold text-white/85">
          <span>daylist · made with care © 2026</span>
          <span className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
            <a href="https://github.com/tolu-ab/daylist" target="_blank" rel="noreferrer" className="underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white">
              GitHub
            </a>
            <button type="button" onClick={() => setModal('faq')} className="underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white">FAQs</button>
            <button type="button" onClick={() => setModal('contact')} className="underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white">Contact</button>
            <button type="button" onClick={() => setModal('privacy')} className="underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white">Privacy</button>
            <button type="button" onClick={() => setModal('terms')} className="underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white">Terms</button>
          </span>
        </div>
      </footer>
      {modal && <FooterModal kind={modal} onClose={() => setModal(null)} />}
    </section>
  )
}
