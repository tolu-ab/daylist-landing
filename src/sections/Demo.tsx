import { useEffect, useRef, useState } from 'react'
import Clouds from '../components/Clouds'
import { MintBlob } from '../components/Plush'

type Phase = 'capture' | 'listening' | 'inbox' | 'running' | 'approval' | 'done'

type Story = {
  recall: string
  app: string
  action: string
  draft: string
  approval: string | null
  doneStamp: string
}

const RAMBLE = "reply to sofia about friday's picnic… book the dentist, morning if they have one… and post the friday update in general"
const RAMBLE_TASKS = [
  "Reply to Sofia about Friday's picnic",
  'Book the dentist — morning slot',
  'Post the Friday update in #general',
]

const STORIES: Record<string, Story> = {
  sofia: {
    recall: 'Sofia likes short replies · Friday afternoons are yours',
    app: 'Gmail',
    action: 'drafting a reply to sofia@…',
    draft: "Hi Sofia — yes to Friday! I'll bring the lemonade and a big blanket. 4pm at the usual spot? x",
    approval: 'Daylist wants to send this email',
    doneStamp: 'Sent to Sofia ✓',
  },
  dentist: {
    recall: 'mornings are for errands · never before 9am',
    app: 'Calendar',
    action: 'booking Dr. Patel — Thu 9:30am',
    draft: 'Thu 9:30am · Dr. Patel · cleaning, 30 min',
    approval: null,
    doneStamp: 'Booked — Thu 9:30am ✓',
  },
  update: {
    recall: '#general tone: short, warm, one emoji max',
    app: 'Slack',
    action: 'drafting a post to #general',
    draft: "Friday update: launch checklist is green, retro at 3, then we're out early ☀️",
    approval: 'Daylist wants to post this to #general',
    doneStamp: 'Posted to #general ✓',
  },
}

function storyFor(task: string): Story {
  const t = task.toLowerCase()
  if (t.includes('sofia') || t.includes('picnic')) return STORIES.sofia
  if (t.includes('dentist') || t.includes('book')) return STORIES.dentist
  if (t.includes('update') || t.includes('general') || t.includes('post')) return STORIES.update
  return {
    recall: "nothing yet — I'll learn as we go",
    app: 'Daylist',
    action: `drafting a plan for “${task}”`,
    draft: 'Step 1: gather what’s needed. Step 2: do the boring part. Step 3: hand you the fun part.',
    approval: 'Daylist wants to start on this',
    doneStamp: 'Plan ready ✓',
  }
}

function MicIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  )
}

function CheckBadge() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#54c489] text-white shadow-sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <path d="M4 12.5 9.5 18 20 6.5" />
      </svg>
    </span>
  )
}

