import { Question } from "../types/question";

export const youtubeQuestions: Question[] = [
  // 1) Mindset & Strategy
  {
    id: "yt_ms_1",
    type: "true-false",
    category: "Mindset & Strategy",
    question: "Focusing most of your time on ideation and packaging (idea, title, thumbnail) before production is a hallmark of top YouTubers.",
    correctAnswer: true,
    explanation: "Professionals invest heavily upfront to validate demand and craft compelling packaging. This maximizes CTR and retention before they even hit record.",
    difficulty: "easy",
  },
  {
    id: "yt_ms_2",
    type: "multiple-choice",
    category: "Mindset & Strategy",
    question: "What is the primary objective of the YouTube platform from an algorithmic perspective?",
    options: [
      "Maximize upload frequency from creators",
      "Maximize the number of subscribers",
      "Maximize viewer satisfaction and watch time",
      "Maximize comments and likes"
    ],
    correctAnswer: "Maximize viewer satisfaction and watch time",
    explanation: "YouTube optimizes for long-term viewer satisfaction. High watch time and positive satisfaction signals help videos get recommended more often.",
    difficulty: "easy",
  },
  {
    id: "yt_ms_3",
    type: "multiple-choice",
    category: "Mindset & Strategy",
    question: "Which strategic habit best aligns with consistent growth?",
    options: [
      "Publishing daily regardless of idea quality",
      "Prototyping ideas, validating demand, then producing",
      "Copying trending videos without differentiation",
      "Optimizing descriptions and tags first"
    ],
    correctAnswer: "Prototyping ideas, validating demand, then producing",
    explanation: "Idea-market fit and packaging come first. Professionals validate demand and clarity before spending production time.",
    difficulty: "medium",
  },
  {
    id: "yt_ms_4",
    type: "fill-in-the-blank",
    category: "Mindset & Strategy",
    question: "Top creators design their workflow to think about the ___ and title before filming.",
    correctAnswer: "thumbnail",
    explanation: "Starting from the thumbnail and title clarifies the promise and shapes the story to deliver on it.",
    difficulty: "easy",
  },
  {
    id: "yt_ms_5",
    type: "multiple-choice",
    category: "Mindset & Strategy",
    question: "Which of the following reflects a healthy creator mindset?",
    options: [
      "Rely solely on editing flourishes to fix weak ideas",
      "Assume success is random and uncontrollable",
      "Treat each upload as an experiment with measurable hypotheses",
      "Ignore analytics to stay “creative”"
    ],
    correctAnswer: "Treat each upload as an experiment with measurable hypotheses",
    explanation: "Frame each video as a test with clear assumptions (idea, angle, audience) and learn from the data.",
    difficulty: "medium",
  },

  // 2) Niche Selection
  {
    id: "yt_ns_1",
    type: "multiple-choice",
    category: "Niche Selection",
    question: "A robust niche selection blends what three pillars?",
    options: [
      "What you love, what people want, what makes you unique",
      "High CPM, daily uploads, viral trends",
      "Long videos, expensive gear, celebrity collabs",
      "SEO, tags, end screens"
    ],
    correctAnswer: "What you love, what people want, what makes you unique",
    explanation: "The ‘three-column’ method: passion, market demand, and differentiation. This intersection increases sustainability and chances of success.",
    difficulty: "easy",
  },
  {
    id: "yt_ns_2",
    type: "multiple-choice",
    category: "Niche Selection",
    question: "Which audience profile is most likely to yield higher CPMs (generally speaking)?",
    options: [
      "Tens of millions of low-income kids",
      "A few thousand executives in a wealthy region",
      "A random global audience with no clear profile",
      "Audiences only reachable via Shorts"
    ],
    correctAnswer: "A few thousand executives in a wealthy region",
    explanation: "Smaller yet valuable audiences (e.g., executives in high-income markets) can yield better ad rates and more monetization paths.",
    difficulty: "medium",
  },
  {
    id: "yt_ns_3",
    type: "fill-in-the-blank",
    category: "Niche Selection",
    question: "Your unique advantage might be a profession, a skill, or even a ___ combination that others can’t easily replicate.",
    correctAnswer: "strange",
    explanation: "Unique combinations (e.g., unusual background or perspective) can create powerful differentiation in crowded niches.",
    difficulty: "easy",
  },
  {
    id: "yt_ns_4",
    type: "true-false",
    category: "Niche Selection",
    question: "Choosing a niche solely based on ‘what you love’ is generally optimal for growth.",
    correctAnswer: false,
    explanation: "You need a blend of passion, market demand, and uniqueness to sustain growth and income.",
    difficulty: "easy",
  },
  {
    id: "yt_ns_5",
    type: "multiple-choice",
    category: "Niche Selection",
    question: "Which approach best validates niche choices quickly?",
    options: [
      "Publish 50 videos and see what happens",
      "Use tools to find demand gaps, then test short formats and packaging",
      "Only copy top channels’ recent uploads",
      "Ignore the audience and focus purely on art"
    ],
    correctAnswer: "Use tools to find demand gaps, then test short formats and packaging",
    explanation: "Validate demand using data and small tests before scaling production.",
    difficulty: "medium",
  },

  // 3) Idea & Market Demand
  {
    id: "yt_imd_1",
    type: "multiple-choice",
    category: "Idea & Market Demand",
    question: "Which signal suggests a video topic has strong demand beyond a channel’s core audience?",
    options: [
      "High like-to-comment ratio",
      "Views exceeding the channel’s subscriber count",
      "High number of end-screen elements",
      "Long description length"
    ],
    correctAnswer: "Views exceeding the channel’s subscriber count",
    explanation: "When a video outperforms the channel’s subscriber base, it indicates broad demand and strong recommendation potential.",
    difficulty: "easy",
  },
  {
    id: "yt_imd_2",
    type: "multiple-choice",
    category: "Idea & Market Demand",
    question: "What is the core concept behind applying supply and demand to YouTube?",
    options: [
      "Match video length to the top performer in your niche",
      "Find topics where demand (viewer interest) is higher than supply (quality content available)",
      "Upload only during peak hours",
      "Rely on tags to unlock suggestions"
    ],
    correctAnswer: "Find topics where demand (viewer interest) is higher than supply (quality content available)",
    explanation: "Identify under-served, high-interest topics to give yourself an algorithmic tailwind.",
    difficulty: "easy",
  },
  {
    id: "yt_imd_3",
    type: "multiple-choice",
    category: "Idea & Market Demand",
    question: "A pragmatic workflow to test ideas efficiently would include:",
    options: [
      "Brainstorm → Film → Edit → Upload → Hope",
      "Research demand → Draft title/thumbnail → Outline hook/points → Then produce",
      "Design thumbnail after upload",
      "Find tags first, idea later"
    ],
    correctAnswer: "Research demand → Draft title/thumbnail → Outline hook/points → Then produce",
    explanation: "Front-load validation to ensure your production time is spent on promising ideas.",
    difficulty: "medium",
  },
  {
    id: "yt_imd_4",
    type: "true-false",
    category: "Idea & Market Demand",
    question: "Imitating a trending video from a mega channel usually guarantees similar results on a new channel.",
    correctAnswer: false,
    explanation: "Without differentiation and validated demand for your audience, copying often fails.",
    difficulty: "easy",
  },
  {
    id: "yt_imd_5",
    type: "fill-in-the-blank",
    category: "Idea & Market Demand",
    question: "A data-backed ideation tool can surface topics where ___ is greater than supply.",
    correctAnswer: "demand",
    explanation: "Targeting demand-heavy, supply-light topics increases your chance of discovery.",
    difficulty: "easy",
  },

  // 4) Thumbnail Strategy
  {
    id: "yt_ts_1",
    type: "multiple-choice",
    category: "Thumbnail Strategy",
    question: "What is the thumbnail’s primary job?",
    options: [
      "Show as many elements as possible",
      "Maximize curiosity and clarity to earn the click",
      "Replicate video content with lots of text",
      "Blend into competitors to avoid standing out"
    ],
    correctAnswer: "Maximize curiosity and clarity to earn the click",
    explanation: "Thumbnails act as the billboard. Curiosity + clarity drive CTR.",
    difficulty: "easy",
  },
  {
    id: "yt_ts_2",
    type: "multiple-choice",
    category: "Thumbnail Strategy",
    question: "Which best practice typically improves CTR?",
    options: [
      "Complex collages with >10 elements",
      "Muted colors and tiny text",
      "Expressive faces, high contrast, minimal text",
      "Dense paragraphs explaining the idea"
    ],
    correctAnswer: "Expressive faces, high contrast, minimal text",
    explanation: "Clear focal point and quick comprehension increase clicks.",
    difficulty: "easy",
  },
  {
    id: "yt_ts_3",
    type: "multiple-choice",
    category: "Thumbnail Strategy",
    question: "You’re A/B testing thumbnails. What’s the best approach?",
    options: [
      "Change multiple variables at once to save time",
      "Test one variable at a time and run at least 48 hours",
      "Swap thumbnails every hour",
      "Only test colors, never composition"
    ],
    correctAnswer: "Test one variable at a time and run at least 48 hours",
    explanation: "Isolate variables to attribute performance differences correctly. Allow time for reliable data.",
    difficulty: "medium",
  },
  {
    id: "yt_ts_4",
    type: "fill-in-the-blank",
    category: "Thumbnail Strategy",
    question: "Two common winning thumbnail archetypes are “The Moment” and “The ___”.",
    correctAnswer: "Result",
    explanation: "‘The Result’ shows the compelling outcome; ‘The Moment’ shows the decisive instant that sparks curiosity.",
    difficulty: "easy",
  },
  {
    id: "yt_ts_5",
    type: "true-false",
    category: "Thumbnail Strategy",
    question: "The thumbnail is an afterthought compared to the video content.",
    correctAnswer: false,
    explanation: "Without a strong thumbnail, even great videos won’t be clicked. Many pros design thumbnails first.",
    difficulty: "easy",
  },

  // 5) Title & Packaging
  {
    id: "yt_tp_1",
    type: "multiple-choice",
    category: "Title & Packaging",
    question: "What makes for a strong title?",
    options: [
      "Ambiguous phrasing with insider jargon",
      "Clarity of promise, emotional pull, and curiosity",
      "Maximum length and keyword stuffing",
      "All caps and emojis only"
    ],
    correctAnswer: "Clarity of promise, emotional pull, and curiosity",
    explanation: "Titles must set a clear expectation and intrigue the viewer without misleading.",
    difficulty: "easy",
  },
  {
    id: "yt_tp_2",
    type: "multiple-choice",
    category: "Title & Packaging",
    question: "Which pairing is most coherent?",
    options: [
      "Title promises a transformation; thumbnail shows a random selfie",
      "Title teases a result; thumbnail visualizes that result crisply",
      "Title and thumbnail emphasize unrelated ideas",
      "Title hides the video’s premise"
    ],
    correctAnswer: "Title teases a result; thumbnail visualizes that result crisply",
    explanation: "Title and thumbnail must work together to deliver a single, irresistible promise.",
    difficulty: "easy",
  },
  {
    id: "yt_tp_3",
    type: "true-false",
    category: "Title & Packaging",
    question: "Packaging should be designed before scripting to anchor the core promise.",
    correctAnswer: true,
    explanation: "Start from the promise (title + thumbnail) to architect the narrative that fulfills it.",
    difficulty: "easy",
  },
  {
    id: "yt_tp_4",
    type: "fill-in-the-blank",
    category: "Title & Packaging",
    question: "A good packaging test is: Can someone understand the video’s promise in under ___ seconds?",
    correctAnswer: "3",
    explanation: "If the promise isn’t obvious in a glance, CTR suffers.",
    difficulty: "medium",
  },
  {
    id: "yt_tp_5",
    type: "multiple-choice",
    category: "Title & Packaging",
    question: "Which iteration workflow is most effective?",
    options: [
      "Write one title and never change it",
      "Draft 10–20 title variations and shortlist the best",
      "Ask friends only",
      "Pick the longest keyword-rich title"
    ],
    correctAnswer: "Draft 10–20 title variations and shortlist the best",
    explanation: "Systematic variation increases odds of landing on a winner.",
    difficulty: "medium",
  },

  // 6) Scripting & Hooks
  {
    id: "yt_sh_1",
    type: "multiple-choice",
    category: "Scripting & Hooks",
    question: "What is the most critical part of your script for retention?",
    options: [
      "Mid-roll section",
      "Intro hook that confirms the promise and opens loops",
      "End-screen callouts",
      "Credits"
    ],
    correctAnswer: "Intro hook that confirms the promise and opens loops",
    explanation: "Without a strong hook, viewers bounce early, harming retention and distribution.",
    difficulty: "easy",
  },
  {
    id: "yt_sh_2",
    type: "multiple-choice",
    category: "Scripting & Hooks",
    question: "A reliable paragraph structure for YouTube flips the traditional order to:",
    options: [
      "What → Why → How",
      "Why → What → How",
      "How → What → Why",
      "Who → Where → When"
    ],
    correctAnswer: "Why → What → How",
    explanation: "Lead with ‘Why’ to open curiosity loops, then explain ‘What’, and deliver ‘How’.",
    difficulty: "medium",
  },
  {
    id: "yt_sh_3",
    type: "true-false",
    category: "Scripting & Hooks",
    question: "Closing one curiosity loop near the end without opening a new one earlier is ideal for retention.",
    correctAnswer: false,
    explanation: "You should continuously open and close loops to maintain momentum through the video.",
    difficulty: "medium",
  },
  {
    id: "yt_sh_4",
    type: "fill-in-the-blank",
    category: "Scripting & Hooks",
    question: "Section transitions should act as ___ to pull viewers into the next part.",
    correctAnswer: "bridges",
    explanation: "Intentional bridges keep the narrative smooth and reduce drop-off.",
    difficulty: "easy",
  },
  {
    id: "yt_sh_5",
    type: "multiple-choice",
    category: "Scripting & Hooks",
    question: "Which techniques amplify script engagement?",
    options: [
      "Abstract claims only",
      "Examples, comparisons, stories, and personalization",
      "Listing keywords",
      "Reading the thumbnail text verbatim"
    ],
    correctAnswer: "Examples, comparisons, stories, and personalization",
    explanation: "These devices add concreteness and emotional resonance, improving retention.",
    difficulty: "medium",
  },

  // 7) Production & Filming
  {
    id: "yt_pf_1",
    type: "true-false",
    category: "Production & Filming",
    question: "Capturing clean audio at the source often matters more than adding effects later.",
    correctAnswer: true,
    explanation: "Good microphones and quiet environments reduce post-processing needs and improve clarity.",
    difficulty: "easy",
  },
  {
    id: "yt_pf_2",
    type: "multiple-choice",
    category: "Production & Filming",
    question: "Which setup principle most directly impacts viewer comprehension?",
    options: [
      "Beautiful bokeh only",
      "Clear framing, eye-line, and lighting on the subject",
      "Complex camera moves every 10 seconds",
      "Extreme color grading"
    ],
    correctAnswer: "Clear framing, eye-line, and lighting on the subject",
    explanation: "Clarity beats novelty. The viewer must easily process the presenter and visual information.",
    difficulty: "easy",
  },
  {
    id: "yt_pf_3",
    type: "multiple-choice",
    category: "Production & Filming",
    question: "For planning shots with packaging in mind, what should exist before filming?",
    options: [
      "Only a gear checklist",
      "A defined title, thumbnail concept, and a structured outline",
      "A finalized end screen",
      "A tag list"
    ],
    correctAnswer: "A defined title, thumbnail concept, and a structured outline",
    explanation: "Shooting with the promise in mind ensures every shot contributes to that promise.",
    difficulty: "medium",
  },
  {
    id: "yt_pf_4",
    type: "fill-in-the-blank",
    category: "Production & Filming",
    question: "Remove long silent gaps during recording to reduce ___ work later.",
    correctAnswer: "editing",
    explanation: "Cleaner source material accelerates post-production and improves pacing.",
    difficulty: "easy",
  },
  {
    id: "yt_pf_5",
    type: "multiple-choice",
    category: "Production & Filming",
    question: "Which choice best supports sustainable production?",
    options: [
      "Buying the most expensive camera first",
      "Optimizing workflow and repeatable setups",
      "Filming without outlines",
      "Recording in noisy environments"
    ],
    correctAnswer: "Optimizing workflow and repeatable setups",
    explanation: "Systems beat gear. Consistent setups reduce friction and improve output quality.",
    difficulty: "medium",
  },

  // 8) Editing & Post-Production
  {
    id: "yt_ep_1",
    type: "multiple-choice",
    category: "Editing & Post-Production",
    question: "Which editing tactic most directly improves retention?",
    options: [
      "Random flashy effects",
      "Pattern interrupts used purposefully",
      "Excessive transitions every second",
      "Heavy color LUTs only"
    ],
    correctAnswer: "Pattern interrupts used purposefully",
    explanation: "Pattern interrupts reset attention when viewers might drift, but should serve the story.",
    difficulty: "easy",
  },
  {
    id: "yt_ep_2",
    type: "multiple-choice",
    category: "Editing & Post-Production",
    question: "Which combination balances the visual stack effectively?",
    options: [
      "A-Roll only",
      "A-Roll, B-Roll, graphic elements, on-screen text, and motion used intentionally",
      "Only subtitles",
      "Only emojis and stickers"
    ],
    correctAnswer: "A-Roll, B-Roll, graphic elements, on-screen text, and motion used intentionally",
    explanation: "Use the full toolkit to clarify ideas, not to distract.",
    difficulty: "medium",
  },
  {
    id: "yt_ep_3",
    type: "true-false",
    category: "Editing & Post-Production",
    question: "Audio (voice, music, SFX) is often as important as visuals for perceived quality.",
    correctAnswer: true,
    explanation: "Audio clarity, appropriate music, and tasteful SFX elevate engagement and professionalism.",
    difficulty: "easy",
  },
  {
    id: "yt_ep_4",
    type: "fill-in-the-blank",
    category: "Editing & Post-Production",
    question: "Background music must support the content; the wrong choice can completely ___ the video.",
    correctAnswer: "ruin",
    explanation: "Poorly matched music distracts or creates the wrong mood, harming retention.",
    difficulty: "medium",
  },
  {
    id: "yt_ep_5",
    type: "multiple-choice",
    category: "Editing & Post-Production",
    question: "What’s a practical first-pass rule for pacing?",
    options: [
      "Keep every pause for authenticity",
      "Cut dead air and tighten to the promise",
      "Add as many effects as possible",
      "Avoid using B-Roll"
    ],
    correctAnswer: "Cut dead air and tighten to the promise",
    explanation: "Remove friction and keep momentum aligned to the viewer’s expectation.",
    difficulty: "easy",
  },

  // 9) Analytics & Algorithm
  {
    id: "yt_aa_1",
    type: "multiple-choice",
    category: "Analytics & Algorithm",
    question: "Which pair is most critical for growth?",
    options: [
      "CTR and audience retention",
      "Number of uploaded shorts",
      "Subscriber count and tags",
      "Description length and hashtags"
    ],
    correctAnswer: "CTR and audience retention",
    explanation: "CTR gets the click; retention earns distribution. Combined, they drive recommendations.",
    difficulty: "easy",
  },
  {
    id: "yt_aa_2",
    type: "multiple-choice",
    category: "Analytics & Algorithm",
    question: "Where do you find primary traffic sources for discovery?",
    options: ["Realtime", "Audience", "Reach", "Engagement"],
    correctAnswer: "Reach",
    explanation: "The Reach tab shows how viewers discover your videos: browse, search, suggested, etc.",
    difficulty: "easy",
  },
  {
    id: "yt_aa_3",
    type: "true-false",
    category: "Analytics & Algorithm",
    question: "Impressions click-through rate measures how often a shown thumbnail turns into a view.",
    correctAnswer: true,
    explanation: "CTR = clicks / impressions. It reflects packaging effectiveness.",
    difficulty: "easy",
  },
  {
    id: "yt_aa_4",
    type: "fill-in-the-blank",
    category: "Analytics & Algorithm",
    question: "Audience ___ indicates the average percentage watched across your video.",
    correctAnswer: "retention",
    explanation: "Retention tells you where people drop off and what holds attention.",
    difficulty: "easy",
  },
  {
    id: "yt_aa_5",
    type: "multiple-choice",
    category: "Analytics & Algorithm",
    question: "Which analysis loop is most productive?",
    options: [
      "Ignore data to avoid bias",
      "Review CTR/retention → Diagnose packaging/narrative → Iterate next video",
      "Only chase viral topics regardless of audience fit",
      "Focus on subscriber count only"
    ],
    correctAnswer: "Review CTR/retention → Diagnose packaging/narrative → Iterate next video",
    explanation: "Use analytics to form hypotheses and refine both packaging and script structure.",
    difficulty: "medium",
  },

  // 10) Monetization & Business
  {
    id: "yt_mb_1",
    type: "multiple-choice",
    category: "Monetization & Business",
    question: "Beyond AdSense, which monetization paths are common?",
    options: [
      "Only paid tags",
      "Channel memberships, affiliates, digital products/services, sponsorships",
      "Comments and likes for cash",
      "Longer descriptions for higher pay"
    ],
    correctAnswer: "Channel memberships, affiliates, digital products/services, sponsorships",
    explanation: "Diversifying revenue stabilizes income and can outpace ad earnings.",
    difficulty: "easy",
  },
  {
    id: "yt_mb_2",
    type: "multiple-choice",
    category: "Monetization & Business",
    question: "Which statement about CPM is most accurate?",
    options: [
      "It’s identical across niches",
      "It tends to vary by audience value and advertiser demand",
      "It’s controlled by upload frequency",
      "It’s higher on weekends only"
    ],
    correctAnswer: "It tends to vary by audience value and advertiser demand",
    explanation: "Advertiser competition for valuable audiences increases rates.",
    difficulty: "medium",
  },
  {
    id: "yt_mb_3",
    type: "true-false",
    category: "Monetization & Business",
    question: "YouTube Premium revenue is distributed to creators based on member watch time.",
    correctAnswer: true,
    explanation: "Premium payouts reflect member watch time of your content.",
    difficulty: "easy",
  },
  {
    id: "yt_mb_4",
    type: "fill-in-the-blank",
    category: "Monetization & Business",
    question: "A strong niche strategy often unlocks multiple income streams beyond ads, such as ___ marketing.",
    correctAnswer: "affiliate",
    explanation: "Affiliate marketing complements ad revenue with relevant product/service recommendations.",
    difficulty: "easy",
  },
  {
    id: "yt_mb_5",
    type: "multiple-choice",
    category: "Monetization & Business",
    question: "A pragmatic business approach to offers is:",
    options: [
      "Wait for sponsors only",
      "Create audience-fit offers (courses, templates, tools) that solve validated problems",
      "Sell unrelated products frequently",
      "Avoid asking for the sale"
    ],
    correctAnswer: "Create audience-fit offers (courses, templates, tools) that solve validated problems",
    explanation: "Use your analytics and feedback to design offers with clear outcomes for your audience.",
    difficulty: "medium",
  },
];