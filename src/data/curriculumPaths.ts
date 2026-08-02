export interface CurriculumPath {
  id: string;
  title: string;
  description: string;
  lessonIds: string[];
  outcome: string;
}

export const curriculumPaths: CurriculumPath[] = [
  {
    id: 'change-through-time',
    title: 'How systems change through time',
    description: 'Move from one object in motion to chemical balance, population change, and a planet-scale energy system.',
    lessonIds: [
      'a-throw-is-two-motions',
      'equilibrium-never-stands-still',
      'selection-changes-populations',
      'climate-starts-with-an-energy-budget',
    ],
    outcome: 'Recognize state, rate, feedback, balance, and change across very different scientific systems.',
  },
  {
    id: 'signals-decisions-patterns',
    title: 'Signals, decisions, and hidden structure',
    description: 'Start with evidence, then study market coordination, explicit algorithms, and rhythmic ratios.',
    lessonIds: [
      'evidence-changes-belief',
      'price-is-a-coordination-signal',
      'sorting-makes-procedure-visible',
      'rhythm-is-division-through-time',
    ],
    outcome: 'Separate observations from interpretation and uncover the procedure or structure underneath an outcome.',
  },
  {
    id: 'growth-feedback-limits',
    title: 'Growth, feedback, and limits',
    description: 'Move from pure exponential structure to money over time, coupled ecology, and planetary constraints.',
    lessonIds: ['exponential-growth-is-repeated-multiplication', 'compound-interest-is-time-multiplying', 'predators-and-prey-create-cycles', 'climate-starts-with-an-energy-budget'],
    outcome: 'Recognize multiplicative growth, delayed feedback, purchasing-power changes, and limits that stop simple curves continuing forever.',
  },
  {
    id: 'rules-motion-evidence',
    title: 'Rules, motion, and evidence',
    description: 'Connect formal logic to algorithms, projectile decomposition, orbital motion, and evidence-based updating.',
    lessonIds: ['truth-tables-expose-rule-structure', 'sorting-makes-procedure-visible', 'a-throw-is-two-motions', 'orbits-are-falling-sideways', 'evidence-changes-belief'],
    outcome: 'Separate rule structure from factual evidence and see how explicit update rules generate complex outcomes.',
  },
  {
    id: 'scale-time-thresholds',
    title: 'Scale, time, and decision thresholds',
    description: 'Advance from repeated multiplication to logarithmic scale, time-sensitive compounding, Bayesian updating, and consequence-aware decisions.',
    lessonIds: [
      'exponential-growth-is-repeated-multiplication',
      'logarithms-run-growth-backward',
      'compound-interest-is-time-multiplying',
      'time-changes-who-did-the-work',
      'evidence-changes-belief',
      'probability-is-not-a-decision',
    ],
    outcome: 'Reason backward through multiplicative scale, distinguish a projection path from its endpoint, and separate probability estimates from action thresholds.',
  },
  {
    id: 'boundaries-counterexamples-stability',
    title: 'Boundaries, counterexamples, and stability',
    description: 'Study what changes at a boundary: bound versus escape, damped versus amplified feedback, valid versus invalid inference, and manageable versus rapidly growing work.',
    lessonIds: [
      'orbits-are-falling-sideways',
      'escape-is-a-boundary-not-no-gravity',
      'predators-and-prey-create-cycles',
      'feedback-strength-changes-stability',
      'truth-tables-expose-rule-structure',
      'counterexamples-break-invalid-forms',
      'sorting-makes-procedure-visible',
      'efficiency-is-how-work-scales',
    ],
    outcome: 'Identify qualitative boundaries, construct decisive counterexamples, and compare how systems change as parameters or input size grow.',
  },
];
