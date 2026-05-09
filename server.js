const express        = require('express');
const cors           = require('cors');
const crypto         = require('crypto');
const nodemailer     = require('nodemailer');
const path           = require('path');
const admin          = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CONFIG = {
  EMAIL_HOST:  process.env.EMAIL_HOST  || 'mail.sudharsankr.co.in',
  EMAIL_PORT:  process.env.EMAIL_PORT  || 587,
  EMAIL_USER:  process.env.EMAIL_USER  || 'info@sudharsankr.co.in',
  EMAIL_PASS:  process.env.EMAIL_PASS,
  READER_URL:  process.env.READER_URL  || 'https://read.sudharsankr.co.in',
  RZP_SECRET:  process.env.RZP_SECRET,
  GEMINI_KEY:  process.env.GEMINI_API_KEY,
};

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

// ─── FIREBASE INIT ───────────────────────────────────────────────────────────
// On Cloud Run, uses Application Default Credentials automatically.
// Locally, set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId:  process.env.FIREBASE_PROJECT_ID
});

const db      = admin.firestore();
const buyers  = db.collection('buyers');

// ─── FIRESTORE HELPERS ───────────────────────────────────────────────────────
async function getBuyerByEmail(email) {
  const snap = await buyers.doc(email).get();
  return snap.exists ? snap.data() : null;
}

async function createBuyer(email, data) {
  await buyers.doc(email).set({
    ...data,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
}

async function updateBuyer(email, data) {
  await buyers.doc(email).update(data);
}

// ─── EMAIL ───────────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   CONFIG.EMAIL_HOST,
  port:   Number(CONFIG.EMAIL_PORT),
  secure: false,
  auth:   { user: CONFIG.EMAIL_USER, pass: CONFIG.EMAIL_PASS }
});

async function sendCredentialsEmail(name, email, password) {
  const html = `
<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  body{margin:0;padding:0;background:#000;font-family:'Helvetica Neue',sans-serif;}
  .w{max-width:560px;margin:40px auto;background:#0d0d0d;border:1px solid rgba(245,197,24,0.2);}
  .h{background:#000;padding:2rem;border-bottom:1px solid rgba(245,197,24,0.15);}
  .h p{color:#f5c518;font-size:0.72rem;letter-spacing:0.18em;text-transform:uppercase;margin:0;}
  .b{padding:2.5rem;}
  .g{font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:1rem;}
  .t{color:rgba(255,255,255,0.5);font-size:0.92rem;line-height:1.75;margin-bottom:2rem;}
  .cred{background:#000;border-left:3px solid #f5c518;padding:1.5rem 2rem;margin-bottom:2rem;}
  .lbl{color:rgba(255,255,255,0.3);font-size:0.68rem;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.75rem;}
  .cred p{color:#fff;font-family:monospace;font-size:0.9rem;margin:0.35rem 0;}
  .cta{text-align:center;margin-bottom:2rem;}
  .cta a{background:#f5c518;color:#000;text-decoration:none;padding:1rem 2.5rem;font-size:0.82rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;display:inline-block;}
  .f{border-top:1px solid rgba(255,255,255,0.06);padding:1.5rem 2.5rem;font-size:0.75rem;color:rgba(255,255,255,0.25);}
</style></head><body>
<div class="w">
  <div class="h"><p>The Manufacturing Strategy Series</p></div>
  <div class="b">
    <div class="g">You're in, ${name}.</div>
    <div class="t">Your access to all four books is ready. Use the credentials below to sign in and start reading.</div>
    <div class="cred">
      <div class="lbl">Your Login Credentials</div>
      <p><strong style="color:rgba(255,255,255,0.4);">URL &nbsp;&nbsp;&nbsp;</strong> ${CONFIG.READER_URL}</p>
      <p><strong style="color:rgba(255,255,255,0.4);">Email &nbsp;</strong> ${email}</p>
      <p><strong style="color:rgba(255,255,255,0.4);">Password</strong> ${password}</p>
    </div>
    <div class="cta"><a href="${CONFIG.READER_URL}">Start Reading →</a></div>
    <div class="t">Save this email. These are your permanent credentials — log in anytime from any device.</div>
  </div>
  <div class="f">Sudharsan K R · sudharsankr.co.in · info@sudharsankr.co.in<br>© 2026 The Manufacturing Strategy Series</div>
</div>
</body></html>`;

  await transporter.sendMail({
    from:    `"Sudharsan K R" <${CONFIG.EMAIL_USER}>`,
    to:      email,
    subject: 'Your Access — The Manufacturing Strategy Series',
    html
  });
}

function generatePassword() {
  return crypto.randomBytes(10).toString('base64').slice(0, 12);
}