export default function Demo() {
  const [phase, setPhase] = useState<Phase>('capture')
  const [typed, setTyped] = useState('')
  const [tasks, setTasks] = useState<string[]>([])
  const [transcriptLen, setTranscriptLen] = useState(0)
  const [delegated, setDelegated] = useState<string | null>(null)
  const [steps, setSteps] = useState<string[]>([])
  const [draftLen, setDraftLen] = useState(0)
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null)
  const [editing, setEditing] = useState(false)
  const [editedDraft, setEditedDraft] = useState('')
  const timers = useRef<number[]>([])

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }
  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), [])

  const story = delegated ? storyFor(delegated) : null

  /* ---- ramble: transcribe, then split into tasks ---- */
  useEffect(() => {
    if (phase !== 'listening') return
    const iv = window.setInterval(() => {
      setTranscriptLen((n) => {
        if (n >= RAMBLE.length) {
          clearInterval(iv)
          return n
        }
        return n + 2
      })
    }, 34)
    timers.current.push(iv)
    return () => clearInterval(iv)
  }, [phase])

  useEffect(() => {
    if (phase === 'listening' && transcriptLen >= RAMBLE.length) {
      later(650, () => {
        setTasks(RAMBLE_TASKS)
        setPhase('inbox')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcriptLen, phase])

  /* ---- run choreography ---- */
  useEffect(() => {
    if (phase !== 'running' || !story) return
    setSteps([])
    setDraftLen(0)
    later(500, () => setSteps(['read']))
    later(1600, () => setSteps(['read', 'recall']))
    later(2800, () => setSteps(['read', 'recall', 'tool']))
    later(3100, () => {
      const iv = window.setInterval(() => {
        setDraftLen((n) => {
          if (n >= story.draft.length) {
            clearInterval(iv)
            return n
          }
          return n + 1
        })
      }, 26)
      timers.current.push(iv)
    })
    later(3100 + story.draft.length * 26 + 700, () => {
      if (story.approval) setPhase('approval')
      else {
        setDecision('approved')
        later(1400, () => setPhase('done'))
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, delegated])

  const submitTyped = () => {
    const t = typed.trim()
    if (!t) return
    setTasks([t])
    setTyped('')
    setPhase('inbox')
  }

  const delegate = (task: string) => {
    setDelegated(task)
    setEditedDraft(storyFor(task).draft)
    setPhase('running')
  }

  const reset = () => {
    timers.current.forEach((t) => clearTimeout(t))
    timers.current = []
    setPhase('capture')
    setTasks([])
    setTranscriptLen(0)
    setDelegated(null)
    setSteps([])
    setDraftLen(0)
    setDecision(null)
    setEditing(false)
  }

  const decide = (d: 'approved' | 'rejected') => {
    setDecision(d)
    setEditing(false)
    later(1500, () => setPhase('done'))
  }

  return (
    <section id="demo" className="relative overflow-hidden bg-gradient-to-b from-[#eef8ff] via-[#f7fcff] to-[#eaf5ff] py-24 sm:py-32">
      <Clouds count={3} />

      <div className="relative z-10 mx-auto max-w-2xl px-5 text-center">
        <span className="glass-chip animate-pop">a tiny demo</span>
        <h2 className="font-display mt-5 text-4xl font-semibold tracking-tight text-[#16334f] sm:text-5xl">
          Watch Daylist do the doing
        </h2>
        <p className="mt-4 text-lg font-semibold text-[#16334f]/60">
          Ramble it in, hand it over, keep the final say.
        </p>
      </div>

      {/* device */}
      <div className="glass-deep relative z-10 mx-auto mt-12 w-[min(94vw,42rem)] rounded-[2.2rem] p-5 sm:p-7">
        {/* device top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff9d9d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd97a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8fe3b0]" />
          </div>
          <span className="glass rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#16334f]/60">
            your morning inbox
          </span>
        </div>

        <div className="mt-6 min-h-[24rem]">
          {/* -------- capture -------- */}
          {phase === 'capture' && (
            <div className="animate-pop">
              <div className="glass flex items-center gap-3 rounded-2xl p-3 pl-5">
                <input
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitTyped()}
                  placeholder="Dump a task here…"
                  className="w-full bg-transparent text-base font-bold text-[#16334f] outline-none placeholder:text-[#16334f]/40"
                />
                {typed.trim() ? (
                  <button onClick={submitTyped} className="glass-btn glass-btn-solid !px-4 !py-2 !text-sm">
                    Add →
                  </button>
                ) : (
                  <button
                    onClick={() => setPhase('listening')}
                    className="glass-btn glass-btn-solid relative !rounded-full !p-3"
                    aria-label="Ramble by voice"
                  >
                    <span className="animate-soft-pulse absolute inset-0 rounded-full border-2 border-white/80" />
                    <MicIcon />
                  </button>
                )}
              </div>
              <p className="mt-4 text-sm font-bold text-[#16334f]/50">
                …or tap the mic and just ramble. Daylist sorts it out.
              </p>
            </div>
          )}

          {/* -------- listening -------- */}
          {phase === 'listening' && (
            <div className="animate-pop">
              <div className="glass flex items-center gap-1.5 rounded-2xl px-5 py-4">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <span
                    key={i}
                    className="wave-bar mx-0.5 inline-block h-6 w-1.5 rounded-full bg-[#54a6e8]"
                    style={{ animationDelay: `${i * 0.11}s` }}
                  />
                ))}
                <span className="ml-3 text-sm font-extrabold uppercase tracking-widest text-[#16334f]/50">
                  listening…
                </span>
              </div>
              <p className="mt-5 min-h-[3.5rem] text-left text-lg font-semibold italic leading-relaxed text-[#16334f]/80">
                “{RAMBLE.slice(0, transcriptLen)}
                <span className="animate-soft-pulse">▍</span>”
              </p>
            </div>
          )}

          {/* -------- inbox -------- */}
          {phase === 'inbox' && (
            <div className="animate-pop">
              <p className="mb-4 text-left text-sm font-extrabold uppercase tracking-widest text-[#16334f]/50">
                sorted for you — hand one over
              </p>
              <div className="space-y-3">
                {tasks.map((t, i) => (
                  <div
                    key={t}
                    className="glass animate-pop flex items-center justify-between gap-3 rounded-2xl p-4 text-left"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    <span className="font-bold text-[#16334f]">{t}</span>
                    <button
                      onClick={() => delegate(t)}
                      className="glass-btn glass-btn-solid shrink-0 !px-4 !py-2 !text-sm"
                    >
                      Delegate →
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={reset} className="mt-5 text-sm font-bold text-[#16334f]/45 underline decoration-dotted underline-offset-4 hover:text-[#16334f]/70">
                start over
              </button>
            </div>
          )}

          {/* -------- running / approval -------- */}
          {(phase === 'running' || phase === 'approval') && story && (
            <div className="animate-pop text-left">
              <div className="flex items-center gap-3">
                <span className="glass inline-flex h-12 w-12 items-center justify-center rounded-full">
                  <MintBlob size={40} />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-[#16334f]">Daylist is on it</p>
                  <p className="text-sm font-bold text-[#16334f]/50">“{delegated}”</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {steps.includes('read') && (
                  <div className="animate-pop flex items-center gap-2.5 text-[15px] font-bold text-[#16334f]/75">
                    <CheckBadge /> Read the task
                  </div>
                )}
                {steps.includes('recall') && (
                  <div className="animate-pop flex items-start gap-2.5 text-[15px] font-bold text-[#16334f]/75">
                    <CheckBadge />
                    <span>
                      Recalled what I know about you
                      <span className="mt-0.5 block text-sm font-semibold italic text-[#16334f]/50">
                        {story.recall}
                      </span>
                    </span>
                  </div>
                )}
                {steps.includes('tool') && (
                  <div className="animate-pop">
                    <div className="flex items-center gap-2.5 text-[15px] font-bold text-[#16334f]/75">
                      {decision ? <CheckBadge /> : (
                        <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
                          <span className="shimmer absolute inset-0 rounded-full" />
                          <span className="h-2 w-2 rounded-full bg-[#54a6e8]" />
                        </span>
                      )}
                      <span>
                        <span className="glass-chip !px-2.5 !py-0.5 mr-1.5 !text-xs">{story.app}</span>
                        {decision ? story.doneStamp : story.action}
                      </span>
                    </div>
                    <div className="glass mt-3 rounded-2xl p-4 text-[15px] font-semibold leading-relaxed text-[#16334f]/85">
                      {editing ? (
                        <textarea
                          value={editedDraft}
                          onChange={(e) => setEditedDraft(e.target.value)}
                          rows={3}
                          className="w-full resize-none rounded-xl bg-white/60 p-3 font-semibold outline-none ring-2 ring-[#54a6e8]/40"
                        />
                      ) : (
                        <>
                          {story.draft.slice(0, draftLen)}
                          {draftLen < story.draft.length && <span className="animate-soft-pulse">▍</span>}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {phase === 'approval' && (
                <div className="glass-deep animate-pop mt-5 rounded-2xl p-4">
                  <p className="font-display text-base font-semibold text-[#16334f]">
                    {editing ? 'Make it yours, then send it off' : story.approval}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {editing ? (
                      <button onClick={() => decide('approved')} className="glass-btn glass-btn-solid !px-5 !py-2 !text-sm">
                        Send it ✓
                      </button>
                    ) : (
                      <>
                        <button onClick={() => decide('approved')} className="glass-btn glass-btn-solid !px-5 !py-2 !text-sm">
                          Approve
                        </button>
                        <button onClick={() => setEditing(true)} className="glass-btn !px-5 !py-2 !text-sm">
                          Edit
                        </button>
                        <button onClick={() => decide('rejected')} className="glass-btn !px-5 !py-2 !text-sm">
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                  <p className="mt-2.5 text-xs font-bold text-[#16334f]/45">
                    your approval rules called this one in — nothing sends without you
                  </p>
                </div>
              )}

              {decision === 'rejected' && (
                <p className="animate-pop mt-4 text-sm font-bold italic text-[#16334f]/60">
                  Okay — kept it as a draft. Remembered: you like to send these yourself.
                </p>
              )}
            </div>
          )}

          {/* -------- done -------- */}
          {phase === 'done' && (
            <div className="animate-pop relative flex flex-col items-center pt-6 text-center">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="animate-rise absolute bottom-16 h-2.5 w-2.5 rounded-full bg-[#8fe3b0]"
                  style={{ left: `${18 + i * 16}%`, animationDelay: `${i * 0.4}s`, opacity: 0 }}
                />
              ))}
              <span className="glass inline-flex h-20 w-20 items-center justify-center rounded-full">
                <MintBlob size={64} />
              </span>
              <p className="font-display mt-5 text-2xl font-semibold text-[#16334f]">
                {decision === 'rejected' ? 'Noted — it stays with you.' : 'All sorted — and it’s not even 9am.'}
              </p>
              <span className="glass-chip mt-4 !text-base">≈ 26 minutes handed back to your morning</span>
              <p className="mt-3 max-w-sm text-[15px] font-semibold text-[#16334f]/55">
                That’s a slow coffee. A chapter of your book. A little bit of nothing-at-all.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a href="#get" className="glass-btn glass-btn-solid !px-6 !py-2.5 !text-base">Get the app</a>
                <button onClick={reset} className="glass-btn !px-6 !py-2.5 !text-base">Replay ↺</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
