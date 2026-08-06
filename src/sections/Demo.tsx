import { useCallback, useEffect, useReducer, useState, type ReactNode } from 'react'

type LoopItem = {
  id: string
  source: string
  icon?: string
  color: string
  title: string
  detail: string
  result: string
  resultDetail: string
}

const SCENARIOS = [
  ['Northstar launch', 'revised deck'], ['pricing review', 'updated pricing'], ['client review', 'meeting notes'],
  ['Friday update', 'status summary'], ['campaign brief', 'creative direction'], ['partner follow-up', 'next steps'],
  ['design handoff', 'final assets'], ['roadmap review', 'open decisions'], ['team offsite', 'travel details'],
  ['onboarding plan', 'welcome materials'], ['budget check-in', 'spend forecast'], ['research sprint', 'key findings'],
  ['board prep', 'leadership summary'], ['product release', 'launch checklist'], ['sales proposal', 'client feedback'],
  ['content calendar', 'draft approvals'], ['quarterly planning', 'priorities'], ['customer interview', 'takeaways'],
  ['website refresh', 'final copy'], ['team retro', 'action items'],
] as const

const CONNECTIONS = [
  ['Gmail', '/icons/apps/gmail.svg', 'bg-[#f5b7c4]/70'], ['Calendar', '/icons/apps/google_calendar.svg', 'bg-[#b9dcf5]/75'],
  ['Slack', '/icons/apps/slack.svg', 'bg-[#d0c4f4]/75'], ['Canva', '/icons/apps/canva.svg', 'bg-[#bdeef0]/70'],
  ['LinkedIn', '/icons/apps/linkedin.svg', 'bg-[#b7dafa]/70'], ['Instagram', '/icons/apps/instagram.svg', 'bg-[#f7c4d6]/70'],
  ['Google Drive', '/icons/apps/google_drive.svg', 'bg-[#c2d8f6]/70'], ['Google Docs', '/icons/apps/google_docs.svg', 'bg-[#c5dcfa]/70'],
  ['Google Sheets', '/icons/apps/google_sheets.svg', 'bg-[#c5ebce]/70'], ['Notion', '/icons/apps/notion.svg', 'bg-white/75'],
  ['Granola', undefined, 'bg-[#e9d4ad]/70'],
] as const

function copyFor(source: string, subject: string, request: string) {
  switch (source) {
    case 'Gmail': return { title: `${subject} email`, detail: `A client asked about the ${request}`, result: `Drafted a reply about ${subject}`, resultDetail: 'Ready for your approval' }
    case 'Calendar': return { title: `${subject} moved`, detail: `A ${request} block needs new time`, result: `Protected time for ${subject}`, resultDetail: 'Based on your free time' }
    case 'Slack': return { title: `#launch needs you`, detail: `The team is asking for the ${request}`, result: `Pulled together the ${request}`, resultDetail: `Ready for the ${subject}` }
    case 'Canva': return { title: `${subject} design ready`, detail: `The ${request} is ready to export`, result: `Prepared the ${subject} PDF`, resultDetail: 'Ready for your approval' }
    case 'LinkedIn': return { title: `${subject} post draft`, detail: `A post about the ${request} is ready to review`, result: `Prepared the ${subject} post`, resultDetail: 'Waiting for your approval' }
    case 'Instagram': return { title: `${subject} campaign draft`, detail: `The ${request} needs a final caption`, result: `Prepared the ${subject} post`, resultDetail: 'Ready for your approval' }
    case 'Google Drive': return { title: `${subject} file updated`, detail: `The latest ${request} is ready in Drive`, result: `Attached the ${request} to the right thread`, resultDetail: 'Ready for your approval' }
    case 'Google Docs': return { title: `${subject} brief changed`, detail: `New context was added to the ${request}`, result: `Collected the ${request} into the plan`, resultDetail: `Ready for the ${subject}` }
    case 'Google Sheets': return { title: `${subject} tracker update`, detail: `The ${request} has new owners and dates`, result: `Updated the ${subject} tracker`, resultDetail: 'Based on the latest schedule' }
    case 'Notion': return { title: `${subject} workspace update`, detail: `The ${request} has new decisions to sort`, result: `Turned decisions into follow-ups`, resultDetail: `Added to the ${subject} plan` }
    default: return { title: `${subject} meeting notes`, detail: `Key ${request} are ready to review`, result: `Pulled follow-ups from the notes`, resultDetail: `Added to the ${subject} plan` }
  }
}

const LOOP_ITEMS: LoopItem[] = SCENARIOS.flatMap(([subject, request], index) =>
  CONNECTIONS.map(([source, icon, color]) => ({
    id: `${source}-${index}`,
    source,
    icon,
    color,
    ...copyFor(source, subject, request),
  })),
)

