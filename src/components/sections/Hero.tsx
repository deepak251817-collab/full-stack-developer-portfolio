import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  FileText,
  Sparkles,
} from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"

import { SocialGlyph } from "@/components/layout/Footer"
import { EASE, Reveal, RevealItem } from "@/components/Reveal"
import { Button } from "@/components/ui/button"
import { heroStats, profile, roles, techStack } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section id="home" className="bg-grid relative overflow-hidden">
      {/* Aurora blobs behind everything */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-aurora absolute -top-32 -left-32 size-[34rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="animate-aurora-slow absolute top-1/3 -right-40 size-[38rem] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="animate-aurora absolute -bottom-40 left-1/3 size-[30rem] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 pb-16 text-center sm:px-6 lg:px-8">
        {/* Avatar (photo lives at public/profile.jpg — see README) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative"
        >
          <div className="relative rounded-full p-[3px]">
            {/* Slowly rotating conic "comet" ring behind the photo */}
            <span
              aria-hidden="true"
              className="animate-slow-spin absolute -inset-1 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, var(--primary) 70deg, var(--glow) 130deg, transparent 200deg, transparent 360deg)",
              }}
            />
            <div className="bg-background relative overflow-hidden rounded-full p-1">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                onError={(e) => {
                  // No photo file yet → show the monogram instead of a broken image
                  const img = e.currentTarget
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = "1"
                    img.style.display = "none"
                    const fallback = document.createElement("div")
                    fallback.className =
                      "bg-muted text-muted-foreground font-display grid size-32 place-items-center rounded-full text-4xl font-bold sm:size-36"
                    fallback.textContent = profile.monogram
                    img.parentElement!.appendChild(fallback)
                  }
                }}
                className="size-32 rounded-full object-cover sm:size-36"
              />
            </div>
          </div>
          {/* availability accent */}
          <span
            aria-hidden="true"
            className="absolute bottom-1 left-1 size-3 rounded-full bg-emerald-500 ring-4 ring-background"
          />
        </motion.div>

        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="border-border/70 bg-card/60 mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-muted-foreground">{profile.availability}</span>
        </motion.div>

        {/* Headline — words rise out of a masked line; name shimmers */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          className="font-display mt-6 text-5xl font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          <span className="sr-only">Hi, I&apos;m {profile.firstName}.</span>
          <span aria-hidden="true">
            {["Hi,", "I'm"].map((word, i) => (
              <span key={word} className="mr-[0.24em] inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.22 + i * 0.09, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className="text-gradient-shimmer inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.4, ease: EASE }}
              >
                {profile.firstName}
              </motion.span>
            </span>
          </span>
        </motion.h1>

        {/* Typewriter roles */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
          className="mt-4 flex h-7 items-center gap-2 font-mono text-base text-muted-foreground sm:text-lg"
        >
          <Sparkles className="size-4 text-primary" />
          <TypewriterText />
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
          className="text-muted-foreground mt-5 max-w-2xl text-base text-pretty sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.44, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" className="shadow-primary/40 hover:shadow-primary/50 shadow-lg">
            <a href="#projects">
              View my work
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="size-4" />
              View résumé
            </a>
          </Button>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52, ease: EASE }}
          className="mt-7 flex items-center gap-3"
        >
          {profile.socials.map((s) => (
            <a
              key={s.kind}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="border-border/70 bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/40 grid size-11 place-items-center rounded-full border backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
            >
              <SocialGlyph kind={s.kind} />
            </a>
          ))}
        </motion.div>

        {/* Floating code editor card + chips */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="relative mt-16 w-full max-w-2xl"
        >
          <div className="animate-float-slow">
            <TiltCard>
              <CodeEditorCard />
            </TiltCard>
          </div>

          {/* Floating chips */}
          <div className="animate-float border-border/70 bg-card/80 absolute -top-5 -left-6 hidden items-center gap-1.5 rounded-xl border px-3.5 py-2 font-mono text-xs shadow-card backdrop-blur sm:flex lg:-left-20">
            <span className="text-foreground">{"{ build }"}</span>
            <ArrowRight className="size-3 text-primary" />
            <span className="text-muted-foreground">deploy</span>
          </div>
          <div className="animate-float-slow border-border/70 bg-card/80 absolute -right-6 -bottom-5 hidden items-center gap-1.5 rounded-xl border px-3.5 py-2 font-mono text-xs shadow-card backdrop-blur sm:flex lg:-right-16">
            <span className="text-foreground">model.fit()</span>
            <span className="text-emerald-500">✓ 94% acc</span>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-muted-foreground hover:text-primary mt-14 hidden flex-col items-center gap-2 text-xs transition-colors sm:flex"
          aria-label="Scroll to about section"
        >
          <span className="font-mono tracking-[0.2em] uppercase">scroll</span>
          <span className="border-border/70 flex h-9 w-5.5 justify-center rounded-full border-2 p-1.5">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="bg-primary size-1 rounded-full"
            />
          </span>
          <ArrowDown className="size-3" />
        </motion.a>

        {/* Stats strip */}
        <Reveal className="mt-16 w-full">
          <dl className="border-border/70 bg-card/40 grid grid-cols-3 overflow-hidden rounded-2xl border backdrop-blur">
            {heroStats.map((stat, i) => (
              <RevealItem
                key={stat.label}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-7 sm:px-6",
                  i > 0 && "border-border/70 border-l"
                )}
              >
                <dt className="order-2 font-mono text-[11px] tracking-wide text-muted-foreground uppercase sm:text-xs">
                  {stat.label}
                </dt>
                <dd className="font-display order-1 text-2xl font-bold text-primary sm:text-3xl">{stat.value}</dd>
                <dd className="order-3 text-[11px] text-muted-foreground/80 sm:text-xs">{stat.hint}</dd>
              </RevealItem>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Tech marquee */}
      <TechMarquee />
    </section>
  )
}

