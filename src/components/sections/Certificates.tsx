import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  LayoutGrid,
  Search,
  X,
} from "lucide-react"
import { useMemo, useState } from "react"

import { Reveal, RevealItem } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
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
  certificates,
  certificateFilters,
  type Certificate,
} from "@/lib/portfolio"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Real preview thumbnail (extracted from the actual certificate PDF)  */
/* ------------------------------------------------------------------ */

function CertificatePreview({
  cert,
  className,
  eager = false,
}: {
  cert: Certificate
  className?: string
  eager?: boolean
}) {
  if (!cert.endpoints.viewable) {
    return (
      <div
        aria-hidden="true"
        className={cn("bg-muted text-muted-foreground/60 grid place-items-center", className)}
      >
        <FileText className="size-8" />
      </div>
    )
  }
  return cert.preview ? (
    <img
      src={cert.preview}
      alt={`${cert.title} — certificate preview`}
      loading={eager ? "eager" : "lazy"}
      className={cn("object-cover object-top", className)}
    />
  ) : (
    <div
      aria-hidden="true"
      className={cn(
        "from-primary/15 via-emerald-500/10 bg-gradient-to-br to-transparent",
        className
      )}
    >
      <div className="grid h-full w-full place-items-center">
        <FileText className="text-primary/50 size-8" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section — featured cards + "View All" animated toggle               */
/* ------------------------------------------------------------------ */

export function Certificates() {
  const [showAll, setShowAll] = useState(false)
  const [filter, setFilter] = useState("all")
  const [query, setQuery] = useState("")

  const featured = useMemo(() => certificates.filter((c) => c.featured), [])

  const allCertificates = useMemo(() => {
    const q = query.trim().toLowerCase()
    return certificates.filter((c) => {
      const inCategory = filter === "all" || c.category === filter
      if (!inCategory) return false
      if (!q) return true
      return (
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.issued.includes(q)
      )
    })
  }, [filter, query])

  const visible = showAll ? allCertificates : featured

  return (
    <section id="certificates" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certificates"
          title={
            <>
              Proof of <span className="text-primary">work</span>
            </>
          }
          description="Verified credentials across data, programming, cloud and AI/ML — every card shows the real certificate."
        />

        {/* Category filter pills (All view) */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {certificateFilters.map((f) => (
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
                    layoutId="cert-filter-pill"
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
            <label htmlFor="certificate-search" className="sr-only">
              Search certificates by title, issuer, category or year
            </label>
            <div className="relative">
              <Search
                className="text-muted-foreground/70 pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="certificate-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search certificates, issuers, years…"
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
            Showing {visible.length} of {certificates.length} certificates
          </p>
        )}

        {/* Animated grid */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((cert, i) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              >
                <CertificateCard cert={cert} />
              </motion.div>
            ))}
          </AnimatePresence>
          {visible.length === 0 && (
            <p className="text-muted-foreground col-span-full py-16 text-center">
              No certificates match that search — try a different term or category.
            </p>
          )}
        </motion.div>

        {/* View All Certificates / back to featured */}
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
                View All Certifications
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

function CertificateCard({ cert }: { cert: Certificate }) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <article
        onClick={() => setDialogOpen(true)}
        className="group border-border bg-card shadow-card hover:shadow-card-lg flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40"
      >
        {/* Real certificate preview */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setDialogOpen(true)
          }}
          aria-label={`Open details for ${cert.title}`}
          className="border-border/70 bg-muted relative block w-full overflow-hidden border-b outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-inset"
        >
          <CertificatePreview
            cert={cert}
            className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <span className="font-mono text-xs text-muted-foreground">
              {cert.issued.slice(0, 7)}
            </span>
            {cert.featured && (
              <Badge variant="secondary" className="font-mono text-[10px] tracking-wide uppercase">
                Featured
              </Badge>
            )}
          </div>

          <h3 className="font-display mt-2 leading-snug font-semibold">{cert.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{cert.subtitle}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {cert.skills.slice(0, 3).map((s) => (
              <span
                key={s}
                className="border-border/70 bg-muted/60 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[11px]"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Footer: View (real PDF) + Download */}
          <div className="border-border/60 mt-auto flex items-center justify-between gap-2 border-t pt-4">
            {cert.endpoints.viewable ? (
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-mono" asChild>
                <a
                  href={cert.endpoints.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View the ${cert.title} certificate PDF`}
                >
                  <FileText className="size-3.5" />
                  View
                </a>
              </Button>
            ) : (
              <span className="text-muted-foreground text-xs font-mono">Unavailable</span>
            )}
            {cert.endpoints.viewable && (
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-mono" asChild>
                <a
                  href={cert.endpoints.filePath}
                  download={cert.endpoints.downloadName}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Download the ${cert.title} certificate`}
                >
                  <Download className="size-3.5" />
                  Download
                </a>
              </Button>
            )}
          </div>
        </div>
      </article>

      <CertificateDialog cert={cert} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Detail dialog — large real preview + facts + actions                */
/* ------------------------------------------------------------------ */

function CertificateDialog({
  cert,
  open,
  onOpenChange,
}: {
  cert: Certificate
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="leading-snug">{cert.title}</DialogTitle>
          <DialogDescription>{cert.subtitle}</DialogDescription>
        </DialogHeader>

        {cert.preview && (
          <figure className="overflow-hidden rounded-xl border">
            <a
              href={cert.endpoints.viewable ? cert.endpoints.filePath : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!cert.endpoints.viewable) e.preventDefault()
              }}
              aria-label={`Open the full ${cert.title} certificate PDF in a new tab`}
              className="focus-visible:ring-ring/60 block outline-none focus-visible:ring-2"
            >
              <CertificatePreview cert={cert} eager className="max-h-[50vh] w-full object-contain" />
            </a>
            <figcaption className="bg-muted/60 text-muted-foreground border-t px-3 py-2 text-[11px]">
              Real certificate — click the preview to open the full PDF.
            </figcaption>
          </figure>
        )}

        <dl className="space-y-3 text-sm">
          <div className="flex items-start justify-between gap-4">
            <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Issuer / provider
            </dt>
            <dd className="text-right break-all">{cert.subtitle}</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Category
            </dt>
            <dd className="text-right">{cert.category}</dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Issued
            </dt>
            <dd className="text-right">{cert.issued}</dd>
          </div>
        </dl>

        <p className="text-muted-foreground text-sm leading-relaxed">{cert.description}</p>

        {cert.facts.length > 0 && (
          <div>
            <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
              Key facts
            </p>
            <ul className="mt-2 space-y-2">
              {cert.facts.map((f) => (
                <li key={f} className="text-muted-foreground flex items-start gap-2 text-sm">
                  <span className="bg-primary mt-[7px] size-1.5 shrink-0 rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
            Skills
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {cert.skills.map((s) => (
              <Badge key={s} variant="secondary" className="font-mono text-[11px]">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {cert.endpoints.viewable ? (
            <>
              <Button asChild variant="outline" size="sm">
                <a
                  href={cert.endpoints.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View the ${cert.title} certificate PDF in a new tab`}
                >
                  <ExternalLink className="size-4" />
                  View Certificate
                </a>
              </Button>
              <Button asChild size="sm">
                <a
                  href={cert.endpoints.filePath}
                  download={cert.endpoints.downloadName}
                  aria-label={`Download the ${cert.title} certificate`}
                >
                  <Download className="size-4" />
                  Download
                </a>
              </Button>
            </>
          ) : (
            <span className="text-muted-foreground text-sm">Certificate file is unavailable.</span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Certificates
