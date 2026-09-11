# Deepak R — Developer Portfolio

Modern, animated developer portfolio built with **React 19 + Vite + TypeScript,
Tailwind CSS v4, shadcn/ui, Framer Motion and next-themes**.

---

## ✏️ Editing your content — one file to rule them all

**Everything on the site comes from [`src/lib/portfolio.ts`](src/lib/portfolio.ts).**
Open that file, change the values, save — the site updates instantly.

### Your profile photo ✅ (already installed)

The photo lives at **`public/profile.jpg`** and the hero avatar picks it up
automatically. To swap it: just overwrite that file with any square-ish image
(≥ 400×400 looks best — it's displayed as a ~144 px circle). Keep the name
`profile.jpg`, or rename it and update `profile.photoUrl` at the top of
`src/lib/portfolio.ts`.

> 🔒 **Note:** `public/profile.jpg` is git-ignored (see
> [Private files](#-private-files--gitignore-policy) below) — the photo stays
> on your machine and is **never pushed** to the repository.

### View résumé button

The button links to `public/resume.pdf`. Replace that file with your real
résumé (keep the same name). If you rename it, update `profile.resumeUrl`
in `src/lib/portfolio.ts`. *(Also git-ignored — never pushed.)*

### Adding projects from your GitHub

Open `src/lib/portfolio.ts`, scroll to the `projects` array (there's a
**HOW TO ADD A NEW PROJECT** comment right above it with a fill-in template).
Copy the template to the bottom of the array and fill in:

| Field       | What to put                                                          |
| ----------- | -------------------------------------------------------------------- |
| `id`        | unique lowercase id, e.g. `"expense-tracker"`                         |
| `title`     | project name as it should appear                                      |
| `category`  | `"fullstack"`, `"aiml"` or `"tools"` — decides which filter shows it  |
| `blurb`     | one sentence shown on the card (3 lines max)                          |
| `description` | 2–3 sentences shown when the card is opened                        |
| `bullets`   | 3–6 highlights, each a short string                                   |
| `tech`      | tech tags, e.g. `["React", "FastAPI"]`                                |
| `icon`      | any icon from `lucide-react` (it's already imported at the top)       |
| `featured`  | `true` gives it the 🔥 Featured badge                                 |
| `githubUrl` | your repo URL, e.g. `https://github.com/<you>/<repo>`                 |
| `liveUrl`   | demo link (optional)                                                  |

Filters, animations and detail dialogs pick new projects up automatically —
no other file changes needed.

### Certificates & achievements

Real proof documents live in two folders (each has its own `README.txt`):

- **`public/certificates/`** — course/program certificate PDFs
- **`public/achievements/`** — award, hackathon, merit & conference PDFs

The mapping between each card and its real document is in
`src/lib/portfolio.ts` (`certificates` / `achievements` arrays — `file` for
the PDF, `preview` for the card thumbnail). **Card thumbnails** are extracted
scans stored in each folder's `previews/` subfolder.

---

## 🔒 Private files — .gitignore policy

Your personal documents are **deliberately kept out of git**. They work on
your machine (the dev server serves them from `public/`), but they will never
be committed or pushed:

| Ignored                                             | Why                                  |
| --------------------------------------------------- | ------------------------------------ |
| `public/profile.jpg` / `.jpeg` / `.png`             | your photo                            |
| `public/resume.pdf`                                 | your résumé                           |
| `public/certificates/*.pdf` `*.jpg` …               | real certificate documents            |
| `public/achievements/*.pdf` `*.jpg` …               | real achievement proofs               |
| any `*.pdf` / `*.doc*` anywhere in the repo         | safety net for stray documents        |

**Still committed** (needed for the site to build/deploy):

- `public/certificates/previews/` & `public/achievements/previews/` — the small
  card thumbnails. Without them a fresh clone shows placeholder art instead of
  certificate previews. If you'd rather keep these private too, delete the two
  `!public/*/previews/**` lines in `.gitignore` — the cards degrade gracefully.
- `public/favicon.svg`, `public/icons.svg`, folder `README.txt`s.

> ⚠️ **Deploying?** (Vercel/Netlify from git) Ignored files won't exist in the
> deployment, so profile photo, résumé and proof PDFs will 404 there. Either
> upload them via the host's static-asset/secret-file feature, or force-add
> specific files (`git add -f public/profile.jpg`) if you accept them being
> public in the repo.

---

## 📬 Contact form

The form sends messages straight to **deepak251817@gmail.com** via
[FormSubmit](https://formsubmit.co)'s free email forwarding — no backend, no
server, no database.

**One-time activation:** the very first submission emails you an activation
link from FormSubmit — click it once and every submission after that arrives
in your inbox like a normal email (visitor's email is set as reply-to).
Until activated, visitors see an honest error toast suggesting a direct email.

---

## Scripts

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `npm run dev`       | Dev server at `localhost:5173`    |
| `npm run build`     | Typecheck + production build      |
| `npm run preview`   | Preview the production build      |
| `npm run lint`      | ESLint                            |

## Structure

```
src/
  lib/portfolio.ts        ← ALL your content lives here
  components/
    sections/             ← Hero, About, Skills, Projects, Journey,
                            Certificates, Achievements, Contact
    layout/               ← Navbar, Footer, ScrollToTop
    ui/                   ← shadcn/ui primitives
    SpotlightCard.tsx     ← pointer-tracking glow used across cards
    Reveal.tsx            ← shared scroll-animation system
public/
  profile.jpg             ← your photo          (git-ignored)
  resume.pdf              ← your résumé         (git-ignored)
  certificates/
    *.pdf                 ← real certificates   (git-ignored)
    previews/             ← card thumbnails     (committed)
  achievements/
    *.pdf                 ← real proofs         (git-ignored)
    previews/             ← card thumbnails     (committed)
```
