# Projekt-Bewertung: airlines-2025

## Beteiligte Studierende

- Ljuca Adnan (lju22097@spengergasse.at) — GitHub: @AdnanFRR
- Vukcevic Leon (vuk210342@spengergasse.at) — GitHub: @LeonSpg
- Lukic Marko (luk210329@spengergasse.at) — GitHub: @spg-marko
- Spasov Spas (spa210339@spengergasse.at) — GitHub: @spasspsv
- Rigler Timo (rig210335@spengergasse.at) — GitHub: @TimooMF
- Virgl Carlos (vir210341@spengergasse.at) — GitHub: @FlinttLogg77
- Schönbauer Jakob (sch210337@spengergasse.at) — GitHub: @Jakob104
- Peregi Lionel (per210333@spengergasse.at) — GitHub: @lio766
- Mitrovic Luka (mit210332@spengergasse.at)
- Macho Lukas (mac22460@spengergasse.at) — GitHub: @MAC-SPG-Lukas
- Wonisch Lukas (won210343@spengergasse.at) — GitHub: @SPG-Lukas
- Preisitz Florian (pre210334@spengergasse.at) — GitHub: @floolf234
- Schulz Raphael (sch210338@spengergasse.at) — GitHub: @Raphael / @Leafoun
- Mica Dwayne (mic210331@spengergasse.at) — GitHub: @spg-mic

### Externe Beitragende (off-record)

- Davies Linda (dav210558@spengergasse.at, 5EHIF) — GitHub: @legorki

### Lehrperson (Kontext)

- Graf Georg (grafg@spengergasse.at) — GitHub: @georgernstgraf

---

## Projektübersicht

**Repository:** airlines-2025 — Flugbuchungs-Backend mit Deno/Hono, Prisma/SQLite und Vue 3 Frontend.

**Zeitraum:** November 2025 – April 2026

**Teamstruktur:** Die Studierenden arbeiteten in Paaren/Gruppen auf benannten Feature-Branches:

| Branch | Studierende |
|--------|-------------|
| Ljuca_Vukcevic | Ljuca Adnan, Vukcevic Leon |
| Spasov_Lukic | Spasov Spas, Lukic Marko |
| RiglerVirgl | Rigler Timo, Virgl Carlos |
| PeregiSchoenbauer | Schönbauer Jakob, Peregi Lionel, Mitrovic Luka, Davies Linda |
| LukasPreisitz | Macho Lukas, Wonisch Lukas, Preisitz Florian |
| SchulzMica | Schulz Raphael, Mica Dwayne |

---

## Beiträge im Überblick

---

### Ljuca Adnan

**Commits:**
- Anzahl: 9 (über Email lju22097) + 1 GitHub-PR-Merge (AdnanFRR noreply) = 10
- Davon substanziell: 6, oberflächlich: 3, administrativ: 1
- Zeitraum: 17.12.2025 – 25.3.2026
- Zeilen: +3.900 / -1.401 (brutto; netto nach Abzug von Merge-Fremdcode ca. +2.500)
- Branches: Ljuca_Vukcevic

**Substanzielle Beiträge:**

1. **Fundamentale Repository-Schicht** (`95cb00d`, 17.12.): Du hast die komplette CRUD-Repository-Schicht für alle vier Entitäten (Airport, Flight, Passenger, Plane) aufgebaut — getById, getByIataCode, update, delete, findManyWithRelations, findByEmail, searchByName u.v.m. (+172 Zeilen). Das war die Grundlage für den gesamten Datenzugriff.

2. **Erweiterte Repository-Funktionen** (`480f1fb`, 7.1.): Du hast zusätzliche Such-, Statistik- und Hilfsfunktionen hinzugefügt: searchByCity, allIds, getPassengerCount, bookPassengers, removePassenger, findByDestination, findByRoute, getStatistics (+163 Zeilen).

3. **Kritische Bugfixes** (`6def9a5`, 14.1.): Du hast korrupten Code in den Service-Dateien repariert (Zeilen waren beim Zusammenführen verkettet worden), direkte Prisma-Aufrufe durch Repository-Aufrufe ersetzt, `mode: "insensitive"` entfernt (SQLite-kompatibel) und Methodennamen korrigiert (+91/-100).

4. **Massive Code-Bereinigung** (`8ecfaa7`, 25.3.): Du hast das gesamte Projekt auf 4-Spaces-Einrückung, doppelte Anführungszeichen und durchgehende Formatierung umgestellt. Zusätzlich hast du statische HTML-Seiten für Destinationen (Barcelona, Paris, Rom) erstellt, serveStatic-Middleware hinzugefügt und die Flight-Service-Logik verbessert (Kapazitätsprüfung mit detaillierter Fehlermeldung) (+1.925/-1.116).

5. **Import-Zentralisierung** (`80e1ac7`, 25.3.): Du hast alle Prisma-Typ-Imports über `Repository/db.ts` zentralisiert und explizite Typ-Annotationen hinzugefügt (+8/-12).

6. **Merge von main** (`2e7db34`, 7.1.): Du hast den main-Branch in den Feature-Branch integriert und dabei die Service-Schicht, Konfiguration und Debugging-Setup importiert (+546/-139).

**Pull Requests:**
- PR #22 (Ljuca_Vukcevic → main): Erstellt und gemerged am 7.1. — brachte die Repository-Schicht in main
- PR #27 (Ljuca_Vukcevic → main): Erstellt, gemerged am 14.1. — brachte erweiterte Funktionen und Bugfixes
- PR #31 (Ljuca_Vukcevic → main): Offen — enthält Import-Zentralisierung und Formatierung

**Issues:**
- Keine Issues erstellt oder kommentiert

**Commit-Nachrichten-Qualität:**
- Mäßig: Mischung aus deutschen Beschreibungen ("mofifiziert auf neue service ordner") und nichtssagenden Nachrichten ("Sollte gehen", "xjson", "small stuff"). Die commitspezifischen Beschreibungen könnten präziser sein.

**Geschätzter Zeitaufwand:** hoch

**Qualitative Bewertung:**
- Arbeitsstil: phasenhaft — drei aktive Phasen (Dezember, Januar, März) mit langen Pausen dazwischen
- Beitragstyp: kodeorientiert — Du hast massiv zur Repository- und Service-Schicht beigetragen
- Sorgfalt: mittel — die Code-Qualität ist solide, aber die formatierungsbezogene Commit-Nachricht ("Ich hoffe es passt so") und der korrupte Code-Zwischenstand zeigen, dass teilweise weniger sorgfältig gearbeitet wurde

