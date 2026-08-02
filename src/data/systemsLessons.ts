import { Lesson } from '../types/lesson';

export const systemsLessons: Lesson[] = [
  {
    "id": "price-is-a-coordination-signal",
    "title": "Price Is a Coordination Signal",
    "subtitle": "Plans meet under scarcity",
    "description": "Shift supply and demand, move price away from equilibrium, and watch shortages or surpluses emerge.",
    "coreQuestion": "How can separate buying and selling plans become partially coordinated?",
    "firstPrinciple": "Price changes planned quantities; a clearing price is where modeled planned supply equals modeled planned demand.",
    "durationMinutes": 14,
    "difficulty": "foundation",
    "emoji": "⚖️",
    "field": "Economics",
    "relatedCategory": "Economics",
    "recommendedLessonIds": [
      "sorting-makes-procedure-visible"
    ],
    "learningObjectives": [
      "Read curves as conditional plans.",
      "Distinguish movement along a curve from a curve shift.",
      "Predict shortage, surplus, and equilibrium direction."
    ],
    "concepts": [
      {
        "id": "demand-curve",
        "label": "Demand curve",
        "description": "Planned quantity demanded at different prices."
      },
      {
        "id": "supply-curve",
        "label": "Supply curve",
        "description": "Planned quantity supplied at different prices."
      },
      {
        "id": "market-clearing",
        "label": "Market clearing",
        "description": "A modeled price where planned quantities match."
      }
    ],
    "tutorBrief": "Curves are conditional plans, not physical objects or moral judgments. Separate movement from shift.",
    "blocks": [
      {
        "id": "story",
        "type": "explain",
        "eyebrow": "First principle",
        "title": "A price coordinates plans",
        "body": "Buyers and sellers arrive with different needs, costs, alternatives, and information. Price changes which transactions they attempt."
      },
      {
        "id": "lab",
        "type": "interactive",
        "eyebrow": "Predict → manipulate",
        "title": "Create shortage, surplus, and balance",
        "body": "Shift demand and supply, then set a price above or below clearing.",
        "visual": "supply-demand",
        "challenge": "Create a supply disruption. Predict the direction of equilibrium price and quantity before reading it."
      },
      {
        "id": "c1",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Below equilibrium",
        "prompt": "What appears when price is far below clearing?",
        "options": [
          "Supply exceeds demand",
          "Demand exceeds supply",
          "Both curves vanish",
          "Planned quantities match"
        ],
        "correctAnswer": "Demand exceeds supply",
        "explanation": "Buyers plan more purchases than sellers plan supply.",
        "conceptIds": [
          "market-clearing",
          "demand-curve",
          "supply-curve"
        ]
      },
      {
        "id": "c2",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Supply disruption",
        "prompt": "Holding demand fixed, a leftward supply shift moves equilibrium toward…",
        "options": [
          "Lower price, higher quantity",
          "Higher price, lower quantity",
          "No change",
          "Zero demand"
        ],
        "correctAnswer": "Higher price, lower quantity",
        "explanation": "The new intersection has less quantity and a higher price.",
        "conceptIds": [
          "supply-curve",
          "market-clearing"
        ]
      },
      {
        "id": "carry",
        "type": "takeaways",
        "eyebrow": "Carry forward",
        "title": "What should survive the lesson",
        "items": [
          "Curves describe conditional plans.",
          "Shortage or surplus appears away from clearing.",
          "A shift changes a relationship; a movement changes position.",
          "Institutions, power, expectations, and time matter."
        ]
      }
    ]
  },
  {
    "id": "sorting-makes-procedure-visible",
    "title": "Sorting Makes Procedure Visible",
    "subtitle": "State, comparison, invariant",
    "description": "Step through two sorting algorithms and connect visible procedure to operation growth.",
    "coreQuestion": "What makes an algorithm more than “put these in order”?",
    "firstPrinciple": "An algorithm explicitly transforms state through valid steps while preserving a reason it will finish correctly.",
    "durationMinutes": 15,
    "difficulty": "foundation",
    "emoji": "🧮",
    "field": "Computer Science",
    "relatedCategory": "Computer Science",
    "recommendedLessonIds": [
      "rhythm-is-division-through-time"
    ],
    "learningObjectives": [
      "Describe an algorithm as state transitions.",
      "Identify an invariant in bubble or insertion sort.",
      "Separate correctness from scalability."
    ],
    "concepts": [
      {
        "id": "algorithm-state",
        "label": "Algorithm state",
        "description": "Current data, position, and partial progress."
      },
      {
        "id": "comparison-cost",
        "label": "Operation growth",
        "description": "How work grows as input size changes."
      },
      {
        "id": "procedure-invariant",
        "label": "Procedure invariant",
        "description": "A property kept true after every step."
      }
    ],
    "tutorBrief": "Teach state and invariants before Big-O. Do not present either algorithm as a production default.",
    "blocks": [
      {
        "id": "story",
        "type": "explain",
        "eyebrow": "First principle",
        "title": "“Sort the books” hides the method",
        "body": "A human uses perception and experience. A computer needs exact comparisons, movements, and a stopping condition."
      },
      {
        "id": "lab",
        "type": "interactive",
        "eyebrow": "Predict → manipulate",
        "title": "Step through bubble and insertion sort",
        "body": "Play, pause, and step. Track active values, sorted regions, comparisons, and swaps.",
        "visual": "sorting-algorithms",
        "challenge": "Shuffle until nearly sorted. Which procedure exploits existing order more naturally?"
      },
      {
        "id": "c1",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "What is state?",
        "prompt": "Which best captures algorithm state?",
        "options": [
          "Only the final array",
          "Current values, active positions, and partial progress",
          "The language logo",
          "Screen brightness"
        ],
        "correctAnswer": "Current values, active positions, and partial progress",
        "explanation": "Each step transforms current state.",
        "conceptIds": [
          "algorithm-state"
        ]
      },
      {
        "id": "c2",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Why count operations?",
        "prompt": "Why is one fast animation on twelve values insufficient?",
        "options": [
          "Animation is unrelated to code",
          "We need how work grows with input size",
          "Data has no size",
          "Algorithms run once"
        ],
        "correctAnswer": "We need how work grows with input size",
        "explanation": "Complexity concerns growth, not one tiny example.",
        "conceptIds": [
          "comparison-cost"
        ]
      },
      {
        "id": "carry",
        "type": "takeaways",
        "eyebrow": "Carry forward",
        "title": "What should survive the lesson",
        "items": [
          "Make state and operations explicit.",
          "Look for an invariant.",
          "Correctness and efficiency are different questions.",
          "Growth matters more than a tiny demo."
        ]
      }
    ]
  },
  {
    "id": "rhythm-is-division-through-time",
    "title": "Rhythm Is Division Through Time",
    "subtitle": "Common cycle, different pulse grids",
    "description": "Hear and see two pulse streams divide one cycle and derive the common subdivision underneath.",
    "coreQuestion": "How can two regular rhythms feel independent while meeting inside one cycle?",
    "firstPrinciple": "A polyrhythm places different equal divisions over the same duration.",
    "durationMinutes": 13,
    "difficulty": "foundation",
    "emoji": "🥁",
    "field": "Music",
    "relatedCategory": "Music",
    "recommendedLessonIds": [
      "climate-starts-with-an-energy-budget"
    ],
    "learningObjectives": [
      "Represent a polyrhythm as two divisions of one cycle.",
      "Use least common multiple to find the shared grid.",
      "Separate pulse ratio from tempo."
    ],
    "concepts": [
      {
        "id": "common-cycle",
        "label": "Common cycle",
        "description": "Shared duration completed by both pulse streams."
      },
      {
        "id": "pulse-ratio",
        "label": "Pulse ratio",
        "description": "Relationship between pulse counts."
      },
      {
        "id": "subdivision-grid",
        "label": "Shared subdivision",
        "description": "Smallest grid placing every pulse boundary."
      }
    ],
    "tutorBrief": "Teach ratio by listening and visible subdivisions. Groove also depends on accent, timing, timbre, and culture.",
    "blocks": [
      {
        "id": "story",
        "type": "explain",
        "eyebrow": "First principle",
        "title": "Two hands divide one span differently",
        "body": "Tap three equal notes with one hand and two with the other across the same duration. Neither hand is irregular."
      },
      {
        "id": "lab",
        "type": "interactive",
        "eyebrow": "Predict → manipulate",
        "title": "Build a pulse ratio",
        "body": "Choose pulse counts, listen, and inspect the shared grid.",
        "visual": "polyrhythm",
        "challenge": "Compare 3:2, 4:2, and 4:3. Which has extra coincidences, and why?"
      },
      {
        "id": "c1",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Shared grid",
        "prompt": "For 3 against 2, how many equal subdivisions place every boundary?",
        "options": [
          "2",
          "3",
          "5",
          "6"
        ],
        "correctAnswer": "6",
        "explanation": "Six is the least common multiple of 3 and 2.",
        "conceptIds": [
          "subdivision-grid",
          "pulse-ratio"
        ]
      },
      {
        "id": "c2",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Speed it up",
        "prompt": "If 3:2 plays faster, what changes?",
        "options": [
          "Pulse counts per cycle",
          "Cycle duration in seconds",
          "Least common multiple",
          "The ratio"
        ],
        "correctAnswer": "Cycle duration in seconds",
        "explanation": "Tempo changes speed, not structure.",
        "conceptIds": [
          "common-cycle",
          "pulse-ratio"
        ]
      },
      {
        "id": "carry",
        "type": "takeaways",
        "eyebrow": "Carry forward",
        "title": "What should survive the lesson",
        "items": [
          "Two regular divisions can coexist.",
          "Ratio describes counts, not speed.",
          "LCM gives a shared grid.",
          "Mathematics explains placement, not the whole musical feel."
        ]
      }
    ]
  },
  {
    "id": "climate-starts-with-an-energy-budget",
    "title": "Climate Starts With an Energy Budget",
    "subtitle": "Incoming, reflected, absorbed, escaping",
    "description": "Adjust sunlight, reflectivity, and infrared escape to see why temperature is an energy-flow problem.",
    "coreQuestion": "Why does planetary temperature change when incoming and outgoing energy do not balance?",
    "firstPrinciple": "A planet warms when it absorbs energy faster than it loses energy and cools in the reverse case.",
    "durationMinutes": 15,
    "difficulty": "intermediate",
    "emoji": "🌍",
    "field": "Earth Science",
    "relatedCategory": "Earth Science",
    "learningObjectives": [
      "Track solar energy through reflection and absorption.",
      "Distinguish albedo from infrared escape.",
      "Predict warming or cooling from imbalance."
    ],
    "concepts": [
      {
        "id": "absorbed-energy",
        "label": "Absorbed solar energy",
        "description": "Incoming energy left after reflection."
      },
      {
        "id": "albedo",
        "label": "Albedo",
        "description": "Fraction of incoming shortwave energy reflected."
      },
      {
        "id": "infrared-escape",
        "label": "Infrared escape",
        "description": "How effectively thermal radiation reaches space."
      }
    ],
    "tutorBrief": "Teach energy accounting before detail. Repeat that the zero-dimensional model is not a projection.",
    "blocks": [
      {
        "id": "story",
        "type": "explain",
        "eyebrow": "First principle",
        "title": "Snow changes more than the view",
        "body": "Bright snow reflects more sunlight than dark soil or water. Separately, atmospheric gases alter infrared escape. These affect different arrows in the budget."
      },
      {
        "id": "lab",
        "type": "interactive",
        "eyebrow": "Predict → manipulate",
        "title": "Balance the flows",
        "body": "Change solar input, albedo, and infrared trapping.",
        "visual": "energy-balance",
        "challenge": "Increase albedo, then separately increase infrared trapping. Explain why they change temperature through different pathways."
      },
      {
        "id": "c1",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Increase albedo",
        "prompt": "With other controls fixed, higher albedo first…",
        "options": [
          "Increases absorbed sunlight",
          "Decreases absorbed sunlight",
          "Stops infrared emission",
          "Raises solar input"
        ],
        "correctAnswer": "Decreases absorbed sunlight",
        "explanation": "More incoming sunlight is reflected.",
        "conceptIds": [
          "albedo",
          "absorbed-energy"
        ]
      },
      {
        "id": "c2",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Energy imbalance",
        "prompt": "If absorbed energy exceeds outgoing energy, the tendency is…",
        "options": [
          "Cooling",
          "Warming",
          "No possible change",
          "Instant freezing"
        ],
        "correctAnswer": "Warming",
        "explanation": "Net energy accumulates.",
        "conceptIds": [
          "absorbed-energy",
          "infrared-escape"
        ]
      },
      {
        "id": "carry",
        "type": "takeaways",
        "eyebrow": "Carry forward",
        "title": "What should survive the lesson",
        "items": [
          "Temperature responds to sustained energy imbalance.",
          "Albedo changes incoming absorption.",
          "Greenhouse physics changes outgoing escape.",
          "A one-box model omits circulation, oceans, clouds, and geography."
        ]
      }
    ]
  }
];
