import { Lesson } from '../types/lesson';

export const scienceLessons: Lesson[] = [
  {
    "id": "a-throw-is-two-motions",
    "title": "A Throw Is Two Motions",
    "subtitle": "One curve, two independent changes",
    "description": "Launch a virtual object, separate horizontal velocity from vertical acceleration, and explain why the path curves.",
    "coreQuestion": "How can one object follow a curve when gravity only pulls downward?",
    "firstPrinciple": "With air resistance ignored, horizontal velocity stays constant while gravity continuously changes vertical velocity.",
    "durationMinutes": 14,
    "difficulty": "foundation",
    "emoji": "🏹",
    "field": "Physics",
    "relatedCategory": "Physics",
    "recommendedLessonIds": [
      "climate-starts-with-an-energy-budget"
    ],
    "learningObjectives": [
      "Split launch velocity into horizontal and vertical components.",
      "Explain the highest point without claiming total velocity is zero.",
      "Predict how speed, angle, and gravity change the path."
    ],
    "concepts": [
      {
        "id": "horizontal-motion",
        "label": "Horizontal motion",
        "description": "Constant horizontal velocity when horizontal force is neglected."
      },
      {
        "id": "vertical-acceleration",
        "label": "Vertical acceleration",
        "description": "Gravity changes vertical velocity each second."
      },
      {
        "id": "launch-components",
        "label": "Velocity components",
        "description": "One velocity represented as perpendicular parts."
      }
    ],
    "tutorBrief": "Teach decomposition before formulas. Ask for predictions and name the no-drag, level-ground assumptions.",
    "blocks": [
      {
        "id": "story",
        "type": "explain",
        "eyebrow": "First principle",
        "title": "The ball does not know a parabola",
        "body": "A kicked ball only has velocity and forces. The curve emerges because forward motion continues while gravity changes the vertical part.",
        "bullets": [
          "The launch velocity can be split into two components.",
          "Gravity changes only the vertical component in this model.",
          "The components recombine into one visible path."
        ]
      },
      {
        "id": "lab",
        "type": "interactive",
        "eyebrow": "Predict → manipulate",
        "title": "Build the path from components",
        "body": "Predict before pressing Launch, then vary speed, angle, and gravity.",
        "visual": "projectile-motion",
        "challenge": "At fixed speed and gravity compare 30°, 45°, and 60°. Which pair has similar range, and why do heights differ?"
      },
      {
        "id": "c1",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "At the top",
        "prompt": "At the highest point, which statement is correct?",
        "options": [
          "The entire velocity is zero",
          "Vertical velocity is zero but horizontal velocity remains",
          "Gravity becomes zero",
          "Horizontal velocity reverses"
        ],
        "correctAnswer": "Vertical velocity is zero but horizontal velocity remains",
        "explanation": "The object stops rising for an instant but continues horizontally; gravity remains.",
        "conceptIds": [
          "horizontal-motion",
          "vertical-acceleration"
        ]
      },
      {
        "id": "c2",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Increase speed",
        "prompt": "If launch speed rises while angle and gravity stay fixed, what happens?",
        "options": [
          "Range and maximum height both increase",
          "Only air time changes",
          "Gravity weakens",
          "Horizontal motion disappears"
        ],
        "correctAnswer": "Range and maximum height both increase",
        "explanation": "Both initial components grow.",
        "conceptIds": [
          "launch-components"
        ]
      },
      {
        "id": "carry",
        "type": "takeaways",
        "eyebrow": "Carry forward",
        "title": "What should survive the lesson",
        "items": [
          "Decompose motion into independent directions.",
          "A zero component is not zero total velocity.",
          "Equations summarize update rules.",
          "Always state simulation assumptions."
        ]
      }
    ]
  },
  {
    "id": "equilibrium-never-stands-still",
    "title": "Equilibrium Never Stands Still",
    "subtitle": "Opposing reactions, equal flux",
    "description": "Watch a reversible reaction approach stable composition while molecules continue changing both ways.",
    "coreQuestion": "How can concentrations remain stable while reactions continue?",
    "firstPrinciple": "Composition stops changing when forward and reverse fluxes become equal—not when reactions stop.",
    "durationMinutes": 15,
    "difficulty": "intermediate",
    "emoji": "⚗️",
    "field": "Chemistry",
    "relatedCategory": "Chemistry",
    "recommendedLessonIds": [
      "selection-changes-populations"
    ],
    "learningObjectives": [
      "Distinguish equal reaction rates from equal concentrations.",
      "Explain why a flat graph can hide molecular change.",
      "Predict how relative rates alter equilibrium composition."
    ],
    "concepts": [
      {
        "id": "dynamic-equilibrium",
        "label": "Dynamic equilibrium",
        "description": "Stable macroscopic state maintained by equal opposing fluxes."
      },
      {
        "id": "reaction-rates",
        "label": "Reaction rates",
        "description": "How quickly material changes in each direction."
      },
      {
        "id": "equilibrium-composition",
        "label": "Equilibrium composition",
        "description": "Stable proportion created by relative opposing rates."
      }
    ],
    "tutorBrief": "Distinguish equal rates from equal amounts. Treat A ⇌ B as a mass-conserving first-order teaching system.",
    "blocks": [
      {
        "id": "story",
        "type": "explain",
        "eyebrow": "First principle",
        "title": "A quiet flask can contain constant motion",
        "body": "In a sealed vessel A becomes B and B becomes A. As composition changes, each direction gains or loses available material until the opposing fluxes match."
      },
      {
        "id": "lab",
        "type": "interactive",
        "eyebrow": "Predict → manipulate",
        "title": "Approach equilibrium from different starts",
        "body": "Change both rate constants and the starting mixture.",
        "visual": "chemical-equilibrium",
        "challenge": "Keep rates fixed but start once with 90% A and once with 10% A. Does the final composition remember the start?"
      },
      {
        "id": "c1",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "What has stopped?",
        "prompt": "At dynamic equilibrium, what is zero?",
        "options": [
          "Both reaction rates",
          "Net change in composition",
          "Molecular motion",
          "The number of particles"
        ],
        "correctAnswer": "Net change in composition",
        "explanation": "Opposing nonzero changes cancel macroscopically.",
        "conceptIds": [
          "dynamic-equilibrium",
          "reaction-rates"
        ]
      },
      {
        "id": "c2",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Change one rate",
        "prompt": "If A → B becomes faster while B → A stays unchanged, what happens to equilibrium A?",
        "options": [
          "It increases",
          "It decreases",
          "It becomes 50%",
          "Only the start matters"
        ],
        "correctAnswer": "It decreases",
        "explanation": "A is converted away more strongly.",
        "conceptIds": [
          "equilibrium-composition"
        ]
      },
      {
        "id": "carry",
        "type": "takeaways",
        "eyebrow": "Carry forward",
        "title": "What should survive the lesson",
        "items": [
          "Equilibrium is a balance of fluxes.",
          "Equal rates do not imply equal concentrations.",
          "A flat graph can hide active exchange.",
          "The toy model is not all of thermodynamics."
        ]
      }
    ]
  },
  {
    "id": "selection-changes-populations",
    "title": "Selection Changes Populations",
    "subtitle": "Variation → reproduction → generations",
    "description": "Evolve a trait distribution and see how populations adapt without individuals aiming toward a target.",
    "coreQuestion": "How can a population become better matched without any individual choosing to adapt?",
    "firstPrinciple": "When heritable variants leave different numbers of descendants, the population distribution changes across generations.",
    "durationMinutes": 15,
    "difficulty": "intermediate",
    "emoji": "🦎",
    "field": "Biology",
    "relatedCategory": "Biology",
    "recommendedLessonIds": [
      "evidence-changes-belief"
    ],
    "learningObjectives": [
      "Explain adaptation without intention.",
      "Separate individual outcomes from population change.",
      "Track both mean trait and variation."
    ],
    "concepts": [
      {
        "id": "population-variation",
        "label": "Population variation",
        "description": "Individuals form a distribution of traits."
      },
      {
        "id": "differential-reproduction",
        "label": "Differential reproduction",
        "description": "Variants contribute different numbers of descendants."
      },
      {
        "id": "generational-change",
        "label": "Generational change",
        "description": "Inherited frequencies shift across generations."
      }
    ],
    "tutorBrief": "Prevent teleological explanations. Individuals are selected; populations evolve.",
    "blocks": [
      {
        "id": "story",
        "type": "explain",
        "eyebrow": "First principle",
        "title": "A drought does not instruct beaks to grow",
        "body": "If seeds become harder, birds with different beaks may reproduce at different rates. The environment filters existing variants; it does not redesign each bird."
      },
      {
        "id": "lab",
        "type": "interactive",
        "eyebrow": "Predict → manipulate",
        "title": "Move a population through generations",
        "body": "Set the favored trait, selection strength, and variation mixing.",
        "visual": "natural-selection",
        "challenge": "Move the favored trait far from the starting mean. Compare strong and weak selection."
      },
      {
        "id": "c1",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Reject the target myth",
        "prompt": "Which statement best describes the lab?",
        "options": [
          "Individuals move their traits toward a goal",
          "The environment changes reproductive success across existing variation",
          "Mutation creates exactly what is needed",
          "All traits become identical immediately"
        ],
        "correctAnswer": "The environment changes reproductive success across existing variation",
        "explanation": "Selection filters variation without foresight.",
        "conceptIds": [
          "population-variation",
          "differential-reproduction"
        ]
      },
      {
        "id": "c2",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Why generations?",
        "prompt": "Why does modeled adaptation require reproduction?",
        "options": [
          "Adults rewrite inherited traits",
          "Descendant frequencies carry differential success forward",
          "The environment stops changing",
          "Every organism has equal fitness"
        ],
        "correctAnswer": "Descendant frequencies carry differential success forward",
        "explanation": "Inheritance makes differential success alter later populations.",
        "conceptIds": [
          "generational-change"
        ]
      },
      {
        "id": "carry",
        "type": "takeaways",
        "eyebrow": "Carry forward",
        "title": "What should survive the lesson",
        "items": [
          "Variation exists before selection filters it.",
          "Fitness is environment-dependent reproductive success.",
          "Individuals do not evolve during a lifetime.",
          "Mutation, drift, migration, and changing environments enrich the process."
        ]
      }
    ]
  },
  {
    "id": "evidence-changes-belief",
    "title": "Evidence Changes Belief",
    "subtitle": "Prior → result → posterior",
    "description": "Turn percentages into people and see why accurate tests can still produce surprising post-test probabilities.",
    "coreQuestion": "Why can the same positive test mean different things in different populations?",
    "firstPrinciple": "Evidence updates an existing probability; the result depends on both the prior and how evidence behaves under competing possibilities.",
    "durationMinutes": 14,
    "difficulty": "intermediate",
    "emoji": "🎲",
    "field": "Statistics",
    "relatedCategory": "Statistics",
    "recommendedLessonIds": [
      "price-is-a-coordination-signal"
    ],
    "learningObjectives": [
      "Translate conditional percentages into natural frequencies.",
      "Distinguish sensitivity from positive predictive value.",
      "Explain why prevalence changes the same result."
    ],
    "concepts": [
      {
        "id": "prior-probability",
        "label": "Prior probability",
        "description": "Probability before new evidence."
      },
      {
        "id": "likelihood-evidence",
        "label": "Evidence likelihood",
        "description": "How often evidence occurs under competing possibilities."
      },
      {
        "id": "posterior-probability",
        "label": "Posterior probability",
        "description": "Updated probability after combining prior and evidence."
      }
    ],
    "tutorBrief": "Use natural frequencies before notation. Emphasize reference population and denominator.",
    "blocks": [
      {
        "id": "story",
        "type": "explain",
        "eyebrow": "First principle",
        "title": "An alarm is not the event",
        "body": "A smoke alarm can be sensitive yet produce many false alarms when fires are rare. A result must be interpreted among all ways it can occur."
      },
      {
        "id": "lab",
        "type": "interactive",
        "eyebrow": "Predict → manipulate",
        "title": "Build the posterior from 1,000 cases",
        "body": "Change prevalence, sensitivity, and false-positive rate.",
        "visual": "bayes-updater",
        "challenge": "Keep test quality fixed. Raise prevalence from 1% to 25%. Why does the same positive result mean more?"
      },
      {
        "id": "c1",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Find the prior",
        "prompt": "Which input is the baseline chance before the result?",
        "options": [
          "Sensitivity",
          "False-positive rate",
          "Prevalence in the relevant population",
          "Positive count only"
        ],
        "correctAnswer": "Prevalence in the relevant population",
        "explanation": "Prevalence supplies the prior in this simplified population.",
        "conceptIds": [
          "prior-probability"
        ]
      },
      {
        "id": "c2",
        "type": "checkpoint",
        "eyebrow": "Retrieval check",
        "title": "Rare-condition trap",
        "prompt": "Why can false positives dominate for a rare condition?",
        "options": [
          "The unaffected group is much larger",
          "Sensitivity becomes negative",
          "Prevalence stops mattering",
          "Every result is random"
        ],
        "correctAnswer": "The unaffected group is much larger",
        "explanation": "A small error rate applied to a huge group can dominate.",
        "conceptIds": [
          "likelihood-evidence",
          "posterior-probability"
        ]
      },
      {
        "id": "carry",
        "type": "takeaways",
        "eyebrow": "Carry forward",
        "title": "What should survive the lesson",
        "items": [
          "Start with a relevant prior.",
          "Ask how likely evidence is under each possibility.",
          "Natural frequencies expose denominators.",
          "A posterior is only as relevant as its reference class."
        ]
      }
    ]
  }
];