**Gesamteinschätzung:**
Du bist der Hauptautor der Repository-Schicht des Projekts. Ohne deine Arbeit gäbe es keine strukturierte Datenzugriffsschicht. Dein Beitrag ist umfangreich und technisch fundiert. Du hast sowohl Grundlagenarbeit (CRUD) als auch fortgeschrittene Funktionen (Suche, Statistiken, Buchungslogik) geleistet. Die Bugfixes zeigen, dass du in der Lage bist, Probleme systematisch zu identifizieren und zu beheben. Dein Beitrag zur Code-Formatierung und -Strukturierung im März hat die Codebasis deutlich lesbarer gemacht. Insgesamt eine sehr solide Projektarbeit mit einem klaren Fokus auf Backend-Architektur.

---

### Vukcevic Leon

**Commits:**
- Anzahl: 1
- Davon substanziell: 1, oberflächlich: 0
- Zeitraum: 11.2.2026
- Zeilen: +5 / -7
- Branches: Ljuca_Vukcevic

**Substanzielle Beiträge:**

1. **Kritischer Import-Fix** (`f461155`, 11.2.): Du hast einen wesentlichen Bug behoben — die Prisma-Imports in allen vier Repository-Dateien zeigten auf `browser.ts` (Client für den Browser) statt auf `client.ts` (Client für Deno/Node). Ohne diesen Fix wäre die gesamte Repository-Schicht zur Laufzeit nicht funktionsfähig gewesen. Das war ein gezielter, präziser Fix.

**Pull Requests:**
- PR #31 (Ljuca_Vukcevic → main): Enthält deinen Commit (offen)

**Issues:**
- Keine Issues erstellt oder kommentiert

**Geschätzter Zeitaufwand:** niedrig

**Qualitative Bewertung:**
- Arbeitsstil: minimal — ein einzelner Commit über den gesamten Projektzeitraum
- Beitragstyp: kodeorientiert — aber sehr begrenzt
- Sorgfalt: hoch für den einzelnen Commit — der Fix war präzise und korrekt

**Gesamteinschätzung:**
Dein einzelner Commit war technisch wertvoll — er hat einen kritischen Import-Pfad-Fehler behoben, der die gesamte Anwendung blockiert hätte. Die Commit-Nachricht ("WIP (fix | repository) : correct prisma imports from browser.ts to client.ts") ist vorbildlich beschreibend. Allerdings beschränkt sich dein gesamter Beitrag auf diesen einen Fix. Es ist nicht erkennbar, ob du weitere Beiträge zum Projekt geleistet hast, die nicht im Git-Verlauf sichtbar sind (z.B. Pair Programming, Planung, Recherche). Ich würde mir wünschen, in einem Gespräch mehr über deine Rolle im Team zu erfahren.

---

### Lukic Marko

**Commits:**
- Anzahl: 3 (über Email luk210329) + 1 GitHub-PR-Merge (spg-marko noreply) = 4
- Davon substanziell: 2, oberflächlich: 0, Merge: 2
- Zeitraum: 25.3.2026 (alle Commits an einem Tag)
- Zeilen: +221 / -9 (eigener Code)
- Branches: Spasov_Lukic

**Substanzielle Beiträge:**

1. **Dynamische Port-Auswahl** (`99d95d1`, 25.3.): Du hast die hardcoded Port-Nummer 3000 durch eine umgebungsbasierte Port-Auswahl mit automatischem Fallback ersetzt. Der Server versucht bis zu 10 aufeinanderfolgende Ports, wenn der bevorzugte belegt ist. Außerdem hast du das Testskript robuster gemacht, indem es selbstständig Flughäfen erstellt, bis mindestens 2 existieren (+202/-6).

2. **Umgebungsbasierte Test-Konfiguration** (`310934e`, 25.3.): Du hast das Testskript so umgestellt, dass es PORT und API_BASE_URL aus der .env-Datei liest, und den DATABASE_URL-Pfad in .env-example korrigiert (+19/-3).

**Pull Requests:**
- PR #37 (Spasov_Lukic → main): Erstellt und gemerged am 25.3. — brachte Testskript und Port-Logik in main

**Issues:**
- Issue #41 ("Überbuchungsschutz einbauen"): Erstellt am 8.4. — ein sinnvolles Feature-Request mit klarem Titel, aber ohne detaillierte Beschreibung

**Commit-Nachrichten-Qualität:**
- Mittel: Deutschsprachig und verständlich, aber teilweise sehr lang ("von Marko Lukic und Spas Spasov - Verbesserung des deno task test") und ungenau ("Port 3002 bug fixed" — der Port war 3000, nicht 3002).

**Auffälligkeiten:**
- Du hast `package.json` und `package-lock.json` mit `deno@^2.6.1` als npm-Abhängigkeit hinzugefügt. Das ist in einem Deno-Projekt redundant und vermutlich ein Missverständnis.
- Alle Commits stammen von einem einzigen Tag (25.3.) — das deutet auf Deadline-getriebene Arbeit hin.

**Geschätzter Zeitaufwand:** niedrig bis mittel

**Qualitative Bewertung:**
- Arbeitsstil: Deadline-getrieben — alle Commits an einem Tag
- Beitragstyp: kodeorientiert — fokussiert auf Test-Infrastruktur und Server-Konfiguration
- Sorgfalt: mittel — die Port-Logik ist korrekt, aber die npm-Deno-Abhängigkeit ist unnötig

**Gesamteinschätzung:**
Du hast einen sinnvollen Beitrag zur Test-Infrastruktur geleistet. Die dynamische Port-Auswahl und die umgebungsbasierte Konfiguration sind praktische Verbesserungen, die das Testen und den Betrieb erleichtern. Dein Issue #41 zeigt, dass du dich mit der Fachlogik auseinandersetzt. Allerdings konzentriert sich deine gesamte sichtbare Arbeit auf einen einzigen Tag, was die Frage aufwirft, ob du über den Projektzeitraum hinweg kontinuierlich eingebunden warst. Die Pair-Programming-Angabe in den Commit-Nachrichten ("von Marko Lukic und Spas Spasov") deutet auf Zusammenarbeit hin, die teilweise im Git-Verlauf untergeht.

---

### Spasov Spas

**Commits:**
- Anzahl: 5 (über Email SPA210339) + 1 GitHub-PR-Merge (spasspsv noreply) = 6
- Davon substanziell: 1, oberflächlich: 3, Merge: 2
- Zeitraum: 17.12.2025 – 25.3.2026
- Zeilen: +237 / -21 (eigener Code)
- Branches: Spasov_Lukic

**Substanzielle Beiträge:**

1. **Integrationstest-Skript** (`7cb6c6c`, 25.3.): Du hast ein 167-zeiliges Integrationstest-Skript (`scripts/test_endpoints.ts`) erstellt, das alle CRUD-Endpunkte testet: Health-Check, GET-Abfragen, Ressourcen-Erstellung (Passagier, Flugzeug, Flughafen mit Retry-Logik für IATA-Kollisionen, Flug), Passagier-Buchung und Relations-Verifikation. Du hast außerdem den `deno task test` in `deno.json` konfiguriert und einen Bug in `main.ts` behoben (Middleware-Reihenfolge: serveStatic unterhalb der Root-Route) (+206/-2).

