import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Flame,
  Github,
  LayoutGrid,
  Link2,
  type LucideIcon,
  Search,
  Sparkles,
  X,
} from "lucide-react"
import { useMemo, useState } from "react"

import { Reveal, RevealItem } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { SpotlightCard } from "@/components/SpotlightCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  projectFilters,
  projects,
  type Project,
  type ProjectCategory,
} from "@/lib/portfolio"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Visual placeholders — theme-aware gradient art per project accent   */
/* ------------------------------------------------------------------ */

type AccentId =
  | "sky"
  | "emerald"
  | "amber"
  | "cyan"
  | "violet"
  | "indigo"
  | "green"
  | "rose"

const ACCENTS: Record<
  AccentId,
  { veil: string; blobA: string; blobB: string; text: string; ring: string }
> = {
  sky: {
    veil: "from-sky-500/25 via-sky-500/10 to-cyan-500/15",
    blobA: "bg-sky-400/40",
    blobB: "bg-cyan-400/30",
    text: "text-sky-600 dark:text-sky-400",
    ring: "hover:border-sky-500/40",
  },
  emerald: {
    veil: "from-emerald-500/25 via-emerald-500/10 to-teal-500/15",
    blobA: "bg-emerald-400/40",
    blobB: "bg-teal-400/30",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "hover:border-emerald-500/40",
  },
  amber: {
    veil: "from-amber-500/25 via-amber-500/10 to-orange-500/15",
    blobA: "bg-amber-400/40",
    blobB: "bg-orange-400/30",
    text: "text-amber-600 dark:text-amber-400",
    ring: "hover:border-amber-500/40",
  },
  cyan: {
    veil: "from-cyan-500/25 via-cyan-500/10 to-sky-500/15",
    blobA: "bg-cyan-400/40",
    blobB: "bg-sky-400/30",
    text: "text-cyan-600 dark:text-cyan-400",
    ring: "hover:border-cyan-500/40",
  },
  violet: {
    veil: "from-violet-500/25 via-violet-500/10 to-purple-500/15",
    blobA: "bg-violet-400/40",
    blobB: "bg-purple-400/30",
    text: "text-violet-600 dark:text-violet-400",
    ring: "hover:border-violet-500/40",
  },
  indigo: {
    veil: "from-indigo-500/25 via-indigo-500/10 to-blue-500/15",
    blobA: "bg-indigo-400/40",
    blobB: "bg-blue-400/30",
    text: "text-indigo-600 dark:text-indigo-400",
    ring: "hover:border-indigo-500/40",
  },
  green: {
    veil: "from-green-500/25 via-green-500/10 to-emerald-500/15",
    blobA: "bg-green-400/40",
    blobB: "bg-emerald-400/30",
    text: "text-green-600 dark:text-green-400",
    ring: "hover:border-green-500/40",
  },
  rose: {
    veil: "from-rose-500/25 via-rose-500/10 to-pink-500/15",
    blobA: "bg-rose-400/40",
    blobB: "bg-pink-400/30",
    text: "text-rose-600 dark:text-rose-400",
    ring: "hover:border-rose-500/40",
  },
}

const accent = (id: AccentId) => ACCENTS[id] ?? ACCENTS.sky

