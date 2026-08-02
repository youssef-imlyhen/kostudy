import { Lesson } from '../types/lesson';

export const growthLessons: Lesson[] = [
  {
    id: 'exponential-growth-is-repeated-multiplication', title: 'Exponential Growth Is Repeated Multiplication', subtitle: 'Same percentage, changing base', emoji: '📈', durationMinutes: 14, difficulty: 'foundation', field: 'Mathematics', relatedCategory: 'Mathematics',
    description: 'Compare repeated addition with repeated multiplication, estimate doubling time, and learn why early exponential growth looks deceptively small.',
    coreQuestion: 'Why can a quantity seem almost unchanged for many steps and then become enormous?',
    firstPrinciple: 'Linear growth adds a fixed amount. Exponential growth multiplies by a fixed factor, so each new increase is applied to a changing base.',
    recommendedLessonIds: ['compound-interest-is-time-multiplying', 'predators-and-prey-create-cycles'],
    learningObjectives: ['Distinguish repeated addition from repeated multiplication.', 'Explain why doubling time depends on percentage growth rather than starting size.', 'Recognize where an exponential toy model becomes unrealistic.'],
    concepts: [
      { id: 'multiplicative-growth', label: 'Multiplicative growth', description: 'Each step scales the current amount by the same factor.' },
      { id: 'doubling-time', label: 'Doubling time', description: 'The number of equal growth steps needed for a quantity to become twice as large.' },
      { id: 'model-limits', label: 'Growth limits', description: 'Constraints that cause a constant-rate exponential model to stop matching reality.' },
    ],
    tutorBrief: 'Teach repeated multiplication before formulas. Ask for predictions before changing rate or steps. Separate mathematical behavior from claims that real systems grow forever.',
    blocks: [
      { id: 'story', type: 'explain', eyebrow: 'First principle', title: 'The base changes under your feet', body: 'Adding 10 each step always adds 10. Growing by 10% adds 10% of whatever exists now. The percentage stays fixed while the absolute increase changes.', bullets: ['Linear growth has a constant difference.', 'Exponential growth has a constant ratio.', 'The curves may look similar early and radically different later.'] },
      { id: 'lab', type: 'interactive', eyebrow: 'Predict → manipulate', title: 'Race addition against multiplication', body: 'Choose a starting amount, growth rate, and number of steps. Use the log-scale toggle when the exponential curve becomes too steep.', visual: 'exponential-growth', challenge: 'Keep the growth rate fixed and change only the starting amount. Does doubling time change? Then keep the start fixed and double the growth rate.' },
      { id: 'compare', type: 'compare', eyebrow: 'Do not merge these', title: 'Difference versus ratio', left: { label: 'Linear', body: 'The same absolute amount is added every step. Equal steps produce equal differences.' }, right: { label: 'Exponential', body: 'The same percentage is applied every step. Equal steps produce equal ratios.' } },
      { id: 'c1', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Identify the rule', prompt: 'A population changes 100 → 120 → 144 → 172.8. Which rule best describes it?', options: ['Add 20 each step', 'Multiply by 1.2 each step', 'Double each step', 'Subtract 20% each step'], correctAnswer: 'Multiply by 1.2 each step', explanation: 'Each value is 120% of the previous value, so the ratio is constant while the differences grow.', conceptIds: ['multiplicative-growth'] },
      { id: 'c2', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'What changes doubling time?', prompt: 'In a constant-percentage model, which change shortens doubling time?', options: ['A larger starting amount only', 'A higher percentage growth rate', 'Changing the unit label', 'Plotting on a log scale'], correctAnswer: 'A higher percentage growth rate', explanation: 'Starting size changes the scale, but the fixed percentage determines how quickly the quantity multiplies.', conceptIds: ['doubling-time'] },
      { id: 'reflection', type: 'reflection', eyebrow: 'Model criticism', title: 'Find the missing limit', prompt: 'Name one real process that may grow approximately exponentially for a while. What eventually prevents constant-rate growth?', placeholder: 'It can grow because… but eventually…' },
      { id: 'carry', type: 'takeaways', eyebrow: 'Carry forward', title: 'What should survive the lesson', items: ['Linear means constant difference; exponential means constant ratio.', 'Small percentage changes compound through the changing base.', 'Doubling time is a structural property of the growth rate.', 'Real systems usually encounter resources, competition, policy, or saturation.'] },
    ],
  },
  {
    id: 'compound-interest-is-time-multiplying', title: 'Compound Interest Is Time Multiplying', subtitle: 'Deposits, returns, and purchasing power', emoji: '💰', durationMinutes: 15, difficulty: 'intermediate', field: 'Finance', relatedCategory: 'Finance',
    description: 'Separate money contributed from investment growth, compare nominal balance with purchasing power, and see why time changes the mix.',
    coreQuestion: 'How much of a future balance came from saving, and how much came from growth on earlier growth?',
    firstPrinciple: 'Compounding applies returns to the current balance, including prior returns. Contributions add new principal; inflation changes what the final number can buy.',
    prerequisiteConceptIds: ['multiplicative-growth'], recommendedLessonIds: ['price-is-a-coordination-signal', 'evidence-changes-belief'],
    learningObjectives: ['Separate contributions from compound growth.', 'Distinguish nominal balance from inflation-adjusted purchasing power.', 'Identify assumptions that make a smooth forecast unrealistic.'],
    concepts: [
      { id: 'compound-return', label: 'Compound return', description: 'Returns applied to principal plus earlier accumulated returns.' },
      { id: 'cash-contributions', label: 'Cash contributions', description: 'New money added independently of investment growth.' },
      { id: 'real-purchasing-power', label: 'Real purchasing power', description: 'Nominal money adjusted for changes in general price levels.' },
    ],
    tutorBrief: 'Teach accounting relationships, not investment advice. Emphasize uncertainty, volatility, fees, taxes, and sequence risk.',
    blocks: [
      { id: 'story', type: 'explain', eyebrow: 'First principle', title: 'A balance has more than one source', body: 'A future account balance combines money deposited and returns earned on the changing balance. A large nominal number can also buy less than expected if prices rose.', bullets: ['Deposits increase principal directly.', 'Returns compound on the current balance.', 'Inflation changes purchasing power without changing the account statement.'] },
      { id: 'lab', type: 'interactive', eyebrow: 'Predict → manipulate', title: 'Separate saving from compounding', body: 'Adjust starting principal, monthly contribution, annual return, inflation, and time. Compare the three curves rather than looking only at the final balance.', visual: 'compound-growth', challenge: 'Compare one early deposit with regular monthly contributions. Which produces more contributed money, and when does growth become the larger share?' },
      { id: 'compare', type: 'compare', eyebrow: 'Two different numbers', title: 'Nominal versus real', left: { label: 'Nominal balance', body: 'The number of currency units shown in the account.' }, right: { label: 'Real purchasing power', body: 'An estimate of what that balance can buy after accounting for inflation.' } },
      { id: 'c1', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Growth above deposits', prompt: 'If the final balance is $40,000 and total contributions were $28,000, what does the remaining $12,000 represent in this simplified model?', options: ['Compound growth above deposits', 'Inflation only', 'A hidden contribution', 'Guaranteed profit'], correctAnswer: 'Compound growth above deposits', explanation: 'The model separates deposits from returns accumulated on the balance. It does not guarantee that outcome in reality.', conceptIds: ['compound-return', 'cash-contributions'] },
      { id: 'c2', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Same dollars, less buying power', prompt: 'Why can the inflation-adjusted value be lower than the nominal balance?', options: ['Prices rose over time', 'The account lost all contributions', 'Compounding stopped', 'Monthly deposits became negative'], correctAnswer: 'Prices rose over time', explanation: 'Inflation reduces what a fixed number of currency units can buy.', conceptIds: ['real-purchasing-power'] },
      { id: 'reflection', type: 'reflection', eyebrow: 'Stress the assumptions', title: 'Break the smooth forecast', prompt: 'List two real-world factors that the smooth compound-growth line does not capture.', placeholder: 'The curve assumes…, but reality includes…' },
      { id: 'carry', type: 'takeaways', eyebrow: 'Carry forward', title: 'What should survive the lesson', items: ['Contributions and returns are different sources of balance.', 'Compounding acts on earlier growth as well as principal.', 'Nominal money and purchasing power are not identical.', 'Constant returns are a teaching assumption, not a forecast.'] },
    ],
  },
];
