# Workflows — niklasfauteck.de

## Local development

The delivered site is static: no bundler, no framework, nothing to compile.
Open any HTML file directly in a browser, or serve
locally for fetch-based features (blog Markdown loader, RSS):

```bash
# Python (built-in)
python3 -m http.server 8080

# Node (if available)
npx serve .
```

Then visit `http://localhost:8080`.

## Git workflow

### Branches
| Branch | Purpose |
|--------|---------|
| `main` | Production — auto-deployed to GitHub Pages |
| `claude/<slug>` | AI-assisted feature branches |
| `feat/<slug>` | Human-authored feature branches |

### Commit and push
```bash
git add <files>
git commit -m "short imperative description"
git push -u origin <branch-name>
```

Always push to the designated branch; never push directly to `main` without
a reviewed pull request.

## Deployment

GitHub Pages deploys `main` automatically on every push.
DNS resolves `niklasfauteck.de` → GitHub Pages via CNAME.

One CI job runs on every push: `.github/workflows/guard.yml` executes
`node scripts/guard.mjs`. It builds nothing — it checks that the files
already in the repo still agree with each other (see *Generated files*).

## Generated files

Four things used to be maintained by hand and had to stay in sync with
`blog/*.md`. They are now derived from it:

| File | Contents |
|---|---|
| `blog/posts.json` | the slug list the blog viewers fetch |
| `blog/images/sizes.json` | width/height of every image used in a post |
| `feed.xml` | the RSS feed |
| `sitemap.xml` | static pages plus one URL per post |
| `blog/<slug>.html` | one real page per post, with its own title, canonical and OG tags |

`node scripts/build.mjs` writes them; `node scripts/guard.mjs` (and CI)
fails if what is on disk does not match what the sources produce. Do not
edit any of them by hand — the next build overwrites the change, and the
guard reports it before that.

Node is needed for those two scripts and for nothing else. The site itself
still runs from a plain file server.

## Adding a blog post

1. Create a new Markdown file in `blog/`, e.g. `blog/my-post.md`.
2. Add front-matter at the top: `title`, `date` (YYYY-MM-DD), `tags`,
   `excerpt`, and optionally `thumb` / `thumbAlt`. Title and date are
   mandatory — the build refuses a post without them.
3. Convert any new images to WebP alongside the original
   (`cwebp -q 82 image.jpg -o image.webp`, or any equivalent) — the guard
   checks that every JPG/PNG has a smaller WebP sibling.
4. Run `node scripts/build.mjs`. It updates `posts.json`, the image sizes,
   the feed, the sitemap and creates `blog/<slug>.html`.
5. Commit the Markdown, the images and the generated files together.

There is no step for "register the post somewhere" any more. That step was
the reason the sitemap ran 26 posts behind.

## Updating the CV / portfolio

Edit `full/index.html` directly — it is self-contained (inline CSS, no
external scripts beyond `shared.css` and `fonts/fonts.css`).

## Adding a terminal command to NiklasOS

All terminal logic lives in `script.js`. Search for the `commands` object
(approx. line 200) and add a new key:

```js
mycommand: {
  description: 'Short help text shown by `help`',
  run(args) {
    return 'Output string or HTML';
  }
}
```

## Working with AI assistants

See [CLAUDE.md](../CLAUDE.md) for session guidelines (output limits,
background tasks, parallel tool calls). The AI must:
- Develop on the designated `claude/<slug>` branch
- Commit and push when work is complete
- Never push to `main`

## Design changes

All design token changes must be reflected in [DESIGN.md](../DESIGN.md)
**before** editing CSS. Run the design.md linter to validate:

```bash
npx @google/design.md lint DESIGN.md
```
