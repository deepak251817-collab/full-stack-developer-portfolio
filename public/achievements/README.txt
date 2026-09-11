# Achievements folder

This folder holds the **real achievement proof documents** shown in the
portfolio's Achievements section.

## Files

| Proof document | Achievement |
| --- | --- |
| `HackOcean 2026 Finalist.pdf` | HackOcean 2026 — Finalist (DLG, MITS Gwalior) |
| `Merit Prize.pdf` | 2nd Topper in AI & ML Class — Merit Prize (KSIT) |
| `NCIRE-2025.pdf` | NCIRE-2025 — Research Paper Presentation (KSIT) |
| `Null Point participation.pdf` | Null Point — Certificate of Participation (KSIT) |

## Previews

`previews/` contains JPEG preview images **extracted from the embedded scans
inside these exact PDFs** — no stock images or placeholders. They are used as
the card thumbnails and the in-dialog preview.

## How it works

- `src/lib/portfolio.ts` is the single source of truth: each `Achievements`
  entry maps 1:1 to a file in this folder via `proofFile`.
- **Never rename or move the PDFs** — the paths in `portfolio.ts` (including
  spaces) must match exactly.
- To add a new achievement: drop the real proof here, extract or add a preview
  to `previews/`, and add a new entry to the `achievements` array in
  `src/lib/portfolio.ts`. Only fields supported by the document — never invent
  ranks, prizes, dates or results.

Achievements stay completely separate from Certifications (course/program
certificates) and About Me.