const WORKING_STATUSES = ['planning', 'sorting', 'drafting', 'working']
const HANDLED_STATUSES = ['handled', 'scheduled', 'ready', 'drafted']

const SUPPORTED_APPS = [
  { name: 'Gmail', source: 'Gmail', icon: '/icons/apps/gmail.svg', tone: 'bg-[#f5b7c4]/60' },
  { name: 'Google Calendar', source: 'Calendar', icon: '/icons/apps/google_calendar.svg', tone: 'bg-[#b9dcf5]/65' },
  { name: 'Slack', source: 'Slack', icon: '/icons/apps/slack.svg', tone: 'bg-[#d0c4f4]/65' },
  { name: 'Canva', source: 'Canva', icon: '/icons/apps/canva.svg', tone: 'bg-[#bdeef0]/70' },
  { name: 'LinkedIn', source: 'LinkedIn', icon: '/icons/apps/linkedin.svg', tone: 'bg-[#b7dafa]/70' },
  { name: 'Instagram', source: 'Instagram', icon: '/icons/apps/instagram.svg', tone: 'bg-[#f7c4d6]/70' },
  { name: 'Google Drive', source: 'Google Drive', icon: '/icons/apps/google_drive.svg', tone: 'bg-[#c5dcfa]/70' },
  { name: 'Google Docs', source: 'Google Docs', icon: '/icons/apps/google_docs.svg', tone: 'bg-[#c5dcfa]/70' },
  { name: 'Google Sheets', source: 'Google Sheets', icon: '/icons/apps/google_sheets.svg', tone: 'bg-[#c5ebce]/70' },
  { name: 'Notion', source: 'Notion', icon: '/icons/apps/notion.svg', tone: 'bg-white/75' },
  { name: 'Granola', source: 'Granola', tone: 'bg-[#e9d4ad]/70' },
]

type PipelineState = {
  inbox: [LoopItem, LoopItem]
  working: LoopItem | null
  completed: LoopItem | null
  nextId: string
  step: number
}

type PipelineAction =
  | { type: 'advance'; items: LoopItem[] }
  | { type: 'reconfigure'; items: LoopItem[] }
  | { type: 'prioritize'; items: LoopItem[]; source: string }

function createInitialState(items: LoopItem[]): PipelineState {
  return {
    inbox: [items[0], items[1] ?? items[0]],
    working: null,
    completed: null,
    nextId: (items[2] ?? items[0]).id,
    step: 0,
  }
}

function pipelineReducer(state: PipelineState, action: PipelineAction): PipelineState {
  const { items } = action

  if (action.type === 'prioritize') {
    const sourceItems = items.filter((item) => item.source === action.source)
    if (!sourceItems.length) return state
    const candidate = sourceItems[(state.step + 1) % sourceItems.length]
    return { ...state, nextId: candidate.id }
  }

  if (action.type === 'reconfigure') {
    return items.some((item) => item.id === state.nextId)
      ? state
      : { ...state, nextId: items[0].id }
  }

  if (99 - state.step <= 2) return createInitialState(items)
  const nextIndex = items.findIndex((item) => item.id === state.nextId)
  const nextItem = items[nextIndex === -1 ? 0 : nextIndex]
  const afterNext = items[(nextIndex === -1 ? 1 : nextIndex + 1) % items.length]

  return {
    inbox: [state.inbox[1], nextItem],
    working: state.inbox[0],
    completed: state.working,
    nextId: afterNext.id,
    step: state.step + 1,
  }
}

function AppIcon({ src, label, className = 'h-4 w-4' }: { src?: string; label: string; className?: string }) {
  if (!src) return <span aria-hidden className={`${className} flex items-center justify-center rounded-full bg-[#111318]/75 text-[8px] font-black text-white`}>{label.slice(0, 1)}</span>
  return <img src={src} alt="" className={`${className} object-contain`} />
}

function ColumnStatus({ label, color }: { label: string; color: string }) {
  return (
    <span className="glass-chip inline-flex items-center gap-2 !text-[10px] font-extrabold uppercase tracking-[0.14em]">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: color }} />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      </span>
      {label}
    </span>
  )
}

