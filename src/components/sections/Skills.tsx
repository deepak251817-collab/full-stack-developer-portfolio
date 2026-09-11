import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"

import { Reveal, RevealItem } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { SpotlightCard } from "@/components/SpotlightCard"
import { skillGroups } from "@/lib/portfolio"

export function Skills() {
  return (
    <section id="skills" className="bg-muted/40 relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              Tools I <span className="text-primary">reach for</span>
            </>
          }
          description="A honest map of where I'm strong and where I'm still leveling up."
        />

        <Reveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <RevealItem key={group.id} className="h-full">
              <SpotlightCard className="h-full rounded-2xl">
                <div className="group border-border bg-card shadow-card hover:shadow-card-lg h-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50">
              {/* Icon chip fills with primary on hover */}
              <div className="flex items-start justify-between">
                <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground grid size-11 place-items-center rounded-xl transition-colors duration-300">
                  <group.icon className="size-5" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{group.level}%</span>
              </div>

              <h3 className="font-display mt-4 text-lg font-semibold">{group.title}</h3>

              <div className="mt-3">
                <AnimatedBar value={group.level} label={`${group.title} proficiency`} />
              </div>

              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{group.blurb}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border-border/70 bg-muted/60 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[11px] transition-colors group-hover:border-primary/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/** Proficiency bar that fills from 0 each time it scrolls into view. */
function AnimatedBar({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reducedMotion = useReducedMotion()

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="bg-primary/15 relative h-1.5 w-full overflow-hidden rounded-full"
    >
      <motion.div
        initial={reducedMotion ? false : { width: 0 }}
        animate={inView || reducedMotion ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="from-primary to-glow h-full rounded-full bg-gradient-to-r"
      />
    </div>
  )
}

export default Skills