/* ------------------------------------------------------------------ */

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = roles[roleIndex]
    const done = text === full

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (done) {
            setDeleting(true)
          } else {
            setText(full.slice(0, text.length + 1))
          }
        } else {
          if (text === "") {
            setDeleting(false)
            setRoleIndex((i) => (i + 1) % roles.length)
          } else {
            setText(full.slice(0, text.length - 1))
          }
        }
      },
      deleting ? 32 : done ? 2000 : 70
    )

    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex])

  return (
    <span>
      {text}
      <span className="animate-caret text-primary font-semibold">|</span>
    </span>
  )
}

/** Circular profile photo with a Convex storage-backed upload control. */
/** Dark code editor window rendered on the --ink surface (stays dark in both themes). */
function CodeEditorCard() {
  return (
    <div className="bg-ink border-white/10 shadow-card-lg overflow-hidden rounded-2xl border text-left">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-red-500/90" />
        <span className="size-3 rounded-full bg-amber-400/90" />
        <span className="size-3 rounded-full bg-emerald-500/90" />
        <span className="ml-3 font-mono text-xs text-white/50">developer.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        <code>
          <span className="text-[#c792ea]">const</span>{" "}
          <span className="text-glow">developer</span>{" "}
          <span className="text-white/60">=</span> <span className="text-white/80">{"{"}</span>
          {"\n"}  <span className="text-sky-300">name</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-emerald-300">&quot;{profile.name}&quot;</span>
          <span className="text-white/60">,</span>
          {"\n"}  <span className="text-sky-300">stack</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-emerald-300">[&quot;React&quot;, &quot;FastAPI&quot;, &quot;Python&quot;]</span>
          <span className="text-white/60">,</span>
          {"\n"}  <span className="text-sky-300">ml</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-emerald-300">[&quot;scikit-learn&quot;, &quot;pandas&quot;]</span>
          <span className="text-white/60">,</span>
          {"\n"}  <span className="text-sky-300">shipsFeatures</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-[#c792ea]">true</span>
          <span className="text-white/60">,</span>
          {"\n"}  <span className="text-sky-300">openToWork</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-[#c792ea]">true</span>
          {"\n"}
          <span className="text-white/80">{"}"}</span>
        </code>
      </pre>
    </div>
  )
}

/** Gentle 3D pointer tilt wrapper (disabled for reduced motion / touch). */
function TiltCard({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })

  if (reducedMotion) return <>{children}</>

  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        ry.set(px * 7)
        rx.set(-py * 7)
      }}
      onPointerLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Infinite tech-stack marquee with fading edges. */
function TechMarquee() {
  const items = [...techStack, ...techStack]

  return (
    <div className="relative border-y border-border/60 bg-card/30 py-4 backdrop-blur-sm">
      {/* Fading edges */}
      <div
        aria-hidden="true"
        className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r sm:w-40"
      />
      <div
        aria-hidden="true"
        className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l sm:w-40"
      />
      <div className="marquee-paused overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 pr-10">
          {items.map((item, i) => (
            <span
              key={`${item.name}-${i}`}
              className="text-muted-foreground hover:text-primary flex items-center gap-2 font-mono text-sm whitespace-nowrap transition-colors"
            >
              <item.icon className="size-4" />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
