/* ============================================================
   ONBOARDING
   Front matter screens before Chapter 1 begins
   Cover → Copyright → TOC → Preface → Who Should Read →
   Introduction → About This Experience → Form → Vikram Intro
   ============================================================ */

export default {
  chapterNum:   null,
  chapterTitle: 'Onboarding',
  partName:     '',
  barTitle:     'Why Great Manufacturers Stay Invisible',

  screens: [

    // SCREEN 0 — Cover
    { type: 'cover' },

    // SCREEN 1 — Copyright
    { type: 'copyright' },

    // SCREEN 2 — Table of Contents
    {
      type: 'toc',
      body: `
        <div class="toc-row"><span class="toc-num"></span><span class="toc-title">Preface</span></div>
        <div class="toc-row"><span class="toc-num"></span><span class="toc-title">Who Should Read This Book</span></div>
        <div class="toc-row"><span class="toc-num"></span><span class="toc-title">Introduction: The Invisible Problem</span></div>
        <div class="toc-part">Part One · The Hard Work Trap</div>
        <div class="toc-row"><span class="toc-num">1</span><span class="toc-title">The 18-Hour Founder</span></div>
        <div class="toc-row"><span class="toc-num">2</span><span class="toc-title">Why Good Manufacturing Businesses Plateau</span></div>
        <div class="toc-part">Part Two · The Invisibility Problem</div>
        <div class="toc-row"><span class="toc-num">3</span><span class="toc-title">The Peanut Butter Business</span></div>
        <div class="toc-row"><span class="toc-num">4</span><span class="toc-title">The Commodity Trap</span></div>
        <div class="toc-part">Part Three · What Brand Really Means</div>
        <div class="toc-row"><span class="toc-num">5</span><span class="toc-title">Brand Is Not Marketing</span></div>
        <div class="toc-row"><span class="toc-num">6</span><span class="toc-title">The Power of Strategic Focus</span></div>
        <div class="toc-part">Part Four · The Strategic Awakening</div>
        <div class="toc-row"><span class="toc-num">7</span><span class="toc-title">The Real Growth Problem</span></div>
        <div class="toc-row"><span class="toc-num">8</span><span class="toc-title">The Question Most Businesses Never Ask</span></div>
        <div class="toc-row"><span class="toc-num">9</span><span class="toc-title">The Beginning of Strategy</span></div>
        <div class="toc-part">Appendices</div>
        <div class="toc-row"><span class="toc-num">A</span><span class="toc-title">Bibliography</span></div>
        <div class="toc-row"><span class="toc-num">B</span><span class="toc-title">Strategy Glossary</span></div>
        <div class="toc-row"><span class="toc-num">C</span><span class="toc-title">Recommended Reading</span></div>`
    },

    // SCREEN 3 — Preface
    {
      type:    'preface',
      heading: 'Preface',
      body: `
        <p>In my career, I have not just observed the engineering and manufacturing world from the sidelines — I have been in the middle of negotiating it.</p>
        <p>During years of joint venture discussions and facility visits with institutions like ISRO and IISc, I sat across the table from some of the most rigorous analytical minds in the country. In those settings, I saw what genuine intellectual discipline looks like when applied to a hard problem — the insistence on testing assumptions before acting on them, the refusal to confuse activity with progress.</p>
        <p>I took that same lens into the boardrooms of large industrial organisations — L&amp;T, GMR, and others. I saw how businesses at scale structure consequential decisions. How they separate strategic choice from operational execution. How they build organisations that can make decisions independently of any single individual.</p>
        <p>And then I stepped into the boardrooms and factory floors of manufacturing businesses in the ₹10 to ₹50 Crore band — across Pune, Coimbatore, Ahmedabad, Ludhiana, Rajkot, and the industrial estates surrounding them. I met founders who had built technically excellent businesses through deep engineering skill, sustained hard work, and direct personal involvement in every significant decision.</p>
        <p>What I consistently observed was this: these businesses were not failing because of poor execution. They were stalling because of unexamined strategic choices — and then treating the consequences as operational problems.</p>
        <p>That gap is why I built this advisory practice. And it is why I wrote this series.</p>
        <p>You already know how to make world-class products. You already know how to work hard. This book is designed to help you see the structural reasons your market is not yet paying you what your work is actually worth.</p>
        <p class="sig">Sudharsan K R<br>Business Model &amp; Strategy Advisor</p>`
    },

    // SCREEN 4 — Who Should Read This Book
    {
      type:    'whoshouldread',
      heading: 'Who Should Read This Book',
      body: `
        <div class="wsr-section">
          <div class="wsr-title">The Founder Who Has Outgrown Their Own Business</div>
          <div class="wsr-body">You built this business from nothing. Somewhere around ₹20–40 Crore, the business stopped responding to effort the way it used to. You are working as hard as you ever have, and the revenue is not moving. Something structural is wrong, and you have not yet been able to name it. This book will name it for you.</div>
        </div>
        <div class="wsr-section">
          <div class="wsr-title">The Managing Director Preparing for the Next Phase</div>
          <div class="wsr-body">Your business is operationally sound. You are now facing the question every well-run manufacturing business eventually confronts: how do you move from being a reliable vendor to a recognised specialist? How do you grow profitably rather than just growing?</div>
        </div>
        <div class="wsr-section">
          <div class="wsr-title">The Senior Leader Inside a Manufacturing Business</div>
          <div class="wsr-body">You sit in the strategy offsites. You contribute to the lists on the whiteboard. And you leave those meetings with a vague sense that what has been produced is not a strategy. You want a common language for strategic thinking that you can bring into the room. This book is that language.</div>
        </div>
        <div class="wsr-section">
          <div class="wsr-title">Who This Book Is Not For</div>
          <div class="wsr-body">This book is not for businesses below ₹10 Crore still in the survival stage. It is also not for those looking for motivational frameworks or inspirational principles. Strategy requires making painful choices — about what you will stop doing, which customers you will stop serving, which revenue you will deliberately walk away from. If you are not ready for that discomfort, this is the wrong book.</div>
        </div>`
    },

    // SCREEN 5 — Introduction
    {
      type:    'introduction',
      heading: 'Introduction',
      sub:     'The Invisible Problem',
      body: `
        <p>The first thing that hits you when you walk onto a well-run factory floor is the smell. A distinct, sweet-and-metallic tang of cutting fluid mixed with warm machine oil.</p>
        <p>Picture a precision machining unit in Pune. The air hums with CNC lathes cutting through hardened steel. Yellow safety lines are neatly painted on the epoxy floor. The operators are focused, the tool crib is immaculately organised, and the dispatch area is packed with wooden crates ready to ship.</p>
        <p>The founder — let us call him Rajesh — is a brilliant engineer. He started twenty-two years ago with a single second-hand milling machine in a tiny shed. Today, a state-of-the-art facility spanning thirty thousand square feet. Precise machines, experienced workers, loyal customers, and a steady, predictable flow of orders.</p>
        <p>Yet his revenue has stayed in the exact same range — hovering around ₹25 Crore — for almost five years. Every year he works harder. Every year the business improves operationally. Yet growth remains stubbornly flat. Margins constantly under pressure.</p>
        <p><em>"We are doing everything right. My quality is 99.8% defect-free. We never miss a delivery. But the business is not breaking through. We are just surviving on volume, not growing in value."</em></p>
        <p>This situation is far more common than most people realise. Across the country, thousands of businesses just like this one. Operationally strong. Technically highly capable. Run by deeply committed founders. Yet largely invisible in the broader market.</p>
        <p>This business is not invisible because of marketing. <strong>It is invisible because it lacks strategic focus.</strong> That is the distinction this book will help you see.</p>`
    },

    // SCREEN 6 — About This Experience
    { type: 'about' },

    // SCREEN 7 — Form
    { type: 'form' },

    // SCREEN 8 — Vikram Intro
    { type: 'vikram' }

  ]
};