**Oberflächliche Beiträge:**
- Endpoints.rest Testdaten geändert ("Max" → "Maxima", dann persönliche Daten)
- Deno.lock Updates (automatisiert)
- Merge-Commits (kein eigener Code)

**Pull Requests:**
- Keine eigenen PRs erstellt; PR #37 wurde von Lukic Marko erstellt

**Issues:**
- Keine Issues erstellt

**Commit-Nachrichten-Qualität:**
- Problematisch: Drei deiner fünf eigenen Commits haben irreführende Nachrichten:
  - "POST plane endpoint funktioniert" → nur lockfile-Änderung, kein Code
  - "alle endpoinst fuunktionieren; Datenbank mit Testdaten befüllt" → nur Testdaten in endpoints.rest geändert, kein Code und keine Seed-Daten
  - Diese Nachrichten suggerieren Code-Beiträge, die nicht vorhanden sind

**Auffälligkeiten:**
- Nur 1 von 5 eigenen Commits enthält echten Code
- Commit-Nachrichten suggerieren teils nicht existente Code-Beiträge
- Längere Inaktivität zwischen Dezember und März

**Geschätzter Zeitaufwand:** niedrig

**Qualitative Bewertung:**
- Arbeitsstil: minimal — ein einziger substanzieller Commit über den gesamten Zeitraum
- Beitragstyp: kodeorientiert — das Testskript ist ein echter Beitrag
- Sorgfalt: niedrig bis mittel — das Testskript ist brauchbar, aber die Commit-Historie ist irreführend

**Gesamteinschätzung:**
Dein Integrationstest-Skript ist ein echter und wertvoller Beitrag zum Projekt. Es zeigt, dass du die API-Endpunkte verstehst und in der Lage bist, automatisierte Tests zu schreiben. Der Bugfix in der Middleware-Reihenfolge war ebenfalls wichtig. Allerdings ist das dein einziger substanzieller Code-Beitrag über den gesamten Projektzeitraum. Die Commit-Nachrichten, die Code-Beiträge suggerieren, die nicht vorhanden sind, sind ein Qualitätsproblem. In einem Gespräch würde mich interessieren, was du in der Zeit zwischen Dezember und März gemacht hast und ob es unsichtbare Beiträge gab (Pair Programming, Recherche, Koordination).

---

### Rigler Timo

**Commits:**
- Anzahl: 15 (8 eindeutige logische Änderungen + Duplikate durch Branch-Fork)
- Davon substanziell: 4, oberflächlich: 4
- Zeitraum: 17.12.2025 – 25.3.2026
- Zeilen: +294 / -270 (eigener Code)
- Branches: RiglerVirgl

**Substanzielle Beiträge:**

1. **Hono Static Serve Setup** (`fabe515`, 17.12.): Du hast die statische Datei-Auslieferung mit Hono eingerichtet — eine neue `routes/serve_static.ts` mit eigenem `Deno.serve()`. Du hast die Hono-Abhängigkeit von JSR auf npm umgestellt und die Projektstruktur erweitert (+34/-6).

2. **Frontend-Integration in main.ts** (`77cf42b`, 7.1.): Du hast die statische Datei-Auslieferung in die Hauptanwendung integriert (`serveStatic` in `main.ts`), ein separates `serve_static.ts` erstellt und erste HTML/CSS-Dateien angelegt (+27/-13).

3. **REST API Testdatei erweitert** (`8aee6fb`, 25.3.): Du hast die `endpoints.rest`-Datei massiv erweitert: Variablen-System für IDs, vollständige CRUD-Abdeckung für alle Entitäten (GET by ID, PUT, DELETE für Flights, Passengers, Planes, Airports) (+76/-7).

4. **Branch-Merge** (`32bbd28`, 25.3.): Du hast die beiden Forks des RiglerVirgl-Branches zusammengeführt und Konflikte in README.md, deno.lock, main.ts und static/index.html aufgelöst (+33/-0).

**Pull Requests:**
- PR #38 (RiglerVirgl → main): Geschlossen
- PR #40 (RiglerVirgl → main): Offen — aktueller Stand

**Issues:**
- Keine Issues erstellt

**Commit-Nachrichten-Qualität:**
- Schlecht: Einzelne Buchstaben ("a", "m"), Tippfehler ("statiac"), nichtssagende Wörter ("ferien", "cleanup"). Die Commit-Nachrichten geben keinen Aufschluss über die Änderungen. Nur "endpoint.rest" und "hono static serve" sind annähernd beschreibend.

**Auffälligkeiten:**
- Merge-Konflikt-Marker im README eingecheckt (Commit `53942c3`)
- Branch hatte Fork-Problem mit doppelten Commits
- Beiträge beschränken sich auf statische Datei-Auslieferung und API-Testdatei — keine Geschäftslogik, kein Datenbank-Code

**Geschätzter Zeitaufwand:** mittel

**Qualitative Bewertung:**
- Arbeitsstil: phasenhaft — drei Arbeitssitzungen (Dezember, Januar, März)
- Beitragstyp: kodeorientiert — Fokus auf Infrastruktur (static serving, API-Tests)
- Sorgfalt: niedrig — Commit-Nachrichten sind mangelhaft, Merge-Konflikt-Marker eingecheckt, Code teilweise unordentlich

**Gesamteinschätzung:**
Du hast eine brauchbare Infrastruktur für statische Datei-Auslieferung und API-Tests aufgebaut. Die `endpoints.rest`-Erweiterung ist nützlich und deckt die gesamte CRUD-Oberfläche ab. Allerdings gibt es deutliche Qualitätsmängel: Die Commit-Nachrichten sind durchgehend nichtssagend, du hast Merge-Konflikt-Marker ins Repository eingecheckt, und die Code-Qualität zeigt Unsicherheiten (z.B. ständiges Wechseln der serveStatic-Konfiguration). Dein Beitrag ist auf Infrastrukturthemen beschränkt — es gibt keinen Beitrag zur Geschäftslogik, zum Datenmodell oder zur Service-Schicht. Die Collaboration mit Carlos auf dem Branch funktionierte, führte aber zu einem Fork-Problem mit doppelten Commits.

---

### Virgl Carlos

**Commits:**
- Anzahl: 9 (5 eindeutige logische Änderungen + Duplikate durch Branch-Fork)
- Davon substanziell: 2, oberflächlich: 2, Merge: 1
- Zeitraum: 7.1.2026 – 11.2.2026
- Zeilen: +112 / -156 (eigener Code)
- Branches: RiglerVirgl

**Substanzielle Beiträge:**

1. **Statische Website und Fehlerbehandlung** (`948ce10`, 7.1.): Du hast die statische Website erstellt (`index.html`, `style.css`, Platzhalter-Bild) und die serve_static.ts-Konfiguration korrigiert (Route von `/*` auf `/static/*` begrenzt, Root-Pfad korrigiert) (+29/-7).

