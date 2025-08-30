# 🚀 Vercel Deployment - Schritt für Schritt Anleitung für Anfänger

## Was Sie brauchen:
- ✅ GitHub Account (haben Sie schon)
- ✅ Vercel Account (kostenlos)
- ✅ Stripe Account (haben Sie schon)

---

## 📝 SCHRITT 1: Vercel Account erstellen

1. Öffnen Sie: https://vercel.com
2. Klicken Sie auf **"Sign Up"** (oben rechts)
3. Wählen Sie **"Continue with GitHub"**
4. Melden Sie sich mit Ihrem GitHub Account an
5. Erlauben Sie Vercel den Zugriff

---

## 🔗 SCHRITT 2: Projekt importieren

1. Sie landen auf dem Vercel Dashboard
2. Klicken Sie auf **"Add New..."** → **"Project"**
3. Sie sehen Ihre GitHub Repositories
4. Suchen Sie **"immigermany"**
5. Klicken Sie auf **"Import"**

---

## ⚙️ SCHRITT 3: Projekt konfigurieren

### Framework Preset:
- Vercel erkennt automatisch **"Vite"** ✅
- Lassen Sie es so!

### Build Settings (sollte automatisch ausgefüllt sein):
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### WICHTIG - Environment Variables hinzufügen:

Klicken Sie auf **"Environment Variables"** und fügen Sie diese ein:

#### Variable 1:
- **Name:** `STRIPE_PUBLIC_KEY`
- **Value:** `pk_live_51Rl8nWP0OXBFDAIs5mqRhh9atthTjfxC9DpXPhaQGCzd4LYWxBBqQrmq0kd6orkf8VuiJAzcH0CuRayqzPekdGm900pTg7NIl6`
- Klicken Sie **"Add"**

#### Variable 2:
- **Name:** `STRIPE_SECRET_KEY`
- **Value:** (Den Secret Key aus Ihrem Stripe Dashboard - beginnt mit `sk_live_`)
- Klicken Sie **"Add"**

⚠️ **WICHTIG:** Den Stripe Secret Key finden Sie hier:
1. Gehen Sie zu https://dashboard.stripe.com
2. Klicken Sie auf **"Developers"** → **"API keys"**
3. Kopieren Sie den **"Secret key"** (Sie müssen ihn eventuell erst anzeigen lassen)

---

## 🚀 SCHRITT 4: Deployment starten

1. Klicken Sie auf **"Deploy"**
2. Warten Sie 1-2 Minuten ☕
3. Sie sehen den Fortschritt live
4. Wenn fertig: **"Congratulations!"** erscheint

---

## 🌐 SCHRITT 5: Ihre Website ist live!

1. Klicken Sie auf **"Visit"** oder den Link
2. Ihre URL sieht so aus: `https://immigermany.vercel.app`
3. Speichern Sie diese URL!

---

## 💳 SCHRITT 6: Stripe konfigurieren

### Domain hinzufügen:
1. Gehen Sie zu: https://dashboard.stripe.com/settings/checkout
2. Unter **"Domains"** klicken Sie **"+ Add domain"**
3. Fügen Sie Ihre Vercel URL ein: `https://immigermany.vercel.app`
4. Klicken Sie **"Add"**

### Webhook einrichten (Optional - für automatische Bestätigungen):
1. Gehen Sie zu: https://dashboard.stripe.com/webhooks
2. Klicken Sie **"Add endpoint"**

whsec_wKsu3Wnq266jv9FGrEc8PgE7WTyksbim
3. **Endpoint URL:** `https://immigermany.vercel.app/api/stripe-webhook`
4. Wählen Sie diese Events:
   - ✅ checkout.session.completed
   - ✅ checkout.session.expired
5. Klicken Sie **"Add endpoint"**
6. Kopieren Sie das **"Signing secret"** (beginnt mit `whsec_`)

### Webhook Secret zu Vercel hinzufügen:
1. Zurück zu Vercel Dashboard
2. Klicken Sie auf Ihr Projekt
3. Gehen Sie zu **"Settings"** → **"Environment Variables"**
4. Fügen Sie hinzu:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** (Das kopierte Signing secret)
5. Klicken Sie **"Save"**

---

## ✅ SCHRITT 7: Testen

1. Öffnen Sie Ihre Website
2. Wählen Sie einen Service
3. Füllen Sie das Formular aus
4. Versuchen Sie zu bezahlen
5. Sie werden zu Stripe weitergeleitet

---

## 🔄 Updates deployen

Wenn Sie Änderungen machen:
1. Pushen Sie zu GitHub (wie gewohnt)
2. Vercel deployed **automatisch** neu!
3. Dauert nur 1-2 Minuten

---

## ❓ Häufige Probleme

### "Page not found" Fehler:
- Warten Sie 2-3 Minuten nach dem Deployment
- Aktualisieren Sie die Seite

### Zahlung funktioniert nicht:
- Prüfen Sie, ob die Domain in Stripe hinzugefügt wurde
- Prüfen Sie, ob der Secret Key korrekt ist

### Änderungen werden nicht angezeigt:
- Cache leeren (Strg+F5 oder Cmd+Shift+R)
- Prüfen Sie im Vercel Dashboard ob das Deployment erfolgreich war

---

## 📞 Hilfe

- Vercel Support: https://vercel.com/support
- Stripe Support: https://support.stripe.com
- Vercel Status: https://www.vercel-status.com

---

## 🎉 Fertig!

Ihre Website ist jetzt live und kann Zahlungen entgegennehmen!
