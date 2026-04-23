# KI-Arbeitsregeln — fauteck.eu

Dieses Dokument beschreibt, wie KI-Assistenten (z. B. Claude Code) in diesem
Repo arbeiten sollen.

---

## Arbeitsweise bei langen Sessions (API-Stabilität)

> Ziel: Stream-Timeouts (`Stream idle timeout — partial response received`)
> vermeiden. Ursache sind einzelne lange Operationen ohne Zwischenoutput,
> nicht die Anzahl paralleler Tool-Calls.

### Output klein halten
- Bash-Ausgaben filtern: `head -n 100`, `tail -n 100`, `grep -E '...'`,
  `wc -l` statt vollständiger Logs/Dumps.
- Große Dateien segmentweise lesen (`Read` mit `offset`/`limit`),
  nicht komplett.
- Keine `find . | ...`-Dumps ganzer Projektbäume — gezielte
  `find`/`rg`-Queries mit Pfadfiltern.

### Lange Läufe nicht synchron blockieren
- Builds, Tests, Installationen als Background-Task starten
  (`run_in_background: true`), nicht im Vordergrund abwarten.
- Für Bash-Calls realistische Timeouts setzen; hängende Prozesse sollen
  schnell abbrechen statt still den Stream zu blockieren.
- Keine `sleep`-Schleifen oder Poll-Busy-Waits im Hauptstrang.

### Kontext schützen
- Für breite Codebase-Recherche (>3 Queries, unklarer Scope) den
  `Explore`-Subagent nutzen — er kapselt große Suchergebnisse und liefert
  nur eine Zusammenfassung zurück.
- Für Design-Entscheidungen den `Plan`-Subagent nutzen, bevor umfangreich
  editiert wird.

### Effizient statt vorsichtig
- Unabhängige Tool-Calls in einer Nachricht parallel ausführen (z. B.
  mehrere `Read`s oder `grep`s) — das reduziert die Gesamtzeit und damit
  die Timeout-Wahrscheinlichkeit.
- Sequentiell nur, wenn ein Call vom Ergebnis des vorherigen abhängt.

### Große Aufgaben strukturieren
- Aufgaben mit vielen Dateiänderungen (>10 Dateien oder >3 logisch
  getrennte Teilschritte) in nachvollziehbare Teilschritte zerlegen,
  jeden Schritt als abgeschlossene Einheit mit Zwischenergebnis.
- `TodoWrite` verwenden, um Fortschritt sichtbar zu halten und nach
  Unterbrechungen nahtlos weiterarbeiten zu können.
