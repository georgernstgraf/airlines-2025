# Airlines - Setup Guide

## Überblick

Diese Anwendung besteht aus zwei Teilen:

1. **Backend** (Deno/TypeScript) - Läuft auf http://localhost:3000
2. **Frontend** (Vue.js) - Läuft auf http://localhost:5173

## Voraussetzungen

- **Deno** (für Backend)
- **Node.js** und **npm** (für Frontend)
- Ein **SQLite**-Datenbank (wird automatisch erstellt)

## Setup Anleitung

### 1. Datenbank-Migration durchführen

Navigiere zum Root-Verzeichnis des Projekts:

```bash
cd airlines-2025
deno run -A --env-file prisma migrate dev
```

### 2. Datenbank mit Seed-Daten füllen (6000 Flüge!)

```bash
deno run -A --env-file seed.ts
```

Dies erstellt:

- 20.000 Passagiere
- 100 Flughäfen (mit echten IATA-Codes von Faker)
- 250 Flugzeuge
- **6000 Flüge** mit verschiedenen Routen, Zeiten und Kapazitäten

### 3. Backend starten

```bash
deno run -A --env-file --watch main.ts
```

Backend läuft unter: http://localhost:3000

### 4. Frontend starten (in einem neuen Terminal)

```bash
cd AirlinesLioJakob
npm install  # Falls noch nicht gemacht
npm run dev
```

Frontend läuft unter: http://localhost:5173

## Funktionen

### 🏠 Homepage

- Willkommensbereich
- Erklärung wie die App funktioniert
- Call-to-Action zum Flügesuchen

### 🔍 Flüge suchen

- Suche nach Abflugort, Zielort, Datum und Anzahl Passagiere
- Autocomplete für Städte basierend auf Flughafen-Daten
- Live-Filterung der 6000 verfügbaren Flüge
- Anzeige von bis zu 50 Ergebnissen
- Auswahl eines Fluges

### ✈️ Flüge buchen

- Einzige Anforderung: Passagier-Informationen (Vorname, Nachname, Email)
- Keine Zahlungsinformationen erforderlich!
- Validierung aller Felder
- Bestätigungsseite mit Buchungsnummer
- Speicherung in sessionStorage

### 📊 Daten

Die Datenbank enthält:

- **Flughäfen**: 100 verschiedene, mit echten IATA-Codes und Städten
- **Flugzeuge**: 250 verschiedene Modelle mit unterschiedlicher Kapazität (10-850 Plätze)
- **Flüge**: 6000 Flüge mit verschiedenen Kombinationen
- **Passagiere**: 20.000 generierte Profile

## Technologie-Stack

### Backend

- **Deno** - TypeScript Runtime
- **Hono** - Web Framework
- **Prisma** - ORM für Datenbank
- **Faker** - Daten-Generierung
- **SQLite** - Datenbank

### Frontend

- **Vue.js 3** - Progressive Framework
- **Vue Router** - Routing
- **Vite** - Build Tool

## API Endpoints

```
GET  /airports
GET  /planes
GET  /passengers
GET  /flights
GET  /flights?include=relations    # Mit Relationen (Airport, Plane)
GET  /flights/:id
POST /flights/:id/passengers       # Passagiere buchen
```

## Design-Hinweise

Die Anwendung ist **ohne echtes CSS-Design** aufgebaut. Das andere Team kann:

- CSS anpassen basierend auf CheckFelix Design
- Nur die `.vue` Dateien im `AirlinesLioJakob/src/pages` Ordner editieren
- Keine Vue-Logik ändern - nur CSS modifizieren

## Entwicklung

### Neue Flüge in der Datenbank hinzufügen

```bash
# Datenbank zurücksetzen (nur in Entwicklung!)
deno run -A --env-file prisma migrate reset

# Dann neu seeden
deno run -A --env-file seed.ts
```

### Datenbank anschauen

```bash
# Prisma Studio (GUI für Datenbank)
deno run -A prisma studio
```

## Problembehebung

### "Cannot find module..." Fehler

→ `npm install` im `AirlinesLioJakob` Ordner ausführen

### Backend lädt nicht auf http://localhost:3000

→ Stelle sicher, dass Deno installiert ist: `deno --version`

### Flüge werden nicht angezeigt

→ Stelle sicher, dass du `deno run -A --env-file seed.ts` ausgeführt hast

### CORS-Fehler

→ Der Proxy in `vite.config.js` sollte das beheben. Falls nicht, prüfe, ob Backend auf 3000 läuft.

## Next Steps

- CSS-Team kann jetzt das Design anpassen
- Weitere Features können hinzugefügt werden (z.B. Buchungsverwaltung, Rückflüge, etc.)
- Backend kann mit echter Zahlungsgateway-Integration erweitert werden

Viel Spaß beim Entwickeln! 🚀
