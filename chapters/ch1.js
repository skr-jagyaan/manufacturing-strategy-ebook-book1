/* ============================================================
   CHAPTER 1 — The 18-Hour Founder
   Part One · The Hard Work Trap
   ============================================================ */

export default {
  chapterNum:   1,
  chapterTitle: 'The 18-Hour Founder',
  partName:     'Part One · The Hard Work Trap',
  barTitle:     'Chapter 1: The 18-Hour Founder',

  vikramPerspectives: [
    `<strong>I ran my business for 11 years before I admitted I was the problem.</strong> Not the market, not the team, not the machines — me. The day I wrote down every decision that came to my cabin, it filled two pages. That list was my real job description. It had nothing to do with strategy.`,
    `<strong>The "nobody cares like I do" line — I used it every single day.</strong> And I was right. But that was my failure, not my strength. I had never built systems that made caring unnecessary. When I finally did, my best operator started catching defects I used to miss.`,
    `<strong>Your revenue ceiling is your personal bandwidth ceiling. Full stop.</strong> I was stuck at ₹18 Cr for four years — same machines, same customers, same effort. The day I handed one decision to my production head and didn't take it back, that was the beginning of getting unstuck.`
  ],

  screens: [

    // SCREEN 0 — Opener
    {
      type:  'opener',
      part:  'Part One · The Hard Work Trap',
      title: 'The 18-Hour Founder',
      intro: 'Why the habits that built your business are the same habits quietly strangling it.'
    },

    // SCREEN 1 — The Story
    {
      type:    'content',
      heading: 'How every manufacturing business begins',
      body: `
        <p>Most manufacturing businesses begin the exact same way. A highly skilled engineer decides to strike out on their own. They rent a small industrial shed, buy a couple of second-hand machines, and start knocking on doors for orders.</p>
        <p>In those early years, survival depends entirely on the founder. They handle everything — negotiate raw material prices, supervise production, speak to every customer, calculate every quotation, jump onto the shop floor to solve quality issues.</p>
        <p>And because the founder is capable, driven, and willing to work eighteen-hour days, the business actually begins to grow.</p>
        <p>But something subtle and dangerous happens during this stage. <strong>The business becomes entirely, structurally dependent on the founder's personal involvement.</strong></p>
        <p>At 7:30 AM, before morning tea, the night shift supervisor calls — a machine needs approval. At 10:00 AM, a key customer insists on speaking to the boss. At 2:00 PM, accounts cannot release a cheque without the founder's signature. At 5:00 PM, a new RFQ needs personal review before it can go out.</p>
        <p>From the outside, this looks like strong leadership. Internally, it creates a massive hidden risk. The business is growing because of the founder's sheer force of will — not because of a replicable system.</p>`,
      extra: `
        <div class="pull-quote">
          <p>"The business is growing because of force of will — not a replicable system."</p>
        </div>`
    },

    // SCREEN 2 — Why Founders Stay Trapped
    {
      type:    'content',
      heading: 'Why founders stay trapped',
      body: `
        <p>Founders get trapped as the primary bottleneck for three specific reasons.</p>
        <p><strong>The "Nobody Cares Like I Do" myth.</strong> Because it is the founder's capital on the line, they believe no one else can care enough to get the details right. This is not arrogance — it is a deeply held conviction born from years of being the last line of defence.</p>
        <p><strong>The trauma of past mistakes.</strong> Almost every seasoned manufacturer carries a scar from a past disaster — a bad batch, a customer lost, a machine that failed at the worst moment. That trauma rewires their approach. Every critical decision must pass through them personally.</p>
        <p><strong>The ego of being needed.</strong> Being the hero feels good. Giving up control means giving up that daily validation of being the most important person in the room.</p>
        <p>While the ego stroke might feel good, the financial cost is devastating. Every hour a founder spends signing routine supplier cheques or arguing over a 2% discount is an hour they are not spending on high-value strategic work. <strong>They are playing the role of a ₹30,000-per-month supervisor while abandoning the role of a CEO.</strong></p>`
    },

    // SCREEN 3 — Pushback
    {
      type:    'content',
      heading: 'What founders tell themselves',
      body:    '',
      extra: `
        <div class="pushback">
          <div class="pb-q">
            <div class="pb-q-label">Founder Says</div>
            <div class="pb-q-text">"If I don't check everything myself, my team makes costly mistakes."</div>
          </div>
          <div class="pb-a">
            <div class="pb-a-label">The Reality</div>
            <div class="pb-a-text">You do not have a team — you have a group of highly paid helpers. If your factory cannot produce a perfect batch without your physical presence, you have failed to build standard operating procedures. A true CEO allows their team to make small, controlled mistakes so they can learn to fix them — rather than swooping in every time a machine jams.</div>
          </div>
        </div>
        <div class="pushback">
          <div class="pb-q">
            <div class="pb-q-label">Founder Says</div>
            <div class="pb-q-text">"My key customers refuse to deal with my sales team. They only want to speak to the owner."</div>
          </div>
          <div class="pb-a">
            <div class="pb-a-label">The Reality</div>
            <div class="pb-a-text">Your customers do this because you trained them to do it. Every time a customer bypassed your sales manager and called your mobile directly — and you answered and gave them a discount — you destroyed your employee's authority. Customers do not want to speak to you specifically; they want fast, authoritative answers. Empower your team to give those answers and the calls to your personal number will stop.</div>
          </div>
        </div>`
    },

    // SCREEN 4 — Breaking the Trap
    {
      type:    'content',
      heading: 'Breaking the trap',
      body: `
        <p>Escaping the Hero Founder Trap does not mean abandoning all responsibilities tomorrow. It requires a systematic uncoupling of your time from daily operations — starting with just one recurring, low-risk decision.</p>
        <p><strong>Step 1 — Identify one high-frequency, low-risk task.</strong> Not your biggest client. Something mundane — approving routine customer discounts up to 5%, or signing off on raw material purchases under ₹50,000.</p>
        <p><strong>Step 2 — Write down the framework.</strong> Write the exact rules you use in your own head, explicitly, so the team can apply them without asking you. If you cannot write them down, you have not yet systematised the decision.</p>
        <p><strong>Step 3 — Endure the withdrawal period.</strong> The first time your sales manager uses their new authority, the customer will likely bypass them and call you anyway. You must resist answering. The moment you pick up that call and override your manager, you have undone everything.</p>
        <p>The goal is not to work less. The goal is to shift your time from low-value execution to high-value strategy. That shift is what breaks through the revenue ceiling.</p>`,
      extra: `
        <div class="pull-quote">
          <p>"If you cannot write the rules down, you have not yet systematised the decision."</p>
        </div>`
    },

    // SCREEN 5 — Exchange
    { type: 'exchange' },

    // SCREEN 6 — End
    {
      type:      'end',
      nextTitle: 'Why Good Businesses Plateau'
    }
  ]
};
