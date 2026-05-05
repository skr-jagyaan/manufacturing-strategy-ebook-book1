# Manufacturing Strategy Series — Backend

Node.js backend for The Manufacturing Strategy Series reader portal.
Handles Razorpay payments, buyer login, and email delivery.

## Stack
- Node.js + Express
- Railway PostgreSQL (auto-connected via DATABASE_URL)
- Nodemailer for email delivery

## Environment Variables

Set these in Railway → Variables tab:

| Variable | Description |
|----------|-------------|
| `EMAIL_HOST` | SMTP host — e.g. `mail.sudharsankr.co.in` |
| `EMAIL_PORT` | SMTP port — `587` |
| `EMAIL_USER` | `info@sudharsankr.co.in` |
| `EMAIL_PASS` | Your email password |
| `READER_URL` | `https://read.sudharsankr.co.in` |
| `RZP_SECRET` | Your Razorpay secret key |

`DATABASE_URL` is injected automatically by Railway — do not add manually.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Health check |
| POST | `/payment-success` | Creates buyer account + sends credentials email |
| POST | `/login` | Validates credentials, returns session token |
| POST | `/verify` | Verifies session token |

## Deploy on Railway

1. Push this repo to GitHub
2. Go to railway.app → New Project → GitHub Repository → select this repo
3. Add PostgreSQL — Railway → + New → Database → PostgreSQL
4. Add environment variables in Railway → Variables tab
5. Railway auto-deploys — copy your domain from Settings → Domains
