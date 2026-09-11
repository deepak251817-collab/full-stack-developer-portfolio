import { motion, useScroll, useSpring } from "framer-motion"
import { Menu } from "lucide-react"
import { useMemo, useState } from "react"
import { Link } from "react-router"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useActiveSection, useScrolled } from "@/hooks/use-active-section"
import { profile } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "certificates", label: "Certificates" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

export function Navbar() {
  const scrolled = useScrolled(12)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(useMemo(() => SECTION_IDS, []))

  // 2px scroll progress bar across the very top
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 shadow-card backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="bg-primary absolute inset-x-0 top-0 h-0.5 origin-left"
        aria-hidden="true"
      />

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="bg-primary text-primary-foreground font-display grid size-9 place-items-center rounded-xl text-sm font-bold shadow-sm transition-transform duration-300 group-hover:-rotate-6">
            {profile.monogram}
          </span>
          <span className="font-display text-[17px] font-bold tracking-tight">
            {profile.firstName}
            <span className="text-primary">.dev</span>
          </span>
        </a>

        {/* Center pill links */}
        <div className="border-border/60 bg-card/60 absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border p-1 backdrop-blur-md lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="bg-primary absolute inset-0 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            )
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex" size="sm">
            <a href="#contact">Let&apos;s talk</a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-sm" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5">
                  <span className="bg-primary text-primary-foreground font-display grid size-9 place-items-center rounded-xl text-sm font-bold">
                    {profile.monogram}
                  </span>
                  {profile.firstName}
                  <span className="text-primary">.dev</span>
                </SheetTitle>
                <SheetDescription className="text-left">
                  {profile.role}
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-5" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      active === link.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto p-5">
                <Button asChild className="w-full" size="lg">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Let&apos;s talk
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navbar
