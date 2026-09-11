import { animate, useInView, AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  FileText,
  LayoutGrid,
  Search,
  ShieldCheck,
  X,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

import { Reveal, RevealItem } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  achievements,
  achievementFilters,
  featuredAchievements,
  stats,
  type Achievement,
  type AchievementStatus,
} from "@/lib/portfolio"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const STATUS_STYLES: Record<
  AchievementStatus["tone"],
  { badge: string }
> = {
  finalist: {
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  topper: {
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  research: {
    badge: "bg-primary/15 text-primary border-primary/30",
  },
  participation: {
    badge: "bg-muted text-muted-foreground border-border",
  },
}

/** Real preview thumbnail (extracted from the actual proof document). */
function ProofPreview({
  achievement,
  className,
  eager = false,
}: {
  achievement: Achievement
  className?: string
  eager?: boolean
}) {
  if (!achievement.preview) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "bg-muted text-muted-foreground/60 flex items-center justify-center",
          className
        )}
      >
        <FileText className="size-8" />
      </div>
    )
  }
  return (
    <img
      src={achievement.preview}
      alt={`${achievement.title} — certificate proof`}
      loading={eager ? "eager" : "lazy"}
      className={cn("object-cover object-top", className)}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Stats row                                                           */
/* ------------------------------------------------------------------ */

/** Count-up number that animates from 0 when it enters the viewport. */
function CountUpStat({ value, suffix, label, hint }: { value: number; suffix: string; label: string; hint: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <div className="border-border bg-card shadow-card flex flex-col items-center rounded-2xl border px-4 py-6 text-center">
      <span ref={ref} className="font-display text-4xl font-bold text-primary">
        {display}
        {suffix}
      </span>
      <span className="mt-1 font-mono text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <span className="mt-0.5 text-[11px] text-muted-foreground/70">{hint}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Proof dialog                                                        */
/* ------------------------------------------------------------------ */

function ProofDialog({
  achievement,
  open,
  onOpenChange,
}: {
  achievement: Achievement
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3 text-left">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
                    STATUS_STYLES[achievement.status.tone].badge
                  )}
                >
                  {achievement.status.label}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  {achievement.category}
                </span>
              </div>
              <DialogTitle className="leading-snug">{achievement.title}</DialogTitle>
              <DialogDescription className="mt-1">
                {achievement.organization}
                {achievement.date ? ` · ${achievement.date}` : ` · ${achievement.year}`}
              </DialogDescription>
            </div>
            <achievement.icon className="text-primary mt-1 size-6 shrink-0" aria-hidden="true" />
          </div>
        </DialogHeader>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {achievement.description}
        </p>

        {achievement.facts && achievement.facts.length > 0 && (
          <div>
            <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
              From the certificate
            </p>
            <ul className="mt-2 space-y-2">
              {achievement.facts.map((f) => (
                <li key={f} className="text-muted-foreground flex items-start gap-2 text-sm">
                  <span className="bg-primary mt-[7px] size-1.5 shrink-0 rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {achievement.preview && (
          <figure className="overflow-hidden rounded-xl border">
            <a
              href={achievement.viewable ? achievement.proofFile : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!achievement.viewable) e.preventDefault()
              }}
              aria-label={`Open the full ${achievement.title} proof document`}
              className="focus-visible:ring-ring/60 block outline-none focus-visible:ring-2"
            >
              <ProofPreview
                achievement={achievement}
                eager
                className="max-h-[50vh] w-full object-contain"
              />
            </a>
            <figcaption className="bg-muted/60 text-muted-foreground border-t px-3 py-2 text-[11px]">
              Real certificate — click the preview to open the full document.
            </figcaption>
          </figure>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {achievement.viewable && achievement.proofFile ? (
            <Button asChild>
              <a
                href={achievement.proofFile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the ${achievement.title} proof document in a new tab`}
              >
                <FileText className="size-4" />
                View Proof
              </a>
            </Button>
          ) : (
            <span className="text-muted-foreground inline-flex items-center gap-2 text-sm">
              Proof document unavailable
            </span>
          )}
          <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <ShieldCheck className="text-primary size-3.5" />
            Verified original document
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function AchievementCard({
  achievement,
  emphasized = false,
}: {
  achievement: Achievement
  emphasized?: boolean
}) {
  const [open, setOpen] = useState(false)
  const style = STATUS_STYLES[achievement.status.tone]

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        className={cn(
          "group border-border bg-card shadow-card hover:shadow-card-lg relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-ring/40 focus-within:ring-offset-2 focus-within:ring-offset-background focus-within:outline-none",
          emphasized && "border-primary/25 bg-gradient-to-b from-primary/[0.06] to-transparent"
        )}
      >
        {/* Real proof preview */}
        {achievement.preview ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(true)
            }}
            aria-label={`Open details and proof for ${achievement.title}`}
            className="border-border/70 bg-muted relative block w-full overflow-hidden border-b outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-inset"
          >
            <ProofPreview
              achievement={achievement}
              className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span
              className={cn(
                "absolute top-3 left-3 rounded-full border bg-background/85 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide backdrop-blur-sm",
                style.badge
              )}
            >
              {achievement.status.label}
            </span>
          </button>
        ) : null}

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-primary font-mono text-[11px] font-medium tracking-[0.15em] uppercase">
              {achievement.category}
            </p>
            <span className="text-muted-foreground shrink-0 font-mono text-xs">
              {achievement.year}
            </span>
          </div>

          <h3 className="font-display mt-2 text-lg leading-snug font-semibold">
            {achievement.title}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            {achievement.organization}
          </p>

          <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-relaxed">
            {achievement.description}
          </p>

          <div className="border-border/60 mt-auto flex items-center justify-between gap-3 border-t pt-4">
            <span className="text-muted-foreground inline-flex items-center gap-1.5 font-mono text-[11px]">
              <ShieldCheck className="text-primary size-3.5" aria-hidden="true" />
              Real proof
            </span>
            {achievement.viewable && achievement.proofFile ? (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={achievement.proofFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View the proof document for ${achievement.title}`}
                >
                  <FileText className="size-3.5" />
                  View Proof
                </a>
              </Button>
            ) : (
              <span className="text-muted-foreground text-xs font-mono">Proof unavailable</span>
            )}
          </div>
        </div>
      </article>

      <ProofDialog achievement={achievement} open={open} onOpenChange={setOpen} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Section — featured cards + "View All" animated toggle               */
/* ------------------------------------------------------------------ */

export function Achievements() {
  const [showAll, setShowAll] = useState(false)
  const [filter, setFilter] = useState("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return achievements.filter((a) => {
      const inCategory = filter === "all" || a.category === filter
      if (!inCategory) return false
      if (!q) return true
      return (
        a.title.toLowerCase().includes(q) ||
        a.organization.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.year.includes(q) ||
        (a.date?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [filter, query])

  const visible = showAll ? filtered : featuredAchievements

  return (
    <section id="achievements" className="bg-muted/40 relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Achievements"
          title={
            <>
              Moments that <span className="text-primary">count</span>
            </>
          }
          description="Competitions, academic honors and research — every achievement backed by its original certificate."
        />

        {/* Count-up stats row */}
        <Reveal className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <CountUpStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                hint={stat.hint}
              />
            </RevealItem>
          ))}
        </Reveal>

        {/* Category filter pills (All view) */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {achievementFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  filter === f.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="achievement-filter-pill"
                    className="bg-primary absolute inset-0 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Search (All view) */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mx-auto mt-6 max-w-md"
          >
            <label htmlFor="achievement-search" className="sr-only">
              Search achievements by title, organization, category or year
            </label>
            <div className="relative">
              <Search
                className="text-muted-foreground/70 pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="achievement-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search achievements, organizations, years…"
                className="border-border bg-card/60 focus-visible:border-ring focus-visible:ring-ring/30 h-10 w-full rounded-full border pr-10 pl-10 text-sm shadow-sm backdrop-blur transition-[color,box-shadow,border-color] outline-none placeholder:text-muted-foreground/60 focus-visible:ring-2"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/60 absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 outline-none focus-visible:ring-2"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Result count (All view) */}
        {showAll && (
          <p aria-live="polite" className="text-muted-foreground mt-4 text-center text-sm">
            Showing {visible.length} of {achievements.length} achievements
          </p>
        )}

        {/* Animated grid */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((achievement) => (
              <motion.div
                key={achievement.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <AchievementCard
                  achievement={achievement}
                  emphasized={
                    achievement.status.tone === "finalist" ||
                    achievement.status.tone === "topper"
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {showAll && visible.length === 0 && (
            <div className="text-muted-foreground col-span-full flex flex-col items-center gap-3 py-16 text-center">
              <Search className="size-8 opacity-40" aria-hidden="true" />
              <p className="max-w-sm text-sm">
                No achievements match that search — try a different term or clear the filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery("")
                  setFilter("all")
                }}
              >
                <X className="size-3.5" />
                Clear search &amp; filters
              </Button>
            </div>
          )}
        </motion.div>

        {/* View All Achievements / back to featured */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              setShowAll((v) => !v)
              if (showAll) {
                setQuery("")
                setFilter("all")
              }
            }}
            aria-expanded={showAll}
          >
            {showAll ? (
              <>
                <ArrowLeft className="size-4" />
                Back to featured
              </>
            ) : (
              <>
                <LayoutGrid className="size-4" />
                View All Achievements
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Achievements
