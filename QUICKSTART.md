# ⚡ Quick Start Guide

## 🚀 So startest du die Anwendung

### Terminal 1: Backend starten
```bash
cd airlines-2025
deno run -A --env-file --watch main.ts
```
✅ Backend läuft unter http://localhost:3000

### Terminal 2: Frontend starten
```bash
cd airlines-2025/AirlinesLioJakob
npm run dev
```
✅ Frontend läuft unter http://localhost:5173

### Terminal 3: Seed ausführen (nur einmalig!)
```bash
cd airlines-2025
deno run -A --env-file seed.ts
```
✅ 6000 Flüge werden in die Datenbank eingefügt

---

## 📋 Checkliste

- [ ] Deno installiert? `deno --version`
- [ ] Node.js installiert? `node --version`
- [ ] `npm install` im `AirlinesLioJakob` Ordner ausgeführt?
- [ ] Migration durchgeführt? `deno run -A --env-file prisma migrate dev`
- [ ] Seed ausgeführt? `deno run -A --env-file seed.ts`
- [ ] Backend läuft auf :3000?
- [ ] Frontend läuft auf :5173?

---

## 🧪 Test die Anwendung

1. Öffne http://localhost:5173 im Browser
2. Klicke auf "Flüge Suchen"
3. Wähle eine Stadt aus (z.B. Wien → Berlin)
4. Wähle ein zukünftiges Datum
5. Klicke "Suchen"
6. Wähle einen Flug aus
7. Klicke "Zur Buchung"
8. Fülle Passagier-Daten aus
9. Klicke "Jetzt Buchen"

---

## 🛠️ Troubleshooting

| Problem | Lösung |
|---------|---------|
| "Cannot find module" | `npm install` ausführen |
| "http://localhost:3000 nicht erreichbar" | Backend-Terminal prüfen |
| "Keine Flüge angezeigt" | `deno run -A --env-file seed.ts` ausführen |
| "CORS Error" | Frontend-Proxy sollte funktionieren, Backend prüfen |
| "Datenbank existiert nicht" | `deno run -A --env-file prisma migrate dev` ausführen |

---

## 📚 Wichtige Dateien

```
airlines-2025/
├── SETUP.md                    # 📖 Ausführliches Setup-Guide
├── CHANGES.md                  # 📝 Alle Änderungen dokumentiert
├── seed.ts                     # 🌱 Generiert 6000 Flüge
├── main.ts                     # 🔌 Backend API
│
└── AirlinesLioJakob/
    ├── src/
    │   ├── App.vue            # Navigation
    │   ├── pages/
    │   │   ├── Home.vue       # Startseite
    │   │   ├── FlightSearch.vue  # Flugsuche mit API
    │   │   └── BookFlight.vue    # Buchung mit API
    │   └── router.js          # Routing
    └── vite.config.js         # Mit API Proxy
```

---

## 🎨 Für CSS-Team

Die Anwendung ist ready zum Stylen!

1. Starte Backend und Frontend
2. Öffne http://localhost:5173
3. Öffne Developer Tools (F12)
4. Bearbeite `AirlinesLioJakob/src/pages/*.vue` Dateien
5. CSS-Klassen sind bereits vorhanden, einfach stylen!

Keine Vue-Logik ändern - nur CSS! 🎨

---

**Viel Erfolg! 🚀**
