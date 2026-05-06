/* ============================================================
   CHAPTER 4 — The Commodity Trap
   Part Two · The Invisibility Problem
   ============================================================ */

export default {
  chapterNum:   4,
  chapterTitle: 'The Commodity Trap',
  partName:     'Part Two · The Invisibility Problem',
  barTitle:     'Chapter 4: The Commodity Trap',

  vikramPerspectives: [
    `<strong>I lost a ₹40 Lakh annual contract to a vendor who was 3.2% cheaper.</strong> I had supplied that customer for six years with zero rejections. The new procurement manager had a price-reduction KPI. That was the day I understood that relationships protect you from nothing when you are a commodity.`,
    `<strong>The Excel spreadsheet is the most honest mirror in manufacturing.</strong> When a buyer reduces your entire business to a single row — part number, quantity, price — they are telling you exactly how they see you. The goal is not to get angry at the spreadsheet. The goal is to become the company that never appears on it.`,
    `<strong>Quality, on-time delivery, great service — I used to list all three as my advantages.</strong> A mentor stopped me mid-sentence: "Vikram, those are not advantages. Those are the conditions for being invited to quote." That one sentence reorganised how I thought about competition.`
  ],

  screens: [

    // SCREEN 0 — Opener
    {
      type:  'opener',
      part:  'Part Two · The Invisibility Problem',
      title: 'The Commodity Trap',
      intro: 'When your entire business gets reduced to a single row on a buyer\'s Excel spreadsheet — and how to escape it.'
    },

    // SCREEN 1 — The Excel Spreadsheet Reality
    {
      type:    'content',
      heading: 'The Excel spreadsheet reality',
      body: `
        <p>Imagine a manufacturer named Amit who runs a highly capable fastener production unit in Ludhiana. He makes high-tensile bolts and precision screws for heavy earthmoving equipment. He has great machines, a skilled workforce, and runs a tight, efficient operation.</p>
        <p>One day he receives a massive RFQ from a major heavy equipment manufacturer. His engineering team spends three days calculating machine hours, material costs, and tooling requirements. They submit a highly detailed, extremely fair quotation.</p>
        <p>Two weeks later, the purchasing manager calls: <em>"Amit, your technicals are approved. Your quality looks great. But your price is 4% higher than a vendor in Rajkot. You are L2. If you can match their L1 price, the order is yours."</em></p>
        <p>Purchasing managers are not paid to admire your engineering skills. They are paid to reduce costs. Their annual bonuses are tied to how much money they can squeeze out of the supply chain.</p>
        <p>When they send out an RFQ, they standardise the specifications so that any capable factory can quote. They take your complex, beautiful manufacturing business and reduce it to a single row on a massive Excel spreadsheet:</p>
        <p><em>Supplier A: ₹12.50 per piece. Supplier B: ₹12.00 per piece.</em></p>
        <p><strong>When your entire business is reduced to a spreadsheet, orders go to the lowest bidder.</strong></p>`
    },

    // SCREEN 2 — Operating Imperatives vs Strategic Advantage
    {
      type:    'content',
      heading: 'The illusion of quality and service',
      body: `
        <p>When founders find themselves trapped in this cycle of price competition, they feel deeply misunderstood. If you ask a founder in the Commodity Trap why a customer should choose them over the cheapest competitor, they almost always give the same three answers:</p>
        <p><em>Excellent quality. On-time delivery. Great customer service.</em></p>
        <p>These are incredibly important qualities. But here is the unforgiving truth of the modern industrial market: <strong>they are not strategic advantages. They are Operating Imperatives</strong> — the absolute minimum standard required just to stay in business.</p>
        <p>If you do not have good quality and on-time delivery, you do not even get invited to quote. When you tell a purchasing manager that your main advantage is quality, they hear: <em>we have brakes.</em> Every serious competitor you face also claims excellent quality and perfect reliability.</p>`,
      extra: `
        <div class="pull-quote">
          <p>"Quality keeps you from getting fired. Strategy is what gets you hired at a premium."</p>
        </div>`
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
            <div class="pb-q-text">"Price isn't everything. I have deep, twenty-year relationships with my buyers. They won't leave me for a cheaper vendor."</div>
          </div>
          <div class="pb-a">
            <div class="pb-a-label">The Reality</div>
            <div class="pb-a-text">Personal relationships are a fantastic door-opener, but a terrible long-term strategy. The buyer you have known for twenty years is going to retire. They will be replaced by someone who does not know you, does not care about your history, and has been given a strict mandate to cut supply chain costs by 8%. Relationships get you in the room. Undeniable strategic value keeps you in the room.</div>
          </div>
        </div>
        <div class="pushback">
          <div class="pb-q">
            <div class="pb-q-label">Founder Says</div>
            <div class="pb-q-text">"If I raise my prices to reflect my true value, I will lose all my clients."</div>
          </div>
          <div class="pb-a">
            <div class="pb-a-label">The Reality</div>
            <div class="pb-a-text">You should lose the clients who only care about price. If a client is willing to abandon you over a 2% price difference despite your flawless track record, they were never your partner — they were a mercenary. Clinging to bad, low-margin clients prevents you from having the capacity to serve high-margin clients who actually value your expertise. A strong brand repels as much as it attracts.</div>
          </div>
        </div>`
    },

    // SCREEN 4 — Exchange
    { type: 'exchange' },

    // SCREEN 5 — End
    {
      type:      'end',
      nextTitle: 'Brand Is Not Marketing'
    }
  ]
};
