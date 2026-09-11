import { CheckCircle2, Sparkles } from "lucide-react"

import { Reveal, RevealItem } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { SpotlightCard } from "@/components/SpotlightCard"
import { about } from "@/lib/portfolio"

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              Code with <span className="text-primary">intent</span>
            </>
          }
          description="Who I am, what I'm studying, and what I'm building right now."
        />

        <Reveal className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            {about.paragraphs.map((p) => (
              <RevealItem
                key={p.slice(0, 24)}
                className="text-muted-foreground text-base leading-relaxed text-pretty sm:text-lg"
                as="p"
              >
                {p}
              </RevealItem>
            ))}

            {/* Currently card */}
            <RevealItem>
              <SpotlightCard className="rounded-2xl">
                <div className="border-border bg-card shadow-card rounded-2xl border p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <h3 className="font-display text-base font-semibold">Currently</h3>
              </div>
                  <ul className="mt-4 space-y-3">
                    {about.currently.map((item) => (
                      <li key={item.text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <item.icon className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </RevealItem>
          </div>

          {/* 2x2 facts grid */}
          <div className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-2">
            {about.facts.map((fact) => (
              <RevealItem key={fact.label} className="h-full">
                <SpotlightCard className="h-full rounded-2xl">
                  <div className="border-border bg-card shadow-card hover:border-primary/40 hover:shadow-card-lg group h-full rounded-2xl border p-5 transition-all duration-300">
                    <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground grid size-10 place-items-center rounded-xl transition-colors duration-300">
                      <fact.icon className="size-5" />
                    </div>
                    <p className="font-mono mt-3 text-xs tracking-[0.15em] text-muted-foreground uppercase">
                      {fact.label}
                    </p>
                    <p className="mt-1 text-sm font-medium">{fact.value}</p>
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}

            <RevealItem className="border-primary/30 from-primary/10 to-emerald-500/5 rounded-2xl border bg-gradient-to-br p-5 sm:col-span-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">The short version:</span> I turn
                  course material into working software — and I document the journey as I go.
                </p>
              </div>
            </RevealItem>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About