function SourceCard({ item, count, className = '', muted = false }: { item: LoopItem; count?: number; className?: string; muted?: boolean }) {
  return (
    <article className={`relative h-[7.5rem] overflow-visible rounded-[1.35rem] border border-white/90 bg-[#faf7f1]/95 p-2.5 text-left shadow-[0_14px_30px_rgba(1,10,24,0.28)] sm:h-[8rem] sm:p-3 ${muted ? 'opacity-55' : ''} ${className}`}>
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#111827]/70 ${item.color}`}>
        <AppIcon src={item.icon} label={item.source} className="h-3.5 w-3.5" />
        {item.source}
      </span>
      {count !== undefined && (
        <span className="demo-notification-badge" aria-label={`${count} new ${item.source} notifications`}>
          <span className="animate-pop">{count}</span>
        </span>
      )}
      <p className="mt-3 line-clamp-1 text-base font-bold text-[#172033]">{item.title}</p>
      <p className="mt-1 line-clamp-2 text-sm font-semibold leading-relaxed text-[#4f5c6d]">{item.detail}</p>
    </article>
  )
}

function CompletedCard({ item, className = '' }: { item: LoopItem; className?: string }) {
  return (
    <article className={`relative h-[7.5rem] overflow-visible rounded-[1.35rem] border border-[#ecfff3]/90 bg-[#e8f4ec]/95 p-2.5 text-left shadow-[0_14px_30px_rgba(1,10,24,0.28)] sm:h-[8rem] sm:p-3 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#111827]/70 ${item.color}`}>
          <AppIcon src={item.icon} label={item.source} className="h-3.5 w-3.5" />
          {item.source}
        </span>
        <span className="rounded-full bg-[#bdebd4]/70 px-2 py-1 text-[10px] font-bold text-[#287053]">done</span>
      </div>
      <p className="mt-3 line-clamp-1 text-base font-bold text-[#172033]">{item.result}</p>
      <p className="mt-1 line-clamp-2 text-sm font-semibold leading-relaxed text-[#456153]">{item.resultDetail}</p>
    </article>
  )
}

function QueuedPreview({ item }: { item: LoopItem }) {
  return (
    <div className="demo-pipeline-incoming flex h-9 items-center gap-2 rounded-xl border border-white/75 bg-[#eef4f6]/90 px-3 text-left text-xs font-bold text-[#465566]">
      <AppIcon src={item.icon} label={item.source} className="h-3.5 w-3.5" />
      <span className="truncate">{item.source} · next up</span>
    </div>
  )
}

function PipelineColumn({ status, color, children }: { status: string; color: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.6rem] border border-white/15 bg-[#03192d]/58 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm sm:p-4">
      <div className="mb-4 flex justify-end">
        <ColumnStatus label={status} color={color} />
      </div>
      {children}
    </section>
  )
}

export function DemoPipeline({
  items,
  prioritySources,
  onPriorityApplied,
}: {
  items: LoopItem[]
  prioritySources: string[]
  onPriorityApplied: (source: string) => void
}) {
  const [state, dispatch] = useReducer(pipelineReducer, items, createInitialState)

  useEffect(() => {
    const interval = window.setInterval(() => dispatch({ type: 'advance', items }), 3000)
    return () => window.clearInterval(interval)
  }, [items])

  useEffect(() => {
    dispatch({ type: 'reconfigure', items })
  }, [items])

  useEffect(() => {
    const source = prioritySources[0]
    if (!source) return
    dispatch({ type: 'prioritize', items, source })
    onPriorityApplied(source)
  }, [items, onPriorityApplied, prioritySources])

  const [inboxCurrent, inboxNext] = state.inbox
  const working = state.working
  const completed = state.completed
  const remainingNotifications = Math.max(0, 99 - state.step)
  const workingStatus = WORKING_STATUSES[state.step % WORKING_STATUSES.length]
  const handledStatus = HANDLED_STATUSES[state.step % HANDLED_STATUSES.length]

  return (
    <div className="w-full pb-4">
      <div className="hidden min-w-[46rem] grid-cols-3 gap-4 overflow-x-auto md:grid">
        <PipelineColumn status="incoming" color="#54a6e8">
          <div className="flex flex-col gap-2">
            <SourceCard key={`inbox-${state.step}-${inboxCurrent.id}`} item={inboxCurrent} count={remainingNotifications} className="demo-pipeline-promote" />
            <QueuedPreview key={`incoming-${state.step}-${inboxNext.id}`} item={inboxNext} />
          </div>
        </PipelineColumn>

        <PipelineColumn status={workingStatus} color="#f2b348">
          {working
            ? <SourceCard key={`working-${state.step}-${working.id}`} item={working} className="demo-pipeline-working" />
            : <div className="flex h-[8rem] items-center justify-center rounded-[1.35rem] border border-dashed border-white/35 bg-[#071d31]/45 px-5 text-center text-sm font-semibold text-white/70">Daylist picks up the next item.</div>}
        </PipelineColumn>

        <PipelineColumn status={handledStatus} color="#54c489">
          {completed
            ? <CompletedCard key={`completed-${state.step}-${completed.id}`} item={completed} className="demo-pipeline-complete" />
            : <div className="flex h-[8rem] items-center justify-center rounded-[1.35rem] border border-dashed border-white/35 bg-[#071d31]/45 px-5 text-center text-sm font-semibold text-white/70">Handled work lands here.</div>}
        </PipelineColumn>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        <PipelineColumn status="incoming" color="#54a6e8">
          <div className="flex flex-col gap-2">
            <SourceCard key={`mobile-inbox-${state.step}-${inboxCurrent.id}`} item={inboxCurrent} count={remainingNotifications} className="demo-pipeline-promote" />
            <QueuedPreview key={`mobile-incoming-${state.step}-${inboxNext.id}`} item={inboxNext} />
          </div>
        </PipelineColumn>
        <div className="flex justify-center text-lg font-bold text-white/75" aria-hidden>↓</div>
        <PipelineColumn status={workingStatus} color="#f2b348">
          {working
            ? <SourceCard key={`mobile-working-${state.step}-${working.id}`} item={working} className="demo-pipeline-working" />
            : <div className="flex h-[8rem] items-center justify-center rounded-[1.35rem] border border-dashed border-white/35 bg-[#071d31]/45 px-5 text-center text-sm font-semibold text-white/70">Daylist picks up the next item.</div>}
        </PipelineColumn>
        <div className="flex justify-center text-lg font-bold text-white/75" aria-hidden>↓</div>
        <PipelineColumn status={handledStatus} color="#54c489">
          {completed
            ? <CompletedCard key={`mobile-completed-${state.step}-${completed.id}`} item={completed} className="demo-pipeline-complete" />
            : <div className="flex h-[8rem] items-center justify-center rounded-[1.35rem] border border-dashed border-white/35 bg-[#071d31]/45 px-5 text-center text-sm font-semibold text-white/70">Handled work lands here.</div>}
        </PipelineColumn>
      </div>
    </div>
  )
}