2. **Fehlerbehandlung und statische Integration** (`be2980a`, 11.2.): Das ist dein wertvollster Commit. Du hast einen globalen Error-Handler in `main.ts` hinzugefügt (`app.onError()`) mit Logging und JSON-500-Antwort, und die statische Datei-Auslieferung korrekt in die Hauptanwendung integriert (`serveStatic` mit `root: './static'`). Die Pfad-Konsistenz in `index.html` hast du ebenfalls korrigiert (+23/-7).

**Pull Requests:**
- PR #40 (RiglerVirgl → main): Offen — enthält deine Commits

**Issues:**
- Issue #32 ("endpoints.rest aktualisieren"): Erstellt am 25.3. — sinnvolles Anliegen mit klarem Titel

**Commit-Nachrichten-Qualität:**
- Gut: Durchgehend beschreibend ("Fix static file paths in index.html and enhance global error handling in main.ts", "Remove index.html reference from static file serving configuration"). Deutlich besser als bei deinem Branch-Partner.

**Auffälligkeiten:**
- Platzhalter-Bild als Textdatei erstellt (image.png war eine Textdatei)
- Pfad-Änderungen wurden teilweise in einem Commit eingeführt und im nächsten wieder revertiert

**Geschätzter Zeitaufwand:** niedrig bis mittel

**Qualitative Bewertung:**
- Arbeitsstil: phasenhaft — Januar und Februar aktiv
- Beitragstyp: kodeorientiert — Fokus auf statische Datei-Auslieferung und Fehlerbehandlung
- Sorgfalt: mittel — Commit-Nachrichten sind gut, aber Platzhalter-Datei und Pfad-Geflipp sind unsauber

**Gesamteinschätzung:**
Du hast zwei solide technische Beiträge geleistet: die statische Website-Infrastruktur und — besonders wertvoll — den globalen Error-Handler. Der Error-Handler ist ein echter Beitrag zur Robustheit der Anwendung, den kein anderes Team implementiert hat. Deine Commit-Nachrichten sind vorbildlich im Vergleich zu deinem Branch-Partner. Der Scope deiner Arbeit ist allerdings eng: statische Datei-Auslieferung und Fehlerbehandlung, ohne Beitrag zur Geschäftslogik oder zum Datenmodell. Dein Issue #32 zeigt Engagement für die API-Dokumentation.

---

### Schönbauer Jakob

**Commits:**
- Anzahl: 10
- Davon substanziell: 10 (inkl. Merge-Commits mit Konfliktlösung)
- Zeitraum: 17.12.2025 – 8.4.2026
- Zeilen: +6.824 / -4.664 (brutto, inkl. Merge-Fremdcode)
- Branches: PeregiSchoenbauer

**Substanzielle Beiträge:**

1. **Vue 3 Frontend aufgebaut** (`12ff20a`, 17.12.): Du hast das gesamte Vue 3 + Vite Projektgerüst in `AirlinesLioJakob/` erstellt — komplett mit Router, Pages, App-Shell und Build-Konfiguration.

2. **Komplette Vue-Anwendung implementiert** (`0c10b76`, 7.1.): Du hast die vollständige Frontend-Anwendung gebaut: Routing (Home, FlightSearch, BookFlight), FlugSuche mit Stadt/IATA-Filtern, Datumsauswahl und Preiskalkulation, Buchungsflow mit Passagierdaten, Zahlungsformular und Buchungsbestätigung (+3.702/-39, hauptsächlich package-lock.json).

3. **Build-Pipeline konfiguriert** (`d0e89c4`, 25.3.): Du hast die Produktionsbuild-Pipeline eingerichtet: `deno task frontend:build`, Vite-Output-Konfiguration (`outDir: 'dist/client'`), Migration von Node-basierter zu Deno-nativer Vite-Ausführung.

4. **Projektumstrukturierung** (`35fff42`, 8.4.): Du hast die `AirlinesLioJakob/`-Subdirectory in das Repository-Root verschoben — eine massive Umstrukturierung, die alle Vue-Dateien, Konfigurationen und Abhängigkeiten an die richtige Stelle brachte (+1.691/-2.994).

5. **Entwicklungs-Workflow etabliert** (`85204a`, 8.4.): Du hast den gesamten Entwicklungsworkflow dokumentiert und konfiguriert: `deno task ui:dev`, `ui:build`, `ui:build:watch`, aktualisierte QUICKSTART.md, SETUP.md und CHANGES.md.

6. **Legacy-HTML archiviert** (`1541fc6`, 8.4.): Du hast die statischen HTML-Seiten ins Archiv verschoben und 301-Redirects für alte URLs eingerichtet.

7. **Seed-Optimierung** (`c7597d6`, 8.4.): Du hast veraltete Flüge erkannt und eine Refresh-Logik implementiert, außerdem SQLite-Stabilität durch Chunked-Inserts (Batches à 250) verbessert.

8-10. **Merge-Konflikte gelöst** (3 weitere Commits): Du hast alle Konflikte zwischen deinem Branch, Peregis Phase 2-3 und dem main-Branch aufgelöst.

**Pull Requests:**
- PR #42 (PeregiSchoenbauer → main): Geschlossen
- PR #28 (PeregiSchoenbauer → main): Über GitHub gemerged
- Finaler Merge: Direkter Merge-Commit (`3dd9f43`, 8.4.)

**Issues:**
- Keine Issues erstellt

**Commit-Nachrichten-Qualität:**
- Sehr gut: Durchgehend beschreibend und phasenorientiert ("Phase 4 fertiggestellt", "Phase 5 Phase 6", "Phase 7 cleanup and validation prep", "Seed: refresh stale flights and chunk inserts for SQLite stability"). Professioneller Stil.

**Auffälligkeiten:**
- Keine negativen Auffälligkeiten — durchgehend hohe Qualität

**Geschätzter Zeitaufwand:** hoch

**Qualitative Bewertung:**
- Arbeitsstil: regelmäßig — Beiträge in Dezember, Januar, März und April
- Beitragstyp: gemischt — Frontend-Architektur, Build-Pipeline, Dokumentation, Projektmanagement
- Sorgfalt: hoch — saubere Commit-Nachrichten, phasenbasierte Entwicklung, gründliche Dokumentation

**Gesamteinschätzung:**
Du bist der primäre Architekt dieses Projekts. Du hast nicht nur das gesamte Vue-Frontend erstellt, sondern auch die Projektstruktur umgebaut, den Entwicklungsworkflow etabliert und umfassende Dokumentation geschrieben. Die phasenbasierte Entwicklung zeigt methodisches Vorgehen. Du hast alleine mehr substanzielle Commits geleistet als jedes andere Teammitglied. Die Qualität deiner Arbeit — von Commit-Nachrichten über Code-Organisation bis hin zu Dokumentation — ist herausragend im Kontext dieses Projekts. Die Seed-Optimierung zeigt zusätzlich, dass du an die Betriebsstabilität gedacht hast. Ohne deinen Beitrag gäbe es kein funktionierendes Frontend und keine strukturierte Entwicklungsumgebung.

