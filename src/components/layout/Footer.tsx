import { ArrowUpRight, Heart, Mail } from "lucide-react"
import { profile } from "@/lib/portfolio"

const FOOTER_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "certificates", label: "Certificates" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-ink-foreground relative overflow-hidden">
      {/* subtle top glow line + film-grain texture */}
      <div
        aria-hidden="true"
        className="via-glow/40 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />
      <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div
        aria-hidden="true"
        className="bg-glow/8 pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm space-y-4">
            <a href="#home" className="flex items-center gap-2.5" aria-label="Back to top">
              <span className="bg-primary text-primary-foreground font-display grid size-9 place-items-center rounded-xl text-sm font-bold">
                {profile.monogram}
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                {profile.firstName}
                <span className="text-glow">.dev</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed text-white/60">
              {profile.tagline}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="group text-sm text-white/60 transition-colors hover:text-white"
              >
                {link.label}
                <ArrowUpRight className="ml-0.5 inline size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          {/* Socials + contact */}
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">Elsewhere</p>
            <div className="flex items-center gap-2">
              {profile.socials.map((s) => (
                <a
                  key={s.kind}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full border border-white/10 text-white/70 transition-all hover:-translate-y-0.5 hover:border-glow/50 hover:text-glow"
                >
                  <SocialGlyph kind={s.kind} />
                </a>
              ))}
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="grid size-9 place-items-center rounded-full border border-white/10 text-white/70 transition-all hover:-translate-y-0.5 hover:border-glow/50 hover:text-glow"
              >
                <Mail className="size-4" />
              </a>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="block text-sm text-white/60 transition-colors hover:text-glow"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/40">
            Built with <Heart className="size-3 fill-glow text-glow" /> using React, Tailwind &
            Convex
          </p>
        </div>
      </div>
    </footer>
  )
}

export function SocialGlyph({ kind }: { kind: "github" | "linkedin" }) {
  if (kind === "github") return <GithubGlyph />
  return <LinkedinGlyph />
}

function GithubGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function LinkedinGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  )
}
