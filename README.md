# matejhladky-dev

Personal site of Matěj Hladký: one index card, plus a library page with books
and records. Static [Astro](https://astro.build), with no JavaScript in the
browser.

## Pages

- `/`: the card
- `/library`: books and records, switched with tabs (`/library#knihy`,
  `/library#desky`). The tabs are plain links plus CSS.
- `/knihovna`, `/books`, `/knihy`, `/lps`, `/desky`: redirect to `/library`, on
  the right tab. They're set in `astro.config.mjs`.

## Commands

```bash
npm install        # once
npm run dev        # http://localhost:4321, reloads on save
npm run build      # writes the site to dist/
npm run preview    # serves dist/ to check the production build
```

Requires Node 22.12+.

## Editing

- **Bio and links:** `src/pages/index.astro`
- **Books and records:** `src/data/books.txt` and `src/data/lps.txt`
- **Colours and spacing:** variables at the top of `src/styles/global.css`

A list file has three sections, each starting with its header line. Each file
also starts with a short explanation of the format.

```
# priority
- Linus Torvalds: Just for Fun
- Miles Davis: Kind of Blue https://shop.example/kind-of-blue

# other
- Sheldon M. Ross: A First Course in Probability

# hidden
- Someone: Something just for me
```

1. **Priority:** shown first, with a blue square.
2. **Other:** shown below.
3. **Hidden:** never shown on the site. But anyone who can see the repo can
   read it, so keep the repo private if that matters.

Each entry is `Author: Title`, split at the first colon, so titles may contain
colons. The leading `- ` is optional. A link at the end of the line makes the
title clickable. Other lines starting with `#` are comments, and blank lines
don't matter. Entries appear on the site in the order they're written in the
file, so you can arrange them however you like.

A malformed line, or an entry above the first header, fails the build with the
file and line number.

**Album covers:** put an image in `src/data/covers/`, named after the record's
line in `lps.txt` (lowercase, no accents, dashes), for example
`lana-del-rey-blue-banisters.jpg`. It can be any size; the build shrinks it
to a thumbnail. Records without a cover show a placeholder, and an image that
doesn't match any record prints a warning during the build.

## Deploying

Import the repo at <https://vercel.com/new>. Vercel detects Astro, and the
defaults (`npm run build`, output `dist`) are correct. Every push to `main`
deploys; other branches get preview URLs. No `vercel.json` needed.

Once there's a domain, set `site` in `astro.config.mjs`.