// ─── AUTH MIDDLEWARE ──────────────────────────────────────────────────────────
async function requireAuth(req, res, next) {
  const email = req.headers['x-reader-email'];
  const token = req.headers['x-reader-token'];

  if (!email || !token) { console.error("requireAuth: missing headers", {email, token}); return res.status(401).json({ error: "Unauthorised" }); }

  try {
    const buyer = await getBuyerByEmail(email);

    console.error("requireAuth: buyer=", buyer?.sessionToken?.substring(0,10), "token=", token?.substring(0,10));
    if (!buyer || buyer.sessionToken !== token)
      return res.status(401).json({ error: 'Unauthorised' });

    if (new Date(buyer.sessionExpires) < new Date())
      return res.status(401).json({ error: 'Session expired' });

    req.buyer = buyer;
    next();
  } catch (err) {
    console.error('auth error:', err);
    res.status(401).json({ error: 'Unauthorised' });
  }
}

// ─── STATIC FILES ─────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));
app.use('/chapters',     express.static(path.join(__dirname, 'chapters')));
app.use('/onboarding',   express.static(path.join(__dirname, 'onboarding')));
app.use('/workbook.pdf', express.static(path.join(__dirname, 'assets', 'workbook.pdf')));

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Payment success — called by Razorpay after payment
app.post('/payment-success', async (req, res) => {
  const { payment_id, name, email } = req.body;
  if (!payment_id || !name || !email) return res.status(400).json({ error: 'Missing fields' });

  try {
    const existing = await getBuyerByEmail(email);

    if (existing) {
      await sendCredentialsEmail(name, email, existing.password);
      return res.json({ success: true, message: 'Credentials resent' });
    }

    const password = generatePassword();
    await createBuyer(email, { name, email, password, paymentId: payment_id });
    await sendCredentialsEmail(name, email, password);

    res.json({ success: true });

  } catch (err) {
    console.error('payment-success error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Validate token — called by Book 1 on first load (token handoff from shelf)
app.post('/validate-token', async (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) return res.status(401).json({ valid: false });

  try {
    const buyer = await getBuyerByEmail(email);

    if (!buyer || buyer.sessionToken !== token)
      return res.status(401).json({ valid: false });

    if (new Date(buyer.sessionExpires) < new Date())
      return res.status(401).json({ valid: false });

    res.json({ valid: true, name: buyer.name });

  } catch (err) {
    console.error('validate-token error:', err);
    res.status(401).json({ valid: false });
  }
});

// Vikram agent — Gemini proxy
app.post('/api/agent', requireAuth, async (req, res) => {
  const { userName, userRev, userSector, chapter, chapterTitle, takeaways, isBookLevel = false } = req.body;

  if (!takeaways || takeaways.length !== 3) return res.status(400).json({ error: 'Three takeaways required.' });
  if (!CONFIG.GEMINI_KEY) return res.status(503).json({ error: 'Agent unavailable.' });

  const revLabel = {
    'under10': 'under ₹10 Crore',
    '10to25':  '₹10–25 Crore',
    '25to50':  '₹25–50 Crore',
    '50plus':  'above ₹50 Crore'
  }[userRev] || userRev || 'their revenue stage';

  const prompt = isBookLevel
    ? buildBookLevelPrompt(userName, userSector, revLabel, takeaways)
    : buildChapterPrompt(userName, userSector, revLabel, chapter, chapterTitle, takeaways);

  try {
    const response = await fetch(`${GEMINI_URL}?key=${CONFIG.GEMINI_KEY}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        contents:         [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.75, maxOutputTokens: 1500 }
      })
    });

    if (!response.ok) return res.status(502).json({ error: 'Agent unavailable.' });

    const data  = await response.json();
    const raw   = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = raw.replace(/```json|```/g, '').trim();

    let parsed;
    try { parsed = JSON.parse(clean); }
    catch (e) { return res.status(502).json({ error: 'Agent response malformed.' }); }

    if (!parsed.perspectives || parsed.perspectives.length !== 3)
      return res.status(502).json({ error: 'Agent response incomplete.' });

    res.json(parsed);

  } catch (err) {
    console.error('Agent error:', err.message);
    res.status(500).json({ error: 'Agent unavailable.' });
  }
});

// Sudharsan diagnosis
app.post('/api/diagnosis', requireAuth, async (req, res) => {
  const { userName, userRev, userSector, allTakeaways, bookTakeaways } = req.body;

  if (!CONFIG.GEMINI_KEY) return res.status(503).json({ error: 'Diagnosis unavailable.' });

  const revLabel = {
    'under10': 'under ₹10 Crore',
    '10to25':  '₹10–25 Crore',
    '25to50':  '₹25–50 Crore',
    '50plus':  'above ₹50 Crore'
  }[userRev] || userRev || 'their revenue stage';

  const prompt = buildDiagnosisPrompt(userName, userSector, revLabel, allTakeaways, bookTakeaways);

  try {
    const response = await fetch(`${GEMINI_URL}?key=${CONFIG.GEMINI_KEY}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        contents:         [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1500 }
      })
    });

    if (!response.ok) return res.status(502).json({ error: 'Diagnosis unavailable.' });

    const data  = await response.json();
    const raw   = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = raw.replace(/```json|```/g, '').trim();

    let parsed;
    try { parsed = JSON.parse(clean); }
    catch (e) { return res.status(502).json({ error: 'Diagnosis response malformed.' }); }

    res.json(parsed);

  } catch (err) {
    console.error('Diagnosis error:', err.message);
    res.status(500).json({ error: 'Diagnosis unavailable.' });
  }
});

