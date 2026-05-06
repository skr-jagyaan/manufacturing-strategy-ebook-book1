/* ============================================================
   BACK MATTER
   Flows after Chapter 9 completion
   Continue the Journey → Appendices → Vikram's Closing →
   Book Takeaway Exchange → Download Workbook →
   Diagnosis Teaser → (navigates to /diagnosis)
   ============================================================ */

export default {
  chapterNum:   null,
  chapterTitle: 'Back Matter',
  partName:     '',
  barTitle:     'Why Great Manufacturers Stay Invisible',

  // Vikram's final fallback — his closing reflection on the whole book
  vikramPerspectives: [
    `<strong>The book changed one thing for me fundamentally: I stopped confusing activity with strategy.</strong> Before I read this, I thought a packed factory floor meant I was winning. Now I know a packed factory floor can mean you are losing very efficiently.`,
    `<strong>The hardest lesson in this book is also the simplest: you cannot be everything to everyone and be valuable to anyone.</strong> I resisted that for years. The businesses I admire most are not the ones that do the most — they are the ones that do one thing in a way nobody else can match.`,
    `<strong>This is where I leave you.</strong> A different companion will read Book Two alongside you. But carry this from our time together: the factory is already built. The question is whether the strategy running it is strong enough for what comes next.`
  ],

  screens: [

    // SCREEN 0 — Continue the Journey
    {
      type:    'backmatter-prose',
      heading: 'Continue the Journey',
      label:   'Book Two of Four',
      body: `
        <p><strong>Stop Planning, Start Winning</strong></p>
        <p><em>Making Strategic Choices Competitors Can't Copy</em></p>
        <p>In the second book in this series, we move from painful diagnosis to ruthless execution. You will learn the exact frameworks used by elite industrial manufacturers to build uncopyable advantages, command premium pricing, and dominate their chosen categories.</p>
        <p>This book identified the problem. The next one hands you the tools to fix it.</p>
        <p>The era of accumulating random orders is over. It is time to make choices. It is time to start winning.</p>`,
      nextLabel: 'Continue →'
    },

    // SCREEN 1 — Appendix A: Bibliography
    {
      type:    'backmatter-prose',
      heading: 'Bibliography',
      label:   'Appendix A',
      body: `
        <p><strong>Corporate Strategy and Competitive Positioning</strong></p>
        <p>Lafley, A.G. and Martin, R.L. (2013). <em>Playing to Win: How Strategy Really Works.</em> Harvard Business Review Press.</p>
        <p>Rumelt, R. (2011). <em>Good Strategy Bad Strategy: The Difference and Why It Matters.</em> Crown Business.</p>
        <p>Porter, M.E. (1996). "What is Strategy?" <em>Harvard Business Review.</em></p>
        <p>Zook, C. (2001). <em>Profit from the Core.</em> Harvard Business School Press.</p>
        <p>Kim, W.C. and Mauborgne, R. (2005). <em>Blue Ocean Strategy.</em> Harvard Business School Press.</p>
        <p>Hamel, G. and Prahalad, C.K. (1990). "The Core Competence of the Corporation." <em>Harvard Business Review.</em></p>
        <p>Christensen, C.M. (1997). <em>The Innovator's Dilemma.</em> Harvard Business School Press.</p>
        <p><strong>Manufacturing Operations</strong></p>
        <p>Goldratt, E.M. (1984). <em>The Goal: A Process of Ongoing Improvement.</em> North River Press.</p>
        <p>Womack, J.P. and Jones, D.T. (1996). <em>Lean Thinking.</em> Simon and Schuster.</p>
        <p>Liker, J.K. (2004). <em>The Toyota Way.</em> McGraw-Hill.</p>
        <p>Skinner, W. (1969). "Manufacturing — Missing Link in Corporate Strategy." <em>Harvard Business Review.</em></p>
        <p><strong>B2B Branding and Pricing</strong></p>
        <p>Levitt, T. (1980). "Marketing Success Through Differentiation — of Anything." <em>Harvard Business Review.</em></p>
        <p>Ries, A. and Trout, J. (2001). <em>Positioning: The Battle for Your Mind.</em> McGraw-Hill.</p>
        <p>Nagle, T.T. and Muller, G. (2017). <em>The Strategy and Tactics of Pricing.</em> Routledge.</p>
        <p><strong>Founder Psychology and Scaling</strong></p>
        <p>Gerber, M.E. (1995). <em>The E-Myth Revisited.</em> HarperBusiness.</p>
        <p>Kahneman, D. (2011). <em>Thinking, Fast and Slow.</em> Farrar, Straus and Giroux.</p>
        <p>Collins, J. (2001). <em>Good to Great.</em> HarperBusiness.</p>
        <p>Goldsmith, M. (2007). <em>What Got You Here Won't Get You There.</em> Hyperion.</p>`,
      nextLabel: 'Continue →'
    },

    // SCREEN 2 — Appendix B: Strategy Glossary
    {
      type:    'backmatter-prose',
      heading: 'Strategy Glossary',
      label:   'Appendix B',
      body: `
        <p>Introduce these terms into your boardroom to instantly shift the focus from operational survival to strategic design.</p>
        <p><strong>The 18-Hour Founder (The Hero Trap)</strong><br>A business structure where growth is entirely bottlenecked by the founder's personal involvement, leading to exhaustion and a hard cap on revenue scale.</p>
        <p><strong>The Peanut Butter Business</strong><br>A company that spreads its resources, engineering talent, and machine hours too thinly across dozens of unrelated industries, resulting in high operational chaos and zero market distinction.</p>
        <p><strong>The Commodity Trap</strong><br>The highly vulnerable state of competing purely on price and delivery time because the market views your capabilities as completely interchangeable with your competitors.</p>
        <p><strong>Operating Imperative</strong><br>The minimum standard required just to be invited to quote — good quality, on-time delivery, ISO certification. Necessary to survive, but not a strategic advantage.</p>
        <p><strong>Strategic Advantage</strong><br>A specific, hard-to-copy capability that makes your company the undeniable, obvious choice for a specific type of buyer, allowing you to command premium pricing.</p>
        <p><strong>The Evidence Trap</strong><br>The dangerous boardroom habit of demanding past data to prove that a future strategy will work — limits companies to safe, commoditised ideas that have already been tried.</p>
        <p><strong>What Would Have to Be True? (WWHTBT)</strong><br>The ultimate strategic question. Replaces the demand for evidence and forces leadership teams to design the exact conditions required for a new strategy to succeed.</p>
        <p><strong>Where to Play</strong><br>The explicit choice of which specific market segment, geography, customer type, and product category a business will compete in — and, equally importantly, will not.</p>
        <p><strong>How to Win</strong><br>The specific, hard-to-copy structural advantage a business uses to dominate its chosen Where to Play. Not quality or service — those are Operating Imperatives.</p>`,
      nextLabel: 'Continue →'
    },

    // SCREEN 3 — Appendix C: Recommended Reading
    {
      type:    'backmatter-prose',
      heading: 'Recommended Reading',
      label:   'Appendix C',
      body: `
        <p>This book serves as your diagnosis. If you wish to dive deeper into the frameworks behind these concepts, the following books are highly recommended for manufacturing leaders.</p>
        <p><em>Playing to Win: How Strategy Really Works</em><br>A.G. Lafley and Roger L. Martin<br>The foundational text on the Where to Play and How to Win framework. Will fundamentally change how you view corporate strategy.</p>
        <p><em>The Goal: A Process of Ongoing Improvement</em><br>Eliyahu M. Goldratt<br>A mandatory read for any factory owner. Written as a novel, it introduces the Theory of Constraints and will completely change how you view idle machines and shop-floor efficiency.</p>
        <p><em>Positioning: The Battle for Your Mind</em><br>Al Ries and Jack Trout<br>The classic manual on how to establish a clear, undeniable identity in a crowded, commoditised marketplace.</p>
        <p><em>Good Strategy Bad Strategy</em><br>Richard Rumelt<br>One of the most important books on strategy written in the last two decades. Ruthlessly distinguishes genuine strategic thinking from hollow planning.</p>
        <p><em>The E-Myth Revisited</em><br>Michael E. Gerber<br>Essential reading for any founder trapped in the Hero Founder loop. Explains why most small businesses fail and what to do about it.</p>`,
      nextLabel: 'Continue →'
    },

    // SCREEN 4 — Vikram's Closing
    {
      type:    'vikram-closing',
      heading: 'Vikram\'s closing notes',
      body: `We read this together. Nine chapters. I hope it was as uncomfortable for you as it was for me the first time.\n\nI will not be your companion for Book Two. Someone else will read that one alongside you. But carry this from our time together: the factory is already built. The machines are running. The question — the only question that matters now — is whether the strategy running it is strong enough for what comes next.\n\nGo build the moat.`
    },

    // SCREEN 5 — Book-Level Takeaway Exchange
    {
      type: 'book-exchange'
    },

    // SCREEN 6 — Download Workbook
    {
      type:    'workbook',
      heading: 'The Workbook',
      body: `The structured exercises, scorecards, and audit tools for this book are compiled in the Workbook — a single PDF containing every diagnostic instrument from the series.\n\nWork through it with your leadership team before you request your diagnosis. The exercises will sharpen what you already know about your business.`
    },

    // SCREEN 7 — Diagnosis Teaser
    {
      type: 'diagnosis-teaser'
    }

  ]
};
