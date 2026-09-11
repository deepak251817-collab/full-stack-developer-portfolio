import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import {
  Award,
  BookOpenCheck,
  Briefcase,
  ChevronDown,
  Code2,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Rocket,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { useRef, useState } from "react"

import { Reveal, RevealItem } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { Button } from "@/components/ui/button"
import { journey, type JourneyMilestone, type JourneyType } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

const TYPE_STYLES: Record<
  JourneyType,
  { label: string; badge: string; dot: string; icon: LucideIcon }
> = {
  education: {
    label: "Education",
    badge: "bg-primary/15 text-primary",
    dot: "bg-primary",
    icon: GraduationCap,
  },
  skills: {
    label: "Skills",
    badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    icon: Wrench,
  },
  projects: {
    label: "Projects",
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    icon: Code2,
  },
  academic: {
    label: "Academic",
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    icon: Award,
  },
  research: {
    label: "Research",
    badge: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
    icon: BookOpenCheck,
  },
  internship: {
    label: "Internship",
    badge: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
    dot: "bg-cyan-500",
    icon: Briefcase,
  },
  growth: {
    label: "Growth",
    badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
    icon: Rocket,
  },
}

/** How many detail bullets a card shows before "Show all". */
const MAX_VISIBLE_DETAILS = 3

export function Journey() {
  return (
    <section id="journey" className="bg-muted/40 relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Journey"
          title={
            <>
              The path so <span className="text-primary">far</span>
            </>
          }
          description="From school foundation to final-year AI & ML — the education, skills, projects and milestones along the way."
        />

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* The timeline spine: left-aligned on mobile, centered on desktop */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-px lg:left-1/2 lg:-translate-x-1/2"
          >
            <TimelineSpine />
          </div>

          <Reveal className="space-y-10 lg:space-y-14">
            <ol className="space-y-10 lg:space-y-14">
              {journey.map((milestone, i) => (
                <li key={milestone.id} className="relative">
                  <Milestone milestone={milestone} side={i % 2 === 0 ? "left" : "right"} />
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/**
 * Spine that draws itself downward as the section scrolls into view.
 * Reduced motion → fully drawn static line instead.
 */
function TimelineSpine() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <div ref={ref} className="relative h-full w-px">
      {/* track */}
      <div className="via-primary/15 absolute inset-0 bg-gradient-to-b from-primary/50 to-transparent" />
      {/* progress line */}
      {reducedMotion ? null : (
        <motion.div
          style={{ scaleY }}
          className="from-glow to-primary absolute inset-0 origin-top bg-gradient-to-b"
        />
      )}
    </div>
  )
}

function Milestone({ milestone, side }: { milestone: JourneyMilestone; side: "left" | "right" }) {
  const reducedMotion = useReducedMotion()
  const style = TYPE_STYLES[milestone.type]
  const Icon = style.icon
  const isLeft = side === "left"

  return (
    <RevealItem className="relative pl-12 lg:pl-0">
      {/* Node on the spine — subtle pop-in, disabled under reduced motion */}
      {reducedMotion ? (
        <span
          aria-hidden="true"
          className={cn(
            "border-border bg-background absolute top-6 left-4 z-10 grid size-[27px] -translate-x-1/2 place-items-center rounded-full border shadow-sm lg:left-1/2"
          )}
        >
          <Icon className={cn("size-3.5", style.dot.replace("bg-", "text-"))} />
        </span>
      ) : (
        <motion.span
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.15 }}
          className={cn(
            "border-border bg-background absolute top-6 left-4 z-10 grid size-[27px] -translate-x-1/2 place-items-center rounded-full border shadow-sm lg:left-1/2"
          )}
        >
          <Icon className={cn("size-3.5", style.dot.replace("bg-", "text-"))} />
        </motion.span>
      )}

      {/* Card: half-width on desktop, alternating around the spine */}
      <div
        className={cn(
          "lg:w-[calc(50%-2.75rem)]",
          isLeft ? "lg:mr-auto" : "lg:ml-auto"
        )}
      >
        <MilestoneCard milestone={milestone} />
      </div>
    </RevealItem>
  )
}

function MilestoneCard({ milestone }: { milestone: JourneyMilestone }) {
  const [expanded, setExpanded] = useState(false)
  const style = TYPE_STYLES[milestone.type]
  const Icon = style.icon

  const hasOverflowDetails = milestone.details.length > MAX_VISIBLE_DETAILS
  const visibleDetails = expanded
    ? milestone.details
    : milestone.details.slice(0, MAX_VISIBLE_DETAILS)
  const detailsId = `journey-details-${milestone.id}`

  return (
    <article className="group border-border bg-card shadow-card hover:shadow-card-lg rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="font-mono text-xs font-medium text-muted-foreground">
          {milestone.year}
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
            style.badge
          )}
        >
          {milestone.category}
        </span>
      </div>

      <h3 className="font-display mt-2 text-lg leading-snug font-semibold">
        {milestone.title}
      </h3>

      {milestone.organization && (
        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
          <Icon className="text-primary size-3.5 shrink-0" aria-hidden="true" />
          {milestone.organization}
        </p>
      )}

      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        {milestone.description}
      </p>

      {visibleDetails.length > 0 && (
        <ul id={detailsId} className="mt-4 space-y-2">
          {visibleDetails.map((d) => (
            <li
              key={d}
              className="text-muted-foreground flex items-start gap-2 text-sm"
            >
              <span className="bg-primary mt-[7px] size-1.5 shrink-0 rounded-full" aria-hidden="true" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      )}

      {hasOverflowDetails && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={detailsId}
          className="text-primary mt-3 inline-flex items-center gap-1 rounded-full font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {expanded ? "Show less" : `Show all ${milestone.details.length} details`}
          <ChevronDown
            className={cn("size-3.5 transition-transform duration-300", expanded && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      )}

      {(milestone.proof || milestone.link) && (
        <div className="border-border/60 mt-4 flex flex-wrap items-center gap-4 border-t pt-4">
          {milestone.proof && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={milestone.proof}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View the proof document for ${milestone.title}`}
              >
                <FileText className="size-3.5" />
                View Proof
              </a>
            </Button>
          )}
          {milestone.link && (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-mono" asChild>
              <a
                href={milestone.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${milestone.linkLabel ?? "Open link"} — opens in a new tab`}
              >
                {milestone.link.includes("github.com") ? (
                  <Github className="size-3.5" />
                ) : (
                  <ExternalLink className="size-3.5" />
                )}
                {milestone.linkLabel ?? "Open link"}
              </a>
            </Button>
          )}
        </div>
      )}
    </article>
  )
}

export default Journey
