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
];
