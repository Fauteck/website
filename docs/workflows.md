# Workflows — niklasfauteck.de

## Local development

No build step required. Open any HTML file directly in a browser, or serve
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

GitHub Pages deploys `main` automatically on every push. No CI pipeline.
DNS resolves `niklasfauteck.de` → GitHub Pages via CNAME.

## Adding a blog post

1. Create a new Markdown file in `blog/`, e.g. `blog/my-post.md`.
2. Add front-matter at the top of the file (the blog viewer reads the
   first `# Heading` as the title and the first paragraph as the summary).
3. Register the post in the blog index inside `blog/index.html`
   (the viewer fetches the file list from a hardcoded array in the HTML).
4. Update `feed.xml` and `sitemap.xml` with the new entry.

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