export default function Demo() {
  const [connectedSources, setConnectedSources] = useState(() => ['Gmail', 'Calendar', 'Slack', 'Granola'])
  const [prioritySources, setPrioritySources] = useState<string[]>([])
  const connectedItems = LOOP_ITEMS.filter((item) => connectedSources.includes(item.source))

  const markPriorityApplied = useCallback((source: string) => {
    setPrioritySources((current) => current[0] === source ? current.slice(1) : current.filter((item) => item !== source))
  }, [])

  function toggleConnection(source: string) {
    const isConnecting = !connectedSources.includes(source)
    if (isConnecting) setPrioritySources((current) => [...current, source])
    setConnectedSources((current) => {
      if (current.includes(source)) return current.length === 1 ? current : current.filter((app) => app !== source)
      return [...current, source]
    })
  }

  return (
    <section id="demo" className="relative overflow-hidden bg-[#061426] py-20 sm:py-28">
      <img src="/art/demo-night-lake.png" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ objectPosition: '50% 50%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#061426]/25 via-[#112750]/35 to-[#030b18]/65" aria-hidden />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="animate-float absolute -left-24 top-16 h-80 w-80 rounded-full bg-[#3b6fae]/25 blur-3xl" />
        <div className="animate-float absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-[#6171ba]/20 blur-3xl" style={{ animationDelay: '-2.5s' }} />
      </div>
      <div className="relative z-10 mx-auto flex w-[min(94vw,72rem)] flex-col gap-7 px-0 sm:gap-9">
        <div>
          <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md">A live look</span>
          <h2 className="font-display mt-4 max-w-2xl text-4xl leading-[1.04] tracking-tight text-white sm:text-5xl">Daylist turns app noise into completed tasks.</h2>
          <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/60">Click on the apps you want to connect</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUPPORTED_APPS.map((app) => (
              <button
                key={app.name}
                type="button"
                aria-pressed={connectedSources.includes(app.source)}
                onClick={() => toggleConnection(app.source)}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold text-[#111318]/65 transition duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111318]/75 ${app.tone} ${connectedSources.includes(app.source) ? 'shadow-[0_3px_10px_rgba(40,39,46,0.12)] ring-1 ring-[#111318]/15' : 'opacity-40 grayscale'}`}
              >
                {app.icon
                  ? <img src={app.icon} alt="" className="h-3.5 w-3.5 object-contain" />
                  : <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#111318]/75 text-[8px] font-black text-white">G</span>}
                {app.name}
              </button>
            ))}
          </div>
        </div>

        <DemoPipeline items={connectedItems} prioritySources={prioritySources} onPriorityApplied={markPriorityApplied} />

      </div>
    </section>
  )
}
