# AI Working Rules — fauteck.eu

This document describes how AI assistants (e.g. Claude Code) should work in
this repository. What the repo itself answers — structure, build, deployment,
content workflows — is not retold here but linked below.

## Documentation Index

| Document | Contents |
|---|---|
| [README.md](README.md) | Feature overview, live site, getting started |
| [docs/INDEX.md](docs/INDEX.md) | Documentation hub |
| [docs/architecture.md](docs/architecture.md) | Codebase structure, tech stack, rendering model |
| [docs/workflows.md](docs/workflows.md) | Development, deployment (GitHub Pages), content workflows |
| [DESIGN.md](DESIGN.md) | Design system: tokens, components, brand philosophy |

Tone of voice, front-matter format and render conventions for blog and LinkedIn
posts are **not** in this repo — they live in the wiki note
„Claude-Anweisung: Blog & LinkedIn" (see below).

---

## Wissensquelle: llm-wiki (Todoteck)

Zentrale, gepflegte Wissensschicht für projektübergreifendes Wissen ist das **Projekt `llm-wiki` in Todoteck** — erreichbar über den Todoteck-MCP-Server (`mcp__Todoteck__*`) oder die Todoteck-Weboberfläche.

> Es gibt **kein** Wiki-Repository auf GitHub. Ein früheres Spiegel-Repo ist archiviert und irrelevant — nicht lesen, nicht verlinken, nicht pflegen.

Pflicht vor inhaltlichen Antworten:
1. Notiz **`_index`** lesen — Katalog aller Wiki-Seiten.
2. Mindestens die Repo-Übersicht öffnen: Notiz **`website (niklasfauteck.de)`**.
3. Für Blog-/Schreib-Themen die Notiz **`Claude-Anweisung: Blog & LinkedIn`**.

Nach faktischen Änderungen mit Wissens-Charakter: betroffene Wiki-Notiz pflegen. Spielregeln stehen in der Notiz **`_schema`** — insbesondere „eine Heimat pro Fakt", das Lifecycle-Vokabular und die Log-Rotation.

Ein `_log`-Eintrag nur bei **Entscheidungen und Korrekturen** — nicht bei reinen Inhalts-Aktualisierungen, die zeigt die Versionshistorie der Notiz ohnehin. Im Zweifel weglassen. Seit dem 2026-09-24 **Konvention**; maßgeblich ist die Notiz `_schema` des Wikis unter „Workflows".

Werkzeuge: `search` / `get_note` zum Lesen, `append_note` für reine Ergänzungen (kein Markdown-Round-Trip), `update_note` nur für echte Korrekturen im Bestand, danach `sync_wikilinks` und `lint_wiki`.

**Arbeitsteilung:** Tonalität, Frontmatter-Format und Render-Konventionen stehen im Wiki (Notiz `Claude-Anweisung: Blog & LinkedIn`); Build, Deployment und Seitenstruktur stehen **in diesem Repo**. Nicht duplizieren — verlinken.

---

## Doku-Hygiene

Doku veraltet an drei Stellen, und alle drei sind Aussagen, die nichts
nachrechnet: die **Kopie** (eine abgeleitete Seite wiederholt einen Fakt,
dessen Heimat woanders liegt), die **Sollens-Regel** (ein Regelwerk
behauptet eine Praxis, die so nicht gelebt wird) und die **handgepflegte
Aufzählung** (eine Tabelle spiegelt eine Menge aus dem Code).

Verbindlich vor Doku-Änderungen und bei jedem Aufräum-Durchgang: Notiz
**„Behauptungen, die niemand prüft"** im Todoteck-Projekt `llm-wiki`
(per `search`/`get_note`) — Gegenmittel je Sorte und Prüfliste.

Kurzfassung für dieses Repo:
- Eine Regel hier beschreibt, was **tatsächlich passiert**. Weicht sie von
  der Praxis ab, wird die Regel korrigiert — nicht die Praxis behauptet.
- Was sich aus dem Code aufzählen lässt (Modul-, Route-, Tabellenlisten,
  Verzeichnisbäume), gehört in einen Test, nicht in Prosa.
- Status („X von Y umgesetzt", „noch kein PR") gehört nach Todoteck oder in
  git — nicht in eine Datei, die beim Erledigen niemand anfasst.

---

## Design-Skills im Repo (`.claude/skills/`)

Zwei externe Skills aus [taste-skill](https://github.com/Leonxlnx/taste-skill)
liegen als echte Ordner im Repo:

| Skill | Wofür |
|---|---|
| `redesign-existing-projects` | Audit-Raster für **bestehende** Seiten: Typografie, Farbe, Layout, Zustände, Code-Qualität, typische Auslassungen (404, Skip-Link, Fokus-Ring). |
| `design-taste-frontend` | Entwurfsregeln für **neue** Seiten und Abschnitte, inkl. Liste der KI-typischen Muster, die man vermeidet. |

Aktualisieren: `npx skills add https://github.com/Leonxlnx/taste-skill --skill "<name>"`.
Der Befehl schreibt nach `.agents/skills/` und verlinkt von `.claude/skills/`
per Symlink — hier liegen beide bewusst als kopierte Ordner, weil ein
Windows-Checkout Symlinks nicht auflöst. Nach einem Update also den Inhalt
nach `.claude/skills/` kopieren und `.agents/` wieder entfernen.

**Rangfolge:** Die Skills sind ein Prüfraster, keine Autorität. Wo sie
[DESIGN.md](DESIGN.md) widersprechen — Schriftwahl, Palette, Radien, Motion —
gilt DESIGN.md. Ein Skill-Befund ist eine Frage („warum weicht das ab?"), kein
Auftrag.

Die übrigen elf Skills des Repos (Bildgenerierung, Brandkit, Stil-Presets) sind
bewusst **nicht** installiert — Begründung in der Wiki-Notiz „Externe
Skill-Repos (Bewertung 2026-07)": Bundles nicht blind installieren,
Kollisionsrisiko bei mehrdeutigen Prompts.

---

## Long-session behaviour (API stability)

> Goal: avoid stream timeouts (`Stream idle timeout — partial response received`).
> The root cause is a single long operation without intermediate output,
> not the number of parallel tool calls.

### Keep output small
- Filter Bash output: `head -n 100`, `tail -n 100`, `grep -E '...'`,
  `wc -l` instead of full logs/dumps.
- Read large files in segments (`Read` with `offset`/`limit`),
  not all at once.
- No `find . | ...` dumps of entire project trees — use targeted
  `find`/`rg` queries with path filters.

### Don't synchronously block long runs
- Start builds, tests, and installations as background tasks
  (`run_in_background: true`) — don't wait in the foreground.
- Set realistic timeouts for Bash calls; hanging processes should abort
  quickly rather than silently blocking the stream.
- No `sleep` loops or poll-busy-waits in the main thread.

### Protect context
- For broad codebase research (>3 queries, unclear scope) use the
  `Explore` subagent — it encapsulates large search results and returns
  only a summary.
- For design decisions use the `Plan` subagent before making extensive
  edits.

### Efficient rather than cautious
- Execute independent tool calls in one message in parallel (e.g. multiple
  `Read`s or `grep`s) — this reduces total time and therefore timeout risk.
- Use sequential calls only when one call depends on the result of the
  previous one.

### Structure large tasks
- Break tasks with many file changes (>10 files or >3 logically separate
  sub-steps) into traceable sub-steps, each a self-contained unit with an
  intermediate result.
- Use `TodoWrite` to keep progress visible and to resume seamlessly after
  interruptions.