---

### Peregi Lionel

**Commits:**
- Anzahl: 2 (über lionel.peregi@gmail.com) + 1 GitHub-PR-Merge (lio766 noreply) = 3
- Davon substanziell: 2, administrativ: 1
- Zeitraum: 21.1.2026 – 25.3.2026
- Zeilen: +2.516 / -1.437 (brutto)
- Branches: PeregiSchoenbauer

**Substanzielle Beiträge:**

1. **Statische Seiten → SPA Migration** (`01e06db`, 25.3.): Du hast die statischen HTML-Seiten durch Redirects auf die Vue-SPA ersetzt und `main.ts` so umgeschrieben, dass es die Vite-gebaute SPA ausliefert. Du hast `package.json` mit Vue/Vite-Abhängigkeiten erstellt und den `vite-plugin-vue-devtools` deaktiviert (Deno-Kompatibilität) (+104/-452).

2. **Backend-Suche und Buchungs-API** (`72d8a0e`, 25.3.): Du hast zwei neue API-Endpunkte erstellt: `GET /api/flights/search` (Server-Suche nach Abflug, Ankunft, Datum) und `POST /api/bookings` (komplette Buchungslogik mit Validierung, Passagier-Erstellung, Kapazitätsprüfung und Buchungsnummer-Generierung). Du hast außerdem `service/booking.ts` als neuen Service implementiert und die Vue-Komponenten mit der Backend-API verbunden (+157/-16).

**Pull Requests:**
- PR #28 (PeregiSchoenbauer → main): Über GitHub gemerged am 21.1.

**Issues:**
- Keine Issues erstellt

**Commit-Nachrichten-Qualität:**
- Mäßig: "Phase 2" und "Phase 3" — informativ im Kontext des phasenbasierten Entwicklungsansatzes, aber ohne Details zu den konkreten Änderungen.

**Geschätzter Zeitaufwand:** mittel

**Qualitative Bewertung:**
- Arbeitsstil: Deadline-getrieben — beide Commits am 25.3. (vorher nur 1 PR-Merge im Januar)
- Beitragstyp: kodeorientiert — Fokus auf Backend-API und Frontend-Backend-Integration
- Sorgfalt: hoch — die Buchungs-API ist sauber implementiert mit Validierung und Fehlerbehandlung

**Gesamteinschätzung:**
Dein Beitrag ist der Schlüssel zur Frontend-Backend-Integration. Ohne deine Buchungs-API (`POST /api/bookings`) und die Such-API (`GET /api/flights/search`) wäre das Vue-Frontend nur eine Hülle ohne Daten. Besonders die Buchungs-Service-Implementierung mit Kapazitätsprüfung und automatischer Buchungsnummer zeigt technisches Verständnis. Die Deaktivierung des DevTools-Plugins zeigt, dass du praktische Probleme gelöst hast. Negativ fällt auf, dass deine gesamte aktive Arbeit auf den 25.3. konzentriert ist — ein klassisches Deadline-Muster. Dennoch ist die Qualität der Beiträge hoch.

---

### Mitrovic Luka

**Commits:**
- Anzahl: 1
- Davon substanziell: 1, oberflächlich: 0
- Zeitraum: 25.3.2026
- Zeilen: +172 / -43
- Branches: PeregiSchoenbauer

**Substanzielle Beiträge:**

1. **API-Routing umstrukturiert** (`b42f417`, 25.3.): Du hast die API-Routing-Architektur umgestellt: Alle API-Endpunkte wurden unter `/api` als separates Hono-Sub-Objekt zusammengefasst, statische Datei-Auslieferung hinzugefügt, ein Health-Check-Endpunkt (`/api/health`) eingeführt und die Vite-Proxy-Konfiguration angepasst (+172/-43).

**Pull Requests:**
- Keine eigenen PRs erstellt

**Issues:**
- Keine Issues erstellt

**Commit-Nachrichten-Qualität:**
- Schlecht: "phase 1" — nichtssagend

**Geschätzter Zeitaufwand:** niedrig

**Qualitative Bewertung:**
- Arbeitsstil: minimal — ein einzelner Commit
- Beitragstyp: kodeorientiert — architektonische Umstrukturierung
- Sorgfalt: mittel — die API-Trennung ist sauber implementiert, aber die Commit-Nachricht ist mangelhaft

**Gesamteinschätzung:**
Du hast eine sinnvolle architektonische Verbesserung vorgenommen — die Trennung von API-Routen und statischer Datei-Auslieferung über Hono's `route()`-Methode. Der Code ist korrekt und folgt guten Praktiken. Allerdings beschränkt sich dein gesamter sichtbarer Beitrag auf diesen einen Commit an einem einzigen Tag. Ich würde gerne mehr über deine Rolle im PeregiSchoenbauer-Team erfahren — ob du beispielsweise an Planung, Pair Programming oder Recherche beteiligt warst, was im Git-Verlauf nicht sichtbar wird.

---

### Macho Lukas

**Commits:**
- Anzahl: 9
- Davon substanziell: 4, oberflächlich: 5 (inkl. 3 Merge-Commits, 1 Revert)
- Zeitraum: 3.12.2025 – 25.3.2026
- Zeilen: +983 / -145 (eigener Code)
- Branches: LukasPreisitz

**Substanzielle Beiträge:**

1. **Seed-Robustheit verbessert** (`e33ba30`, 3.12.): Du hast die Passagier-Erstellung im Seed von Bulk-Operation auf sequenzielle Einzelerstellung mit try/catch umgestellt, sodass Duplikat-E-Mail-Fehler abgefangen und übersprungen werden (+12/-9 in seed.ts).

2. **IATA-Code-Duplikate behandelt** (`2b32e1d`, 3.12.): Du hast die Flughafen-Erstellung im Seed so umgestellt, dass IATA-Code-Kollisionen abgefangen werden — faker-generierte Duplikate werden übersprungen statt den Seed abzubrechen (+18/-15).

3. **Statisches Frontend erstellt** (`a5b0c6f` + `7ea49ba`, 17.12.): Du hast das gesamte statische HTML-Frontend erstellt: `index.html` mit Navigation und Hero-Section, `searchfly.html` mit Suchformular, `bookfly.html` mit 4-Schritte-Buchungsassistent, `styles.css` mit ~500 Zeilen und ein Flughafen-Bild (+880/-56).

4. **ISSUES.md erstellt** (`4202569`, 25.3.): Du hast 5 Issues im Codebase analysiert und dokumentiert: fehlende Relations-Abfrage, TODO in main.ts, defekte VS Code-Konfiguration, fehlende Eingabevalidierung. Jedes Issue mit Schweregrad, Beschreibung, Reproduktionsschritten und Lösungsvorschlag (+60/-0). — Leider im nächsten Commit wieder gelöscht.

