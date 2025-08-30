# 🤖 Google Gemini API Key - Schritt für Schritt Anleitung

## Was ist Gemini AI?
Gemini AI generiert automatisch professionelle Anschreiben und Motivationsschreiben für Ihre Bewerbungen.

---

## 📝 SCHRITT 1: Google Account vorbereiten

1. Sie brauchen einen **Google Account** (Gmail)
2. Falls Sie keinen haben: https://accounts.google.com/signup

---

## 🔑 SCHRITT 2: Gemini API Key erstellen

### 1. Öffnen Sie Google AI Studio:
👉 https://makersuite.google.com/app/apikey

### 2. Melden Sie sich an:
- Mit Ihrem Google Account einloggen

### 3. API Key erstellen:
- Klicken Sie auf **"Create API Key"** (Blauer Button)
- Wählen Sie **"Create API key in new project"**
- Warten Sie kurz...

### 4. Key kopieren:
- Der Key wird angezeigt (sieht so aus: `AIzaSy...`)
- Klicken Sie auf **"Copy"** 📋
- **WICHTIG:** Speichern Sie den Key sicher!

---

## 🚀 SCHRITT 3: Key in Vercel hinzufügen

### 1. Öffnen Sie Vercel:
👉 https://vercel.com/dashboard

### 2. Klicken Sie auf Ihr Projekt:
`consultant-booking-payments-triu`

### 3. Gehen Sie zu Settings:
Oben → **"Settings"**

### 4. Environment Variables:
Links → **"Environment Variables"**

### 5. Neue Variable hinzufügen:

**Key (Name):**
```
GEMINI_API_KEY
```

**Value:**
```
[Ihr kopierter API Key einfügen]
```

### 6. Environment auswählen:
✅ Production  
✅ Preview  
✅ Development  

### 7. Klicken Sie **"Save"**

---

## 🔄 SCHRITT 4: Redeploy

### 1. Gehen Sie zu "Deployments"
Oben in der Navigation

### 2. Drei Punkte (...) beim letzten Deployment
Klicken Sie darauf

### 3. Wählen Sie "Redeploy"

### 4. Bestätigen Sie "Redeploy"

---

## ✅ SCHRITT 5: Testen

1. Öffnen Sie Ihre Website
2. Gehen Sie zu **"CV & Application Letter Service"**
3. Füllen Sie das CV-Formular aus
4. Scrollen Sie nach unten zu **"AI Document Generation"**
5. Fügen Sie eine Stellenbeschreibung ein
6. Klicken Sie **"Generate Documents"**

### Funktioniert es?
- ✅ Dokumente werden generiert → **Perfekt!**
- ❌ Fehler erscheint → Prüfen Sie den API Key

---

## 🆓 Wichtige Infos

### Kostenlose Nutzung:
- Gemini API hat ein **kostenloses Kontingent**
- Reicht für viele Generierungen pro Monat
- Keine Kreditkarte erforderlich

### Limits:
- 60 Anfragen pro Minute
- Für normale Nutzung mehr als ausreichend

---

## ❓ Häufige Probleme

### "API Key invalid":
- Prüfen Sie ob der Key korrekt kopiert wurde
- Keine Leerzeichen am Anfang/Ende

### "Quota exceeded":
- Sie haben das kostenlose Limit erreicht
- Warten Sie bis zum nächsten Tag

### Dokumente werden nicht generiert:
- Prüfen Sie ob Redeploy durchgeführt wurde
- Browser-Cache leeren (Strg+F5)

---

## 🔒 Sicherheit

- Der API Key ist nur im Backend sichtbar
- Niemand kann ihn im Browser sehen
- Google überwacht verdächtige Aktivitäten

---

## 📞 Hilfe

- Google AI Studio Support: https://ai.google.dev/support
- Gemini API Docs: https://ai.google.dev/docs

---

## 🎉 Fertig!

Ihre Benutzer können jetzt mit KI-Unterstützung professionelle Bewerbungsunterlagen erstellen!