import {
  ArrowUpRight,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  Zap,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Reveal, RevealItem } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contact, profile } from "@/lib/portfolio"

/**
 * Delivers contact-form messages to the inbox via FormSubmit's free email
 * forwarding (no backend/server needed). The FIRST submission ever sends the
 * owner an activation email — clicking that link once activates delivery;
 * after that every submission arrives as a normal email.
 */
async function sendContactMessage(form: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      subject: form.subject || "New message from portfolio",
      message: form.message,
      _subject: `Portfolio contact: ${form.name} — ${form.subject || "new message"}`,
      _template: "table",
      _replyto: form.email,
      _honey: "", // honeypot field — bots fill it, humans never see it
    }),
  })
  if (!res.ok) throw new Error(`formsubmit-${res.status}`)
  const data = (await res.json()) as { success?: string | boolean }
  if (data.success === "false" || data.success === false) {
    throw new Error("formsubmit-rejected")
  }
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitting, setSubmitting] = useState(false)

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await sendContactMessage(form)
      toast.success("Message sent!", {
        description: "It's on its way to my inbox — I'll get back to you within a day or two.",
      })
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch {
      toast.error("Couldn't send the message", {
        description: `Please email me directly at ${profile.email} instead.`,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let's build something <span className="text-primary">worth shipping</span>
            </>
          }
          description={contact.blurb}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Left column: cards */}
          <Reveal className="space-y-4 lg:col-span-2">
            <RevealItem className="border-border bg-card shadow-card hover:border-primary/40 flex items-center gap-4 rounded-2xl border p-5 transition-colors">
              <div className="bg-primary/10 text-primary grid size-11 shrink-0 place-items-center rounded-xl">
                <Mail className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  Email
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="block truncate text-sm font-medium hover:text-primary transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </RevealItem>

            <RevealItem className="border-border bg-card shadow-card hover:border-primary/40 flex items-center gap-4 rounded-2xl border p-5 transition-colors">
              <div className="bg-primary/10 text-primary grid size-11 shrink-0 place-items-center rounded-xl">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  Location
                </p>
                <p className="text-sm font-medium">{profile.location}</p>
              </div>
            </RevealItem>

            {/* Gradient card */}
            <RevealItem className="border-primary/20 from-primary/12 via-primary/5 to-emerald-500/8 relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6">
              <div
                aria-hidden="true"
                className="bg-glow/30 absolute -top-10 -right-10 size-36 rounded-full blur-3xl"
              />
              <Zap className="size-6 text-primary" />
              <h3 className="font-display mt-3 text-lg font-semibold">
                Faster than email
              </h3>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {contact.fasterThanEmail}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href={profile.socials.find((s) => s.kind === "linkedin")?.url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="size-3.5" /> LinkedIn
                    <ArrowUpRight className="size-3" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={profile.socials.find((s) => s.kind === "github")?.url} target="_blank" rel="noopener noreferrer">
                    <Github className="size-3.5" /> GitHub
                    <ArrowUpRight className="size-3" />
                  </a>
                </Button>
              </div>
            </RevealItem>
          </Reveal>

          {/* Right column: form */}
          <Reveal className="lg:col-span-3">
            <RevealItem className="border-border bg-card shadow-card-lg rounded-2xl border p-6 sm:p-8">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Ada Lovelace"
                      value={form.name}
                      onChange={set("name")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set("email")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    placeholder="Internship opportunity, freelance project…"
                    value={form.subject}
                    onChange={set("subject")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about what you're building…"
                    value={form.message}
                    onChange={set("message")}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