**Pull Requests:**
- PR #21 (LukasPreisitz → main): Von Wonisch gemerged — enthielt dein statisches Frontend
- PR #33 (LukasPreisitz → main): Geschlossen — enthielt ISSUES.md (nicht gemerged)

**Issues:**
- Keine Issues auf GitHub erstellt

**Commit-Nachrichten-Qualität:**
- Mittel: Verständlich aber teils englisch/teils deutsch, teilweise ungenau ("Neues ohne Issues" — löscht die ISSUES.md ohne Ersatz)

**Auffälligkeiten:**
- ISSUES.md wurde 9 Minuten nach Erstellung wieder gelöscht — fragwürdig
- HTML hatte initially `<HTml>` als Tag (Tippfehler, später korrigiert)
- Kein Beitrag zu Backend, Service-Schicht oder Datenmodell

**Geschätzter Zeitaufwand:** mittel

**Qualitative Bewertung:**
- Arbeitsstil: phasenhaft — Dezember, Januar (Merges), März
- Beitragstyp: kodeorientiert — Fokus auf Frontend-HTML/CSS und Seed-Skript
- Sorgfalt: mittel — saubere Arbeit an Seeds, aber ISSUES.md-Löschung und HTML-Tippfehler sind unsauber

**Gesamteinschätzung:**
Du hast zwei wesentliche Bereiche beigetragen: die Seed-Robustheit (Duplikat-Behandlung für Passagiere und Flughäfen) und das statische HTML-Frontend. Die Seed-Verbesserungen zeigen praktisches Debugging-Geschick — du hast echte Fehlerquellen identifiziert und behoben. Das statische Frontend war die Grundlage, auf der Wonisch Lukas später aufgebaut hat. Die ISSUES.md-Analyse war wertvoll — es ist schade, dass du sie wieder gelöscht hast. Die Code-Analyse zeigte klares Verständnis der Schwachstellen. Insgesamt eine solide Arbeit mit Fokus auf Praktikabilität.

---

### Wonisch Lukas

**Commits:**
- Anzahl: 6 (über Email Won210343) + 2 GitHub-PR-Merges (SPG-Lukas noreply) = 8
- Davon substanziell: 1, oberflächlich: 7 (6 Merge-Commits + 1 Formatierungs-Commit)
- Zeitraum: 17.12.2025 – 25.3.2026
- Zeilen: +794 / -27 (eigener Code)
- Branches: LukasPreisitz

**Substanzielle Beiträge:**

1. **Frontend-Redesign** (`d845484`, 7.1.): Du hast das statische Frontend massiv überarbeitet und erweitert (+794/-27):
   - **`index.html`**: Upgrade auf HTML5, neue Hero-Section mit Emoji-Icons und CTA-Buttons, 6 Feature-Karten, "Beliebte Reiseziele"-Sektion mit verlinkten Ziel-Karten
   - **3 Destination-Seiten** (neu): `destination-paris.html` (Eiffelturm, Louvre, Notre-Dame, Arc de Triomphe, Sacré-Cœur, Versailles), `destination-rome.html` (Kolosseum, Petersdom, Trevi-Brunnen, Pantheon, Vatikan, Forum Romanum), `destination-barcelona.html` (Sagrada Família, Park Güell, Casa Batlló, Las Ramblas, Barceloneta, Camp Nou) — jeweils mit Flughafen-Info, Sehenswürdigkeiten und Kulinarik
   - **`searchfly.html`**: Beispielsuchergebnisse mit 2 Flug-Karten (Lufthansa EUR 89, Eurowings EUR 75)
   - **`bookfly.html`**: HTML5-Meta-Tags und Emoji-Dekoration
   - **`styles.css`**: Komplettes Redesign mit Gradient-Navbar, Karten-Komponenten, Hover-Effekten, Tile-Grid und Responsive-Breakpoints (+178 neue Zeilen)

**Pull Requests:**
- PR #21 (LukasPreisitz → main): Von dir gemerged — brachte Macho Lukas' statisches Frontend
- PR #25 (main → LukasPreisitz): Von dir gemerged — Synchronisation
- PR #26 (LukasPreisitz → main): Von Georg Graf gemerged — brachte dein Frontend-Redesign

**Issues:**
- Kommentar auf Issue #21: "passt" — Bestätigung

**Commit-Nachrichten-Qualität:**
- Mittel: "style verbesserut und diverse funktionen erneuert und hinzugefuegt" — Tippfehler ("verbesserut"), aber inhaltlich zutreffend

**Geschätzter Zeitaufwand:** mittel

**Qualitative Bewertung:**
- Arbeitsstil: phasenhaft — Dezember (Merges), Januar (aktive Arbeit), März (Merge)
- Beitragstyp: kodeorientiert — Fokus auf Frontend-Design und -Inhalt
- Sorgfalt: mittel — das Frontend-Redesign ist umfangreich und ansprechend, aber alle Daten sind hardcoded ohne Backend-Anbindung

**Gesamteinschätzung:**
Du hast einen großen und sichtbaren Beitrag zum Frontend geleistet. Die drei Destination-Seiten sind inhaltlich reichhaltig und gut gestaltet, und das CSS-Redesign hat die Website optisch deutlich aufgewertet. Du warst außerdem der aktive PR-Manager für das LukasPreisitz-Team — du hast PRs erstellt und gemerged und die Zusammenarbeit mit main koordiniert. Negativ: Dein substanzieller Beitrag beschränkt sich auf einen einzigen Commit (den Frontend-Redesign), und das gesamte Frontend hat keine Backend-Anbindung. Die Destination-Seiten und Suchergebnisse sind reine Mockups mit hardcoded Daten.

---

### Preisitz Florian

**Commits:**
- Anzahl: 1
- Davon substanziell: 0, oberflächlich: 1 (Merge-Commit)
- Zeitraum: 7.1.2026
- Zeilen: +0 / -0 (kein eigener Code)
- Branches: LukasPreisitz

**Substanzielle Beiträge:**
- Keine

**Pull Requests:**
- Keine PRs erstellt

**Issues:**
- Keine Issues erstellt

**Auffälligkeiten:**
- Der einzige Commit ist ein Merge von main in LukasPreisitz — kein einziger Zeile eigenen Codes
- Der Branch ist nach ihm benannt ("LukasPreisitz"), aber es gibt keinen Code-Beitrag von ihm

**Geschätzter Zeitaufwand:** sehr niedrig

**Qualitative Bewertung:**
- Arbeitsstil: nicht erkennbar
- Beitragstyp: kein sichtbarer Beitrag
- Sorgfalt: nicht beurteilbar