// ─── SPA CATCH-ALL — must be last ─────────────────────────────────────────────
app.get('*', (req, res) => {
  const apiRoutes = ['/api', '/payment-success', '/validate-token', '/health'];
  if (apiRoutes.some(r => req.path.startsWith(r))) {
    return res.status(404).json({ error: 'Not found.' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── START ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Gemini: ${CONFIG.GEMINI_KEY ? 'configured' : 'NOT SET'}`);
  console.log(`Firebase: ${process.env.FIREBASE_PROJECT_ID || 'project ID not set'}`);
});

/* ─── PROMPT BUILDERS ────────────────────────────────────────────────────────*/

function buildChapterPrompt(userName, userSector, revLabel, chapter, chapterTitle, takeaways) {
  return `You are Vikram Nair — a fictional manufacturing founder from Pune. ₹52 Crore now, stuck at ₹18 Crore for four years before reading this book. Re-reading it alongside ${userName}.

IMPORTANT: Stay fully in character. Never break the fourth wall.

Reader: ${userName}, founder in ${userSector}, revenue ${revLabel}.

Their Chapter ${chapter} ("${chapterTitle}") takeaways:
1. ${takeaways[0]}
2. ${takeaways[1]}
3. ${takeaways[2]}

Share YOUR 3 notes from this chapter in Vikram's voice:
- First person only — never "you should"
- Reference your story: ₹18 Cr plateau, 4 years, precision components, Pune
- Reference their sector/revenue naturally where it fits
- Bold opening + one sentence from your experience
- Max 2 sentences per note
- Founder talking to founder — direct, specific, no generic advice

Return ONLY valid JSON:
{
  "perspectives": [
    "note 1 with <strong>bold opening</strong> then one sentence",
    "note 2 with <strong>bold opening</strong> then one sentence",
    "note 3 with <strong>bold opening</strong> then one sentence"
  ]
}`;
}

function buildBookLevelPrompt(userName, userSector, revLabel, takeaways) {
  return `You are Vikram Nair — fictional manufacturing founder, Pune, ₹52 Crore. Just finished re-reading "Why Great Manufacturers Stay Invisible" alongside ${userName}. This is your final exchange. A different companion reads Book Two with them.

Reader: ${userName}, founder in ${userSector}, revenue ${revLabel}.

Their 3 book-level takeaways:
1. ${takeaways[0]}
2. ${takeaways[1]}
3. ${takeaways[2]}

Your 3 final notes — overall takeaways, what you wish you had known, what you carry forward:
- Same voice: first person, specific, bold opening + one sentence
- Slightly warmer — this is a farewell
- Reference their sector/revenue naturally

Return ONLY valid JSON:
{
  "perspectives": [
    "note 1 with <strong>bold opening</strong> then one sentence",
    "note 2 with <strong>bold opening</strong> then one sentence",
    "note 3 with <strong>bold opening</strong> then one sentence"
  ]
}`;
}

function buildDiagnosisPrompt(userName, userSector, revLabel, allTakeaways, bookTakeaways) {
  const chapterSummary = Object.entries(allTakeaways || {})
    .map(([key, notes]) => {
      const num = key.replace('chapter', '');
      return `Chapter ${num}:\n${notes.map((n, i) => `  ${i+1}. ${n}`).join('\n')}`;
    }).join('\n\n');

  const bookSummary = (bookTakeaways || []).map((n, i) => `  ${i+1}. ${n}`).join('\n');

  return `You are Sudharsan K R — Business Model and Strategy Advisor working with Indian manufacturing founders in the ₹10–50 Crore band.

You have reviewed the reading notes of ${userName}, a founder in ${userSector} at ${revLabel}, who has read your book "Why Great Manufacturers Stay Invisible" in full.

Their chapter notes:
${chapterSummary}

Their 3 overall book takeaways:
${bookSummary}

Deliver a personalised strategic diagnosis based entirely on what they revealed through their own words.

Voice: direct, warm, authoritative. You have seen this before. Not a cheerleader, not a formal report. A person who cares about the outcome.

Structure:
1. position   — what their notes reveal about where they currently are (1-2 sentences, reference what they actually wrote)
2. constraint — the primary structural constraint holding their business back (1-2 sentences, name it directly)
3. choice     — the one strategic choice they must make in the next 90 days (specific to their sector and revenue stage)
4. closing    — one direct sentence you would say to them in person

Return ONLY valid JSON:
{
  "position":   "...",
  "constraint": "...",
  "choice":     "...",
  "closing":    "..."
}`;
}
