import { motion } from "framer-motion"

import { Reveal, RevealItem } from "@/components/Reveal"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow: string
  /** Title where ONE word is highlighted with text-primary */
  title: React.ReactNode
  description?: string
  align?: "center" | "left"
  className?: string
}

/**
 * Standard section header: mono uppercase eyebrow, display title with one
 * word in text-primary, and a muted description line.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <RevealItem>
        <p className="font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase">
          {eyebrow}
        </p>
      </RevealItem>
      <RevealItem>
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {title}
        </h2>
        {/* Accent bar that draws itself in */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-64px" }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "via-primary to-glow mt-3 h-1 origin-left rounded-full bg-gradient-to-r from-transparent",
            align === "center" && "mx-auto w-24 text-center"
          )}
        />
      </RevealItem>
      {description ? (
        <RevealItem>
          <p className="text-muted-foreground max-w-2xl text-base text-pretty sm:text-lg">
            {description}
          </p>
        </RevealItem>
      ) : null}
    </Reveal>
  )
}
