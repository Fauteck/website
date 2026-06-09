# AI Working Rules — fauteck.eu

This document describes how AI assistants (e.g. Claude Code) should work in
this repository.

---

## Wissensquelle: llm-wiki (in Todoteck)

Zentrale, projektübergreifende Wissensschicht ist das **Todoteck-Projekt
`llm-wiki`**, erreichbar über den **Todoteck-MCP** (`search`, `get_note`,
`list_notes`, …). Es hat das frühere GitHub-Repo `Fauteck/llm-wiki`
**abgelöst** — Todoteck ist die einzige Heimat des Wikis.

Pflicht vor inhaltlichen Antworten:
1. Notiz `_index` im Projekt `llm-wiki` lesen (Katalog aller Seiten).
2. Diese Repo-Übersicht öffnen: Notiz **„website (niklasfauteck.de)"**.
3. Bei einschlägigen Themen die passende Notiz lesen: Notiz **„Claude-Anweisung: Blog & LinkedIn"**.

Grundsatz „eine Heimat pro Fakt": code-gebundene Doku bleibt im Repo
(README, docs/*, ADRs); das Wiki verlinkt darauf, kopiert sie nicht.
Übergreifendes/abgeleitetes Wissen lebt als Notiz im `llm-wiki`-Projekt.
Nach faktischen Änderungen mit Wissens-Charakter: betroffene Wiki-Notiz
+ Notiz `_log` pflegen.

Zugriffswege auf dasselbe Wiki:
- **Claude Code (Web/lokal):** Todoteck-MCP.
- **Claude-Chat / mobil:** Todoteck-MCP-Connector.

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
