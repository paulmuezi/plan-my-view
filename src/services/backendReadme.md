# Backend Integration Guide

Diese Datei enthält alle Informationen, die du brauchst, um die Zahlungsintegration auf deinem Backend zu implementieren.

## Voraussetzungen

1. Node.js Backend (Express empfohlen)
2. Stripe Account: https://dashboard.stripe.com
3. PayPal Developer Account: https://developer.paypal.com

## 1. Backend Setup

```bash
# Erstelle ein neues Backend-Projekt
mkdir lageplaner-backend
cd lageplaner-backend
npm init -y

# Installiere Dependencies
npm install express cors dotenv stripe
```

## 2. Umgebungsvariablen (.env)

```env
# Server
PORT=3001
FRONTEND_URL=http://localhost:5173

# Stripe
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX

# PayPal
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_CLIENT_SECRET
PAYPAL_MODE=sandbox  # oder 'live' für Produktion
```

## 3. Express Server (server.js)

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripeRoutes = require('./routes/stripe');
const paypalRoutes = require('./routes/paypal');

const app = express();

// CORS für dein Frontend
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// JSON Parser (außer für Stripe Webhook)
app.use((req, res, next) => {
  if (req.originalUrl === '/api/stripe/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/paypal', paypalRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

## 4. Stripe Integration

Kopiere den Server-Code aus `src/services/stripeService.ts` in `routes/stripe.js`.

### Wichtige Schritte:
1. Erstelle einen Stripe Account
2. Hole deinen Secret Key (sk_test_... für Test, sk_live_... für Produktion)
3. Erstelle einen Webhook Endpoint in Stripe Dashboard
4. Kopiere den Webhook Signing Secret

### Frontend Anpassungen:
1. Installiere: `npm install @stripe/stripe-js @stripe/react-stripe-js`
2. Ersetze den BACKEND_URL in `stripeService.ts`
3. Füge den Publishable Key in deine App ein

## 5. PayPal Integration

Kopiere den Server-Code aus `src/services/paypalService.ts` in `routes/paypal.js`.

### Wichtige Schritte:
1. Erstelle einen PayPal Developer Account
2. Erstelle eine Sandbox App
3. Kopiere Client ID und Secret

### Frontend Anpassungen:
1. Installiere: `npm install @paypal/react-paypal-js`
2. Ersetze den BACKEND_URL in `paypalService.ts`
3. Füge die Client ID in deine App ein

## 6. Sicherheits-Checkliste

- [ ] Secret Keys NIE im Frontend speichern
- [ ] HTTPS in Produktion verwenden
- [ ] Webhook Signaturen verifizieren
- [ ] Input Validierung implementieren
- [ ] Rate Limiting einrichten
- [ ] Error Logging implementieren

## 7. Test-Karten (Stripe)

| Karte | Nummer |
|-------|--------|
| Erfolg | 4242 4242 4242 4242 |
| Ablehnung | 4000 0000 0000 0002 |
| 3D Secure | 4000 0025 0000 3155 |

## 8. Test-Accounts (PayPal)

Erstelle Sandbox-Accounts unter:
https://developer.paypal.com/developer/accounts/

## Support

- Stripe Docs: https://stripe.com/docs
- PayPal Docs: https://developer.paypal.com/docs