/** Real screenshot if one exists, otherwise a clean themed placeholder. */
function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const a = accent(project.accent as AccentId)
  const Icon = project.icon as LucideIcon

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="bg-muted/50 relative size-full transition-transform duration-500 group-hover:scale-105">
          {/* Themed veil + soft blobs */}
          <div className={cn("absolute inset-0 bg-gradient-to-br", a.veil)} />
          <div
            aria-hidden="true"
            className={cn("absolute -top-8 -right-8 size-28 rounded-full blur-2xl", a.blobA)}
          />
          <div
            aria-hidden="true"
            className={cn("absolute -bottom-10 -left-6 size-32 rounded-full blur-2xl", a.blobB)}
          />
          {/* Faint grid texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              color: "color-mix(in oklab, currentColor 8%, transparent)",
            }}
          />
          {/* Center icon */}
          <div className="absolute inset-0 grid place-items-center">
            <div
              className={cn(
                "border-border/70 bg-card/70 grid size-14 place-items-center rounded-2xl border shadow-sm backdrop-blur"
              )}
            >
              <Icon className={cn("size-6", a.text)} aria-hidden="true" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [filter, setFilter] = useState<ProjectCategory>("all")
  const [query, setQuery] = useState("")

  /** Featured trio, in the required order (array order). */
  const featured = useMemo(() => projects.filter((p) => p.featured), [])

  /** All projects, filtered by category pill + free-text search. */
  const allProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const inCategory = filter === "all" || p.filterTags.includes(filter)
      if (!inCategory) return false
      if (!q) return true
      const haystack = [p.title, p.description, p.blurb, ...p.tech, ...p.categories]
        .join(" ")
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [filter, query])

  const visible = showAll ? allProjects : featured

  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              Things I&apos;ve <span className="text-primary">shipped</span>
            </>
          }
          description="Selected work across full stack, AI/ML, IoT and data — click a card for the full story."
        />

        {/* Category filter pills */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {projectFilters.map((f) => (
            <RevealItem key={f.id} className="relative">
              <button
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
                    layoutId="project-filter-pill"
                    className="bg-primary absolute inset-0 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            </RevealItem>
          ))}
        </Reveal>

        {/* Search — compact, polished (only in the All Projects view) */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-6 max-w-md"
          >
            <label htmlFor="project-search" className="sr-only">
              Search projects by name, technology or category
            </label>
            <div className="relative">
              <Search
                className="text-muted-foreground/70 pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, tech, categories…"
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

        {/* Result count for the All view */}
        {showAll && (
          <p aria-live="polite" className="text-muted-foreground mt-4 text-center text-sm">
            Showing {visible.length} of {projects.length} projects
          </p>
        )}

        {/* Animated grid */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className="h-full"
              >
                <SpotlightCard className="h-full rounded-2xl">
                  <ProjectCard project={project} />
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
          {visible.length === 0 && (
            <p className="text-muted-foreground col-span-full py-16 text-center">
              No projects match that search — try a different term or category.
            </p>
          )}
        </motion.div>

        {/* View All Projects / back to featured */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              setShowAll((v) => !v)
              if (showAll) setQuery("")
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
                View All Projects
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }: { project: Project }) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <article
        onClick={() => setDialogOpen(true)}
        className={cn(
          "group border-border bg-card shadow-card hover:shadow-card-lg flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1.5",
          accent(project.accent as AccentId).ring
        )}
      >
        {/* Visual: real screenshot or themed placeholder */}
        <ProjectVisual project={project} className="h-36 w-full" />

        <div className="flex flex-1 flex-col p-5">
          {/* Header: featured badge + quick links */}
          <div className="flex items-start justify-between gap-2">
            {project.featured ? (
              <Badge className="border-transparent bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Flame className="size-3" />
                Featured
              </Badge>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-1.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View ${project.title} GitHub repository`}
                  className="border-border text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/10 focus-visible:ring-ring/60 grid size-8 place-items-center rounded-full border transition-colors outline-none focus-visible:ring-2"
                >
                  <Github className="size-3.5" aria-hidden="true" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View ${project.title} live demo`}
                  className="border-border text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/10 focus-visible:ring-ring/60 grid size-8 place-items-center rounded-full border transition-colors outline-none focus-visible:ring-2"
                >
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display mt-3 flex items-center gap-1.5 text-lg font-semibold">
            {project.title}
            <ArrowUpRight className="text-primary size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </h3>

          {/* Categories line (searchable) */}
          <p className="text-muted-foreground/80 mt-1 text-xs font-medium">
            {project.categories.join(" · ")}
          </p>

          {/* Clamped blurb */}
          <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed">
            {project.blurb}
          </p>

          {/* Tech tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="border-border/70 bg-muted/60 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[11px]"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="text-muted-foreground/70 px-1 py-0.5 font-mono text-[11px]">
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {/* Footer link */}
          <div className="border-border/60 mt-5 flex items-center justify-between border-t pt-4">
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 font-mono text-xs"
              onClick={(e) => {
                e.stopPropagation()
                setDialogOpen(true)
              }}
            >
              <Link2 className="size-3.5" />
              View Project Details
            </Button>
            <span className="sr-only">
              Categories: {project.categories.join(", ")}
            </span>
          </div>
        </div>
      </article>

      {/* Detail dialog */}
      <ProjectDetails project={project} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Detail view                                                         */
/* ------------------------------------------------------------------ */

function ProjectDetails({
  project,
  open,
  onOpenChange,
}: {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <ProjectVisual project={project} className="-mx-6 -mt-6 mb-2 h-36 sm:-mx-6" />
          <DialogTitle className="flex items-center gap-2 pt-1 text-xl">
            <project.icon className="text-primary size-5 shrink-0" aria-hidden="true" />
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <Badge key={c} variant="secondary" className="font-mono text-[11px]">
              {c}
            </Badge>
          ))}
        </div>

        {/* Key features */}
        <div>
          <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
            Key features
          </p>
          <ul className="mt-2 space-y-2">
            {project.bullets.map((b) => (
              <li key={b} className="text-muted-foreground flex items-start gap-2 text-sm">
                <span className="bg-primary mt-[7px] size-1.5 shrink-0 rounded-full" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Technical highlights (verified only) */}
        {project.highlights && project.highlights.length > 0 && (
          <div>
            <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
              Technical highlights
            </p>
            <ul className="mt-2 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="text-muted-foreground flex items-start gap-2 text-sm">
                  <Sparkles className="text-primary mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        <div>
          <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
            Technologies
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono text-[11px]">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions — Live Demo only when a verified deployment exists */}
        <div className="flex flex-wrap gap-2">
          {project.githubUrl && (
            <Button asChild variant="outline" size="sm">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} GitHub repository (opens in a new tab)`}
              >
                <Github className="size-3.5" />
                View GitHub Repository
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild size="sm">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo (opens in a new tab)`}
              >
                <ExternalLink className="size-3.5" />
                View Live Demo
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Projects
