# Vercel Deployment Guide

## Übersicht
Diese Anwendung ist für Vercel optimiert mit Frontend und Backend (Vercel Functions) für sichere Stripe-Zahlungsabwicklung.

## Vercel Umgebungsvariablen

Fügen Sie diese in Ihrem Vercel Dashboard unter Project Settings → Environment Variables hinzu:

### Erforderlich für Zahlungen:
```
STRIPE_PUBLIC_KEY=pk_live_51Rl8nWP0OXBFDAIs5mqRhh9atthTjfxC9DpXPhaQGCzd4LYWxBBqQrmq0kd6orkf8VuiJAzcH0CuRayqzPekdGm900pTg7NIl6
STRIPE_SECRET_KEY=sk_live_YOUR_STRIPE_SECRET_KEY_HERE
```

### Für Stripe Webhooks (nach Einrichtung):
```
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

### Für Gemini AI (CV Generator):
```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

### Optional für Paystack (wenn aktiviert):
```
PAYSTACK_PUBLIC_KEY=pk_test_e201bcc36df323415e558f8b20f67d23b7d4035b
PAYSTACK_SECRET_KEY=sk_test_YOUR_PAYSTACK_SECRET_KEY_HERE
```

## Stripe Dashboard Konfiguration

1. **Domains hinzufügen** (https://dashboard.stripe.com/account/checkout/settings):
   - Für Development: `http://localhost:5173`
   - Für Production: `https://ihre-domain.vercel.app`

2. **Webhook einrichten** (https://dashboard.stripe.com/webhooks):
   - Endpoint URL: `https://ihre-domain.vercel.app/api/stripe-webhook`
   - Events auswählen:
     - `checkout.session.completed`
     - `checkout.session.expired`
   - Webhook Secret kopieren und als `STRIPE_WEBHOOK_SECRET` speichern

## Projektstruktur

```
/
├── api/                          # Vercel Functions (Backend)
│   ├── create-checkout-session.ts  # Stripe Checkout Session erstellen
│   └── stripe-webhook.ts           # Stripe Webhook Handler
├── components/                   # React Components
├── index.html                    # Entry point
├── package.json                  # Dependencies
└── vite.config.ts               # Vite configuration
```

## Deployment

1. **GitHub Repository verbinden**:
   - In Vercel Dashboard → Import Git Repository
   - GitHub Repository auswählen

2. **Build Settings** (automatisch erkannt):
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables hinzufügen** (siehe oben)

4. **Deploy** klicken

## Sicherheitshinweise

- **NIE** Secret Keys im Frontend-Code verwenden
- Alle Secret Keys nur in Vercel Environment Variables
- Webhook Endpoints validieren Stripe-Signatur
- CORS ist für API-Endpoints konfiguriert

## Testing

1. **Stripe Test Mode**:
   - Test Keys verwenden (beginnen mit `pk_test_` und `sk_test_`)
   - Test Karten: 4242 4242 4242 4242

2. **Lokales Testing mit Vercel CLI**:
   ```bash
   npm i -g vercel
   vercel dev
   ```

## Production Checklist

- [ ] Live Stripe Keys eingetragen
- [ ] Webhook Secret konfiguriert
- [ ] Domains in Stripe Dashboard hinzugefügt
- [ ] Webhook Endpoint getestet
- [ ] Erfolgreiche Test-Transaktion durchgeführt