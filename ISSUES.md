# Issues Übersicht

Datum: 2026-03-25

Kurzbeschreibung
- Diese Datei fasst erkannte Probleme und Verbesserungsvorschläge im Repository zusammen. Prioritäten sind als `critical / high / medium / low` angegeben.

---

## 1) `main.ts` — `include` Query wird nicht verwendet
- Pfad: `main.ts` (Route: `/flights`, Zeilen ~44–50)
- Schweregrad: medium
- Beschreibung: Der Query‑Parameter `include` wird gelesen (`c.req.query('include')`), aber unabhängig vom Wert dieselbe Funktion `flightService.findMany()` ohne Optionen aufgerufen. Im Code steht `// TODO with relations`.
- Reproduktion: `GET /flights?include=passengers`
- Vorschlag zur Behebung:
  - Klären, in welchem Format `include` erwartet wird (boolean, CSV wie `passengers,plane` oder JSON).
  - `flightService.findMany` so erweitern, dass es Relations/Includes akzeptiert, z. B. `findMany({ include: ['passengers'] })` oder `findMany({ include: true })`.
  - Alternativ separate Endpoints anbieten wie `/flights?include=passengers`.
- Notizen: API‑Dokumentation ergänzen, Tests für Include‑Parameter hinzufügen.

## 2) `main.ts` — allgemeiner TODO
- Pfad: `main.ts:47`
- Schweregrad: low
- Beschreibung: `// TODO with relations` markiert unvollständige Funktionalität.
- Vorschlag: TODO konkretisieren oder in ein Issue/Project‑Ticket überführen; Implementierung planen (siehe Punkt 1).

## 3) `.vscode/launch.json` — fehlerhafte Debug‑Konfiguration
- Pfad: `.vscode/launch.json`
- Schweregrad: medium
- Beschreibung: `runtimeArgs` enthält `"--env-file", "main.ts"` — das sieht so aus, als wäre `main.ts` fälschlich als env‑file angegeben; außerdem ist `type: "node"` gesetzt, aber `runtimeExecutable: "deno"` benutzt.
- Reproduktion: Starten des Debuggers könnte fehlschlagen oder unerwartet Verhalten zeigen.
- Vorschlag zur Behebung:
  - `--env-file` auf echten Pfad setzen, z. B. `"--env-file=.env"`.
  - `main.ts` als letztes Argument der `runtimeArgs` setzen oder in `program`/`cwd` korrekt angeben.
  - `type` anpassen, falls du eine Deno‑Extension verwendest (z. B. passende Deno Debugger‑Konfiguration) oder `runtimeExecutable` entfernen, wenn Node gewünscht ist.
- Notizen: Optional alternative Deno‑Launchkonfiguration vorschlagen.

## 4) `.git/hooks/sendemail-validate.sample` — Unveränderte TODO‑Platzhalter
- Pfad: `.git/hooks/sendemail-validate.sample`
- Schweregrad: low
- Beschreibung: Mehrere `TODO`‑Kommentare in Hook‑Sample (z. B. Cover‑Letter Checks, Patch Checks, Series Checks).
- Vorschlag: Wenn Hook aktiviert werden soll, konkrete Prüfungen ergänzen (z. B. Spellcheck, Lint, Build). Andernfalls kann die Sample‑Datei ignoriert oder entfernt werden.

## 5) Input‑Validierung fehlt bei POST‑Endpoints
- Pfade: `main.ts` (POST `/passengers`, `/planes`, `/airports`, `/flights`, `/flights/:id/passengers`)
- Schweregrad: high
- Beschreibung: Die Endpoints parsen `await c.req.json()` und rufen Service‑Funktionen auf, ohne offensichtliche Validierung der Payload (z. B. Pflichtfelder, Typen, maximale Längen).
- Risiken: Ungültige Daten, Abstürze, Sicherheitsprobleme.
- Vorschlag zur Behebung:
  - Payload‑Validierung hinzufügen (z. B. mit Zod, Ajv oder eigener Validierungs‑Middleware).
  - Fehler mit klaren HTTP‑Statuscodes und Messages zurückgeben (422 für Validierungsfehler).
  - Unit‑ und Integrationstests für fehlerhafte Inputs schreiben.

---

## Nächste Schritte (Vorschläge)
1) `ISSUES.md` speichern (Root).  
2) `main.ts`: Include‑Handling implementieren + unit tests.  
3) Debugkonfiguration in `.vscode/launch.json` korrigieren.  
4) Input‑Validierung zentral einführen und Endpoints anpassen.
