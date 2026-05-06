/* ============================================================
   CHAPTER 3 — The Peanut Butter Business
   Part Two · The Invisibility Problem
   ============================================================ */

export default {
  chapterNum:   3,
  chapterTitle: 'The Peanut Butter Business',
  partName:     'Part Two · The Invisibility Problem',
  barTitle:     'Chapter 3: The Peanut Butter Business',

  vikramPerspectives: [
    `<strong>At peak chaos, we were making 47 different product types for 23 different industries.</strong> I thought that was strength. A consultant showed me the P&L by customer segment. Eighteen of those twenty-three segments were losing money after accounting for setup times and rejections. The other five were subsidising everyone else.`,
    `<strong>"We can make anything from a drawing" — I said that proudly for years.</strong> The day a serious aerospace buyer asked me what we specialised in and I gave him that answer, he politely ended the meeting. That sentence, which felt like capability, sounded to him like incompetence.`,
    `<strong>Bad revenue is a parasite, not a cushion.</strong> Every time I took a complex, low-margin job to "keep the machines busy," I was burning my best engineers' time and blocking capacity for a high-margin job that hadn't arrived yet. I thought idle machines were the enemy. The real enemy was bad revenue occupying good machines.`
  ],

  screens: [

    // SCREEN 0 — Opener
    {
      type:  'opener',
      part:  'Part Two · The Invisibility Problem',
      title: 'The Peanut Butter Business',
      intro: 'How saying yes to everything quietly destroys the one thing that makes a business valuable — its identity.'
    },

    // SCREEN 1 — The Accidental Generalist
    {
      type:    'content',
      heading: 'The death of a business by a thousand yeses',
      body: `
        <p>Over time, as a manufacturing company tries to break through its growth plateau, a subtle shift happens in how it operates. It gradually expands into multiple, unrelated markets. This never happens as a grand, deliberate strategy. It happens one small, seemingly logical decision at a time. <strong>It is the death of a business by a thousand yeses.</strong></p>
        <p>Imagine a precision machining shop in Coimbatore that spent its first five years focused almost entirely on machining cast iron components for local pump manufacturers. They were good at it, operators knew the material intimately, and the business made a decent, predictable margin.</p>
        <p>Then a purchasing manager from one of their clients moved to a textile machinery company and called the founder: <em>"We need some aluminium rollers machined. You have the CNC turning centres. Can you do it?"</em> The founder looked at a machine sitting idle and said yes.</p>
        <p>Six months later, a distributor asked about stainless steel industrial valves. Later that year, a supplier mentioned an aerospace opportunity. Each individual opportunity seemed highly attractive in the moment.</p>
        <p>But zoom out ten years later. The company now serves dozens of different industries, a massive variety of customer types, and hundreds of wildly different product variations.</p>`
    },

    // SCREEN 2 — The Peanut Butter Metaphor
    {
      type:    'content',
      heading: 'The Peanut Butter Business',
      body: `
        <p>This creates what we call the Peanut Butter Business.</p>
        <p>Imagine taking a spoonful of peanut butter and trying to spread it across a massive, oversized slice of bread. Spread very thinly, every individual bite contains only a microscopic, unnoticeable amount. The flavour is completely lost.</p>
        <p>The exact same thing happens when a company spreads its finite resources — its engineering talent, its machine hours, its management focus — across too many unrelated markets.</p>
        <p>The shop floor is in permanent chaos. And the founder cannot answer the most basic question a buyer will ask: <strong>what do you specialise in?</strong></p>`,
      extra: `
        <div class="pull-quote">
          <p>"The same factory. One strategic choice separates a 4% margin from an 18% margin."</p>
        </div>`
    },

    // SCREEN 3 — The Hidden Cost of Context Switching
    {
      type:    'content',
      heading: 'The hidden cost of context switching',
      body: `
        <p>When a business spreads itself too thin, the operational chaos on the shop floor skyrockets. Most founders do not see this cost because it does not appear as a line item on the profit and loss statement.</p>
        <p>Every time you switch from making an aluminium textile roller to a stainless steel valve, your operators must tear down the machine setup, change the cutting tools, reprogramme the CNC, and run test pieces.</p>
        <p>In a highly focused factory, changeovers are rare. In a Peanut Butter Business, operators spend half their shift doing setups instead of cutting metal.</p>`
    },

    // SCREEN 4 — The Blended Margin Illusion
    {
      type:    'content',
      heading: 'The Blended Margin Illusion',
      body: `
        <p>The ultimate danger of the Peanut Butter Business is how it hides its own failure.</p>
        <p>At the end of the year, the founder looks at the balance sheet and sees a blended net profit of 8%. They think: we survived, we made money.</p>
        <p>What the blended margin hides is that 20% of their focused, repeatable clients generated almost 15% profit, while the other 80% — the scattered, custom, low-volume yeses — actually lost money due to high setup times, scrapped parts, and management distraction.</p>
        <p><strong>The good clients are subsidising the bad clients.</strong></p>
        <p>And the biggest cost is not operational. It is to your reputation. When founders of Peanut Butter Businesses are asked what their company does, they proudly declare: <em>"We are a custom manufacturer. If you give us a drawing, we can make anything."</em></p>
        <p>To a high-value buyer, "we can make anything" translates to "we are not specialists at anything."</p>`,
      extra: `
        <div class="pull-quote">
          <p>"The good clients are subsidising the bad clients."</p>
        </div>`
    },

    // SCREEN 5 — What Founders Tell Themselves
    {
      type:    'content',
      heading: 'What founders tell themselves',
      body:    '',
      extra: `
        <div class="pushback">
          <div class="pb-q">
            <div class="pb-q-label">Founder Says</div>
            <div class="pb-q-text">"Serving many industries is diversification. If one sector crashes, I still have others."</div>
          </div>
          <div class="pb-a">
            <div class="pb-a-label">The Reality</div>
            <div class="pb-a-text">You are confusing fragmented weakness with true diversification. Being a minor, highly replaceable vendor in ten different industries does not make you safe — it makes you vulnerable to every single market fluctuation. When the automotive sector drops, you are the first vendor they cut because you are not critical to their supply chain. True safety comes from being so deeply integrated and indispensable to one specific market that even in a recession, your customers cannot afford to lose you.</div>
          </div>
        </div>
        <div class="pushback">
          <div class="pb-q">
            <div class="pb-q-label">Founder Says</div>
            <div class="pb-q-text">"Revenue is revenue. If a job covers my variable costs and makes a contribution to overheads, it is good business."</div>
          </div>
          <div class="pb-a">
            <div class="pb-a-label">The Reality</div>
            <div class="pb-a-text">All revenue is not created equal. Bad revenue — complex, low-volume, low-margin jobs taken just to keep a machine busy — acts like a parasite. It drains your engineering time, causes bottlenecks on the shop floor, and exhausts your best people. Worse, when a highly profitable opportunity finally knocks, your factory is too choked with bad revenue to take the order. You must stop optimising for machine utilisation and start optimising for margin and strategic fit.</div>
          </div>
        </div>`
    },

    // SCREEN 6 — Exchange
    { type: 'exchange' },

    // SCREEN 7 — End
    {
      type:      'end',
      nextTitle: 'The Commodity Trap'
    }
  ]
};
