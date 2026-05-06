/* ============================================================
   SERVER.JS — Railway Backend
   Why Great Manufacturers Stay Invisible · Book One

   Responsibilities:
   1. Serve static files from /public
   2. Serve chapter JS modules from /chapters
   3. Serve onboarding JS module from /onboarding
   4. Proxy all Gemini API calls via /api/agent
   5. Route all non-API requests to index.html (SPA)
   6. Handle /api/diagnosis for the diagnosis experience
   ============================================================ */

import express    from 'express';
import cors       from 'cors';
import path       from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL     = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash:generateContent';

if (!GEMINI_API_KEY) {
  console.warn('WARNING: GEMINI_API_KEY not set. Agent responses will fail.');
}

app.use(cors());
app.use(express.json());

// ── STATIC FILES ──
app.use(express.static(path.join(__dirname, 'public')));
app.use('/chapters',   express.static(path.join(__dirname, 'chapters')));
app.use('/onboarding', express.static(path.join(__dirname, 'onboarding')));
app.use('/workbook.pdf', express.static(path.join(__dirname, 'assets', 'workbook.pdf')));

// ── HEALTH CHECK ──
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── GEMINI AGENT ──
app.post('/api/agent', async (req, res) => {
  const { userName, userRev, userSector, chapter, chapterTitle, takeaways, isBookLevel = false } = req.body;

  if (!takeaways || takeaways.length !== 3) return res.status(400).json({ error: 'Three takeaways required.' });
  if (!GEMINI_API_KEY) return res.status(503).json({ error: 'Agent unavailable.' });

  const revLabel = { 'under10':'under ₹10 Crore', '10to25':'₹10–25 Crore', '25to50':'₹25–50 Crore', '50plus':'above ₹50 Crore' }[userRev] || userRev || 'their revenue stage';

  const prompt = isBookLevel
    ? buildBookLevelPrompt(userName, userSector, revLabel, takeaways)
    : buildChapterPrompt(userName, userSector, revLabel, chapter, chapterTitle, takeaways);

  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.75, maxOutputTokens: 600 }
      })
    });

    if (!response.ok) return res.status(502).json({ error: 'Agent unavailable.' });

    const data  = await response.json();
    const raw   = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = raw.replace(/```json|```/g, '').trim();

    let parsed;
    try { parsed = JSON.parse(clean); }
    catch (e) { return res.status(502).json({ error: 'Agent response malformed.' }); }

    if (!parsed.perspectives || parsed.perspectives.length !== 3) {
      return res.status(502).json({ error: 'Agent response incomplete.' });
    }

    res.json(parsed);

  } catch (err) {
    console.error('Agent error:', err.message);
    res.status(500).json({ error: 'Agent unavailable.' });
  }
});

// ── DIAGNOSIS ENDPOINT ──
app.post('/api/diagnosis', async (req, res) => {
  const { userName, userRev, userSector, allTakeaways, bookTakeaways } = req.body;

  if (!GEMINI_API_KEY) return res.status(503).json({ error: 'Diagnosis unavailable.' });

  const revLabel = { 'under10':'under ₹10 Crore', '10to25':'₹10–25 Crore', '25to50':'₹25–50 Crore', '50plus':'above ₹50 Crore' }[userRev] || userRev || 'their revenue stage';

  const prompt = buildDiagnosisPrompt(userName, userSector, revLabel, allTakeaways, bookTakeaways);

  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
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

// ── SPA ROUTING — must be last ──
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found.' });
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── START ──
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Gemini: ${GEMINI_API_KEY ? 'configured' : 'NOT SET'}`);
});

/* ============================================================
   PROMPT BUILDERS
   ============================================================ */

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
  return `You are Vikram Nair — fictional manufacturing founder, Pune, ₹52 Crore. You have just finished re-reading "Why Great Manufacturers Stay Invisible" alongside ${userName}. This is your final exchange. A different companion reads Book Two with them.

Reader: ${userName}, founder in ${userSector}, revenue ${revLabel}.

Their 3 book-level takeaways:
1. ${takeaways[0]}
2. ${takeaways[1]}
3. ${takeaways[2]}

Your 3 final notes — overall takeaways, what you wish you had known, what you carry forward:
- Same voice: first person, specific, bold opening + one sentence
- Slightly warmer tone — this is a farewell
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

  return `You are Sudharsan K R — Business Model and Strategy Advisor, working with Indian manufacturing founders in the ₹10–50 Crore band.

You have reviewed the reading notes of ${userName}, a founder in ${userSector} at ${revLabel}, who has read your book "Why Great Manufacturers Stay Invisible" in full.

Their chapter notes:
${chapterSummary}

Their 3 overall book takeaways:
${bookSummary}

Deliver a personalised strategic diagnosis based entirely on what they revealed through their own words.

Voice: direct, warm, authoritative. You have seen this before. Not a cheerleader, not a formal report. A person who cares about the outcome.

Structure:
1. position — what their notes reveal about where they currently are (1-2 sentences, reference what they actually wrote)
2. constraint — the primary structural constraint holding their business back (1-2 sentences, name it directly)
3. choice — the one strategic choice they must make in the next 90 days (specific to their sector and revenue stage)
4. closing — one direct sentence you would say to them in person

Return ONLY valid JSON:
{
  "position":   "...",
  "constraint": "...",
  "choice":     "...",
  "closing":    "..."
}`;
}
