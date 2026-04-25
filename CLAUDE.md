# AI Working Rules — fauteck.eu

This document describes how AI assistants (e.g. Claude Code) should work in
this repository.

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
