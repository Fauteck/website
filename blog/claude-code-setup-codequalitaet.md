---
title: "Mein Claude-Code-Setup für bessere Code-Qualität"
date: 2026-07-24
tags: [Vibecoding, Sicherheit, Skills]
excerpt: "Sicherheitshärtung, Performance, Datensicherheit, Code-Effizienz. Das hab ich beim letzten Mal versprochen aufzudröseln. Ein Blick auf mein Setup aus Regeln, Wiki und Skills, mit dem ich die KI meinen eigenen Code prüfen lasse."
---

# Mein Claude-Code-Setup für bessere Code-Qualität

Sicherheitshärtung, Performance, Datensicherheit, Code-Effizienz. Das hab ich beim letzten Mal versprochen aufzudröseln.

Ein Nachmittag reicht für einen Prototyp. Aber ist er auch sicher? Schnelles Bauen mit KI heißt erstmal nur: es funktioniert. Ob es auch was aushält, lasse ich von der KI im Anschluss checken. Immer und immer wieder.

Ich hab die KI gefragt, wie ich das sicherer hinkriege. Antwort: mit Audits. Also hat sie meinen Code analysiert.

Daraus ist über die Zeit ein ganzes Setup geworden. Jedes Projekt hat eigene Regeln, die immer gelten, egal welche KI gerade dran arbeitet. Dazu kommen Gewohnheiten, die projektübergreifend mitlaufen. Und ein Gedächtnis, das sich über Sessions und Projekte hinweg merkt, was schon geprüft, entschieden oder gebaut wurde. Ohne das würde jede neue Session wieder bei null anfangen.

Der KI fallen erstaunlich viele Schwächen auf, wenn man sie nur explizit danach fragt. Darüber hinaus gibt es aber auch kleine Anleitungen, die der KI genau zeigen, welche Gefahrenstellen sie im Code abklopfen soll: Skills.

Ein festes Setup macht aus Vibecoding kein Enterprise-Projekt. Aber es macht aus einem Nachmittag Bauzeit einen ehrlicheren Nachmittag.

## Was bei mir mitläuft

**Repo-eigene Regeln.** Jedes Projekt hat seine eigene CLAUDE.md. Die gilt bindend nur dort. Quality Gates, Security-Checkliste, Umgang mit Secrets, Definition of Done. Bleibt bewusst im Repo, wird nirgends kopiert.

**Globale Gewohnheiten.** Eine zweite CLAUDE.md, die repo-übergreifend gilt. Keine Projekt-Spezifika, nur Dinge, die ich in jeder Session will. Zum Beispiel: vor größeren Aufgaben kurz ins Wiki schauen, ob's dazu schon was gibt.

**Das Wiki.** Ein Projekt in Todoteck, das sich die KI selbst pflegt. Läuft als Alternative zu klassischem RAG. Mehr dazu in [meinem Post über das Wiki](https://niklasfauteck.de/blog/#wiki-fuer-die-ki). Eine Notiz darin führt Buch über alle externen Skill-Sammlungen, die ich mir angeschaut hab, inklusive der Regel: erst prüfen, ob ein Skill die Aufgabe schon abdeckt, bevor ich bei null anfange.

**Skills, die direkt für Codequalität greifen:**

- clean-code — Uncle-Bob-Prinzipien. Sprechende Namen, kleine Funktionen, Kommentare vermeiden statt schlechten Code kommentieren. Stammt aus [ClawForge](https://github.com/jackjin1997/ClawForge).
- security-first-2025 — Security beim Bash-Scripting. Input-Validierung, keine Command-Injection, sichere Temp-Dateien, Secrets niemals hardcoden. Eigener Skill, [zum Download](downloads/claude-code-setup-codequalitaet/security-first-2025.skill).
- simplify — Review auf unnötige Komplexität. Keine Bugsuche, reine Aufräumarbeit.
- security-review — komplettes Security-Review der offenen Änderungen im Branch.
- review — Review eines GitHub Pull Requests.
- [frontend-design](https://github.com/anthropics/skills/tree/main/frontend-design) — produktionsreife Interfaces, ohne dass man der KI-Optik ansieht.
- home-assistant-best-practices — verhindert Anti-Pattern in Automations, etwa device_id statt entity_id. Eigener Skill, [zum Download](downloads/claude-code-setup-codequalitaet/home-assistant-best-practices.skill).
- [mcp-builder](https://github.com/anthropics/skills/tree/main/mcp-builder) — Leitfaden für eigene MCP-Server.
- [skill-creator](https://github.com/anthropics/skills/tree/main/skill-creator) — zum Bauen eigener Skills.
- [writing-skills](https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md) — testet Skills mit Subagenten, bevor sie scharf geschaltet werden, aus dem [obra/superpowers](https://github.com/obra/superpowers)-Framework.
- changelog-generator — verwandelt Git-Commits in verständliche Release-Notes. Eigener Skill.

**Installierte Plugin-Sammlungen (Marketplace):**

- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (Addy Osmani, 32 Skills) — Engineering-Lifecycle, unter anderem Security- und A11y-Checklisten.
- [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) (Community, 817 Skills) — über 800 Security-Skills, gemappt auf MITRE ATT&CK.
- [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) (Alireza Rezvani, 345 Skills) — breite Multi-Domain-Sammlung, davon nutze ich nur wenige gezielt.
- [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) (Anthropic) — offizielle Notebooks, eher Referenz als Skill.

**Ohne Installation.** [ui-skills.com](https://www.ui-skills.com/agents/claude-code) läuft nicht als Plugin, sondern als CLI. Ruf ich live auf, wenn ich an UI-Sachen arbeite. Lädt maximal drei Skills gleichzeitig, kein globaler Installationsschritt nötig.

**Trend-Check.** Lohnt sich, regelmäßig einen Blick auf [Trendshift](https://trendshift.io/github-trending-repositories?trending-range=1) zu werfen. Zeigt aktuell angesagte GitHub-Repos, darunter öfter mal was, das für genau dieses Setup relevant wird.