**Gesamteinschätzung:**
Über den gesamten Projektzeitraum von November 2025 bis April 2026 habe ich keinen einzigen Zeile eigenen Codes von dir gefunden. Dein einziger Commit ist ein Merge-Operation, bei der du Änderungen aus main in den Branch integriert hast, der deinen Namen trägt. Das wirft Fragen auf: Warst du in das Projekt eingebunden? Gab es unsichtbare Beiträge wie Pair Programming, Planung oder Kommunikation? Ich würde dieses Gespräch gerne mit dir führen, um deine Perspektive zu verstehen.

---

### Schulz Raphael

**Commits:**
- Anzahl: 11 (über Email deine.email@beispiel.com) + 6 GitHub-PR-Merges (Leafoun noreply) = 17
- Davon substanziell: 4 (Code) + 6 (PR-Merges als Leafoun), oberflächlich: 7 (inkl. leere Merges, lockfile, .gitignore)
- Zeitraum: 26.11.2025 – 25.3.2026
- Zeilen: +958 / -491 (Code-Commits) + umfangreiche Merge-Aktivität
- Branches: SchulzMica, main (als Leafoun — PR-Merge-Operator)

**Substanzielle Beiträge:**

1. **Service-Schicht und API aufgebaut** (`e039451`, 26.11.): Dein wertvollster Commit. Du hast die gesamte Service-Schicht mit Validierung erstellt (IATA-Code-Prüfung, E-Mail-Validierung, Kapazitätsprüfung, Abflug-vor-Ankunft-Validierung), `main.ts` von einem 10-Zeilen-Stub zu einem vollständigen API-Server umgeschrieben, das Seed-Skript refaktoriert und `endpoints.rest` massiv erweitert (+475/-80).

2. **Email-Validierung, Async-Fix, DB-Optimierung** (`d4d919c`, 29.12.): Du hast die naive `includes("@")`-Prüfung durch eine korrekte Regex ersetzt, einen echten Async-Bug behoben (`Promise.all` fehlte) und eine ineffiziente Datenbankabfrage durch eine gezielte `findUnique`-Abfrage ersetzt (+20/-14).

3. **Repository-Pattern Migration** (`315f01d`, 7.1.): Du hast 197 Zeilen direkter Prisma-Aufrufe aus den Services entfernt und durch Repository-Funktionsaufrufe ersetzt (+30/-197). — Leider mit Syntaxfehlern, die im Februar behoben werden mussten.

4. **Migration abgeschlossen** (`0c31bfb`, 11.2.): Du hast die Syntaxfehler aus dem vorherigen Commit behoben, die Repository-Pattern-Migration abgeschlossen, eine detaillierte Kapazitätsprüfung mit Fehlermeldung hinzugefügt und Prisma auf 7.2.0 aktualisiert (+401/-123).

**Als Leafoun — Projekt-Integrator:**
Über den GitHub-Account @Leafoun hast du die Rolle des PR-Integrators übernommen und folgende Pull Requests gemerged:
- PR #1 (initial-upload → main): Initiales Repository-Setup
- PR #11 (SchulzMica → main): Service-Schicht-Erweiterung von Mica
- PR #27 (Ljuca_Vukcevic → main): Repository-Schicht von Adnan
- PR #30 (SchulzMica → main): Repository-Pattern-Refactoring
- PR #36 (SchulzMica → main): QUICKSTART-Doku und .gitignore
- Branch-Synchronisation (main → SchulzMica)

**Pull Requests:**
- PR #20 (SchulzMica → main): Von spg-mic gemerged — deine Service-Verbesserungen
- PR #23 (SchulzMica → main): Von spg-mic gemerged — Repository-Pattern-Migration

**Issues:**
- Keine Issues erstellt

**Commit-Nachrichten-Qualität:**
- Mäßig: Spannweite von "Ich hoffe es passt so" über "verbesserung" bis zu sauberen Beschreibungen wie "refactor: services to use repository functions instead of direct prisma calls, add flight capacity validation"

**Auffälligkeiten:**
- Commit `315f01d` hat die Codebasis in einem nicht kompilierbaren Zustand hinterlassen (Syntaxfehler wie `exporeturn`, verkettete Zeilen)
- Das zeigt, dass `deno task check` oder `deno task dev` vor dem Commit nicht ausgeführt wurde
- Die Leafoun-Identität als PR-Integrator war nicht offensichtlich — sie diente als wichtige Koordinationsrolle

**Geschätzter Zeitaufwand:** hoch

**Qualitative Bewertung:**
- Arbeitsstil: regelmäßig — November, Dezember, Januar, Februar, März
- Beitragstyp: gemischt — Backend-Architektur, Service-Schicht, PR-Koordination
- Sorgfalt: mittel — die Grundlagenarbeit ist solide, aber der fehlerhafte Refactoring-Commit ist ein Qualitätsmangel

**Gesamteinschätzung:**
Du hast die technischen Grundlagen des Projekts gelegt — ohne deinen ersten Commit gäbe es keine Service-Schicht, keinen API-Server und keine Validierung. Die Bugfixes im Dezember zeigen echtes Debugging-Geschick. Gleichzeitig warst du als Leafoun der unsichtbare Projektkoordinator, der die Arbeit aller Teams über PR-Merges in main integriert hat. Diese Doppelrolle ist beachtlich. Negativ: Der fehlerhafte Refactoring-Commit im Januar hat die Codebasis temporär kaputt gemacht und musste im Februar repariert werden. Die Commit-Nachricht "Ich hoffe es passt so" beim foundational Commit ist ebenfalls ein Warnsignal. Insgesamt ist dein Beitrag jedoch wesentlich für das Projekt — sowohl als Code-Autor als auch als Integrator.

---

### Mica Dwayne

**Commits:**
- Anzahl: 6 (über Email mic210331) + 3 GitHub-PR-Merges (spg-mic noreply) = 9
- Davon substanziell: 2 (Code) + 3 (PR-Merges), oberflächlich: 4 (lockfile, Merge-Syncs)
- Zeitraum: 3.12.2025 – 25.3.2026
- Zeilen: +386 / -4 (eigener Code)
- Branches: SchulzMica

**Substanzielle Beiträge:**

1. **Umfassende Service-Erweiterung** (`3baa3e2`, 17.12.): Dein Hauptbeitrag. Du hast die Service-Schicht um 361 Zeilen erweitert und folgende Funktionen über alle vier Entitäten hinzugefügt (+361/-3):
   - **Airport**: updateAirport (IATA-Validierung), deleteAirport (Flugabhängigkeit), findAirportById, findAirportByIataCode, searchAirportsByCity
   - **Flight**: updateFlight (Zeitvalidierung, Origin ≠ Destination), deleteFlight (Passagierabhängigkeit), getFlightCapacity, removePassengerFromFlight, findFlightsByOrigin/Destination/Route (mit Paginierung)
   - **Passenger**: updatePassenger (E-Mail-Validierung), deletePassenger (Buchungsabhängigkeit), findPassengerById/ByEmail, searchPassengersByName (partielles Matching), getPassengerFlights
   - **Plane**: updatePlane (Kapazität 1-1000), deletePlane (Flugabhängigkeit), findPlaneById, findPlanesByModel, getPlaneStatistics (Flüge, Passagiere, Auslastung)

