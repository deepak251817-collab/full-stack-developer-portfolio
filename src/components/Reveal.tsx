import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Shared motion vocabulary for the whole site.
 * Every reveal in the portfolio uses these variants so timing feels coherent.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
}

interface RevealProps {
  children: ReactNode
  className?: string
  /** Extra seconds before the container's children start animating */
  delay?: number
  as?: "div" | "section" | "ul" | "ol" | "article" | "header" | "footer"
}

/**
 * <Reveal> — scroll-triggered stagger container.
 * Wrap children in <RevealItem> (or any element using the fadeUp variants)
 * to get coordinated scroll-in animation.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-64px" }}
      transition={{ delayChildren: delay }}
    >
      {children}
    </MotionTag>
  )
}

interface RevealItemProps {
  children: ReactNode
  className?: string
  as?: "div" | "li" | "section" | "article" | "span" | "h2" | "h3" | "p"
}

/**
 * <RevealItem> — a single child of a <Reveal> container; fades up 24px.
 */
export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const MotionTag = motion[as]

  return (
    <MotionTag className={cn(className)} variants={fadeUp}>
      {children}
    </MotionTag>
  )
}
