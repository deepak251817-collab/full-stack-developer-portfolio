import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

/**
 * SpotlightCard — a plain wrapper (style the inner card as usual) that reveals
 * a soft radial glow following the pointer. Desktop/fine-pointer delight only:
 * renders a static div when reduced motion is preferred.
 *
 * The glow uses the primary color at low alpha so it adapts to light/dark.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const reducedMotion = useReducedMotion()
  const mouseX = useMotionValue(-600)
  const mouseY = useMotionValue(-600)

  const background = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)`

  if (reducedMotion) {
    return <div className={cn("group/spotlight relative", className)}>{children}</div>
  }

  return (
    <div
      className={cn("group/spotlight relative", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }}
      onPointerLeave={() => {
        mouseX.set(-600)
        mouseY.set(-600)
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{ background }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100 group-hover/spotlight:[animation:none]"
      />
      {children}
    </div>
  )
}

export default SpotlightCard