2. **QUICKSTART-Dokumentation** (`d11d209`, 25.3.): Du hast QUICKSTART.md um eine Git-Befehls-Referenztabelle und einen 5-Schritte-Projekt-Workflow erweitert (+25/-1).

**Als PR-Merger:**
- PR #8 (SchulzMica → main): Erster Merge der Service-Schicht in main
- PR #20 (SchulzMica → main): Service-Verbesserungen
- PR #23 (SchulzMica → main): Repository-Pattern-Refactoring

**Pull Requests:**
- PRs #8, #20, #23 von dir über GitHub gemerged

**Issues:**
- Keine Issues erstellt

**Commit-Nachrichten-Qualität:**
- Mäßig bis schlecht: "x" (ein Buchstabe), "Changes 1712 services to add new features and fix bugs" (sinnvoll), "Issue Fixed: ReadME / QUICKSTART" (zutreffend)

**Auffälligkeiten:**
- Inline `await import()` für Prisma statt konsistenter Top-Level-Imports
- Commit-Nachricht "x" ist nicht akzeptabel
- Gute Zusammenarbeit mit Raphael — du hast seine PRs gemerged und umgekehrt

**Geschätzter Zeitaufwand:** mittel

**Qualitative Bewertung:**
- Arbeitsstil: phasenhaft — Dezember (Hauptarbeit), Januar (Merges), März (Dokumentation)
- Beitragstyp: kodeorientiert — Fokus auf Service-Schicht mit Validierung
- Sorgfalt: mittel — die Validierung ist gründlich, aber Code-Stil und Commit-Nachrichten sind uneinheitlich

**Gesamteinschätzung:**
Du hast den größten Teil der Service-Schicht-Erweiterung beigetragen — 361 Zeilen CRUD-Operationen mit Validierung, Fehlerbehandlung und Paginierung. Das ist eine erhebliche Menge an Code, der die Grundlage für die gesamte Geschäftslogik bildet. Besonders die Validierungslogik (IATA-Codes, E-Mail-Format, Kapazitätsbereiche, zeitliche Konsistenz) zeigt technisches Verständnis. Du hast außerdem die PR-Integration für das SchulzMica-Team übernommen. Die QUICKSTART-Dokumentation ist ein nützlicher Beitrag für das Team. Negativ: Die Commit-Nachrichtenqualität ist mangelhaft (insbesondere "x"), und der Code verwendet teilweise inkonsistente Import-Patterns.

---

### Davies Linda (off-record)

**Commits:**
- Anzahl: 5
- Davon substanziell: 5 (inkl. Merge-Commits mit eigener Konfliktlösung)
- Zeitraum: 7.1.2026 – 21.1.2026
- Zeilen: +2.987 / -3.164 (brutto)
- Branches: PeregiSchoenbauer

**Substanzielle Beiträge:**

1. **Frontend mit Backend verknüpft** (`95ef454`, 7.1.): Du hast die Flug-Endpunkte korrigiert (`include=relations` statt loose Truthy-Check), `scripts/check_counts.ts` als Diagnose-Tool erstellt und das Seed mit 31 echten europäischen Flughäfen anstelle von Faker-Daten bestückt (+88/-7). — Leider mit uneingekcheckten Merge-Konflikt-Markern.

2. **Projektumstrukturierung** (`1647aa`, 21.1.): Du hast die `AirlinesLioJakob/`-Subdirectory in das Repository-Root verschoben — eine kritische Umstrukturierung, die alle Vue-Dateien und Konfigurationen an die richtige Stelle brachte (+1.093/-107).

3. **Merge-Konflikt-Marker behoben** (`d3b9fcf`, 21.1.): Du hast die zuvor eingecheckten Merge-Konflikt-Marker in `seed.ts` aufgelöst, den falschen Methodennamen `getAll` → `getAllAirports` korrigiert und die npm-Abhängigkeiten korrekt in Denos `imports` migriert (+20/-18).

**Anmerkung:** Linda ist nicht Teil der Klasse 5AHWII, sondern hat als externe Beitragende (5EHIF) am PeregiSchoenbauer-Branch mitgearbeitet. Ihre Beiträge sind technisch wertvoll — besonders die Umstrukturierung und die realen Flughafen-Daten. Die eingecheckten Merge-Konflikt-Marker sind ein Qualitätsmangel, der jedoch im Folgocommit behoben wurde.

---

### Lehrperson: Georg Graf (Kontext)

**Commits:** 24 | **Zeitraum:** 26.11.2025 – 8.4.2026

**Beiträge:**
- Initiales Repository-Setup (Prisma-Schema, Migrationen, Basis-Code)
- Wissensdokumentation (`docs/ai/`)
- GitHub Issues #43-#52 erstellt (Projektverbesserungsvorschläge)
- Branch-Synchronisationen und Merge-Unterstützung
- Seed-Korrekturen

---

## Zusammenfassung

### Auffällige Beobachtungen

1. **Schönbauer Jakob** ist der klare Primär-Autor des Projekts — Frontend-Architektur, Build-Pipeline, Dokumentation und Projektumstrukturierung.

2. **Schulz Raphael** (inkl. Leafoun-Identität) hat die technischen Grundlagen gelegt und als Projekt-Integrator fungiert.

3. **Preisitz Florian** hat keinen einzigen Zeile eigenen Codes beigetragen — nur ein Merge-Commit.

4. **Vukcevic Leon** hat nur einen Commit, der aber ein kritischer Import-Fix war.

5. **Die meisten Teams** zeigen Deadline-getriebene Arbeitsmuster — die Mehrheit der Commits konzentriert sich auf wenige Tage.

6. **Die Code-Qualität variiert stark** — von professioneller phasenbasierter Entwicklung (Schönbauer) bis zu einzelnen Buchstaben als Commit-Nachrichten (Rigler).

7. **Nur 2 der 14 Studierenden** haben GitHub Issues erstellt (Lukic Marko, Virgl Carlos).

8. **Die Projektstruktur** wurde mehrfach umgebaut — `AirlinesLioJakob/` wurde von legorki, dann von Schönbauer verschoben, mit overlapping Commits.

### Empfehlungen für Gespräche

- **Preisitz Florian**: Klären, ob unsichtbare Beiträge vorhanden sind
- **Vukcevic Leon**: Verstehen, warum nur ein Commit
- **Spasov Spas**: Irreführende Commit-Nachrichten thematisieren
- **Rigler Timo**: Commit-Hygiene und Branch-Management besprechen
- **Alle**: Spanne zwischen	regelmäßiger und Deadline-getriebener Arbeit diskutieren
