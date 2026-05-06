# Why Great Manufacturers Stay Invisible
### Interactive Book Experience — Sudharsan K R

---

## Folder Structure

```
book-app/
├── server.js              — Express backend (Railway)
├── package.json           — Dependencies
├── public/
│   ├── index.html         — Shell (loads once, never reloads)
│   ├── app.js             — SPA brain (routing, navigation, Gemini calls)
│   └── style.css          — Complete design system
├── chapters/
│   ├── ch1.js             — Chapter 1: The 18-Hour Founder
│   ├── ch2.js             — Chapter 2: Why Good Businesses Plateau
│   ├── ch3.js             — Chapter 3: The Peanut Butter Business
│   ├── ch4.js             — Chapter 4: The Commodity Trap
│   ├── ch5.js             — Chapter 5: Brand Is Not Marketing
│   ├── ch6.js             — Chapter 6: The Power of Strategic Focus
│   ├── ch7.js             — Chapter 7: The Real Growth Problem
│   ├── ch8.js             — Chapter 8: The Question Most Businesses Never Ask
│   ├── ch9.js             — Chapter 9: The Beginning of Strategy
│   ├── backmatter.js      — Back matter (Appendices, Vikram closing, Diagnosis teaser)
│   └── diagnosis.js       — Diagnosis experience (to be built)
├── onboarding/
│   └── onboarding.js      — Front matter (Cover through Vikram intro)
└── assets/
    └── workbook.pdf       — Place the Workbook PDF here
```

---

## Deploy to Railway

### Step 1 — Environment Variables
Add this in Railway dashboard → Variables:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Step 2 — Place the Workbook PDF
Put the Workbook PDF at:
```
assets/workbook.pdf
```

### Step 3 — Update Railway URL in app.js
In `public/app.js`, find this line and replace with your actual Railway URL:
```js
const RAILWAY_URL = 'https://your-railway-app.up.railway.app';
```

### Step 4 — Deploy
Push to Railway. It runs `npm start` which runs `node server.js`.

---

## URL Routes

| URL | What loads |
|-----|-----------|
| `/` | Onboarding (if new user) or last chapter (if returning) |
| `/chapter/1` through `/chapter/9` | Chapter screens |
| `/backmatter` | Back matter (appendices, Vikram closing, workbook, diagnosis teaser) |
| `/diagnosis` | Sudharsan's personalised diagnosis |
| `/api/agent` | Gemini proxy — Vikram's notes (POST) |
| `/api/diagnosis` | Gemini proxy — Sudharsan's diagnosis (POST) |
| `/health` | Health check (GET) |

---

## Still To Build

- `chapters/diagnosis.js` — The diagnosis screen module

---

## Three Tied Products

This book app is one of three products. The other two are accessed via links on the same hosting page — not embedded inside the book.

| Product | Type | Access |
|---------|------|--------|
| The Book | This web app | Primary |
| The Workbook | PDF download | Link on hosting page |
| The Diagnosis Tool | Separate web app | Link on hosting page |

The in-book diagnosis (`/diagnosis`) is different from the standalone Diagnosis Tool. The in-book diagnosis synthesises the reader's chapter takeaways. The standalone tool is a separate product.
