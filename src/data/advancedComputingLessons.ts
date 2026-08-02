import { Lesson } from '../types/lesson';

export const advancedComputingLessons: Lesson[] = [
{
    id: 'efficiency-is-how-work-scales',
    title: 'Efficiency Is How Work Scales',
    subtitle: 'From one run to growing input size',
    description: 'Reuse the sorting lab to move beyond “which animation looked faster?” and ask how comparisons and moves grow as the input becomes larger.',
    coreQuestion: 'Why is timing one tiny input not enough to decide which algorithm scales better?',
    firstPrinciple: 'Algorithmic efficiency compares how required work grows with input size; constant machine effects matter, but growth pattern dominates sufficiently large inputs.',
    durationMinutes: 18,
    difficulty: 'intermediate',
    emoji: '📐',
    field: 'Computer Science',
    relatedCategory: 'Computer Science',
    prerequisiteConceptIds: ['comparison-cost', 'procedure-invariant'],
    recommendedLessonIds: ['sorting-makes-procedure-visible', 'logarithms-run-growth-backward'],
    learningObjectives: [
      'Treat input size as an independent variable in algorithm comparison.',
      'Compare growth in comparisons and moves rather than one visual runtime.',
      'Explain why asymptotic comparison ignores some constants without claiming constants never matter.',
    ],
    concepts: [
      { id: 'input-size', label: 'Input size', description: 'A measurable amount of data an algorithm must process, often written as n.' },
      { id: 'work-growth', label: 'Work growth', description: 'How operation count changes when input size increases.' },
      { id: 'asymptotic-comparison', label: 'Asymptotic comparison', description: 'Comparison of dominant work-growth patterns for sufficiently large inputs.' },
    ],
    tutorBrief: 'Use operation counts and repeated trials, not animation duration alone. Clarify best, average, and worst cases. Explain that constants and hardware matter in practice even when asymptotic growth differs.',
    blocks: [
      {
        id: 'size-variable', type: 'explain', eyebrow: 'First principle', title: 'One input is a snapshot, not a scaling law',
        body: 'An algorithm may look fast on five values because every reasonable method is small there. To study efficiency, vary input size and observe how comparisons, moves, or memory grow.',
        bullets: ['Input arrangement can change work.', 'Input size reveals a trend rather than a single outcome.', 'Operation counts are more portable than animation speed.'],
      },
      {
        id: 'scaling-lab', type: 'interactive', eyebrow: 'Measure → compare', title: 'Count work across arrangements',
        body: 'Use the sorting lab with shuffled, nearly sorted, and reverse-ordered inputs. Compare bubble sort and insertion sort using comparisons and moves rather than playback time alone.',
        visual: 'sorting-algorithms',
        challenge: 'For each algorithm, find an arrangement that is easy and one that is hard. Explain what structural property creates the difference.',
      },
      {
        id: 'runtime-count', type: 'compare', eyebrow: 'Separate measurements', title: 'Wall-clock time versus operation growth',
        left: { label: 'Observed runtime', body: 'Depends on hardware, language, implementation, input, background work, and measurement noise.' },
        right: { label: 'Growth model', body: 'Tracks how a chosen work measure changes with n and helps compare behavior beyond one machine or one tiny case.' },
      },
      {
        id: 'size-check', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'What must change?',
        prompt: 'To investigate scaling, which variable must be tested across multiple values?',
        options: ['Input size', 'Button color', 'Animation easing', 'File name'],
        correctAnswer: 'Input size',
        explanation: 'Scaling concerns how work changes as the amount of input grows.',
        conceptIds: ['input-size', 'work-growth'],
      },
      {
        id: 'asymptotic-check', type: 'checkpoint', eyebrow: 'Transfer check', title: 'What does asymptotic comparison omit?',
        prompt: 'Why can an algorithm with better asymptotic growth still be slower on a tiny input?',
        options: ['Constants and setup costs can dominate at small n', 'Asymptotic analysis is random', 'Input size never matters', 'Operation counts are always identical'],
        correctAnswer: 'Constants and setup costs can dominate at small n',
        explanation: 'Dominant growth describes large-input trends; practical crossover depends on implementation and constants.',
        conceptIds: ['asymptotic-comparison', 'work-growth'],
      },
      {
        id: 'scaling-reflection', type: 'reflection', eyebrow: 'Design a fair test', title: 'Specify the experiment',
        prompt: 'Describe a fair comparison between two sorting procedures: what input sizes, arrangements, work measures, and repetitions would you use?',
        placeholder: 'I would vary… measure… and repeat…',
      },
      {
        id: 'scaling-carry', type: 'takeaways', eyebrow: 'Carry forward', title: 'What should survive the lesson',
        items: ['Efficiency asks how work grows with input size.', 'One small run cannot reveal a scaling law.', 'Input arrangement can create best and worst cases.', 'Asymptotic growth guides large-scale comparison while constants still matter in practice.'],
      },
    ],
  }
];
