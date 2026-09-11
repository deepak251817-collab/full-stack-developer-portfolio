# Certificates folder

Holds the **real certificate documents** shown in the portfolio's
Certificates section.

## How it works

- `src/lib/portfolio.ts` is the single source of truth: each entry in the
  `certificates` array maps to a real file here via `endpoints.filePath`.
- `previews/` contains JPEG thumbnails **extracted or rendered from these
  exact PDFs** — used on the cards and in the detail dialogs. Never put stock
  images there.
- Every "View" / "Download" button opens the matching PDF in this folder.
  Do not rename or move the PDFs; the paths (including spaces) must match
  exactly.
- Certificates are course/program credentials only. Awards, hackathon results
  and merit recognitions live in `public/achievements/`.

## Current set (14)

Infosys Springboard (AI, AI Intro, AI Types, DBMS, DBMS+SQL, Java for
Beginners, CLI/OS Commands, Unix Linux), freeCodeCamp Scientific Computing
with Python, Great Learning (Java Programming, Programming Basics, UI/UX),
NPTEL Cloud Computing, Deloitte/Forage Data Analytics Job Simulation.

To add a new certificate: drop the real PDF here, render or extract a
thumbnail into `previews/<id>.jpg`, and add an entry to `certificates` in
`src/lib/portfolio.ts`.
