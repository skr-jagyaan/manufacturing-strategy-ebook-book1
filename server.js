const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// ─── CONFIG ────────────────────────────────────────────────────────────────
// Railway automatically injects DATABASE_URL when you add a PostgreSQL plugin
// All other values — set these in Railway → Variables tab
const CONFIG = {
  EMAIL_HOST:   process.env.EMAIL_HOST   || 'mail.sudharsankr.co.in',
  EMAIL_PORT:   process.env.EMAIL_PORT   || 587,
  EMAIL_USER:   process.env.EMAIL_USER   || 'info@sudharsankr.co.in',
  EMAIL_PASS:   process.env.EMAIL_PASS,   // Set in Railway Variables
  READER_URL:   process.env.READER_URL   || 'https://read.sudharsankr.co.in',
  RZP_SECRET:   process.env.RZP_SECRET,   // Set in Railway Variables
};

// ─── DATABASE ───────────────────────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Auto-create table on startup
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS buyers (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT UNIQUE NOT NULL,
      password    TEXT NOT NULL,
      payment_id  TEXT,
      session_token TEXT,
      session_expires TIMESTAMPTZ,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  console.log('Database ready.');
}

// ─── EMAIL ──────────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: CONFIG.EMAIL_HOST,
  port: CONFIG.EMAIL_PORT,
  secure: false,
  auth: { user: CONFIG.EMAIL_USER, pass: CONFIG.EMAIL_PASS }
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
    from: `"Sudharsan K R" <${CONFIG.EMAIL_USER}>`,
    to: email,
    subject: 'Your Access — The Manufacturing Strategy Series',
    html
  });
}

function generatePassword() {
  return crypto.randomBytes(10).toString('base64').slice(0, 12);
}

// ─── ROUTES ─────────────────────────────────────────────────────────────────

// Health check
app.get('/', (req, res) => res.json({ status: 'ok' }));

// Payment success — called by frontend after Razorpay payment
app.post('/payment-success', async (req, res) => {
  const { payment_id, name, email } = req.body;
  if (!payment_id || !name || !email) return res.status(400).json({ error: 'Missing fields' });

  try {
    // Check if buyer already exists
    const existing = await pool.query('SELECT * FROM buyers WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      // Resend their existing credentials
      await sendCredentialsEmail(name, email, existing.rows[0].password);
      return res.json({ success: true, message: 'Credentials resent' });
    }

    // Create new buyer
    const password = generatePassword();
    await pool.query(
      'INSERT INTO buyers (name, email, password, payment_id) VALUES ($1, $2, $3, $4)',
      [name, email, password, payment_id]
    );

    await sendCredentialsEmail(name, email, password);
    res.json({ success: true });

  } catch (err) {
    console.error('payment-success error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login — called by reader portal
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const result = await pool.query('SELECT * FROM buyers WHERE email = $1', [email]);
    const buyer = result.rows[0];

    if (!buyer || buyer.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create session token — valid 30 days
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await pool.query(
      'UPDATE buyers SET session_token = $1, session_expires = $2 WHERE email = $3',
      [token, expires, email]
    );

    res.json({ success: true, token, name: buyer.name });

  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify session — called by reader portal on every load
app.post('/verify', async (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) return res.status(401).json({ valid: false });

  try {
    const result = await pool.query('SELECT * FROM buyers WHERE email = $1', [email]);
    const buyer = result.rows[0];

    if (!buyer || buyer.session_token !== token) return res.status(401).json({ valid: false });
    if (new Date(buyer.session_expires) < new Date()) return res.status(401).json({ valid: false, reason: 'expired' });

    res.json({ valid: true, name: buyer.name });

  } catch (err) {
    console.error('verify error:', err);
    res.status(401).json({ valid: false });
  }
});

// ─── START ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
initDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
